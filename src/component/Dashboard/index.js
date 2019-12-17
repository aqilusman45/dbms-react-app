import React, { Component } from "react";
import { withAuthorization } from "../Session";
import { Layout, Affix } from "antd";
import SiderDasboard from "../Dashboard_Sider";
import Navbar from "../Navbar";
import DashboardRoutes from "../Dashboard_Routes";
const { Header, Content } = Layout;

const INITIAL_STATE = {
  links: [],
};


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  setLinks = (linksHold) => {
    let links = linksHold.sort(function (a, b) { return a.link.position - b.link.position })
    this.setState({
      links: links
    })
  }


  render() {
    return (
      <div>
        <Layout>
          <Header className="header-nav-bar">
            <Navbar showBread={true} image={this.state.image} title={this.state.name} links={this.state.links} />
          </Header>
          <Layout>
            <Affix offsetTop={10}>
              <SiderDasboard name={this.state.name} links={this.state.links} />
            </Affix>
          </Layout>
          <Layout className="main-content-layout">
            <Content>
              <DashboardRoutes />
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

const condition = authUser => {
  return authUser && (authUser.userrole === "user" || (authUser.userrole === "admin" || authUser.userrole === "master-admin"));
};

export default withAuthorization(condition)(Dashboard);
