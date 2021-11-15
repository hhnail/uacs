import {Card, Col, Row} from 'antd';

// TODO 暂时就让他自己填吧，先不写这个功能了，还要动表结构
export default function Contacter() {
    return <div>
        <Row gutter={24}>
            <Col span={6}>
                <Card title="Card title" bordered={false}>
                    Card content
                </Card>
            </Col>
            <Col span={6}>
                <Card title="Card title" bordered={false}>
                    Card content
                </Card>
            </Col>
            <Col span={6}>
                <Card title="Card title" bordered={false}>
                    Card content
                </Card>
            </Col>
            <Col span={6}>
                <Card title="Card title" bordered={false}>
                    Card content
                </Card>
            </Col>
        </Row>
    </div>

}