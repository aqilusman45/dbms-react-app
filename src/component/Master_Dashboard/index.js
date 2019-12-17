import React, { Component } from "react";
import { withAuthorization } from "../Session";
import { Layout, Affix } from "antd";
import MasterAdminSiderDasboard from "../Master_Admin_Sider";
import MasterAdminNavbar from "../Master_Admin_Navbar";
import AdminDashboardRoutes from "../Admin_Routes";
import * as ROUTE from "../../constants/routes";
import MasterAdminDashboardRoutes from "../Master_Admin_Routes";
const { Header, Content } = Layout;

const INITIAL_STATE = {
  links: [{
    link: {
      link: ROUTE.MASTER_ADMIN_ADD_FRANCHISE,
      icon: 'desktop',
      position: 0,
      text: 'Add Franchise'
    },
    report: null,
  }, {
    link: {
      link: ROUTE.MASTER_ADMIN_VIEW_CLIENTS,
      icon: 'pie-chart',
      position: 1,
      text: 'Clients'
    },
    report: null,
  },{
    link: {
      link: ROUTE.MASTER_ADMIN_VIEW_USERS,
      icon: 'pie-chart',
      position: 1,
      text: 'User Management'
    },
    report: null,
  }
],
};



class MasterAdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }


  render() {
    return (
      <div>
        <Layout>
          <Header className="header-nav-bar">
            <MasterAdminNavbar />
          </Header>
          <Layout>
            <Affix offsetTop={10}>
              <MasterAdminSiderDasboard links={this.state.links} />
            </Affix>
          </Layout>
          <Layout className="main-content-layout">
            <Content>
              <MasterAdminDashboardRoutes />
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

const condition = authUser => {
  return authUser && authUser.userrole === "master-admin";
};

export default withAuthorization(condition)(MasterAdminDashboard);
