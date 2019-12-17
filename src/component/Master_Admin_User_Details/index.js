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
  newFranchise: '',
  franchises: null,
};

class UserProgressBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }


  fetchPageData = () => {
    const { uid } = this.props.match.params;
    let franchises = [];
    let itemProcessed = 0;
    this.props.firebase.getUser(uid)
      .then((doc) => {
        console.log(doc.data());
        this.props.firebase.getFranchises()
        .then((franchiseData)=>{
          franchiseData.docs.forEach((item, index, array) => {
              franchises.push({
                name: item.data().name,
                slug: item.data().slug,
              })
              itemProcessed++;
              if (itemProcessed === array.length) {
              this.setDetails(doc.data(), franchises);
              }
          });
        })
      })
  }

  setDetails = (data, franchises) => {
    this.setState({
      email: data.email,
      franchise: data.franchise,
      userrole: data.userrole,
      franchises: franchises,
    })
  }

  componentWillMount() {
    this.fetchPageData();
  }


  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }


  changeUserRole = () =>{
    const { uid } = this.props.match.params;
    if (this.state.newRole === '') {
      this.setState({
        error: 'Please select any user role.',
      }, ()=>{
        setTimeout(() => {
          this.setState({
            error: '',
          })
        }, 2000);
      })
    } else if (this.state.newRole === this.state.userrole) {
      this.setState({
        error: 'User is already assigned with this role, please select any different role.',
      }, ()=>{
        setTimeout(() => {
          this.setState({
            error: '',
          })
        }, 2000);
      })
    }else{
      this.props.firebase.updateUserRole(uid, this.state.newRole)
      .then(()=>{
        this.fetchPageData();
      })
    }
  }


  
  changeUserFranchise = () =>{
    const { uid } = this.props.match.params;
    if (this.state.newFranchise === '') {
      this.setState({
        error: 'Please select any user franchise.',
      }, ()=>{
        setTimeout(() => {
          this.setState({
            error: '',
          })
        }, 2000);
      })
    }else if (this.state.newFranchise === this.state.franchise) {
      this.setState({
        error: 'User is already assigned with this franchise, please select any different franchise.',
      }, ()=>{
        setTimeout(() => {
          this.setState({
            error: '',
          })
        }, 2000);
      })
    }else{
      this.props.firebase.updateUserFranchise(uid, this.state.newFranchise)
      .then(()=>{
        this.fetchPageData();
      })
    }
  }

  render() {
    const { email, franchise, userrole, newRole, error, franchises, newFranchise } = this.state;
    return (
      <Row >
        <Col className="route-height">
          <PageHeader
            style={{ backgroundColor: '#3e85c5', boxShadow: "0px 1px 10px grey" }}
            title={<BackIcon icon={"desktop"} color="white" title={email} />}
            className="page-header"
          />
          <div className="user-details-wrapper">
            <div className="user-details">
              <p style={{textTransform: 'capitalize'}}>Franchise: {franchise}</p>
              <p style={{textTransform: 'capitalize'}}>User Role: {userrole}</p>
            </div>
            <div className="form-user-details">
              <div className="form-user-details-wrapper">
                <div>
                  Change User Role
          </div>
                <div >
                  <select name="newRole" value={newRole} onChange={this.handleChange}>
                  <option defaultChecked value="">Choose Role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="master-admin">Master Admin</option>
                  </select>
                  <Button onClick={this.changeUserRole}>
                    Assign
            </Button>
                </div>
              </div>
              <div className="form-user-details-wrapper">
                <div>
                  Change User Franchise
          </div>
                <div>
                  <select name="newFranchise" value={newFranchise} onChange={this.handleChange}>
                  <option defaultChecked value="">Choose Franchise</option>
                   {franchises && franchises.map((item)=>{
                      return (
                      <option key={item.slug} value={item.slug}>{item.name}</option>                        
                      )
                   })}
                  </select>
                  <Button onClick={this.changeUserFranchise}>
                    Assign
            </Button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p>{error && error}</p>
          </div>
        </Col>
      </Row>
    );
  }
}

const UserProgress = withRouter(withFirebase(UserProgressBase));

export default UserProgress;
