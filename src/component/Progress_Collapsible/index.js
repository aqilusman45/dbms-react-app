import React from 'react';
import { Collapse, Empty } from 'antd';
import { withFirebase } from '../Firebase';
const { Panel } = Collapse;

const UserProgressCollapseBase = ({ data }) => {
    if (data === null) {
        return (
            <Empty />
        )
    } else {
        return (
            <Collapse>
                {data && data.map((item, index) => {
                    return (
                        <Panel header={item.pageTitle} key={index}>
                            <h6>Current Progress for the this page.</h6>
                            <p>{item.currentProgress}</p>
                            <h6>Total Score for the this page</h6>
                            <p>{item.totalScore}</p>
                            <h6>Downloadable content Status</h6>
                            <ul>
                                {
                                    item.panels.map((item, index) => {
                                        return (
                                            <li key={item.key}>
                                                <h6>{item.key}</h6>
                                                <p><span>First access: </span>{(item['first-access'].toDate()).toString()}</p>
                                                <p><span>Last access: </span>{item['last-access'] !== '' ? (item['last-access'].toDate()).toString() : " not accessed after first time"}</p>
                                                <p><span>Total weightage for this download: </span> {item.weightage}</p>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </Panel>
                    )
                })}
            </Collapse>
        )
    }

}

const UserProgressCollapse = withFirebase(UserProgressCollapseBase)

export default UserProgressCollapse;