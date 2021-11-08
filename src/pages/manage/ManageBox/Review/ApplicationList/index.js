import React, {useEffect, useState} from 'react'
import {Badge, Button, message, Modal, Space, Table, Tooltip} from 'antd'
import {RollbackOutlined} from '@ant-design/icons';
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

    // localStorage
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    // hooks
    const history = useHistory()
    const [applicationList, setApplicationList] = useState([])

    // life cycle
    useEffect(() => {
        refresh()
    }, [])

    const refresh = ()=>{
        getApplicationList(userInfo.manageAssociationKeys).then(res => {
            const {data} = res.data
            console.log('getApplicationList')
            console.log(data)
            setApplicationList(data)
        })
    }

    const handleApplicationUpdate = (applicationId, state) => {
        updateApplicationState(qs.stringify({applicationId, state}))
            .then(() => {
                Modal.destroyAll()
                message.success('更新成功！')
                refresh()
            })
    }

    const renderOptions = (item) => {
        return <Space>
            {item.state === APPLICATION_STATE.APPLYING.value || item.state === APPLICATION_STATE.UN_INTERVIEW.value &&
            <Button size="small" type='primary' icon={OPTION_ICONS.ARRANGE}
                    onClick={() => {
                        Modal.confirm({
                            width: 698,
                            title: '面试安排',
                            icon: ICON.interview,
                            content: <ArrangeInterviewModal canEdit={true}/>,
                            onOk: () => {
                                handleApplicationUpdate(item.applicationId, APPLICATION_STATE.INTERVIEW_INVITING.value)
                            }
                        })
                    }}>面试</Button>
            }
            {item.state === APPLICATION_STATE.INTERVIEW_INVITING.value &&
            <Button size="small" danger icon={<RollbackOutlined/>}
                    onClick={() => {
                        Modal.confirm({
                            title: '确认撤销面试邀请吗？',
                            onOk: () => {
                                handleApplicationUpdate(item.applicationId, APPLICATION_STATE.APPLYING.value)
                            }
                        })
                    }}>撤销</Button>
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
                    case APPLICATION_STATE.INTERVIEW_INVITING.value:
                        return <Badge status="success" text={APPLICATION_STATE.INTERVIEW_INVITING.name}/>
                    case APPLICATION_STATE.UN_INTERVIEW.value:
                        return <Badge status="processing" text={APPLICATION_STATE.UN_INTERVIEW.name}/>
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
