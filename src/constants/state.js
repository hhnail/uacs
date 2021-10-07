/**
 * 纳新通知信息 状态
 流转过程
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

const RECRUITMENT_PUBLISH_STATE_MAP = new Map([
    ['UNPUBLISH', '未发布'],
    ['PUBLISHED', '已发布'],
    ['OVER', '结束'],
]);

export {RECRUITMENT_STATE_MAP, RECRUITMENT_PUBLISH_STATE_MAP}