import {Switch, Route, Redirect} from 'react-router-dom'

import Home from '../Home'
import UserList from '../UserList'
import AssociationList from '../AssociationList'
import RoleList from '../RoleList'
import PermissionList from '../PermissionList'
import NoPermission from '../NoPermission'

import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import {useEffect} from "react";

export default function SysRouter() {
    // TODO 动态创建路由 防止路由穿透

    // 切换路由 进度条
    NProgress.start()
    useEffect(()=>{
        NProgress.done()
    })
    return (
        <Switch>
            <Route path="/manage/home" component={Home}></Route>
            <Route path="/manage/user/list" component={UserList}></Route>
            <Route path="/manage/association/list" component={AssociationList}></Route>
            <Route path="/manage/permission/roleList" component={RoleList}></Route>
            <Route path="/manage/permission/permissionList" component={PermissionList}></Route>
            {/* 重定向 */}
            <Redirect from="/" to="/manage/home" exact/>
            <Route path="*" component={NoPermission}></Route>
        </Switch>
    )
}
