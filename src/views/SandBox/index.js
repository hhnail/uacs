// 第三方
import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
// uacs
import SideMenu from '../../components/SideMenu'
import TopHeader from '../../components/TopHeader'
import Home from '../../views/SandBox/Home'
import UserList from '../../views/SandBox/UserList'
import AssociationList from '../../views/SandBox/AssociationList'
import RoleList from '../../views/SandBox/RoleList'
import PermissionList from '../../views/SandBox/PermissionList'
import NoPermission from '../../views/SandBox/NoPermission'
// css
import './index.css'
// antd
import { Layout, Breadcrumb } from 'antd';

const { Content } = Layout;

export default class SandBox extends Component {
    render() {
        return (
            <Layout>
                {/* 侧边栏 */}
                <SideMenu />
                {/* 内容布局 */}
                <Layout>
                    {/* 头部导航栏 */}
                    <TopHeader />
                    {/* 面包屑-标记当前位置 */}
                    <Breadcrumb style={{ margin: '16px 19px' }}>
                        <Breadcrumb.Item>HOME</Breadcrumb.Item>
                        <Breadcrumb.Item>社团管理</Breadcrumb.Item>
                        <Breadcrumb.Item>社团列表</Breadcrumb.Item>
                    </Breadcrumb>
                    {/* 前端路由 */}
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 240,
                            overflow: 'auto'
                        }}
                    >
                        <Switch>
                            <Route path="/manage/home" component={Home}></Route>
                            <Route path="/manage/user/list" component={UserList}></Route>
                            <Route path="/manage/association/list" component={AssociationList}></Route>
                            <Route path="/manage/permission/roleList" component={RoleList}></Route>
                            <Route path="/manage/permission/permissionList" component={PermissionList}></Route>
                            {/* 重定向 */}
                            <Redirect from="/" to="/manage/home" exact />
                            <Route path="*" component={NoPermission}></Route>
                        </Switch>
                    </Content>

                </Layout>
            </Layout>
        )
    }
}
