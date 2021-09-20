import React, { Component } from 'react'
import { Layout, Breadcrumb } from 'antd';

const { Content } = Layout;
export default class ManageContent extends Component {
    render() {
        return (
            <div>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>HOME</Breadcrumb.Item>
                        <Breadcrumb.Item>社团管理</Breadcrumb.Item>
                        <Breadcrumb.Item>社团列表</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}>
                        {/* 卡片列表 */}
                        {/* <MyCard/> */}
                        {/* 个人简历 */}
                        
                    </Content>
                </Layout>
            </div>
        )
    }
}
