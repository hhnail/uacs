import React, { Component } from 'react'
import { } from 'antd';
import {
    Carousel,
    Col,
    Row
} from 'antd';

import UseHeader from '../UserHeader'
import AssociationCard from '../AssociationCard'

const contentStyle = {
    position: 'center',
    // width: '80%',
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: 'orange',
};


export default class index extends Component {
    render() {
        return (
            <div>
                <UseHeader isUserMenu={true} />
                <UseHeader isUserMenu={false} />
                <br />
                <br />
                {/* 轮播图 */}
                <Carousel autoplay={true} dotPosition={"right"}>
                    <div>
                        <h3 style={contentStyle}>学生会</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>自律会</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>辩论队</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>志愿者协会</h3>
                    </div>
                </Carousel>
                <br />
                <br />
                {/* 社团展示栏 */}
                <div className="site-card-wrapper">
                    <Row gutter={16}>
                        <Col span={6}>
                        <AssociationCard/>
                        </Col>
                        <Col span={6}>
                        <AssociationCard/>
                        </Col>
                        <Col span={6}>
                        <AssociationCard/>
                        </Col>
                        <Col span={6}>
                        <AssociationCard/>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}