import React, {useState, useEffect, useRef} from 'react'
import {
    Table, Button, Modal, Switch,
    notification, Space, Badge, Popover
} from 'antd'
import {
    UnorderedListOutlined, DeleteOutlined,
    ExclamationCircleOutlined, CarryOutOutlined
} from '@ant-design/icons';

import axios from 'axios'

const {confirm} = Modal

export default function RecruitmentList() {

    const userInfo = JSON.parse(localStorage.getItem("userInfo"))

    const [recruitmentList, setRecruitmentList] = useState([])

    // 获取用户列表
    useEffect(() => {
        axios({
            url: '/association/listRecruitment',
            method: 'post',
            data: {
                userId: userInfo.userId,
                state: ''
            },
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).then(res => {
            console.log("==27 resData", res.data.data);
            setRecruitmentList(res.data.data)
        }).catch(err => {
            console.log("==26 err", err);
        })
    }, [])

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
                return <Popover content={"点击查看详情"} >
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
                return <Space>
                    {/*去掉查看按钮，用a标签链接替代*/}
                    {/*<Button*/}
                    {/*    size="small"*/}
                    {/*    icon={<UnorderedListOutlined/>}*/}
                    {/*>查看</Button>*/}

                    {/*去掉提交按钮，用详情页面的操作按钮替代*/}
                    {/*{*/}
                    {/*    item.state === "UNEXAMINE" &&*/}
                    {/*    <Button*/}
                    {/*        size="small"*/}
                    {/*        icon={<CarryOutOutlined />}*/}
                    {/*    >提交</Button>*/}
                    {/*}*/}
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
                console.log("同步后台数据。。。")
                axios.delete(`/association/deleteUserById/${item.userId}`)
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
