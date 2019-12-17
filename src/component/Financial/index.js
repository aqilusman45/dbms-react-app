import React from "react";
import { Banner } from "../Banner";
import { Images } from "../Data";
import { Row, Col, Collapse, Button } from "antd";
import { withFirebase } from "../Firebase";
const { Panel } = Collapse;


const INITIAL_STATE = {
  financialModelingTool: {},
};


class FinancialBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }


  
  componentWillMount() {
    this.props.firebase
      .getDoc("financial-overview")
      .then(doc => {
        let {
          financialModelingTool,
        } = this.state;

        financialModelingTool = {
          href: doc.data()["financial-modeling-tool"].href,
          title: doc.data()["financial-modeling-tool"].title,
          description: doc.data()["financial-modeling-tool"].description,
          content: doc.data()["financial-modeling-tool"].content,
        };

        this.setState({
          financialModelingTool,
        });
      });
  }


  render() {
    const { financialModelingTool } = this.state;
    return (
      <Row>
        <Col className="route-height">
          <Banner images={Images} title={"Financial"} icon="desktop" color="white"/>
          <Collapse bordered={false}>
            <Panel header={financialModelingTool.title} key={1}>
              <div>
                <h3>{financialModelingTool.description}</h3>
                <p>{financialModelingTool.content}</p>
                <p>Download PDF </p>
                <a target="_blank" href={financialModelingTool.href}>
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

const Financial = withFirebase(FinancialBase);

export default Financial;
