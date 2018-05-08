import React, {Component} from 'react'

import DeckGL, {ScatterplotLayer} from 'deck.gl'

import {GL} from 'luma.gl'

import { COLORS } from './lib'

const mappedColors = {
  'Accommodations': COLORS.RED,
  'Arts Entertainment and Recreation': COLORS.PINK,
  'Food Services': COLORS.GREEN,
  'Retail Trade': COLORS.ORANGE,
  'Real Estate and Rental and Leasing Services': COLORS.PURPLE,
  'NA': COLORS.BLUE
}

export default class DeckGLOverlay extends Component {
  static get defaultViewport () {
    return {
      longitude: -122.4726194,
      latitude: 37.7576948,
      zoom: 12,
      maxZoom: 17,
      pitch: 0,
      bearing: 0
    }
  }

  _initialize (gl) {
    gl.enable(gl.DEPTH_TEST)
    gl.getExtension('OES_element_index_uint')

    // TODO for feedback only
    if (window.location.hash.indexOf('blend') > -1) {
      gl.enable(GL.BLEND)
      gl.blendFunc(GL['SRC_ALPHA'], GL['DST_ALPHA'])
      gl.blendEquation(GL['FUNC_ADD'])
    }
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
        // TODO for feedback only
        if (window.location.hash.indexOf('onecolor') > -1) {
          return COLORS.PURPLE
        }
        return mappedColors[d.business_type] || mappedColors['NA']
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
