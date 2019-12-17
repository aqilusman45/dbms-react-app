import React from "react";
import { Banner } from "../Banner";
import { Row, Col } from "antd";
import image2 from "../../assets/images/img-3.png";

const images = [{
  url: image2,
  title: 'Banner Dashboard'
}]

class DashBoard extends React.Component {

  render() {
    return (
      <Row >
        <Col className="route-height">
          <Banner
            images={images}
            title={`Dashboard`}
            icon={'desktop'}
            subtitle={''}
            color={"#3e85c5"}
          />
        </Col>
      </Row>
    );
  }
}

export default DashBoard;
