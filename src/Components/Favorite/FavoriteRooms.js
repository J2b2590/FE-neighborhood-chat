import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import {FeedDate, Grid,Rating,Room, Button} from 'semantic-ui-react'
import "./Favorite.css"
import { deleteFavorite } from '../../actions/room'






class FavoriteRooms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: false, 
            favorite: this.props.user.favorite_rooms,
            hidden: false
         }
    }

    componentDidUpdate(prevProps){
        fetch(`http://localhost:3000/favorites`)
                .then(resp => resp.json())
                .then(resp => {
                  console.log(resp, "favorites")
                })
                if (prevProps.user.favorite_rooms !== this.state.favorite){
                    this.setState({ 
                        favorite: this.props.user.favorite_rooms });
                }
            }
            

    removeFav = (id) => {
        console.log(id,"removeFav")
        const token = localStorage.getItem("token")
        fetch(`http://localhost:3000/favorites/${id}`, {
            method: 'DELETE', 
            headers: {
                Authorization: `Bearer ${token}`
              }
            })
            .then(resp => resp.json())
            .then(resp =>{
                console.log(resp)
            }) 
        }
    

    
isLoggedIn = () => {
    
    return  <div>            
    {
        this.props.user.favorite_rooms.map(fav => {
            debugger
        return <div key={fav.id} >
            <Grid celled columns={5}>
                            <Grid.Row  style={{whiteSpace: "nowrap", backgroundColor: "#72cac8"}}>
                                <Grid.Column>
                                    <h3 style={{padding: "5px",margin:'auto',marginTop: "5%", textAlign:'center', fontFamily: "Bublont outline", fontSize: "3em"}} 
                                    onClick={()=> {                                          
                                        this.props.history.push(`/rooms/${fav.id}`)
                                        }}
                                    >{fav.name}</h3>
                                    
                                    <Button onClick={()=>this.removeFav(`${fav.id}`)} icon='x' size='large' /> 

                                </Grid.Column>
                            </Grid.Row>
                        </Grid>           
            </div>
        })
    }  
</div>
}
          
    render() { 
       
        return ( 
           <React.Fragment>
               {this.props.user.username !== "" ? this.isLoggedIn() : null }
           </React.Fragment>
         );
    }
}

const mapStateToProps = (state) => {
    return{
        user: state.user,
        room: state.room
    }
}
 
export default connect(mapStateToProps, { deleteFavorite } )(FavoriteRooms);