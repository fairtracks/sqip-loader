import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import './styles.css'
import {
  src,
  preview,
} from '!!@fairtracks/sqip-loader?numberOfPrimitives=20!./images/bridesmaid.png'
import homer from './images/homer.gif'
import hercules from './images/hercules.jpg'
import mountain from './images/mountain.jpg'

function Img({ src, preview }) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div className="image-wrapper">
      <img src={preview} />
      <img
        src={src}
        className={`image ${imageLoaded && `loaded`}`}
        onLoad={() => {
          const delay = 500 + Math.random() * 1500
          setTimeout(() => setImageLoaded(() => true), delay)
        }}
      />
    </div>
  )
}

Img.propTypes = {
  src: PropTypes.string,
  preview: PropTypes.string,
}

ReactDOM.render(
  <div>
    <Img src={src} preview={preview} />
    <Img {...homer} />
    <Img {...hercules} />
    <Img {...mountain} />
  </div>,
  document.getElementById('app')
)
