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
    Input,
    Row,
    Select,
    Slider,
    Switch
} from 'antd';
import {EditOutlined, EllipsisOutlined, SettingOutlined} from '@ant-design/icons';
import {getUserById} from "../../../../../services/db";
import PickTag from '../../../../components/PickTag'
import {getClassTree} from "../../../../../services/treeService";
import {USER_IMAGE_URL} from "../../../../../constants/image";

// antd组件结构
const {TextArea} = Input;
const {Link} = Anchor;
const {Meta} = Card;
const {Option} = Select

export default function Resume() {

    const userSession = JSON.parse(localStorage.getItem("userInfo"))
    const [userInfo, setUserInfo] = useState()
    const [isEdit, setIsEdit] = useState(false)
    const [classTreeData, setClassTreeData] = useState([])

    useEffect(() => {
        const {userId} = userSession
        if (userId) {
            getUserById(userId).then(res => {
                const {data} = res.data
                // console.log('用户信息：')
                // console.log(data)
                setUserInfo(data)
            })
            getClassTree().then(res => {
                setClassTreeData(res.data.data)
            })
        }
    }, [])

    return (
        <Row>
            {/*  =====  TODO 锚点效果 ===== */}
            {/* ================== 卡片展示区 ======================*/}
            <Col span={5}>
                <Row>
                    <Card style={{width: 268}}
                          cover={<img alt="头像" src={USER_IMAGE_URL.DEFAULT.url}/>}
                          actions={[
                              <SettingOutlined key="setting"/>,
                              <EditOutlined key="edit"/>,
                              <EllipsisOutlined key="ellipsis"/>,
                          ]}
                    >
                        <Meta avatar={<Avatar src={USER_IMAGE_URL.DEFAULT.url}/>}
                              title={userSession.name}
                              description={userSession.personalSignature || '该用户很懒，没有个性签名~'}
                        />
                    </Card>
                </Row>
            </Col>

            {/* ============== 简历展示区 ==================== */}
            <Col span={14}>
                {userInfo &&
                <>
                    <Row>
                        <Col span={18}>
                            <Descriptions column={7} bordered={true} size={'small'}>
                                <Descriptions.Item label="姓名" span={3}>
                                    {isEdit
                                        ? <Form.Item name='name' rules={[{required: true}]}>
                                            <Input defaultValue={userInfo.name}/>
                                        </Form.Item>
                                        : userInfo.name}
                                </Descriptions.Item>
                                <Descriptions.Item label="学号" span={4}>
                                    {userInfo.userId}
                                </Descriptions.Item>
                                <Descriptions.Item label="专业班级" span={7}>
                                    {isEdit
                                        ? <Form.Item name={'collegeMajorClass'}>
                                            <Cascader options={classTreeData}
                                                      defaultValue={['学院', '专业', '班级']}
                                                      onChange={(value) => {
                                                          console.log(value)
                                                      }}/>
                                        </Form.Item>
                                        : "工商管理学院 / 电子商务 / 商务1811"}
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
                            <Image width={140} height={151} src={USER_IMAGE_URL.USER_ID_PHOTO.url}/>
                        </Col>
                    </Row>
                    {/* ====== 描述信息 ======  */}
                    <Descriptions bordered={true} column={24} size={'small'}>
                        <Descriptions.Item label="生日" span={8}>
                            {isEdit
                                ? <Form.Item name='nation'>
                                    <DatePicker locale bordered={false} placeholder="请选择生日"/>
                                </Form.Item>
                                : '2000 - 07 - 04'}
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
                        <Descriptions.Item label="兴趣爱好" span={24} labelStyle={{width: 135}} style={{height: 45}}>
                            <PickTag/>
                        </Descriptions.Item>
                        <Descriptions.Item label="自我评价" span={24}>
                            <Form.Item name={'selfProfile'}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}>
                                    <div style={{width: '65%', marginRight: '5%'}}>
                                        <TextArea rows={10} disabled={!isEdit}/>
                                    </div>
                                    <div style={{width: '30%'}}>
                                        沟通能力：<Slider defaultValue={60} disabled={!isEdit}/>
                                        表达能力：<Slider defaultValue={60} disabled={!isEdit}/>
                                        合作能力：<Slider defaultValue={60} disabled={!isEdit}/>
                                        抗压能力：<Slider defaultValue={60} disabled={!isEdit}/>
                                    </div>
                                </div>
                            </Form.Item>
                        </Descriptions.Item>
                        <Descriptions.Item label="个性签名" span={24} style={{height: 95}}>
                            <Form.Item name={'personalSignature'} style={{height: 95}}>
                                <TextArea rows={5} disabled={!isEdit}/>
                            </Form.Item>
                        </Descriptions.Item>
                    </Descriptions>
                </>
                }
            </Col>

            {/* ============================ 右侧区域 ============================*/}
            <Col push={1} span={4}>
                {/* == TODO 锚点 === */}
                <Row>
                    <Anchor>
                        <b>简历目录</b>
                        <Link href="#components-anchor-demo-basic" title="个人信息"/>
                        <Link href="#components-anchor-demo-static" title="自我评价"/>
                        <Link href="#components-anchor-demo-static" title="个性签名"/>
                        <Link href="#API" title="父级">
                            <Link href="#Anchor-Props" title="子锚点1"/>
                            <Link href="#Link-Props" title="子锚点2"/>
                        </Link>
                    </Anchor>
                </Row>
                {/* ======= 简历编辑 ======= */}
                <Row align={24} gutter={[0, 15]} style={{marginTop: 30}}>
                    <b>简历编辑</b>
                    <Col span={24}>
                        <Switch defaultChecked={false}
                                unCheckedChildren={'对他人可见'}
                                checkedChildren={'对他人隐藏'}
                                onChange={() => {

                                }}
                        />
                    </Col>
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
                                      }}>
                                确认修改
                            </Button>
                            : <Button size='small'/>}
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}