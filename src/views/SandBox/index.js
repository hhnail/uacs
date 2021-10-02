// 第三方
import React, { Component } from 'react'
// uacs
import SideMenu from '../../components/SideMenu'
import TopHeader from '../../components/TopHeader'
import SysRouter from './SysRouter'
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
                    {/* TODO 面包屑-标记当前位置 */}
                    {/*<Breadcrumb style={{ margin: '16px 19px' }}>*/}
                    {/*    <Breadcrumb.Item>HOME</Breadcrumb.Item>*/}
                    {/*    <Breadcrumb.Item>社团管理</Breadcrumb.Item>*/}
                    {/*    <Breadcrumb.Item>社团列表</Breadcrumb.Item>*/}
                    {/*</Breadcrumb>*/}
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
                        <SysRouter></SysRouter>
                    </Content>

                </Layout>
            </Layout>
        )
    }
}
