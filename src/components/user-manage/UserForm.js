import React, { forwardRef, useState } from 'react'
import {
    Form,
    Input,
    Select
} from 'antd'

const { Option } = Select

const UserForm = forwardRef((props, ref) => {

    const [isDisabled, setIsDisabled] = useState(false)

    const handleRoleChange = (roleName) => {
        console.log("==1 选择角色", roleName);
        if (roleName === "超级管理员") {
            setIsDisabled(true)
            ref.current.setFieldsValue({
                associationName: ''
            })
        } else {
            setIsDisabled(false)
        }
    }

    const handleAssociationChange = () => {
        console.log("==1 选择社团");
    }

    const { associationList, roleList } = props

    return (
        <Form
            layout="horizontal"
            ref={ref}
        >
            {/* 填写学号 */}
            <Form.Item name="user_id" label="学号"
                rules={[{ required: true, message: '该项不得为空！' }]}
            >
                <Input />
            </Form.Item>
            {/* 填写姓名 */}
            <Form.Item name="name" label="姓名"
                rules={[{ required: true, message: '该项不得为空！' }]}
            >
                <Input />
            </Form.Item>
            {/* 选择社团 -- 下拉框 */}
            <Form.Item name="associationName" label="社团"
                rules={isDisabled ? [] : [{ required: true, message: '该项不得为空！' }]}
            >
                <Select placeholder="请选择社团" disabled={isDisabled}
                    style={{ width: '100%' }}
                    onChange={handleAssociationChange}
                >
                    {
                        associationList.map((association) => {
                            return <Option key={association.associationId} value={association.associationName}>{association.associationName}</Option>
                        })
                    }
                </Select>
            </Form.Item>
            {/* 选择角色 -- 下拉框 */}
            <Form.Item name="roleName" label="角色"
                rules={[{ required: true, message: '该项不得为空！' }]}
            >
                <Select placeholder="请为其分配角色"
                    style={{ width: '100%' }}
                    onChange={(roleName) => handleRoleChange(roleName)}>
                    {
                        roleList.map((role) => {
                            return <Option key={role.roleId} value={role.roleName}>{role.roleName}</Option>
                        })
                    }
                </Select>
            </Form.Item>
        </Form>
    )
})

export default UserForm