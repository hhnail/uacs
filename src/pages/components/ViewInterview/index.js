import {Cascader, DatePicker, Form, Input, TimePicker} from 'antd';
import {forwardRef, useEffect} from "react";
import moment from 'moment';

const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 20,
    },
};

const ViewInterview = forwardRef((props) => {

    const [interviewDate, interviewTime] = props.application.interviewTime.split(' ')

    return (
        <>
            <div style={{height: 420,}}>
                <Form {...layout} name="arrangeInterviewModal">
                    <Form.Item name='interviewDate' label="面试日期" initialValue={moment(interviewDate, 'YYYY-MM-DD')}>
                        <DatePicker disabled/>
                    </Form.Item>
                    <Form.Item name='interviewTime' label="面试时间" initialValue={moment(interviewTime, 'HH:mm:ss')}>
                        <TimePicker disabled/>
                    </Form.Item>
                    <Form.Item name='interviewAddress' label="面试地点"
                               initialValue={props.application.interviewAddress?.split('-')}>
                        <Cascader disabled/>
                    </Form.Item>
                    <Form.Item name='intentionDepartment' label="意向部门" initialValue={props.application?.departmentName}>
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item name='contacterName' label="联系人" initialValue={props.application?.contacterName}>
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item name='contacterPhone' label="联系方式" initialValue={props.application?.contacterPhone}>
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item name='description' label="备注" initialValue={props.application?.description}>
                        <Input.TextArea disabled/>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
})

export default ViewInterview