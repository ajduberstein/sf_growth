/* global window,document */
import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL from 'react-map-gl';
import DeckGLOverlay from './deckgl-overlay.js';
import Header from './header.js';
import Navbar from './Navbar.js';
import InfoPanel from './infoPanel.js';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { DataContainer } from './lib/dataContainer';
import 'mapbox-gl/dist/mapbox-gl.css';

import {csv as requestCsv, json as requestJson} from 'd3-request';

// Set your mapbox token here
const MAPBOX_TOKEN = 'pk.eyJ1IjoidWJlcmRhdGEiLCJhIjoidGllX1gxUSJ9.gElUooDF7u51guCQREmAhg'; // eslint-disable-line

const PUBLIC_URL = process.env.PUBLIC_URL || '';

// Source data CSV
const DATA_URLS = {
  'biz': PUBLIC_URL + '/data/business.csv',
}

let labels = {};
Array(2017 - 1968).fill().map((_, i) => "" + (i + 1968) + "-01-01").map((x, i) => labels[i] = x);


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        ...DeckGLOverlay.defaultViewport,
        width: 500,
        height: 500,
      },
      db: null,
      data: null,
      clickedDatum: null,
      view: 'biz',
      timer: null,
      currentTimestamp: null,
      shouldStop: false
    };

    this.tick = this.tick.bind(this)
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize.bind(this));
    this._resize();
    requestCsv(DATA_URLS[this.state.view], (error, response) => {
      if (!error) {
        let dc = new DataContainer(response, 'biz', `
        CREATE TABLE biz (
          lat            FLOAT,
          lng            FLOAT,
          start_date     VARCHAR(10),
          end_date       VARCHAR(10),
          business_name  VARCHAR(100),
          business_type  VARCHAR(100)
        )`, `start_date`, `end_date`)
        this.setState({
          db: dc,
          data: dc.query('SELECT * FROM biz'),
          timer: setInterval(this.tick, 100),
        })
      }
    });
  };

  tick() {
    if (this.state.shouldStop) return;
    const res = this.state.db.nextResultSet();
    if (res) {
      this.setState({
        data: res,
        currentTimestamp: this.state.db.currTs,
      });
    }
  }

  _resize() {
    this._onViewportChange({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  _onViewportChange(viewport) {
    this.setState({
      viewport: {...this.state.viewport, ...viewport}
    });
  }

  _remapProperties(properties) {

  }

  _onHover(info) {
    // Hovered over a county
    // try {
    //   let properties = info.object;
    //   // properties = this._remapProperties(properties)
    //   this.setState({clickedDatum: properties})
    // } catch(err) {
    //   this.setState({
    //     clickedDatum: null
    //   })
    // }
  }

  // _onNavClick(text) {
  //   let view = LOOKUP[text];
  //   let requestFunc = DATA_URLS[view].endsWith('.json') ? requestJson : requestCsv;
  //     requestFunc(DATA_URLS[view], (error, response) => {
  //       if (!error) {
  //         this._resize();
  //         this.setState({
  //           db: response,
  //           view,
  //         });
  //       }
  //   });
  // }

  _onClick(info) {
    try {
      let properties = info.object;
      // properties = this._remapProperties(properties)
      this.setState({
        clickedDatum: properties,
        shouldStop: !this.state.shouldStop
      })
    } catch(err) {
      this.setState({
        clickedDatum: null,
        shouldStop: false
      })
    }
  }

  render() {
    const {
      viewport,
      data,
      view,
      clickedDatum,
      currentTimestamp,
    } = this.state;
    // TODO add layer selection bar
    // TODO add legend
    let glThing;
    if (!data) {
      glThing = null
    } else {
      glThing = (<MapGL

        {...viewport}
        onViewportChange={this._onViewportChange.bind(this)}
        mapboxApiAccessToken={MAPBOX_TOKEN}>
        <DeckGLOverlay viewport={viewport}
          data={data}
          onHover={this._onHover.bind(this)}
          onClick={this._onClick.bind(this)}
          extruded={true}
          view={'biz'}
          radius={30}
          />
      </MapGL>
      )
    }

    return (
      <div>
        <div style={{'grid': '2 2'}} >
          <Header
            title={'Fall and Rise of San Franciscan Growth'}
            subtitle={currentTimestamp}
            subcomponent={(
              <div className='subcomponent'>
                <Slider
                  marks={labels}
                />
              </div>
            )}
          />
          <div>
          </div>
        </div>
      {glThing}
      <div style={{background: 'black', 'zLevel': 100}}> Hold shift to rotate </div>
      <InfoPanel
        title={'Business Detail'}
        data={clickedDatum}
        description={''}
      />
      </div>

    );
  }
}
