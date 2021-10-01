import React, { Component } from 'react'
import {
    Table,
    Button,
    Modal,
    Tree
} from 'antd'
import {
    UnorderedListOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';
import axios from 'axios'

const { confirm } = Modal

export default class RoleList extends Component {

    state = {
        roleList: [],// 角色列表
        permissionList: [],// 树形权限列表
        currentRolePermissionKeys: [],// 当前角色的权限
        currentRoleId: 0,// 当前角色的roleId
        // 角色列表表头 及 各列组件效果
        columns: [
            {
                title: 'ID',
                dataIndex: 'roleId',
                render: (roleId) => {
                    return <b>{roleId}</b>
                }
            },
            {
                title: '角色名称',
                dataIndex: 'roleName',
            },
            {
                title: '操作',
                render: (item) => {
                    return <div>
                        <Button
                            shape={"circle"}
                            icon={<UnorderedListOutlined />}
                            onClick={() => {
                                this.setState({ isModalVisible: true })
                                this.setState({ currentRolePermissionKeys: this.mapPermissions2Keys(item.permissions) })
                                this.setState({ currentRoleId: item.roleId })
                            }}
                        >
                        </Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button
                            shape={"circle"}
                            icon={<DeleteOutlined />}
                            danger
                            onClick={() => this.confirmDelete(item)}
                        >
                        </Button>
                    </div>
                }
            },
        ],
        isModalVisible: false
    }

    componentDidMount() {
        // 获取角色列表 并 同步到state中
        this.getRoleList()
        // 获取权限列表 并 同步到state中
        this.getPermissionList()
    }


    // 获取角色列表
    getRoleList = () => {
        axios.get("/association/getRoleList").then(res => {
            const roleData = res.data.data
            // console.log("==31 roleData", roleData);
            this.setState({ roleList: roleData })
        }).catch(err => {
            console.log("获取角色列表出错！", err);
        })
    }

    // 获取树形权限列表
    getPermissionList = () => {
        axios.get("/association/getPermissionList").then(res => {
            const permissionData = res.data.data
            this.setState({ permissionList: permissionData })
        }).catch(err => {
            console.log("获取权限列表出错！", err);
        })
    }

    // TODO 删除后给个loading提示
    confirmDelete = (item) => {
        const { roleList } = this.state
        const thisPoint = this
        confirm({
            title: '您确认要删除吗？',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                // 同步页面
                // console.log("==1 dataSource", roleList);
                const newList = roleList.filter(data => data.roleId !== item.roleId)
                thisPoint.setState({ roleList: newList })
                // 调用后端接口，同步后台数据库
                // axios.get(`/association/deleteRoleById/${item.roleId}`)
            },
            onCancel() {

            }
        })
    }

    // 模态框 点击ok 重新为角色分配权限
    handleOk = () => {
        // 隐藏模态框
        this.setState({ isModalVisible: false })

        // 为同步后端做准备
        let roleId
        let permissionIds = []

        // 同步前端dataSource
        // console.log("==71 当前roleId", this.state.currentRoleId);
        // console.log("==71 完整的permissionList", this.state.permissionList);
        const secondPermissions = this.getSecondPermissions()
        // console.log("==73 secondPermissions", secondPermissions);
        const dataSource = this.state.roleList
        // console.log("==75 原先的roleList", dataSource);
        const newDataSource = dataSource.map((item) => {
            // 拿到当前role（即需要修改的role）
            if (item.roleId === this.state.currentRoleId) {
                const currentPermissions = []
                secondPermissions.map((secondPms) => {
                    // 如果当前二级权限在 选中的权限 中存在，则加入数组（数组为新的权限列表）
                    if (this.state.currentRolePermissionKeys.find((e) => { return e === secondPms.key })) {
                        // console.log("==76 当前权限被选中：", secondPms);
                        permissionIds.push(secondPms.key) // 同步后端
                        currentPermissions.push(secondPms)
                    }
                })
                const newItem = { ...item, permissions: currentPermissions }
                // console.log("==77 newItem", newItem);

                roleId = item.roleId // 同步后端

                return newItem
                // 若不是当前role，则原样返还
            } else {
                return item;
            }
        })
        console.log("==75 new roleList", newDataSource);
        this.setState({ roleList: newDataSource })
        // 同步后端数据库(今天先写到这里--20210829)
        console.log("==81 roleId", roleId);
        console.log("==81 permissionIds", permissionIds);
        axios({
            url: "/association/reGrantPermissions2Role",
            method: 'post',
            data: {
                roleId: roleId,
                permissionIds: permissionIds
            },
            headers: { 'Content-Type': 'application/json;charset=UTF-8' }
        }).then(res => {
            // console.log("==27 res", res);
        }).catch(err => {
            // console.log("==26 err", err);
        })

    }

    // 模态框 点击cancel || 右上角x号 || 点击模态框以外的界面
    handleCancel = () => {
        this.setState({ isModalVisible: false })
    }

    mapPermissions2Keys = (permissions) => {
        // console.log("==54 checkedKey", permissions);
        const checkedKeys = [];
        permissions.map((permission) => {
            checkedKeys.push(permission.key)
        })
        // console.log("==64 checkedKeys",checkedKeys);
        return checkedKeys
    }

    onCheck = (checkedKeys) => {
        // console.log("==61 checkedKeys", checkedKeys);
        // console.log("==62 state.当前role的permission", this.state.currentRolePermissionKeys);
        this.setState({ currentRolePermissionKeys: checkedKeys })
    }

    getSecondPermissions = () => {
        const secondPermissions = []

        this.state.permissionList.map((firstPms) => {
            // console.log("==74 当前一级菜单项：",firstPms);
            firstPms.children.map((secondPms) => {
                return secondPermissions.push(secondPms)
            })
        })
        return secondPermissions;
    }

    render() {
        return (
            <div>
                <Table
                    dataSource={this.state.roleList}
                    columns={this.state.columns}
                    rowKey={(item) => item.roleId}
                >
                </Table>
                <Modal title="分配权限"
                    visible={this.state.isModalVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}>
                    <Tree
                        treeData={this.state.permissionList}
                        checkable={true}
                        checkedKeys={this.state.currentRolePermissionKeys}
                        onCheck={this.onCheck}
                    // checkStrictly={true}
                    />
                </Modal>
            </div>
        )
    }
}