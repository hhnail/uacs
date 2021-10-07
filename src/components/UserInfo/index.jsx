import React, {Component, useState} from 'react'
import {
    Descriptions, Badge, Cascader,
    DatePicker, Input, Form, Select,
    Switch, Radio, Slider
} from 'antd';

import {MAJORANDCLASS} from '../../constants/baseInfo'

const {TextArea} = Input;

// 这种层次接口让后端返回比较复杂。而且关系也不够直观。
// 这里考虑用前端常量（但是这引发了一个问题，我怎么增删改查呢？）
const options = MAJORANDCLASS

export default function UserInfo() {

    const onChange = (value) => {
        console.log(value);
    }

    const handleDateChange = (value) => {
        console.log(value);
    }

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
                        onChange={onChange}/>
                </Descriptions.Item>
                <Descriptions.Item label="生日">
                    <DatePicker onChange={handleDateChange} bordered={false} placeholder="请选择生日" local="local"/>
                </Descriptions.Item>
                <Descriptions.Item label="自我评价" span={2}>
                    沟通能力：<Slider defaultValue={80} disabled={false}/>
                    表达能力：<Slider defaultValue={80} disabled={false}/>
                    合作能力：<Slider defaultValue={80} disabled={false}/>
                    抗压能力：<Slider defaultValue={80} disabled={false}/>
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




