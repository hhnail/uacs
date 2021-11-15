import {Avatar, Card, Col, List, Row, Tag, Tooltip} from "antd";
import React, {useEffect, useState} from "react";
import {getUserByAssociationId} from "../../../../../../services/userService";
import {ICON} from "../../../../../../constants/icon";

export default function UserList(props) {

    const [userList, setUserList] = useState([])

    const refreshUserList = () => {
        const associationId = props.associationId
        getUserByAssociationId(associationId)
            .then(res => {
                const {data} = res.data
                // console.log('成员列表：')
                // console.log(data)
                setUserList(data)

            })
    }

    useEffect(() => {
        refreshUserList()
    }, [props.associationId])

    return <Row gutter={24}>
        <Col span={24}>
            <Card title="成员列表" bordered>
                <List
                    itemLayout="horizontal"
                    dataSource={userList}
                    renderItem={user => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src="https://joeschmoe.io/api/v1/random"/>}
                                title={<>
                                    <Tooltip placement="topLeft" title={'点击查看TA的主页~'}>
                                        <a href="/#"><b>{user.name}</b></a>
                                    </Tooltip>
                                    <Tag icon={ICON.member}
                                         color={'#cd201f'}
                                         style={{
                                             marginLeft:10
                                         }}
                                    >
                                        社团成员
                                    </Tag>
                                </>}
                                description={`个性签名：${user.personalSignature || '该成员很懒，没有签名哦~'}`}
                            />
                        </List.Item>
                    )}
                />,

            </Card>
        </Col>
    </Row>
}



