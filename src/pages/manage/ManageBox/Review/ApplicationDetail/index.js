import {
    Badge,
    Button,
    Cascader,
    Col,
    DatePicker,
    Descriptions,
    Drawer,
    Image,
    Input, Modal,
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
import ViewInterview from "../../../../components/ViewInterview";
import {APPLICATION_STATE} from "../../../../../constants/state";
import {getUserById} from "../../../../../services/db";
import {getAssociationImageUrl} from "../../../../../services/imageService";
import {IMAGE_TYPE} from "../../../../../constants/type";
import {getClassTree} from "../../../../../services/treeService";


export default function ApplicationDetail(props) {


    const history = useHistory()
    // 申请表
    const [visible, setVisible] = useState(false)
    const [applicationDetail, setApplicationDetail] = useState()
    // 用户简历信息
    const userSession = JSON.parse(localStorage.getItem("userInfo"))
    const [userInfo, setUserInfo] = useState()
    const [userIdPhoto, setUserIdPhoto] = useState()


    useEffect(() => {
        getApplicationDetail(props.match.params.applicationId).then(res => {
            const applicationDetail = res.data.data
            console.log('申请表详情：')
            console.log(applicationDetail)
            setApplicationDetail(applicationDetail)

            getUserById(applicationDetail.userId).then(res => {
                const {data} = res.data
                // console.log('用户信息：')
                // console.log(data)
                setUserInfo(data)
            })
            getAssociationImageUrl(IMAGE_TYPE.USER_ID_PHOTO.value, applicationDetail.userId).then(res => {
                const images = res.data.data
                setUserIdPhoto(images[0])
            })
        })
    }, [])

    const renderState = (state) => {
        // console.log('state:')
        // console.log(state)
        switch (state) {
            case APPLICATION_STATE.UN_COMMIT.value:
                return <Badge status="warning" text={APPLICATION_STATE.UN_COMMIT.name}/>
            case APPLICATION_STATE.APPLYING.value:
                return <Badge status="processing" text={APPLICATION_STATE.APPLYING.name}/>
            case APPLICATION_STATE.INTERVIEW_INVITING.value:
                return <Badge status="success" text={APPLICATION_STATE.INTERVIEW_INVITING.name}/>
            case APPLICATION_STATE.UN_INTERVIEW.value:
                return <Badge status="processing" text={APPLICATION_STATE.UN_INTERVIEW.name}/>
            case APPLICATION_STATE.APPLY_REFUSE.value:
                return <Badge status="error" text={APPLICATION_STATE.APPLY_REFUSE.name}/>
            default:
                return <Badge status="error" text="状态异常"/>
        }
    }

    return (
        <div style={{
            marginTop: -20,
        }}>
            {(applicationDetail && userInfo && userIdPhoto) &&
            <>
                <PageHeader onBack={() => history.goBack()} title={'申请表详情'}
                            extra={<Space>
                                {(
                                    applicationDetail.state === APPLICATION_STATE.UN_INTERVIEW.value
                                    || applicationDetail.state === APPLICATION_STATE.INTERVIEW_INVITING.value
                                    || applicationDetail.state === APPLICATION_STATE.REFUSE_INVITING.value
                                ) && <Button type="primary" onClick={() => {
                                    Modal.info({
                                        title: '面试安排',
                                        width: 698,
                                        content: <ViewInterview application={applicationDetail}/>,
                                        onOk: () => {
                                        },
                                        okText: '关闭',
                                    })
                                }}>
                                    查看面试安排
                                </Button>
                                }
                                {(applicationDetail.state === APPLICATION_STATE.APPLY_REFUSE.value)
                                && <Button type="primary" onClick={() => {
                                    Modal.info({
                                        title: '面试安排',
                                        width: 698,
                                        content: '很抱歉，您不符合我们的需求，希望您早日找到合适的社团，祝您大学生活愉快~',
                                        onOk: () => {
                                        },
                                        okText: '关闭',
                                    })
                                }}>
                                    查看申请回复
                                </Button>
                                }
                                {/* ======== 个人简历浏览 ========== */}
                                {/* 从路由身上取得的是number，所以要用== */}
                                {props.match.params.isReview == 1 &&
                                <Button type="primary" onClick={() => {
                                    setVisible(true);
                                }}>
                                    浏览简历
                                </Button>
                                }
                            </Space>}
                />
                {/*====== 基本信息 + 照片 ======*/}
                <div style={{
                    height: '100%-50px',
                    overflowY: 'auto',
                }}>
                    <Row>
                        <Col span={18}>
                            <Descriptions title="" bordered column={6}>
                                <Descriptions.Item label="姓名" span={2}>{applicationDetail.name}</Descriptions.Item>
                                <Descriptions.Item label="学号" span={2}>{applicationDetail.userId}</Descriptions.Item>
                                <Descriptions.Item label="性别" span={2}>{userInfo.gender}</Descriptions.Item>
                                <Descriptions.Item label="院系专业班级"
                                                   span={6}>{userInfo.collegeMajorClass}</Descriptions.Item>
                                <Descriptions.Item label="联系方式" span={3}>{userInfo.phone}</Descriptions.Item>
                                <Descriptions.Item label="电子邮箱" span={3}>{userInfo.email}</Descriptions.Item>
                                <Descriptions.Item label="意向部门"
                                                   span={3}>{applicationDetail.departmentName}</Descriptions.Item>
                                <Descriptions.Item label="是否接受调剂" span={3}>是</Descriptions.Item>
                            </Descriptions>
                        </Col>
                        <Col span={6}>
                            <Image width={208} height={212} src={userIdPhoto?.url}/>
                        </Col>
                    </Row>

                    {/* ====== 描述信息 ======  */}
                    <Descriptions title="" bordered column={6} labelStyle={{
                        width: 165,
                    }}>
                        <Descriptions.Item label="兴趣爱好" span={6}>{userInfo.selfLike}</Descriptions.Item>
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
                            {renderState(applicationDetail.state)}
                        </Descriptions.Item>
                    </Descriptions>
                </div>
            </>}

            {/* ============================ 抽屉展示个人简历 ============================ */}
            {userInfo &&
            <Drawer visible={visible} title="成员主页" placement="right" width={900}
                    onClose={() => {
                        setVisible(false);
                    }}>
                <Row>
                    <Col span={18}>
                        <Descriptions column={7} bordered={true} size={'small'}>
                            <Descriptions.Item label="姓名" span={3}> {userInfo.name} </Descriptions.Item>
                            <Descriptions.Item label="学号" span={4}>{userInfo.userId}
                            </Descriptions.Item>
                            <Descriptions.Item label="专业班级"
                                               span={7}>{userInfo.collegeMajorClass} </Descriptions.Item>
                            <Descriptions.Item label="联系方式" span={3}>{userInfo?.phone}</Descriptions.Item>
                            <Descriptions.Item label="邮箱" span={4}>{userInfo.email}</Descriptions.Item>
                            <Descriptions.Item label="微信" span={3}>{userInfo.wechat} </Descriptions.Item>
                            <Descriptions.Item label="QQ" span={3}>{userInfo.qq}</Descriptions.Item>
                        </Descriptions>
                    </Col>
                    {/* == 证件照 == */}
                    <Col span={6}>
                        <Image width={145} height={153} src={userIdPhoto?.url}/>
                    </Col>
                </Row>
                {/* ====== 描述信息 ======  */}
                <Descriptions bordered={true} column={24} size={'small'}>
                    <Descriptions.Item label="生日" span={8}>{userInfo.birthday}</Descriptions.Item>
                    <Descriptions.Item label="民族" span={8}>{userInfo.nation}
                    </Descriptions.Item>
                    <Descriptions.Item label="性别" span={8}>{userInfo.gender} </Descriptions.Item>
                    <Descriptions.Item label="兴趣爱好" span={24}>{userInfo.selfLike}</Descriptions.Item>
                    <Descriptions.Item label="自我评价" span={24}>{userInfo.selfProfile}</Descriptions.Item>
                </Descriptions>
            </Drawer>
            }
        </div>
    )
}