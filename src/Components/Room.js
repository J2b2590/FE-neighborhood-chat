import React, { Component } from 'react';
import RoomSocket from './RoomSocket';
import { connect } from 'react-redux';
import { login } from '../actions/login'
import { allRooms, currentRoom, currentUserInRoom } from '../actions/room'
import { Button, Card, Form, Grid, Segment } from 'semantic-ui-react'

const API = "http://localhost:3000/messages"

class Room extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            newMessage: ''
         }
    }

    componentDidMount(){
        console.log("component Mount")
    }

    handleMessageInput = (event) => {
        this.setState({
            newMessage: event.target.value
        })
    }

    submitMessage = (event) => {
        
        event.preventDefault()
        this.setState({
            newMessage: ''
        })
        
       
        const message = {
            room_id: this.props.roomData.id, 
            content: this.state.newMessage,
            user_id: this.props.user.id
        }
    
        fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({message: message})
        })
        .then(resp => resp.json())
        .then(result => {

            this.props.addNewMessageToChat(result)
            // this.props.currentUserInRoom(result)
        })
    }

    renderMessages = () => {
        
            return this.props.messages.map((message,index) =>{    
                console.log(message)
                return <p key={index}> {message.user.username} : {message.message.content} </p>
            })     
    }

    render() { 
        
        return ( 
            <div >
                        
        <h1>{this.props.popRooms}</h1>

            <Grid style={{margin:'10%', border: 'red'}}>
                <Segment style={{overflow: 'auto', maxHeight: 200 }}>
                    <Grid.Column>
                        <Card.Group>
                            <Card>
                                <Card.Content>
                                    <Card.Header>{this.state.title}</Card.Header>
                                        <Card.Description>
                                            
                                            <strong> {this.props.messages ? this.renderMessages() : null} </strong>
                        
                                        </Card.Description>
                                    </Card.Content>
                            </Card>
                        </Card.Group>
                     </Grid.Column>
                </Segment>

                
            </Grid>
            <div centered style={{margin: 'auto', textAlign: 'center'}}>
                <form id='chat-form' onSubmit={this.submitMessage}>
                    <h3>Post a new message:</h3>
                    <textarea type='text' value={this.state.newMessage} onChange={this.handleMessageInput}></textarea>
                    <br></br>
                    <input type='submit'></input>
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
    return{
        user: state.user,
        popRooms: state.rooms,
        currentRoom: state.currentRoom
        }
    }

export default connect(mapStateToProps, { currentUserInRoom, login })(Room);