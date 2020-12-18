import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';
import Login from './Components/Login'
import RoomDashboard from './Containers/RoomDashboard'
import Room from './Components/Room'
// import consumer from 'index.'
import {currentRoom} from './actions/room'
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      currentUser: null,
      allRooms: [],
      currentRoom: {}
     }
  }

  getRoomData = (id) => {
    fetch(`http://localhost:3000/rooms/${id}`)
      .then(resp => resp.json())
      .then(data => {
        this.setState({ 
          currentRoom: data });
          // this.props.currentRoom(data)
      })
  }

  updateAppStateRoom = (newRoom) => {
   
    this.setState({ 
      currentRoom: {
        room: newRoom.room.id,
        users: newRoom.users,
        messages: newRoom.messages
      } });
  }

  addNewMessageToChat = (message) => {
    this.setState({
      ...this.state,
      currentRoom: {...this.state.currentRoom, messages : [...this.state.currentRoom.messages, message]}
        });
  }


  
  render() { 
    // console.log(this.props.cableApp.cable.subscriptions)
  
    return ( 
      <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/rooms' component={RoomDashboard} />
          <Route exact path='/rooms/:id' render={ (props) => {
            return <Room
              {...props}
              messages={this.state.currentRoom.messages}
              addNewMessageToChat={this.addNewMessageToChat}
              allRooms={this.getAllRooms}
              cableApp={this.props.cableApp}
              getRoomData={this.getRoomData}
              updateApp={this.updateAppStateRoom}
              roomData={this.state.currentRoom}
              currentUser={this.state.currentUser}
            />
            }} />  
    </Switch>
     );
  }
}
 
export default connect(null, {currentRoom})(App);
