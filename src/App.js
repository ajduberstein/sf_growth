/* global window,document */
import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {
  WaypointSelector,
  Viewport,
  PlayButton,
  YearPicker,
  FilterSwitch,
  Legend
} from './components'

import 'mapbox-gl/dist/mapbox-gl.css'
import './App.css'

class App extends Component {
  render () {
    return (
      <div className='mainbox'>
        <div className='storybox'>
          <h1 style={{
          }}>A Half-Century of San Franciscan Growth</h1>
          <div className='legend'>
            <Legend />
          </div>
          <div className='year-picker'>
            <YearPicker/>
          </div>
          <div className='play-button'>
            <PlayButton />
          </div>
          <div className='filter-switch'>
            <FilterSwitch />
          </div>
          <div className='waypoint-selector'>
            <WaypointSelector />
          </div>
        </div>
        <div className='viewport'>
          <Viewport />
        </div>
      </div>
    )
  }
}

App.propTypes = {
  segment: PropTypes.number
}

export {
  App
}
