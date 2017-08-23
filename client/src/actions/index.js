 import axios from 'axios'

 export const getMarkerLocation = () => {
   return {
     type: "GET_MARKER_LOCATION",
     payload: axios.get('http://www.qlue.co.id/vacancy/svc/getDataExample.php')
   }
 }
