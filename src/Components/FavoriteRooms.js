import React, { Component } from 'react';
import { connect } from 'react-redux'; 




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
                  console.log(resp)
                
                })
    }

          
    render() { 
        console.log(this.props.room)
        return ( 
            <div style={{backgroundColor: "light blue"}}>
                    <h1>Your Favorite Room</h1>
                {
                    this.props.favs.map(fav => {
                    return<div key={fav.id}> 
                            <h3
                            onClick={()=> {                                          
                                this.props.history.push(`/rooms/${fav.id}`)
                                }}
                            >{fav.name}</h3>
                        </div>
                    })
                }  
            </div>
         );
    }
}

const mapStateToProps = (state) => {
    return{
        favs: state.favs,
        room: state.room
    }
}
 
export default connect(mapStateToProps, null)(FavoriteRooms);