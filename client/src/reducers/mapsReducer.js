const initialState = {
  markerList: []
}

export default (state=initialState, action) => {
  switch(action.type){
    case "GET_MARKER_LOCATION_FULFILLED":
      return {...state, markerList: action.payload.data}
    default:
      return state
  }
}
