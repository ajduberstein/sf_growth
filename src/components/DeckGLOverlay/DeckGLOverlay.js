import React, {Component} from 'react'
import PropTypes from 'prop-types'

import DeckGL, {GeoJsonLayer, ScatterplotLayer, TextLayer} from 'deck.gl'

import { COLORS } from '../../lib'

// Add an alpha value
const ONE_COLOR = [...COLORS.PURPLE, 140]

export default class DeckGLOverlay extends Component {
  _initialize (gl) {
    gl.enable(gl.DEPTH_TEST)
    gl.getExtension('OES_element_index_uint')
  }

  _getLayer (data, onClick = null) {
    const layer = new ScatterplotLayer({
      id: 'heatmap',
      data,
      radiusScale: 3,
      opacity: 1,
      radiusMinPixels: 3,
      getPosition: (d) => [
        d.lng,
        d.lat,
        0
      ],
      strokeWidth: 4,
      onClick: onClick,
      getColor: (d) => {
        return ONE_COLOR
      },
      pickable: false
    })

    return layer
  }

  _getGeojsonLayer (data) {
    // TODO make geojson into a different format
    const layer = new GeoJsonLayer({
      id: 'geojson',
      data,
      getLineColor: f => [0, 0, 0],
      filled: false,
      extruded: false,
      lineWidthMinPixels: 1,
      stroked: true
    })
    return layer
  }

  _getTextLayer (data) {
    return new TextLayer({
      id: 'text-layer',
      getPosition: f => {
        return [
          (f.geometry.coordinates[0][0][0] + f.geometry.coordinates[0][40][0]) / 2.0,
          (f.geometry.coordinates[0][0][1] + f.geometry.coordinates[0][40][1]) / 2.0
        ]
      },
      getText: f => f.properties.Name,
      data: data.features
    })
  }

  render () {
    const {
      dimensionData,
      factData,
      viewport
    } = this.props
    const layers = [
      this._getGeojsonLayer(dimensionData),
      this._getLayer(factData)
    ]

    return (
      <DeckGL
        {...viewport}
        layers={ layers }
        onWebGLInitialized={this._initialize} />
    )
  }

}

DeckGLOverlay.propTypes = {
  dimensionData: PropTypes.object.isRequired,
  factData: PropTypes.array.isRequired,
  viewport: PropTypes.object.isRequired
}
