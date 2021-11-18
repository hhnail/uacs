import React, {useEffect, useState} from 'react'
import {Button, Modal, Switch, Table} from 'antd'
import {DeleteOutlined, ExclamationCircleOutlined, UnorderedListOutlined} from '@ant-design/icons';
import axios from 'axios'
import {getAllUsers, getRoleList} from "../../../../services/db";


const {confirm} = Modal

export default function UserList() {

    // 成员列表
    const [dataSource, setDataSource] = useState([])

    const [roleList, setRoleList] = useState([])

    // 获取角色列表 &  获取用户列表
    useEffect(() => {
        getRoleList().then(res => {
            setRoleList(res.data.data)
        })
        getAllUsers().then(res => {
            const {data} = res.data
            setDataSource(data)
        })
    }, [])

    // 表的行列结构
    const columns = [
        {
            title: '学号',
            dataIndex: 'userId',
            render: (userId) => {
                return <b>{userId}</b>
            }
        },
        {
            title: '姓名',
            dataIndex: 'name',
        },
        {
            title: '角色',
            dataIndex: 'roleList',
            filters: [
                ...roleList.map((role) => {
                    return {
                        text: role.roleName,
                        value: role.roleName,
                    }
                })
            ],
            onFilter: (value, item) => {
                // console.log("onFilter item",item)
                let exist = false
                item.roleList.map(role => {
                    // console.log("onFilter 中的 role",role)
                    if (role.roleName === value) {
                        exist = true
                    }
                })
                return exist

            },
            render: (roleList, item) => {
                return roleList.map((role) => {
                    return (
                        <div key={role.roleId}>
                            {
                                role.roleName === "超级管理员" ?
                                    `${role.roleName}`
                                    : `${role.roleName} OF ${role.associationName}`
                            }
                        </div>
                    )
                })
            }
        },
        {
            title: '成员状态',
            dataIndex: 'state',
            render: ((state) => {
                return <Switch
                    checked={state === "OPEN"}
                >
                </Switch>
            })
        },
        {
            title: '操作',
            render: (item) => {
                return <div>
                    <Button
                        shape={"circle"}
                        icon={<UnorderedListOutlined/>}
                        disabled={item.canDel === 0}
                    >
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button
                        shape={"circle"}
                        icon={<DeleteOutlined/>}
                        danger
                        disabled={item.canDel === 0}
                        onClick={() => confirmDelete(item)}
                    >
                    </Button>
                </div>
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
                const newList = dataSource.filter(data => data.id !== item.id)
                setDataSource(newList)
                // 调用后端接口，同步后台数据库
                console.log("同步后台数据。。。")
                // 硬删除
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




    return <>
        <Table
            dataSource={dataSource}
            columns={columns}
            pagination={{
                pageSize: 6
            }}
            rowKey={item => item.id}
        />
    </>
}
