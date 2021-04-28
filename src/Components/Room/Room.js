import React, { Component } from "react";
import RoomSocket from "../RoomSocket";
import { connect } from "react-redux";
import Navbar from "../Navbar/Navbar";
import "./Room.css";
import { login } from "../../actions/login";
import { allRooms, currentRoom, currentUserInRoom } from "../../actions/room";
import { Button, Card, Form, Grid, Segment, TextArea } from "semantic-ui-react";

const API = "http://localhost:3000/messages";

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newMessage: "",
    };
  }

  handleMessageInput = (event) => {
    this.setState({
      newMessage: event.target.value,
    });
  };

  submitMessage = (event) => {
    event.preventDefault();
    console.log("post request", this.props.roomData);
    const message = {
      room_id: this.props.roomData.id,
      content: this.state.newMessage,
      user_id: this.props.user.id,
    };

    this.setState({
      newMessage: "",
    });

    fetch(`/resources`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ message: message }),
    });
  };

  renderMessages = () => {
    console.log("renderMessages");
    return this.props.messages.map((message, index) => {
      console.log("renderMessage:", message);
      return (
        <p key={index}>
          <a className="ui blue ribbon label">{message.user.username}</a>:{" "}
          {message.message.content}
        </p>
      );
    });
  };

  render() {
    //  console.log(this.props, "ROOM DATA")
    let message = `whats fun to do in ${this.props.roomData.name}`;
    let usersInroom = `${this.props.allRooms}`;
    console.log(usersInroom, "users");
    return (
      <div>
        <Navbar />
        <h1
          style={{
            margin: "3%",
            textAlign: "center",
            fontFamily: "Bublont filled",
            color: "teal",
            fontSize: "4em",
          }}
        >
          Welcome to {this.props.roomData.name} Chatroom
        </h1>

        <div>
          <Button onClick={() => this.props.history.push("/rooms")}>
            BACK
          </Button>
        </div>

        <Grid centered style={{ verticalAlign: "bottom", border: "red" }}>
          {/* <Card.Header>Whats fun to do</Card.Header> */}
          <Segment id="MessageBox">
            <Grid.Column>
              <Card.Group>
                <Card id="cardInfo">
                  <Card.Content id="MessageContentBox">
                    {/* <Card.Description> */}

                    <strong>
                      {this.props.messages ? this.renderMessages() : null}
                    </strong>

                    {/* </Card.Description> */}
                  </Card.Content>
                </Card>
              </Card.Group>
            </Grid.Column>
          </Segment>
        </Grid>

        <div id="textForm">
          <Form onSubmit={this.submitMessage}>
            <TextArea
              width={6}
              placeholder={message}
              style={{ minHeight: 100 }}
              value={this.state.newMessage}
              onChange={this.handleMessageInput}
            />

            <input id="subButton" type="submit"></input>
          </Form>
        </div>

        <RoomSocket
          cableApp={this.props.cableApp}
          updateApp={this.props.updateApp}
          getRoomData={this.props.getRoomData}
          roomData={this.props.roomData}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    popRooms: state.rooms,
    currentRoom: state.currentRoom,
    allRooms: state.rooms,
  };
};

export default connect(mapStateToProps, { currentUserInRoom, login })(Room);
