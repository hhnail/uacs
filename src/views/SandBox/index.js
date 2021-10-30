// 第三方
import React, {useEffect} from 'react'
// uacs
import SideMenu from '../../components/SideMenu'
import TopHeader from '../../components/TopHeader'
import SysRouter from './SysRouter'
// css
import './index.css'
// antd
import {Layout, message} from 'antd';
import {useHistory} from "react-router-dom";

const {Content} = Layout;


export default function SandBox() {

    const history = useHistory()
    const userInfo = localStorage.getItem("userInfo")

    useEffect(() => {
        if (!userInfo) {
            message.error("会话超时，请重新登录！")
            setTimeout(() => {
                history.push("/login")
            }, 1500)
        }
    },[userInfo])

    return (
        <Layout>
            {/* 侧边栏 */}
            <SideMenu/>
            {/* 内容布局 */}
            <Layout>
                {/* 头部导航栏 */}
                <TopHeader/>
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
