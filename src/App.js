/* global window,document */
import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {
  Scrubber,
  WaypointSelector,
  Viewport,
  LineChart,
  PlayButton,
  YearPicker
} from './components'

import {
  Header,
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
            margin: '10px'
          }}>
            <Header size='huge' style={{
              background: '#FFD400'
            }}>A Half-Century of San Franciscan Growth</Header>
            <Grid.Row width={5}>
              <Grid width={5}>
                <Grid.Column
                  width={3}
                  float={'left'}>
                  <PlayButton />
                </Grid.Column >
                <Grid.Column
                  width={3}
                  float={'right'}>
                  <YearPicker />
                </Grid.Column>
              </Grid>
              <LineChart />
              <WaypointSelector />
            </Grid.Row>
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
