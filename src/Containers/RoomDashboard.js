import React, { Component } from 'react';
import { connect } from 'react-redux';
import { popRooms, addFavorite } from '../actions/room'

import { Container, Card, Button, Grid, Segment,Rating} from 'semantic-ui-react'

const RatingExampleRating = () => <Rating />



class RoomDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
          allRooms: [],         
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

    
    render(){    
    return(
<div>
           
                <Grid centered style={{margin: '5%'}}>
                <Segment style={{borderColor: "aliceblue",
                        overflow: 'auto', maxHeight: '90vh' }}>   
                        <Grid.Column>
                            <h1 style={{ margin:'auto',marginTop: "10%", textAlign:'center', fontFamily: "Bublont Shadow", color: 'orange', fontSize: '5em'}}>
                                Welcome to the Neighborhood {this.props.login.username}</h1>
                            {
                                this.state.allRooms.map(room=>{   
                                              
                                return <div  key={room.id}>
                                            
                                            <Rating onClick={()=> this.props.addFavorite(`${room.name}`)} maxRating={1} defaultRating={1} icon='star' size='large' /> 
                                            <h3 style={{padding: "5px",margin:'auto',marginTop: "5%", textAlign:'center', fontFamily: "Bublont outline", fontSize: "3em"}} 
                                            
                                            onClick={()=> {                                          
                                            this.props.history.push(`/rooms/${room.id}`)
                                            }}>{room.name}</h3>
                                        </div>               
                                })
                            } 
                        </Grid.Column>
                    </Segment>
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