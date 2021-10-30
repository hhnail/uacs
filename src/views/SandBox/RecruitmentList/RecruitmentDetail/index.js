import React, {useEffect, useState} from 'react'
import {Button, Descriptions, Modal, PageHeader} from 'antd'

import {
    RECRUITMENT_PUBLISH_STATE_LIST,
    RECRUITMENT_PUBLISH_STATE_MAP,
    RECRUITMENT_STATE_MAP
} from '../../../../constants/state'
import {listRecruitment} from "../../../../services/db";

const {confirm} = Modal

export default function RecruitmentDetail(props) {

    const [recruitmentInfo, setRecruitmentInfo] = useState([])

    // 获取用户列表
    useEffect(() => {
        // 如何获取url地址中的参数？
        listRecruitment(props.match.params.id).then(res => {
            setRecruitmentInfo(res.data.data)
        })
    }, [])

    return (
        <div className="site-page-header-ghost-wrapper">
            {/* =============== 纳新通知基本信息 =============== */}
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