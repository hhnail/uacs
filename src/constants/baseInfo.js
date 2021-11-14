import {
    AuditOutlined,
    BarsOutlined,
    ClusterOutlined,
    FormOutlined,
    TableOutlined,
    TeamOutlined,
    UsergroupAddOutlined
} from "@ant-design/icons";
import {ReactComponent as HomeIcon} from "../icons/home.svg";
import {ReactComponent as ResumeIcon} from "../icons/resume.svg";
import {ReactComponent as AccountManageIcon} from "../icons/account-manage.svg";
import {ReactComponent as ShareManageIcon} from "../icons/share.svg";
import {ReactComponent as RecruitmentIcon} from "../icons/recruitment.svg";
import {ReactComponent as PermissionIcon} from "../icons/permission.svg";
import React from "react";

const MAJORANDCLASS = [
    {
        value: '航海学院',
        label: '航海学院',
        children: [],
    },
    {
        value: '轮机工程学院',
        label: '轮机工程学院',
        children: [],
    },
    {
        value: '水产学院',
        label: '水产学院',
        children: [],
    },
    {
        value: '海洋食品与生物工程学院',
        label: '海洋食品与生物工程学院',
        children: [],
    },
    {
        value: '体育学院',
        label: '体育学院',
        children: [],
    },
    {
        value: '财经学院',
        label: '财经学院',
        children: [],
    },
    {
        value: '师范学院',
        label: '师范学院',
        children: [],
    },
    {
        value: '工商管理学院',
        label: '工商管理学院',
        children: [
            {
                value: '工商管理',
                label: '工商管理',
                children: [
                    {
                        value: '工商1811',
                        label: '工商1811',
                    },
                    {
                        value: '工商1812',
                        label: '工商1812',
                    },
                    {
                        value: '工商1813',
                        label: '工商1813',
                    },
                    {
                        value: '工商1814',
                        label: '工商1814',
                    },
                ],
            },
            {
                value: '电子商务',
                label: '电子商务',
                children: [
                    {
                        value: '商务1811',
                        label: '商务1811',
                    },
                    {
                        value: '商务1812',
                        label: '商务1812',
                    }
                ],
            },
            {
                value: '旅游管理',
                label: '旅游管理',
                children: [
                    {
                        value: '旅游1811',
                        label: '旅游1811',
                    },
                    {
                        value: '旅游1812',
                        label: '旅游1812',
                    }
                ],
            },
        ],
    },
    {
        value: '音乐学院',
        label: '音乐学院',
        children: [],
    },
    {
        value: '美术与设计学院',
        label: '美术与设计学院',
        children: [],
    },
    {
        value: '海洋信息工程学院',
        label: '海洋信息工程学院',
        children: [],
    },
    {
        value: '计算机工程学院',
        label: '计算机工程学院',
        children: [
            {
                value: '软件工程',
                label: '软件工程',
                children: [
                    {
                        value: '软工1812',
                        label: '软工1812',
                    },
                ],
            },
        ],
    },
]

const COLLEGE = [
    {
        value: '航海学院',
        label: '航海学院',
    },
    {
        value: '轮机工程学院',
        label: '轮机工程学院',
    },
    {
        value: '水产学院',
        label: '水产学院',
    },
    {
        value: '海洋食品与生物工程学院',
        label: '海洋食品与生物工程学院',
    },
    {
        value: '体育学院',
        label: '体育学院',
    },
    {
        value: '财经学院',
        label: '财经学院',
    },
    {
        value: '师范学院',
        label: '师范学院',
    },
    {
        value: '工商管理学院',
        label: '工商管理学院',
    },
    {
        value: '音乐学院',
        label: '音乐学院',
    },
    {
        value: '美术与设计学院',
        label: '美术与设计学院',
    },
    {
        value: '海洋信息工程学院',
        label: '海洋信息工程学院',
    },
    {
        value: '计算机工程学院',
        label: '计算机工程学院',
    },
]

const USER_TAG_LIST = [
    {
        key: '0',
        tagName: '足球',
        tagType: '运动类',
    },
    {
        key: '1',
        tagName: '篮球',
        tagType: '运动类',
    },
]

