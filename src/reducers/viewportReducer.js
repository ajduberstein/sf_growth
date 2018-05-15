import { waypoints } from '../waypoints'

import {FlyToInterpolator} from 'react-map-gl'

let firstPoint = waypoints[0]

const viewportState = {
  viewport: {
    longitude: firstPoint.longitude,
    latitude: firstPoint.latitude,
    zoom: firstPoint.zoom,
    maxZoom: 17,
    pitch: 0,
    bearing: 0,
    width: 500,
    height: 500,
    transitionDuration: 5000,
    transitionInterpolator: new FlyToInterpolator()
  }
}

const viewportReducer = (state = viewportState, action) => {
  switch (action.type) {
    case 'MOVE_VIEWPORT':
      return {
        ...state,
        viewport: {
          ...state.viewport,
          ...action.viewport
        }
      }
    default:
      return state
  }
}

export {
  viewportReducer
}
