import React, {useEffect, useState} from 'react'
import {Avatar, Col, Dropdown, Form, Input, Layout, Menu, message, Modal, Row, Space, Switch} from 'antd';
import Icon, {
    DownOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    UserSwitchOutlined
} from '@ant-design/icons'

import {useHistory, withRouter} from 'react-router-dom'
import {connect} from "react-redux";
import {REDUXSTATE} from "../../constants/redux";
import {getUserInfo, updateUserSettings} from "../../services/db";
import {ReactComponent as LogoutIcon} from "../../icons/logout.svg";
import {ReactComponent as UserSettingsIcon} from "../../icons/user-settings.svg";

const {Header} = Layout;


function TopHeader(props) {

    const history = useHistory()

    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    // 个人设置
    const [userForm] = Form.useForm()
    const [settingsModalVisible, setSettingsModalVisible] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [passwordReseting, setPasswordReseting] = useState(false)

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


    const menu = ( // 顶部菜单结构
        <Menu>
            {/* ====== 个人设置 ====== */}
            <Menu.Item key={0} onClick={() => {
                console.log(userInfo)
                userForm.setFieldsValue({
                    name: userInfo.name,
                    userId: userInfo.userId,
                    phone: userInfo.phone,
                    email: userInfo.email,
                })
                setSettingsModalVisible(true)
            }}>
                <Icon component={UserSettingsIcon}/> 个人设置
            </Menu.Item>
            {/* ====== 注销系统 ====== */}
            <Menu.Item key={1} danger onClick={() => {
                localStorage.removeItem("token") // 去除浏览器中的token
                localStorage.removeItem("userInfo") // 去除浏览器中的userInfo
                message.success("注销成功！")
                setTimeout(() => {
                    history.replace("/login") // 重定向到登录界面
                }, 500)
            }}>
                <Icon component={LogoutIcon}/> 退出系统
            </Menu.Item>
        </Menu>
    );

    // TODO 为什么改变折叠状态，也会发请求？？？？？？
    const changeFoldState = () => {
        props.changeCollapsed()
    }

    const cleanPasswordForm = () => {
        userForm.setFieldsValue({
            password: '',
            newPassword: '',
            confirmPassword: '',
        })
    }

    const handleOk = () => {
        setConfirmLoading(true);
        userForm.validateFields()
            .then(() => {
                updateUserSettings(userForm.getFieldsValue())
                    .then((res) => {
                        message.success("更新成功！")
                        setSettingsModalVisible(false)
                        setConfirmLoading(false)
                        setPasswordReseting(false)
                        // 更新成功，清空密码部分表单信息
                        cleanPasswordForm()
                    })
                    .catch(() => { // 异步更新用户信息失败
                        setConfirmLoading(false)
                    })
            })
            .catch(() => { // 表单校验失败
                setConfirmLoading(false)
            })
    };

    const handleCancel = () => {
        setSettingsModalVisible(false)
        setPasswordReseting(false)
        cleanPasswordForm()
    };


    return (
        <Header className="site-layout-background" style={{background: "white", padding: "0px 12px"}}>
            {/* ========== 折叠侧边栏 ==========*/}
            {props.isCollapsed ?
                <MenuUnfoldOutlined onClick={changeFoldState}/>
                : <MenuFoldOutlined onClick={changeFoldState}/>}
            <div style={{float: "right"}}>
                <Space size={"middle"}>
                    <UserSwitchOutlined/>
                    {/* ========== 切换使用者身份开关 ========== */}
                    <Switch
                        checkedChildren="使用中.."
                        unCheckedChildren="管理中.."
                        defaultChecked={false}
                        onClick={() => {
                            props.history.replace("/user") // 重定向到用户界面
                        }}
                    />
                    {/* ========== 欢迎信息 ========== */}
                    {userInfo &&
                    <div>您好 <span style={{color: 'orange'}}>{userInfo.name}</span></div>
                    }
                    {/* ========== 下拉菜单 ========== */}
                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            <Avatar size={28} icon={<UserOutlined/>}/>&nbsp;&nbsp;&nbsp;
                            <DownOutlined/>
                        </a>
                    </Dropdown>
                </Space>
                {/*   =============================   个人设置模态框   =============================   */}
                <Modal visible={settingsModalVisible} title="账号设置" width={680}
                       confirmLoading={confirmLoading}
                       onOk={handleOk}
                       onCancel={handleCancel}
                >
                    <Form form={userForm}
                          name="settings"
                          layout={"horizontal"}
                          labelCol={{span: 8,}}
                          wrapperCol={{span: 16,}}
                    >
                        <Row>
                            <Col span={10}>
                                <Form.Item label="名字" name="name"
                                           rules={[{required: true, message: '该项不得为空！'}]}
                                ><Input allowClear/></Form.Item>
                            </Col>
                            <Col span={10} push={2}>
                                <Form.Item label="学号" name="userId"
                                           rules={[{required: true, message: '该项不得为空！'}]}>
                                    <Input disabled={true}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={10}>
                                <Form.Item label="手机号" name="phone"
                                           rules={[{
                                               pattern: /^((\+)?86|((\+)?86)?)0?1[3458]\d{9}$/,
                                               message: '手机号格式错误'
                                           }]}
                                ><Input allowClear/></Form.Item>
                            </Col>
                            <Col span={10} push={2}>
                                <Form.Item label="邮箱" name="email"><Input allowClear/></Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={10}>
                                <Form.Item label="原密码" name="password"
                                           rules={[{required: true, message: '该项不得为空！'}]}
                                ><Input.Password/></Form.Item>
                            </Col>
                            {/*重置密码开关*/}
                            <Col span={10} push={2}>
                                <div style={{
                                    display: 'flex',
                                    marginTop: 5
                                }}>
                                    <div style={{marginLeft: 18}}>修改密码？</div>
                                    <div style={{marginLeft: 8}}>
                                        <Switch checked={passwordReseting} onChange={() => {
                                            setPasswordReseting(!passwordReseting)
                                        }}/>
                                    </div>
                                </div>

                            </Col>
                        </Row>
                        <div style={passwordReseting ? {} : {display: 'none'}}>
                            <Row>
                                <Col span={10}>
                                    <Form.Item label="新密码" name="newPassword"
                                               rules={passwordReseting
                                                   ? [
                                                       {required: true, message: '该项不得为空！'},
                                                       {
                                                           pattern: /^[a-zA-Z]\\w{5,17}\$/,
                                                           message: '密码必须为字母开头、长度[6,18]、仅含字母、数字和下划线的字符'
                                                       }
                                                   ]
                                                   : []}
                                    ><Input.Password/></Form.Item>
                                </Col>
                                <Col span={10} push={2}>
                                    <Form.Item label="确认密码" name="confirmPassword"
                                               rules={passwordReseting
                                                   ? [
                                                       {required: true, message: '该项不得为空！'},
                                                       ({getFieldValue}) => ({
                                                           validator(_, value) {
                                                               if (!value || getFieldValue('newPassword') === value) {
                                                                   return Promise.resolve();
                                                               }
                                                               return Promise.reject(new Error('两次输入密码必须保持一致！'));
                                                           },
                                                       }),
                                                   ]
                                                   : []}
                                    ><Input.Password/></Form.Item>
                                </Col>
                            </Row>
                        </div>
                    </Form>
                </Modal>
            </div>
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

