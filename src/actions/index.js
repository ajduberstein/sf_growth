// Timer actions
let timer = null
// https://medium.com/@machadogj/timers-in-react-with-redux-apps-9a5a722162e8
export const startTimer = () => dispatch => {
  clearInterval(timer)
  timer = setInterval(() => dispatch(tick()), 250)
  dispatch({ type: 'TIMER_START' })
}

export const startTimerAfter = (seconds=0) => dispatch => {
  clearInterval(timer)
  setTimeout(() => {
    dispatch(startTimer())
  }, seconds*1000)
}


export const tick = () => ({
  type: 'TIMER_TICK'
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

export const clickScrubber = (scrubberTickNum) => dispatch => {
  dispatch(stopTimer())
  dispatch(_clickScrubber(scrubberTickNum))
}

// Data layer actions
export const fetchDataBegin = () => ({
  type: 'FETCH_DATA_BEGIN'
})

export const fetchDataSuccess = (businessData, neighborhoodData) => ({
  type: 'FETCH_DATA_SUCCESS',
  payload: {
    businessData,
    neighborhoodData
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

export const selectWaypoint = (viewport, activeWaypointIndex, transitionDurationSec=0) => {
  viewport.transitionDuration = transitionDurationSec*1000
  return {
    type: 'UPDATE_WAYPOINT',
    activeWaypointIndex,
    viewport
  }
}
