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

const RECRUITMENT_STATE = {
    UNEXAMINE: {
        name: '未审核',
        value: 'UNEXAMINE',
    },
    EXAMINING: {
        name: '审核中',
        value: 'EXAMINING',
    },
    EXAMINE_PASS: {
        name: '审核通过',
        value: 'EXAMINE_PASS',
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

// 纳新通知 发布状态list。获取方式：RECRUITMENT_PUBLISH_STATE_MAP.xx.xx
const APPLICATION_STATE = {
    UN_COMMIT: {
        name: '未提交申请',
        value: 'UN_COMMIT',
    },
    APPLYING: {
        name: '申请中',
        value: 'APPLYING',
    },
    APPLY_REFUSE: {
        name: '申请被拒',
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
        name: '待面试',
        value: 'UN_INTERVIEW',
    },
    INTERVIEW_PASS: {
        name: '面试通过',
        value: 'INTERVIEW_PASS',
    },
    CONFIRM: {
        name: '确认加入',
        value: 'CONFIRM',
    },
    REGRET: {
        name: '流程取消',
        value: 'REGRET',
    },
}

export {
    RECRUITMENT_STATE_MAP,
    RECRUITMENT_PUBLISH_STATE_MAP,
    RECRUITMENT_PUBLISH_STATE_LIST,
    RECRUITMENT_STATE,
    APPLICATION_STATE,
}