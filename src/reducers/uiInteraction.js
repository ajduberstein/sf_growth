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
  segment: 0,
  annotationGroup: 1,
  tickTime: c.MIN_TICK_TIME,
  minTickTime: c.MIN_TICK_TIME,
  maxTickTime: c.MAX_TICK_TIME,
  activeWaypointIndex: 0,
  timerIsActive: false,
  displayFilters: {
    onlyActive: false,
    showBusinessType: false,
    selectedNeighborhood: waypoints[0].title
  }
}

const uiInteraction = (state = uiState, action) => {
  switch (action.type) {
    case 'MOVE_TO_SEGMENT':
      return {
        ...state,
        segment: action.segment
      }
    case 'UPDATE_WAYPOINT':
      let displayFilters = {
        ...state.displayFilters,
        selectedNeighborhood: waypoints[action.activeWaypointIndex].title
      }
      return {
        ...state,
        displayFilters
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
      if (newTickTime > state.maxTickTime) {
        newTickTime = state.minTickTime
      } else if (newTickTime < state.minTickTime) {
        newTickTime = state.maxTickTime
      }
      return {
        ...state,
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
