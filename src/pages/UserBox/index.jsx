import React, {useEffect, useState} from 'react'
import {Carousel, Col, Layout, Row} from 'antd';

import UseHeader from '../../components/UserHeader'
import AssociationCard from '../../components/AssociationCard'
import {getAllAssociationList} from "../../services/db";
import {Content} from "antd/lib/layout/layout";
import AppRouter from "../AppRouter";


export default function User() {

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