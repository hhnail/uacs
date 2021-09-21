import React, {useEffect, useState} from 'react'
import {
    Menu,
    Layout,
    Dropdown,
    Avatar
} from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    DownOutlined,
    UserOutlined,
    CloseOutlined
} from '@ant-design/icons'

import {withRouter} from 'react-router-dom'
import axios from "axios";
import qs from 'querystring'

const {Header} = Layout;

function TopHeader(props) {

    const [collapsed, setCollapsed] = useState(false)
    const [userInfo, setserInfo] = useState()

    // 通过token换取用户信息
    useEffect(() => {
        const accessToken = localStorage.getItem("token")

        axios({
            url: "/user/getUserInfo",
            method: 'post',
            data: qs.stringify({accessToken: accessToken}),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
            .then(res => {
                const {data} = res.data
                console.log("==51 userInfo", data);
                setserInfo(data)
            })
            .catch(err => {
                console.log("获取用户信息出错！", err);
            })
    }, [])

    const menu = ( // 顶部菜单结构
        <Menu>
            <Menu.Item key={1}>
                <a>超级管理员</a>
            </Menu.Item>
            <Menu.Item key={2} danger onClick={() => {
                // 去除浏览器中的token
                localStorage.removeItem("token")
                // 重定向到login
                props.history.replace("/login")
            }}>
                退出系统<CloseOutlined/>
            </Menu.Item>
        </Menu>
    );

    const changeFoldState = () => {
        setCollapsed(!collapsed)
    }

    return (
        <Header className="site-layout-background" style={{background: "white", padding: "0px 12px"}}>
            {collapsed ?
                <MenuFoldOutlined onClick={changeFoldState}/>
                : <MenuUnfoldOutlined onClick={changeFoldState}/>}
            &nbsp;&nbsp;&nbsp;
            首页
            <div style={{float: "right"}}>
                亲爱的 <b> {userInfo.name} </b> 同学 欢迎回来~
                &nbsp;&nbsp;&nbsp;
                <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        <Avatar size={40} icon={<UserOutlined/>}/>
                        <DownOutlined/>
                    </a>
                </Dropdown>
            </div>
        </Header>
    )
}

export default withRouter(TopHeader)

