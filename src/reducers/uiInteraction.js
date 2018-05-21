import { waypoints, labels } from '../waypoints'

// TODO should be chosen based on some config file
const MIN_TICK_TIME = 1968
const MAX_TICK_TIME = 2017
const TIME_FIELD = 'start_date'
const timeTimeIncrementFunc = (tickTime) => {
  return tickTime + 1
}

const uiState = {
  waypoints,
  segment: 0,
  tickTime: MIN_TICK_TIME,
  minTickTime: MIN_TICK_TIME,
  maxTickTime: MAX_TICK_TIME,
  timeField: TIME_FIELD,
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
    case 'TIMER_TICK':
      let newTickTime = timeTimeIncrementFunc(state.tickTime)
      if (newTickTime > state.maxTickTime) {
        newTickTime = state.minTickTime
      }
      return {
        ...state,
        tickTime: newTickTime
      }
    case 'CLICK_SCRUBBER':
      let tickTime = labels[action.scrubberTickNum]
      return {
        ...state,
        tickTime
      }
    default:
      return state
  }
}

export {
  uiInteraction
}
