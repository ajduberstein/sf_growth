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
  tickTime: c.MIN_TICK_TIME,
  minTickTime: c.MIN_TICK_TIME,
  maxTickTime: c.MAX_TICK_TIME,
  timeField: c.TIME_FIELD,
  filterField: c.FILTER_COLUMN,
  activeWaypointIndex: 0,
  timerIsActive: false
}

const uiInteraction = (state = uiState, action) => {
  switch (action.type) {
    case 'MOVE_TO_SEGMENT':
      return {
        ...state,
        segment: action.segment
      }
    case 'UPDATE_WAYPOINT':
      return {
        ...state,
        activeWaypointIndex: action.activeWaypointIndex
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
    default:
      return state
  }
}

export {
  uiInteraction
}
