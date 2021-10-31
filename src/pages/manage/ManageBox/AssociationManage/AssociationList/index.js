import React, {useEffect, useState} from 'react'
import {Button, Table} from 'antd';
import {getAllAssociationList} from "../../../../../services/db";


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
        title: '基本信息',
        dataIndex: 'info',
        ellipsis: true
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
    },
    {
        title: '状态',
        dataIndex: 'state',
    },
    {
        title: 'Action',
        render: () => <div>
            <Button>查看</Button>
            <Button dange>删除</Button>
        </div>
    },
];

export default function AssociationList(props) {

    const [dataSource, setDataSource] = useState([])

    useEffect(() => {
        getAllAssociationList().then(res => {
            console.log("社团列表：", res.data.data)
            setDataSource(res.data.data)
        })
    }, [])

    return (
        <div>
            <Table columns={columns} dataSource={dataSource}/>
        </div>
    )
}
