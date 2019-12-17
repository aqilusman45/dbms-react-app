import React from 'react';
import { Table } from 'antd';
import { Link, withRouter } from "react-router-dom";
const { Column } = Table;

const UserTableBase = ({ data, match }) => {
    return (
        <Table pagination={false} dataSource={data}>
            <Column title="Email" dataIndex="email" key="email" />salary
            <Column title="Phone Number" dataIndex="phoneno" key="phoneno" />
            <Column title="Salary" dataIndex="salary" key="salary" />
            <Column align="center" title="Avalability" dataIndex="availability" key="availability" />
            <Column
                align="center"
                title="Details"
                key="uid"
                render={(text, record) => (
                    <span>
                        <Link to={`/admin/members/${record.phoneno}`}>View Details</Link>
                    </span>
                )}
            />
        </Table>
    )
}

export const UserTable = withRouter(UserTableBase);