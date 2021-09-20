import React, {useState, useEffect, useRef} from 'react'
import {
    Table,
    Button,
    Modal,
    Switch,
} from 'antd'

import {
    UnorderedListOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';

import axios from 'axios'
import UserForm from '../../../components/user-manage/UserForm';


const {confirm} = Modal

export default function UserList() {

    const [dataSource, setDataSource] = useState([])
    const [isAddModalVisible, setIsAddModalVisible] = useState(false)

    const [associationList, setAssciationList] = useState([])
    const [roleList, setRoleList] = useState([])

    const addFormRef = useRef(null)

    // 获取社团列表
    useEffect(() => {
        axios.get("/association/getAllAssociationList")
            .then(res => {
                const {data} = res.data
                // console.log("==52 roleList", data);
                setAssciationList(data)
            })
            .catch(err => {
                console.log("获取社团列表出错！", err);
            })
    }, [])

    // 获取角色列表
    useEffect(() => {
        axios.get("/association/getRoleList")
            .then(res => {
                const {data} = res.data
                // console.log("==52 roleList", data);
                setRoleList(data)
            })
            .catch(err => {
                console.log("获取角色列表出错！", err);
            })
    }, [])

    // 获取用户列表
    useEffect(() => {
        axios.get("/association/getAllUsers")
            .then(res => {
                const {data} = res.data
                console.log("==51 userList", data);
                setDataSource(data)
            })
            .catch(err => {
                console.log("获取用户列表出错！", err);
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
            onFilter:(value,item)=>{
                // console.log("onFilter item",item)
                let exist = false
                item.roleList.map(role=>{
                    // console.log("onFilter 中的 role",role)
                    if(role.roleName === value){
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

    // 弹出模态框
    const showAddModal = () => {
        // console.log("==1 弹出模态框");
        setIsAddModalVisible(true)
    }


    // 模态框 确认 添加成员
    const handelUserAddModalOk = () => {
        // console.log("====3 确定");
        addFormRef.current.validateFields().then(value => {
            setIsAddModalVisible(false)// 关闭模态框
            console.log("==4 ", value);

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
            axios.post(`/association/addUser`, userObj).then((res) => {
                console.log("==10 addUser res", res)
                if (!res.data.data) { //如果失败了，data是null（失败原因可能是：学号已经存在，数据库插入失败）
                    // 同步前端  根据当前user_id获取user信息
                    axios.get(`/association/getUserById/${userObj.userId}`).then(res => {
                        console.log("==11 getUserById res", res)
                        console.log("==11 getUserById res.data.data", res.data.data)
                        setDataSource([...dataSource, res.data.data])
                    }).catch(err => { // catch 获取用户信息失败
                        console.log("==err3 getUserById err", err)
                    })
                }
            }).catch((err) => { // catch 同步后端数据失败
                console.log("==err1 addUser err", err)
            })
        }).catch(err => { // catch 表单验证失败
            // setIsAddModalVisible(false)
            console.log("==err2 ", err);
        })
    }

    return (
        <div>
            <div style={{float: "right"}}>
                <Button type="primary" // shape="circle"
                    onClick={showAddModal}
                >
                    新增成员
                </Button>
            </div>
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={{
                    pageSize: 4
                }}
                rowKey={item => item.id}
            />
            <Modal
                visible={isAddModalVisible}
                title="创建新成员"
                okText="确认"
                cancelText="取消"
                onCancel={() => {
                    setIsAddModalVisible(false)
                    console.log("==3 取消");
                }}
                onOk={handelUserAddModalOk}
            >
                <UserForm
                    associationList={associationList}
                    roleList={roleList}
                    ref={addFormRef}
                ></UserForm>
            </Modal>
        </div>
    )

}
