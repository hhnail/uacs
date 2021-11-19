import React, {useEffect, useState} from 'react'

import {Menu} from 'antd';
import UserSettings from "../UserSettings";
import {useHistory} from "react-router-dom";
import {ReactComponent as OrangeIcon} from "../../icons/orange.svg";


//空菜单
const nullArray = new Array(5).fill(null);

//“广场”菜单
const partMenuArray = [
    {id: 1, value: '纳新广场'},
    // {id: 2, value: '社团风采'},
    // {id: 3, value: '活动广场'}
];
//用户菜单
const userMenuArray = [
    {id: 1, value: '首页'},
    {id: 2, value: '个人中心'}
];


export default function UserHeader(props) {

    const history = useHistory()
    const [isUserMenu, setIsUserMenu] = useState(props.isUserMenu)

    const [menuArray, setMenuArray] = useState(nullArray)

    useEffect(() => {
        //判断是否为用户菜单，展示props传递过来的相对应的菜单
        isUserMenu ? setMenuArray(userMenuArray) : setMenuArray(partMenuArray);
    })

    return (
        <div style={{
            display: 'flex'
        }}>
            {/* ================ 头部导航菜单  ================ */}
            <div style={{width: '100%'}}>
                <Menu theme="light" mode="horizontal" defaultSelectedKeys={['0']} key='userMenu'>
                    {/* ================ 系统图标 ================*/}
                    <Menu.Item key={'systemIcon'} disabled>
                        <OrangeIcon style={{
                            width: 30,
                            height: 30,
                            marginTop: 10,
                        }}/></Menu.Item>
                    {menuArray.map((item, id) => {
                        return <Menu.Item key={id} style={{height: 55}}>{item?.value}</Menu.Item>
                    })}
                </Menu>
            </div>
            {/* ================ 个人账号设置  ================ */}
            <div style={{
                position: 'absolute',
                right: '3%',
                top: '3%',
            }}>
                <UserSettings history={history}/>
            </div>
        </div>
    )
}
