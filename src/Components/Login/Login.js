import React, { Component } from 'react';
import "./Login.css"
import { login } from '../../actions/login'
import { connect } from 'react-redux';
import MainHeader from '../assets/header.svg';
import Logo from '../assets/logo.svg';


import { Card, Form, Button, Grid, Segment, Image, Header, Message } from 'semantic-ui-react'

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
          
          
          <div id="loginApp">
            {this.state.error ? <h1 style={{color: "red"}}> {this.state.error} </h1> : null}
            <div >

            <Grid id="loginApp"  textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
              <Grid.Column style={{ maxWidth: 450 }}>
                <img className="logo" style={{ maxWidth: 450 }} src={Logo} alt={null} /> 
                <img className="header"style={{ maxWidth: 450 }} src={MainHeader}  alt={null} />        
                <Form size='large' onSubmit={this.handleSubmit}>
                  <Segment stacked>
                    <Form.Field 
                      fluid 
                      icon='user' 
                      iconPosition='left' 
                      placeholder='E-mail address' >
                      <input type="text" name="username" placeholder="SIGN IN" onChange={(event) => this.handleChange(event)} value={this.state.username}/>
                    </Form.Field> 
                    
                    <Form.Field
                      fluid icon='lock'
                      iconPosition='left'
                      placeholder='Password'
                      type='password'
                    >
                      <input type="password" name="password" placeholder="PASSWORD" onChange={(event) => this.handleChange(event)} value={this.state.password}/>  
                    </Form.Field>
                    <Button color='teal' fluid size='large'>
                      Login
                    </Button>
                  </Segment>
                </Form>
              </Grid.Column>
            </Grid>
            </div>
          </div>     
       );
    }
}


export default connect(null, { login })(Login);


