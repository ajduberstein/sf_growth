import React from 'react'
import ReactDOM from 'react-dom'
import AppContainer from './AppContainer'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker'
import './index.css'
import store from './store'
import 'semantic-ui-css/semantic.min.css'

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.body.appendChild(document.createElement('div')))
registerServiceWorker()
