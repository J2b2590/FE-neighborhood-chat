import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { addFavorite, popRooms } from '../actions/room';

class FavoriteRooms extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            title: ''
         }
    }
      
    render() { 
        console.log(this.props, "favs")
        debugger
        return ( 
            <div>
                <h1>Favs rooms</h1>
                {
                // this.props.addFavorite.map(room =>{
                //     debugger
                //     console.log(room)
                // })
                }
            </div>
         );
    }
}

const mapStateToProps = state => {
    
    return{
        addFavorite: state.addFavorite,
        popRooms: state.popRooms
    }
}
 
export default connect(mapStateToProps, { addFavorite })(FavoriteRooms);