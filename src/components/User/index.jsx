import React, {Component, useEffect, useState} from 'react'
import {} from 'antd';
import {
    Carousel,
    Col,
    Row
} from 'antd';

import UseHeader from '../UserHeader'
import AssociationCard from '../AssociationCard'
import {getAllAssociationList} from "../../services/db";

const contentStyle = {
    position: 'center',
    // width: '80%',
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: 'orange',
};


export default function User() {

    const [associationList, setAssociationList] = useState([])

    useEffect(() => {
        getAllAssociationList().then(res => {
            console.log(res.data.data)
            setAssociationList(res.data.data)
        })
    }, [])

    return (
        <div>
            {/*<UseHeader isUserMenu={true} />*/}
            <UseHeader isUserMenu={false}/>
            <br/>
            <br/>
            {/* ======================== 轮播图 ========================  */}
            <Carousel autoplay={true} dotPosition={"right"} style={{
                width: 500,
                left: '30%'
            }}>
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
            <br/>
            <br/>
            {/* ======================== 社团展示栏-卡片组 ======================== */}
            <div>
                <Row>
                    {
                        associationList.map(item => {
                            return <Col span={6}>
                                <AssociationCard item={item}/>
                            </Col>
                        })
                    }
                </Row>
            </div>
        </div>
    )
}