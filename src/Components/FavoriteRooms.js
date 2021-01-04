import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import {FeedDate, Grid,Rating} from 'semantic-ui-react'

import { deleteFavorite } from '../actions/room'






class FavoriteRooms extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            title: ''
         }
    }

    componentDidMount(){
        fetch(`http://localhost:3000/favorites`)
                .then(resp => resp.json())
                .then(resp => {
                    // this.props.favs.map(fav => {
                    //     console.log(fav, "map through favs")
                    //     if(resp.rooms.id === fav.id)
                    //     return console.log(true)
                    // })
                //   console.log(resp.user.username, "FAVORITES ROOM")
                
                })
    }

    deleteFavorite(id){
        fetch(`http://localhost:3000/favorites${id}`, {method: 'DELETE'})
                .then(resp => resp.json())
                .then(resp => {
                    this.props.deleteFavorite(resp)
                    console.log(resp,"DELETe fav")
                
                })
    }
    

          
    render() { 
        console.log(this.props, "FAVORITE")
        return ( 
            <div style={{backgroundColor: "light blue"}}>
                    <h1>Your Favorite Rooms</h1>
                {
                    
                    this.props.favs.map(fav => {
                    return<div key={fav.id}>
                        <Grid celled columns={5}>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <h3 style={{padding: "5px",margin:'auto',marginTop: "5%", textAlign:'center', fontFamily: "Bublont outline", fontSize: "3em"}} 
                                                onClick={()=> {                                          
                                                    this.props.history.push(`/rooms/${fav.id}`)
                                                    }}
                                                >{fav.name}</h3>
                                                <h4 onClick={()=>this.deleteFavorite(`${fav.id}`)}> remove </h4>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid> 
                            
                            
                        </div>
                    })
                }  
            </div>
         );
    }
}

const mapStateToProps = (state) => {
    return{
        favs: state.user.favorite_rooms,
        room: state.room
    }
}
 
export default connect(mapStateToProps, { deleteFavorite } )(FavoriteRooms);