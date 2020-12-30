import React, { Component } from 'react';
import { connect } from 'react-redux';
import FavoriteRooms from '../Components/FavoriteRooms'
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
            this.props.addFavorite(data)
    })
}

    
    render(){   
        // console.log(this.props.checkLogin,"check login")
        // console.log(this.props.login, "Login") 
    
    return(


<Grid divided="vertically">
<Grid.Row columns={2}>
      <Grid.Column>
          <h2>side</h2>
      </Grid.Column>
      <Grid.Column>
          <h2>side</h2>
      </Grid.Column>
    </Grid.Row>
    
    <Grid.Row columns={2}>
  <Grid.Column left floated only='computer' computer={5}>
    <div>
        <FavoriteRooms  history= {this.props.history} />
    </div>
  </Grid.Column>
                <Grid.Column right floated mobile={16} tablet={8} computer={5}>
                            <h1 style={{ margin:'auto',marginTop: "10%", textAlign:'center', fontFamily: "Bublont Shadow", color: 'orange', fontSize: '5em'}}>
                                Welcome to the Neighborhood {this.props.login.username}</h1>
                            {
                                this.state.allRooms.map(room=>{   
                                              
                                return <div  key={room.id}>
                                            
                                            <Rating onClick={()=> this.sendFavorite(room.id)} maxRating={1} defaultRating={1} icon='star' size='large' /> 
                                            <h3 style={{padding: "5px",margin:'auto',marginTop: "5%", textAlign:'center', fontFamily: "Bublont outline", fontSize: "3em"}} 
                                            
                                            onClick={()=> {                                          
                                            this.props.history.push(`/rooms/${room.id}`)
                                            }}>{room.name}</h3>
                                        </div>               
                                })
                            } 
                        </Grid.Column>
                        </Grid.Row>
</Grid>

                
            
                

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