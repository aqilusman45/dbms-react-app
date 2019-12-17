import React from "react";
import { Row, Col, PageHeader, Icon, Progress } from "antd";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import { UserTable } from "../Users_Table";

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
        let users = [];
        var itemsProcessed = 0;
        this.props.firebase.totalScoreForAllPages(this.props.match.params.franchise)
            .then((data) => {
                var allProgress = 0;
                data.docs.forEach((item, index, array) => {
                    allProgress += item.data()['total-score'];
                });
                return allProgress
            })
            .then((allProgress) => {
                this.props.firebase.getAllUsers(this.props.match.params.franchise)
                    .then((data) => {
                        data.docs.forEach((item, index, array) => {
                            this.props.firebase.getAllProgress(item.data().uid)
                                .then((datas) => {
                                    let myScore = 0;
                                    datas.docs.forEach((item, index, array) => {
                                        myScore += parseInt(item.data()['progress'])
                                    });
                                    users.push({
                                        key: `${index}`,
                                        email: item.data().email,
                                        userrole: item.data().userrole,
                                        uid: item.data().uid,
                                        progress: <Progress type="circle" percent={Math.floor(((myScore / allProgress) * 100))} width={50} />
                                    })
                                    itemsProcessed++;
                                    if (itemsProcessed === array.length) {
                                        this.setUser(users)
                                    }
                                })


                        })
                    })
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
                        title={<BackIcon icon={"desktop"} color="white" title={"User Management"} />}
                        className="page-header"
                    />
                    <UserTable data={users} />
                </Col>
            </Row>
        );
    }
}

const UserManagement = withFirebase(withRouter(UserManagementBase));

export default UserManagement;
