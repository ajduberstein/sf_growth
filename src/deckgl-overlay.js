import React, {Component} from 'react';

import DeckGL, {ScatterplotLayer, GeoJsonLayer, HexagonLayer} from 'deck.gl';

import {setParameters} from 'luma.gl';

const COLORS = {
  "Accommodations": [152, 78, 163],
  "Arts Entertainment and Recreation": [55, 126, 184],
  "Food Services": [247, 129, 191],
  "Retail Trade": [77, 175, 74],
  "Everything Else": [255, 127, 0],
  // "Real Estate and Rental and Leasing Services": [255, 255, 51],
  "2": [166, 86, 40],
  "3": [228, 26, 28],
};


const LIGHT_SETTINGS = {
  lightsPosition: [-125, 50.5, 5000, -122.8, 48.5, 8000],
  ambientRatio: 0.2,
  diffuseRatio: 0.5,
  specularRatio: 0.3,
  lightsStrength: [1.0, 0.0, 2.0, 0.0],
  numberOfLights: 4
};


export default class DeckGLOverlay extends Component {

  constructor(props) {
    super(props);
  }

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
    gl.enable(gl.BLEND);
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
        radiusMinPixels: 1,
        radiusMinPixels: 2,
        getPosition: (d) => [
          parseFloat(d.lng),
          parseFloat(d.lat),
          0
        ],
        strokeWidth: 4,
        onHover: args.onHover,
        onClick: args.onClick,
        getColor: (d) => {
          if (COLORS[d.business_type]) {
            return COLORS[d.business_type]
          }
          return [255, 127, 0, 30]
        },
        fp64: true,
        pickable: true,
      });

      return layer;
    }

  render() {
    if (!this.props.data) {
      console.log('no data')
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

