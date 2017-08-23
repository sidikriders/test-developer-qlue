import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'leaflet/dist/leaflet.css'

import store from './store'
import DefaultHome from './components/DefaultHome'
import MapsLeaflet from './components/MapsLeaflet'
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className='App'>
          <Router>
            <div>
              <Route exact path="/" component={DefaultHome}/>
              <Route exact path="/maps" component={MapsLeaflet} />
            </div>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
