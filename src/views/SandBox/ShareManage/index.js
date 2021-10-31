import React, {useEffect, useState} from 'react'
import {Badge, Button, Modal, Popover, Space, Table, Tooltip} from 'antd'
import {
    CloseOutlined, DeleteOutlined, ExclamationCircleOutlined,
    RollbackOutlined, CheckOutlined
} from '@ant-design/icons';
import usePublish from "../../../hooks/usePublish";
import {ROLE_TYPE} from "../../../constants/type";
import axios from "axios";
import {getShareList} from "../../../services/shareService";

const {confirm} = Modal

export default function ShareManage() {

    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    const [shareList, setShareList] = useState([])

    useEffect(() => {
        getShareList().then(res => {
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
            title: 'ID',
            dataIndex: 'shareId',
            render(shareId) {
                return <b>{shareId}</b>;
            }
        },
        {
            title: '标题',
            dataIndex: 'title',
            render(title, item) {
                return <Tooltip title="点击查看详情">
                    <a href={`#/manage/share/list/${item.shareId}`}
                    >{title}</a>
                </Tooltip>;
            }
        },
        {
            title: '所在社团',
            dataIndex: 'associationName',
        },
        {
            title: '申请人',
            dataIndex: 'name',
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
