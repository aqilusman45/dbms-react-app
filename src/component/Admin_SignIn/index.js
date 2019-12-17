import React from "react";
import AdminSignInTabs from "../Admin_SignIn_Tabs";
import Navbar from "../Navbar";
import { Row, Col, Layout } from "antd";
const { Header } = Layout;

export const AdminSignIn = () => {
  return (
    <>
      <Header style={{ background: "#fff", padding: 0 }}>
        <Navbar />
      </Header>
      <Row style={{margin: 0}} gutter={24}>
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
          <AdminSignInTabs />
        </Col>
      </Row>
    </>
  );
};
