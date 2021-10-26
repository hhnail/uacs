import React from 'react'
import {Avatar, Card} from 'antd'
import Icon, {EditOutlined, EllipsisOutlined, SettingOutlined} from '@ant-design/icons';
import {ReactComponent as AssociationIcon} from '../../icons/association-manage.svg';

const {Meta} = Card;

export default function AssociationCard(props) {

    const currentAssociation = props.item

    return (
        <Card
            style={{width: 300}}
            cover={
                <img alt="图片加载失败"
                     src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.zhimg.com%2Fv2-2ad21c2af7cba8b61defc9cd0969b8ce_250x0.jpg%3Fsource%3D172ae18b&refer=http%3A%2F%2Fpic1.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637823440&t=0f856a7fea222941c8490e9f69e93d1d"
                />
            }
            actions={[
                <SettingOutlined key="settings"/>,
                <EditOutlined key="edit"/>,
                <EllipsisOutlined key="ellipsis"/>,
            ]}
            hoverable={true}
        >
            <Meta
                avatar={<AssociationIcon style={{
                    width: 25,
                    height: 25
                }}/>}
                title={currentAssociation.associationName}
                description={currentAssociation.info}
            />
        </Card>
    )
}
