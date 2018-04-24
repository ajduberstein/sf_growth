/* global window,document */
import React, {Component} from 'react';
import MapGL, {FlyToInterpolator} from 'react-map-gl';
import DeckGLOverlay from './deckgl-overlay.js';
import {
  Header,
  InfoPanel, 
  Navbar,
  Scrubber,
  WaypointSelector,
} from './components';

import * as d3 from 'd3-ease';
import {csv as requestCsv, json as requestJson} from 'd3-request';

import { DataContainer } from './lib/dataContainer';
import { waypoints } from './waypoints';
import 'mapbox-gl/dist/mapbox-gl.css';



// Set your mapbox token here
const MAPBOX_TOKEN = 'pk.eyJ1IjoidWJlcmRhdGEiLCJhIjoidGllX1gxUSJ9.gElUooDF7u51guCQREmAhg'; // eslint-disable-line

const PUBLIC_URL = process.env.PUBLIC_URL || '';

// Source data CSV
const DATA_URLS = {
  'biz': PUBLIC_URL + '/data/business.csv',
}

let labelLookup = {}
let labels = Array(2017 - 1968).fill().map((_, i) => i + 1968);
labels.map((x, i) => labelLookup[x] = i)

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
      currentYear: null,
      waypoints,
      selectedWaypointIdx: 0,
    };

    this.tick = this.tick.bind(this)
    this._onScrubberClick = this._onScrubberClick.bind(this)
    this._onWaypointClick = this._onWaypointClick.bind(this)
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
          timer: setInterval(this.tick, 200),
        })
      }
    });
  };

  tick() {
    const res = this.state.db.nextResultSet();
    if (res) {
      this.setState({
        data: res,
        currentYear: this.state.db.currTs,
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

  _onScrubberClick(idx) {
    clearInterval(this.state.timer)
    const year = "" + labels[idx];
    const res = this.state.db.getResultSetAtTime(year)
    this.setState({
      currentYear: year,
      data: res,
      timer: null,
    })
  }

  _onClick(info) {
    try {
      let properties = info.object;
      // properties = this._remapProperties(properties)
      this.setState({
        clickedDatum: properties,
      })
    } catch(err) {
      this.setState({
        clickedDatum: null,
      })
    }
  }

  _onWaypointClick(selectedIdx, ) {
    let vp = {
      ...this.state.viewport,
    }
    const selectedWaypoint = this.state.waypoints[selectedIdx];
    vp['latitude'] = selectedWaypoint.latitude;
    vp['longitude'] = selectedWaypoint.longitude;
    vp['zoom'] = selectedWaypoint.zoom;
    vp['pitch'] = selectedWaypoint.pitch;
    vp['altitude'] = selectedWaypoint.altitude;
    vp['bearing'] = selectedWaypoint.bearing;
    vp['transitionDuration'] = 2000;
    vp['transitionInterpolator'] = new FlyToInterpolator();
    vp['transitionEasing'] = d3.easeCubic;


    this.setState({
      selectedWaypointIdx: selectedIdx,
      viewport: vp,
    });
  };

  _onClickStop(e){
    e.preventDefault();
  }

  render() {
    const {
      viewport,
      data,
      view,
      clickedDatum,
      currentYear,
    } = this.state;

    let glViewer;
    if (!data) {
      glViewer = null
    } else {
      glViewer = (<MapGL

        {...viewport}
        onViewportChange={this._onViewportChange.bind(this)}
        mapboxApiAccessToken={MAPBOX_TOKEN}>
        <DeckGLOverlay viewport={viewport}
          data={data}
          onClick={this._onClick.bind(this)}
          extruded={true}
          view={'biz'}
          radius={30}
          />
      </MapGL>
      )
    }
    let year = (currentYear || '').substring(0,4)
    let scrubberIdx = labelLookup[year]

    return (
      <div>
        <div style={{'grid': '2 2'}} >
          <Header
            title={'A Half-Century of San Franciscan Growth'}
            subtitle={'Local businesses established since 1968'}
          />
          <Scrubber
            marks={labels}
            currentIdx={scrubberIdx}
            handleClick={this._onScrubberClick}
          />
        </div>
      {glViewer}
      <div style={{background: 'black', 'zLevel': 100}}> Hold shift to rotate </div>
      <InfoPanel
        title={'Business Detail'}
        data={clickedDatum}
        description={''}
      />
      <WaypointSelector
        waypoints={this.state.waypoints}
        handleClick={this._onWaypointClick}
        selectedWaypointIdx={this.state.selectedWaypointIdx}
        />
      </div>

    );
  }
}
