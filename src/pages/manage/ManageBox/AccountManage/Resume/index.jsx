import React, {useEffect, useState} from 'react'
import {
    Anchor,
    Avatar,
    Badge, Button,
    Card,
    Cascader,
    Col,
    DatePicker,
    Descriptions,
    Form,
    Image,
    Input,
    Row, Select,
    Slider, Space, Switch
} from 'antd';
import {EditOutlined, EllipsisOutlined, SettingOutlined} from '@ant-design/icons';
import {COLLEGE, MAJORANDCLASS} from "../../../../../constants/baseInfo";
import {getUserById} from "../../../../../services/db";
import PickTag from '../../../../components/PickTag'
import {getClassTree} from "../../../../../services/treeService";

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
                    setUserInfo(res.data.data)
                })
            getClassTree().then(res => {
                setClassTreeData(res.data.data)
            })
        }
    }, [])

    return (
        <div style={{
            display: "flex",
            flexDirection: 'row',
            width: '100%',
        }}>
            {/*  =====  TODO 锚点效果 ===== */}
            <div style={{
                width: '10%',
            }}>
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
            </div>

            {/* ============== 中侧简历展示区 ==================== */}

            <div style={{width: '70%'}}>
                {userInfo &&
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
                                <Form.Item name={'collegeMajorClass'}>
                                    <Cascader options={classTreeData}
                                              defaultValue={['学院', '专业', '班级']}
                                              onChange={(value) => {
                                                  console.log(value)
                                              }}/>
                                </Form.Item>
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
                            <Descriptions.Item label="邮箱" span={3}>
                                {isEdit
                                    ? <Form.Item name={'email'}
                                                 rules={[{required: true}]}>
                                        <Input defaultValue={userInfo?.email}/>
                                    </Form.Item>
                                    : userInfo.email
                                }
                            </Descriptions.Item>
                        </Descriptions>
                    </Col>
                    <Col span={6}>
                        <Image width={190} height={190}
                               src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"/>
                    </Col>
                </Row>
                }
                {/* ====== 描述信息 ======  */}
                {userInfo &&
                <Descriptions bordered={true} column={24} size={'small'}>
                    <Descriptions.Item label="微信" span={12}>
                        {isEdit
                            ? <Form.Item name={'wechat'} rules={[{required: true}]}>
                                <Input defaultValue={userInfo?.wechat}/>
                            </Form.Item>
                            : userInfo.wechat}
                    </Descriptions.Item>
                    <Descriptions.Item label="QQ" span={12}>
                        {isEdit
                            ? <Form.Item name={'qq'}>
                                <Input defaultValue={userInfo?.qq}/>
                            </Form.Item>
                            : userInfo.qq}
                    </Descriptions.Item>
                    <Descriptions.Item label="生日" span={8}>
                        <DatePicker locale bordered={false} placeholder="请选择生日"/>
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
                }
            </div>


            {/* ================== 右侧卡片展示区 ======================*/}
            <div style={{width: '20%'}}>
                <div>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <div style={{
                            width: '40%',
                        }}>
                            <Switch defaultChecked={false}
                                    unCheckedChildren={'浏览'}
                                    checkedChildren={'编辑'}
                                    onChange={() => {
                                        setIsEdit(!isEdit)
                                    }}
                            />
                        </div>
                        <Button size='middle' type='primary' onClick={() => {
                            setIsEdit(false)
                        }}>确认修改</Button>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', marginTop: 30,}}>
                        <div style={{
                            width: '40%',
                        }}>
                            <Switch defaultChecked={false}
                                    unCheckedChildren={'对他人可见'}
                                    checkedChildren={'对他人隐藏'}
                                    onChange={() => {
                                        // setIsEdit(!isEdit)
                                    }}
                            />
                        </div>
                        <Button size='middle' type='primary' onClick={() => {
                            setIsEdit(!isEdit)
                        }}>帮助中心</Button>
                    </div>
                </div>
                <br/>
                <br/>
                <br/>
                <Row>
                    <Card
                        style={{width: 300}}
                        cover={
                            <img
                                alt="example"
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            />
                        }
                        actions={[
                            <SettingOutlined key="setting"/>,
                            <EditOutlined key="edit"/>,
                            <EllipsisOutlined key="ellipsis"/>,
                        ]}
                    >
                        <Meta
                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random"/>}
                            title="Card title"
                            description="This is the description"
                        />
                    </Card>
                </Row>
            </div>
        </div>
    )
}


// TODO 专业班级联动
// import { Select } from 'antd';
//
// const { Option } = Select;
// const provinceData = ['Zhejiang', 'Jiangsu'];
// const cityData = {
//     Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
//     Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
// };
//
// const App = () => {
//     const [cities, setCities] = React.useState(cityData[provinceData[0]]);
//     const [secondCity, setSecondCity] = React.useState(cityData[provinceData[0]][0]);
//
//     const handleProvinceChange = value => {
//         setCities(cityData[value]);
//         setSecondCity(cityData[value][0]);
//     };
//
//     const onSecondCityChange = value => {
//         setSecondCity(value);
//     };
//
//     return (
//         <>
//             <Select defaultValue={provinceData[0]} style={{ width: 120 }} onChange={handleProvinceChange}>
//                 {provinceData.map(province => (
//                     <Option key={province}>{province}</Option>
//                 ))}
//             </Select>
//             <Select style={{ width: 120 }} value={secondCity} onChange={onSecondCityChange}>
//                 {cities.map(city => (
//                     <Option key={city}>{city}</Option>
//                 ))}
//             </Select>
//         </>
//     );
// };
//
// ReactDOM.render(<App />, mountNode);