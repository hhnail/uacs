import {useState, useRef, useEffect} from "react";
import {
    Button, PageHeader, Steps, Form, Input, Checkbox,
    InputNumber, Space, DatePicker, message, notification, Select
} from 'antd'

import locale from 'antd/es/date-picker/locale/zh_CN';
import axios from "axios";
import qs from 'querystring'

import moment from 'moment'

import AssociationEditor from '../../../components/AssociationEditor'
import style from './index.css'


const {Step} = Steps;

const {RangePicker} = DatePicker;

const {TextArea} = Input

const {Option} = Select;

// 点击“仅保存“或”提交审核“的key和btn
const key = `open${Date.now()}`;
const btn = (
    <Button type="primary" size="small" onClick={() => notification.close(key)}>
        我知道了
    </Button>
);

export default function AddRecruitment(props) {

    // 展示
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    const [associationList, setAssociationList] = useState([])

    // 交互逻辑
    const [currentStep, setCurrentStep] = useState(0) // 撰写纳新展示信息 步骤 位置
    const baseInfoFormRef = useRef(null)

    // step1 : baseInfo
    const [newAssociation, setNewAssociation] = useState(0) // 纳新的社团组织
    const [newNum, setNewNum] = useState(30);// 社团纳新人数
    const [newStartTime, setNewStartTime] = useState("") //纳新开始时间
    const [newEndTime, setNewEndTime] = useState("") //纳新结束时间
    const [baseInfoForm, setBaseInfoForm] = useState({})
    // step2 : content for show
    const [content4Show, setContent4Show] = useState("")


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
                // console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const toPrevious = () => {
        setCurrentStep(currentStep - 1)
    }

    const toNext = () => {
        // 校验第一步：基本信息
        if (currentStep === 0) {
            baseInfoFormRef.current.validateFields().then(res => {
                console.log("==1 AddRecrutment 校验结果：", res)
                setBaseInfoForm(res)
                setCurrentStep(currentStep + 1)
            }).catch(err => {
                console.log(err)
            })
        } else {
            if (content4Show === "" || content4Show.trim() === "<p></p>") {
                message.error("社团纳新展示内容不得为空")
                return
            }
            console.log("收集的信息：", baseInfoForm, content4Show)
            setCurrentStep(currentStep + 1)
        }
    }


    const onChange = (dates, dateStrings) => {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
        setNewStartTime(dateStrings[0])
        setNewEndTime(dateStrings[1])
    }

    const handleCommit = (state) => {
        const postData = {
            userId: userInfo.userId, // 申请人ID
            ...baseInfoForm, // 基本信息
            newNum: newNum, // 纳新人数
            content: content4Show, // 展示的信息
            state: state, // 默认初始状态为未审核
            startTime: newStartTime,
            endTime: newEndTime,
        }

        axios({
            url: '/association/addRecruitment',
            method: 'post',
            data: postData,
            headers: { 'Content-Type': 'application/json;charset=UTF-8' }
        }).then(res => {
            console.log("==27 res", res);
            // props.history.push('/') // TODO 提交后是否需要跳转页面？
            notification.open({
                message: state === 'UNEXAMINE' ? '保存成功' : '审核提交成功',
                description: `您可以到 纳新信息列表 查看${state === 'UNEXAMINE' ? '保存' : '审核'}结果`,
                btn,
                key,
            });
        }).catch(err => {
            console.log("==26 err", err);
            notification.open({
                message: state === 'UNEXAMINE' ? '保存成功' : '审核提交成功',
                description: `您可以到 纳新信息列表 查看${state === 'UNEXAMINE' ? '保存' : '审核'}结果`,
                btn,
                key,
            });
        })


    }

    const handleOptionChange = (value) => {
        console.log(`selected ${value}`);
    }

    const renderAssociationListToSelectOptions = () => {
        let options = []
        associationList.forEach(association => {
            options.push(<Option
                key={association.associationId}
                value={association.associationId}>
                {association.associationName}
            </Option>)
        })
        return (
            <Select
                // defaultOpen={true} // 是否默认展开
                defaultActiveFirstOption={true} // 首项高亮
                style={{width: 240}}
                onChange={handleOptionChange}>
                {options}
            </Select>
        )
    }

    return (
        <div>
            <PageHeader className="site-page-header" title="撰写纳新展示" subTitle="发挥你的文笔，吸引同学们的加入吧~"/>
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
                        name="basic"
                        labelCol={{span: 4,}}
                        wrapperCol={{span: 20,}}
                        ref={baseInfoFormRef}
                    >
                        <Form.Item
                            label="纳新标题"
                            name="title"
                            rules={
                                [
                                    {
                                        required: true,
                                        message: '请输入纳新标题',
                                    },
                                ]
                            }
                        >
                            <Input type="text"/>
                        </Form.Item>
                        {/* name相同的话，他们受控行为就相同 */}
                        <Form.Item label="纳新社团" name="associationId">
                            {renderAssociationListToSelectOptions()}
                        </Form.Item>
                        <Form.Item label="纳新人数">
                            <Space>
                                <InputNumber
                                    min={1}
                                    max={30}
                                    value={newNum}
                                    onChange={setNewNum}/>
                                <Button
                                    type="ghost"
                                    onClick={() => {
                                        setNewNum(30);
                                    }}
                                >重置</Button>
                            </Space>
                        </Form.Item>
                        <Form.Item label="纳新起始时间">
                            <Space direction="vertical" size={12}>
                                <RangePicker
                                    locale={locale} // 采用本地语言 即中文
                                    // 不同选项快捷时间范围
                                    ranges={{
                                        '今天': [moment(), moment()],
                                        '本月': [moment().startOf('month'), moment().endOf('month')],
                                    }}
                                    onChange={onChange}
                                />
                            </Space>
                        </Form.Item>
                        <Form.Item label="备注" name="description">
                            <TextArea rows={4} placeholder={"若需求请填写备注信息"}/>
                        </Form.Item>
                    </Form>
                </div>


                {/* step2 社团纳新展示信息 =====================================*/
                }
                <div style={currentStep === 1 ? {} : {display: 'none',}}>
                    <AssociationEditor
                        // 子传父 获取 富文本编辑器内容
                        getContent={(value) => {
                            console.log(value)
                            setContent4Show(value)
                        }}/>
                </div>


                {/*step3 保存或提交审核 =====================================*/
                }
                <div style={currentStep === 2 ? {} : {display: 'none',}}>
                </div>
            </div>

            {/*按钮组*/
            }
            <div style={{
                marginTop: '50px',
                // padding:'10px',
                // border:'10px',
                // paddingRight:'10px',
                // paddingLeft:'10px',
            }}>
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

                {/*最后一步 保存或提交 ================*/}
                {
                    currentStep === 2 && <span>
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
                    </span>
                }
            </div>
        </div>
    )
}