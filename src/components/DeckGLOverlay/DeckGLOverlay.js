import React, {Component} from 'react'

import DeckGL, {ScatterplotLayer} from 'deck.gl'

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
    const layer = new ScatterplotLayer({
      id: 'geojson',
      data,
      getLineColor: f => [255, 255, 255],
      stroked: true,
      opacity: 0.8,
      filled: true,
      extruded: true,
      wireframe: true,
      fp64: true
    })
    return layer
  }

  render () {
    if (!this.props.data) {
      console.error('no data')
      return null
    }
    const layers = [
      this._getLayer(this.props.data),
      this._getGeojsonLayer(this.props.neighborhoodsData)
    ]

    return (
      <DeckGL
        {...this.props.viewport}
        layers={ layers }
        onWebGLInitialized={this._initialize} />
    )
  }
}
