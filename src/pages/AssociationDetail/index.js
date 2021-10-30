import React, {useEffect, useState} from "react"
import {Button, Descriptions, PageHeader, Statistic, Tabs} from 'antd'
import {useHistory} from "react-router-dom";
import {getAssociationDetail, getRecentRecruitment} from "../../services/db";
import axios from "axios";

;

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
        getRecentRecruitment(associationId).then(res=>{
            const {data} = res.data
            setRecentRecruitmentContent(data.content)
        })
    }, [])


    const handleTabChange = (key) => {
        console.log(key);
    }

    return (
        <div>
            {/* ============================ 页面体 头部 ============================*/}
            <PageHeader
                onBack={() => history.goBack()}
                title={associationDetail?.associationName}
                subTitle={associationDetail?.info}
                extra={[
                    <Button key="3">操作1</Button>,
                    <Button key="2">操作2</Button>,
                    <Button key="1" type="primary">
                        加入社团
                    </Button>,
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
            <Tabs defaultActiveKey="1" onChange={handleTabChange}>
                <TabPane tab="社团风采" key="1">
                    展示社团成员的分享
                </TabPane>

                <TabPane tab="社团纳新" key="2">
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
                <TabPane tab="数据可视化" key="3">
                    展示社团的相关数据
                    <div className="extra">
                        <div style={{
                            display: 'flex',
                            width: 'max-content',
                            justifyContent: 'flex-end',
                        }}
                        >
                            <Statistic
                                title="Status"
                                value="Pending"
                                style={{
                                    marginRight: 32,
                                }}
                            />
                            <Statistic title="Price" prefix="$" value={568.08}/>
                        </div>
                    </div>
                </TabPane>
            </Tabs>
        </div>
    )
}