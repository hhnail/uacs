import React, {Component, useState} from 'react'
import {
    Descriptions,
    Badge,
    Cascader,
    DatePicker,
    Input, Form, Select, Switch, Radio
} from 'antd';

const {TextArea} = Input;

//模拟数据
const options = [
    {
        value: '工商管理学院',
        label: '工商管理学院',
        children: [
            {
                value: '电子商务',
                label: '电子商务',
                children: [
                    {
                        value: '商务1811',
                        label: '商务1811',
                    },
                    {
                        value: '商务1812',
                        label: '商务1812',
                    }
                ],
            },
        ],
    },
    {
        value: '计算机学院',
        label: '计算机学院',
        children: [
            {
                value: '软件工程',
                label: '软件工程',
                children: [
                    {
                        value: '软工1812',
                        label: '软工1812',
                    },
                ],
            },
        ],
    },
];

// const [formSize, setFormSize] = useState('default');
//
// const onFormLayoutChange = ({size}) => {
//     setFormSize(size);
// };


export default class UserInfo extends Component {
    // 可以参考一下 用户信息的展示
// <Form
// labelCol={{span: 4,}}
// wrapperCol={{span: 14,}}
// onFinish={onFinish}
    // size={formSize}
    // onValuesChange={onFormLayoutChange}
// >
// <Form.Item label="表单尺寸调整" name="size">
// <Radio.Group>
// <Radio.Button value="small">小</Radio.Button>
// <Radio.Button value="default">默认</Radio.Button>
// <Radio.Button value="large">大</Radio.Button>
// </Radio.Group>
// </Form.Item>
// <Form.Item label="手机" name="phone">
// <Input/>
// </Form.Item>
// <Form.Item label="性别" name="gender">
//         <Select>
//         <Select.Option value="M">男生</Select.Option>
// <Select.Option value="F">女生</Select.Option>
// <Select.Option value="U">保密</Select.Option>
// </Select>
// </Form.Item>
// <Form.Item label="专业班级" name="className">
// <Cascader
// options={[
// {
// value: 'gongshang',
// label: '工商管理学院',
// children: [
// {
// value: 'dianzishangwu',
// label: '电子商务',
// children: [
// {
// value: 'sw1811',
// label: '商务1811',
// },
// ],
// },
// ],
// },
// ]}
// />
// </Form.Item>
// <Form.Item label="生日" name="birthday">
// <DatePicker/>
// </Form.Item>
// <Form.Item label="隐藏个人信息" valuePropName="checked" name="isHidden">
// <Switch/>
// </Form.Item>

    onChange(value) {
        console.log(value);
    }

    dateChange(value) {
        console.log(value);
    }

    render() {
        return (
            <div>
                <Descriptions title="" bordered={true} column={2}>
                    <Descriptions.Item label="姓名">
                        <Input placeholder="请填写兴趣姓名"/>
                        {/* <TextArea rows={1} /> */}
                    </Descriptions.Item>
                    <Descriptions.Item label="性别">
                        <Input placeholder="请填写兴趣性别"/>
                    </Descriptions.Item>
                    <Descriptions.Item label="联系方式">
                        <Input placeholder="请填写兴趣联系方式"/>
                    </Descriptions.Item>
                    <Descriptions.Item label="兴趣爱好" span={2}>
                        <Input placeholder="请填写兴趣爱好"/>
                    </Descriptions.Item>
                    <Descriptions.Item label="学院/专业/班级">
                        <Cascader
                            defaultValue={['学院', '专业', '班级']}
                            options={options}
                            onChange={this.onChange}/>
                    </Descriptions.Item>
                    <Descriptions.Item label="生日">
                        <DatePicker onChange={this.dateChange} bordered={false} placeholder="请选择生日"/>
                    </Descriptions.Item>
                    <Descriptions.Item label="自我评价" span={2}>
                        <TextArea rows={4}/>
                    </Descriptions.Item>
                    <Descriptions.Item label="加入社团的期望" span={2}>
                        <TextArea rows={4}/>
                    </Descriptions.Item>
                    <Descriptions.Item label="面试结果评价">
                        <Input placeholder="请填写兴趣爱好"/>
                    </Descriptions.Item>
                    <Descriptions.Item label="纳新审核结果">
                        <Badge status="processing" text="审核中"/>
                    </Descriptions.Item>
                </Descriptions>
            </div>
        )
    }
}




