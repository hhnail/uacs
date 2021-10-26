import React, {Component, useState} from 'react'
import {
    Descriptions, Badge, Cascader,
    DatePicker, Input, Form, Select,
    Switch, Radio, Slider
} from 'antd';

import {MAJORANDCLASS} from '../../constants/baseInfo'

const {TextArea} = Input;

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
                    <Input placeholder="请填写姓名"/>
                </Descriptions.Item>
                <Descriptions.Item label="性别">
                    <Input placeholder="请填写性别"/>
                </Descriptions.Item>
                <Descriptions.Item label="联系方式">
                    <Input placeholder="请填写联系方式"/>
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
