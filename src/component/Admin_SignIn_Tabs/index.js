import React from "react";
import { Row, Col, Tabs } from "antd";
import { SignIn } from "../Sign_In";
import { withFirebase } from "../Firebase";
import * as ROUTE from "../../constants/routes";
import { withRouter , } from "react-router-dom";
const { TabPane } = Tabs;


class AdminSignInTabsBase extends React.Component {
  componentDidMount() {
    if (this.props.firebase.auth.currentUser !== null) {
      this.props.history.push(ROUTE.ADMIN_DASHBOARD)
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
            <TabPane tab="Admin Sign In" key="1">
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