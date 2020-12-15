import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';
import Login from './Components/Login'
import MessageContainer from './Containers/MessageContainer'
import Room from './Components/Room'
// import consumer from './cable'

import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      currentUser: null,
      allRooms: [],
      currentRoom: {
        room: {},
        users: [],
        messages: []
      }
     }
  }


  render() { 
    console.log(this.props)
    this.props.cableApp.cable.subscriptions.create({
      channel: "RoomsChannel"
    })
    return ( 
      <Switch>
      <Route component={Login} exact path='/'/>
      <Route component={Room} exact path='/room'/>
    </Switch>
     );
  }
}
 
export default App;
