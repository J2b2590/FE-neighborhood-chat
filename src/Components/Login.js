import React, { Component } from 'react';
import { login } from '../actions/login'
import { connect } from 'react-redux';

import { Card, Form, Button, Grid } from 'semantic-ui-react'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: ""
         }
    }

    handleSubmit = e => {
        e.preventDefault();
        fetch(`http://localhost:3000/users`,{ 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
         })
        .then(resp => resp.json())
        .then(user => {
          this.props.login(user)
          this.props.history.push('/room')
        })
        this.setState({
          username: "",
        })
      }

    handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
      }

    render() {
        return(
          <div>
            <h1 style={{margin:'auto',marginTop: "10%", textAlign:'center', fontFamily: "Bublont Shadow", color: 'orange', fontSize: '10em'}}>NEIGHBORHOOD CHAT</h1>
            
            <Grid centered style={{margin:'auto',width: '25%',marginTop: '10%'}} >
              <Grid.Column>
                  <Form onSubmit={this.handleSubmit}>
                      <Form.Field>
                      <label>Username</label>
                      <input type="text" name="username" placeholder="SIGN IN" onChange={(event) => this.handleChange(event)} value={this.state.username}/>
                      </Form.Field>
                      
                      <Button type='submit'>Submit</Button>
              </Form>
              </Grid.Column>
            </Grid>
          </div>     
       );
    }
}


export default connect(null, { login })(Login);