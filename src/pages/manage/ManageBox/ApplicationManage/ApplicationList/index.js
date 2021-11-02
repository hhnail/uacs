import React, {useEffect, useState} from 'react'
import {Badge, Button, Modal, Space, Table, Tooltip} from 'antd'
import {
    CheckOutlined,
    CloseOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
    RollbackOutlined
} from '@ant-design/icons';
import {ROLE_TYPE} from "../../../../../constants/type";
import {getApplicationList} from "../../../../../services/applicationService";

const {confirm} = Modal

export default function ApplicationList() {

    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    const [shareList, setShareList] = useState([])

    useEffect(() => {
        console.log(userInfo.manageAssociationKeys)
        getApplicationList(userInfo.manageAssociationKeys).then(res => {
            console.log(res)
            const {data} = res.data
            setShareList(data)
        })
    }, [])

    const handelShareUpdate = (shareId) => {
        console.log(shareId)
    }

    const renderOptions = (item) => {
        let isSuperAdmin = false
        const hasRoleList = userInfo.roleList
        hasRoleList.map(role => {
            if (role.roleName === ROLE_TYPE.SUPER_ADMIN.name) {
                isSuperAdmin = true
                return
            }
        })
        return <Space>
            {!isSuperAdmin &&
            <Button size="small" danger icon={<RollbackOutlined/>}
                    onClick={() => handelShareUpdate(item.shareId)}>撤销</Button>}

            {!isSuperAdmin &&
            <Button size="small" danger icon={<DeleteOutlined/>}
                    onClick={() => handelShareUpdate(item.shareId)}>删除</Button>}

            {isSuperAdmin &&
            <Button size="small" icon={<CheckOutlined/>}
                    onClick={() => handelShareUpdate(item.shareId)}>通过</Button>}

            {isSuperAdmin &&
            <Button size="small" danger icon={<CloseOutlined/>}
                    onClick={() => handelShareUpdate(item.shareId)}>拒绝</Button>}
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
                return <Tooltip title="点击查看详情或个人简历">
                    <a href={`#/manage/review/joinAssociation/${item.applicationId}`}
                    >{name}</a>
                </Tooltip>;
            }
        },
        {
            title: '意向部门',
            dataIndex: 'intentionDepartment',
            render(intentionDepartment, item) {
                return (item.associationName + '-' +  intentionDepartment)
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
                    case "UNEXAMINE":
                        return <Badge status="warning" text="未提交"/>
                    case "EXAMINING":
                        return <Badge status="processing" text="审核中"/>
                    case "EXAMINE_PASS":
                        return <Badge status="success" text="审核通过"/>
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

    // 删除确认
    const confirmDelete = (item) => {
        confirm({
            title: '您确认要删除吗？',
            icon: <ExclamationCircleOutlined/>,
            onOk() {

            },
            onCancel() {

            }
        })
    }

    return (
        <div>
            <Table
                dataSource={shareList}
                columns={columns}
                pagination={{
                    pageSize: 6
                }}
                rowKey={item => item.shareId}
            />
        </div>
    )

}
