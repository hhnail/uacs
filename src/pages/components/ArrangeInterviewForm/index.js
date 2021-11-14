import {Cascader, DatePicker, Form, Input} from 'antd';
import {INTERVIEW_ADDRESS_CASCADER_OPTIONS} from "../../../constants/baseInfo";
import {forwardRef, useEffect, useState} from "react";
import axios from "axios";
import {getInterviewAddress} from "../../../services/treeService";
import {useHistory} from "react-router-dom";

const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 20,
    },
};

const ArrangeInterviewForm = forwardRef((props, ref) => {


    // hooks
    const histroy = useHistory()
    const [arrangeInterviewForm] = Form.useForm()
    const [interviewAddress, setInterviewAddress] = useState([])

    // constans

    // life
    useEffect(() => {
        getInterviewAddress()
            .then(res => {
                const {data} = res.data
                setInterviewAddress(data)
            })
    }, [])

    return (
        <>
            <div style={{
                height: 350,
            }}>
                <Form {...layout} form={arrangeInterviewForm} name="arrangeInterviewModal" ref={ref}>
                    <Form.Item name='interviewTime' label="面试时间"
                               rules={[{required: true, message: '请选择面试时间'}]}
                    >
                        <DatePicker/>
                    </Form.Item>
                    <Form.Item name='interviewAddress' label="面试地点"
                               rules={[{required: true, message: '请选择面试地点'}]}
                               initialValue={['集大本部', '美岭楼', '美岭201']}
                    >
                        {
                            interviewAddress.length > 0
                            && <Cascader options={interviewAddress}/>
                        }
                    </Form.Item>
                    <Form.Item name='intentionDepartment' label="意向部门" initialValue={props.application.intentionDepartment}>
                        <Input disabled={true}/>
                    </Form.Item>
                    <Form.Item name='contacterName' label="联系人"
                               rules={[{required: true, message: '请选择联系人'}]}>
                        <Input disabled={!props.canEdit}/>
                    </Form.Item>
                    <Form.Item name='contacterPhone' label="联系方式">
                        <Input disabled={!props.canEdit}/>
                    </Form.Item>
                    <Form.Item name='description' label="备注">
                        <Input.TextArea disabled={!props.canEdit}/>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
})

export default ArrangeInterviewForm