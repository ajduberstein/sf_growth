// Timer actions
import * as c from '../const'

let timer = null
// https://medium.com/@machadogj/timers-in-react-with-redux-apps-9a5a722162e8
export const startTimer = (delaySeconds = 0) => dispatch => {
  clearInterval(timer)
  const tickFunc = () => {
    dispatch(tick())
  }
  const setTimer = () => {
    timer = setInterval(tickFunc, c.MILLISECONDS_TIL_TICK)
  }
  setTimeout(setTimer, delaySeconds * 1000)
  dispatch({ type: 'TIMER_START' })
}

export const tick = () => {
  return {
    type: 'BUMP_TIME',
    timer
  }
}

export const stopTimer = () => {
  clearInterval(timer)
  return {
    type: 'TIMER_STOP'
  }
}

// UI interactions
export const _nextSegment = () => ({
  type: 'NEXT_SEGMENT'
})

const resetTimer = () => ({
  type: 'RESET_TIMER'
})

export const nextSegment = () => dispatch => {
  dispatch(stopTimer())
  dispatch(resetTimer())
  dispatch(_nextSegment())
}

export const bumpTime = (shouldIncrement) => ({
  type: 'BUMP_TIME',
  shouldIncrement
})

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
