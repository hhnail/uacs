import {Space, Switch, Table} from 'antd';
import {useState} from "react";
import {MAJORANDCLASS4Table} from "../../../../constants/baseInfo";

const columns = [
    {
        title: '序号',
        dataIndex: 'key',
    },
    {
        title: '名称',
        dataIndex: 'title',
    },
    {
        title: '学院首页',
        dataIndex: 'url',
        render(url) {
            return <a href={url}>{url}</a>
        }
    },
];

const data = MAJORANDCLASS4Table;


export default function ClassList() {

    const [checkStrictly, setCheckStrictly] = useState(false);

    return (
        <div>
            <Space align="center" style={{marginBottom: 16}}>
                严格匹配: <Switch checked={checkStrictly} onChange={setCheckStrictly}/>
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
                pagination={{pageSize: 7}}
            />
        </div>
    )
}