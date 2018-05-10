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

  _getLayer (args) {
    const layer = new ScatterplotLayer({
      id: 'heatmap',
      data: args.data,
      radiusScale: 3,
      opacity: 1,
      radiusMinPixels: 3,
      getPosition: (d) => [
        parseFloat(d.lng),
        parseFloat(d.lat),
        0
      ],
      strokeWidth: 4,
      onClick: args.onClick,
      getColor: (d) => {
        return ONE_COLOR
      },
      pickable: true
    })

    return layer
  }

  render () {
    if (!this.props.data) {
      console.error('no data')
      return null
    }
    const layer = this._getLayer(this.props)

    return (
      <DeckGL
        {...this.props.viewport}
        layers={ [layer] }
        onWebGLInitialized={this._initialize} />
    )
  }
}
