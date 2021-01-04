import React, { Component,} from "react";
import RoomSocket from "./RoomSocket";
import { connect } from "react-redux";
import Navbar from './Navbar'
import { login } from "../actions/login";
import { allRooms, currentRoom, currentUserInRoom } from "../actions/room";
import { Button, Card, Form, Grid, Segment } from "semantic-ui-react";


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
    console.log("post request", this.props.roomData)
    const message = {
      room_id: this.props.roomData.id,
      content: this.state.newMessage,
      user_id: this.props.user.id,
    };

    this.setState({
        newMessage: "",
      });

    fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ message: message }),
    })
  };

  renderMessages = () => {
    console.log("renderMessages");
    return this.props.messages.map((message, index) => {
        console.log("renderMessage:", message)
      return (
        <p key={index}>
          <a class="ui blue ribbon label">{message.user.username}</a>
           : {message.message.content}
        </p>
      );
    });
  };

  render() {
    //  console.log(this.props, "ROOM DATA")
    
    return (
      <div>
        <Navbar />
        <h1 style={{margin: "5%",textAlign: "center", fontFamily: "Bublont Shadow", color: 'orange', fontSize: '7em'}}>
          Welcome to {this.props.roomData.name} Chatroom</h1>
          
        <div>
            <Button onClick={()=> this.props.history.push('/rooms')}>BACK</Button>
        </div>

        
      
        <Grid centered style={{verticalAlign:"bottom", margin: "3%", border: "red" }}>
          <Segment style={{ overflow: "auto", maxHeight: 200 }}>
            <Grid.Column>
              <Card.Group>
                <Card>
                  <Card.Content>
                    <Card.Header>Whats fun to do</Card.Header>
                    <Card.Description>
                        
                      <strong>
                        {this.props.messages
                          ? this.renderMessages()
                          : null}
                      </strong>

                    </Card.Description>
                  </Card.Content>
                </Card>
              </Card.Group>
            </Grid.Column>
          </Segment>
        </Grid>
        
        <div centered style={{ margin: "5%", textAlign: "center" }}>
          <form id="chat-form" onSubmit={this.submitMessage}>
            <h3>Post a new message:</h3>
            <textarea
              type="text"
              value={this.state.newMessage}
              onChange={this.handleMessageInput}
            ></textarea>
            <br></br>
            <input type="submit"></input>  
          </form>
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
  };
};

export default connect(mapStateToProps, { currentUserInRoom, login })(Room);
