import {useState, useRef} from "react";
import {
    Button,
    PageHeader,
    Steps,
    Form,
    Input,
    Checkbox,
    InputNumber,
    Space,
    DatePicker,
} from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN';

import moment from 'moment'

import AssociationEditor from '../../../components/AssociationEditor'
import style from './index.css'


const {Step} = Steps;

const {RangePicker} = DatePicker;

const {TextArea} = Input

export default function AddRecruitment() {

    const [currentStep, setCurrentStep] = useState(0) // 撰写纳新展示信息 步骤 位置

    const [value, setValue] = useState('30');// 社团纳新人数

    const baseInfoForm = useRef(null)

    const toPrevious = () => {
        setCurrentStep(currentStep - 1)
    }

    const toNext = () => {
        // 校验第一步：基本信息
        if (currentStep === 0) {
            baseInfoForm.current.validateFields().then(res => {
                console.log(res)
                setCurrentStep(currentStep + 1)
            }).catch(err => {
                console.log(err)
            })
        } else {
            setCurrentStep(currentStep + 1)
        }
    }


    const onChange = (dates, dateStrings) => {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
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
                        ref={baseInfoForm}
                    >
                        <Form.Item
                            label="纳新标题"
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入纳新标题',
                                },
                            ]}
                        >
                            <Input type="text"/>
                        </Form.Item>
                        <Form.Item label="纳新人数" name="num">
                            <Space>
                                <InputNumber min={1} max={30} value={value} onChange={setValue}/>
                                <Button
                                    type="ghost"
                                    onClick={() => {
                                        setValue(30);
                                    }}
                                >重置</Button>
                            </Space>
                        </Form.Item>
                        <Form.Item label="纳新起始时间" name="timeRange">
                            <Space direction="vertical" size={12}>
                                <RangePicker
                                    locale={locale}
                                    ranges={{
                                        '今天': [moment(), moment()],
                                        '本月': [moment().startOf('month'), moment().endOf('month')],
                                    }}
                                    onChange={onChange}
                                />
                            </Space>
                        </Form.Item>
                        <Form.Item label="备注"name="message">
                            <TextArea rows={4} placeholder={"若需求请填写备注信息"}/>
                        </Form.Item>
                    </Form>
                </div>



                {/* step2 社团纳新展示信息 =====================================*/}
                <div style={currentStep === 1 ? {} : {display: 'none',}}>
                    <AssociationEditor/>
                    <br/>
                    <input type="text"/>
                </div>



                {/*step3 保存或提交审核 =====================================*/}
                <div style={currentStep === 2 ? {} : {display: 'none',}}>
                    3333333333333333
                    <br/>
                    <input type="text"/>
                </div>
            </div>

            {/*按钮组*/}
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
                        <Button type="primary">仅保存</Button>
                        <Button danger={true}>提交审核</Button>
                    </span>
                }
            </div>
        </div>
    )
}