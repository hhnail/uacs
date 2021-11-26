import {Col, Descriptions, Image, Row} from "antd";
import React, {useEffect, useState} from "react";
import {getAssociationImageUrl} from "../../../../../../services/imageService";
import {IMAGE_TYPE} from "../../../../../../constants/type";
import {getUserById} from "../../../../../../services/db";

export default function MemberResume(props) {

    const {userId} = props.match.params
    const [userInfo, setUserInfo] = useState()
    const [userIdPhoto, setUserIdPhoto] = useState()

    useEffect(() => {
        getAssociationImageUrl(IMAGE_TYPE.USER_ID_PHOTO.value, userId).then(res => {
            const images = res.data.data
            setUserIdPhoto(images[0])
        })
        getUserById(userId).then(res => {
            const {data} = res.data
            setUserInfo(data)
        })
    }, [])


    return <>
        {userInfo && userIdPhoto
        && <>
            <Row>
                <Col span={18}>
                    <Descriptions column={7} bordered={true} size={'small'}>
                        <Descriptions.Item label="姓名" span={3}> {userInfo.name} </Descriptions.Item>
                        <Descriptions.Item label="学号" span={4}>{userInfo.userId}
                        </Descriptions.Item>
                        <Descriptions.Item label="专业班级"
                                           span={7}>{userInfo.collegeMajorClass} </Descriptions.Item>
                        <Descriptions.Item label="联系方式" span={3}>{userInfo?.phone}</Descriptions.Item>
                        <Descriptions.Item label="邮箱" span={4}>{userInfo.email}</Descriptions.Item>
                        <Descriptions.Item label="微信" span={3}>{userInfo.wechat} </Descriptions.Item>
                        <Descriptions.Item label="QQ" span={3}>{userInfo.qq}</Descriptions.Item>
                    </Descriptions>
                </Col>
                {/* == 证件照 == */}
                <Col span={6}>
                    <Image width={145} height={153} src={userIdPhoto?.url}/>
                </Col>
            </Row>
            {/* ====== 描述信息 ======  */
            }
            <Descriptions bordered={true} column={24} size={'small'}>
                <Descriptions.Item label="生日" span={8}>{userInfo.birthday}</Descriptions.Item>
                <Descriptions.Item label="民族" span={8}>{userInfo.nation}
                </Descriptions.Item>
                <Descriptions.Item label="性别" span={8}>{userInfo.gender} </Descriptions.Item>
                <Descriptions.Item label="兴趣爱好" span={24}>{userInfo.selfLike}</Descriptions.Item>
                <Descriptions.Item label="自我评价" span={24}>{userInfo.selfProfile}</Descriptions.Item>
            </Descriptions>
        </>
        }
    </>
}