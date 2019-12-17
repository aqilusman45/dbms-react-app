import React, { Component } from 'react';
import { Col, Row, PageHeader, Icon } from 'antd';
import { withFirebase } from '../Firebase';
import { withRouter } from "react-router-dom";
import { ClientTable } from "../Master_Admin_View_Clients_Table";


const INITIAL_STATE = {
    franchises: null,
  }


const BackIcon = ({ icon, title, color }) => (
    <div className="back-icon-container ant-page-header-heading">
        <span style={{ color: color }} className="back-icon-title ant-page-header-heading-title">
            <Icon className="back-icon-banner" type={icon || ""} />
            {title || ""}
        </span>
    </div>
);


class ClientListsBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE }
    }

    getFranchises = () => {
        let franchises = [];
        this.setState({
            franchises: franchises
        })
        let itemProcessed = 0
        this.props.firebase.getFranchises()
            .then((docs) => {
                docs.docs.forEach((item, index, array) => {
                    franchises.push({ ...item.data() })
                    itemProcessed++;
                    if (itemProcessed === array.length) {
                        this.setState({
                            franchises: franchises
                        })
                    }
                });
            })
    }

    componentWillMount() {
        this.unsubscribe = this.props.firebase.getLiveFranchise().onSnapshot(() => {
            this.getFranchises()
        })
    }

    componentWillUnmount(){
        this.unsubscribe()
    }

    onEdit = (e) =>{
        this.props.history.push(`/master-admin/${e}`)
    }

    onDelete = e => {
        this.props.firebase.deleteFranchise(e)
        this.getFranchises()
    }

    render() {
        return (
            <Row >
                <Col className="route-height">
                    <PageHeader
                        style={{ backgroundColor: '#3e85c5', boxShadow: "0px 1px 10px grey" }}
                        title={<BackIcon icon={"desktop"} color="white" title={"Clients"} />}
                        className="page-header"
                    />
                    <ClientTable onDelete={this.onDelete} onEdit={this.onEdit} data={this.state.franchises} />
                </Col>
            </Row>
        );
    }
}

const ClientLists = withFirebase(withRouter(ClientListsBase));

export default ClientLists;