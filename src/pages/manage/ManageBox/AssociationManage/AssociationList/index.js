import React, {useEffect, useState} from 'react'
import {Button, Space, Table} from 'antd';
import {getAllAssociationList} from "../../../../../services/db";
import {OPTION_ICONS} from "../../../../../constants/icon";
import {useHistory} from "react-router-dom";


export default function AssociationList(props) {

    const history = useHistory()
    const [dataSource, setDataSource] = useState([])

    useEffect(() => {
        getAllAssociationList().then(res => {
            const {data} = res.data
            setDataSource(data)
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
            render: (_, item) => <Space>
                <Button size='small' icon={OPTION_ICONS.VIEW} type='primary'
                        onClick={() => {
                            history.push(`/manage/association/list/${item.associationId}`)
                        }}>详情</Button>
                <Button danger size='small' icon={OPTION_ICONS.DELETE}>删除</Button>
            </Space>
        },
    ];

    return (
        <div>
            <Table columns={columns}
                   dataSource={dataSource}
                   pagination={{
                       pageSize: 7
                   }}
            />
        </div>
    )
}
