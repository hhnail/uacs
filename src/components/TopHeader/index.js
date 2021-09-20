import React, {useState} from 'react'
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

const {Header} = Layout;

function TopHeader(props) {

// 菜单数据
    const menu = (
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

    const [collapsed, setCollapsed] = useState(false)

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
                欢迎 admin 回来~
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

