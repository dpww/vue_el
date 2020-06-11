// 一揽子分期折扣申请列表
import request from '@/utils/request'
export function installment(data) {
    return request({
        url: '/package/stagesSelect',
        method: 'post',
        data
    })
}
//
export function getDetails(data) {
    return request({
        url: '/package/packageApply',
        method: 'post',
        data
    })
}
// 周报生成规则
export function getTableList(data) {
    return request({
        url: '/weeklyRule/WeeklyRuleSelect',
        method: 'post',
        data
    })
}

// 周报删除

export function delTableList(data) {
    return request({
        url: '/weeklyRule/WeeklyRuleDelete',
        method: 'post',
        data
    })
}


// 编辑

export function editTableList(data) {
    return request({
        url: '/weeklyRule/WeeklyRuleUpdate',
        method: 'post',
        data
    })
}

// 新增

export function insertTableList(data) {
    return request({
        url: '/weeklyRule/WeeklyRuleInsert',
        method: 'post',
        data
    })
}
// 周报审批
export function getTitle(parmes) {
    return request({
        url: 'package/getFlowDataInfo'+parmes,
        method: 'get'
    })
}
// 周报审批预览修改回跳
export function selectUrl(data) {
  return request({
      url: "Workflow/selectUrl",
      method: 'post',
      data
  })
}

