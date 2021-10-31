import React, {useEffect, useState} from "react"
import {Avatar, Button, Descriptions, List, PageHeader, Space, Statistic, Tabs} from 'antd'
import {useHistory} from "react-router-dom";
import {getAssociationDetail, getRecentRecruitment} from "../../../services/db";
import {EyeOutlined, MessageOutlined, LikeOutlined} from '@ant-design/icons';
import {getShareByAssociation} from "../../../services/shareService";

const {TabPane} = Tabs;


const sharePageSize = 5
export default function AssociationDetail(props) {

    const history = useHistory()
    const {associationId} = props.match.params
    const [associationDetail, setAssociationDetail] = useState()
    const [shareList, setShareList] = useState([])
    const [recentRecruitmentContent, setRecentRecruitmentContent] = useState()

    useEffect(() => {
        getAssociationDetail(associationId).then(res => {
            const {data} = res.data
            setAssociationDetail(data)
        })
        getShareByAssociation(associationId).then(res => {
            const {data} = res.data
            console.log("社团分享：", data)
            const newData = data.map(item => {
                return {
                    ...item,
                    title: item.title,
                    avatar: 'https://joeschmoe.io/api/v1/random',
                    description: `来自 ${item.roleName} - ${item.name}, 发布时间： ${item.shareTime || '--/--'}`,
                    content: item.shortDescription,
                }
            })
            setShareList(newData)
        })
        getRecentRecruitment(associationId).then(res => {
            const {data} = res.data
            setRecentRecruitmentContent(data.content)
        })
    }, [])


    const handleTabChange = (key) => {
        console.log(key);
    }

    const IconText = ({icon, text}) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );


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
                    {/* ================================= 社团经历分享  =================================  */}
                    <List size="large" itemLayout="vertical"
                        // dataSource={listData}
                          dataSource={shareList}
                          pagination={{
                              onChange: page => {
                                  console.log(page);
                              },
                              pageSize: sharePageSize,
                          }}

                          footer={
                              <div>
                                  <b>高校社团管理系统-橘集</b> @2021
                              </div>
                          }
                          renderItem={item => (
                              <List.Item
                                  key={item.shareId}
                                  actions={[
                                      <IconText icon={EyeOutlined} text={item.view} key="viewNum"/>,
                                      <IconText icon={LikeOutlined} text={item.thumbs} key="thumbsNum"/>,
                                      <IconText icon={MessageOutlined} text="2" key="list-vertical-message"/>,
                                  ]}
                                  extra={
                                      <img width={272} alt="logo"
                                           src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                      />
                                  }
                              >
                                  <List.Item.Meta
                                      avatar={<Avatar src={item.avatar}/>}
                                      title={
                                          <a href={`#/user/share/list/${item.shareId}`}>{item.title}</a>}
                                      description={item.description}
                                  />
                                  {item.content}
                              </List.Item>
                          )}
                    />
                </TabPane>

                {/* ================================= 纳新通知  =================================  */}
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

                {/* ================================= echarts数据可视化部分  =================================  */}
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