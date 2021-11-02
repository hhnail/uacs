import {Badge, Button, Cascader, DatePicker, Descriptions, Drawer, Input, Slider, Space} from 'antd';


import React, {useState} from 'react';
import {MAJORANDCLASS} from "../../../../../constants/baseInfo";
import TextArea from "antd/es/input/TextArea";

export default function ApplicationDetail() {

    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };
    return (
        <>
            <Descriptions title="User Info" bordered>
                <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
                <Descriptions.Item label="Billing Mode">Prepaid</Descriptions.Item>
                <Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item>
                <Descriptions.Item label="Order time">2018-04-24 18:00:00</Descriptions.Item>
                <Descriptions.Item label="Usage Time" span={2}>
                    2019-04-24 18:00:00
                </Descriptions.Item>
                <Descriptions.Item label="Status" span={3}>
                    <Badge status="processing" text="Running"/>
                </Descriptions.Item>
                <Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
                <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
                <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item>
                <Descriptions.Item label="Config Info">
                    Data disk type: MongoDB
                    <br/>
                    Database version: 3.4
                    <br/>
                    Package: dds.mongo.mid
                    <br/>
                    Storage space: 10 GB
                    <br/>
                    Replication factor: 3
                    <br/>
                    Region: East China 1<br/>
                </Descriptions.Item>
            </Descriptions>
            <Space>
                <Button type="primary" onClick={()=>{

                }}>
                    安排面试
                </Button>

                {/* ======== 个人简历浏览 ========== */}
                <Button type="primary" onClick={showDrawer}>
                    浏览成员简历
                </Button>
            </Space>
            <Drawer visible={visible} title="成员简历" placement="right" width={900}
                    onClose={onClose}>
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
                        <Cascader options={MAJORANDCLASS} defaultValue={['学院', '专业', '班级']}
                                  onChange={(value) => {
                                      console.log(value);
                                  }}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="生日">
                        <DatePicker onChange={() => {

                        }} bordered={false} placeholder="请选择生日" locale/>
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
            </Drawer>
        </>
    )
}