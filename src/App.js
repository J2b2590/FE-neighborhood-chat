import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';
import Login from './Components/Login'
import MessageContainer from './Containers/MessageContainer'
import Room from './Components/Room'
// import consumer from 'index.'

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


  componentDidMount(){
  fetch(`http://localhost:3000/rooms`)
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        debugger
      })
    }

  updateUser = (user) => {
    this.setState({ 
      currentUser: user  });
  }

  getRoomData = (id) => {
    fetch(`http://localhost:3000/rooms/${id}`)
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        debugger
      })
  }
  
  render() { 
    // console.log(this.props.cableApp.cable.subscriptions)
    
    return ( 
      <Switch>
        <Route component={Login} exact path='/'/>
        <Route exact path='/room' render={(props)=>{
         return <Room {...props}
         cableApp={this.props.cableApp}
         updateApp={this.updateAppStateRoom}
         getRoomData={this.getRoomData}
         roomData={this.state.currentRoom}
         currentUser={this.state.currentUser} 
         />
        }}/>
    </Switch>
     );
  }
}
 
export default App;
