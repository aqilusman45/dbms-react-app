import React from "react";
import { Banner } from "../Banner";
import { Dashboard_Image } from "../Data";
import { Row, Col } from "antd";

class DashHome extends React.Component {
  render() {
    return (
      <Row>
        <Col className="route-height">
          <Banner images={Dashboard_Image} title={"Dashboard"} icon="desktop" color="white"/>
        </Col>
      </Row>
    );
  }
}

export default DashHome;
