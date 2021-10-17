import React, {useEffect, useState} from 'react'
import {Badge, Button, Modal, Popover, Space, Table} from 'antd'
import {DeleteOutlined, ExclamationCircleOutlined} from '@ant-design/icons';

import axios from 'axios'
import usePublish from "../../../hooks/usePublish";

const {confirm} = Modal

export default function RecruitmentList() {

    const dataSource = usePublish()
    const [recruitmentList, setRecruitmentList] = useState()

    useEffect(() => {
        setRecruitmentList(dataSource)
    })

    // 表的行列结构
    const columns = [
        {
            title: '纳新通知ID',
            dataIndex: 'recruitmentId',
            render(recruitmentId) {
                return <b>{recruitmentId}</b>;
            }
        },
        {
            title: '标题',
            dataIndex: 'title',
            render(title, item) {
                return <Popover content={"点击查看详情"}>
                    <a href={`#/manage/association/listRecruitment/${item.recruitmentId}`}
                    >{title}</a>
                </Popover>;
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
            render: (item) => {
                // TODO 根据当前身份来判断是审核、查看等管理操作按钮
                return <Space>
                    <Button
                        size="small"
                        danger
                        icon={<DeleteOutlined/>}
                        onClick={() => confirmDelete(item)}
                    >删除</Button>
                </Space>
            }
        },
    ]

    // 删除确认
    const confirmDelete = (item) => {
        // console.log("delete item", item)
        confirm({
            title: '您确认要删除吗？',
            icon: <ExclamationCircleOutlined/>,
            onOk() {
                // 同步页面
                // console.log("同步前端页面")
                const newList = recruitmentList.filter(data => data.id !== item.id)
                setRecruitmentList(newList)
                // 调用后端接口，同步后台数据库
                // TODO 同步后台数据(前台数据不可信？从后台更新后重新获取？)
                axios.delete(`/association//${item.userId}`)
                    .then((res) => {

                    })
                    .catch((err) => {

                    })
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
