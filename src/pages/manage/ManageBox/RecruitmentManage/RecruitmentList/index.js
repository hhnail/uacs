import React, {useEffect, useState} from 'react'
import {Badge, Button, Modal, Space, Table, Tooltip} from 'antd'
import {
    ArrowDownOutlined,
    CheckOutlined,
    CloseOutlined,
    ExclamationCircleOutlined,
    RollbackOutlined,
    ArrowUpOutlined,
} from '@ant-design/icons';
import usePublish from "../../../../../hooks/usePublish";
import {RECRUITMENT_STATE} from "../../../../../constants/state";
import {OPTION_ICONS} from "../../../../../constants/icon";

const {confirm} = Modal

export default function RecruitmentList() {

    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    const {isSuperAdmin} = userInfo
    const {
        dataSource,
        handleRollback,
        handleOffline,
        handlePass,
        handleRefuse,
        handleCommit,
        handlePublish
    } = usePublish()

    const [recruitmentList, setRecruitmentList] = useState()

    useEffect(() => {
        setRecruitmentList(dataSource)
    })

    const renderOptions = (item) => {
        return <Space>
            {/*非超管。可以提交、撤销提交、发布、下线*/}
            {!isSuperAdmin && item.state === RECRUITMENT_STATE.EXAMINE_PASS.value &&
            <Button size="small" type='primary' icon={<ArrowUpOutlined/>}
                    onClick={() => handlePublish(item.recruitmentId)}>发布</Button>}

            {!isSuperAdmin && item.state === RECRUITMENT_STATE.PUBLISHED.value &&
            <Button size="small" danger icon={<ArrowDownOutlined/>}
                    onClick={() => {
                        Modal.confirm({
                            title: '您确认要下线该纳新通知吗？',
                            onOk: () => {
                                handleOffline(item.recruitmentId)
                            }
                        })
                    }}>下线</Button>}

            {!isSuperAdmin && item.state === RECRUITMENT_STATE.EXAMINING.value &&
            <Button size="small" danger icon={<RollbackOutlined/>}
                    onClick={() => handleRollback(item.recruitmentId)}>撤销</Button>}

            {!isSuperAdmin && item.state === RECRUITMENT_STATE.UN_COMMIT.value &&
            <Button size="small" type='primary' icon={OPTION_ICONS.COMMIT}
                    onClick={() => handleCommit(item.recruitmentId)}>提交</Button>}


            {/*{!isSuperAdmin &&*/}
            {/*<Button size="small" danger icon={<DeleteOutlined/>}*/}
            {/*        onClick={() => handleDelete(item.recruitmentId)}>删除</Button>}*/}
            {/*超管。可以通过、拒绝*/}
            {isSuperAdmin && item.state === RECRUITMENT_STATE.EXAMINING.value &&
            <Button size="small" icon={<CheckOutlined/>}
                    onClick={() => handlePass(item.recruitmentId)}>通过</Button>}
            {/* TODO 填写拒绝理由*/}
            {isSuperAdmin && item.state === RECRUITMENT_STATE.EXAMINING.value &&
            <Button size="small" danger icon={<CloseOutlined/>}
                    onClick={() => handleRefuse(item.recruitmentId)}>拒绝</Button>}
        </Space>
    }

    const columns = [
        {
            title: '纳新通知ID',
            dataIndex: 'recruitmentId',
            render(recruitmentId) {
                return <b>{recruitmentId}</b>;
            }
        },
        {
            title: '标题',
            dataIndex: 'title',
            render(title, item) {
                return <Tooltip title="点击查看详情">
                    <a href={`#/manage/recruitment/list/${item.recruitmentId}`}
                    >{title}</a>
                </Tooltip>;
            }
        },
        {
            title: '状态',
            dataIndex: 'state',
            render(state) {
                switch (state) {
                    case RECRUITMENT_STATE.UN_COMMIT.value:
                        return <Badge status="warning" text="未提交"/>
                    case RECRUITMENT_STATE.EXAMINING.value:
                        return <Badge status="processing" text="审核中"/>
                    case RECRUITMENT_STATE.EXAMINE_PASS.value:
                        return <Badge status="success" text="审核通过"/>
                    case RECRUITMENT_STATE.EXAMINE_REFUSE.value:
                        return <Badge status="error" text="审核被拒"/>
                    case RECRUITMENT_STATE.PUBLISHED.value:
                        return <Badge status="success" text="已发布"/>
                    case RECRUITMENT_STATE.OFFLINE.value:
                        return <Badge status="warning" text="已下线"/>
                    default:
                        return <Badge status="error" text="状态异常"/>
                }
            }
        },
        {
            title: '纳新社团组织',
            dataIndex: 'associationName',
        },
        {
            title: '申请人',
            dataIndex: 'name',
        },
        {
            title: '操作',
            render: (item) => renderOptions(item)
        },
    ]

    // 删除确认
    const confirmDelete = (item) => {
        console.log("delete item", item)
        confirm({
            title: '您确认要删除吗？',
            icon: <ExclamationCircleOutlined/>,
            onOk() {
                // 同步页面
                // console.log("同步前端页面")
                const newList = recruitmentList.filter(data => data.id !== item.id)
                setRecruitmentList(newList)
                // 调用后端接口，同步后台数据库
                // TODO 同步后台数据(前台数据不可信？从后台更新后重新获取？)
                // axios.delete(`/association//${item.userId}`)
                //     .then((res) => {
                //
                //     })
                //     .catch((err) => {
                //
                //     })
            },
            onCancel() {

            }
        })
    }

    return (
        <div>
            <Table
                dataSource={recruitmentList}
                columns={columns}
                pagination={{
                    pageSize: 4
                }}
                rowKey={item => item.recruitmentId}
            />
        </div>
    )

}
