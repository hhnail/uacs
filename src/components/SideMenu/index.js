import React, {Component, useEffect} from 'react'
import {Layout, Menu} from 'antd';
import {
    AppleFilled,
    UsergroupAddOutlined,
    HomeTwoTone,
    TeamOutlined,
    ClusterOutlined,
    BarsOutlined,
    CarryOutOutlined,
    TableOutlined,
    AuditOutlined
} from '@ant-design/icons';

import {withRouter} from 'react-router-dom'

import axios from 'axios'

import './index.css'
import qs from "querystring";

const {SubMenu} = Menu;
const {Sider} = Layout;

const iconList = {
    "/manage/home": <HomeTwoTone/>,
    "/manage/user": <TeamOutlined/>,
    "/manage/association": <ClusterOutlined/>,
    "/manage/association/list": <TableOutlined/>,
    "/manage/association/add": <UsergroupAddOutlined/>,
    "/manage/permission": <CarryOutOutlined/>,
    "/manage/permission/roleList": <BarsOutlined/>,
    "/manage/permission/permissionList": <TableOutlined/>,
    "/manage/review": <AuditOutlined/>,
    "/manage/review/addAssociation": <AuditOutlined/>,
    "/manage/review/joinAssociation": <AuditOutlined/>,
    "/manage/review/exitAssociation": <AuditOutlined/>,
}

class SideMenu extends Component {

    state = {
        // 菜单列表
        menuList: [],
        // 选中菜单项的key，可以同时选中多个，因此是数组
        selectKeys: [],
        // 打开菜单项的key
        openKeys: [],
        // 用户信息
        userInfo: {},
    }

    componentWillMount() {
        // 获取菜单信息
        this.getMenuList()

        // 展开默认项。刷新后仍然有效
        this.showSelected()

        // 通过token换取用户信息
        this.getUserInfoByToken()
    }

    // 通过token换取用户信息
    getUserInfoByToken = () => {
        const accessToken = localStorage.getItem("token")
        axios({
            url: "/user/getUserInfo",
            method: 'post',
            data: qs.stringify({accessToken: accessToken}),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
            .then(res => {
                const {data} = res.data
                console.log("==1 data ", data)
                this.setState({userInfo: data})
            })
            .catch(err => {
                console.log("获取用户信息出错！", err);
            })
    }

    // 获取菜单数据
    getMenuList = () => {
        axios.get("/association/getPermissionList").then(res => {
            const {data} = res.data
            // console.log("==1 menuList", data);
            this.setState({menuList: data})
        }).catch(err => {
            console.log("获取菜单出错！", err);
        })
    }

    // 展开选中项并高亮。刷新后仍然有效
    showSelected = () => {
        // ( 刷新后 )选择默认展开项、高亮项
        // props.location.pathname 取出当前页面的路径
        const path = this.props.location.pathname
        // console.log("==3", path);
        const openIndex = path.lastIndexOf("\/")
        const openKeys = [path.substring(0, openIndex)]
        // console.log("==4", openKeys);
        const selectKeys = Array(this.props.location.pathname)
        // console.log("==5", selectKeys);

        this.setState({openKeys})
        this.setState({selectKeys})
    }

    checkPageElement = (item) => {
        let isShow = false;
        // 检查是否是菜单元素。true才在菜单栏展示
        if ("MENU_ELEMENT" === item.type) {
            // 权限控制 检查item是否能够展示
            isShow = true
        }
        return isShow

    }

    // 渲染侧边栏菜单
    renderMenu = (menuList) => {
        return menuList.map((item) => {
            if (item.children.length > 0 && this.checkPageElement(item)) {
                return <SubMenu
                    key={item.routePath}
                    title={item.title}
                    icon={iconList[item.routePath]}
                >
                    {/* 递归 */}
                    {this.renderMenu(item.children)}
                </SubMenu>
            }
            return this.checkPageElement(item) &&
                <Menu.Item
                    key={item.routePath}
                    style={{
                        height: "30px",
                    }}
                    onClick={() => {
                        this.props.history.push(item.routePath)
                    }}
                >
                    {iconList[item.routePath]}
                    &nbsp;&nbsp;
                    {item.title}
                </Menu.Item>
        })
    }


    render() {
        return (
            <Sider style={{backgroundColor: "orange"}} width={200} collapsed={false}>
                <div style={{display: "flex", height: "100%", "flexDirection": "column"}}>
                    <div className="logo"><AppleFilled/> 橘集 <AppleFilled/>
                        <br/>高校社团管理系统
                    </div>
                    <div style={{flex: 1, "overflow": "auto"}}>
                        <Menu theme="light" mode="inline"
                              defaultSelectedKeys={this.state.selectKeys}
                              defaultOpenKeys={this.state.openKeys}
                              style={{height: '100%', borderRight: 0}}>
                            {this.renderMenu(this.state.menuList)}
                        </Menu>
                    </div>
                </div>
            </Sider>
        )
    }
}

export default withRouter(SideMenu)