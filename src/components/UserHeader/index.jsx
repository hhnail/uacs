import React, { Component } from 'react'

import { Menu, Layout } from 'antd';
import {
    DashboardTwoTone,
} from '@ant-design/icons';


const { Header } = Layout;

//空菜单
const nullArray = new Array(5).fill(null);
//“广场”菜单
const partMenuArray = [
    { id: 1, value: '纳新广场' },
    { id: 2, value: '活动广场' },
    { id: 3, value: '赛事广场' }
];
//用户菜单
const userMenuArray = [
    { id: 1, value: '首页' },
    { id: 2, value: '个人中心' }
];



export default class UserHeader extends Component {

    //状态
    state = {
        //是否是用户菜单
        isUserMenu: this.props.isUserMenu,
        //展示的菜单Array
        menuArray: nullArray
    }

    componentWillMount = () => {
        //判断是否为用户菜单，展示props传递过来的相对应的菜单
        this.state.isUserMenu ? this.setState({ menuArray: userMenuArray }) : this.setState({ menuArray: partMenuArray });
    }

    render() {
        return (
            <Header>
                {/* <DashboardTwoTone /> */}
                <div className="logo" />
                <Menu theme="light" mode="horizontal" defaultSelectedKeys={['0']}>
                    {this.state.menuArray.map((item, id) => {
                        return <Menu.Item key={id}>{item.value}</Menu.Item>;
                    })}
                </Menu>
            </Header>
        )
    }
}
