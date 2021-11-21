import {Card, Statistic} from "antd";
import React, {useEffect, useRef} from "react";
import * as echarts from "echarts";
import axios from "axios";
import {countAssociationGender, countAssociationRecruitment} from "../../../../services/dataViewService";

export default function DataView(props) {

    const echartsContainerRef = useRef()
    const echartsContainerRef2 = useRef()

    useEffect(() => {
        if (props.associationId) {
            countAssociationGender(props.associationId).then(res => {
                const countGenderResult = res.data.data
                const genderColor = ['#ee6666', '#5470c6', '#fac858']
                const setColorData = countGenderResult.map((item, index) => {
                    return {
                        ...item,
                        itemStyle: {
                            color: genderColor[index]
                        }
                    }
                })
                drawGenderPie(setColorData)
            })
        }
        if (props.recruitmentId) {
            countAssociationRecruitment(props.recruitmentId).then(res => {
                // console.log('纳新情况统计：')
                // console.log(res.data)
                const countRecruitmentMap = res.data.data
                drawRecruitmentRing(countRecruitmentMap)
            })
        }
    }, [])

    const drawGenderPie = (countGenderResult) => {
        // 基于准备好的dom，初始化echarts实例
        const myChart = echarts.init(echartsContainerRef.current);

        const option = {
            title: {
                text: '男女生比例',
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
                    data: countGenderResult,
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

    const drawRecruitmentRing = (countRecruitmentMap) => {
        // 基于准备好的dom，初始化echarts实例
        const myChart2 = echarts.init(echartsContainerRef2.current);
        const gaugeData = [
            {
                value: countRecruitmentMap.投递人数 * 100,
                name: '投递占比',
                title: {
                    offsetCenter: ['0%', '-30%']
                },
                detail: {
                    valueAnimation: true,
                    offsetCenter: ['0%', '-15%']
                }
            },
            {
                value: countRecruitmentMap.录用人数 * 100,
                name: '已录占比',
                title: {
                    offsetCenter: ['0%', '0%']
                },
                detail: {
                    valueAnimation: true,
                    offsetCenter: ['0%', '15%']
                }
            },
            {
                value: countRecruitmentMap.被拒人数 * 100,
                name: '被拒占比',
                title: {
                    offsetCenter: ['0%', '30%']
                },
                detail: {
                    valueAnimation: true,
                    offsetCenter: ['0%', '45%']
                }
            }
        ];

        const option = {
            title: {
                text: '本次纳新情况',
                left: 'center'
            },
            series: [
                {
                    type: 'gauge',
                    startAngle: 90,
                    endAngle: -270,
                    pointer: {
                        show: false
                    },
                    progress: {
                        show: true,
                        overlap: false,
                        roundCap: true,
                        clip: false,
                        itemStyle: {
                            borderWidth: 1,
                            borderColor: '#464646'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            width: 40
                        }
                    },
                    splitLine: {
                        show: false,
                        distance: 0,
                        length: 10
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false,
                        distance: 50
                    },
                    data: gaugeData,
                    title: {
                        fontSize: 14
                    },
                    detail: {
                        width: 50,
                        height: 14,
                        fontSize: 14,
                        color: 'auto',
                        borderColor: 'auto',
                        borderRadius: 20,
                        borderWidth: 1,
                        formatter: '{value}%'
                    }
                }
            ]
        };


        option && myChart2.setOption(option);
    }


    return (
        <div>
            <div style={{
                position: 'absolute',
            }}>
                <Card style={{width: 300}} hoverable>
                    <Statistic
                        title="社团总人数"
                        value="32"
                        style={{
                            marginRight: 32,
                            color: 'red',
                        }}
                    />
                    <Statistic
                        title="本次录用人数"
                        value="10"
                        style={{
                            marginRight: 32,
                            color: 'red'
                        }}
                    />
                </Card>
            </div>
            <div ref={echartsContainerRef} style={{
                width: '30%',
                height: 400,
                marginTop: 30,
                marginLeft: 400,
                display: 'inline-block',
            }}></div>
            <div ref={echartsContainerRef2} style={{
                width: '30%',
                height: 400,
                marginTop: 30,
                display: 'inline-block',
            }}></div>
        </div>
    )
}




