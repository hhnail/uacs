import React from 'react'
import {Layout} from 'antd';

import UseHeader from '../../components/UserHeader'
import {Content} from "antd/lib/layout/layout";
import AppRouter from "../AppRouter";


export default function UserBox() {

    return (
        <Layout>
            <UseHeader isUserMenu={false}/>
            {/* ======================== 内容 ========================  */}
            <Content style={{
                padding: 24,
                margin: 0,
                minHeight: 240,
                overflow: 'auto'
            }}
            >
                <AppRouter/>
            </Content>
        </Layout>
    )
}