import DataContainer from '../lib/dataContainer'
import { TIME_FIELD } from '../const'

const dataState = {
  loading: true,
  dimensionData: {},
  factData: [],
  changeData: [],
  error: null
}

const dataImports = (state = dataState, action) => {
  switch (action.type) {
    case 'FETCH_DATA_BEGIN':
      return {
        ...state,
        loading: true
      }
    case 'FETCH_DATA_SUCCESS':
      return {
        ...state,
        loading: false,
        dimensionData: action.payload.dimensionData,
        factData: new DataContainer(action.payload.factData, TIME_FIELD),
        changeData: action.payload.changeData
      }
    case 'FETCH_DATA_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }
    default:
      return state
  }
}

export {
  dataImports
}
