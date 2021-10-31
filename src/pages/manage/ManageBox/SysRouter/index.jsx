import {Redirect, Route, Switch} from 'react-router-dom'
import {Spin} from 'antd'
import {connect} from "react-redux";
import 'nprogress/nprogress.css'
import Home from '../../Home'
import UserList from '../UserList'
import AssociationList from '../AssociationManage/AssociationList'
import RoleList from '../PermissionManage/RoleList'
import PermissionList from '../PermissionManage/PermissionList'
import NoPermission from '../../NoPermission'
import AddRecruitment from '../RecruitmentManage/AddRecruitment';
import RecruitmentList from '../RecruitmentList'
import RecruitmentDetail from "../RecruitmentList/RecruitmentDetail";
import ReviewAddAssociation from "../Review/ReviewAddAssociation";
import ReviewJoinAssociation from "../Review/ReviewJoinAssociation";
import ClassList from "../Other/ClassList";
import UserTagList from "../Other/UserTagList";
import '../../../../util/http'
import ShareManage from "../ShareManage";
import AddShare from "../ShareManage/AddShare";
import ShareDetail from "../ShareManage/ShareDetail";
import Resume from "../AccountManage/Resume";

function SysRouter(props) {
    // TODO 动态创建路由 防止路由穿透
    // 切换路由 进度条
    // NProgress.start()
    // useEffect(() => {
    //     // console.log(props.isLoading)
    //     NProgress.done()
    // })

    return (
        <Spin size={"large"} spinning={props.isLoading}>
            <Switch>
                <Route path="/manage/home" component={Home}></Route>

                {/* ==================== 成员管理 ==================== */}
                <Route path="/manage/account/resume" component={Resume}></Route>

                {/* ==================== 成员管理 ==================== */}
                <Route path="/manage/user/list" component={UserList}></Route>

                {/* ==================== 社团管理 ==================== */}
                {/*社团列表*/}
                <Route path="/manage/association/list" component={AssociationList}></Route>


                {/* ==================== 纳新通知管理 ==================== */}
                {/*添加纳新通知*/}
                <Route path="/manage/recruitment/add" component={AddRecruitment}></Route>
                {/*更新纳新通知*/}
                <Route path="/manage/association/updateRecruitment/:id" component={AddRecruitment}></Route>
                {/*纳新通知详情*/}
                <Route path="/manage/recruitment/list/:id" component={RecruitmentDetail}></Route>
                {/*纳新通知列表*/}
                <Route path="/manage/recruitment/list" component={RecruitmentList}></Route>

                {/* =============== 权限管理 =======================*/}
                {/*角色列表*/}
                <Route path="/manage/permission/roleList" component={RoleList}></Route>
                {/*权限列表*/}
                <Route path="/manage/permission/permissionList" component={PermissionList}></Route>


                {/* =============== 审核管理 =======================*/}
                <Route path="/manage/review/addAssociation" component={ReviewAddAssociation}></Route>
                <Route path="/manage/review/joinAssociation" component={ReviewJoinAssociation}></Route>
                <Route path="/manage/review/publishRecruitmentNotice" component={RecruitmentList}></Route>


                {/* =============== 杂项管理 =======================*/}
                <Route path="/manage/other/class" component={ClassList}></Route>
                <Route path="/manage/other/userTag" component={UserTagList}></Route>

                {/* =============== 分享管理 =======================*/}
                <Route path="/manage/share/list/:shareId" component={ShareDetail}></Route>
                <Route path="/manage/share/list" component={ShareManage}></Route>
                <Route path="/manage/share/add" component={AddShare}></Route>


                {/* 其他情况 ================== 重定向 =====================*/}
                {/*根路径跳转到首页home*/}
                <Redirect from="/" to="/manage/home" exact/>
                {/*其余路径均用 无权限 来展示*/}
                <Route path="*" component={NoPermission}></Route>
            </Switch>
        </Spin>
    )
}

const mapState2Props = ({LoadingReducer: {isLoading}}) => {
    return {
        isLoading
    }
}

export default connect(mapState2Props)(SysRouter)