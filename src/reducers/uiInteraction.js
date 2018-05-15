import { waypoints, labels } from '../waypoints'

const uiState = {
  waypoints,
  segment: 0,
  year: 1968,
  activeWaypointIndex: 0
}

const uiInteraction = (state = uiState, action) => {
  switch (action.type) {
    case 'MOVE_TO_SEGMENT':
      return {
        ...state,
        segment: action.segment
      }
    case 'PAUSE_TIMER_AT_YEAR':
      return {
        ...state,
        year: action.year
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