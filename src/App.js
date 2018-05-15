/* global window,document */
import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {
  Header,
  Scrubber,
  WaypointSelector
} from './components'

import 'mapbox-gl/dist/mapbox-gl.css'

let labelLookup = {}
let labels = Array(2017 - 1968).fill().map((_, i) => i + 1968)
labels.map((x, i) => labelLookup[x] = i)


class App extends Component {
  render () {
    return (
      <React.Fragment>
        This is supposed to be here
      </React.Fragment>
    )
  }
}

App.propTypes = {
  segment: PropTypes.number
}

export {
  App,
  labelLookup
}
