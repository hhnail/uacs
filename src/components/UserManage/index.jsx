import React, { Component } from 'react'
import { Layout, Breadcrumb } from 'antd';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import UserInfo from '../UserInfo'
import UseHeader from '../UserHeader'


const { Content, Footer, Sider } = Layout;

export default class index extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <UseHeader isUserMenu={true} />
                    <Layout>
                        {/* 侧边栏 */}
                        <Sider width={200} theme="light">
                            {/* 用户头像 */}
                            <Avatar
                                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100, }}
                                src='E:/image/uacs/user_headicon.jpg'
                                icon={<UserOutlined />}
                                alt='快来上传头像吧！'
                                size='large'
                                draggable={true}
                                style={{marginLeft:'55px',marginTop:'30px',width:'100px',height:'100px'}}
                            />
                        </Sider>
                        <Layout style={{ padding: '0 24px 24px' }}>
                            {/* 面包屑 */}
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>个人中心</Breadcrumb.Item>
                                <Breadcrumb.Item>个人简历</Breadcrumb.Item>
                            </Breadcrumb>
                            {/* 用户信息 */}
                            <UserInfo />
                        </Layout>
                    </Layout>
                </Layout>
            </div>
        )
    }
}
