import React from 'react';
import { connect } from 'react-redux';
import { marker, map, tileLayer, icon } from 'leaflet';

import { getMarkerLocation } from '../actions';

class MapsLeaflet extends React.Component {
  constructor() {
    super()
    this.state = {
      myMap: "",
      markerIcon: icon({
        iconUrl: 'http://www.qlue.co.id/vacancy/svc/icon-marker.png'
      })
    }
  }
  render() {
    return (
      <div style={{display: "flex", flexDirection: "row"}}>
        <div id="petanya" style={{width: '50%', height: '100vh', border: 'black 2px solid'}}>
        </div>
        <div id="navigasinya" style={{width: '50%', height: '100vh', border: 'black 2px solid', overflowY: "scroll"}}>
          {
            this.props.markerList.length > 0 ?
            <div>
              <h2><strong>Marker Navigation</strong></h2>
              <div style={{textAlign: "left"}}>
                {
                  this.props.markerList.map( (x) => {
                    let lat = x.lat;
                    let lng = x.lng;
                    return (
                      <div key={x.placemark_id} style={{marginBottom: "20px"}}>
                        <span> {x.name} </span><button style={{marginLeft: "20px"}} onClick={ () => this.changeMapView(lat, lng)}>Look!</button>
                      </div>
                    )
                  })
                }
              </div>
            </div>
            :
            null
          }
        </div>
      </div>
    )
  }

  changeMapView(lat, lng) {
    console.log(lat, lng);
    let mapTemp = this.state.myMap
    mapTemp.setView([Number(lat), Number(lng)], 13)
    this.setState({
      myMap: mapTemp
    })
  }

  componentWillMount() {
    this.props.getMarkerLocation()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.markerList !== nextProps.markerList) {
      console.log("lat & lang", Number(nextProps.markerList[0].lat, 10), Number(nextProps.markerList[0].lng, 10));
      let mapTemp = map('petanya').setView([Number(nextProps.markerList[0].lat, 10), Number(nextProps.markerList[0].lng, 10)], 13)

      tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapTemp)

      nextProps.markerList.forEach( x => {
        marker([Number(x.lat), Number(x.lng)], {icon: this.state.markerIcon}).addTo(mapTemp).bindPopup(`Name: ${x.name}\nAddress: ${x.address}`)
      })

      this.setState({
        myMap: mapTemp
      })
    }
  }

}

let mapStateToProps = (state) => {
  return {
    markerList: state.mapState.markerList
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    getMarkerLocation: () => dispatch(getMarkerLocation())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapsLeaflet)
