import BatchImport from "./BatchImport";
import {Alert, Button, message, Modal, Tag} from "antd";
import React, {useEffect, useRef, useState} from "react";
import UserForm from "../../../../../components/user-manage/UserForm";
import {addUser, getAllAssociationList, getRoleList} from "../../../../../services/db";

export default function BatchAddAssociation() {

    const addFormRef = useRef(null)
    const [isAddModalVisible, setIsAddModalVisible] = useState(false)
    const [associationList, setAssciationList] = useState([])
    const [roleList, setRoleList] = useState([])

    // 获取社团列表供用户选择加入的社团 & 获取角色列表
    useEffect(() => {
        getAllAssociationList().then(res => {
            setAssciationList(res.data.data)
        })
        getRoleList().then(res => {
            setRoleList(res.data.data)
        })
    }, [])

    // 模态框 确认 添加成员
    const handelUserAddModalOk = () => {
        addFormRef.current.validateFields()
            .then(value => {
                setIsAddModalVisible(false)// 关闭模态框

                // 封装表单信息
                const userObj = {
                    userId: value.user_id,
                    name: value.name,
                    roleName: value.roleName,
                    associationName: value.associationName
                }

                // 清空表单信息
                addFormRef.current.resetFields()

                addUser(userObj).then((res) => {
                    message.success("新增成功！")
                })
            })
    }

    return <div style={{
        display: 'flex',
        flexDirection: 'row',
        margin: '10px 0px 20px 0px',
    }}>
        <div style={{
            width: 498,
            height: 280,
            marginLeft: 50,
        }}>
            <BatchImport/>
        </div>
        <Button type="primary"
                style={{
                    marginLeft: -85,
                    marginTop: -3,
                }}
                onClick={() => {
                    setIsAddModalVisible(true)
                }}
        >
            新增成员
        </Button>
        <Alert message="数据格式" type="info" closable
               style={{
                   height: 280,
                   width: 700,
                   marginLeft: 30,
               }}
               description={<div>
                   <div><Tag color="red">必选</Tag>@列1 - 学号；格式：英文或数字组合，最长不超过20个字符</div>
                   <div><Tag color="red">必选</Tag>@列2 - 姓名：格式：中文或英文，最长不超过50个字符</div>
                   <div><Tag color="red">必选</Tag>@列3 - 角色：【普通学生、社团成员、社团管理员、社团会长、社团副会长】</div>
                   <div><Tag color="red">必选</Tag>@列4 - 所属社团：从先有社团中选择。若上述角色为普通学生，可不填。</div>
                   <div><Tag color="cyan">可选</Tag>@列5 - 密码：格式：字符和数字的组合，最短6个字符，最长不超过50个字符。系统默认密码为学号后6位</div>
                   <div><Tag color="cyan">可选</Tag>@列6 - 性别：格式：仅能选择【男、女或保密】，系统默认性别为保密</div>
                   <div style={{
                       marginTop: 9,
                       color: 'red',
                   }}>批量导入失败请检查上述数据格式。若还不成功，请联系管理员18030290509
                   </div>
               </div>}
        />
        {/* 添加成员 Modal */}
        <Modal
            visible={isAddModalVisible}
            title="创建新成员"
            okText="确认"
            cancelText="取消"
            onCancel={() => {
                setIsAddModalVisible(false)
            }}
            onOk={handelUserAddModalOk}
        >
            <UserForm
                associationList={associationList}
                roleList={roleList}
                ref={addFormRef}/>
        </Modal>
    </div>
}