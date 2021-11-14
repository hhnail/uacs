import {Button, Form, Input, message, Modal, Space, Table, Tag} from 'antd';
import {useEffect, useRef, useState} from "react";
import {addTreeNode, deleteTreeNode, getClassTree} from "../../../../../services/treeService";
import {ICON, OPTION_ICONS} from "../../../../../constants/icon";
import {TREE_NODE_TYPE} from "../../../../../constants/type";
import axios from "axios";

export default function ClassList() {

    const [classTreeData, setClassTreeData] = useState([])
    const [addingCollegeName, setAddingCollegeName] = useState('')
    const [addCollegeForm] = Form.useForm()
    const addCollegeRef = useRef()

    const refreshTree = () => {
        getClassTree()
            .then(res => {
                const {data} = res.data
                const formattedData = formatDataSource(data)
                setClassTreeData(formattedData)
            })
    }

    useEffect(() => {
        refreshTree()
    }, [])


    const formatDataSource = (respData) => {
        respData.map(item1 => {
            if (item1.children.length === 0) {
                item1.children = ''
            } else {
                item1.children.map(item2 => {
                    if (item2.children.length === 0) {
                        item2.children = ''
                    } else {
                        item2.children.map(item3 => {
                            if (item3.children.length === 0) {
                                item3.children = ''
                            }
                        })
                    }
                })
            }
        })
        return respData
    }


    const columns = [
        {
            title: '序号',
            dataIndex: 'treeId',
        },
        {
            title: '名称',
            dataIndex: 'label',
            render: (label, item) => {
                return (
                    <Space>
                        {label}

                        {item.type === TREE_NODE_TYPE.COLLEGE.value
                        && <Tag icon={ICON.college} color={'#cd201f'}>学院</Tag>}

                        {item.type === TREE_NODE_TYPE.MAJOR.value
                        && <Tag icon={ICON.major} color={'#55acee'}>专业</Tag>}

                        {item.type === TREE_NODE_TYPE.CLASS.value
                        && <Tag icon={ICON.class} color={'#3b5999'}>班级</Tag>}
                    </Space>
                )
            }
        },
        {
            title: '学院官网',
            dataIndex: 'description',
            render: (description) => {
                return <a>{description}</a>
            }
        },
        {
            title: '操作',
            render: (_, item) => {
                let nodeName = ''
                if (item.type === TREE_NODE_TYPE.COLLEGE.value) {
                    nodeName = '专业'
                } else if (item.type === TREE_NODE_TYPE.MAJOR.value) {
                    nodeName = '班级'
                }
                const type = item.type === TREE_NODE_TYPE.COLLEGE.value ? TREE_NODE_TYPE.MAJOR.value : TREE_NODE_TYPE.CLASS.value
                const pid = item.treeId
                return (
                    <Space>
                        {item.level < 3
                        && <Button size={"small"} icon={OPTION_ICONS.ADD}
                                   onClick={() => {
                                       console.log('当前item：')
                                       console.log(item)
                                       Modal.confirm({
                                           title: `新增${nodeName}`,
                                           width: 498,
                                           icon: ICON.college,
                                           content: <Form name={`add${nodeName}`} form={addCollegeForm}
                                                          ref={addCollegeRef}
                                                          labelCol={{span: 6,}} wrapperCol={{span: 18,}}
                                                          autoComplete="off"
                                                          style={{
                                                              margin: '30px 0px 30px 0px'
                                                          }}
                                           >
                                               <Form.Item
                                                   label={`${nodeName}名称`}
                                                   name='treeNodeName'
                                                   rules={[
                                                       {
                                                           required: true,
                                                           message: `请输入${nodeName}名称`,
                                                       },
                                                   ]}
                                               >
                                                   <Input placeholder={`请输入${nodeName}名称`}/>
                                               </Form.Item>
                                           </Form>,
                                           onOk: () => {
                                               addCollegeForm.validateFields()
                                                   .then(values => {
                                                       const data = {label: values.treeNodeName, type, pid,}
                                                       addTreeNode(data)
                                                           .then(() => {
                                                               message.success("新增成功！")
                                                               refreshTree()
                                                           })
                                                   }).finally(() => {
                                                   addCollegeRef.current.resetFields()
                                               })
                                           }
                                       })
                                   }}
                        >新增{nodeName}</Button>}

                        <Button size={"small"} icon={OPTION_ICONS.EDIT}

                        >重命名</Button>

                        {item.children.length < 1 &&
                        <Button size={"small"} danger icon={OPTION_ICONS.DELETE}
                                onClick={() => {
                                    Modal.confirm({
                                        title: `确认删除【${item.label}】吗？`,
                                        icon: ICON.college,
                                        onOk: () => {
                                            deleteTreeNode(item.treeId)
                                                .then(() => {
                                                    message.success("删除成功！")
                                                    refreshTree()
                                                })
                                        }
                                    })
                                }}
                        >删除</Button>}
                    </Space>
                )
            }
        },
    ];

    return (
        <>
            <Button type='primary' style={{marginBottom: 20}}
                    onClick={() => {
                        Modal.confirm({
                            title: '新增学院',
                            width: 498,
                            icon: ICON.college,
                            content: <Form name="addCollege" form={addCollegeForm} ref={addCollegeRef}
                                           labelCol={{span: 6,}} wrapperCol={{span: 18,}} autoComplete="off"
                                           style={{
                                               margin: '30px 0px 30px 0px'
                                           }}
                            >
                                <Form.Item
                                    label="学院名称"
                                    name="collegeName"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入学院名称！',
                                        },
                                    ]}
                                >
                                    <Input placeholder={'请输入学院名称'}/>
                                </Form.Item>
                                <Form.Item label="学院官网" name="url">
                                    <Input placeholder={'请输入学院官网'}/>
                                </Form.Item>
                            </Form>,
                            onOk: () => {
                                addCollegeForm.validateFields()
                                    .then(values => {
                                        const data = {
                                            label: values.collegeName,
                                            type: TREE_NODE_TYPE.COLLEGE.value,
                                            pid: 0,
                                            description: values.url,
                                        }
                                        addTreeNode(data)
                                            .then(() => {
                                                refreshTree()
                                            })
                                    }).finally(() => {
                                    addCollegeRef.current.resetFields()
                                })
                            }
                        })
                    }}
            >
                新增学院
            </Button>
            <Table columns={columns} dataSource={classTreeData}
                   pagination={{
                       pageSize: 7
                   }}
                   rowKey={item => item.treeId}
                   rowSelection={{
                       onChange: (selectedRowKeys, selectedRows) => {

                       },
                       onSelectAll: (selected, selectedRows, changeRows) => {

                       },
                   }}

            />
        </>
    )
}