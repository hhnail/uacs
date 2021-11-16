import React, {useEffect, useRef, useState} from 'react'
import {
    Badge,
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    message,
    Modal,
    Select,
    Space,
    Table,
    TimePicker,
    Tooltip
} from 'antd'
import {RollbackOutlined} from '@ant-design/icons';
import {
    getApplicationList,
    updateApplicationInterview,
    updateApplicationState
} from "../../../../../services/applicationService";
import {ICON, OPTION_ICONS} from "../../../../../constants/icon";
import {APPLICATION_STATE} from "../../../../../constants/state";
import {useHistory} from "react-router-dom";
import qs from "querystring";
import ApplicationCalendar from "../../../../components/Calendar";
import {getInterviewAddress} from "../../../../../services/treeService";
import {getUserByAssociationId} from "../../../../../services/userService";

const {confirm} = Modal
const {Option} = Select


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
    // 当前安排面试的申请项
    const [arrangingItem, setArrangingItem] = useState({})
    // 当前选中的面试联系人
    const [arrangingContacterId, setArrangingContacterId] = useState('')
    const [interviewAddress, setInterviewAddress] = useState([])
    const [memberList, setMemberList] = useState([])

    // constans

    // life cycle
    useEffect(() => {
        getInterviewAddress().then(res => {
            const {data} = res.data
            // console.log('面试地点data')
            // console.log(data)
            setInterviewAddress(data)
        })
        refresh()
    }, [])

    useEffect(() => {
        console.log('当前操作项:')
        console.log(arrangingItem)
        if (arrangingItem.associationId) {
            getUserByAssociationId(arrangingItem.associationId).then(res => {
                setMemberList(res.data.data)
            })
        }

    }, [arrangingItem])

    // 刷新申请列表
    const refresh = () => {
        getApplicationList(userInfo.manageAssociationKeys).then(res => {
            const {data} = res.data
            setApplicationList(data)
        })
    }

    const handleApplicationUpdate = (applicationId, state) => {
        updateApplicationState(qs.stringify({applicationId, state})).then(() => {
            refresh()
            message.success('操作成功！')
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
                    <a href={`#/manage/review/joinAssociation/${item.applicationId}/1`}
                    >{name}</a>
                </Tooltip>;
            }
        },
        {
            title: '意向部门',
            dataIndex: 'departmentName',
            render(departmentName, item) {
                return (item.associationName + ' - ' + departmentName)
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
                    case APPLICATION_STATE.INTERVIEW_PASS.value:
                        return <Badge status="success" text={APPLICATION_STATE.INTERVIEW_PASS.name}/>
                    case APPLICATION_STATE.APPLY_REFUSE.value:
                        return <Badge status="error" text={APPLICATION_STATE.APPLY_REFUSE.name}/>
                    default:
                        return <Badge status="error" text="状态异常"/>
                }
            }
        },
        {
            title: '操作',
            render: (item) => {
                return <Space>
                    {(item.state === APPLICATION_STATE.APPLYING.value) &&
                    <Button size="small" type='primary' icon={OPTION_ICONS.ARRANGE}
                            onClick={() => {
                                setArrangingItem({...item})
                                setArrangeInterviewModalVisible(true)
                            }}>面试</Button>
                    }
                    {(item.state === APPLICATION_STATE.UN_INTERVIEW.value) &&
                    <Button size="small" type='primary' icon={OPTION_ICONS.ARRANGE}
                            onClick={() => {
                                Modal.confirm({
                                    title: `您确认要录用【${item.name}】为【${item.departmentName}】的一员吗？`,
                                    onOk: () => {
                                        handleApplicationUpdate(item.applicationId, APPLICATION_STATE.INTERVIEW_PASS.value)
                                    }
                                })
                            }}>录用</Button>
                    }
                    {(item.state === APPLICATION_STATE.UN_INTERVIEW.value || item.state === APPLICATION_STATE.APPLYING.value) &&
                    <Button size="small" danger icon={OPTION_ICONS.REFUSE}
                            onClick={() => {
                                Modal.confirm({
                                    title: `您确认要拒绝【${item.name}】的入团申请吗？`,
                                    onOk: () => {
                                        // TODO 填写拒绝回复理由
                                        handleApplicationUpdate(item.applicationId, APPLICATION_STATE.APPLY_REFUSE.value)
                                    }
                                })
                            }}>拒绝</Button>
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
            && <Modal title="面试安排" height={350}
                      visible={arrangeInterviewModalVisible}
                      onCancel={() => {
                          setArrangingItem({})
                          setArrangeInterviewModalVisible(false)
                      }}
                      onOk={() => {
                          arrangeInterviewFormRef.current.validateFields()
                              .then(value => {
                                  console.log('面试表单信息：')
                                  const data = {
                                      ...value,
                                      applicationId: arrangingItem.applicationId,
                                      departmentId: arrangingItem.departmentId,
                                      contacterId: arrangingContacterId,
                                      interviewAddress: value.interviewAddress.join('-'),
                                  }
                                  updateApplicationInterview(data).then(() => {
                                      refresh()
                                      setArrangeInterviewModalVisible(false)
                                  })
                              })
                      }}>
                <Form {...layout} name="arrangeInterviewModal" ref={arrangeInterviewFormRef}>
                    <Form.Item name='interviewDate' label="面试日期"
                               rules={[{required: true, message: '请选择面试日期！'}]}
                    >
                        <DatePicker/>
                    </Form.Item>
                    <Form.Item name='interviewTime' label="面试时间"
                               rules={[{required: true, message: '请选择面试时间！'}]}>
                        <TimePicker minuteStep={15} secondStep={10}/>
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
                               initialValue={arrangingItem.departmentName}>
                        <Input disabled={true}/>
                    </Form.Item>
                    <Form.Item name='contacterName' label="联系人"
                               rules={[{required: true, message: '请选择联系人'}]}>
                        <Select onChange={(value) => {
                            console.log('联系人ID：')
                            console.log(value)
                            setArrangingContacterId(value)
                        }}>
                            {memberList.map(user => {
                                return <Option value={user.userId}>{user.name}</Option>
                            })}
                        </Select>
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
