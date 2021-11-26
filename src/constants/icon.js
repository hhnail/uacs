import React from "react";
import Icon, {
    ArrowDownOutlined,
    ArrowUpOutlined,
    AuditOutlined,
    BarsOutlined,
    ClusterOutlined,
    FormOutlined,
    TableOutlined,
    TeamOutlined,
    UsergroupAddOutlined
} from "@ant-design/icons";
import {ReactComponent as ViewIcon} from "../icons/view.svg";
import {ReactComponent as CommitIcon} from "../icons/commit.svg";
import {ReactComponent as DeleteIcon} from "../icons/delete.svg";
import {ReactComponent as Interview} from "../icons/interview.svg";
import {ReactComponent as CalendarIcon} from "../icons/calendar.svg";
import {ReactComponent as ArrangeIcon} from "../icons/arrange.svg";
import {ReactComponent as RefuseIcon} from "../icons/refuse.svg";
import {ReactComponent as HomeIcon} from "../icons/home.svg";
import {ReactComponent as AccountManageIcon} from "../icons/account-manage.svg";
import {ReactComponent as ResumeIcon} from "../icons/resume.svg";
import {ReactComponent as RecruitmentIcon} from "../icons/recruitment.svg";
import {ReactComponent as PermissionIcon} from "../icons/permission.svg";
import {ReactComponent as ShareManageIcon} from "../icons/share.svg";
import {ReactComponent as ContacterIcon} from "../icons/contacter.svg";
import {ReactComponent as AddressIcon} from "../icons/address.svg";
import {ReactComponent as OtherIcon} from "../icons/other.svg";
import {ReactComponent as ClassIcon} from "../icons/class.svg";
import {ReactComponent as TagIcon} from "../icons/tag.svg";
import {ReactComponent as College} from "../icons/college.svg";
import {ReactComponent as Major} from "../icons/major.svg";
import {ReactComponent as Add} from "../icons/add.svg";
import {ReactComponent as Edit} from "../icons/edit.svg";
import {ReactComponent as Member} from "../icons/member.svg";
import {ReactComponent as Department} from "../icons/department.svg";
import {ReactComponent as Boy} from "../icons/boy.svg";
import {ReactComponent as Girl} from "../icons/girl.svg";
import {ReactComponent as Accept} from "../icons/accept.svg";
import {ReactComponent as Avatar} from "../icons/avatar.svg";


// 用户操作图标
const OPTION_ICONS = {
    // 查看
    VIEW: <Icon component={ViewIcon} style={{fontSize: 14}}/>,
    // 提交
    COMMIT: <Icon component={CommitIcon} style={{fontSize: 14}}/>,
    // 删除
    DELETE: <Icon component={DeleteIcon} style={{fontSize: 16}}/>,
    // 安排
    ARRANGE: <Icon component={ArrangeIcon} style={{fontSize: 14}}/>,
    // 接受
    ACCEPT: <Icon component={Accept} style={{fontSize: 16,fontWeight:800}}/>,
    // 拒绝
    REFUSE: <Icon component={RefuseIcon} style={{fontSize: 14}}/>,
    // 新增
    ADD: <Icon component={Add} style={{fontSize: 14}}/>,
    // 编辑
    EDIT: <Icon component={Edit} style={{fontSize: 14}}/>,
    // 头像
    AVATAR: <Icon component={Avatar} style={{fontSize: 14}}/>,
    // 上线
    ONLINE: <ArrowUpOutlined/>,
    // 下线
    OFFLINE: <ArrowDownOutlined/>,
}

// 系统图标
const ICON = {
    interview: <Icon component={Interview} style={{fontSize: 30}}/>,
    calendar: <Icon component={CalendarIcon} style={{fontSize: 30}}/>,
    college: <Icon component={College} style={{fontSize: 15}}/>,
    major: <Icon component={Major} style={{fontSize: 15}}/>,
    class: <Icon component={ClassIcon} style={{fontSize: 15}}/>,
    member: <Icon component={Member} style={{fontSize: 13}}/>,
    department: <Icon component={Department} style={{fontSize: 30, color: 'orange'}}/>,
    boy: <Icon component={Boy} style={{fontSize: 21, color: 'skyblue'}}/>,
    girl: <Icon component={Girl} style={{fontSize: 21, color: 'pink'}}/>,
}

// 后台管理员 - 侧边栏 - 菜单图标 （前台路由 ~ 图标）
const SIDE_MENU_ICON_LIST = {
    "/manage/home": <HomeIcon style={{width: 15, height: 15, paddingTop: 1}}/>,
    // 账号管理
    "/manage/account": <AccountManageIcon style={{width: 15, height: 15, paddingTop: 1}}/>,
    "/manage/account/resume": <ResumeIcon style={{width: 15, height: 15, paddingTop: 1}}/>,
    // 成员管理
    "/manage/user": <TeamOutlined/>,
    "/manage/user/list": <TableOutlined/>,
    "/manage/user/add": <UsergroupAddOutlined/>,
    // 社团管理
    "/manage/association": <ClusterOutlined/>,
    "/manage/association/list": <TableOutlined/>,
    "/manage/association/add": <UsergroupAddOutlined/>,
    // 纳新通知管理
    "/manage/recruitment": <RecruitmentIcon style={{width: 15, height: 15, paddingTop: 1}}/>,
    "/manage/recruitment/add": <FormOutlined/>,
    "/manage/recruitment/list": <TableOutlined/>,
    // 权限管理
    "/manage/permission": <PermissionIcon style={{width: 15, height: 15, paddingTop: 1}}/>,
    "/manage/permission/roleList": <BarsOutlined/>,
    "/manage/permission/permissionList": <TableOutlined/>,
    // 审核管理
    "/manage/review": <AuditOutlined/>,
    "/manage/review/addAssociation": <AuditOutlined/>,
    "/manage/review/joinAssociation": <AuditOutlined/>,
    "/manage/review/exitAssociation": <AuditOutlined/>,
    // 社团经历分享管理
    "/manage/share": <ShareManageIcon style={{width: 15, height: 15, paddingTop: 1}}/>,
    "/manage/share/list": <TableOutlined/>,
    "/manage/share/add": <FormOutlined/>,
    // 申请管理
    "/manage/application": <FormOutlined/>,
    "/manage/application/list": <TableOutlined/>,
    // 杂项管理
    "/manage/other": <OtherIcon style={{width: 15, height: 15, paddingTop: 1}}/>,
    "/manage/other/contacter": <ContacterIcon style={{width: 15, height: 15, paddingTop: 1}}/>,
    "/manage/other/address": <AddressIcon style={{width: 15, height: 15, paddingTop: 1}}/>,
    "/manage/other/class": <ClassIcon style={{width: 15, height: 15, paddingTop: 1}}/>,
    "/manage/other/userTag": <TagIcon style={{width: 15, height: 15, paddingTop: 1}}/>,
}

export {OPTION_ICONS, ICON, SIDE_MENU_ICON_LIST}