/* global window,document */
import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {
  Scrubber,
  WaypointSelector
} from './components'

import {
  Header,
  Divider
} from 'semantic-ui-react'

import 'mapbox-gl/dist/mapbox-gl.css'


class App extends Component {
  render () {
    return (
      <React.Fragment>
        <Header size='huge' style={{
          float: 'left'
        }}>A Half-Century of San Franciscan Growth</Header>
        <Divider />
        <Scrubber />
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
