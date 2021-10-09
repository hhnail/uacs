import React, {useState, useEffect, useRef} from 'react'
import {
    Table, Button, Modal, Switch,
    notification, Space, Badge, Popover, PageHeader, Descriptions
} from 'antd'

// import {} from '@ant-design/icons';

import {
    RECRUITMENT_STATE_MAP,
    RECRUITMENT_PUBLISH_STATE_MAP,
    RECRUITMENT_PUBLISH_STATE_LIST
} from '../../../../constants/state'

import axios from 'axios'

const {confirm} = Modal

export default function RecruitmentDetail(props) {

    const userInfo = JSON.parse(localStorage.getItem("userInfo"))

    const [recruitmentInfo, setRecruitmentInfo] = useState([])

    // 获取用户列表
    useEffect(() => {
        // 如何获取url地址中的参数？
        axios.get(`/association/listRecruitment/${props.match.params.id}`)
            .then(res => {
                // console.log("==27 resData", res.data.data);
                setRecruitmentInfo(res.data.data)
            })
            .catch(err => {
                // console.log("==26 err", err);
            })
    }, [])


    return (
        <div className="site-page-header-ghost-wrapper">
            {/* 纳新通知基本信息 */}
            {recruitmentInfo &&
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title="纳新详情"
                subTitle={recruitmentInfo.title}
                extra={[
                    <Button key="3">打回</Button>,
                    <Button key="1" type="primary">通过审核</Button>,
                ]}
            >
                <Descriptions size="small" column={3}>
                    <Descriptions.Item label="纳新社团">{recruitmentInfo.associationName}</Descriptions.Item>
                    <Descriptions.Item label="申请人">{recruitmentInfo.name}</Descriptions.Item>
                    <Descriptions.Item
                        label="起始时间">{recruitmentInfo.startTime}~~{recruitmentInfo.endTime}</Descriptions.Item>
                    <Descriptions.Item
                        label="审核状态">{RECRUITMENT_STATE_MAP.get(recruitmentInfo.state)}</Descriptions.Item>
                    <Descriptions.Item label="发布状态">
                        {RECRUITMENT_PUBLISH_STATE_MAP.get(recruitmentInfo.state)
                            ? RECRUITMENT_PUBLISH_STATE_MAP.get(recruitmentInfo.state)
                            : RECRUITMENT_PUBLISH_STATE_LIST.UNPUBLISH.name}</Descriptions.Item>
                    <Descriptions.Item label="备注">{recruitmentInfo.description}</Descriptions.Item>
                    <Descriptions.Item label="纳新人数">{recruitmentInfo.newNum}</Descriptions.Item>
                    <Descriptions.Item label="浏览量">{recruitmentInfo.view}</Descriptions.Item>
                </Descriptions>

                {/* 纳新通知展示信息 */}
                <div dangerouslySetInnerHTML={{
                    __html: recruitmentInfo.content
                }}
                     style={{
                         margin: '24px 24px',
                         border: '1px solid gray',
                     }}>
                </div>
            </PageHeader>
            }
        </div>
    )
}