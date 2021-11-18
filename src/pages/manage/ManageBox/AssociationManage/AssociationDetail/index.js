import React, {useEffect, useState} from 'react'
import {Button, Card, Col, Descriptions, message, Modal, PageHeader, Row, Tabs, Upload} from 'antd';
import Icon, {EditOutlined, PlusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import axios from "axios";
import {useHistory} from "react-router-dom";
import {getAssociationDetail} from "../../../../../services/db";
import {ICON, OPTION_ICONS} from "../../../../../constants/icon";
import {ReactComponent as DeleteIcon} from "../../../../../icons/delete.svg";
import {deleteDepartment} from "../../../../../services/departmentService";
import UserList from "./UserList";
import {IMAGE_TYPE} from "../../../../../constants/type";
import {deleteImage, getAssociationImageUrl} from "../../../../../services/imageService";

const {TabPane} = Tabs;

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default function AssociationDetail(props) {

    const history = useHistory()
    const [association, setAssociation] = useState()

    // 预览图片 Modal、图片、标题
    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [previewTitle, setPreviewTitle] = useState('')
    const [fileList, setFileList] = useState([])

    const refreshAssociationData = () => {
        getAssociationDetail(props.match.params.associationId).then(res => {
            // console.log("社团详情：")
            // console.log(res.data.data)
            setAssociation(res.data.data)
        })
    }

    useEffect(() => {
        refreshAssociationData()
        if (association) {
            const type = IMAGE_TYPE.ASSOCIATION_HOMEPAGE.value
            const ownerId = association.associationId + ''
            getAssociationImageUrl(type, ownerId).then(res => {
                const images = res.data.data
                // console.log('images')
                // console.log(images)
                setFileList(images)
            })
        }
    }, [association?.associationId])


    // 预览图片
    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview)
        setPreviewVisible(true)
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
    };

    // 控制上传change
    const handleChange = ({file, fileList}) => {
        const changeAction = file.status
        setFileList(fileList)
        switch (changeAction) {
            case 'done':
                message.success("上传成功！")
                break
            case 'removed':
                // TODO 删除首页图片
                deleteImage(file.uid).then(() => {
                    message.success("删除成功！")
                })
        }
    };


    return (
        <div>
            {/* === 页头 === */}
            {association &&
            <Row>
                <PageHeader ghost={false}
                            title="社团详情"
                            subTitle="对社团基本信息进行管理"
                            onBack={() => history.goBack()}
                            extra={[
                                <Button key="3">Operation</Button>,
                                <Button key="2">Operation</Button>,
                                <Button key="1" type="primary">
                                    Primary
                                </Button>,
                            ]}
                >
                    <Descriptions size="small" column={3}>
                        <Descriptions.Item label="社团名称">{association.associationName}</Descriptions.Item>
                        <Descriptions.Item label="隶属单位">{association.adminUnit}</Descriptions.Item>
                        <Descriptions.Item label="创建时间">{association.createTime}</Descriptions.Item>
                        <Descriptions.Item label="社团个签">{association.info}</Descriptions.Item>
                    </Descriptions>
                </PageHeader>
            </Row>
            }
            <Tabs defaultActiveKey="structure">
                {/* ================= 社团经历分享  ====================-  */}
                <TabPane tab="社团组织" key="structure">
                    <Row gutter={[24, 24]} style={{marginTop: 30}}>
                        {/* =============== 左侧部门列表 =============== */}
                        <Col span={6}>
                            <Row gutter={[0, 24]}>
                                <Col span={24}>
                                    <Card bordered hoverable style={{height: 195}}
                                          onClick={() => {

                                          }}
                                    >
                                        <div style={{
                                            height: '50%',
                                            marginTop: '20%',
                                            marginLeft: '25%',
                                            fontSize: 20,
                                            color: 'rgb(176,177,185)'
                                        }}>
                                            <PlusCircleOutlined/>
                                            <span style={{marginLeft: 10}}>新增部门</span>
                                        </div>
                                    </Card>
                                </Col>
                                {association?.departments.length > 0 &&
                                association?.departments.map(dpt => {
                                    return <Col span={24}>
                                        {/* ======== TODO 卡片与右侧成员列表联动 ========*/}
                                        <Card title={
                                            <>
                                                {ICON.department}
                                                <span style={{
                                                    marginLeft: 10,
                                                    marginBottom: 5,
                                                    fontSize: 20,
                                                    fontWeight: 1000,
                                                }}
                                                >{dpt.departmentName}</span>
                                            </>
                                        } bordered hoverable
                                              style={{height: 195,}}
                                              actions={[
                                                  <EditOutlined key="edit"/>,
                                                  <Icon component={DeleteIcon} style={{fontSize: 17}}
                                                        onClick={() => {
                                                            Modal.confirm({
                                                                title: `您确认要删除【${dpt.departmentName}】吗？`,
                                                                onOk: () => {
                                                                    deleteDepartment(dpt.departmentId).then(() => {
                                                                        refreshAssociationData()
                                                                        message.success('删除成功！')
                                                                    })
                                                                }
                                                            })
                                                        }}
                                                  />,
                                              ]}>
                                            <div style={{height: 40}}>
                                                主要职责：{dpt.job}
                                            </div>
                                        </Card>
                                    </Col>
                                })
                                }
                            </Row>
                        </Col>
                        {/* =============== 右侧部门列表 =============== */}
                        <Col span={18}>
                            {association
                            && <UserList
                                associationId={association.associationId}
                                departmentId={1}
                            ></UserList>}
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tab="使用橘集" key="useUacs">
                    {/* 上传图片 */}
                    <div style={{
                        fontSize: 17,
                        fontWeight: 900,
                    }}>
                        系统首页社团轮播图
                    </div>
                    <Upload listType="picture-card"
                            action={`/association/uploadImage/${IMAGE_TYPE.ASSOCIATION_HOMEPAGE.value}/${association?.associationId + ''}`}
                            name='image'
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                    >
                        {/* === 只允许上传3张图片 === */}
                        {fileList.length < 3
                        && <div>
                            <PlusOutlined/>
                            <div style={{marginTop: 8}}>上传图片</div>
                        </div>}
                    </Upload>
                </TabPane>
            </Tabs>

            {/* ====== 图片预览 Modal ====== */}
            <Modal title={previewTitle} visible={previewVisible}
                   footer={null}
                   onCancel={() => {
                       setPreviewVisible(false)
                   }}
            >
                <img alt="example" style={{width: '100%'}} src={previewImage}/>
            </Modal>
        </div>
    );
}




