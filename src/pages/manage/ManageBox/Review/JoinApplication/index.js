import React, {useEffect, useState} from 'react'
import {Badge, Button, Modal, Space, Table, Tooltip} from 'antd'
import {
    CheckOutlined,
    CloseOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
    RollbackOutlined
} from '@ant-design/icons';
import usePublish from "../../../../../hooks/usePublish";
import {ROLE_TYPE} from "../../../../../constants/type";

const {confirm} = Modal

export default function JoinAssociation() {

    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    const [recruitmentList, setRecruitmentList] = useState()
    const [applicationList,setApplicationList] = useState([])

    useEffect(() => {
        setApplicationList([])
    })

    const handleUpdateApplicationState = (applicationId)=>{

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
                    onClick={() => handleUpdateApplicationState(item.recruitmentId)}>撤销</Button>}

            {!isSuperAdmin &&
            <Button size="small" danger icon={<DeleteOutlined/>}
                    onClick={() => handleUpdateApplicationState(item.recruitmentId)}>删除</Button>}

            {isSuperAdmin &&
            <Button size="small" icon={<CheckOutlined/>}
                    onClick={() => handleUpdateApplicationState(item.recruitmentId)}>通过</Button>}

            {isSuperAdmin &&
            <Button size="small" danger icon={<CloseOutlined/>}
                    onClick={() => handleUpdateApplicationState(item.recruitmentId)}>拒绝</Button>}
        </Space>
    }

    const columns = [
        {
            title: '序号',
            dataIndex: 'recruitmentId',
            render(recruitmentId) {
                return <b>{recruitmentId}</b>;
            }
        },
        {
            title: '标题',
            dataIndex: 'title',
            render(title, item) {
                return <Tooltip title="点击查看详情">
                    <a href={`#/manage/recruitment/list/${item.recruitmentId}`}
                    >{title}</a>
                </Tooltip>;
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
            title: '纳新社团组织',
            dataIndex: 'associationName',
        },
        {
            title: '申请人',
            dataIndex: 'name',
        },
        {
            title: '操作',
            render: (item) => renderOptions(item)
        },
    ]

    // 删除确认
    const confirmDelete = (item) => {
        console.log("delete item", item)
        confirm({
            title: '您确认要删除吗？',
            icon: <ExclamationCircleOutlined/>,
            onOk() {
                const newList = recruitmentList.filter(data => data.id !== item.id)
                setRecruitmentList(newList)
            },
            onCancel() {

            }
        })
    }

    return (
        <div>
            <Table
                dataSource={recruitmentList}
                columns={columns}
                pagination={{
                    pageSize: 4
                }}
                rowKey={item => item.recruitmentId}
            />
        </div>
    )

}
