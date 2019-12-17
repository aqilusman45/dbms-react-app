import React from "react";
import { Row, Col, Tabs } from "antd";
import { SignIn } from "../Sign_In";
import { withFirebase } from "../Firebase";
import { withRouter , } from "react-router-dom";
const { TabPane } = Tabs;


class SignInTabsBase extends React.Component {
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
            <TabPane tab="Sign In" key="1">
              <SignIn />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    );
  }
}


const SignInTabs = withRouter(withFirebase(SignInTabsBase))

export default SignInTabs;