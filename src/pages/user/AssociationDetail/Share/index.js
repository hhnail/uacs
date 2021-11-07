import {Avatar, List, Space} from "antd";
import {EyeOutlined, LikeOutlined, MessageOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import {getShareByAssociation} from "../../../../services/shareService";

const sharePageSize = 5
export default function Share(props) {

    const [shareList, setShareList] = useState([])

    useEffect(() => {
        getShareByAssociation(props.associationId)
            .then(res => {
                const {data} = res.data
                // console.log("社团分享：", data)
                // 调整展示方式
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
    }, [])

    const IconText = ({icon, text}) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );

    return (
        <List size="large" itemLayout="vertical"
              dataSource={shareList}
              pagination={{
                  pageSize: sharePageSize,
                  onChange: page => {
                      console.log(page);
                  },
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
    )
}