import React, {useEffect, useState} from 'react'
import {Button, Space, Table} from 'antd';
import {getAllAssociationList} from "../../../../../services/db";
import {OPTION_ICONS} from "../../../../../constants/icon";


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
        title: '操作',
        render: () => <Space>
            <Button size='small' icon={OPTION_ICONS.VIEW} type='ghost'
                    onClick={() => {

                    }}>查看</Button>
            <Button danger size='small' icon={OPTION_ICONS.DELETE}>删除</Button>
        </Space>
    },
];

export default function AssociationList(props) {

    const [dataSource, setDataSource] = useState([])

    useEffect(() => {
        getAllAssociationList().then(res => {
            const {data} = res.data
            setDataSource(data)
        })
    }, [])

    return (
        <div>
            <Table columns={columns}
                   dataSource={dataSource}
            />
        </div>
    )
}
