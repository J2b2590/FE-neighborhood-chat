import React, { Component } from 'react';

class RoomCreate extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: ""    
         }
    }

    handleOnChange = e => {
        this.setState({ 
            [e.target.name]: e.target.value 
        });
    }

    handleSubmit = e => {
        e.preventDefault
    }


    render() { 
        return ( 
            <div>content</div>
         );
    }
}
 
export default RoomCreate;