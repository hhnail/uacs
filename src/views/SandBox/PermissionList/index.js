import React, { Component } from 'react'
import { Table, Tag, Button, Modal, Popover, Switch } from 'antd'
import {
    EditOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';
import axios from 'axios'


const { confirm } = Modal

export default class PermissonList extends Component {

    state = {
        dataSource: [],
        columns: [
            {
                title: 'ID',
                // 通过dataIndex映射VO字段
                dataIndex: 'key',
                // key: 'key',
                render: (key) => {
                    return <b>{key}</b>
                }
            },
            {
                title: '权限名称',
                dataIndex: 'title',
            },
            {
                title: '权限路径',
                dataIndex: 'routePath',
                render: (routePath) => {
                    return <Tag color={"orange"}>{routePath}</Tag>
                }
            },
            {
                title: '操作',
                render: (item) => {
                    return <div>
                        <Popover
                            style={{}}
                            content={
                                <div>
                                    <Switch checked={item.type === "MENU_ELEMENT"} onClick={() => this.changeMenuState(item)}></Switch>
                                </div>}
                            title="是否在左侧菜单栏展示"
                            trigger={
                                item.type === "MENU_ELEMENT" || item.type === "MENU_ELEMENT_CLOSE" ?
                                    "click"
                                    : ""
                            }
                        >
                            {/* {item.type === "MENU_ELEMENT" &&} */}
                            <Button
                                shape={"circle"}
                                icon={<EditOutlined />}
                            // style={item.type === "MENU_ELEMENT" ? {
                            //     border: "1px solid rgb(165, 99, 13)",
                            //     color: "rgb(165, 99, 13)"
                            // } : { border: "1px" }}
                            // disabled={item.type === "PAGE_ELEMENT"}
                            >
                            </Button>
                        </Popover>
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
    }


    confirmDelete = (item) => {
        // const { dataSource } = this.state
        // console.log("==11 dataSource",this.state.dataSource);
        const { dataSource } = this.state
        const thisPoint = this
        confirm({
            title: '您确认要删除吗？',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                // console.log("==10 item", item);
                // 同步页面
                let ds = []
                // let ds = Array.from(dataSource)
                if (item.grade === 1) {
                    // console.log("==11 ", ds);
                    ds = dataSource.filter(data => data.key !== item.key)
                } else if (item.grade === 2) {
                    // console.log("==12 ", ds);
                    dataSource.map((firstPermission) => {
                        if (firstPermission.children !== "") {
                            firstPermission.children = firstPermission.children.filter((child) => child.key !== item.key)
                            if (firstPermission.children.length === 0) {
                                firstPermission.children = ""
                            }
                            ds.push(firstPermission)
                            // console.log("==14 after push:", ds);
                        } else {
                            ds.push(firstPermission)
                        }

                    })
                }
                thisPoint.setState({ dataSource: ds })
                // 调用后端接口，同步后台数据库
                axios.get(`/association/deletePermissionById/${item.key}`)
            },
            onCancel() {

            }
        })
    }

    // 改变菜单项的状态。是否在左侧菜单栏展示
    changeMenuState = (item) => {
        console.log("==15 item", item);
        if (item.type === "MENU_ELEMENT") {
            item.type = "MENU_ELEMENT_CLOSE"
        } else if (item.type === "MENU_ELEMENT_CLOSE") {
            item.type = "MENU_ELEMENT"
        }
        this.setState([...this.state.dataSource])

        // 同步后端
        axios({
            url: "/association/updatePermissionById",
            method: 'post',
            data: {
                permissionId: item.key,
                type: item.type
            },
            headers: { 'Content-Type': 'application/json;charset=UTF-8' }
        }).then(res => {
            console.log("==27 res", res);
        }).catch(err => {
            console.log("==26 err", err);
        })

    }


    componentDidMount() {
        // 获取菜单信息
        axios.get("/association/getPermissionList").then(res => {
            const { data } = res.data // res.data还只是responseBody
            // 用map
            // data.map((item) => {
            //     return item.children = (item.children.length === 0 ? '' : item.children)
            // })
            // 用foreach
            data.forEach((item) => {
                if (item.children.length === 0) {
                    item.children = ""
                } else {
                    item.children.forEach((e) => {
                        if (e.children.length === 0) {
                            e.children = ""
                        }
                    })
                }
            })
            // console.log("==1 ", data);
            this.setState({ dataSource: data })
            // console.log("==2 ", this.state.dataSource);
        }).catch(err => {
            console.log("获取菜单（权限）列表出错！", err);
        })
    }

    render() {
        return (
            <div>
                <Table
                    dataSource={this.state.dataSource}
                    columns={this.state.columns}
                    pagination={{
                        pageSize: 5
                    }}
                />
            </div>
        )
    }

}
