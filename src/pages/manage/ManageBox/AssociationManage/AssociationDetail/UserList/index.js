import {Avatar, Card, Col, List, Row, Space, Tag, Tooltip} from "antd";
import React, {useEffect, useState} from "react";
import {getUserByAssociationId} from "../../../../../../services/userService";
import {ICON} from "../../../../../../constants/icon";
import {GENDER_TYPE} from "../../../../../../constants/type";

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


    const renderUserTitle = (user) => {
        let genderIcon = ''
        // console.log(user.gender)
        if(user.gender === GENDER_TYPE.BOY.label){
            genderIcon = ICON.boy
        }else if (user.gender === GENDER_TYPE.GIRL.label){
            genderIcon = ICON.girl
        }else{

        }
        return <>
            <Space>
                <Tag icon={ICON.member}color={'#cd201f'}>社团成员</Tag>
                <Tooltip placement="topLeft" title={'点击查看TA的主页~'}>
                    <a href="/#"><b>{user.name}</b></a>
                </Tooltip>
                {genderIcon}
            </Space>

        </>
    }

    return <Row gutter={24}>
        <Col span={24}>
            <Card title="成员列表" bordered>
                <List
                    itemLayout="horizontal"
                    dataSource={userList}
                    renderItem={user => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src="http://localhost:7100/association/getImageById/794543bb675b4e8ca09757b069dc8b01"/>}
                                title={renderUserTitle(user)}
                                description={`个性签名：${user.personalSignature || '该成员很懒，没有签名哦~'}`}
                            />
                        </List.Item>
                    )}
                />,

            </Card>
        </Col>
    </Row>
}



