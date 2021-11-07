import React, {useState} from 'react'
import {
    Anchor,
    Avatar,
    Badge,
    Card,
    Cascader,
    Col,
    DatePicker,
    Descriptions,
    Form,
    Image,
    Input,
    Row, Select,
    Slider
} from 'antd';
import {EditOutlined, EllipsisOutlined, SettingOutlined} from '@ant-design/icons';
import {COLLEGE, MAJORANDCLASS} from "../../../../../constants/baseInfo";


// antd组件结构
const {TextArea} = Input;
const {Link} = Anchor;
const {Meta} = Card;
const {Option} = Select

export default function Resume() {

    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    const [isEdit, setIsEdit] = useState(false)


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
                    <Link href="#components-anchor-demo-static" title="个人优势"/>
                    <Link href="#components-anchor-demo-static" title="大学期望"/>
                    <Link href="#components-anchor-demo-static" title="校园经历"/>
                    <Link href="#API" title="哈哈哈哈">
                        <Link href="#Anchor-Props" title="嘻嘻嘻嘻嘻"/>
                        <Link href="#Link-Props" title="嘿嘿嘿嘿"/>
                    </Link>
                </Anchor>
            </div>

            {/* ============== 中侧简历展示区 ==================== */}
            <div style={{width: '70%'}}>
                <Row>
                    <Col span={18}>
                        <Descriptions column={7} bordered={true} size={'small'}>
                            <Descriptions.Item label="姓名" span={3}>
                                <Form.Item name='name' rules={[{required: true}]}>
                                    <Input defaultValue={userInfo?.name}/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="学号" span={4}>
                                {userInfo?.userId}
                            </Descriptions.Item>
                            <Descriptions.Item label="院系" span={3} style={{height: 10}}>
                                <Form.Item name='college' style={{height: 10}}>
                                    <Select style={{width: '100%'}}>
                                        {COLLEGE.map(college => {
                                            return <Option value={college.value}>{college.value}</Option>
                                        })}
                                    </Select>
                                </Form.Item>
                            </Descriptions.Item>
                            <Descriptions.Item label="专业班级" span={4} style={{height: 5}}>
                                <Form.Item name={'majorAndClass'} style={{height: 5}}>
                                    <Cascader options={MAJORANDCLASS}
                                              defaultValue={['学院', '专业', '班级']}
                                        // value={}
                                              onChange={(value) => {
                                                  console.log(value)
                                              }}/>
                                </Form.Item>
                            </Descriptions.Item>
                            <Descriptions.Item label="联系方式" span={3}>
                                <Form.Item name={'phone'}
                                           rules={[{required: true}]}>
                                    <Input defaultValue={userInfo?.phone}/>
                                </Form.Item>
                            </Descriptions.Item>
                            <Descriptions.Item label="生日" span={3}
                                               labelStyle={{width: 90}}
                                               style={{
                                                   height: 5,
                                                   width: 10
                                               }}
                            >
                                <DatePicker locale bordered={false} placeholder="请选择生日"
                                    // style={{height: 5, width: 130}}
                                />
                            </Descriptions.Item>
                        </Descriptions>
                    </Col>
                    <Col span={6}>
                        <Image width={190} height={190}
                               src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"/>
                    </Col>
                </Row>

                {/* ====== 描述信息 ======  */}
                <Descriptions bordered={true} column={24} size={'small'}>
                    <Descriptions.Item label="微信" span={5} style={{height: 8}}>
                        <Form.Item name={'college'} style={{height: 8}}
                                   rules={[{required: true}]}>
                            <Input defaultValue={userInfo?.wechat}/>
                        </Form.Item>
                    </Descriptions.Item>
                    <Descriptions.Item label="QQ" span={5} style={{height: 8}}>
                        <Form.Item name={'qq'} style={{height: 8}}
                                   rules={[{required: true}]}>
                            <Input defaultValue={userInfo?.qq}/>
                        </Form.Item>
                    </Descriptions.Item>
                    <Descriptions.Item label="邮箱" span={5} labelStyle={{width: 90, height: 8}}>
                        <Form.Item name={'email'} style={{height: 8}}
                                   rules={[{required: true}]}>
                            <Input defaultValue={userInfo?.email}/>
                        </Form.Item>
                    </Descriptions.Item>
                    <Descriptions.Item label="性别" span={9} style={{width: 50, height: 8}} labelStyle={{width: 90}}>
                        <Form.Item name={'gender'} style={{width: 50, height: 8}}>
                            <Input defaultValue={userInfo?.gender}/>
                        </Form.Item>
                    </Descriptions.Item>
                    <Descriptions.Item label="兴趣爱好" span={24} labelStyle={{width: 135}} style={{height: 45}}>
                        <Form.Item name={'like'} style={{height: 30}}>
                            <TextArea rows={2}/>
                        </Form.Item>
                    </Descriptions.Item>
                    <Descriptions.Item label="自我评价" span={24}>
                        <Form.Item name={'selfProfile'}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                            }}>
                                <div style={{width: '50%'}}>
                                    沟通能力：<Slider defaultValue={80} disabled={false}/>
                                    表达能力：<Slider defaultValue={80} disabled={false}/>
                                </div>
                                <div style={{width: '50%'}}>
                                    合作能力：<Slider defaultValue={80} disabled={false}/>
                                    抗压能力：<Slider defaultValue={80} disabled={false}/>
                                </div>
                            </div>
                            <TextArea rows={4}/>
                        </Form.Item>
                    </Descriptions.Item>
                    <Descriptions.Item label="大学的期望" span={24} style={{height: 95}}>
                        <Form.Item name={'expectation'} style={{height: 95}}>
                            <TextArea rows={5}/>
                        </Form.Item>
                    </Descriptions.Item>
                </Descriptions>
            </div>

            {/* ================== 右侧卡片展示区 ======================*/}
            <div style={{width: '20%'}}>
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