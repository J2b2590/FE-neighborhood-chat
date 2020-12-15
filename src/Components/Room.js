import React, { Component } from 'react';




class Room extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            room: ''
         }
    }
    


    render() { 
        console.log(this.props, "room cont")
        return ( 
            <div>
                
                <h3>room cont</h3>
            </div>
         );
    }
}
 
export default Room;