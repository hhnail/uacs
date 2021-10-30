import {useEffect, useRef, useState} from "react";
import {Button, Form, Input, message, notification, PageHeader, Select, Steps} from 'antd'
import axios from "axios";
import qs from 'querystring'

import AssociationEditor from '../../../../components/AssociationEditor'
import style from './index.css'

const {Step} = Steps;
const {TextArea} = Input
const {Option} = Select;

// 点击“仅保存“或”提交审核“的key和btn
const key = `open${Date.now()}`;
const btn = (
    <Button type="primary" size="small" onClick={() => notification.close(key)}>
        我知道了
    </Button>
);


export default function AddShare(props) {

    // 可选项、用户信息展示
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    const [associationList, setAssociationList] = useState([])

    // 交互逻辑
    const [currentStep, setCurrentStep] = useState(0) // 撰写纳新展示信息 步骤 位置

    // 信息收集
    const baseInfoFormRef = useRef()
    const [content4Show, setContent4Show] = useState()
    const [baseInfoForm, setBaseInfoForm] = useState()

    // const shareFormRef = Form.useForm


    // 获取本用户管理的社团（才能撰写纳新信息/通知/展示）
    useEffect(() => {
        const data = {
            userId: userInfo.userId,
            roleIds: [2],
        }
        axios.post('/association/getAssociationByUserId',
            qs.stringify(data))
            .then(res => {
                const associationList = res.data.data
                setAssociationList(associationList)
            })
    }, [])

    const toPrevious = () => {
        setCurrentStep(currentStep - 1)
    }

    const toNext = () => {
        // 校验第一步：基本信息
        if (currentStep === 0) {
            baseInfoFormRef.current.validateFields().then(res => {
                setBaseInfoForm(res)
                setCurrentStep(currentStep + 1)
            })
        } else {
            if (!content4Show || content4Show === "" || content4Show.trim() === "<p></p>") {
                message.error("社团经历分享内容不得为空！")
                return
            }
            setCurrentStep(currentStep + 1)
        }
    }

    const handleCommit = (state) => {
        const postData = {
            userId: userInfo.userId, // 申请人ID
            ...baseInfoForm, // 基本信息
            shareContent: content4Show, // 展示的信息
            state: state, // 默认初始状态为未审核
        }
        console.log(postData)
        axios({
            url: '/bulletin/addShare',
            method: 'post',
            data: postData,
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).then(() => {
            notification.open({
                message: state === 'UNEXAMINE' ? '保存成功' : '审核提交成功',
                description: `您可以到 纳新信息列表 查看${state === 'UNEXAMINE' ? '保存' : '审核'}结果`,
                btn,
                key,
            });
        })
    }

    return (
        <div>
            <PageHeader title="发布社团经历分享" subTitle="与同学们分享你精彩的社团经历吧~"/>
            <Steps current={currentStep}>
                <Step title="基本信息" description="纳新人数，起始时间等"/>
                <Step title="展示内容" subTitle="二级标题" description="纳新通知的信息内容等"/>
                <Step title="保存/提交" description="仅保存或提交等待审核"/>
            </Steps>
            {/*内容组*/}
            <div className={style.contentGroup} style={{marginTop: '50px',}}>
                {/*step1 基本信息 =====================================*/}
                <div style={currentStep === 0 ? {} : {display: 'none',}}>
                    <Form
                        // form={shareFormRef}
                        name="basic"
                        labelCol={{span: 4,}}
                        wrapperCol={{span: 20,}}
                        ref={baseInfoFormRef}
                    >
                        <Form.Item
                            label="分享标题"
                            name="title"
                            rules={
                                [{required: true, message: '请输入分享标题',}]
                            }
                        >
                            <Input type="text"/>
                        </Form.Item>
                        <Form.Item label="想要分享的社团" name="associationId">
                            {<Select style={{width: 240}}>
                                {associationList.map(association => {
                                    return<Option key={association.associationId}
                                                  value={association.associationId}
                                    >{association.associationName}</Option>
                                })}
                            </Select>}
                        </Form.Item>
                        <Form.Item label="备注" name="description">
                            <TextArea rows={4} placeholder={"若需求请填写备注信息"}/>
                        </Form.Item>
                    </Form>
                </div>


                {/* ===================================== step2 社团纳新展示信息 ===================================== */
                }
                <div style={currentStep === 1 ? {} : {display: 'none',}}>
                    <AssociationEditor
                        // 子传父 获取 富文本编辑器内容
                        getContent={(value) => {
                            console.log(value)
                            setContent4Show(value)
                        }}/>
                </div>

                {/* ============================== step3 保存或提交审核 =====================================*/
                }
                <div style={currentStep === 2 ? {} : {display: 'none',}}></div>
            </div>

            {/* =============== 按钮组 ===============*/}
            <div style={{marginTop: '50px',}}>
                {
                    currentStep > 0 && <Button
                        type="ghost"
                        onClick={toPrevious}
                    >上一步</Button>
                }
                {
                    currentStep < 2 && <Button
                        type="primary"
                        onClick={toNext}
                    >下一步</Button>
                }

                {/*============================== 最后一步 保存或提交 ================*/}
                {
                    currentStep === 2 && <div style={{
                        position: 'fixed',
                        bottom: '10%',
                        right: '10%',
                    }}>
                        <Button
                            type="primary"
                            onClick={() => handleCommit("UNEXAMINE")}
                        >
                            仅保存
                        </Button>
                        <Button danger={true}
                                onClick={() => handleCommit("EXAMINING")}
                        >
                            提交审核
                        </Button>
                    </div>
                }
            </div>
        </div>
    )
}