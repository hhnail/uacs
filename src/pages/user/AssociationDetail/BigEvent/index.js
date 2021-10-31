import {Card, Image, Timeline} from "antd";
import {ClockCircleOutlined} from "@ant-design/icons";
import React, {useState} from "react";

const {Meta} = Card;
export default function BigEvent() {

    const [visible, setVisible] = useState(false);

    return (
        <div style={{display: "flex"}}>
            {/* ================= 相册  ====================-  */}
            <div>
                <Card hoverable style={{width: 240}}>
                    <Image
                        preview={{visible: false}}
                        width={200}
                        src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
                        onClick={() => setVisible(true)}
                    />
                    <div style={{display: 'none'}}>
                        <Image.PreviewGroup preview={{visible, onVisibleChange: vis => setVisible(vis)}}>
                            <Image
                                src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"/>
                            <Image
                                src="https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp"/>
                            <Image
                                src="https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp"/>
                        </Image.PreviewGroup>
                    </div>
                    <Meta title="时光相册" description="小伙伴经历的风风雨雨~"/>
                </Card>
            </div>

            {/* ================= 大事记  ====================-  */}
            <div>
                <div style={{
                    fontSize: 30,
                    fontWeight: 800,
                    marginLeft: '30%',
                    marginBottom: '20px',
                }}>
                    社团大事记时间表：
                </div>
                <Timeline mode="alternate" style={{width: '100%'}}>
                    <Timeline.Item>
                        <div>
                            1999-09-01 集美大学工商管理学院辩论队正式创立
                        </div>
                        <Image
                            width={100}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        />
                    </Timeline.Item>
                    <Timeline.Item color="green">
                        <div>
                            2000-09-01 随着社团的状态，子部门《演讲与口才协会》正式创立
                        </div>
                    </Timeline.Item>
                    <Timeline.Item dot={<ClockCircleOutlined style={{fontSize: '16px'}}/>}>
                        <div>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                            doloremque
                            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                            architecto
                            beatae vitae dicta sunt explicabo.
                        </div>
                    </Timeline.Item>
                    <Timeline.Item color="red">第十九届集美大学校辩论赛亚军 2015-09-01<Image
                        width={100}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    /></Timeline.Item>
                    <Timeline.Item color="red">
                        <div>
                            疫情期间参与星火杯、萤烛杯等网辩，获得多次单场最佳辩手
                        </div>
                        <Image
                            width={100}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        /></Timeline.Item>
                    <Timeline.Item color="red">第二十届集美大学校辩论赛季军 2015-09-01<Image
                        width={100}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    /></Timeline.Item>
                    <Timeline.Item color="red">第二十一届集美大学校辩论赛八强<Image
                        width={100}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    /></Timeline.Item>
                    <Timeline.Item color="red">集美大学开学杯季军<Image
                        width={100}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    /></Timeline.Item>
                    <Timeline.Item>第二届弘毅杯亚军 2015-09-01</Timeline.Item>
                    <Timeline.Item dot={<ClockCircleOutlined style={{fontSize: '16px'}}/>}>
                        2019年黄联厦门赛区四强<Image
                        width={100}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    />
                    </Timeline.Item>
                    <Timeline.Item>2021年李朝政学长和“宝岛辩魂”黄执中在“有话执说”中进行对辩<Image
                        width={100}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    /></Timeline.Item>
                </Timeline>
            </div>
        </div>
    )
}