import {Table, Switch, Space} from 'antd';
import {useState} from "react";

const columns = [
    {
        title: '序号',
        dataIndex: 'key',
    },
    {
        title: '标签名称',
        dataIndex: 'tagName',
    },
    {
        title: '标签类别',
        dataIndex: 'tagType',
    },
];

const data = [
    {
        key: 1,
        tagName: '运动类',
        tagType: '标签类别',
        children: [
            {
                key: 11,
                tagName: '篮球',
                tagType: '标签项',
            },
            {
                key: 12,
                tagName: '足球',
                tagType: '标签项',
            },
        ]
    },
    {
        key: 2,
        tagName: '艺术类',
        tagType: '标签类别',
        children: [
            {
                key: 21,
                tagName: '钢琴',
                tagType: '标签项',
            },
            {
                key: 22,
                tagName: '吉他',
                tagType: '标签项',
            },
        ],
    },
];

export default function UserTagList() {

    const [checkStrictly, setCheckStrictly] = useState(false);

    return (
        <div>
            <Space align="center" style={{marginBottom: 16}}>
                CheckStrictly: <Switch checked={checkStrictly} onChange={setCheckStrictly}/>
            </Space>
            <Table
                columns={columns}
                rowSelection={{
                    onChange: (selectedRowKeys, selectedRows) => {
                        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                    },
                    onSelectAll: (selected, selectedRows, changeRows) => {
                        console.log(selected, selectedRows, changeRows);
                    }, checkStrictly
                }}
                dataSource={data}
            />
        </div>
    )
}