import { waypoints } from '../waypoints'

import * as c from '../const'

const timeChangeFunc = (tickTime, shouldIncrement = true) => {
  if (shouldIncrement) {
    return tickTime + 1
  }
  return tickTime - 1
}

const uiState = {
  waypoints,
  annotationGroup: 1,
  tickTime: c.MIN_TICK_TIME,
  minTickTime: c.MIN_TICK_TIME,
  maxTickTime: c.MAX_TICK_TIME,
  activeWaypointIndex: 0,
  segment: 0,
  timerIsActive: false,
  displayFilters: {
    onlyActive: false,
    showBusinessType: false,
    selectedNeighborhood: waypoints[0].title
  }
}

const uiInteraction = (state = uiState, action) => {
  switch (action.type) {
    case 'UPDATE_WAYPOINT':
      const selectedWaypoint = waypoints[action.activeWaypointIndex]
      let displayFilters = {
        ...state.displayFilters,
        selectedNeighborhood: selectedWaypoint.title
      }
      const scrollFromTime = selectedWaypoint.scrollFromTime
      const scrollToTime = selectedWaypoint.scrollToTime
      return {
        ...state,
        minTickTime: scrollFromTime,
        tickTime: scrollFromTime,
        maxTickTime: scrollToTime,
        displayFilters
      }
    case 'NEXT_SEGMENT':
      return {
        ...state,
        segment: state.segment + 1
      }
    case 'TIMER_START':
      return {
        ...state,
        timerIsActive: true
      }
    case 'TIMER_STOP':
      return {
        ...state,
        timerIsActive: false
      }
    case 'SELECT_ANNOTATION':
      return {
        ...state,
        annotationGroup: action.annotationGroup
      }
    case 'BUMP_TIME':
      let newTickTime = timeChangeFunc(
        state.tickTime, action.shouldIncrement)
      let timerIsActive = state.timerIsActive
      if (newTickTime === state.maxTickTime) {
        timerIsActive = false
        if (action.timer) {
          clearInterval(action.timer)
        }
      } else if (newTickTime > state.maxTickTime) {
        newTickTime = state.minTickTime
      } else if (newTickTime < state.minTickTime) {
        newTickTime = state.maxTickTime
      }
      return {
        ...state,
        timerIsActive,
        tickTime: newTickTime
      }
    case 'FILTER_DATA_BY':
      displayFilters = {...state.displayFilters, ...action.filter}
      return {
        ...state,
        displayFilters
      }
    default:
      return state
  }
}

export {
  uiInteraction
}
