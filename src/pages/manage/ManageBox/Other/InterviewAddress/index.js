import {Table} from 'antd';
import {useEffect, useState} from "react";
import {getInterviewAddress} from "../../../../../services/treeService";


export default function InterviewAddress() {

    const [interviewAddressData, setInterviewAddressData] = useState([])

    useEffect(() => {
        getInterviewAddress().then(res => {
            const {data} = res.data
            const formattedData = formatDataSource(data)
            setInterviewAddressData(formattedData)
        })
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
        },
    ];

    return (
        <>
            <Table columns={columns} dataSource={interviewAddressData}
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