const dataState = {
  loading: false,
  neighorhoodData: {},
  businessData: [],
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
      console.log(action)
      return {
        ...state,
        loading: false,
        neighorhoodData: action.payload.neighorhoodData,
        businessData: action.payload.businessData
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
