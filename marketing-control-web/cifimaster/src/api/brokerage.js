import request from '@/utils/request'

// 切换项目
export function selectCommission(data) {
    return request({
        url: '/Commission/selectCommission',
        method: 'post',
        data
    })
}

//导出
export function updateCommission(data) {
  return request({
      url: '/Commission/updateCommission',
      method: 'post',
      data
  })
}
//终止结佣
export function initCommissionNo(data) {
  return request({
      url: '/Commission/initCommissionNo',
      method: 'post',
      data
  })
}
//不结佣
export function selectCommissionNo(data) {
  return request({
      url: '/Commission/selectCommissionNo',
      method: 'post',
      data
  })
}
// 发放
export function updateGrant(data) {
  return request({
      url: '/Commission/updateGrant',
      method: 'post',
      data
  })
}

// 导入
export function CommissionImport(data) {
  return request({
      url: '/Commission/CommissionImport',
      method: 'post',
      data
  })
}

// 创建核算单
export function createChecklist(data) {
  return request({
      url: '/checklist/createChecklist',
      method: 'post',
      data
  })
}
//核算单渲染
export function getChecklistListPage(data) {
  return request({
      url: '/checklist/getChecklistListPage',
      method: 'post',
      data
  })
}
//核算单明细渲染
export function getChecklistDetailListPage(data) {
  return request({
      url: '/checklist/getChecklistDetailListPage',
      method: 'post',
      data
  })
}
//核算单表格删除
export function deleteChecklist(data) {
  return request({
      url: '/checklist/deleteChecklist',
      method: 'post',
      data
  })
}
//关联核算单
export function relatedChecklist(data) {
  return request({
      url: '/checklist/relatedChecklist',
      method: 'post',
      data
  })}
//核算单明细移除
export function removeChecklistDetail(data) {
  return request({
      url: '/checklist/removeChecklistDetail',
      method: 'post',
      data
  })
}
//核算单明细移除
export function updateProjectAmount(data) {
  return request({
      url: '/checklist/updateProjectAmount',
      method: 'post',
      data
  })
}
//核算单审批
export function checklistApprove(data) {
  return request({
      url: '/checklist/checklistApprove',
      method: 'post',
      data
  })
}

//创建付款单
export function initReceipt(data) {
  return request({
      url: '/Receipt/initReceipt',
      method: 'post',
      data
  })
}
//查询付款单
export function selectReceipt(data) {
  return request({
      url: '/Receipt/selectReceipt',
      method: 'post',
      data
  })
}
//查询渠道名称列表
export function getCurrentRole(data) {
  return request({
      url: '/Commission/getCurrentRole',
      method: 'post',
      data
  })
}
//关联付款单
export function initReceiptDetail(data) {
  return request({
      url: '/Receipt/initReceiptDetail',
      method: 'post',
      data
  })
}
//查询负核算单表格
export function getNegativeChecklist(data) {
  return request({
      url: '/checklist/getNegativeChecklist'+data,
      method: 'get'
  })
}
//创建负核算单表格
export function createNegativeChecklist(data) {
  return request({
      url: '/checklist/createNegativeChecklist',
      method: 'post',
      data
  })
}

//查看佣金政策
export function getChecklistPolicyListPage(data) {
  return request({
      url: '/checklist/getChecklistPolicyListPage',
      method: 'post',
      data
  })
}
//查询佣金政策表格
export function getPolicy(data) {
  return request({
      url: '/policy/getPolicy',
      method: 'post',
      data
  })
}
//核算单关联政策
export function relatedPolicy(data) {
  return request({
      url: '/checklist/relatedPolicy',
      method: 'post',
      data
  })
}
//核算单删除政策
export function removePolicy(data) {
  return request({
      url: '/checklist/removePolicy',
      method: 'post',
      data
  })
}


//创建付款单校验
export function getPaymentStatus(data) {
  return request({
      url: '/Receipt/getPaymentStatus',
      method: 'post',
      data
  })
}

//创建付款单校验
export function selectReceiptDetail(data) {
  return request({
      url: '/Receipt/selectReceiptDetail',
      method: 'post',
      data
  })
}

//创建付款单校验
export function updateReceiptDetail(data) {
  return request({
      url: '/Receipt/updateReceiptDetail',
      method: 'post',
      data
  })
}

//查看付款附件
export function getFileList(data) {
  return request({
      url: '/Receipt/getFileList',
      method: 'post',
      data
  })
}
//附件删除
export function delFile(data) {
  return request({
      url: '/Receipt/delFile',
      method: 'post',
      data
  })
}

//付款单明细删除
export function deleteReceiptDetail(data) {
  return request({
      url: '/Receipt/deleteReceiptDetail',
      method: 'post',
      data
  })
}

//付款单删除
export function deleteReceipt(data) {
  return request({
      url: '/Receipt/deleteReceipt',
      method: 'post',
      data
  })
}

//付款单审核校验
export function updateReceiptMyTrade(data) {
  return request({
      url: '/Receipt/updateReceiptMyTrade',
      method: 'post',
      data
  })
}

//付款单审核
export function receiptAddApproval(data) {
  return request({
      url: '/Receipt/receiptAddApproval',
      method: 'post',
      data
  })
}

//核算单渠道名称
export function getChannelName(data) {
  return request({
      url: '/checklist/getChannelName',
      method: 'post',
      data
  })
}


//核算单撤回
export function checklistWithdraw(data) {
  return request({
      url: '/checklist/checklistWithdraw',
      method: 'post',
      data
  })
}























