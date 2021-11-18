import React, {useEffect, useRef, useState} from 'react'
import {Alert, Button, Modal, Switch, Table} from 'antd'

import {DeleteOutlined, ExclamationCircleOutlined, UnorderedListOutlined} from '@ant-design/icons';

import axios from 'axios'
import UserForm from '../../../../components/user-manage/UserForm';
import {addUser, getAllAssociationList, getAllUsers, getRoleList, getUserById} from "../../../../services/db";
import BatchImport from "./BatchImport";


const {confirm} = Modal

export default function UserList() {

    const [dataSource, setDataSource] = useState([])
    const [isAddModalVisible, setIsAddModalVisible] = useState(false)

    const [associationList, setAssciationList] = useState([])
    const [roleList, setRoleList] = useState([])

    const addFormRef = useRef(null)

    // 获取全部社团列表（用于用户选择社团加入）
    useEffect(() => {
        getAllAssociationList().then(res => {
            setAssciationList(res.data.data)
        })
    }, [])

    // 获取角色列表
    useEffect(() => {
        getRoleList().then(res => {
            setRoleList(res.data.data)
        })
    }, [])

    // 获取用户列表
    useEffect(() => {
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


    // 模态框 确认 添加成员
    const handelUserAddModalOk = () => {
        // console.log("====3 确定");
        addFormRef.current.validateFields().then(value => {
            setIsAddModalVisible(false)// 关闭模态框
            // console.log("==4 ", value);

            // 封装表单信息
            const userObj = {
                userId: value.user_id,
                name: value.name,
                roleName: value.roleName,
                associationName: value.associationName
            }

            // 清空表单信息
            addFormRef.current.resetFields()

            // 同步后端数据库
            addUser(userObj).then((res) => {
                if (res.data.data) {//如果失败了，data是null（失败原因可能是：学号已经存在，数据库插入失败）
                    // 同步前端  根据当前user_id获取user信息
                    getUserById(userObj.userId).then(res => {
                        setDataSource([...dataSource, res.data.data])
                    })
                }
            })
        })
    }

    return <>
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            margin: '10px 0px 20px 0px',
        }}>
            <div style={{
                width: 398,
                height: 180,
                marginLeft:50,
            }}>
                <BatchImport/>
            </div>
            <Button type="primary"
                    style={{
                        marginLeft: -85,
                        marginTop: -3,
                    }}
                    onClick={() => {
                        setIsAddModalVisible(true)
                    }}
            >
                新增成员
            </Button>
            <Alert message="数据格式" type="info" closable
                   style={{
                       height: 180,
                       width: 600,
                       marginLeft: 30,
                   }}
                   description={<>
                       <div> @列1：学号；格式：英文或数字组合，最长不超过20个字符</div>
                       <div>@列2：姓名：格式：中文或英文，最长不超过50个字符</div>
                       <div>@列3：密码：格式：字符和数字的组合，最短6个字符，最长不超过50个字符。可以不提供，系统默认密码为学号后6位</div>

                       <div style={{
                           marginTop:9,
                           color:'red',
                       }}>批量导入失败请检查上述数据格式。若还不成功，请联系管理员18030290509</div>
                   </>}
            />
        </div>
        <Table
            dataSource={dataSource}
            columns={columns}
            pagination={{
                pageSize: 6
            }}
            rowKey={item => item.id}
        />

        {/* 添加成员 Modal */}
        <Modal
            visible={isAddModalVisible}
            title="创建新成员"
            okText="确认"
            cancelText="取消"
            onCancel={() => {
                setIsAddModalVisible(false)
            }}
            onOk={handelUserAddModalOk}
        >
            <UserForm
                associationList={associationList}
                roleList={roleList}
                ref={addFormRef}/>
        </Modal>
    </>
}
