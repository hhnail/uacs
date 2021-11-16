import React, {useEffect} from 'react'
import {Card, Tag,Col} from 'antd'
import {ReactComponent as AssociationIcon} from '../../icons/association-manage.svg'
import {useHistory} from "react-router-dom";

const {Meta} = Card

export default function AssociationCard(props) {

    const history = useHistory()

    const currentAssociation = props.item

    return (
        <Card hoverable
              // TODO 图片能不能用轮播的？
              cover={<img alt="图片加载失败"
                          src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.zhimg.com%2Fv2-2ad21c2af7cba8b61defc9cd0969b8ce_250x0.jpg%3Fsource%3D172ae18b&refer=http%3A%2F%2Fpic1.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637823440&t=0f856a7fea222941c8490e9f69e93d1d"/>}
              onClick={()=>{
                  history.push(`/user/associationDetail/${currentAssociation.associationId}`)
              }}
        >
            <Meta avatar={<AssociationIcon style={{
                width: 50,
                height: 50
            }}/>}
                  title={currentAssociation.associationName}
            />
            <div>
                纳新状态：
                {
                    currentAssociation.state === '审核通过' ? <Tag color="success">纳新中</Tag> :
                        <Tag color="default">未纳新</Tag>
                }
            </div>
        </Card>
    )
}
