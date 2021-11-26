import React, {useEffect, useRef} from 'react'
import * as echarts from 'echarts'
import {countAssociationTypeAndNum} from "../../../services/db";
import {getAssociationTypeLabel} from "../../../constants/state";

export default function Home() {

    const associationTypeContainer = useRef()


    useEffect(() => {
        // 获取社团类型图表
        countAssociationTypeAndNum().then(res => {
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
            ]
        };
        myChart.setOption(option);
    }

    return (
        <div>
            <div ref={associationTypeContainer}
                 style={{
                     width: '100%',
                     height: 650,
                 }}/>
        </div>
    )
}



