import { createStore, applyMiddleware } from 'redux'
import promise from 'redux-promise-middleware'
import thunk from 'redux-thunk'

import rootReducers from '../reducers/index.js'

export default createStore(rootReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(promise(), thunk))
