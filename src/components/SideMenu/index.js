import React, {Component} from 'react'
import {Layout, Menu} from 'antd';
import Icon, {
    AuditOutlined,
    BarsOutlined,
    CarryOutOutlined,
    ClusterOutlined,
    FormOutlined,
    HomeTwoTone,
    TableOutlined,
    TeamOutlined,
    UsergroupAddOutlined,
} from '@ant-design/icons';
import {ReactComponent as OrangeIcon} from '../../icons/orange.svg';

import {withRouter} from 'react-router-dom'

import axios from 'axios'

import './index.css'
import qs from "querystring";
import {connect} from "react-redux";
import {getPermissionListByUserId} from "../../services/db";

const {SubMenu} = Menu;
const {Sider} = Layout;

const iconList = {
    "/manage/home": <HomeTwoTone/>,
    "/manage/user": <TeamOutlined/>,
    "/manage/association": <ClusterOutlined/>,
    "/manage/association/list": <TableOutlined/>,
    "/manage/association/add": <UsergroupAddOutlined/>,
    "/manage/association/addRecruitment": <FormOutlined/>,
    "/manage/association/listRecruitment": <TableOutlined/>,
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

    // 获取菜单信息
    // 展开默认项。刷新后仍然有效
    componentWillMount() {
        // 通过token换取用户信息
        this.getMenuListByToken()

        // this.getMenuList(userId)

        this.showSelected()
    }

    // 通过token换取用户信息 并 用userId获取权限列表
    getMenuListByToken = () => {
        const accessToken = localStorage.getItem("token")
        axios({
            url: "/user/getUserInfo",
            method: 'post',
            data: qs.stringify({accessToken: accessToken}),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
            .then(res => {
                const userInfo = res.data.data
                // console.log("==1 用户信息 ", userInfo)
                this.setState({userInfo: userInfo})
                // 根据userId获取菜单列表
                if (userInfo) {
                    this.getMenuList(userInfo.userId)
                }
            })
            .catch(err => {
                console.log("==SideMenu 获取用户信息出错！", err)
                localStorage.removeItem("token")
                this.props.history.replace("/")
            })
    }

    // 获取菜单数据
    getMenuList = (userId) => {
        getPermissionListByUserId(userId).then(res => {
            const {data} = res.data
            console.log("==102 SideMenu menuList", data);
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
        return "MENU_ELEMENT" === item.type ? true : false
    }

    // 渲染侧边栏菜单
    renderMenu = (menuList) => {
        return menuList.map((item) => {
            // 当前item为父菜单，并且有下级菜单
            if (item.children.length > 0 && this.checkPageElement(item)) {
                return <SubMenu key={item.routePath} title={item.title} icon={iconList[item.routePath]}
                                style={{
                                    backgroundColor: `rgba(232, 140, 20, 0.05)`,
                                }}>
                    {this.renderMenu(item.children)}{/* 递归 */}
                </SubMenu>
            }
            // 当前item为父菜单，但是没有下级菜单
            else if (item.children.length === 0 && this.checkPageElement(item)) {
                return <Menu.Item key={item.routePath}
                                  onClick={() => {
                                      this.props.history.push(item.routePath)
                                  }}
                >{iconList[item.routePath]}&nbsp;&nbsp;{item.title}
                </Menu.Item>
            }

            // 当前item为叶子菜单
            return this.checkPageElement(item) && item.grade === 2 &&
                <Menu.Item key={item.routePath}
                           onClick={() => {
                               this.props.history.push(item.routePath)
                           }}
                >{iconList[item.routePath]}&nbsp;&nbsp;{item.title}
                </Menu.Item>
        })
    }

    render() {
        return (
            <Sider width={200}
                   style={{backgroundColor: "orange"}}
                // 侧边菜单是否折叠
                   collapsed={this.props.isCollapsed}
            >
                <div style={{display: "flex", height: "100%", "flexDirection": "column"}}>
                    <div className='logo'>
                        <OrangeIcon
                            style={{
                                width: 26,
                                height: 22,
                                marginBottom: -3,
                            }}/>
                        {!this.props.isCollapsed && <>橘集<br/>高校社团管理系统</>}
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

const mapState2Props = ({CollapseReducer: {isCollapsed}}) => {
    return {
        isCollapsed
    }
}

export default connect(mapState2Props)(withRouter(SideMenu))