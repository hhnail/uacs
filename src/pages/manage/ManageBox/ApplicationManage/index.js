import React, {useEffect, useState} from 'react'
import {Badge, Button, message, Modal, Space, Table} from 'antd'
import {RollbackOutlined} from '@ant-design/icons';
import {getApplicationByUserId, updateApplicationState} from "../../../../services/applicationService";
import {useHistory} from "react-router-dom";
import {APPLICATION_STATE} from '../../../../constants/state'
import qs from "querystring";
import {OPTION_ICONS} from "../../../../constants/icon";
import ViewInterview from "../../../components/ViewInterview";

export default function ApplicationManage() {

    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    const history = useHistory()
    const [applicationList, setApplicationList] = useState([])

    const refreshApplication = () => {
        getApplicationByUserId(userInfo.userId).then(res => {
            const {data} = res.data
            setApplicationList(data)
        })
    }

    useEffect(() => {
        refreshApplication()
    }, [])

    const handleApplicationUpdate = (applicationId, state) => {
        updateApplicationState(qs.stringify({applicationId, state}))
            .then(() => {
                refreshApplication()
                message.success('操作成功！')
            })
    }

    const renderOptions = (item) => {
        return <Space>
            <Button size="small" icon={OPTION_ICONS.VIEW}
                    onClick={() => {
                        history.push(`/manage/review/joinAssociation/${item.applicationId}/0`)
                    }}
            >
                查看
            </Button>
            {item.state === APPLICATION_STATE.INTERVIEW_PASS.value &&
            <Button size="small" type='primary' icon={OPTION_ICONS.ACCEPT}
                    onClick={() =>
                        Modal.confirm({
                            title: `您确认加入【${item.associationName}-${item.departmentName}】吗？`,
                            onOk: () => {
                                handleApplicationUpdate(item.applicationId, APPLICATION_STATE.CONFIRM.value)
                            }
                        })
                    }>确认加入</Button>
            }
            {item.state === APPLICATION_STATE.APPLYING.value &&
            <Button size="small" danger icon={<RollbackOutlined/>}
                    onClick={() => {
                        Modal.confirm({
                            title: '您确认要撤销申请吗？',
                            onOk: () => {
                                handleApplicationUpdate(item.applicationId, APPLICATION_STATE.UN_COMMIT.value)
                            }
                        })
                    }}>撤销</Button>
            }
            {item.state === APPLICATION_STATE.UN_COMMIT.value &&
            <Button size="small" icon={OPTION_ICONS.COMMIT}
                    onClick={() => handleApplicationUpdate(item.applicationId, APPLICATION_STATE.APPLYING.value)}>提交</Button>
            }
            {item.state === APPLICATION_STATE.INTERVIEW_INVITING.value &&
            <Button size="small" type='primary' icon={OPTION_ICONS.ACCEPT}
                    onClick={() => {
                        Modal.confirm({
                            title: '接受面试',
                            width: 698,
                            content: <ViewInterview application={item}/>,
                            onOk: () => {
                                handleApplicationUpdate(item.applicationId, APPLICATION_STATE.UN_INTERVIEW.value)
                            },
                            okText: '确认接受',
                            cancelText: '取消操作',
                        })
                    }}>接受</Button>
            }
            {item.state === APPLICATION_STATE.INTERVIEW_INVITING.value &&
            <Button size="small" danger icon={OPTION_ICONS.REFUSE}
                    onClick={() =>
                        Modal.confirm({
                            title: '拒绝面试邀请无法撤销，确认拒绝吗？',
                            onOk: () => {
                                handleApplicationUpdate(item.applicationId, APPLICATION_STATE.REFUSE_INVITING.value)
                            }
                        })
                    }>拒绝</Button>
            }
            {!item.state &&
            <Button size="small" danger icon={OPTION_ICONS.DELETE}
                    onClick={() => handleApplicationUpdate(item.applicationId, APPLICATION_STATE.APPLYING.value)}>删除</Button>
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
            title: '社团及意向部门',
            dataIndex: 'departmentName',
            render(departmentName, item) {
                return (
                    <>
                        <a onClick={() => {
                            history.push(`/user/associationDetail/${item.associationId}`)
                        }}>{item.associationName}</a> —— {departmentName || '未选择部门'}
                    </>
                )
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
                    case APPLICATION_STATE.REFUSE_INVITING.value:
                        return <Badge status="warning" text={APPLICATION_STATE.REFUSE_INVITING.name}/>
                    case APPLICATION_STATE.UN_INTERVIEW.value:
                        return <Badge status="processing" text={APPLICATION_STATE.UN_INTERVIEW.name}/>
                    case APPLICATION_STATE.INTERVIEW_PASS.value:
                        return <Badge status="processing" text={APPLICATION_STATE.INTERVIEW_PASS.name}/>
                    case APPLICATION_STATE.CONFIRM.value:
                        return <Badge status="success" text={APPLICATION_STATE.CONFIRM.name}/>
                    case APPLICATION_STATE.APPLY_REFUSE.value:
                        return <Badge status="error" text={APPLICATION_STATE.APPLY_REFUSE.name}/>
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
            <Table
                dataSource={applicationList}
                columns={columns}
                pagination={{
                    pageSize: 6
                }}
                rowKey={item => item.shareId}
            />
        </div>
    )

}
