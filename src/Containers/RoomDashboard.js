import React, { Component } from "react";
import { connect } from "react-redux";
import FavoriteRooms from "../Components/Favorite/FavoriteRooms";
import Navbar from "../Components/Navbar/Navbar";
import "./RoomDashboard.css";

import API from "../Api";

import { popRooms, addFavorite, checkLogin } from "../actions/room";
import {
  Header,
  Column,
  Container,
  Card,
  Button,
  Grid,
  Segment,
  Rating,
} from "semantic-ui-react";

const RatingExampleRating = () => <Rating />;

// const API = "http://localhost:3000//favorites";

class RoomDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allRooms: [],
    };
  }

  componentDidMount() {
    fetch(`${API}/rooms`)
      .then((resp) => resp.json())
      .then((resp) => {
        this.setState({
          allRooms: resp,
        });
        this.props.popRooms(resp);
      });
  }

  sendFavorite = (roomId) => {
    const data = {
      user_id: this.props.login.id,
      room_id: roomId,
    };
    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(API, reqObj)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data, "DATA");
        this.props.addFavorite(data);
      });
  };

  render() {
    // console.log(this.props.checkLogin,"check login")
    // console.log(this.props.login, "Login")

    return (
      <div>
        <Navbar style={{ position: "fixed" }} />
        <div>
          <h1
            style={{
              margin: "auto",
              marginTop: "2%",
              textAlign: "center",
              fontFamily: "Bublont filled",
              color: "#4158a7",
              fontSize: "4em",
            }}
          >
            Welcome to the Neighborhood {this.props.login.username}
          </h1>
        </div>

        <Grid
          divided="vertically"
          className="roomDashboard"
          style={{ height: "105vh" }}
        >
          <Grid.Row columns={2}>
            <Grid.Column className="favSide">
              <div className="favText">
                <h4 id="favHeader">Your favorite chatrooms here</h4>
                <FavoriteRooms
                  style={{ position: "fixed" }}
                  history={this.props.history}
                />
              </div>
            </Grid.Column>
            <Grid.Column className="roomSide">
              <h4 id="localHeader">Chatrooms in your area</h4>
              {this.state.allRooms.map((room) => {
                return (
                  <div key={room.id}>
                    <Grid celled columns={5}>
                      <Grid.Row className="roomName">
                        <Grid.Column>
                          <h3
                            style={{
                              color: "#72cac8",
                              padding: "5px",
                              margin: "auto",
                              marginTop: "5%",
                              textAlign: "center",
                              fontFamily: "Bublont filled",
                              fontSize: "3em",
                            }}
                            onClick={() => {
                              this.props.history.push(`/rooms/${room.id}`);
                            }}
                          >
                            {room.name}
                          </h3>
                          <Button
                            onClick={() => this.sendFavorite(room.id)}
                            maxRating={1}
                            defaultRating={1}
                            icon="star"
                            size="large"
                          />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </div>
                );
              })}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.user,
    rooms: state.rooms,
  };
};

export default connect(mapStateToProps, { popRooms, addFavorite })(
  RoomDashboard
);
