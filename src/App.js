import React, { Component } from "react";
import "./App.css";
import Login from "./Components/Login/Login";
import RoomDashboard from "./Containers/RoomDashboard";
import Room from "./Components/Room/Room";
import Navbar from "./Components/Navbar/Navbar";
// import FavoriteRooms from "./Components/FavoriteRooms";
// import consumer from 'index.'
import { currentRoom } from "./actions/room";
import { autoLogin, logOut } from "./actions/login";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import UserProfile from "./Components/UserProfile";

import API from "./Api";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      allRooms: [],
      currentRoom: {},
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${API}/auto_login`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          this.props.autoLogin(data);
          console.log(data, "FETCH TOKEN");
        });
    }
  }

  getRoomData = (id) => {
    fetch(`${API}/rooms/${id}`)
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          currentRoom: data,
        });
        console.log("mount", data.messages);
        // this.props.currentRoom(data)
      });
  };

  updateAppStateRoom = (newRoom) => {
    console.log("updatedRoom:", newRoom);
    this.setState({
      currentRoom: {
        ...this.state.currentRoom,
        users: newRoom.users,
        messages: newRoom.messages,
      },
    });
  };

  render() {
    // console.log(this.props.cableApp.cable.subscriptions)

    return (
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/rooms" component={RoomDashboard} />
          <Route exact path="/profile" component={UserProfile} />
          {/* <Route exact path="/favorites" component={FavoriteRooms}/> */}
          <Route
            exact
            path="/rooms/:id"
            render={(props) => {
              return (
                <Room
                  {...props}
                  messages={this.state.currentRoom.messages}
                  allRooms={this.getAllRooms}
                  cableApp={this.props.cableApp}
                  getRoomData={this.getRoomData}
                  updateApp={this.updateAppStateRoom}
                  roomData={this.state.currentRoom}
                  currentUser={this.state.currentUser}
                />
              );
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default connect(null, { currentRoom, autoLogin, logOut })(App);
