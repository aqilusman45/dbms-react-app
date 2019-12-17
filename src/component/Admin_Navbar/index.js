import React, { Component } from "react";
import { Breadcrumb, Menu, Icon,  Button } from "antd";
import { AuthUserContext } from "../Session";
import * as ROUTE from "../../constants/routes";
import { withRouter, Link } from "react-router-dom";
import { LOGO } from "../Data";
import { withFirebase } from "../Firebase";

const breadcrumbNameMap = {
  [ROUTE.ADMIN_DASHBOARD]: "Admin",
  [`/admin/members`]: "Members",
  [`/admin/namaz-times`]: "Namaz Times",
};

class AdminNavbarBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: "mail",
      visible: false
    };
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
          <Link to={url}>{breadcrumbNameMap[url]}</Link>
        </Breadcrumb.Item>
      );
    });
    const breadcrumbItems = extraBreadcrumbItems;

    return (
      <>
        <div className="logo">
        <img
            className="nav-bar-logo-image"
            src={ this.props.image || LOGO.image}
            alt={this.props.title || LOGO.title}
            title={this.props.title || LOGO.title}
          />
        </div>
        <Menu
          theme="Light"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          style={{ lineHeight: "64px" }}
        >
          {/* <Breadcrumb
            separator={<Icon type="arrow-right" />}
            className="breadcrumbing"
          >
            {breadcrumbItems}
          </Breadcrumb> */}
          <Menu.Item className="sign-out">

          <AuthUserContext.Consumer>
            {authuser =>
              authuser ?  (
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

const AdminNavbar = withRouter(withFirebase(AdminNavbarBase));

export default AdminNavbar;
