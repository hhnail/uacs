import React, {useContext, useEffect, useRef, useState} from 'react';
import {Button, Form, Input, Popconfirm, Table} from 'antd';
import {USER_TAG_LIST} from "../../constants/baseInfo";

const EditableContext = React.createContext(null);

// 可编辑行
const EditableRow = ({index, ...props}) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

// 可编辑单元格
const EditableCell = ({
                          title,
                          editable,
                          children,
                          dataIndex,
                          record,
                          handleSave,
                          ...restProps
                      }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({...record, ...values});
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save}/>
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};


export default function EditableTable() {

    // 表格结构
    const [columns, setCloumns] = useState([
        {
            title: '标签名',
            dataIndex: 'tagName',
            width: '50%',
            onCell: (record) => ({
                record,
                editable: true,
                dataIndex: 'tagName',
                title: '标签名',
                handleSave: handleSave,
            }),
        },
        {
            title: '标签类别',
            dataIndex: 'tagType',
            width: '25%',
            onCell: (record) => ({
                record,
                editable: true,
                dataIndex: 'tagType',
                title: '标签类别',
                handleSave: handleSave,
            }),
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <Popconfirm title="您确认要删除吗?" onConfirm={() => handleDelete(record.key)}>
                        <a>删除</a>
                    </Popconfirm>
                ) : null,
        },
    ])

    // 行的数量
    const [count, setCount] = useState(0)

    // 模拟数据。可结合useEffect从后台数据库获取真实数据
    const [dataSource, setDataSource] = useState(USER_TAG_LIST)

    // useEffect(() => {
    //     axios.get("http://localhost:3000/userTag")
    //         .then(res => {
    //             const {data} = res
    //             console.log("==1 data", data)
    //             setDataSource(data)
    //             // console.log("==2 dataSource", dataSource)
    //             setCount(data.length)
    //         })
    //         .catch(err => {
    //             console.log("EditableCell err", err)
    //         })
    // },[])


    // 删除行
    const handleDelete = (key) => {
        setDataSource(dataSource.filter((item) => item.key !== key))
    };

    // 新增行
    const handleAdd = () => {
        const newData = {
            key: count,
            tagName: `标签 ${count}`,
            tagType: '自定义',
        };
        setDataSource([...dataSource, newData])
        setCount(count + 1)
    };


    // 保存行
    const handleSave = (row) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {...item, ...row});
        setDataSource(newData)
    };


    return (
        <div>
            <Button
                onClick={handleAdd}
                type="primary"
                style={{
                    marginBottom: 16,
                }}
            >
                新增一行
            </Button>
            <Table
                components={{
                    body: {
                        row: EditableRow,
                        cell: EditableCell,
                    },
                }}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                columns={columns}
            />
        </div>
    );
}