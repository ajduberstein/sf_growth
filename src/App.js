/* global window,document */
import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {
  WaypointSelector,
  Viewport,
  PlayButton,
  YearPicker,
  FilterSwitch
} from './components'

import {
  Grid
} from 'semantic-ui-react'

import 'mapbox-gl/dist/mapbox-gl.css'

class App extends Component {
  render () {
    return (
      <React.Fragment>
        <Grid stackable={true}>
          <Grid.Column width={5} style={{
            background: '#FFD400',
            margin: '1em'
          }}>
            <h2
              style={{
                background: '#FFD400',
                textAlign: 'center'
              }}>A Half-Century of San Franciscan Growth
            </h2>
            <PlayButton />
            <YearPicker />
            <FilterSwitch />
            <WaypointSelector />
          </Grid.Column>
          <Grid.Column width={7}>
            <Viewport />
          </Grid.Column>
        </Grid>
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
