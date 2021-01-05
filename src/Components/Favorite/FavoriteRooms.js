import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import {FeedDate, Grid,Rating,Room, Button} from 'semantic-ui-react'
import "./Favorite.css"
import { deleteFavorite } from '../../actions/room'


class FavoriteRooms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: false
         }
    }

    // componentDidUpdate(){
    //     fetch(`http://localhost:3000/favorites`)
    //             .then(resp => resp.json())
    //             .then(resp => {
    //               console.log(resp, "favorites")
    //             }) 
    //         }
            

    removeFav = (id) => {
        console.log(id,"removeFav")
        
        fetch(`http://localhost:3000/favorites/${id}`, {
            method: 'DELETE', 
            
            })
            .then(resp => resp.json())
            .then(resp =>{
                console.log(resp)
                this.props.deleteFavorite(id)
            }) 
        }
    

    
isLoggedIn = () => {
    
    return  <div>            
    {
        this.props.user.favorites ?
        this.props.user.favorites.map(fav => {
            
        return <div key={fav.id} >
            <Grid celled columns={5}>
                            <Grid.Row  style={{whiteSpace: "nowrap", backgroundColor: "#72cac8"}}>
                                <Grid.Column>
                                    <h3 style={{padding: "5px",margin:'auto',marginTop: "5%", textAlign:'center', fontFamily: "Bublont outline", fontSize: "3em"}} 
                                    onClick={()=> {                                          
                                        this.props.history.push(`/rooms/${fav.id}`)
                                        }}
                                    >{fav.room.name}</h3>
                                    
                                    <Button onClick={()=>this.removeFav(fav.id)} icon='x' size='large' /> 

                                </Grid.Column>
                            </Grid.Row>
                        </Grid>           
            </div>

        })
        : null }  
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