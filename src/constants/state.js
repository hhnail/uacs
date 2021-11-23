const USER_STATE = {
    OPEN: {
        value: 'OPEN',
    },
    CLOSE: {
        value: 'CLOSE',
    },
}

/**
 * 纳新通知 状态
 * map
 * 流转过程
 未审核 - 审核中
 审核中 - 审核通过
 审核中 - 审核未通过
 审核通过 - 未发布
 审核通过 - 已发布
 已发布 - 结束
 */
const RECRUITMENT_STATE_MAP = new Map([
    ['UNEXAMINE', '未审核'],
    ['EXAMINING', '审核中'],
    ['EXAMINE_PASS', '审核通过'],
    ['EXAMINE_REFUSE', '审核未通过'],
    ['UNPUBLISH', '未发布'],
    ['PUBLISHED', '已发布'],
    ['OVER', '结束'],
]);

// 未提交-申请中（已提交）-申请通过（未发布）-已发布-下线（时间过了。手动/自动？）
const RECRUITMENT_STATE = {
    UN_COMMIT: {
        name: '未提交',
        value: 'UN_COMMIT',
    },
    EXAMINING: {
        name: '审核中',
        value: 'EXAMINING',
    },
    EXAMINE_PASS: {
        name: '审核通过',
        value: 'EXAMINE_PASS',
    },
    EXAMINE_REFUSE: {
        name: '审核被拒',
        value: 'EXAMINE_REFUSE',
    },
    OFFLINE: {
        name: '已下线',
        value: 'OFFLINE',
    },
    PUBLISHED: {
        name: '已发布',
        value: 'PUBLISHED',
    },
    OVER: {
        name: '流程结束',
        value: 'OVER',
    },
}

// 纳新通知 发布状态map。获取方式：RECRUITMENT_PUBLISH_STATE_MAP.get(key)
const RECRUITMENT_PUBLISH_STATE_MAP = new Map([
    ['UNPUBLISH', '未发布'],
    ['PUBLISHED', '已发布'],
    ['OVER', '结束'],
]);

// 纳新通知 发布状态list。获取方式：RECRUITMENT_PUBLISH_STATE_MAP.xx.xx
const RECRUITMENT_PUBLISH_STATE_LIST = {
    UNPUBLISH: {
        name: '未发布',
        value: 'UNPUBLISH',
    },
    PUBLISHED: {
        name: '已发布',
        value: 'PUBLISHED',
    },
    OVER: {
        name: '结束',
        value: 'OVER',
    },
}

/**
 * 申请状态
 * @type
 * INTERVIEW_PASS:
 * UN_COMMIT:
 * UN_INTERVIEW:
 * CONFIRM:
 * INTERVIEW_INVITING:
 * APPLYING:
 * APPLY_REFUSE:
 * REFUSE_INVITING:
 * REGRET:
 */
const APPLICATION_STATE = {
    UN_COMMIT: {
        name: '未提交申请',
        value: 'UN_COMMIT',
    },
    APPLYING: {
        name: '申请待审核',
        value: 'APPLYING',
    },
    APPLY_REFUSE: {
        name: '申请已被拒',
        value: 'APPLY_REFUSE',
    },
    INTERVIEW_INVITING: {
        name: '邀请面试中',
        value: 'INTERVIEW_INVITING',
    },
    REFUSE_INVITING: {
        name: '拒绝面试邀请',
        value: 'REFUSE_INVITING',
    },
    UN_INTERVIEW: {
        name: '等待面试中',
        value: 'UN_INTERVIEW',
    },
    INTERVIEW_PASS: {
        name: '面试已通过',
        value: 'INTERVIEW_PASS',
    },
    CONFIRM: {
        name: '已正式加入',
        value: 'CONFIRM',
    },
    REGRET: {
        name: '流程已取消',
        value: 'REGRET',
    },
}


// 纳新通知 发布状态list。获取方式：RECRUITMENT_PUBLISH_STATE_MAP.xx.xx
const ASSOCIATION_STATE = {
    APPROVED: {
        key: 1,
        label: '审核通过',
        value: 'APPROVED',
    },
    APPROVING: {
        key: 2,
        label: '审核中',
        value: 'APPROVING',
    },
    APPROVE_FAIL: {
        key: 3,
        label: '审核未通过',
        value: 'APPROVE_FAIL',
    },
    LOCKED: {
        key: 4,
        label: '社团被锁定',
        value: 'LOCKED',
    },
}

const ASSOCIATION_STATE_LIST = [
    {
        key: '1',
        label: '审核通过',
        value: 'APPROVED',
    },
    {
        key: '2',
        label: '审核中',
        value: 'APPROVING',
    },
    {
        key: '3',
        label: '审核未通过',
        value: 'APPROVE_FAIL',
    },
    {
        key: '4',
        label: '社团被锁定',
        value: 'LOCKED',
    },
]


const getAssociationStateLabelByKey = (key) => {
    let stateLabel = ''
    ASSOCIATION_STATE_LIST.map(item => {
        if (item.key === key) {
            stateLabel = item.label
        }
    })
    return stateLabel
}


const ASSOCIATION_TYPE_LIST = [
    {
        label: '学术性社团',
        value: 'ACADEMIC',
    },
    {
        label: '文娱性社团',
        value: 'RECREATIONAL',
    },
    {
        label: '组织性社团',
        value: 'ORGANIZED',
    },
    {
        label: '体能性社团',
        value: 'PHYSICAL',
    },
]

const getAssociationTypeLabel = (value) => {
    let Label = '其他类型'
    ASSOCIATION_TYPE_LIST.map(item => {
        if (item.value === value) {
            Label = item.label
        }
    })
    return Label
}

export {
    USER_STATE,
    RECRUITMENT_STATE_MAP,
    RECRUITMENT_PUBLISH_STATE_MAP,
    RECRUITMENT_PUBLISH_STATE_LIST,
    RECRUITMENT_STATE,
    APPLICATION_STATE,
    ASSOCIATION_STATE,
    getAssociationStateLabelByKey,
    ASSOCIATION_TYPE_LIST,
    getAssociationTypeLabel,
}