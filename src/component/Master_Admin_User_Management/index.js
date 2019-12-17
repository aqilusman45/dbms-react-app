import React from "react";
import { Row, Col, PageHeader, Icon, Progress } from "antd";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import { UserTable } from "../Master_Admin_Users_Table";

const BackIcon = ({ icon, title, color }) => (
    <div className="back-icon-container ant-page-header-heading">
        <span style={{ color: color }} className="back-icon-title ant-page-header-heading-title">
            <Icon className="back-icon-banner" type={icon || ""} />
            {title || ""}
        </span>
    </div>
);



const INITIAL_STATE = {
    users: null,
    totalScore: '',
    userScore: '',
};

class MasterUserManagementBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    componentDidMount() {
        let users = [];
        var itemsProcessed = 0;
        this.props.firebase.allUsers()
            .then((data) => {
                data.docs.forEach((item, index, array) => {
                    users.push({
                        key: `${index}`,
                        email: item.data().email,
                        userrole: item.data().userrole,
                        franchise: `${item.data().franchise || 'N/A'}`,
                        uid: item.data().uid,
                    })
                    itemsProcessed++;
                    if (itemsProcessed === array.length) {
                        this.setUser(users)
                    }
                })
            })
    }

    setUser = (newUsers) => {
        this.setState({
            users: newUsers,
        })
    }
    render() {
        const { users } = this.state;
        return (
            <Row >
                <Col className="route-height">
                    <PageHeader
                        style={{ backgroundColor: '#3e85c5', boxShadow: "0px 1px 10px grey" }}
                        title={<BackIcon icon={"desktop"} color="white" title={"User Management"} />}
                        className="page-header"
                    />
                    <UserTable data={users} />
                </Col>
            </Row>
        );
    }
}

const MasterUserManagement = withFirebase(withRouter(MasterUserManagementBase));

export default MasterUserManagement;
