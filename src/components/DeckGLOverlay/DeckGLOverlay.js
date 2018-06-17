import React, {Component} from 'react'
import PropTypes from 'prop-types'

import DeckGL, {
  GeoJsonLayer,
  ScatterplotLayer,
  TextLayer
} from 'deck.gl'

import { annotations } from '../../annotations'
import { COLORS } from '../../lib'

// Add an alpha value
const ONE_COLOR = [...COLORS.PURPLE, 140]
const OTHER_COLOR = [...COLORS.ORANGE, 140]

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
        if (d.start_date === 1998) {
          return ONE_COLOR
        } else {
          return OTHER_COLOR
        }
      },
      pickable: false
    })

    return layer
  }

  _getTextLayer () {
    const activeAnnotationId = window.location.hash.replace('#', '') * 1
    const visible = annotations.filter(x => x.id === activeAnnotationId)
    return new TextLayer({
      id: 'text-layer',
      getPosition: f => {
        return [f.longitude, f.latitude, 20]
      },
      getText: f => f.body,
      data: visible
    })
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

  render () {
    const {
      dimensionData,
      factData,
      viewport
    } = this.props
    const layers = [
      this._getGeojsonLayer(dimensionData),
      // this._getLayer(factData),
      this._getTextLayer()
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
