import React, { Component } from "react";
import { withAuthorization } from "../Session";
import { Layout, Affix } from "antd";
import AdminSiderDasboard from "../Admin_Sider";
import AdminNavbar from "../Admin_Navbar";
import AdminDashboardRoutes from "../Admin_Routes";
const { Header, Content } = Layout;

const INITIAL_STATE = {
  links: [{
    link: {
      link: 'members',
      icon: 'desktop',
      position: 0,
      text: 'Members'
    },
    report: null,
  }, {
    link: {
      link: 'namaz-times',
      icon: 'pie-chart',
      position: 1,
      text: 'Namaz Times'
    },
    report: null,
  }],
};



class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  
  render() {
    return (
      <div>
        <Layout>
          <Header className="header-nav-bar">
            <AdminNavbar image={this.state.image} title={this.state.name} />
          </Header>
          <Layout>
            <Affix offsetTop={10}>
              <AdminSiderDasboard links={this.state.links} />
            </Affix>
          </Layout>
          <Layout className="main-content-layout">
            <Content>
              <AdminDashboardRoutes />
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

const condition = authUser => {
  return authUser && (authUser.userrole === "admin");
};

export default withAuthorization(condition)(AdminDashboard);
