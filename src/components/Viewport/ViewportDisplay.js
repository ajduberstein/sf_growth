import React from 'react'
import PropTypes from 'prop-types'

import MapGL from 'react-map-gl'

import { DeckGLOverlay } from '../DeckGLOverlay'

const MAPBOX_TOKEN = 'pk.eyJ1IjoidWJlcmRhdGEiLCJhIjoidGllX1gxUSJ9.gElUooDF7u51guCQREmAhg'; // eslint-disable-line

const ViewportDisplay = (props) => {
  const {
    dimensionData,
    factData,
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
        <DeckGLOverlay viewport={viewport}
          factData={factData}
          dimensionData={dimensionData}
          extruded={true}
          radius={30}
        />
      </MapGL>
    </div>
  )
}

ViewportDisplay.propTypes = {
  dimensionData: PropTypes.any.isRequired,
  factData: PropTypes.any.isRequired,
  viewport: PropTypes.object.isRequired,
  onViewportChange: PropTypes.func.isRequired
}

export {
  ViewportDisplay
}
