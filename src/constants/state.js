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

export {
    RECRUITMENT_STATE_MAP,
    RECRUITMENT_PUBLISH_STATE_MAP,
    RECRUITMENT_PUBLISH_STATE_LIST
}