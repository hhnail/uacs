import React, {useState} from 'react'
import {
    Menu,
    Layout,
    Form,
    Button,
    Radio,
    Select,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
    Input,
    Cascader,
} from 'antd';

import {
    UnlockOutlined,
    UserOutlined,
} from '@ant-design/icons';

import axios from "axios";
import qs from 'qs'

import Particles from 'react-particles-js';

import './index.css'

const {Header, Content, Footer} = Layout;

export default function Login() {

    const onFinish = (values) => {
        console.log("==1 values", values)

        // 同步后端
        axios({
            url: "/user/login",
            method: 'post',
            data: qs.stringify(values),
            // data: `${...values}`,
            // 以json格式提交
            // headers: { 'Content-Type': 'application/json;charset=UTF-8' }
            // 以表单方式提交
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="loginBackGround">
            {/*粒子效果*/}
            <Particles
                // 粒子效果高度为当前元素高度
                height={document.documentElement.clientHeight}
                // 粒子效果参数
                params={
                    {
                        "background": {
                            "color": {
                                "value": "navajowhite"
                            },
                            "image": "url('/images/rainbow_cat.gif')",
                            "position": "0 15%",
                            "repeat": "no-repeat",
                            "size": "60%"
                        },
                        "fullScreen": {
                            "enable": true,
                            "zIndex": 1
                        },
                        "interactivity": {
                            "events": {
                                "onClick": {
                                    "enable": true,
                                    "mode": "repulse"
                                },
                                "onHover": {
                                    "mode": "grab"
                                }
                            },
                            "modes": {
                                "bubble": {
                                    "distance": 400,
                                    "duration": 2,
                                    "opacity": 8,
                                    "size": 40
                                },
                                "grab": {
                                    "distance": 200
                                }
                            }
                        },
                        "particles": {
                            "color": {
                                "value": "#ffffff"
                            },
                            "links": {
                                "color": {
                                    "value": "#ffffff"
                                },
                                "distance": 150,
                                "opacity": 0.4
                            },
                            "move": {
                                "attract": {
                                    "rotate": {
                                        "x": 600,
                                        "y": 1200
                                    }
                                },
                                "direction": "left",
                                "enable": true,
                                "outModes": {
                                    "bottom": "out",
                                    "left": "out",
                                    "right": "out",
                                    "top": "out"
                                },
                                "speed": 6,
                                "straight": true
                            },
                            "opacity": {
                                "value": 0.5,
                                "animation": {
                                    "speed": 1,
                                    "minimumValue": 0.1
                                }
                            },
                            "shape": {
                                "options": {
                                    "star": {
                                        "sides": 5
                                    }
                                },
                                "type": "star"
                            },
                            "size": {
                                "random": {
                                    "enable": true
                                },
                                "value": {
                                    "min": 1,
                                    "max": 4
                                },
                                "animation": {
                                    "speed": 40,
                                    "minimumValue": 0.1
                                }
                            }
                        }
                    }
                }
            />
            <div className="userFormContainer">
                <div className="loginTitle">UACS社团管理-橘集</div>
                <Form labelCol={{span: 4,}}
                      onFinish={onFinish}
                >
                    <Form.Item name="userId">
                        <Input placeholder="请输入学号/职工号" id="userId" prefix={<UserOutlined/>}/>
                    </Form.Item>
                    <Form.Item name="password">
                        <Input placeholder="请输入密码" id="password" prefix={<UnlockOutlined/>}/>
                    </Form.Item>
                    <Form.Item style={{paddingLeft: '50%',}}>
                        <Button type={"primary"} htmlType={"submit"}>登录</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}