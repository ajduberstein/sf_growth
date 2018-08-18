import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  selectWaypoint,
  startTimer
} from '../../actions'

import { SelectorDisplay } from './SelectorDisplay'

const _combineViewports = (originalViewport, newViewport) => {
  let vp = {...originalViewport}
  const fieldsToCopy = [
    'latitude', 'longitude',
    'zoom', 'pitch',
    'altitude', 'bearing']
  for (const field of fieldsToCopy) {
    vp[field] = newViewport[field]
  }
  return vp
}

class SelectorContainer extends Component {
  handleTransition = (e) => {
    let {
      viewport,
      waypoints,
      activeWaypointIndex
    } = this.props
    let nextIdx = e.target.getAttribute('class') === 'arrow-left' ? --activeWaypointIndex : ++activeWaypointIndex
    const selectedWaypoint = waypoints[nextIdx]
    let vp = _combineViewports(viewport, selectedWaypoint)
    this.props.handleWaypointClick(vp, nextIdx, selectedWaypoint.scrollFromTime, selectedWaypoint.scrollToTime)
  }

  render () {
    let activeWaypoint = this.props.waypoints[this.props.activeWaypointIndex]

    return (
      <SelectorDisplay
        waypoint={activeWaypoint}
        numWaypoints={this.props.waypoints.length}
        waypointIdx={this.props.activeWaypointIndex}
        onClick={this.handleTransition}
      />)
  }
}

SelectorContainer.propTypes = {
  waypoints: PropTypes.array.isRequired,
  activeWaypointIndex: PropTypes.number.isRequired,
  viewport: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  const {
    waypoints
  } = state.uiInteraction
  const {
    viewport,
    activeWaypointIndex
  } = state.viewportReducer

  return {
    waypoints,
    viewport,
    activeWaypointIndex
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleWaypointClick: (viewport, newWaypointIndex, scrollFromTime, scrollToTime) => {
      console.log(scrollToTime)
      dispatch(startTimer(2))
      dispatch(selectWaypoint(viewport, newWaypointIndex, 2))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectorContainer)
