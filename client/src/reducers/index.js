import { combineReducers } from 'redux'

import mapsReducer from "./mapsReducer"

export default combineReducers({
  mapState: mapsReducer
})
