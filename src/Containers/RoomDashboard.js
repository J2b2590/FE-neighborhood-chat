import React, { Component } from 'react';
import { connect } from 'react-redux';
import FavoriteRooms from '../Components/FavoriteRooms'
import Navbar from '../Components/Navbar'
import './RoomDashboard.css'

import { popRooms, addFavorite, checkLogin } from '../actions/room'
import {Header,Column, Container, Card, Button, Grid, Segment,Rating} from 'semantic-ui-react'

const RatingExampleRating = () => <Rating />

const API = 'http://localhost:3000//favorites'

class RoomDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
          allRooms: []        
      }
    }

    componentDidMount(){
        fetch(`http://localhost:3000/rooms`)
                .then(resp => resp.json())
                .then(resp => {
                  this.setState({ 
                    allRooms: resp });
                this.props.popRooms(resp)
                
                })
    }

    sendFavorite = (roomId) => {
        const data = {
            user_id: this.props.login.id,
            room_id: roomId
        }
        const reqObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        }
        fetch(API, reqObj)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            return this.props.addFavorite(data)  
        })
}

    
    render(){   
        // console.log(this.props.checkLogin,"check login")
        // console.log(this.props.login, "Login") 
    
    return(
        <div>
<Navbar style={{ position: 'fixed' }} />
<div>
    <h4>Choose from a list of local Chicago Neighborhoods to chat in </h4>
</div>

<Grid divided="vertically" className="roomDashboard" style={{ height: '105vh' }}>    
    <Grid.Row columns={2}>
  <Grid.Column className="favSide" >
    <div >
        <FavoriteRooms style={{ position: 'fixed' }}  history={this.props.history} />
    </div>
  </Grid.Column>
                <Grid.Column className="roomSide" >
                            <h1 style={{ margin:'auto',marginTop: "10%", textAlign:'center', fontFamily: "Bublont Shadow", color: 'orange', fontSize: '3em'}}>
                                Welcome to the Neighborhood {this.props.login.username}</h1>
                            {
                                this.state.allRooms.map(room=>{   
                                              
                                return <div  key={room.id}>
                                    <Grid celled columns={5}>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <h3 style={{padding: "5px",margin:'auto',marginTop: "5%", textAlign:'center', fontFamily: "Bublont outline", fontSize: "3em"}} 
                                                onClick={()=> {                                          
                                                this.props.history.push(`/rooms/${room.id}`)
                                                }}>{room.name}</h3>
                                                <Rating onClick={()=> this.sendFavorite(room.id)} maxRating={1} defaultRating={1} icon='star' size='large' /> 
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                            
                                            
                                        </div>               
                                })
                            } 
                        </Grid.Column>
                        </Grid.Row>
</Grid>

                
            
</div>

    )
}
}

const mapStateToProps = (state) => {
return{
    login: state.user,
    rooms: state.rooms,
    }
}
 
export default connect(mapStateToProps, { popRooms, addFavorite })(RoomDashboard);