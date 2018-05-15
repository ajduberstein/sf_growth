import React, { Component } from 'react'
import * as d3 from 'd3-ease'
import { FlyToInterpolator } from 'react-map-gl'

let labelLookup = {}
let labels = Array(2017 - 1968).fill().map((_, i) => i + 1968)
labels.map((x, i) => { labelLookup[x] = i })

class DataProvider extends Component {
  constructor (props) {
    super(props)
    this.state = {
      neighborhoodsData: null,
      data: null,
      timer: null,
      currentYear: null,
      selectedWaypointIdx: 0
    }
    this.tick = this.tick.bind(this)
  }

  componentDidMount () {
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
    console.log(idx)
    clearInterval(this.state.timer)
    const year = '' + labels[idx]
    dataContainer.getResultSetAtTime(year).then((result) => {
      this.setState({
        currentYear: year,
        data: result,
        timer: null
      })
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
  }

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
