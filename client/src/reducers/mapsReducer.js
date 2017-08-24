const initialState = {
  markerList: [],
  wazeList: []
}

export default (state=initialState, action) => {
  switch(action.type){
    case "GET_MARKER_LOCATION_FULFILLED":
      return {...state, markerList: action.payload.data}
    case "GET_WAZE_MARKER_FULFILLED":
      return {...state, wazeList: action.payload.data.alerts}
    default:
      return state
  }
}
