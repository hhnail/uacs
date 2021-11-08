import {Cascader, DatePicker, Form, Input} from 'antd';
import {INTERVIEW_ADDRESS_CASCADER_OPTIONS} from "../../../constants/baseInfo";

const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 20,
    },
};

export default function ArrangeInterviewModal(porps) {

    return (
        <>
            <div style={{
                height: 350,
            }}>
                <Form {...layout} name="arrangeInterviewModal">
                    <Form.Item name='interviewTime' label="面试时间"
                               rules={[{required: 'email', message: '请选择面试时间'},]}
                    >
                        <DatePicker/>
                    </Form.Item>
                    <Form.Item name='interviewAddress' label="面试地点"
                               rules={[{required: true, message: '请选择面试地点'},]}
                    >
                        <Cascader
                            defaultValue={['集大本部', '美岭楼', '美岭201']}
                            options={INTERVIEW_ADDRESS_CASCADER_OPTIONS}
                        />
                    </Form.Item>
                    <Form.Item name='intentionDepartment' label="意向部门">
                        <Input defaultValue='策划部' disabled={true}/>
                    </Form.Item>
                    <Form.Item name='intentionDepartment' label="联系人">
                        <Input disabled={!porps.canEdit}/>
                    </Form.Item>
                    <Form.Item name='intentionDepartment' label="联系方式">
                        <Input disabled={!porps.canEdit}/>
                    </Form.Item>
                    <Form.Item name='description' label="备注">
                        <Input.TextArea disabled={!porps.canEdit}/>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}