import React, {useEffect, useState} from "react"
import {Button, Col, Descriptions, Form, Image, Input, Modal, PageHeader, Row, Tabs} from 'antd'
import {useHistory} from "react-router-dom";
import {getAssociationDetail, getRecentRecruitment, getUserById} from "../../../services/db";
import Share from "./Share";
import BigEvent from "./BigEvent";
import DataView from "./DataView";
import {useForm} from "antd/es/form/Form";
import styles from './index.less'
import TextArea from "antd/es/input/TextArea";
import axios from "axios";

const {TabPane} = Tabs;

export default function AssociationDetail(props) {


    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    const history = useHistory()
    const {associationId} = props.match.params
    const [userResume, setUserResume] = useState()
    const [associationDetail, setAssociationDetail] = useState()
    const [recentRecruitment, setRecentRecruitment] = useState()
    // 入团申请表 Modal
    const [joinModalVisible, setJoinModalVisible] = useState(false);
    // 入团申请表 Form
    const [joinForm] = useForm()

    useEffect(() => {
        getAssociationDetail(associationId).then(res => {
            const {data} = res.data
            setAssociationDetail(data)
        })
        getRecentRecruitment(associationId).then(res => {
            const {data} = res.data
            setRecentRecruitment(data)
        })
        getUserById(userInfo.userId).then(res => {
            // console.log('用户简历信息：')
            // console.log(res.data.data)
            setUserResume(res.data.data)
        })
    }, [])


    const handleJoinOk = () => {
        joinForm.validateFields().then((values) => {
            console.log(values)
            const data = {
                ...values,
                userId: userResume.userId,
                recruitmentId: recentRecruitment.recruitmentId,
            }
            axios.post('/association/saveApplication', data).then(res => {
                console.log("申请表提交结果", res.data.data)
                setJoinModalVisible(false)
            })
        })
    }

    return (
        <div>
            {/* ============================ 页面体 头部 ============================*/}
            <PageHeader
                onBack={() => history.goBack()}
                title={associationDetail?.associationName}
                subTitle={associationDetail?.info}
            >
                {/* ======== 头部 描述信息 ==========*/}
                <div>
                    <Descriptions size="small" column={3}>
                        <Descriptions.Item label="社团序列号"><b>{associationDetail?.associationId}</b></Descriptions.Item>
                        <Descriptions.Item label="隶属单位">{associationDetail?.adminUnit}</Descriptions.Item>
                        <Descriptions.Item label="创建时间">{associationDetail?.createTime}</Descriptions.Item>
                    </Descriptions>
                </div>
            </PageHeader>


            {/* ============================ 页面体 内容 ============================*/}
            <Tabs defaultActiveKey="associationShare">
                {/* ================= 社团经历分享  ====================-  */}
                <TabPane tab="成员分享" key="associationShare">
                    <Share associationId={associationId}/>
                </TabPane>

                {/* ================================= 纳新通知  =================================  */}
                <TabPane tab="社团纳新" key="recruitment">
                    <div style={{
                        float: 'right',
                        margin: '20px 20px 0px 0px',
                    }}>
                        <Button key="saveApplication" type="primary"
                                style={{
                                    width: 150,
                                    height: 50,
                                }}
                                onClick={() => {
                                    setJoinModalVisible(true)
                                }}>申请加入</Button>
                    </div>
                    <div style={{
                        padding: '16px 16px 16px 16px',
                        margin: '24px 24px',
                        border: '1px solid gray',
                    }}>
                        <div dangerouslySetInnerHTML={{
                            __html: recentRecruitment?.content
                        }}/>
                    </div>

                </TabPane>

                {/* ================================= echarts数据可视化部分  =================================  */}
                <TabPane tab="了解我们" key="dataView">
                    <DataView/>
                </TabPane>
                {/* ================= 社团大事记  ====================-  */}
                <TabPane tab="社团大事记" key="bigEvent">
                    <BigEvent/>
                </TabPane>
            </Tabs>


            {/* ================== 申请加入社团 Modal =============== */}
            <Modal title="入团申请表" visible={joinModalVisible} width={1200}
                   onOk={handleJoinOk}
                   onCancel={() => {
                       setJoinModalVisible(false)
                   }}
            >
                <Form form={joinForm} className={styles.joinForm}>
                    <Row>
                        <Col span={20}>
                            <Descriptions column={6} bordered={true} size={'small'} className={styles.joinForm}>
                                <Descriptions.Item label="姓名" span={2}>{userResume?.name}</Descriptions.Item>
                                <Descriptions.Item label="学号" span={2}>{userResume?.userId}</Descriptions.Item>
                                <Descriptions.Item label="性别" span={2}>{userResume?.gender}</Descriptions.Item>
                                <Descriptions.Item label="院系" span={3}>
                                    {userResume?.college}
                                </Descriptions.Item>
                                <Descriptions.Item label="专业班级" span={3}>
                                    {userResume?.majorAndClass}
                                </Descriptions.Item>
                                <Descriptions.Item label="联系方式" span={3}>{userResume?.phone}</Descriptions.Item>
                                <Descriptions.Item label="电子邮箱" span={3}>{userResume?.email}</Descriptions.Item>
                                <Descriptions.Item label="意向部门" span={3}>
                                    <Form.Item name={'intentionDepartment'}
                                               rules={[{required: true, message: '请填写意向部门！'}]}>
                                        <Input/>
                                    </Form.Item>
                                </Descriptions.Item>
                                <Descriptions.Item label="是否接受调剂" span={3}>
                                    <Form.Item name={'canAdjust'}
                                               rules={[{required: true, message: '请确认是否接受调剂！'}]}>
                                        <Input/>
                                    </Form.Item>
                                </Descriptions.Item>
                            </Descriptions>
                        </Col>
                        <Col span={4}>
                            <Image width={180} height={180}
                                   src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"/>
                        </Col>
                    </Row>

                    {/* ====== 描述信息 ======  */}
                    <Descriptions bordered={true} column={6} size={'small'}>
                        <Descriptions.Item label="兴趣爱好" span={6} labelStyle={{width: 135}} style={{height: 95}}>
                            <Form.Item name={'like'} style={{height: 95}}>
                                <TextArea rows={5}/>
                            </Form.Item>
                        </Descriptions.Item>
                        <Descriptions.Item label="自我评价" span={6} style={{height: 95}}>
                            <Form.Item name={'selfProfile'} style={{height: 95}}>
                                <TextArea rows={5}/>
                            </Form.Item>
                        </Descriptions.Item>
                        <Descriptions.Item label="对社团的看法" span={6} style={{height: 95}}>
                            <Form.Item name={'viewOfAssociation'} style={{height: 95}}>
                                <TextArea rows={5}/>
                            </Form.Item>
                        </Descriptions.Item>
                        <Descriptions.Item label="加入社团的目标" span={6} style={{height: 95}}>
                            <Form.Item name={'joinPurpose'} style={{height: 95}}>
                                <TextArea rows={5}/>
                            </Form.Item>
                        </Descriptions.Item>
                    </Descriptions>
                </Form>
            </Modal>
        </div>
    )
}