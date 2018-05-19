import { waypoints, labels } from '../waypoints'

const uiState = {
  waypoints,
  segment: 0,
  year: 1968,
  minYear: 1968,
  maxYear: 2016,
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
      let newYear = state.year + 1
      if (newYear > state.maxYear) {
        newYear = state.minYear
      }
      return {
        ...state,
        year: newYear
      }
    case 'CLICK_SCRUBBER':
      let year = labels[action.scrubberTickNum]
      return {
        ...state,
        year
      }
    default:
      return state
  }
}

export {
  uiInteraction
}
