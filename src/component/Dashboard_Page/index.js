import React from "react";
import { Banner } from "../Banner";
import { Row, Col } from "antd";
import { withFirebase } from "../Firebase";
import Collapsible from "../Collapse";

const INITIAL_STATE = {
  bannerImages: null,
  pageHeader: {},
  downloadableContent: null,
  params: '',
  totalScore:'',
};

class DashBoardTempBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }


  fetchPageData = () => {
    this.props.firebase.getPage(this.props.match.params.slug).then(doc => {
      let { bannerImages, downloadableContent, pageHeader, totalScore } = this.state;
      bannerImages = doc.data()["banner-images"];
      downloadableContent = doc.data()["downloadable-content"];
      pageHeader = doc.data()["page-header"];
      totalScore = doc.data()["total-score"];
      this.setState({
        bannerImages,
        downloadableContent,
        totalScore,
        pageHeader,
        params: this.props.match.params.slug,
      });
    })
      .catch(() => {
        this.props.history.push('/dashboard')
      })
  }



  componentWillMount() {
    this.fetchPageData();
  }

  componentWillUpdate(nextProps) {
    if (nextProps.match.params.slug !== this.state.params) {
      this.fetchPageData();
    }
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

  onCancel = e => {
    this.setState({
      visible: false
    });
  };


  countScore = (points, key) => {
    const { totalScore } = this.state;
    const uid = this.props.firebase.auth.currentUser.uid;
    this.props.firebase.addScore(uid, this.state.params, {
      time: new Date(),
      weightage: points,
      key: key,
      status: true,
      totalScore: totalScore,
    })
  }

  render() {
    const { bannerImages, downloadableContent, pageHeader } = this.state;
    return (
      <Row >
        <Col className="route-height">
          <Banner
            images={bannerImages}
            title={pageHeader.title}
            icon={pageHeader.icon}
            subtitle={pageHeader.subtitle}
            color={pageHeader["header-color"]}
          />
          <Collapsible
            handleOk={this.handleOk}
            visible={this.state.visible}
            downloadableContent={downloadableContent}
            showModal={this.showModal}
            onCancel={this.onCancel}
            countScore={this.countScore}
          />
        </Col>
      </Row>
    );
  }
}

const DashBoardTemp = withFirebase(DashBoardTempBase);

export default DashBoardTemp;
