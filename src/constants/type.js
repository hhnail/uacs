const ROLE_TYPE = {
    STUDENT: {
        key: 1,
        name: '普通学生',
        type: '1',
    },
    ASSOCIATION_ADMIN: {
        key: 2,
        name: '社团管理员',
        type: '1',
    },
    SUPER_ADMIN: {
        key: 3,
        name: '超级管理员',
        type: '1',
    },
}


const TREE_NODE_TYPE = {
    COLLEGE: {
        label: '学院',
        value: 'COLLEGE',
    },
    MAJOR: {
        label: '专业',
        value: 'MAJOR',
    },
    CLASS: {
        label: 'CLASS',
        value: 'CLASS',
    },
    CAMPUS: {
        label: '校区',
    },
    BUILDING: {
        label: '教学楼',
    },
    CLASSROOM: {
        label: '教室',
    },
    TAG: {
        label: '标签',
    },
}

export {
    ROLE_TYPE,
    TREE_NODE_TYPE,
}