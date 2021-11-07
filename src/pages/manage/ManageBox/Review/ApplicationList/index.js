import React, {useEffect, useState} from 'react'
import {Badge, Button, message, Modal, Space, Table, Tooltip} from 'antd'
import {
    CheckOutlined,
    CloseOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
    RollbackOutlined
} from '@ant-design/icons';
import {ROLE_TYPE} from "../../../../../constants/type";
import {
    getApplicationByUserId,
    getApplicationList,
    updateApplicationState
} from "../../../../../services/applicationService";
import {ICON, OPTION_ICONS} from "../../../../../constants/icon";
import {APPLICATION_STATE} from "../../../../../constants/state";
import {useHistory} from "react-router-dom";
import qs from "querystring";
import ArrangeInterviewModal from "../../../../components/ArrangeInterviewModal";
import ApplicationCalendar from "../../../../components/Calendar";

const {confirm} = Modal

export default function ApplicationList() {

    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    const history = useHistory()
    const [applicationList, setApplicationList] = useState([])

    useEffect(() => {
        getApplicationList(userInfo.manageAssociationKeys).then(res => {
            const {data} = res.data
            setApplicationList(data)
        })
    }, [])

    const handleApplicationUpdate = (applicationId, state) => {
        updateApplicationState(qs.stringify({applicationId, state}))
            .then(() => {
                message.success('更新成功！')
                getApplicationByUserId(userInfo.userId).then(res => {
                    const {data} = res.data
                    setApplicationList(data)
                })
            })
    }

    const renderOptions = (item) => {
        return <Space>
            {item.state === APPLICATION_STATE.APPLYING.value &&
            <Button size="small" danger icon={<RollbackOutlined/>}
                    onClick={() => {
                        Modal.info({
                            width: 698,
                            title: '面试安排',
                            icon: ICON.interview,
                            content: <ArrangeInterviewModal/>
                        })
                        // handleApplicationUpdate(item.applicationId, APPLICATION_STATE.UN_COMMIT.value)
                    }}>安排面试</Button>
            }
        </Space>
    }

    const columns = [
        {
            title: '编号',
            dataIndex: 'applicationId',
            render(applicationId) {
                return <b>{applicationId}</b>;
            }
        },
        {
            title: '申请人',
            dataIndex: 'name',
            render(name, item) {
                return <Tooltip title="点击查看详情">
                    <a href={`#/manage/review/joinAssociation/${item.applicationId}`}
                    >{name}</a>
                </Tooltip>;
            }
        },
        {
            title: '意向部门',
            dataIndex: 'intentionDepartment',
            render(intentionDepartment, item) {
                return (item.associationName + '-' + intentionDepartment)
            }
        },
        {
            title: '申请时间',
            dataIndex: 'applicationTime',
            render(applicationTime) {
                return (applicationTime)
            }
        },
        {
            title: '状态',
            dataIndex: 'state',
            render(state) {
                switch (state) {
                    case APPLICATION_STATE.UN_COMMIT.value:
                        return <Badge status="warning" text={APPLICATION_STATE.UN_COMMIT.name}/>
                    case APPLICATION_STATE.APPLYING.value:
                        return <Badge status="processing" text={APPLICATION_STATE.APPLYING.name}/>
                    case APPLICATION_STATE.INTERVIEW_INVITING:
                        return <Badge status="success" text={APPLICATION_STATE.INTERVIEW_INVITING.name}/>
                    default:
                        return <Badge status="error" text="状态异常"/>
                }
            }
        },
        {
            title: '操作',
            render: (item) => renderOptions(item)
        },
    ]

    return (
        <div>
            <Button type='primary'
                    onClick={() => {
                        Modal.info({
                            title: '面试安排日历',
                            width: 1500,
                            icon: ICON.calendar,
                            content: <ApplicationCalendar/>
                        })
                    }}
            >查看面试安排日历</Button>
            <Table
                dataSource={applicationList}
                columns={columns}
                pagination={{
                    pageSize: 6
                }}
                rowKey={item => item.applicationId}
            />

        </div>
    )

}
