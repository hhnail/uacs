// TODO 抽取每一步的组件
// import {Button, Form, Input, InputNumber, Space} from "antd";
// import locale from "antd/es/date-picker/locale/zh_CN";
// import moment from "moment";
//
//
// export default function BaseInfo(props){
//
//     const currentStep = props
//
//     return(
//         <div style={currentStep === 0 ? {} : {display: 'none',}}>
//             <Form
//                 name="basic"
//                 labelCol={{span: 4,}}
//                 wrapperCol={{span: 20,}}
//                 ref={baseInfoForm}
//             >
//                 <Form.Item
//                     label="纳新标题"
//                     name="title"
//                     rules={[
//                         {
//                             required: true,
//                             message: '请输入纳新标题',
//                         },
//                     ]}
//                 >
//                     <Input type="text"/>
//                 </Form.Item>
//                 <Form.Item label="纳新人数" name="num">
//                     <Space>
//                         <InputNumber min={1} max={30} value={value} onChange={setValue}/>
//                         <Button
//                             type="ghost"
//                             onClick={() => {
//                                 setValue(30);
//                             }}
//                         >重置</Button>
//                     </Space>
//                 </Form.Item>
//                 <Form.Item label="纳新起始时间" name="timeRange">
//                     <Space direction="vertical" size={12}>
//                         <RangePicker
//                             locale={locale}
//                             ranges={{
//                                 '今天': [moment(), moment()],
//                                 '本月': [moment().startOf('month'), moment().endOf('month')],
//                             }}
//                             onChange={onChange}
//                         />
//                     </Space>
//                 </Form.Item>
//                 <Form.Item label="备注"name="message">
//                     <TextArea rows={4} placeholder={"若需求请填写备注信息"}/>
//                 </Form.Item>
//             </Form>
//         </div>
//     )
// }