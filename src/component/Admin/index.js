import React, { Component } from "react";
import { withAuthorization } from "../Session";
import { Layout, Affix } from "antd";
import AdminSiderDasboard from "../Admin_Sider";
import AdminNavbar from "../Admin_Navbar";
import AdminDashboardRoutes from "../Admin_Routes";
import * as ROUTE from "../../constants/routes";
const { Header, Content } = Layout;

const INITIAL_STATE = {
  links: [{
    link: {
      link: ROUTE.ADMIN_PAGES,
      icon: 'desktop',
      position: 0,
      text: 'Content Managenent'
    },
    report: null,
  }, {
    link: {
      link: ROUTE.ADMIN_USERS,
      icon: 'pie-chart',
      position: 1,
      text: 'User Management'
    },
    report: null,
  }],
};



class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  getNavDataLogo = () => {
    this.props.firebase.getFranchiseData(this.props.match.params.franchise)
      .then((doc) => {
        if (doc.empty) {
          this.props.history.push('/')
        } else {
          doc.docs.forEach(doc => {
            this.setState({
              image: doc.data().logo,
              name: doc.data().name,
              imageFileName: doc.data().imageName
            })
          });
        }
      })
  }

  componentWillMount() {
    let user = JSON.parse(window.localStorage.authUser)
    if ((user.franchise !== this.props.match.params.franchise) && (user.userrole !== 'master-admin')) {
      this.props.firebase.doSignOut();
    } else {
      this.unsbscribe = this.props.firebase.getLiveProgress(user.uid).onSnapshot(() => {
        this.getNavDataLogo();
      })
    }
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
  return authUser && (authUser.userrole === "admin" || authUser.userrole === "master-admin" );
};

export default withAuthorization(condition)(AdminDashboard);
