import React from 'react';
import { Table } from 'antd';
import { Link, withRouter } from "react-router-dom";
const { Column } = Table;

const ClientTableBase = ({ data, onEdit, onDelete }) => {
    return (
        <Table pagination={false} dataSource={data}>
            <Column title="Name" dataIndex="name" key="name" />
            <Column title="Slug" dataIndex="slug" key="slug" />
            <Column
                align="center"
                title="Actions"
                key="actions"
                render={(text, record) => (
                    <div>
                        <span>
                            <a onClick={() => onEdit(record.slug)}>Edit</a>
                        </span> /   <span>
                            <a onClick={() => {
                                onDelete(record.slug)
                            }}>Delete</a>
                        </span> /
                        <span>
                            <Link to={`/${record.slug}/admin/content-management`}>Admin</Link>
                        </span> 
                    </div>
                )}
            />
        </Table>
    )
}

export const ClientTable = withRouter(ClientTableBase);