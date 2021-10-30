import React, {useEffect, useRef} from 'react'
import {Alert} from 'antd'
import * as echarts from 'echarts'

export default function Home() {

    const echartsContainerRef = useRef()

    const drawBar = () => {
        // 基于准备好的dom，初始化echarts实例
        const myChart = echarts.init(echartsContainerRef.current);

        // 指定图表的配置项和数据
        const option = {
            title: {
                text: '销量图'
            },
            tooltip: {},
            legend: {
                data: ['销量']
            },
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [
                {
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }
            ]
        };
        myChart.setOption(option);
    }

    useEffect(() => {
        drawBar()
    }, [])

    return (
        <div>
            <div ref={echartsContainerRef} style={{
                width: '100%',
                height: 400,
                marginTop: 30,
            }}></div>
        </div>
    )
}
