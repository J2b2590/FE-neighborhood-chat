import React, { Component } from "react";
import { connect } from "react-redux";
import { Rating } from "semantic-ui-react";

const RatingExampleRating = () => <Rating />;

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Rating maxRating={1} defaultRating={1} icon="star" size="large" />
        User Profile
      </div>
    );
  }
}

const mapStateToProps = (state) => {};

export default connect(mapStateToProps, null)(UserProfile);
