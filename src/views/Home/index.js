import React, {useEffect} from 'react'
import {Alert} from 'antd'
import * as echarts from 'echarts'

export default function Home() {

    const drawBar = () => {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('aaa1'));

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: 'ECharts 入门示例'
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

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }

    useEffect(() => {
        drawBar()
    }, [])

    return (
        <div>
            <Alert message="Error Text" type="error" closable
                   style={{height: 100, width: '100%'}}
                   description="系统出现错误！请稍后重试或联系管理员：18030290101"/>
            <div id="aaa1" style={{
                width: '100%',
                height: 400,
                marginTop: 30,
            }}></div>
        </div>
    )
}
