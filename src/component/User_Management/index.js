import React from "react";
import { Row, Col, PageHeader, Icon, Button } from "antd";
import { withRouter } from "react-router-dom";
import { UserTable } from "../Users_Table";
import Axios from "axios";

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

class UserManagementBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    componentDidMount() {
        Axios.get("http://localhost:3002/members/get-members")
            .then((res) => {
                let users = [];
                var itemsProcessed = 0;
                res.data.result.forEach((item, index, array) => {
                    users.push({
                        key: `${index}`,
                        email: item.email,
                        phoneno: item.phoneno,
                        salary: item.salary,
                        availability: item.avalability === 1 ? 'Available' : 'N/A',
                    })
                    itemsProcessed++;
                    if (itemsProcessed === array.length) {
                        this.setUser(users)
                    }
                });
            })
            .catch((rej) => {
                console.log(rej);
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
                        title={<BackIcon icon={"desktop"} color="white" title={"Member Management"} />}
                        className="page-header"
                    />
                    <Button style={{ margin: '10px' }} onClick={() => {
                        this.props.history.push('/admin/members/add-member')
                    }}>Add Member</Button>
                    <UserTable data={users} />
                </Col>
            </Row>
        );
    }
}

const UserManagement = withRouter(UserManagementBase);

export default UserManagement;
