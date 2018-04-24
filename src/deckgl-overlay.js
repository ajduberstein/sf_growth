import React, {Component} from 'react';

import DeckGL, {ScatterplotLayer} from 'deck.gl';

import {setParameters} from 'luma.gl';


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
    gl.clear( gl.COLOR_BUFFER_BIT || gl.DEPTH_BUFFER_BIT );
    gl.clearColor(0, 0, 0);
    setParameters(gl, {
      depthTest: true,
      depthFunc: gl.LEQUAL,
      blend: true,
      blendEquation: [gl.FUNC_SUBTRACT, gl.MIN],
      blendFunc: [gl.SRC_COLOR, gl.DST_COLOR, gl.SRC_ALPHA, gl.DST_ALPHA],
    });
  }


  _getLayer(args) {
      const layer = new ScatterplotLayer({
        id: 'heatmap',
        data: args.data,
        radiusScale: 4,
        outline: true,
        radiusMinPixels: 2,
        getPosition: (d) => [
          parseFloat(d.lng),
          parseFloat(d.lat),
          0
        ],
        strokeWidth: 4,
        onClick: args.onClick,
        getColor: (d) => {
          return [255, 127, 0, 30]
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
        layers={ [layer] } />
    );
  }
}