const MAJORANDCLASS4Table = [
    {
        key: 1,
        title: '航海学院',
        value: '航海学院',
        url: 'https://nav-jmu-edu-cn.webvpn.jmu.edu.cn',
        children: []
    },
    {
        key: 2,
        title: '轮机工程学院',
        value: '轮机工程学院',
        url: 'https://mei-jmu-edu-cn.webvpn.jmu.edu.cn',
        children: []
    },
    {
        key: 3,
        title: '水产学院',
        value: '水产学院',
        url: 'https://fishery-jmu-edu-cn.webvpn.jmu.edu.cn',
        children: []
    },
    {
        key: 4,
        title: '海洋食品与生物工程学院',
        value: '海洋食品与生物工程学院',
        url: 'https://bec-jmu-edu-cn.webvpn.jmu.edu.cn',
        children: []
    },
    {
        key: 5,
        title: '体育学院',
        value: '体育学院',
        url: 'https://phys-jmu-edu-cn.webvpn.jmu.edu.cn',
        children: []
    },
    {
        key: 6,
        title: '财经学院',
        value: '财经学院',
        url: 'https://cjc-jmu-edu-cn.webvpn.jmu.edu.cn',
        children: []
    },
    {
        key: 7,
        title: '师范学院',
        value: '师范学院',
        url: 'https://teacher-jmu-edu-cn.webvpn.jmu.edu.cn',
        children: []
    },
    {
        key: 8,
        title: '工商管理学院',
        value: '工商管理学院',
        url: 'https://ms-jmu-edu-cn.webvpn.jmu.edu.cn',
        children: []
    },
    {
        key: 9,
        title: '音乐学院',
        value: '音乐学院',
        url: 'https://com-jmu-edu-cn.webvpn.jmu.edu.cn',
        children: []
    },
    {
        key: 10,
        title: '美术与设计学院',
        value: '美术与设计学院',
        url: 'https://arts-jmu-edu-cn.webvpn.jmu.edu.cn',
        children: []
    },
    {
        key: 11,
        title: '海洋信息工程学院',
        value: '海洋信息工程学院',
        url: 'https://ie-jmu-edu-cn.webvpn.jmu.edu.cn',
        children: []
    },
]
// 计算机工程学院	https://cec-jmu-edu-cn.webvpn.jmu.edu.cn
// 海洋装备与机械工程学院	http://mee.jmu.edu.cn
// 理学院	https://sci-jmu-edu-cn.webvpn.jmu.edu.cn
// 外国语学院	https://sfl-jmu-edu-cn.webvpn.jmu.edu.cn
// 海洋文化与法律学院	https://chin-jmu-edu-cn.webvpn.jmu.edu.cn
// 港口与海岸工程学院	http://heec.jmu.edu.cn
// 马克思主义学院	https://szb-jmu-edu-cn.webvpn.jmu.edu.cn
// 继续教育学院（船员培训中心）	https://ae-jmu-edu-cn.webvpn.jmu.edu.cn
// 海外教育学院	https://oec-jmu-edu-cn.webvpn.jmu.edu.cn
// 诚毅学院	https://chengyi.webvpn.jmu.edu.cn


const INTERVIEW_ADDRESS_CASCADER_OPTIONS = [
    {
        value: '集大本部',
        label: '集大本部',
        name:'hhhh',
        children: [
            {
                value: '美岭楼',
                label: '美岭楼',
                children: [
                    {
                        value: '美岭201',
                        label: '美岭201',
                    },
                ],
            },
            {
                value: '建发楼',
                label: '建发楼',
                children: [
                    {
                        value: '建发201',
                        label: '建发201',
                    },
                ],
            },
            {
                value: '禹洲楼',
                label: '禹洲楼',
                children: [
                    {
                        value: '禹洲201',
                        label: '禹洲201',
                    },
                ],
            },
        ],
    },
    {
        value: '财经学院',
        label: '财经学院',
        children: [
            {
                value: '陆大楼',
                label: '陆大楼',
                children: [
                    {
                        value: '陆大201',
                        label: '陆大201',
                    },
                ],
            },
        ],
    },
];

export {
    MAJORANDCLASS,
    USER_TAG_LIST,
    MAJORANDCLASS4Table,
    COLLEGE,
    INTERVIEW_ADDRESS_CASCADER_OPTIONS
}