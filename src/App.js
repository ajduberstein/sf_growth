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

import {
  Grid
} from 'semantic-ui-react'

import 'mapbox-gl/dist/mapbox-gl.css'

class App extends Component {
  render () {
    return (
      <React.Fragment>
        <Grid columns={2} stackable={true}>
          <Grid.Column width={5} style={{
            background: '#FFD400',
            marginLeft: '1em',
            marginRight: '1em',
            marginTop: '1em',
            overflow: 'auto'
          }}>
            <Grid.Row>
              <h2
                style={{
                  background: '#FFD400',
                  textAlign: 'center'
                }}>A Half-Century of San Franciscan Growth
              </h2>
            </Grid.Row>
            <Grid.Row style={{
              padding: '2em'
            }}>
              <Grid columns={2} relaxed style={{
                paddingLeft: '10%',
                paddingRight: '10%',
                maxWidth: '400px',
                minHeight: '150px'}}>
                <Grid.Column>
                  <Legend />
                </Grid.Column>
                <Grid.Column style={{
                  padding: '2.5em'
                }}>
                  <YearPicker />
                </Grid.Column>
              </Grid>
            </Grid.Row>
            <Grid.Row>
              <PlayButton />
              <FilterSwitch />
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
