import React from 'react'
import '../Styles/ImageComponent.css'

const ImageComponent = ({data}) => {
  return (
    <div>
      <img src={data} id='image' alt=''/>
    </div>
  )
}

export default ImageComponent
