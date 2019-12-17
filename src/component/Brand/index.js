import React from "react";
import { Banner } from "../Banner";
import { Images } from "../Data";
import { Row, Col, Collapse, Button, Modal } from "antd";
import { withFirebase } from "../Firebase";
const { Panel } = Collapse;

const INITIAL_STATE = {
  brandOverView: {},
  frequentlyAskedQuestions: {},
  teaserVideo: {},
  visible: false,
  param: ""
};

class BrandBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentWillMount() {
    let param = this.props.match.path.split("/");
    this.setState({
      param
    });
    this.props.firebase
      .getDoc(param[2])
      .then(doc => {
        let {
          brandOverView,
          frequentlyAskedQuestions,
          teaserVideo
        } = this.state;

        brandOverView = {
          href: doc.data()["brand-overview"].href,
          title: doc.data()["brand-overview"].title,
          description: doc.data()["brand-overview"].description,
          content: doc.data()["brand-overview"].content,
          weightage: doc.data()["brand-overview"].weightage,
        };

        frequentlyAskedQuestions = {
          href: doc.data()["frequently-asked-questions"].href,
          title: doc.data()["frequently-asked-questions"].title,
          description: doc.data()["frequently-asked-questions"].description,
          content: doc.data()["frequently-asked-questions"].content,
          weightage: doc.data()["frequently-asked-questions"].weightage,

        };

        teaserVideo = {
          href: doc.data()["teaser-video"].href,
          title: doc.data()["teaser-video"].title,
          description: doc.data()["teaser-video"].description,
          content: doc.data()["teaser-video"].content,
          weightage: doc.data()["teaser-video"].weightage,
        };

        this.setState({
          brandOverView,
          frequentlyAskedQuestions,
          teaserVideo
        });
      })
      .catch(rej => {
        console.log(rej);
      });
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };


  scoreCalculator = e => {
  }

  render() {
    const { brandOverView, frequentlyAskedQuestions, teaserVideo } = this.state;
    return (
      <Row>
        <Col className="route-height">
          <Banner
            images={Images}
            title={"Brand Introduction"}
            icon="desktop"
            color="white"
          />
          <Collapse bordered={false}>
            <Panel header={brandOverView.title} key={1}>
              <div>
                <h3>{brandOverView.description}</h3>
                <p>{brandOverView.content}</p>
                <p>Download PDF </p>
                <a target="_blank" href={brandOverView.href}>
                  <Button onClick={this.scoreCalculator(brandOverView.weightage)} type="primary" icon="download" size="large">
                    Download
                  </Button>
                </a>
              </div>
            </Panel>

            <Panel header={frequentlyAskedQuestions.title} key={3}>
              <div>
                <h3>{frequentlyAskedQuestions.description}</h3>
                <p>{frequentlyAskedQuestions.content}</p>
                <p>Download PDF </p>
                <a target="_blank" href={frequentlyAskedQuestions.href}>
                  <Button type="primary" icon="download" size="large">
                    Download
                  </Button>
                </a>
              </div>
            </Panel>

            <Panel header={teaserVideo.title} key={2}>
              <div>
                <h3>{teaserVideo.description}</h3>
                <p>{teaserVideo.content}</p>
                <Button type="primary" onClick={this.showModal}>
                  Watch Video
                </Button>
                <Modal
                  visible={this.state.visible}
                  centered={true}
                  className="teaser-vid-modal"
                  closable={false}
                  destroyOnClose={true}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                >
                  <div
                    className="teaser-iframe"
                    dangerouslySetInnerHTML={{
                      __html: `${teaserVideo.href}`
                    }}
                  />
                </Modal>
              </div>
            </Panel>
          </Collapse>
        </Col>
      </Row>
    );
  }
}

const Brand = withFirebase(BrandBase);

export default Brand;
