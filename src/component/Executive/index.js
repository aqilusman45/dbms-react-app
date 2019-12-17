import React from "react";
import { Banner } from "../Banner";
import { Images } from "../Data";
import { Row, Col } from "antd";

class Executive extends React.Component {
  render() {
    return (
      <Row>
        <Col  className="route-height">
          <Banner images={Images} title={"Executive Interview"} icon="desktop" color="white"/>
        </Col>
      </Row>
    );
  }
}

export default Executive;
