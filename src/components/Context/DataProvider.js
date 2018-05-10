import React, { Component } from 'react'
import { csv as requestCsv } from 'd3-request'
import * as d3 from 'd3-ease'
import { FlyToInterpolator } from 'react-map-gl'

import { DataContainer } from '../../lib/dataContainer'

let labelLookup = {}
let labels = Array(2017 - 1968).fill().map((_, i) => i + 1968)
labels.map((x, i) => { labelLookup[x] = i })

const PUBLIC_URL = process.env.PUBLIC_URL || ''
const DATA_URLS = {
  'biz': PUBLIC_URL + '/data/business.csv'
}

let dataContainer = null

const DataContext = React.createContext()
class DataProvider extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: null,
      timer: null,
      currentYear: null,
      selectedWaypointIdx: 0
    }
    this.tick = this.tick.bind(this)
  }

  componentDidMount () {
    requestCsv(DATA_URLS['biz'], (error, response) => {
      if (!error) {
        dataContainer = new DataContainer(response, 'biz', `
        CREATE TABLE biz (
          lat            FLOAT,
          lng            FLOAT,
          start_date     VARCHAR(10),
          end_date       VARCHAR(10),
          business_name  VARCHAR(100),
          business_type  VARCHAR(100)
        )`, 'start_date', 'end_date')
        this.setState({
          data: null,
          timer: setInterval(this.tick, 200)
        })
      }
    })
  }

  tick () {
    if (dataContainer.minTs <= this.state.currentYear <= dataContainer.lastTs) {
      dataContainer.nextResultSet().then((result) => {
        this.setState({
          data: result,
          currentYear: dataContainer.currTs
        })
      })
    }
  }

  onScrubberClick (idx) {
    clearInterval(this.state.timer)
    const year = '' + labels[idx]
    const res = dataContainer.getResultSetAtTime(year)
    this.setState({
      currentYear: year,
      data: res,
      timer: null
    })
  }

  onWaypointClick (selectedIdx) {
    const selectedWaypoint = this.state.waypoints[selectedIdx]
    let vp = {
      latitude: selectedWaypoint.latitude,
      longitude: selectedWaypoint.longitude,
      zoom: selectedWaypoint.zoom,
      pitch: selectedWaypoint.pitch,
      altitude: selectedWaypoint.altitude,
      bearing: selectedWaypoint.bearing,
      transitionDuration: 2000,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: d3.easeCubic
    }

    this.setState({
      selectedWaypointIdx: selectedIdx,
      viewport: {...this.state.viewport, ...vp}
    })
  };

  _onClickStop (e) {
    e.preventDefault()
  }

  render () {
    return (
      <DataContext.Provider value={{
        state: this.state,
        onWayPointClick: this.onWaypointClick.bind(this),
        onScrubberClick: this.onScrubberClick.bind(this)
      }}>
        {this.props.children}
      </DataContext.Provider>
    )
  }

  componentDidCatch (error, info) {
    // Display fallback UI
    console.error(error)
    if (this.state.timer) {
      clearInterval(this.state.timer)
    }
  }
}

export {
  DataContext,
  DataProvider
}
