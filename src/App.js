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

const StartButton = (props) => {
  if (!props.shouldRender) {
    return <div></div>
  }
  return (
    <div className='startBtn' onClick={props.onClick}>
      Press to Start
    </div>
  )
}

class App extends Component {
  render () {
    if (this.props.segment === 0) {
      return (
        <React.Fragment>
          <div className='originbox'>
            <h1>A Half-Century of <br />
              San Franciscan <br />
              Growth</h1>
            <subtitle>By <a href='https://duberste.in/'>Andrew Duberstein</a></subtitle>
            <br />
            <StartButton onClick={this.props.onClickStart}
              shouldRender={!this.props.loading && this.props.segment === 0}/>
          </div>
          <Viewport />
        </React.Fragment>
      )
    }
    return (
      <div className='mainbox'>
        <div className='storybox'>
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
  segment: PropTypes.number.isRequired,
  onClickStart: PropTypes.func.isRequired
}

export {
  App
}
