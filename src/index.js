import React from 'react'
import ReactDOM from 'react-dom'
import AppContainer from './AppContainer'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { rootReducer } from './reducers'
import registerServiceWorker from './registerServiceWorker'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import './index.css'
import 'semantic-ui-css/semantic.min.css'

const loggerMiddleware = createLogger()

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.body.appendChild(document.createElement('div')))
registerServiceWorker()
