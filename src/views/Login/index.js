import React, {useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {Button, Form, Input, Layout, message,} from 'antd';

import {UnlockOutlined, UserOutlined,} from '@ant-design/icons';

import axios from "axios";
import qs from 'qs'

import Particles from 'react-particles-js';

import './index.css'

const {Header, Content, Footer} = Layout;

export default function Login(props) {

    const history = useHistory()
    let timer

    useEffect(() => {
        clearTimeout(timer)
    }, [timer])

    const onFinish = (values) => {
        localStorage.removeItem("token") // 将原有的token移除
        localStorage.removeItem("userInfo") // 将原有的userInfo移除
        axios({// 验证后台数据
            url: "/user/login",
            method: 'post',
            data: qs.stringify(values),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(res => {
            const userInfo = res.data.data
            if (!userInfo) {
                message.error("用户名或密码输入错误！") // 验证失败，提示用户
            }
            // 如果data非空,说明验证成功
            localStorage.setItem("token", res.data.data.accessToken) // 将token保存到浏览器中
            localStorage.setItem("userInfo", JSON.stringify(res.data.data)) // 将userLoginInfo保存到浏览器中
            message.success("登录成功，跳转中...")
            timer = setTimeout(() => {
                history.push("/") // 跳转到主页面
            }, 1500)
        }).catch(err => {
            console.log(err)
            message.error("系统出现错误，请稍后重试！")
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
                        <Input.Password placeholder="请输入密码" id="password" prefix={<UnlockOutlined/>}/>
                    </Form.Item>
                    <Form.Item style={{paddingLeft: '50%',}}>
                        <Button type={"primary"} htmlType={"submit"}>登录</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}