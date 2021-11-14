import {Button, Form, Input, Modal, Space, Table, Tag} from 'antd';
import {useEffect, useRef, useState} from "react";
import {getClassTree} from "../../../../../services/treeService";
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
                return (
                    <Space>
                        {item.level < 3 && <Button size={"small"} icon={OPTION_ICONS.ADD}>新增</Button>}
                        <Button size={"small"} icon={OPTION_ICONS.EDIT}>重命名</Button>
                        {item.children.length < 1 &&
                        <Button size={"small"} danger icon={OPTION_ICONS.DELETE}
                                onClick={() => {
                                    Modal.confirm({
                                        title: `确认删除【${item.label}】吗？`,
                                        icon: ICON.college,
                                        content: <>
                                        </>
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
                            width: 398,
                            icon: ICON.college,
                            content: <Form name="addCollege" form={addCollegeForm} ref={addCollegeRef}
                                           labelCol={{span: 6,}} wrapperCol={{span: 20,}} autoComplete="off">
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
                                        axios.post('/association/addTreeNode', {
                                            label: values.collegeName,
                                            type: TREE_NODE_TYPE.COLLEGE.value,
                                            pId: 0,
                                            description: values.url,
                                        }).then(() => {
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