import {
    Badge,
    Button,
    Cascader,
    Col,
    DatePicker,
    Descriptions,
    Drawer,
    Image,
    Input,
    PageHeader,
    Row,
    Slider,
    Space
} from 'antd';


import React, {useEffect, useState} from 'react';
import {MAJORANDCLASS} from "../../../../../constants/baseInfo";
import TextArea from "antd/es/input/TextArea";
import {useHistory} from "react-router-dom";
import {getApplicationDetail} from "../../../../../services/applicationService";


export default function ApplicationDetail(props) {

    const history = useHistory()
    const [visible, setVisible] = useState(false)
    const [applicationDetail, setApplicationDetail] = useState()

    useEffect(() => {
        getApplicationDetail(props.match.params.applicationId).then(res => {
            const applicationDetail = res.data.data
            console.log(applicationDetail)
            setApplicationDetail(applicationDetail)
        })
    }, [])

    return (
        <div style={{
            marginTop:-20,
        }}>
            <PageHeader onBack={() => history.goBack()} title={'申请表详情'}/>
            {/* ====== 基本信息 + 照片 ======  */}
            {applicationDetail &&
            <div style={{
                height:'100%-50px',
                overflowY:'auto',
            }}>
                <Row>
                    <Col span={18}>
                        <Descriptions title="" bordered column={6}>
                            <Descriptions.Item label="姓名" span={2}>{applicationDetail.name}</Descriptions.Item>
                            <Descriptions.Item label="学号" span={2}>{applicationDetail.userId}</Descriptions.Item>
                            <Descriptions.Item label="性别" span={2}>2019-04-24 18:00:00 </Descriptions.Item>
                            <Descriptions.Item label="院系" span={3}>工商管理学院</Descriptions.Item>
                            <Descriptions.Item label="专业班级" span={3}>商务1811</Descriptions.Item>
                            <Descriptions.Item label="联系方式" span={3}>18030290001</Descriptions.Item>
                            <Descriptions.Item label="电子邮箱" span={3}>hhnail@163.com</Descriptions.Item>
                            <Descriptions.Item label="意向部门" span={3}>{applicationDetail.intentionDepartment}</Descriptions.Item>
                            <Descriptions.Item label="是否接受调剂" span={3}>是</Descriptions.Item>
                        </Descriptions>
                    </Col>
                    <Col span={6}>
                        <Image
                            width={200}
                            height={200}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        />
                    </Col>
                </Row>

                {/* ====== 描述信息 ======  */}
                <Descriptions title="" bordered column={6}>
                    <Descriptions.Item label="兴趣爱好" span={6}>
                        篮球、足球、钢琴、跳舞
                    </Descriptions.Item>
                    <Descriptions.Item label="个人特长及优势" span={6}>
                        {applicationDetail.selfProfile}
                    </Descriptions.Item>
                    <Descriptions.Item label="对社团的看法" span={6}>
                        {applicationDetail.viewOfAssociation}
                    </Descriptions.Item>
                    <Descriptions.Item label="加入社团的目标" span={6}>
                        {applicationDetail.joinPurpose}
                    </Descriptions.Item>

                    <Descriptions.Item label="Status" span={3}>
                        <Badge status="processing" text="Running"/>
                    </Descriptions.Item>
                </Descriptions>
            </div>}

            {/* ============================ 操作 ============================ */}
            <Space>
                <Button type="primary" onClick={() => {

                }}>
                    安排面试
                </Button>

                {/* ======== 个人简历浏览 ========== */}
                <Button type="primary" onClick={() => {
                    setVisible(true);
                }}>
                    浏览成员简历
                </Button>
            </Space>

            {/* ============================ 抽屉展示个人简历 ============================ */}
            <Drawer visible={visible} title="成员简历" placement="right" width={900}
                    onClose={() => {
                        setVisible(false);
                    }}>
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
        </div>
    )
}