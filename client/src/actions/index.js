 import axios from 'axios'

 export const getMarkerLocation = () => {
   return {
     type: "GET_MARKER_LOCATION",
     payload: axios.get('http://www.qlue.co.id/vacancy/svc/getDataExample.php')
   }
 }

export const getWazeMarker = () => {
  return {
    type: "GET_WAZE_MARKER",
    payload: axios.get('http://waze.qlue.id/jakarta/update/0atxn84I3hx2WmNm5ifPDZkJaLERZD9A.json')
  }
}
