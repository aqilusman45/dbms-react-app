import React from "react";
import { Banner } from "../Banner";
import { Images } from "../Data";
import { Row, Col } from "antd";

class Qualify extends React.Component {
  render() {
    return (
      <Row>
        <Col className="route-height">
          <Banner images={Images} title={"Qualify"} icon="dribbble-square" color="white"/>
        </Col>
      </Row>
    );
  }
}

export default Qualify;
