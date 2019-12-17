import React, { Component } from "react";
import { Breadcrumb, Menu, Icon, Button } from "antd";
import { AuthUserContext } from "../Session";
import { withRouter, Link } from "react-router-dom";
import { withFirebase } from "../Firebase";
import LOGO from "../../assets/images/logo.png"

const INITIAL_STATE = {
  current: "mail",
  visible: false,
};


class NavbarBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  toTitleCase(str) {
    let mystring1 = str.split('-');
    let mystring2 = mystring1.map((item)=>{
      return item.charAt(0).toUpperCase() + item.slice(1)
    })
    return mystring2.join(' ');
}

  getBreadcrumbs = () => {
    this.props.links && this.props.links.map(item => {
      this.state.breadcrumbNameMap[`/${this.props.match.params.franchise}/dashboard/${item.link.link}`] = item.link.text;
    })
  }

  componentWillMount() {
    this.setState({
      breadcrumbNameMap: {
        [`/${this.props.match.params.franchise}`]: `${ this.props.name || (this.toTitleCase(this.props.match.params.franchise || ''))}`,
        [`/${this.props.match.params.franchise}/dashboard`]: "Dashboard",
      },
    })
    this.getBreadcrumbs();
  }

  componentWillUpdate() {
    this.getBreadcrumbs();
  }

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { location } = this.props;
    const pathSnippets = location.pathname.split("/").filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>{this.state.breadcrumbNameMap[url]}</Link>
        </Breadcrumb.Item>
      );
    });
    
    const breadcrumbItems = extraBreadcrumbItems;
    return (
      <>
        <div className="logo">
          <img
            className="nav-bar-logo-image"
            src={ LOGO }
          />
        </div>
        <Menu
          theme="Light"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          style={{ lineHeight: "64px" }}
        >
          {
            this.props.showBread ? (<Breadcrumb
              separator={<Icon type="arrow-right" />}
              className="breadcrumbing"
            >
              {breadcrumbItems}
            </Breadcrumb>): null
          }
          <Menu.Item className="sign-out">

            <AuthUserContext.Consumer>
              {authuser =>
                authuser ? (
                  <Button onClick={this.props.firebase.doSignOut}>
                    Sign Out
                      </Button>
                ) : null
              }
            </AuthUserContext.Consumer>
          </Menu.Item>
        </Menu>
      </>
    );
  }
}

const Navbar = withRouter(withFirebase(NavbarBase));

export default Navbar;
