import {Switch, Route, Redirect} from 'react-router-dom'

import Home from '../Home'
import UserList from '../UserList'
import AssociationList from '../AssociationList'
import RoleList from '../RoleList'
import PermissionList from '../PermissionList'
import NoPermission from '../NoPermission'
import AddRecruitment from '../AddRecruitment';
import RecruitmentList from '../RecruitmentList'

import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import {useEffect} from "react";
import RecruitmentDetail from "../RecruitmentList/RecruitmentDetail";
import ReviewAddAssociation from "../Review/ReviewAddAssociation";
import ReviewJoinAssociation from "../Review/ReviewJoinAssociation";
import ClassList from "../Other/ClassList";
import UserTagList from "../Other/UserTagList";

export default function SysRouter() {
    // TODO 动态创建路由 防止路由穿透

    // 切换路由 进度条
    NProgress.start()
    useEffect(() => {
        NProgress.done()
    })
    return (
        <Switch>
            <Route path="/manage/home" component={Home}></Route>

            <Route path="/manage/user/list" component={UserList}></Route>

            {/*社团列表*/}
            <Route path="/manage/association/list" component={AssociationList}></Route>


            {/*添加纳新通知*/}
            <Route path="/manage/association/addRecruitment" component={AddRecruitment}></Route>
            {/*更新纳新通知*/}
            <Route path="/manage/association/updateRecruitment/:id" component={AddRecruitment}></Route>
            {/*纳新通知详情*/}
            <Route path="/manage/association/listRecruitment/:id" component={RecruitmentDetail}></Route>
            {/*纳新通知列表*/}
            <Route path="/manage/association/listRecruitment" component={RecruitmentList}></Route>

            {/* =============== 权限管理 =======================*/}
            {/*角色列表*/}
            <Route path="/manage/permission/roleList" component={RoleList}></Route>
            {/*权限列表*/}
            <Route path="/manage/permission/permissionList" component={PermissionList}></Route>


            {/* =============== 审核管理 =======================*/}
            <Route path="/manage/review/addAssociation" component={ReviewAddAssociation}></Route>
            <Route path="/manage/review/joinAssociation" component={ReviewJoinAssociation}></Route>


            {/* =============== 杂项管理 =======================*/}
            <Route path="/manage/other/class" component={ClassList}></Route>
            <Route path="/manage/other/userTag" component={UserTagList}></Route>


            {/* 其他情况 ================== 重定向 =====================*/}
            {/*根路径跳转到首页home*/}
            <Redirect from="/" to="/manage/home" exact/>
            {/*其余路径均用 无权限 来展示*/}
            <Route path="*" component={NoPermission}></Route>
        </Switch>
    )
}
