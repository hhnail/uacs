import React, {useEffect, useState} from 'react'
import {
    Anchor,
    Avatar,
    Button,
    Card,
    Cascader,
    Col,
    DatePicker,
    Descriptions,
    Form,
    Image,
    Input, message, Modal,
    Row,
    Select,
    Switch,
    Tooltip, Upload
} from 'antd';
import {EditOutlined, PlusOutlined, SettingOutlined} from '@ant-design/icons';
import {getUserById} from "../../../../../services/db";
import {getClassTree} from "../../../../../services/treeService";
import {USER_IMAGE_URL} from "../../../../../constants/image";
import moment from "moment";
import axios from "axios";
import {updateResume} from "../../../../../services/userService";
import {IMAGE_TYPE} from "../../../../../constants/type";
import {deleteImage, getAssociationImageUrl} from "../../../../../services/imageService";
import {OPTION_ICONS} from "../../../../../constants/icon";

// antd组件结构
const {TextArea} = Input;
const {Link} = Anchor;
const {Meta} = Card;

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default function Resume() {

    const userSession = JSON.parse(localStorage.getItem("userInfo"))
    const [userInfo, setUserInfo] = useState()
    const [isEdit, setIsEdit] = useState(false)
    const [classTreeData, setClassTreeData] = useState([])
    const [collegeMajorClass, setCollegeMajorClass] = useState([])
    const [userForm] = Form.useForm()

    // 图片上传
    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [previewTitle, setPreviewTitle] = useState('')
    const [fileList, setFileList] = useState([])

    const refreshResume = () => {
        const {userId} = userSession
        if (userId) {
            getUserById(userId).then(res => {
                const {data} = res.data
                // console.log('用户信息：')
                // console.log(data)
                setUserInfo(data)
            })
            getAssociationImageUrl(IMAGE_TYPE.USER_ID_PHOTO.value, userId).then(res => {
                const images = res.data.data
                // console.log("images:")
                // console.log(images)
                setFileList(images)
            })
        }
    }

    useEffect(() => {
        refreshResume()
        getClassTree().then(res => {
            setClassTreeData(res.data.data)
        })
    }, [])


    const format2Array = (cascaderClass) => {
        const fomattedArr = []
        cascaderClass.split("/").map(item => {
            fomattedArr.push(item)
        })
        // console.log('fomattedArr')
        // console.log(fomattedArr)
        return fomattedArr
    }

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

    return <>
        <Row>
            {/* ============== 简历展示区 ==================== */}
            <Col span={18} style={{
                borderRight: '1px solid #bfbfbf'
            }}>
                {userInfo &&
                <Form form={userForm}>
                    <Row>
                        <Col span={18}>
                            <Descriptions column={7} bordered={true} size={'small'}>
                                <Descriptions.Item label="姓名" span={3}>
                                    {isEdit
                                        ? <Form.Item name='name' rules={[{required: true, message: '请输入姓名！'}]}>
                                            <Input defaultValue={userInfo.name}/>
                                        </Form.Item>
                                        : userInfo.name}
                                </Descriptions.Item>
                                {/*学号不可修改*/}
                                <Descriptions.Item label="学号" span={4}>
                                    {userInfo.userId}
                                </Descriptions.Item>
                                {/*树形选择器。学院、专业、班级*/}
                                <Descriptions.Item label="专业班级" span={7}>
                                    {isEdit
                                        ? <Form.Item name='collegeMajorClass' rules={[{required: true}]}
                                                     initialValue={format2Array(userInfo.collegeMajorClass)}>
                                            <Cascader options={classTreeData} placeholder={"请选择专业班级"}
                                                      style={{
                                                          width: '100%',
                                                      }}
                                                      onChange={(value) => {
                                                          // console.log('级联value')
                                                          // console.log(value)
                                                          setCollegeMajorClass(value)
                                                      }}
                                            />
                                        </Form.Item>
                                        : `${userInfo.collegeMajorClass}`
                                    }
                                </Descriptions.Item>
                                <Descriptions.Item label="联系方式" span={3}>
                                    {isEdit
                                        ? <Form.Item name={'phone'}
                                                     rules={[{required: true}]}>
                                            <Input defaultValue={userInfo?.phone}/>
                                        </Form.Item>
                                        : userInfo?.phone
                                    }
                                </Descriptions.Item>
                                <Descriptions.Item label="邮箱" span={4}>
                                    {isEdit
                                        ? <Form.Item name={'email'}
                                                     rules={[{required: true}]}>
                                            <Input defaultValue={userInfo?.email}/>
                                        </Form.Item>
                                        : userInfo.email
                                    }
                                </Descriptions.Item>
                                <Descriptions.Item label="微信" span={3}>
                                    {isEdit
                                        ? <Form.Item name={'wechat'} rules={[{required: true}]}>
                                            <Input defaultValue={userInfo?.wechat}/>
                                        </Form.Item>
                                        : userInfo.wechat}
                                </Descriptions.Item>
                                <Descriptions.Item label="QQ" span={3}>
                                    {isEdit
                                        ? <Form.Item name={'qq'}>
                                            <Input defaultValue={userInfo?.qq}/>
                                        </Form.Item>
                                        : userInfo.qq}
                                </Descriptions.Item>
                            </Descriptions>
                        </Col>
                        {/* == 证件照 == */}
                        <Col span={6}>
                            {(isEdit || !fileList[0] || !fileList[0].url)
                                ? <Upload listType="picture-card"
                                          action={`/association/uploadImage/${IMAGE_TYPE.USER_ID_PHOTO.value}/${userInfo.userId}`}
                                          name='image'
                                          fileList={fileList}
                                          onPreview={handlePreview}
                                          onChange={handleChange}
                                >
                                    {/* === 只允许上传5张图片 === */}
                                    {fileList.length < 1
                                    && <div>
                                        <PlusOutlined/>
                                        <div style={{marginTop: 8}}>上传图片</div>
                                    </div>}
                                </Upload>
                                : <Image width={145} height={153} src={fileList[0].url}/>}
                        </Col>
                    </Row>
                    {/* ====== 描述信息 ======  */}
                    <Descriptions bordered={true} column={24} size={'small'}>
                        <Descriptions.Item label="生日" span={8}>
                            {isEdit
                                ?
                                <Form.Item name='birthday' initialValue={moment(`${userInfo.birthday}`, 'YYYY-MM-DD')}>
                                    <DatePicker locale bordered={false} placeholder="请选择生日"/>
                                </Form.Item>
                                : `${userInfo.birthday}`}
                        </Descriptions.Item>
                        <Descriptions.Item label="民族" span={8}>
                            {isEdit
                                ? <Form.Item name='nation'>
                                    <Input defaultValue={userInfo.nation}/>
                                </Form.Item>
                                : userInfo.nation}
                        </Descriptions.Item>
                        <Descriptions.Item label="性别" span={8}>
                            {isEdit
                                ? <Form.Item name={'gender'}>
                                    <Input defaultValue={userInfo.gender}/>
                                </Form.Item>
                                : userInfo.gender}
                        </Descriptions.Item>
                        <Descriptions.Item label="兴趣爱好" span={24}>
                            <Form.Item name={'like'} initialValue={userInfo.selfLike}>
                                <TextArea rows={6} disabled={!isEdit} maxLength={150}/>
                            </Form.Item>
                        </Descriptions.Item>
                        <Descriptions.Item label="自我评价" span={24}>
                            <Form.Item name={'selfProfile'} initialValue={userInfo.selfProfile}>
                                <TextArea rows={6} disabled={!isEdit} maxLength={150}/>
                            </Form.Item>
                        </Descriptions.Item>
                    </Descriptions>
                </Form>
                }
            </Col>

            {/* ============================ 右侧区域 ============================*/}
            <Col span={5} style={{
                marginLeft: 10,
            }}>
                <Row>
                    <Card style={{width: 298}}
                          actions={[
                              <Tooltip placement="bottom" title='点击上传头像'>
                                  {OPTION_ICONS.AVATAR}
                              </Tooltip>,
                              <Tooltip placement="bottom" title='点击修改个签'>
                                  <EditOutlined key="edit"/>
                              </Tooltip>,
                          ]}
                    >
                        <Meta avatar={<Avatar src={USER_IMAGE_URL.DEFAULT.url}/>}
                              title={userSession.name}
                              description={userSession.personalSignature || '该用户很懒，没有个性签名~'}
                        />
                    </Card>
                </Row>
                {/* == TODO 锚点效果 === */}
                <Row style={{
                    marginTop: 20,
                }}>
                    <Anchor>
                        <b>简历目录</b>
                        <Link href="#components-anchor-demo-basic" title="个人信息"/>
                        <Link href="#components-anchor-demo-static" title="自我评价">
                            {/*<Link href="#Anchor-Props" title="沟通能力"/>*/}
                            {/*<Link href="#Link-Props" title="协作能力"/>*/}
                            {/*<Link href="#Link-Props" title="表达能力"/>*/}
                            {/*<Link href="#Link-Props" title="抗压能力"/>*/}
                        </Link>
                        <Link href="#components-anchor-demo-static" title="个性签名"/>
                    </Anchor>
                </Row>
                {/* ======= 简历编辑 ======= */}
                <Row align={24} gutter={[0, 15]} style={{marginTop: 30}}>
                    <b>简历编辑</b>
                    {userInfo
                    && <Col span={24}>
                        <Switch defaultChecked={userInfo.canView === 0}
                                unCheckedChildren={'对他人可见'}
                                checkedChildren={'对他人隐藏'}
                                onChange={(value) => {
                                    updateResume({canView: value ? 0 : 1, userId: userInfo.userId}).then(() => {
                                        refreshResume()
                                        message.success("操作成功！")
                                    })
                                }}
                        />
                    </Col>
                    }
                    <Col span={24}>
                        <Switch checked={isEdit}
                                unCheckedChildren={'浏览简历'}
                                checkedChildren={'编辑简历'}
                                onChange={() => {
                                    setIsEdit(!isEdit)
                                }}
                        />
                    </Col>
                    <Col span={24}>
                        {isEdit
                            ? <Button size='small' type='primary'
                                      onClick={() => {
                                          setIsEdit(false)
                                          userForm.validateFields().then(value => {
                                              const formattedData = {
                                                  ...value,
                                                  userId: userInfo.userId,
                                                  className: collegeMajorClass.join("/")
                                              }
                                              // console.log('formattedData：')
                                              // console.log(formattedData)
                                              updateResume(formattedData).then(() => {
                                                  refreshResume()
                                                  message.success("更新成功！")
                                              })
                                          })
                                      }}>
                                确认修改
                            </Button>
                            : <Button size='small'/>}
                    </Col>
                </Row>
            </Col>
        </Row>
        {/* ====== 图片预览 Modal ====== */}
        <Modal title={previewTitle} visible={previewVisible}
               footer={null}
               onCancel={() => {
                   setPreviewVisible(false)
               }}
        >
            <img alt="example" style={{width: '100%'}} src={previewImage}/>
        </Modal>
    </>
}