import React, { Component } from 'react';
import { login } from '../actions/login'
import { connect } from 'react-redux';

import { Card, Form, Button, Grid } from 'semantic-ui-react'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            error: null,
            username: "",
            password: ""
         }
    }

    handleSubmit = e => {
        e.preventDefault();
        fetch(`http://localhost:3000/users`,{ 
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(this.state)
         })
        .then(resp => resp.json())
        .then(user => {
          console.log(user, "login User")

          if(user.error){
            this.setState({ 
              error: user.error  });

          }else{
          this.props.login(user)
          localStorage.setItem("token", user.jwt)
          }
          this.props.history.push('/rooms')
        })
        this.setState({
          username: "",
          password: "",
        })
      }

    handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value,
          [e.target.name]: e.target.value
        });
      }

    render() {
        return(
          <div>
            <h1 style={{margin:'auto',marginTop: "10%", textAlign:'center', fontFamily: "Bublont Shadow", color: 'orange', fontSize: '10em'}}>NEIGHBORHOOD CHAT</h1>
            
            {this.state.error ? <h4 style={{color: "red"}}> {this.state.error} </h4> : null}
            
            <Grid centered style={{margin:'auto',width: '25%',marginTop: '10%'}} >
              <Grid.Column>
                  <Form onSubmit={this.handleSubmit}>
                      <Form.Field>
                      <label>Username</label>
                      <input type="text" name="username" placeholder="SIGN IN" onChange={(event) => this.handleChange(event)} value={this.state.username}/>
                      </Form.Field>

                      <Form.Field>
                      <label>password</label>
                      <input type="text" name="password" placeholder="PASSWORD" onChange={(event) => this.handleChange(event)} value={this.state.password}/>
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