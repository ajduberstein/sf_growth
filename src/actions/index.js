// Timer actions
let timer = null
// https://medium.com/@machadogj/timers-in-react-with-redux-apps-9a5a722162e8
export const startTimer = () => dispatch => {
  clearInterval(timer)
  timer = setInterval(() => dispatch(tick()), 100)
  dispatch({ type: 'TIMER_START' })
  dispatch(tick())
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

export const pauseTimerAtYear = year => ({
  type: 'PAUSE_TIMER_AT_YEAR',
  year
})

export const selectWaypoint = waypointId => ({
  type: 'PAUSE_TIMER_AT_YEAR',
  waypointId
})

export const clickScrubber = scrubberTickNum => ({
  type: 'CLICK_SCRUBBER',
  scrubberTickNum
})

// Data layer actions

export const buildDatabase = () => ({
  type: 'BUILD_DATABASE'
})

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
