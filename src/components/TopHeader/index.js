import React, {useEffect, useState} from 'react'
import {
    Avatar, Dropdown, Layout, Menu,
    Space, Switch, message
} from 'antd';
import {
    CloseOutlined, DownOutlined, MenuFoldOutlined,
    MenuUnfoldOutlined, UserOutlined, UserSwitchOutlined
} from '@ant-design/icons'

import {useHistory, withRouter} from 'react-router-dom'
import axios from "axios";
import qs from 'querystring'
import {connect} from "react-redux";
import {CollapseReducer} from "../../redux/reducers/CollapseReducer";
import {REDUXSTATE} from "../../constants/redux";

const {Header} = Layout;

function TopHeader(props) {

    const history = useHistory()

    const userInfo = JSON.parse(localStorage.getItem("userInfo"))

    // 通过token换取用户信息
    useEffect(() => {

        axios({
            url: "/user/getUserInfo",
            method: 'post',
            data: qs.stringify({accessToken: userInfo.accessToken}),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
            .then(res => {
                const {data} = res.data
                if (!data) {
                    message.error("会话超时，请重新登录！")
                    setTimeout(() => {
                        history.push("/login")
                    }, 1500)
                }
            })
            .catch(err => {
                console.log("==TopHeader 获取用户信息出错！", err);
                message.error("系统出现错误，请稍后重试！")
            })
    }, [userInfo])


    const menu = ( // 顶部菜单结构
        <Menu>
            <Menu.Item key={0} danger onClick={() => {
                localStorage.removeItem("token") // 去除浏览器中的token
                localStorage.removeItem("userInfo") // 去除浏览器中的userInfo
                message.success("注销成功！")
                setTimeout(() => {
                    history.replace("/login") // 重定向到登录界面
                }, 500)

            }}>
                退出系统<CloseOutlined/>
            </Menu.Item>
        </Menu>
    );


    // TODO 为什么改变折叠状态，也会发请求？？？？？？
    const changeFoldState = () => {
        props.changeCollapsed()
    }


    return (
        <Header className="site-layout-background" style={{background: "white", padding: "0px 12px"}}>
            {props.isCollapsed ?
                <MenuUnfoldOutlined onClick={changeFoldState}/>
                : <MenuFoldOutlined onClick={changeFoldState}/>}
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
                    {userInfo &&
                    <div>您好 <span style={{color: 'orange'}}>{userInfo.name}</span></div>
                    }
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

const mapState2Props = ({CollapseReducer: {isCollapsed}}) => {
    return {
        isCollapsed
    }
}

const mapDispatch2Props = {
    changeCollapsed(){
        return {
            type:REDUXSTATE.CHANGE_COLLAPSED.type,
        }
    }
}

export default connect(mapState2Props, mapDispatch2Props)(withRouter(TopHeader))

