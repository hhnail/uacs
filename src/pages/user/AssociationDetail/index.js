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
import {JS} from "json-server/lib/cli/utils/is";

const {TabPane} = Tabs;

export default function AssociationDetail(props) {


    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    const history = useHistory()
    const {associationId} = props.match.params
    const [userResume,setUserResume] = useState()
    const [associationDetail, setAssociationDetail] = useState()
    const [recentRecruitmentContent, setRecentRecruitmentContent] = useState()
    const [joinModalVisible, setJoinModalVisible] = useState(true);
    const [joinForm] = useForm()

    useEffect(() => {
        getAssociationDetail(associationId).then(res => {
            const {data} = res.data
            setAssociationDetail(data)
        })
        getRecentRecruitment(associationId).then(res => {
            const {data} = res.data
            setRecentRecruitmentContent(data.content)
        })
        getUserById(userInfo.userId).then(res=>{
            setUserResume(res.data.data)
        })
    }, [])


    const handleJoin = () => {
        setJoinModalVisible(true)
    }

    return (
        <div>
            {/* ============================ 页面体 头部 ============================*/}
            <PageHeader
                onBack={() => history.goBack()}
                title={associationDetail?.associationName}
                subTitle={associationDetail?.info}
                extra={[
                    <Button key="3">不感兴趣</Button>,
                    <Button key="2">收藏</Button>,
                    <Button key="1" type="primary" onClick={handleJoin}>申请加入</Button>,
                ]}
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
                <TabPane tab="社团风采" key="associationShare">
                    <Share associationId={associationId}/>
                </TabPane>

                {/* ================================= 纳新通知  =================================  */}
                <TabPane tab="社团纳新" key="recruitment">
                    展示社团的纳新通知
                    <div dangerouslySetInnerHTML={{
                        __html: recentRecruitmentContent
                    }}
                         style={{
                             margin: '24px 24px',
                             border: '1px solid gray',
                         }}>
                    </div>
                </TabPane>

                {/* ================================= echarts数据可视化部分  =================================  */}
                <TabPane tab="数据可视化" key="dataView">
                    <DataView/>
                </TabPane>
                {/* ================= 社团大事记  ====================-  */}
                <TabPane tab="社团大事记" key="bigEvent">
                    <BigEvent/>
                </TabPane>
            </Tabs>


            {/* ================== 申请加入社团 Modal =============== */}
            <Modal title="入团申请表" visible={joinModalVisible} width={1200}
                   onOk={() => {
                       joinForm.validateFields().then((values) => {
                           console.log(values)
                           setJoinModalVisible(false)
                           axios.post('/association/saveApplication', {...values}).then(res => {
                               console.log("申请表提交结果", res.data.data)
                           })
                       })
                   }}
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
                                    <Form.Item name={'college'}
                                               rules={[{required: true}]}><Input/></Form.Item>
                                </Descriptions.Item>
                                <Descriptions.Item label="专业班级" span={3}>
                                    <Form.Item name={'majorAndClass'}
                                               rules={[{required: true}]}><Input/></Form.Item>
                                </Descriptions.Item>
                                <Descriptions.Item label="联系方式" span={3}>
                                    <Form.Item name={'phone'}
                                               rules={[{required: true}]}>
                                        <Input/>
                                    </Form.Item>
                                </Descriptions.Item>
                                <Descriptions.Item label="电子邮箱" span={3}>
                                    <Form.Item name={'email'}
                                               rules={[{required: true}]}>
                                        <Input/>
                                    </Form.Item>
                                </Descriptions.Item>
                                <Descriptions.Item label="意向部门" span={3}>
                                    <Form.Item name={'intentionDepartment'}
                                               rules={[{required: true}]}>
                                        <Input/>
                                    </Form.Item>
                                </Descriptions.Item>
                                <Descriptions.Item label="是否接受调剂" span={3}>
                                    <Form.Item name={'canAdjust'}
                                               rules={[{required: true}]}><Input/></Form.Item>
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
                        <Descriptions.Item label="个人特长及优势" span={6} style={{height: 95}}>
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