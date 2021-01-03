import React from 'react';
import {logOut} from '../actions/login'
import { connect } from 'react-redux'

import { Button, Menu, Dropdown } from 'semantic-ui-react'


import { Link } from 'react-router-dom'


class Navbar extends React.Component {
  render() {
    return (
        <Menu>
            {/* <Link >
                <Menu.Item>
                    
                    <Button basic>Favorites</Button>
                </Menu.Item>
            </Link>
            
            <Link className="right Menu.item" style={{marginLeft: 'auto'}} to='/rooms/new'>
                <Menu.Item>
                    <Button basic>Make A Room</Button>
                </Menu.Item>
            </Link> */}
            
            <Link className="right Menu.item" to='/'>
                <Menu.Item>   
                    <Button onClick={this.props.clear()} basic black>Sign Out</Button>
                </Menu.Item>
            </Link> 

      </Menu>
    );
  }
}



export default connect(null,{ logOut })(Navbar);
