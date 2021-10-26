import React, {useEffect, useState} from 'react'

import {Layout, Menu} from 'antd';
import TopHeader from "../TopHeader";


const {Header} = Layout;

//空菜单
const nullArray = new Array(5).fill(null);
//“广场”菜单
const partMenuArray = [
    {id: 1, value: '纳新广场'},
    {id: 2, value: '活动广场'},
    {id: 3, value: '赛事广场'}
];
//用户菜单
const userMenuArray = [
    {id: 1, value: '首页'},
    {id: 2, value: '个人中心'}
];


export default function UserHeader(props) {

    const [isUserMenu, setIsUserMenu] = useState(props.isUserMenu)

    const [menuArray, setMenuArray] = useState(nullArray)

    useEffect(() => {
        //判断是否为用户菜单，展示props传递过来的相对应的菜单
        isUserMenu ? setMenuArray(userMenuArray) : setMenuArray(partMenuArray);
    })

    return (
        <Header>
            <div className="logo"/>
            <TopHeader/>
            <Menu theme="light" mode="horizontal" defaultSelectedKeys={['0']}>
                {
                    menuArray.map((item, id) => {
                        return <Menu.Item key={id}>{item?.value}</Menu.Item>
                    })
                }
            </Menu>
        </Header>
    )
}
