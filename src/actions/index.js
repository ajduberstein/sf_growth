// Timer actions
import * as c from '../const'

let timer = null
// https://medium.com/@machadogj/timers-in-react-with-redux-apps-9a5a722162e8
export const startTimer = () => dispatch => {
  clearInterval(timer)
  timer = setInterval(() => dispatch(tick()), c.MILLISECONDS_TIL_TICK)
  dispatch({ type: 'TIMER_START' })
}

export const startTimerAfter = (seconds = 0) => dispatch => {
  clearInterval(timer)
  setTimeout(() => {
    dispatch(startTimer())
  }, seconds * 1000)
}

export const tick = () => ({
  type: 'BUMP_TIME'
})

export const stopTimer = () => {
  clearInterval(timer)
  return {
    type: 'TIMER_STOP'
  }
}

// UI interactions
export const moveToSegment = segment => ({
  type: 'MOVE_TO_SEGMENT',
  segment
})

export const _clickScrubber = scrubberTickNum => ({
  type: 'CLICK_SCRUBBER',
  scrubberTickNum
})

export const bumpTime = (shouldIncrement) => ({
  type: 'BUMP_TIME',
  shouldIncrement
})

export const clickScrubber = (scrubberTickNum) => dispatch => {
  dispatch(stopTimer())
  dispatch(_clickScrubber(scrubberTickNum))
}

// Data layer actions
export const fetchDataBegin = () => ({
  type: 'FETCH_DATA_BEGIN'
})

export const fetchDataSuccess = (factData, dimensionData, changeData = []) => ({
  type: 'FETCH_DATA_SUCCESS',
  payload: {
    factData,
    dimensionData,
    changeData
  }
})

export const fetchDataFailure = (error) => ({
  type: 'FETCH_DATA_FAILURE',
  payload: { error }
})

// Viewport actions

export const moveViewport = (viewport) => ({
  type: 'MOVE_VIEWPORT',
  viewport
})

export const selectWaypoint = (viewport, activeWaypointIndex, transitionDurationSec = 0) => {
  viewport.transitionDuration = transitionDurationSec * 1000
  return {
    type: 'UPDATE_WAYPOINT',
    activeWaypointIndex,
    viewport
  }
}

export const selectAnnotation = (annotationGroup) => {
  return {
    type: 'SELECT_ANNOTATION',
    annotationGroup
  }
}

export const filterDataBy = (filter) => {
  return {
    type: 'FILTER_DATA_BY',
    filter
  }
}
