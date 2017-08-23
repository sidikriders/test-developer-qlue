import React from 'react'
import logo from '../logo.svg';
import { connect } from 'react-redux'

let DefaultHome = (props) => {
  return (
    <div>
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to React</h2>
      </div>
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
    </div>
  )
}

let mapStateToProps = (state) => {
  return
}

let mapDispatchToProps = (dispatch) => {
  return
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultHome)
