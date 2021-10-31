import {Statistic} from "antd";
import React, {useEffect, useRef} from "react";
import * as echarts from "echarts";
import axios from "axios";

export default function DataView() {

    const echartsContainerRef = useRef()

    useEffect(() => {
        drawPie()
    }, [])

    const drawPie = () => {
        // 基于准备好的dom，初始化echarts实例
        const myChart = echarts.init(echartsContainerRef.current);

        const option = {
            title: {
                text: 'Referer of a Website',
                subtext: 'Fake Data',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        {value: 1048, name: 'Search Engine'},
                        {value: 735, name: 'Direct'},
                        {value: 580, name: 'Email'},
                        {value: 484, name: 'Union Ads'},
                        {value: 300, name: 'Video Ads'}
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };

        option && myChart.setOption(option);
    }


    return (
        <div>
            展示社团的相关数据

            <div className="extra">
                <div style={{
                    display: 'flex',
                    width: 'max-content',
                    justifyContent: 'flex-end',
                }}
                >
                    <Statistic
                        title="纳新申请人数"
                        value="32"
                        style={{
                            marginRight: 32,
                        }}
                    />
                    <Statistic title="Price" prefix="$" value={568.08}/>
                </div>
            </div>
            <div ref={echartsContainerRef} style={{
                width: '100%',
                height: 400,
                marginTop: 30,
            }}></div>
        </div>
    )
}




