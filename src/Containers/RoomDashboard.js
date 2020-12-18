import React, { Component } from 'react';
import { connect } from 'react-redux';
import { popRooms } from '../actions/room'

import { Container, Card, Button, Grid, Segment} from 'semantic-ui-react'


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
           
                <Grid centered fluid style={{margin: '5%'}}>
                <Segment style={{ overflow: 'auto', maxHeight: '75vh' }}>
                        <Grid.Column>
                            <h1 style={{margin:'auto',marginTop: "10%", textAlign:'center', fontFamily: "Bublont Shadow", color: 'orange', fontSize: '5em'}}>
                                Welcome to the Neighborhood {this.props.login.username}</h1>
                            {
                                this.state.allRooms.map(room=>{                                   
                                return <li key={room.id} onClick={()=> {                                          
                                    this.props.history.push(`/rooms/${room.id}`)
                                    }}>{room.name}</li>          
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
    rooms: state.rooms
    }
}
 
export default connect(mapStateToProps, { popRooms })(RoomDashboard);