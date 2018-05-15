import React from 'react'
import PropTypes from 'prop-types'

import MapGL from 'react-map-gl'

import { DeckGLOverlay } from '../DeckGLOverlay'

const MAPBOX_TOKEN = 'pk.eyJ1IjoidWJlcmRhdGEiLCJhIjoidGllX1gxUSJ9.gElUooDF7u51guCQREmAhg'; // eslint-disable-line

const ViewportDisplay = (props) => {
  const {
    neighborhoodData,
    businessData,
    onViewportChange,
    viewport
  } = props
  return (<MapGL
    {...viewport}
    onViewportChange={onViewportChange}
    mapboxApiAccessToken={MAPBOX_TOKEN}
    mapStyle={{
      visible: false
    }}
  >
    <DeckGLOverlay viewport={viewport}
      businessData={businessData}
      neighborhoodData={neighborhoodData}
      extruded={true}
      radius={30}
    />
  </MapGL>
  )
}

ViewportDisplay.propTypes = {
  neighborhoodData: PropTypes.object.isRequired,
  businessData: PropTypes.array.isRequired,
  viewport: PropTypes.object.isRequired,
  onViewportChange: PropTypes.func.isRequired
}

export {
  ViewportDisplay
}
