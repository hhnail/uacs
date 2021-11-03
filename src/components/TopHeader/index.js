import React, {useEffect} from 'react'
import {Layout, message} from 'antd';
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons'

import {useHistory, withRouter} from 'react-router-dom'
import {connect} from "react-redux";
import {REDUXSTATE} from "../../constants/redux";
import UserSettings from '../UserSettings/index'
import {getUserInfo} from "../../services/userService";

const {Header} = Layout;


function TopHeader(props) {

    const history = useHistory()
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    // 通过token换取用户信息
    useEffect(() => {
        getUserInfo(userInfo.accessToken).then(res => {
            const {data} = res.data
            if (!data) {
                message.error("会话超时，请重新登录！")
                setTimeout(() => {
                    history.push("/login")
                }, 1500)
            }
        })
    }, [userInfo])

    // TODO 为什么改变折叠状态，也会发请求？？？？？？
    const changeFoldState = () => {
        props.changeCollapsed()
    }

    return (
        <Header style={{background: "white", padding: "0px 12px"}}>
            {/* ========== 折叠栏 ==========*/}
            {props.isCollapsed ?
                <MenuUnfoldOutlined onClick={changeFoldState}/>
                : <MenuFoldOutlined onClick={changeFoldState}/>}
            <UserSettings history={history}/>
        </Header>
    )
}


{/*   =============================   redux   =============================   */
}
const mapState2Props = ({CollapseReducer: {isCollapsed}}) => {
    return {
        isCollapsed
    }
}

const mapDispatch2Props = {
    changeCollapsed() {
        return {
            type: REDUXSTATE.CHANGE_COLLAPSED.type,
        }
    }
}

export default connect(mapState2Props, mapDispatch2Props)(withRouter(TopHeader))

