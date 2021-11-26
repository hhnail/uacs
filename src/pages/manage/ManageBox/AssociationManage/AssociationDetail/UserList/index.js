import {Avatar, Card, Col, List, Row, Space, Tag, Tooltip} from "antd";
import React, {useEffect, useState} from "react";
import {getUserByAssociationId} from "../../../../../../services/userService";
import {ICON} from "../../../../../../constants/icon";
import {GENDER_TYPE, ROLE_TYPE} from "../../../../../../constants/type";
import {USER_IMAGE_URL} from "../../../../../../constants/image";
import {useHistory} from "react-router-dom";

export default function UserList(props) {

    const history = useHistory()
    const [userList, setUserList] = useState([])

    const refreshUserList = () => {
        const associationId = props.associationId
        getUserByAssociationId(associationId)
            .then(res => {
                const {data} = res.data
                console.log('成员列表：')
                console.log(data)
                setUserList(data)

            })
    }

    useEffect(() => {
        refreshUserList()
    }, [props.associationId])


    const renderUserTitle = (user) => {
        let genderIcon = ''
        if (user.gender === GENDER_TYPE.BOY.label) {
            genderIcon = ICON.boy
        } else if (user.gender === GENDER_TYPE.GIRL.label) {
            genderIcon = ICON.girl
        } else {

        }

        let roleName = '社团成员'
        if (user.roleId) {
            switch (user.roleId) {
                case ROLE_TYPE.ASSOCIATION_ADMIN.key:
                    roleName = ROLE_TYPE.ASSOCIATION_ADMIN.name
                    break
                case ROLE_TYPE.STUDENT.key:
                    roleName = ROLE_TYPE.STUDENT.name
                    break
            }
        }
        return <>
            <Space>
                <Tag icon={ICON.member} color={'#cd201f'}>{roleName}</Tag>
                <Tooltip placement="topLeft" title={'点击查看TA的主页~'}>
                    <a onClick={() => {
                        history.push(`/manage/association/list/userHomePage/${user.userId}`)
                    }}
                    ><b>{user.name}</b></a>
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
                                avatar={<Avatar src={user.avatarUrl || USER_IMAGE_URL.DEFAULT.url}/>}
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



