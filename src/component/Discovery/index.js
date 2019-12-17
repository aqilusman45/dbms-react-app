import React from "react";
import { Banner } from "../Banner";
import { Images } from "../Data";
import { Row, Col, Collapse, Button, Modal } from "antd";
import { withFirebase } from "../Firebase";
const { Panel } = Collapse;

const INITIAL_STATE = {
  siteSelectionCriteria: {},
  studioDesign: {}
};

class DiscoveryBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentWillMount() {
    this.props.firebase
      .getDoc("discovery-day")
      .then(doc => {
        let { siteSelectionCriteria, studioDesign } = this.state;

        siteSelectionCriteria = {
          href: doc.data()["site-selection-criteria"].href,
          title: doc.data()["site-selection-criteria"].title,
          description: doc.data()["site-selection-criteria"].description,
          content: doc.data()["site-selection-criteria"].content
        };

        studioDesign = {
          href: doc.data()["studio-design"].href,
          title: doc.data()["studio-design"].title,
          description: doc.data()["studio-design"].description,
          content: doc.data()["studio-design"].content
        };

        this.setState({
          studioDesign,
          siteSelectionCriteria
        });
      });
  }

  render() {
    const { siteSelectionCriteria, studioDesign } = this.state;
    return (
      <Row>
        <Col className="route-height">
          <Banner
            images={Images}
            title={"Discovery Day"}
            icon="desktop"
            color="white"
          />
          <Collapse bordered={false}>
            <Panel header={studioDesign.title} key={3}>
              <div>
                <h3>{studioDesign.description}</h3>
                <p>{studioDesign.content}</p>
                <p>Download PDF </p>
                <a target="_blank" href={studioDesign.href}>
                  <Button type="primary" icon="download" size="large">
                    Download
                  </Button>
                </a>
              </div>
            </Panel>

            <Panel header={siteSelectionCriteria.title} key={1}>
              <div>
                <h3>{siteSelectionCriteria.description}</h3>
                <p>{siteSelectionCriteria.content}</p>
                <p>Download PDF </p>
                <a target="_blank" href={siteSelectionCriteria.href}>
                  <Button type="primary" icon="download" size="large">
                    Download
                  </Button>
                </a>
              </div>
            </Panel>
          </Collapse>
        </Col>
      </Row>
    );
  }
}

const Discovery = withFirebase(DiscoveryBase);

export default Discovery;
