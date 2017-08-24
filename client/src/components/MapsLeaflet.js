import React from 'react';
import { connect } from 'react-redux';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { icon } from 'leaflet';

import { getMarkerLocation } from '../actions';

class MapsLeaflet extends React.Component {
  constructor() {
    super()
    this.state = {
      centerView: [51.505, -0.09],
      markerIcon: icon({
        iconUrl: 'http://www.qlue.co.id/vacancy/svc/icon-marker.png'
      }),
      showNavigation: false,
      style: {
        navBar: {
          width: '5%',
          height: '100vh',
          borderLeft: 'black 1px solid',
          overflowY: "scroll",
          paddingLeft: "20px",
          transition: "width 1s"
        },
        mapNya: {
          width: '95%',
          height: '100vh',
          borderRight: 'black 2px solid',
          transition: "width 1s"
        }
      }
    }
  }
  render() {
    return (
      <div style={{display: "flex"}}>
        <Map center={this.state.centerView} zoom={13} style={this.state.style.mapNya}>
          {
            this.props.markerList.length > 0 ?
            <div>
              <TileLayer
                url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              {
                this.props.markerList.map( x => {
                  return (
                    <Marker key={x.placemark_id} position={[Number(x.lat), Number(x.lng)]} icon={this.state.markerIcon}>
                      <Popup>
                        <span>
                          <h4>{x.name}</h4>
                          <p>{x.address}</p>
                        </span>
                      </Popup>
                    </Marker>
                  )
                })
              }
            </div>
            :
            null
          }
        </Map>
        <div id="navigasinya" style={this.state.style.navBar}>
          {
            this.props.markerList.length > 0 ?
            <div>
              <div style={{textAlign: "right", paddingRight: "10px", paddingTop: "10px"}}>
                <button onClick={() => this.showNavBar()}>
                  <img style={{ height: "30px", width: "30px" }} src="https://cdn4.iconfinder.com/data/icons/flat-black/128/menu.png"/>
                </button>
              </div>
              {
                this.state.showNavigation ?
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
            :
            null
          }
        </div>
      </div>
    )
  }

  showNavBar() {
    if (this.state.showNavigation) {
      this.setState({
        style: {...this.state.style, navBar: {...this.state.style.navBar, width: "5%"}, mapNya: {...this.state.style.mapNya, width: "95%"}},
        showNavigation: false
      })
    } else {
      this.setState({
        style: {...this.state.style, navBar: {...this.state.style.navBar, width: "50%"}, mapNya: {...this.state.style.mapNya, width: "50%"}},
        showNavigation: true
      })
    }
  }

  changeMapView(lat, lng) {
    this.setState({
      centerView: [Number(lat), Number(lng)]
    })
  }

  componentWillMount() {
    this.props.getMarkerLocation()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.markerList !== nextProps.markerList) {
      this.setState({
        centerView: [Number(nextProps.markerList[0].lat), Number(nextProps.markerList[0].lng)]
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
