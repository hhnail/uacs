import React, {useEffect, useRef, useState} from 'react'
import {Badge, Button, Cascader, DatePicker, Form, Input, message, Modal, Space, Table, Tooltip} from 'antd'
import {RollbackOutlined} from '@ant-design/icons';
import {getApplicationList, updateApplicationState} from "../../../../../services/applicationService";
import {ICON, OPTION_ICONS} from "../../../../../constants/icon";
import {APPLICATION_STATE} from "../../../../../constants/state";
import {useHistory} from "react-router-dom";
import qs from "querystring";
import ArrangeInterviewForm from "../../../../components/ArrangeInterviewForm";
import ApplicationCalendar from "../../../../components/Calendar";
import axios from "axios";
import {getInterviewAddress} from "../../../../../services/treeService";

const {confirm} = Modal


const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 20,
    },
};
export default function ApplicationList() {

    // localStorage
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    // hooks
    const history = useHistory()
    const [applicationList, setApplicationList] = useState([])
    const arrangeInterviewFormRef = useRef(null)
    const [arrangeInterviewModalVisible, setArrangeInterviewModalVisible] = useState(false)
    const [arrangingItem, setArrangingItem] = useState({})
    const [interviewAddress, setInterviewAddress] = useState([])

    // constans

    // life cycle
    useEffect(() => {
        getInterviewAddress()
            .then(res => {
                const {data} = res.data
                setInterviewAddress(data)
            })
        refresh()
    }, [])

    const refresh = () => {
        getApplicationList(userInfo.manageAssociationKeys).then(res => {
            const {data} = res.data
            setApplicationList(data)
        })
    }

    const handleApplicationUpdate = (applicationId, state) => {
        updateApplicationState(qs.stringify({applicationId, state}))
            .then(() => {
                Modal.destroyAll()
                refresh()
                message.success('更新成功！')
            })
    }

    const columns = [
        {
            title: '编号',
            dataIndex: 'applicationId',
            render(applicationId) {
                return <b>{applicationId}</b>;
            }
        },
        {
            title: '申请人',
            dataIndex: 'name',
            render(name, item) {
                return <Tooltip title="点击查看详情">
                    <a href={`#/manage/review/joinAssociation/${item.applicationId}`}
                    >{name}</a>
                </Tooltip>;
            }
        },
        {
            title: '意向部门',
            dataIndex: 'intentionDepartment',
            render(intentionDepartment, item) {
                return (item.associationName + ' - ' + intentionDepartment)
            }
        },
        {
            title: '申请时间',
            dataIndex: 'applicationTime',
            render(applicationTime) {
                return (applicationTime)
            }
        },
        {
            title: '状态',
            dataIndex: 'state',
            render(state) {
                switch (state) {
                    case APPLICATION_STATE.UN_COMMIT.value:
                        return <Badge status="warning" text={APPLICATION_STATE.UN_COMMIT.name}/>
                    case APPLICATION_STATE.APPLYING.value:
                        return <Badge status="processing" text={APPLICATION_STATE.APPLYING.name}/>
                    case APPLICATION_STATE.INTERVIEW_INVITING.value:
                        return <Badge status="success" text={APPLICATION_STATE.INTERVIEW_INVITING.name}/>
                    case APPLICATION_STATE.UN_INTERVIEW.value:
                        return <Badge status="processing" text={APPLICATION_STATE.UN_INTERVIEW.name}/>
                    default:
                        return <Badge status="error" text="状态异常"/>
                }
            }
        },
        {
            title: '操作',
            render: (item) => {
                return <Space>
                    {(item.state === APPLICATION_STATE.APPLYING.value || item.state === APPLICATION_STATE.UN_INTERVIEW.value) &&
                    <Button size="small" type='primary' icon={OPTION_ICONS.ARRANGE}
                            onClick={() => {
                                setArrangingItem({...item})
                                setArrangeInterviewModalVisible(true)
                            }}>面试</Button>
                    }
                    {item.state === APPLICATION_STATE.INTERVIEW_INVITING.value &&
                    <Button size="small" danger icon={<RollbackOutlined/>}
                            onClick={() => {
                                Modal.confirm({
                                    title: '确认撤销面试邀请吗？',
                                    onOk: () => {
                                        handleApplicationUpdate(item.applicationId, APPLICATION_STATE.APPLYING.value)
                                    }
                                })
                            }}>撤销</Button>
                    }
                </Space>
            }
        },
    ]

    return (
        <div>
            <Button type='primary'
                    onClick={() => {
                        Modal.info({
                            title: '面试安排日历',
                            width: 1500,
                            icon: ICON.calendar,
                            content: <ApplicationCalendar/>
                        })
                    }}
            >查看面试安排日历</Button>
            <Table
                dataSource={applicationList}
                columns={columns}
                pagination={{
                    pageSize: 6
                }}
                rowKey={item => item.applicationId}
            />


            {/* === 面试安排模态框 === */}
            {arrangeInterviewModalVisible
            && <Modal title="面试安排" visible={arrangeInterviewModalVisible}
                      height={350}
                      onCancel={() => {
                          setArrangingItem({})
                          setArrangeInterviewModalVisible(false)
                      }}
                      onOk={() => {
                          arrangeInterviewFormRef .then(value => {

                              //update
                              // setArrangeInterviewModalVisible(false)
                          })
                      }}>
                <Form {...layout} name="arrangeInterviewModal">
                    <Form.Item name='interviewTime' label="面试时间"
                               rules={[{required: true, message: '请选择面试时间'}]}
                    >
                        <DatePicker/>
                    </Form.Item>
                    <Form.Item name='interviewAddress' label="面试地点"
                               rules={[{required: true, message: '请选择面试地点'}]}
                               initialValue={['集大本部', '美岭楼', '美岭201']}
                    >
                        {
                            interviewAddress.length > 0
                            && <Cascader options={interviewAddress}/>
                        }
                    </Form.Item>
                    <Form.Item name='intentionDepartment' label="意向部门"
                               initialValue={arrangingItem.intentionDepartment}>
                        <Input disabled={true}/>
                    </Form.Item>
                    <Form.Item name='contacterName' label="联系人"
                               rules={[{required: true, message: '请选择联系人'}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name='contacterPhone' label="联系方式">
                        <Input/>
                    </Form.Item>
                    <Form.Item name='description' label="备注">
                        <Input.TextArea/>
                    </Form.Item>
                </Form>
            </Modal>
            }
        </div>
    )

}
