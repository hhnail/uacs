import React, { Component } from 'react'
import { Avatar, Card } from 'antd'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;

export default class AssociationCard extends Component {
    render() {
        return (
            <Card
                style={{ width: 300 }}
                cover={
                    <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                }
                actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
                ]}
                hoverable={true}
            >
                <Meta 
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title="工商管理学院辩论队"
                    description="This is the description"
                    />
            </Card>
        )
    }
}
