import React, {useEffect, useState} from 'react'
import {Button, Card, Col, Descriptions, message, Modal, PageHeader, Row, Tabs, Upload} from 'antd';
import Icon, {EditOutlined, PlusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import axios from "axios";
import {useHistory} from "react-router-dom";
import {getAssociationDetail} from "../../../../../services/db";
import {OPTION_ICONS} from "../../../../../constants/icon";
import {ReactComponent as DeleteIcon} from "../../../../../icons/delete.svg";

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
    const [fileList, setFileList] = useState([
        {
            uid: '-4',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-5',
            name: 'image.png',
            status: 'error',
        },
    ],)

    const refreshAssociationData = ()=>{
        getAssociationDetail(props.match.params.associationId).then(res => {
            console.log(res.data.data)
            setAssociation(res.data.data)
        })
    }

    useEffect(() => {
        // TODO
        // axios.get(`/association/getImageById/${1}`).then(res => {
        //     const {data} = res.data
        //     console.log(data)
        // })
        refreshAssociationData()
    }, [])


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
    const handleChange = ({fileList}) => {
        setFileList(fileList)
        // TODO
        axios.post('/association/uploadImage', fileList[2])
            .then(res => {
                console.log(res.data.data)
            })
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
            <Tabs defaultActiveKey="associationShare">
                {/* ================= 社团经历分享  ====================-  */}
                <TabPane tab="部门列表" key="departmentList">
                    <Row gutter={[24, 24]} style={{marginTop: 30}}>
                        <Col span={6}>
                            <Card bordered hoverable style={{height: 195}}
                                  onClick={() => {

                                  }}
                            >
                                <div style={{
                                    height: '50%',
                                    marginTop: '20%',
                                    marginLeft: '25%',
                                    fontSize: 25,
                                    color: 'rgb(176,177,185)'
                                }}>
                                    <PlusCircleOutlined/>
                                    <span style={{marginLeft: 10}}>新增部门</span>
                                </div>
                            </Card>
                        </Col>
                        {association?.departments.length > 0 &&
                        association?.departments.map(dpt => {
                            return <Col span={6}>
                                <Card title={dpt.departmentName} bordered hoverable
                                      style={{height: 195}}
                                      actions={[
                                          <EditOutlined key="edit"/>,
                                          <Icon component={DeleteIcon} style={{fontSize: 17}}
                                                onClick={() => {
                                                    Modal.confirm({
                                                        title: `您确认要删除【${dpt.departmentName}】吗？`,
                                                        onOk: () => {
                                                            axios.delete(`/association/deleteDepartment/${dpt.departmentId}`)
                                                                .then(() => {
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
                </TabPane>
                <TabPane tab="成员列表" key="userList">
                    <Row gutter={24} style={{marginTop: 30}}>
                        <Col span={24}>
                            <Card title="成员列表" bordered={false}>
                                Card content
                            </Card>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tab="社团展示" key="dataView">
                    {/* 上传图片 */}
                    首页社团图片
                    <Upload listType="picture-card"
                        // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            action={`/association/uploadImage`}
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                    >
                        {fileList.length < 9
                        && <div>
                            <PlusOutlined/>
                            <div style={{marginTop: 8}}>上传图片</div>
                        </div>}
                    </Upload>
                </TabPane>
                {/* ================= 社团大事记  ====================-  */}
                <TabPane tab="社团大事记" key="bigEvent">

                </TabPane>
                <TabPane tab="方便使用" key="easyUse">

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




