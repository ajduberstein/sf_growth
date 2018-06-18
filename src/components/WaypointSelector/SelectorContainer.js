import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  selectWaypoint,
  startTimerAfter
} from '../../actions'

import { SelectorDisplay } from './SelectorDisplay'

class SelectorContainer extends Component {
  handleTransition = (e) => {
    let {
      viewport,
      waypoints,
      activeWaypointIndex
    } = this.props
    let selectedIdx = e.target.getAttribute('num') * 1
    if (activeWaypointIndex === selectedIdx) {
      return // noop
    }
    let vp = {...viewport}
    const selectedWaypoint = waypoints[selectedIdx]
    const fieldsToCopy = [
      'latitude', 'longitude',
      'zoom', 'pitch',
      'altitude', 'bearing']
    for (const field of fieldsToCopy) {
      vp[field] = selectedWaypoint[field]
    }
    this.props.handleWaypointClick(vp, selectedIdx)
  }

  render () {
    return (
      <SelectorDisplay
        waypoints={this.props.waypoints}
        activeWaypointIndex={this.props.activeWaypointIndex}
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
    handleWaypointClick: (viewport, clickedWaypointIndex) => {
      dispatch(startTimerAfter(2))
      dispatch(selectWaypoint(viewport, clickedWaypointIndex, 2))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectorContainer)
