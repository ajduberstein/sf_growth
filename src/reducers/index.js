import { combineReducers } from 'redux'
import { dataImports } from './dataImports'
import { uiInteraction } from './uiInteraction'
import { viewportReducer } from './viewportReducer'

const rootReducer = combineReducers({
  dataImports,
  uiInteraction,
  viewportReducer
})

export {
  rootReducer
}
