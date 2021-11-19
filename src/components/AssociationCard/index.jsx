import React, {useEffect} from 'react'
import {Card, Tag, Col} from 'antd'
import {ReactComponent as AssociationIcon} from '../../icons/association-manage.svg'
import {useHistory} from "react-router-dom";

const {Meta} = Card

export default function AssociationCard(props) {

    const history = useHistory()

    const currentAssociation = props.item

    return (
        <Card hoverable
              key={currentAssociation.associationId}
            // TODO 图片能不能用轮播的？
              cover={<img alt="图片加载失败"
                          src={currentAssociation.imgUrl} style={{
                  height: 200,
                  width: 368,
              }}/>}
              onClick={() => {
                  history.push(`/user/associationDetail/${currentAssociation.associationId}`)
              }}
        >
            <Meta avatar={<AssociationIcon style={{
                width: 50,
                height: 50
            }}/>}
                  title={<div style={{
                      fontSize:18,
                      fontWeight:900,
                  }}>{currentAssociation.associationName}</div>}
            />
            <div>
                纳新状态：
                {
                    currentAssociation.state === '审核通过' ? <Tag color="success">纳新中</Tag> :
                        <Tag color="default">暂未纳新</Tag>
                }
            </div>
        </Card>
    )
}
