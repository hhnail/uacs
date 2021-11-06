import React, {useEffect, useState} from "react"
import {Button, Descriptions, PageHeader, Tabs} from 'antd'
import {useHistory} from "react-router-dom";
import {getAssociationDetail, getRecentRecruitment} from "../../../services/db";
import Share from "./Share";
import BigEvent from "./BigEvent";
import DataView from "./DataView";

const {TabPane} = Tabs;


export default function AssociationDetail(props) {

    const history = useHistory()
    const {associationId} = props.match.params
    const [associationDetail, setAssociationDetail] = useState()
    const [recentRecruitmentContent, setRecentRecruitmentContent] = useState()


    useEffect(() => {
        getAssociationDetail(associationId).then(res => {
            const {data} = res.data
            setAssociationDetail(data)
        })
        getRecentRecruitment(associationId).then(res => {
            const {data} = res.data
            setRecentRecruitmentContent(data.content)
        })
    }, [])


    return (
        <div>
            {/* ============================ 页面体 头部 ============================*/}
            <PageHeader
                onBack={() => history.goBack()}
                title={associationDetail?.associationName}
                subTitle={associationDetail?.info}
                extra={[
                    <Button key="3">不感兴趣</Button>,
                    <Button key="2">收藏</Button>,
                    <Button key="1" type="primary">申请加入</Button>,
                ]}
            >
                {/* ======== 头部 描述信息 ==========*/}
                <div>
                    <Descriptions size="small" column={3}>
                        <Descriptions.Item label="社团序列号"><b>{associationDetail?.associationId}</b></Descriptions.Item>
                        <Descriptions.Item label="隶属单位">{associationDetail?.adminUnit}</Descriptions.Item>
                        <Descriptions.Item label="创建时间">{associationDetail?.createTime}</Descriptions.Item>
                    </Descriptions>
                </div>
            </PageHeader>


            {/* ============================ 页面体 内容 ============================*/}
            <Tabs defaultActiveKey="associationShare">
                {/* ================= 社团经历分享  ====================-  */}
                <TabPane tab="社团风采" key="associationShare">
                    <Share associationId={associationId}/>
                </TabPane>

                {/* ================================= 纳新通知  =================================  */}
                <TabPane tab="社团纳新" key="recruitment">
                    展示社团的纳新通知
                    <div dangerouslySetInnerHTML={{
                        __html: recentRecruitmentContent
                    }}
                         style={{
                             margin: '24px 24px',
                             border: '1px solid gray',
                         }}>
                    </div>
                </TabPane>

                {/* ================================= echarts数据可视化部分  =================================  */}
                <TabPane tab="数据可视化" key="dataView">
                    <DataView/>
                </TabPane>
                {/* ================= 社团大事记  ====================-  */}
                <TabPane tab="社团大事记" key="bigEvent">
                    <BigEvent/>
                </TabPane>
            </Tabs>
        </div>
    )
}