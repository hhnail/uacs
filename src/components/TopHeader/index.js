import React, {useEffect, useState} from 'react'
import {
    Menu,
    Layout,
    Dropdown,
    Avatar,
    Switch, Space
} from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    DownOutlined,
    UserOutlined,
    CloseOutlined,
    UserSwitchOutlined
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
                // console.log("==51 userInfo", data);
                setserInfo(data)
            })
            .catch(err => {
                console.log("==TopHeader 获取用户信息出错！", err);
            })
    }, [])


    const menu = ( // 顶部菜单结构
        <Menu>
            <Menu.Item key={1}>
                <a>超级管理员</a>
            </Menu.Item>
            <Menu.Item key={3} danger onClick={() => {
                localStorage.removeItem("token") // 去除浏览器中的token
                localStorage.removeItem("userInfo") // 去除浏览器中的userInfo
                props.history.replace("/login") // 重定向到登录界面
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
                <Space size={"middle"}>
                    <UserSwitchOutlined/>
                    <Switch
                        checkedChildren="使用者"
                        unCheckedChildren="管理者"
                        defaultChecked={false}
                        onClick={() => {
                            props.history.replace("/user") // 重定向到用户界面
                        }}
                    />
                    <div>您好 <span style={{color: 'orange'}}>{userInfo?.name}</span></div>
                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            <Avatar size={28} icon={<UserOutlined/>}/>&nbsp;&nbsp;&nbsp;
                            <DownOutlined/>
                        </a>
                    </Dropdown>
                </Space>

            </div>
        </Header>
    )
}

export default withRouter(TopHeader)

