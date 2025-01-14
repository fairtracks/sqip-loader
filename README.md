[![npm][npm]][npm-url]

# SQIP Loader

Loads images and exports tiny SQIP previews as image/svg+xml data

**This is a fork of [EmilTholin/sqip-loader](https://github.com/EmilTholin/sqip-loader).**  
`@mole-inc/sqip-loader` is depends on the canary version of [sqip](https://github.com/axe312ger/sqip).  
If you use stable one, you are able to use original [sqip-loader](https://www.npmjs.com/package/sqip-loader).

## Requirements for non-64bit operating systems

- [Primitive][primitive-url].

## Install

```bash
npm install --save-dev @mole-inc/sqip-loader
```

## Usage

The `@mole-inc/sqip-loader` loads your image and exports the url of the image as `src`, the image/svg+xml URL-encoded data as `preview`, and a `sizes` object containing width, height and the type of the imported image.

```js
import { src, preview, sizes } from './image.png'
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g)$/i,
        use: [
          {
            loader: '@mole-inc/sqip-loader',
            options: {
              numberOfPrimitives: 20,
            },
          },
        ],
      },
    ],
  },
}
```

It can also be used in conjunction with [url-loader][url-loader] or [file-loader][file-loader].

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g)$/i,
        use: [
          {
            loader: '@mole-inc/sqip-loader',
            options: {
              numberOfPrimitives: 20,
            },
          },
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
}
```

## Options

|           Name            |    Type     | Default | Description                                                                                                                                                                                                                        |
| :-----------------------: | :---------: | :-----: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`numberOfPrimitives`**  | `{Number}`  |  `20`   | SQIP works by first approximating the image with a certain number of shapes, specified by `numberOfPrimitives`, and then adding a blur effect to it. Larger values will generate sharper previews, but will also increase the size |
|        **`mode`**         | `{Number}`  |   `0`   | Specifies the type of primitive shapes that will be used to generate the image. 0=combo, 1=triangle, 2=rect, 3=ellipse, 4=circle, 5=rotatedrect, 6=beziers, 7=rotatedellipse, 8=polygon                                            |
|        **`blur`**         | `{Number}`  |  `12`   | Specifies the standard deviation of the Gaussian blur                                                                                                                                                                              |
| **`skipPreviewIfBase64`** | `{Boolean}` | `false` | If set to `true`, will not generate a preview if the image already is base64 encoded. Useful when the inlined base64 representation is enough, and you don't want to bloat your files with unused previews                         |

[npm]: https://img.shields.io/npm/v/@mole-inc/sqip-loader.svg
[npm-url]: https://npmjs.com/package/@mole-inc/sqip-loader
[primitive-url]: https://github.com/fogleman/primitive
[file-loader]: https://github.com/webpack-contrib/file-loader
[url-loader]: https://github.com/webpack-contrib/url-loader
