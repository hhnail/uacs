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

const GENDER_TYPE = {
    BOY: {
        label: '男',
        value: 'BOY',
    },
    GIRL: {
        label: '女',
        value: 'GIRL',
    },
    UNKONWN: {
        label: '保密',
        value: 'UNKONWN',
    },
}


const IMAGE_TYPE = {
    USER_AVATAR: {
        label: '用户头像',
        value: 'USER_AVATAR',
    },
        USER_ID_PHOTO: {
        label: '证件照',
        value: 'USER_ID_PHOTO',
    },
    SHARE_HEAD_PHOTO: {
        label: '社团经历分享头图',
        value: 'SHARE_HEAD_PHOTO',
    },
    USER_PHOTO_ALBUM: {
        label: '用户相册',
        value: 'USER_PHOTO_ALBUM',
    },
    ASSOCIATION_HOMEPAGE: {
        label: '社团首页',
        value: 'ASSOCIATION_HOMEPAGE',
    },
    ASSOCIATION_PHOTO_ALBUM: {
        label: '社团相册',
        value: 'ASSOCIATION_PHOTO_ALBUM',
    },
    CAROUSEL: {
        label: '首页轮播图',
        value: 'CAROUSEL',
    },
    SYSTEM_BACKGROUND: {
        label: '系统背景图',
        value: 'SYSTEM_BACKGROUND',
    },
}

export {
    ROLE_TYPE,
    TREE_NODE_TYPE,
    GENDER_TYPE,
    IMAGE_TYPE,
}