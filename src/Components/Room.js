import React, { Component } from 'react';




const API = "http://localhost:3000/messages"
class Room extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            room: ''
         }
    }

    // componentDidMount(){
    //     fetch(API)
    //     .then(resp => resp.json())
    //     .then(data =>{
    //         console.log(data)
    //         debugger
    //       this.setState({ 
    //         notes: data });
    //     })
    //   }
    

    render() { 
        
        this.props.cableApp.cable.subscriptions.create({
            channel: "RoomsChannel"
          })
          
        console.log(this.props, "room cont")
        return ( 
            <div>
                
                <h3>room cont</h3>
            </div>
         );
    }
}
 
export default Room;