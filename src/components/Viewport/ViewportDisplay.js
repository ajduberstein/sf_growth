import React from 'react'
import PropTypes from 'prop-types'

import MapGL from 'react-map-gl'

import DeckGL from 'deck.gl'

const MAPBOX_TOKEN = 'pk.eyJ1IjoidWJlcmRhdGEiLCJhIjoidGllX1gxUSJ9.gElUooDF7u51guCQREmAhg' // eslint-disable-line

const initialize = (gl) => {
  gl.enable(gl.DEPTH_TEST)
  gl.getExtension('OES_element_index_uint')
  gl.preserveDrawingBuffer = true
}

const ViewportDisplay = (props) => {
  const {
    layers,
    onViewportChange,
    viewport
  } = props
  return (
    <div style={{padding: 0}}>
      <MapGL
        {...viewport}
        onViewportChange={onViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle={{
          visible: false
        }}
      >
        <DeckGL
          {...viewport}
          layers={ layers }
          onWebGLInitialized={initialize} />
      </MapGL>
    </div>
  )
}

ViewportDisplay.propTypes = {
  layers: PropTypes.array.isRequired,
  viewport: PropTypes.object.isRequired,
  onViewportChange: PropTypes.func.isRequired
}

export {
  ViewportDisplay
}
