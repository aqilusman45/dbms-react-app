import React, { Component } from "react";
import { Menu } from "antd";
import * as ROUTE from "../../constants/routes";
import { withRouter } from "react-router-dom";

class RightMenuBase extends Component {

  onHomeClick = () =>{
    this.props.history.replace(ROUTE.LANDING)
  }

  render() {
    return (
      <Menu mode="horizontal">
        <Menu.Item key="mail">
         <span onClick={this.onHomeClick}>Home</span>
        </Menu.Item>
      </Menu>
    );
  }
}

const RightMenu = withRouter(RightMenuBase)

export default RightMenu;
