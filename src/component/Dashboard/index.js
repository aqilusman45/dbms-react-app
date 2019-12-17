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

  getNavData = () => {
    let linksHolder = [];
    let progress = 0;
    var itemsProcessed = 0;
    this.props.firebase.getMenuLinks(this.props.match.params.franchise).then(res => {
      res.docs.forEach((item, index, array) => {
        progress = 0;
        let uid = this.props.firebase.auth.currentUser.uid;
        this.props.firebase.getProgress(uid, item.data().link.link)
          .then((doc) => {
            if (doc.exists) {
              progress = doc.data().progress;
            }
            linksHolder.push({
              link: item.data().link,
              report: item.data()["total-score"] !== undefined && item.data()["total-score"] !== 0 ? ((progress / item.data()["total-score"]) * 100) : null
            })
            progress = 0;
          }).then(() => {
            itemsProcessed++;
            if (itemsProcessed === array.length) {
              this.setLinks(linksHolder)
            }
          })
      })
    })
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
        this.getNavData();
        this.getNavDataLogo();
      })
    }
  }

  // componentWillUnmount() {
  //   this.unsbscribe();
  // }
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
