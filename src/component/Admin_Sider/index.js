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
                <Link key={index} to={`/${this.props.match.params.franchise}/admin/${item.link.link}`}>
                  <Icon type={item.link.icon} />
                  <span className="side-bar-menu-link">{item.link.text}</span>
                  {item.report !== null ? <span className="percent-badge">{`${item.report}%`}</span> : ''}
                </Link>
              </Menu.Item>
            );
          })}

          <AuthUserContext.Consumer>
            {authUser => {
              if (authUser.userrole === 'admin') {
                return (
                  <li className="ant-menu-item" role="menuitem" style={{ paddingLeft: "24px" }}><Link to={`/${this.props.match.params.franchise}/dashboard`}><i
                    aria-label="icon: gift" className="anticon anticon-gift"><svg viewBox="64 64 896 896" focusable="false" className=""
                      data-icon="desktop" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                      <path
                        d="M880 310H732.4c13.6-21.4 21.6-46.8 21.6-74 0-76.1-61.9-138-138-138-41.4 0-78.7 18.4-104 47.4-25.3-29-62.6-47.4-104-47.4-76.1 0-138 61.9-138 138 0 27.2 7.9 52.6 21.6 74H144c-17.7 0-32 14.3-32 32v200c0 4.4 3.6 8 8 8h40v344c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V550h40c4.4 0 8-3.6 8-8V342c0-17.7-14.3-32-32-32zm-334-74c0-38.6 31.4-70 70-70s70 31.4 70 70-31.4 70-70 70h-70v-70zm-138-70c38.6 0 70 31.4 70 70v70h-70c-38.6 0-70-31.4-70-70s31.4-70 70-70zM180 482V378h298v104H180zm48 68h250v308H228V550zm568 308H546V550h250v308zm48-376H546V378h298v104z">
                      </path>
                    </svg></i><span className="side-bar-menu-link">View User Dashboard</span></Link></li>
                )
              } else if (authUser.userrole === 'master-admin') {
                return (
                  <>
                    <li className="ant-menu-item" role="menuitem" style={{ paddingLeft: "24px" }}><Link to={`/${this.props.match.params.franchise}/dashboard`}><i
                      aria-label="icon: gift" className="anticon anticon-gift"><svg viewBox="64 64 896 896" focusable="false" className=""
                        data-icon="desktop" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                        <path
                          d="M880 310H732.4c13.6-21.4 21.6-46.8 21.6-74 0-76.1-61.9-138-138-138-41.4 0-78.7 18.4-104 47.4-25.3-29-62.6-47.4-104-47.4-76.1 0-138 61.9-138 138 0 27.2 7.9 52.6 21.6 74H144c-17.7 0-32 14.3-32 32v200c0 4.4 3.6 8 8 8h40v344c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V550h40c4.4 0 8-3.6 8-8V342c0-17.7-14.3-32-32-32zm-334-74c0-38.6 31.4-70 70-70s70 31.4 70 70-31.4 70-70 70h-70v-70zm-138-70c38.6 0 70 31.4 70 70v70h-70c-38.6 0-70-31.4-70-70s31.4-70 70-70zM180 482V378h298v104H180zm48 68h250v308H228V550zm568 308H546V550h250v308zm48-376H546V378h298v104z">
                        </path>
                      </svg></i><span className="side-bar-menu-link">View User Dashboard</span></Link></li>
                    <li className="ant-menu-item" role="menuitem" style={{ paddingLeft: "24px" }}><Link to={`/master-admin/add-franchise`}><i
                      aria-label="icon: gift" className="anticon anticon-gift"><svg viewBox="64 64 896 896" focusable="false" className=""
                        data-icon="desktop" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                        <path
                          d="M880 310H732.4c13.6-21.4 21.6-46.8 21.6-74 0-76.1-61.9-138-138-138-41.4 0-78.7 18.4-104 47.4-25.3-29-62.6-47.4-104-47.4-76.1 0-138 61.9-138 138 0 27.2 7.9 52.6 21.6 74H144c-17.7 0-32 14.3-32 32v200c0 4.4 3.6 8 8 8h40v344c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V550h40c4.4 0 8-3.6 8-8V342c0-17.7-14.3-32-32-32zm-334-74c0-38.6 31.4-70 70-70s70 31.4 70 70-31.4 70-70 70h-70v-70zm-138-70c38.6 0 70 31.4 70 70v70h-70c-38.6 0-70-31.4-70-70s31.4-70 70-70zM180 482V378h298v104H180zm48 68h250v308H228V550zm568 308H546V550h250v308zm48-376H546V378h298v104z">
                        </path>
                      </svg></i><span className="side-bar-menu-link">Master Admin</span></Link></li>
                  </>
                )
              }
            }}
          </AuthUserContext.Consumer>
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
