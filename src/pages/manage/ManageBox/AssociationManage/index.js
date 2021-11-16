import React, {useEffect, useState} from 'react'
import {Button, Space, Table} from 'antd';
import {getAssociationAsMember} from "../../../../services/db";
import {OPTION_ICONS} from "../../../../constants/icon";
import {useHistory} from "react-router-dom";
import {getAssociationStateLabelByKey, getAssociationTypeLabel} from "../../../../constants/state";

export default function AssociationList(props) {

    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    const isSuperAdmin = false

    const history = useHistory()
    const [dataSource, setDataSource] = useState([])


    useEffect(() => {
        // getAllAssociationList().then(res => {
        getAssociationAsMember(userInfo.userId).then(res => {
            const {data} = res.data
            // console.log('社团列表：')
            // console.log(data)
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
