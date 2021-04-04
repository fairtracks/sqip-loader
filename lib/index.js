const loaderUtils = require('loader-utils')
const validate = require('schema-utils').validate
const sqip = require('sqip').default
const schema = require('./options.json')

module.exports = function (contentBuffer) {
  if (this.cacheable) {
    this.cacheable(true)
  }
  const callback = this.async()
  const options = loaderUtils.getOptions(this) || {}

  validate(schema, options, 'SQIP Loader')

  let content = contentBuffer.toString('utf8')
  const filePath = this.resourcePath
  const contentIsUrlExport = /^(module.exports =|export default) "data:(.*)base64,(.*)/.test(
    content
  )
  const contentIsFileExport = /^(module.exports =|export default) (.*)/.test(
    content
  )
  let src = ''

  if (contentIsUrlExport) {
    src = content.match(/^(module.exports =|export default) (.*)/)[2]
    if (options.skipPreviewIfBase64) {
      return 'module.exports = { "src": ' + src + ', "preview": "" };'
    }
  } else {
    if (!contentIsFileExport) {
      var fileLoader = require('file-loader')
      content = fileLoader.call(this, contentBuffer)
    }
    src = content.match(/^(module.exports =|export default) (.*);/)[2]
  }

  const numberOfPrimitives =
    'numberOfPrimitives' in options
      ? parseInt(options.numberOfPrimitives, 10)
      : 20
  const mode = 'mode' in options ? parseInt(options.mode, 10) : 0
  const blur = 'blur' in options ? parseInt(options.blur, 10) : 12
  const plugins = [
    {
      name: 'sqip-plugin-primitive',
      options: {
        numberOfPrimitives,
        mode,
      },
    },
  ]
  if (blur) {
    plugins.push({
      name: 'sqip-plugin-blur',
      options: {
        blur,
      },
    })
  }
  plugins.push('sqip-plugin-svgo')
  plugins.push('sqip-plugin-data-uri')
  sqip({
    input: filePath,
    plugins,
  })
    .then((result) => {
      const sizes = JSON.stringify({
        originalWidth: result.metadata.originalWidth,
        originalHeight: result.metadata.originalHeight,
        width: result.metadata.width,
        height: result.metadata.height,
        type: result.metadata.type,
      })
      const out =
        'module.exports = { "src": ' +
        src +
        ', "preview": ' +
        JSON.stringify(result.metadata.dataURI) +
        ', "sizes": ' +
        JSON.stringify(sizes) +
        ' };'

      callback(null, out)
    })
    .catch((error) => {
      callback(error, null)
    })
}

module.exports.raw = true
