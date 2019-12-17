import React from "react";
import { Row, Col, PageHeader, Icon, Button } from "antd";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import UserProgressCollapse from "../Progress_Collapsible"


const BackIcon = ({ icon, title, color }) => (
  <div className="back-icon-container ant-page-header-heading">
    <span style={{ color: color }} className="back-icon-title ant-page-header-heading-title">
      <Icon className="back-icon-banner" type={icon || ""} />
      {title || ""}
    </span>
  </div>
);

const INITIAL_STATE = {
  email: '',
  franchise: '',
  newRole: '',
  userrole: '',
  error: '',
  progress: null,
};

class UserProgressBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }


  fetchPageData = () => {
    const { uid } = this.props.match.params;
    let progress = [];
    var itemsProcessed = 0;
    this.props.firebase.getAllProgress(uid)
      .then((data) => {
        data.docs.forEach((item, index, array) => {
          let element = item.data();
          let arrayProp = element["page-name"];
          progress.push({
            pageTitle: element["page-name"],
            currentProgress: element['progress'],
            totalScore: element["total-score"],
            panels: element[arrayProp]
          })
          itemsProcessed++;
          if (itemsProcessed === array.length) {
            this.setPanels(progress)
          }
        });
      })
  }

  setPanels = (panels) => {
    this.setState({
      progress: panels
    })
  }

  componentWillMount() {
    this.fetchPageData();
    const { uid } = this.props.match.params;
    this.getUserData(uid);
  }

  getUserData = (uid) => {
    this.props.firebase.getEmail(uid)
      .then((doc) => {
        this.setState({
          email: doc.data().email,
          franchise: doc.data().franchise,
          userrole: doc.data().userrole,
        })
      })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }


  changeUserRole = () => {
    const { uid } = this.props.match.params;
    if (this.state.newRole === '') {
      this.setState({
        error: 'Please select any user role.',
      }, () => {
        setTimeout(() => {
          this.setState({
            error: '',
          })
        }, 2000);
      })
    } else if (this.state.newRole === this.state.userrole) {
      this.setState({
        error: 'User is already assigned with this role, please select any different role.',
      }, () => {
        setTimeout(() => {
          this.setState({
            error: '',
          })
        }, 2000);
      })
    } else {
      this.props.firebase.updateUserRole(uid, this.state.newRole)
        .then(() => {
          this.getUserData(uid);
        })
    }
  }

  render() {
    const { franchise, userrole, newRole, error } = this.state;
    return (
      <Row >
        <Col className="route-height">
          <PageHeader
            style={{ backgroundColor: '#3e85c5', boxShadow: "0px 1px 10px grey" }}
            title={<BackIcon icon={"desktop"} color="white" title={this.state.email} />}
            className="page-header"
          />
          <div className="user-details-wrapper">
            <div className="user-details">
              <p style={{ textTransform: 'capitalize' }}>Franchise: {franchise}</p>
              <p style={{ textTransform: 'capitalize' }}>User Role: {userrole}</p>
            </div>
            {
              userrole === 'master-admin' ? null : (<div className="form-user-details">
                <div className="form-user-details-wrapper">
                  <div>
                    Change User Role
          </div>
                  <div >
                    <select name="newRole" value={newRole} onChange={this.handleChange}>
                      <option defaultChecked value="">Choose Role</option>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                    <Button onClick={this.changeUserRole}>
                      Assign
            </Button>
                  </div>
                </div>
              </div>)
            }
            <div>
              <p>{error && error}</p>
            </div>
          </div>
          <UserProgressCollapse data={this.state.progress} />
        </Col>
      </Row>
    );
  }
}

const UserProgress = withRouter(withFirebase(UserProgressBase));

export default UserProgress;
