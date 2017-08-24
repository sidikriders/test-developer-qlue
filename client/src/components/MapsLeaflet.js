import React from 'react';
import { connect } from 'react-redux';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { icon } from 'leaflet';

import { getMarkerLocation, getWazeMarker } from '../actions';

class MapsLeaflet extends React.Component {
  constructor() {
    super()
    this.state = {
      centerView: [51.505, -0.09],
      markerIcon: icon({
        iconUrl: 'http://www.qlue.co.id/vacancy/svc/icon-marker.png'
      }),
      wazeIcon: icon({
        iconUrl: "https://i.stack.imgur.com/6cDGi.png",
        iconSize: [38, 40]
      }),
      showNavigation: false,
      showMarkerTerminal: true,
      showWazeMarker: true,
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
                this.state.showNavigation ?
                <div>
                  {
                    this.state.showMarkerTerminal ?
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
                    :
                    null
                  }
                  {
                    this.state.showWazeMarker ?
                      this.props.wazeList.map( x => {
                        if (x.reliability > 6) {
                          return (
                            <Marker key={x.uuid} position={[Number(x.location.y), Number(x.location.x)]} icon={this.state.wazeIcon} style={{width: "10px", height: "10px"}}>
                              <Popup>
                                <span>
                                  <h4>{x.subtype}</h4>
                                  <p>{x.street}</p>
                                </span>
                              </Popup>
                            </Marker>
                          )
                        }
                      })
                    :
                    null
                  }
                </div>
                :
                null
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
                  <img alt="burger-menu" style={{ height: "30px", width: "30px" }} src="https://cdn4.iconfinder.com/data/icons/flat-black/128/menu.png"/>
                </button>
              </div>
              {
                this.state.showNavigation ?
                <div>
                  <h2><strong>Marker Navigation</strong></h2>
                  <span><button onClick={() => this.showMarkerTerminal()}>Terminal Marker</button></span><span style={{marginLeft: "30px"}}><button onClick={() => this.showWazeMarker()}>Waze Marker</button></span>
                  <div style={{textAlign: "left", marginTop: "30px"}}>
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

  showMarkerTerminal() {
    if (this.state.showMarkerTerminal) {
      this.setState({
        showMarkerTerminal: false
      })
    } else {
      this.setState({
        showMarkerTerminal: true
      })
    }
  }

  showWazeMarker() {
    if (this.state.showWazeMarker) {
      this.setState({
        showWazeMarker: false
      })
    } else {
      this.setState({
        showWazeMarker: true
      })
    }
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
    this.props.getWazeMarker()
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
    markerList: state.mapState.markerList,
    wazeList: state.mapState.wazeList
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    getMarkerLocation: () => dispatch(getMarkerLocation()),
    getWazeMarker: () => dispatch(getWazeMarker())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapsLeaflet)
