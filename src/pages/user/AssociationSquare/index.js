import {Carousel, Col, Row} from "antd";
import AssociationCard from "../../../components/AssociationCard";
import React, {useEffect, useRef, useState} from "react";
import {getAllAssociationList} from "../../../services/db";
import * as echarts from "echarts";
import axios from "axios";
import {ASSOCIATION_TYPE_LIST, getAssociationTypeLabel} from "../../../constants/state";

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
    const associationTypeContainer = useRef()

    useEffect(() => {
        getAllAssociationList().then(res => {
            // console.log('首页社团列表：')
            // console.log(res.data.data)
            setAssociationList(res.data.data)
        })
        // 类别。人数
        axios.get(`/association/countAssociationTypeAndNum`).then(res => {
            const {data} = res.data
            // console.log("类型data：")
            // console.log(data)
            const dataKey = []
            const dataValue = []
            data.map(item => {
                dataKey.push(getAssociationTypeLabel(item.type))
                dataValue.push(item.value)
            })
            // console.log(dataKey)
            // console.log(dataValue)
            drawAssociationTypeBar(dataKey, dataValue)

        })
    }, [])

    const drawAssociationTypeBar = (dataKey, dataValue) => {
        // 基于准备好的dom，初始化echarts实例
        const myChart = echarts.init(associationTypeContainer.current);

        // 指定图表的配置项和数据
        const option = {
            title: {
                text: '社团类别分布'
            },
            tooltip: {},
            legend: {
                data: ['社团类别']
                // data: ['社团类别','总人数']
            },
            xAxis: {
                data: dataKey,

            },
            yAxis: {
                minInterval: 1,
            },
            series: [
                {
                    name: '社团类别',
                    type: 'bar',
                    data: dataValue,
                },
                // {
                //     name: '总人数',
                //     type: 'bar',
                //     data: [15, 4, 13, 33]
                // }
            ]
        };
        myChart.setOption(option);
    }


    return <>
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

        <div style={{
            position: 'relative',
            zIndex: 1,
        }}>
            <div style={{
                display: 'flex',
            }}>
                {/* ======================== 轮播图 ========================  */}
                <Carousel autoplay={true} dotPosition={"bottom"} style={{
                    width: 500,
                    height: 280,
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
                <div ref={associationTypeContainer}
                     style={{
                         display: "inline-block",
                         width: 700,
                         height: 400,
                         marginLeft: 50,
                     }}/>
                <div style={{
                    display: "inline-block",
                }}>
                    纳新通知列表Card
                </div>
            </div>
            {/* ======================== 社团展示栏-卡片组 ======================== */}
            <div style={{marginTop: 36,}}>
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
}