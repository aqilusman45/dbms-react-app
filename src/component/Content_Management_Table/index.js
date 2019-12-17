import React from 'react';
import { Table } from 'antd';
import { withRouter } from "react-router-dom";
const { Column } = Table;

const ContentTableBase = ({ data, onEdit, onDelete }) => {
    return (
        <Table pagination={false} dataSource={data}>
            <Column title="Page Title" dataIndex="pageName" key="pageName" />
            <Column title="Slug" dataIndex="link" key="link" />
            <Column align="center" title="Total Weightage" dataIndex="totalScore" key="totalScore" />
            <Column align="center" title="Order on Side Menu" dataIndex="position" key="position" />
            <Column
                align="center"
                title="Actions"
                key="actions"
                render={(text, record) => (
                    <div>
                        <span>
                            <a onClick={() => onEdit(record.link)}>Edit</a>
                        </span> /   <span>
                            <a onClick={() => {
                                onDelete(record.link)
                            }}>Delete</a>
                        </span>
                    </div>
                )}
            />
        </Table>
    )
}

export const ContentTable = withRouter(ContentTableBase);