import React, {Component} from 'react';

import DeckGL, {ScatterplotLayer} from 'deck.gl';

import {GL} from 'luma.gl';

const getGlConst = d => GL[d];

export default class DeckGLOverlay extends Component {

  static get defaultViewport() {
    return {
      longitude: -122.4726194,
      latitude: 37.7576948,
      zoom: 12,
      maxZoom: 16,
      pitch: 0,
      bearing: 0,
    };
  }

  _initialize(gl) {
    gl.enable(gl.DEPTH_TEST);

    gl.enable(GL.BLEND);
    gl.blendFunc(GL['SRC_ALPHA'], GL['DST_ALPHA']);
    gl.blendEquation(GL['FUNC_ADD']);
  }


  _getLayer(args) {
      const layer = new ScatterplotLayer({
        id: 'heatmap',
        data: args.data,
        radiusScale: 4,
        opacity: 1,
        radiusMinPixels: 4,
        getPosition: (d) => [
          parseFloat(d.lng),
          parseFloat(d.lat),
          0
        ],
        strokeWidth: 4,
        onClick: args.onClick,
        getColor: (d) => {
          return [10, 10, 127, 255]
        },
        fp64: true,
        pickable: true,
      });

      return layer;
    }

  render() {
    if (!this.props.data) {
      console.error('no data')
      return null;
    }

    const layer = this._getLayer(this.props)

    return (
      <DeckGL
        {...this.props.viewport}
        layers={ [layer] }
        onWebGLInitialized={this._initialize} />
    );
  }
}

