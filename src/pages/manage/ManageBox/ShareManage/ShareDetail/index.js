import React, {useEffect, useState} from 'react'
import {Button, Descriptions, Modal, PageHeader} from 'antd'

import {
    RECRUITMENT_PUBLISH_STATE_LIST,
    RECRUITMENT_PUBLISH_STATE_MAP,
    RECRUITMENT_STATE_MAP
} from '../../../../../constants/state'
import {listRecruitment} from "../../../../../services/db";
import axios from "axios";
import {getShareById} from "../../../../../services/shareService";

const {confirm} = Modal

export default function ShareDetail(props) {

    const [shareInfo, setShareInfo] = useState()
    const isAdmin = false
    // 获取用户列表
    useEffect(() => {
        // 如何获取url地址中的参数？
        getShareById(props.match.params.shareId)
            .then(res => {
                const {data} = res.data
                console.log(data)
                setShareInfo(data)
            })
    }, [])

    return (
        <div className="site-page-header-ghost-wrapper">
            {/* =============== 纳新通知基本信息 =============== */}
            {shareInfo &&
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title="纳新详情"
                subTitle={shareInfo.title}
                extra={isAdmin && [
                    <Button key="3">打回</Button>,
                    <Button key="1" type="primary">通过审核</Button>,
                ]}
            >
                <Descriptions size="small" column={3}>
                    <Descriptions.Item label="纳新社团">{shareInfo.associationName}</Descriptions.Item>
                    <Descriptions.Item label="申请人">{shareInfo.name}</Descriptions.Item>
                    <Descriptions.Item
                        label="审核状态">{RECRUITMENT_STATE_MAP.get(shareInfo.state)}</Descriptions.Item>
                    <Descriptions.Item label="发布状态">
                        {RECRUITMENT_PUBLISH_STATE_MAP.get(shareInfo.state)
                            ? RECRUITMENT_PUBLISH_STATE_MAP.get(shareInfo.state)
                            : RECRUITMENT_PUBLISH_STATE_LIST.UNPUBLISH.name}</Descriptions.Item>
                    <Descriptions.Item label="备注">{shareInfo.description}</Descriptions.Item>
                    <Descriptions.Item label="浏览量">{shareInfo.view}</Descriptions.Item>
                </Descriptions>

                {/* 纳新通知展示信息 */}
                <div dangerouslySetInnerHTML={{
                    __html: shareInfo.shareContent
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