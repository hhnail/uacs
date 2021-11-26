import React, {useEffect, useState} from 'react'
import {Button, Checkbox, Form, Input, message, Modal, Select, Space, Table} from 'antd';
import {
    checkAssociationExist,
    getAssociationAsMember,
    getAssociationType,
    getUserById,
    saveAssociation
} from "../../../../services/db";
import {OPTION_ICONS} from "../../../../constants/icon";
import {useHistory} from "react-router-dom";
import {getAssociationTypeLabel} from "../../../../constants/state";
import axios from "axios";

const {Option} = Select;

export default function AssociationList(props) {

    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    const isSuperAdmin = userInfo.isSuperAdmin

    const history = useHistory()
    const [dataSource, setDataSource] = useState([])
    const [associationType, setAssociationType] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [addAssociationForm] = Form.useForm()

    const refreshAssociationList = () => {
        getAssociationAsMember(userInfo.userId).then(res => {
            const {data} = res.data
            // console.log('社团列表：')
            // console.log(data)
            setDataSource(data)
        })
    }

    useEffect(() => {
        refreshAssociationList()
        getAssociationType().then(res => {
            const {data} = res.data
            setAssociationType(data)
        })

    }, [])


    const columns = [
        {
            title: '社团编号',
            dataIndex: 'associationId',
            key: 'associationId',
            render(associationId) {
                return <b>{associationId}</b>
            }
        },
        {
            title: '社团名称',
            dataIndex: 'associationName',
        },
        {
            title: '担任职位',
            dataIndex: 'roleName',
        },
        {
            title: '类型',
            dataIndex: 'type',
            render: (type) => {
                return <span>{getAssociationTypeLabel(type)}</span>
            }
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
        },
        // isSuperAdmin && {
        //     title: '状态',
        //     dataIndex: 'state',
        //     render: (type) => {
        //         return <span>{getAssociationStateLabelByKey(type)}</span>
        //     }
        // },
        {
            title: '操作',
            render: (_, item) => <Space>
                <Button size='small' icon={OPTION_ICONS.VIEW} type='primary'
                        onClick={() => {
                            history.push(`/manage/association/list/${item.associationId}`)
                        }}>详情</Button>
                {isSuperAdmin
                && <Button danger size='small' icon={OPTION_ICONS.REFUSE}>冻结</Button>}
            </Space>
        },
    ];

    return (
        <div>
            {isSuperAdmin
            && <Button type={'primary'} size={"middle"} style={{}}
                       onClick={() => {
                           setModalVisible(true)
                       }}
            >
                新增社团
            </Button>
            }
            <Table columns={columns}
                   dataSource={dataSource}
                   pagination={{
                       pageSize: 7
                   }}
            />
            <Modal visible={modalVisible}
                   onOk={() => {
                       addAssociationForm.validateFields().then(value => {
                           // console.log('value')
                           // console.log(value)
                           const formattedData = {
                               ...value,
                           }
                           saveAssociation(formattedData).then(res => {
                               if (res.data.code == 1) {
                                   message.error('创建失败，请检查表单内容是否合法！')
                                   return
                               }
                               setModalVisible(false)
                               refreshAssociationList()
                               message.success('创建成功！')
                           }).catch(() => {
                               setModalVisible(false)
                           })
                       })
                   }}
                   onCancel={() => {
                       setModalVisible(false)
                   }}>
                <Form name="addAssociationForm"
                      form={addAssociationForm}
                      labelCol={{
                          span: 6,
                      }}
                      wrapperCol={{
                          span: 16,
                      }}
                      autoComplete="off"
                      style={{
                          marginTop: 20
                      }}
                >
                    <Form.Item label="社团名称" name="associationName"
                               rules={[{required: true, message: '请输入社团名称！',},]}>
                        <Input.Search allowClear placeholder={'请输入社团名称'}
                                      onSearch={(value) => {
                                          checkAssociationExist(value).then(res => {
                                              const isExist = res.data.data
                                              if (isExist) {
                                                  message.error("该社团已经存在！")
                                              } else {
                                                  message.success("名称可用！")
                                              }
                                          })
                                      }}
                        />
                    </Form.Item>
                    <Form.Item label="隶属单位" name="adminUnit"
                               rules={[{required: true, message: '请输入隶属单位！',},]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="社团类型" name="type"
                               rules={[{required: true, message: '请选择社团类型！',},]}>
                        <Select defaultActiveFirstOption style={{width: '100%'}}>
                            {associationType.length > 0 && associationType.map(item => {
                                return <Option value={item.value}>{item.label}</Option>
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item label="社团管理员" name="userId"
                               rules={[{required: true, message: '请输入用户学号！',},]}>
                        <Input.Search allowClear placeholder={'请输入用户学号'}
                                      onSearch={(value) => {
                                          getUserById(value).then(res => {
                                              if (res.data.code === 1) {
                                                  message.error("用户不存在！")
                                              } else {
                                                  message.success("用户可用！")
                                              }
                                          })
                                      }}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
