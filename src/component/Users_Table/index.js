import React from 'react';
import { Table } from 'antd';
import { Link, withRouter } from "react-router-dom";
const { Column } = Table;

const UserTableBase = ({ data, match }) => {
    console.log(match.params.franchise);
    return (
        <Table pagination={false} dataSource={data}>
            <Column title="Email" dataIndex="email" key="email" />
            <Column title="User Role" dataIndex="userrole" key="userrole" />
            <Column align="center" title="Progress" dataIndex="progress" key="progress" />
            <Column
                align="center"
                title="Details"
                key="uid"
                render={(text, record) => (
                    <span>
                        <Link to={`/${match.params.franchise}/admin/user-management/${record.uid}`}>View Details</Link>
                    </span>
                )}
            />
        </Table>
    )
}

export const UserTable = withRouter(UserTableBase);