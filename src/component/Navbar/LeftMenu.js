import React, { Component } from "react";
import {} from "antd";
import { withFirebase } from "../Firebase";

class RightMenuAuthBase extends Component {
  render() {
    return (
      <Popover placement="bottom" title="Sign Out" trigger="hover">
        <Button onClick={this.props.firebase.doSignOut}>Sign Out</Button>
      </Popover>
    );
  }
}

const RightMenuAuth = withFirebase(RightMenuAuthBase);

export default RightMenuAuth;
