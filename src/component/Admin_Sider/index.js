import React, { Component } from "react";
import { Menu, Icon, Drawer } from "antd";
import { AvatarSideBar } from "../Avatar";
import { Link, withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";
import { AuthUserContext } from "../Session";

// const badge = { backgroundColor: "#e0e6dd", fontSize: "10px", color: "black" };

const INITIAL_STATE = {
  visible: true,
  placement: "left",
  marginTop: "68px",
  links: [],
};


class AdminSiderDasboardBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.listenScrollEvent);
    window.addEventListener("resize", this.updateDimensions);
  }

  listenScrollEvent = e => {
    if (window.scrollY > 40) {
      this.setState({ marginTop: "0px" });
    } else {
      this.setState({ marginTop: "68px" });
    }
  };

  updateDimensions = () => {
    if (window.innerWidth <= 1000) {
      this.setState({
        visible: false
      });
    } else {
      this.setState({
        visible: true
      });
    }
  };

  onClose = e => {
    this.setState({
      visible: !e
    });
  };

  render() {
    const { links } = this.props;
    return (
      <Drawer
        placement={this.state.placement}
        closable={false}
        onClose={this.onClose}
        visible={this.state.visible}
        theme="light"
        width="250"
        style={{
          marginTop: this.state.marginTop
        }}
        mask={false}
        className="slider-styles"
      >
        <AvatarSideBar userName={this.props.firebase.auth.currentUser && this.props.firebase.auth.currentUser.email} collapsed={this.state.collapsed} />
        <Menu
          theme="light"
          defaultSelectedKeys={[`${this.props.location.pathname}`]}
          mode="inline"
        >
          {links && links.map((item, index) => {
            return (
              <Menu.Item key={item.link.link}>
                <Link key={index} to={`/admin/${item.link.link}`}>
                  <Icon type={item.link.icon} />
                  <span className="side-bar-menu-link">{item.link.text}</span>
                  {item.report !== null ? <span className="percent-badge">{`${item.report}%`}</span> : ''}
                </Link>
              </Menu.Item>
            );
          })}
        </Menu>
        <span
          onClick={() => this.onClose(this.state.visible)}
          className="ant-layout-sider-zero-width-trigger ant-layout-sider-zero-width-trigger-left"
        >
          <i aria-label="icon: bars" className="anticon anticon-bars">
            <svg
              viewBox="0 0 1024 1024"
              focusable="false"
              className=""
              data-icon="bars"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M912 192H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM104 228a56 56 0 1 0 112 0 56 56 0 1 0-112 0zm0 284a56 56 0 1 0 112 0 56 56 0 1 0-112 0zm0 284a56 56 0 1 0 112 0 56 56 0 1 0-112 0z"></path>
            </svg>
          </i>
        </span>
      </Drawer>
    );
  }
}

const AdminSiderDasboard = withRouter(withFirebase(AdminSiderDasboardBase));

export default AdminSiderDasboard;
