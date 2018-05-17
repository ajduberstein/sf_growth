/* global window,document */
import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {
  Scrubber,
  WaypointSelector,
  Viewport,
  PlayButton
} from './components'

import {
  Header
} from 'semantic-ui-react'

import 'mapbox-gl/dist/mapbox-gl.css'

class App extends Component {
  render () {
    return (
      <React.Fragment>
        <div>
          <Header size='huge' style={{
            float: 'left'
          }}>A Half-Century of San Franciscan Growth</Header>
        </div>
        <div>
          <PlayButton />
          <Scrubber />
        </div>
        <div>
          <Viewport />
        </div>
      </React.Fragment>
    )
  }
}

App.propTypes = {
  segment: PropTypes.number
}

export {
  App
}
