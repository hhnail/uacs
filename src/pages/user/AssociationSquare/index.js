import {Carousel, Col, Row} from "antd";
import AssociationCard from "../../../components/AssociationCard";
import React, {useEffect, useState} from "react";
import {getAllAssociationList} from "../../../services/db";

const contentStyle = {
    position: 'center',
    // width: '80%',
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: 'orange',
};

export default function AssciationSquare() {

    const [associationList, setAssociationList] = useState([])

    useEffect(() => {
        getAllAssociationList().then(res => {
            // console.log('首页社团列表：')
            // console.log(res.data.data)
            setAssociationList(res.data.data)
        })
    }, [])

    return (<>
            {/* === 前台系统背景图 === */}
            <img src={"http://localhost:7100/association/getImageById/517ca4baf3674937a105982906d11e44"}
                 style={{
                     position: 'absolute',
                     zIndex: 0,
                     margin: '-23px -23px -23px -23px',
                     height: '100%',
                     width: '100%',
                 }}
                 key={"Carousel1"}
            />

            <div>
                {/* ======================== 轮播图 ========================  */}
                <Carousel autoplay={true} dotPosition={"bottom"} style={{
                    width: 600,
                    height: 330,
                }}>
                    <img src={"http://localhost:7100/association/getImageById/2be18f8af3ff4bd8b9ffb8791ff68d11"}
                         style={{
                             height: 215,
                             width: 300,
                         }}
                         key={"Carousel1"}
                    />
                    <img src={"http://localhost:7100/association/getImageById/0e8ed76bc616496f9bdbaa65c1dc215c"}
                         style={{
                             height: 215,
                             width: 300,
                         }}
                         key={"Carousel2"}
                    />
                    <img src={"http://localhost:7100/association/getImageById/548f1deea8e545f5b7cef9041645d6da"}
                         style={{
                             height: 215,
                             width: 300,
                         }}
                         key={"Carousel3"}
                    />
                    <img src={"http://localhost:7100/association/getImageById/4b704926a1c74d28942b21221032c62a"}
                         style={{
                             height: 215,
                             width: 300,
                         }}
                         key={"Carousel4"}
                    />
                </Carousel>
                {/* ======================== 社团展示栏-卡片组 ======================== */}
                <div style={{ marginTop: 36, }}>
                    <Row gutter={[24, 24]}>
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
        </>
    )
}