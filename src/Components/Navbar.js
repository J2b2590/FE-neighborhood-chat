import React from 'react';
import {logOut} from '../actions/login'
import { connect } from 'react-redux'
import { Button, Menu, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import MainHeader from './assets/header.svg';
import Logo from './assets/logo.svg';


class Navbar extends React.Component {

    clear(){
        window.localStorage.removeItem('user');
        window.localStorage.removeItem('token');
        
    }
    
  render() {
    return (
        <Menu>
       
                <img style={{ maxWidth: 50, padding: "5px" }} src={Logo} alt={null} /> 
            
        
            <Link onClick={this.props.logOut} to='/'>
                <Menu.Item>   
                    <Button onClick={this.clear()} basic black>Sign Out</Button>
                </Menu.Item>
            </Link> 

      </Menu>
    );
  }
}



export default connect(null,{ logOut })(Navbar);
