import request from '@/utils/request'

export function examineInfo(data) {
  return request({
      url: '/api/public/selectdatatobpm',
      method: 'post',
      data
  })
}

//http://192.168.42.133:8002锦章测试
export function sjl(data) {
  return request({
      url: 'package/packageApply',
      method: 'post',
      data
  })
}

export function PJZ(data) {
  return request({
      url: '/dcs.web/onlinefile',
      method: 'post',
      data
  })
}

export function costInfo(data) {
  return request({
      url: 'api/public/selectdatatobpm',
      method: 'post',
      data
  })
}

// 审批查看接口 要光
export function toHistoryUrl(data) {
  return request({
      url: '/Workflow/toHistoryUrl',
      method: 'post',
      data
  })
}

// 审批查看接口 要光
export function queryFlowId(data,BOID) {
  return request({
      url: `WorkflowChoose/queryFlowId?BOID=${BOID}`,
      method: 'post',
      data
  })
}

// 审批查看接口 要光
export function SendApproveCheck(data) {
  return request({
      url: 'Workflow/SendApproveCheck',
      method: 'post',
      data
  })
}


// 校验是否关联交易 要光
export function transaction(data) {
  return request({
      url: 'Workflow/transaction',
      method: 'post',
      data
  })
}
// 一揽子分期/折扣审批数据渲染
export function viewPackageDiscount(data) {
  return request({
    url: 'packageStage/viewPackageDiscount',
    method: 'post',
    data
  })
}
// 打印  锦章
export function contractPrint(data) {
  return request({
    url: 'api/contractPrint',
    method: 'post',
    data
  })
}
// 一揽子分期折扣/保存/提交
export function savePackageDiscount(data) {
  return request({
    url: 'packageStage/savePackageDiscount',
    method: 'post',
    data
  })
}
// 一揽子分期折扣申请列表
export function getApplayList(data) {
  return request({
    url: 'packageStage/getApplayList',
    method: 'post',
    data
  })
}
// 一揽子分期折扣切换楼栋
export function getBuildDataByProjectId(data) {
  return request({
    url: 'packageStage/getBuildDataByProjectId',
    method: 'post',
    data
  })
}
/* get */
export function get(url, params) {
  return request({
    url: url,
    method: 'get',
    params
  });
}
/* 审批页面通过cookie刷新token */
export function foreignLogin(data) {
  return request({
    url: '/auth/foreignLogin',
    method: 'post',
    data
  })
}






