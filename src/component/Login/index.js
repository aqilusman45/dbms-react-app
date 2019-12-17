import React, { Component } from "react";
import SignInTabs from "../SignIn_Tabs";
import Navbar from "../Navbar";
import { Row, Col, Layout } from "antd";
import { withFirebase } from "../Firebase";
const { Header } = Layout;

const INITIAL_STATE = {
  image: '',
  name: '',
  imageFileName: '',
}

class LoginBase extends Component {
  constructor(props) {
    super(props);
    this.state = {...INITIAL_STATE}
  }

  componentWillMount() {
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

  render() {
    return (
      <>
        <Header style={{ background: "#fff", padding: 0 }}>
          <Navbar showBread={false} image={this.state.image} title={this.state.name}/>
        </Header>
        <Row style={{ margin: 0 }} gutter={24}>
          <Col
            xs={{
              span: 22,
              offset: 1
            }}
            md={{
              span: 14,
              offset: 4
            }}
            lg={{
              span: 15,
              offset: 4
            }}
          >
            <SignInTabs />
          </Col>
        </Row>
      </>
    );
  }
}

const Login = withFirebase(LoginBase);

export { Login };