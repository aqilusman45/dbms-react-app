import React from "react";
import { Row, Col, Tabs } from "antd";
import { SignIn } from "../Sign_In";
import { withFirebase } from "../Firebase";
import { withRouter, } from "react-router-dom";
const { TabPane } = Tabs;

const INITIAL_STATE = {
  redirect: true,
}

class AdminSignInTabsBase extends React.Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }
  componentWillUpdate() {
    if (this.state.redirect) {
      if (this.props.firebase.auth.currentUser !== null) {
        this.setState({
          redirect: false,
        },()=>{
          this.props.history.push('/admin')
        })
      }
    }
  }
  render() {
    return (
      <Row>
        <Col
          sm={{
            span: 12,
            offset: 1
          }}
          md={{
            offset: 6,
            span: 12
          }}
        >
          <Tabs>
            <TabPane tab="Login" key="1">
              <SignIn />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    );
  }
}


const AdminSignInTabs = withRouter(withFirebase(AdminSignInTabsBase))

export default AdminSignInTabs;