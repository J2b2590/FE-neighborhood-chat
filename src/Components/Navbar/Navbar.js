import React from "react";
import { logOut } from "../../actions/login";
import { connect } from "react-redux";
import { Button, Menu, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";

import "./Navbar.css";
import Logo from "../assets/logo.svg";

class Navbar extends React.Component {
  clear() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  render() {
    return (
      <Menu>
        <img style={{ maxWidth: 50, padding: "5px" }} src={Logo} alt={null} />

        <Link onClick={this.props.logOut} to="/">
          <div id="signOut">
            <Button onClick={this.clear} basic black>
              Sign Out
            </Button>
          </div>
        </Link>
      </Menu>
    );
  }
}

export default connect(null, { logOut })(Navbar);
