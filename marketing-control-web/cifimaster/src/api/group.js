import request from '@/utils/request'

export function getGroupList(data) {
  return request({
    url: '/org/queryAll.action',
    method: 'post',
    data
  })
}
// 更新
export function update(data) {
  return request({
    url: '/org/updateById.action',
    method: 'post',
    data
  })
}
// 保存
export function addDate(data) {
  return request({
    url: '/org/add.action',
    method: 'post',
    data
  })
}
// 分页查询
export function queryPage(data) {
  return request({
    url: '/org/queryPage.action',
    method: 'post',
    data
  })
}
// 删除组织
export function deleteById(data) {
  return request({
    url: '/org/deleteById.action',
    method: 'post',
    data
  })
}
// 启用禁用
export function updateStatus(data) {
  return request({
    url: '/org/updateStatusById.action',
    method: 'post',
    data
  })
}

// 获取中介公司
export function getAllCompanys(data) {
  return request({
    url: '/system/job/company/all',
    method: 'get',
    data
  })

}

// 启用禁用
export function queryChildsOrg(data) {
  return request({
    url: '/org/queryChildsOrg.action',
    method: 'post',
    data
  })
}

// 区域批量推送
export function businessFundsEffective(data) {
  return request({
    url: '/areadetail/businessFundsEffective',
    method: 'post',
    data
  })
}

//   // 区域批量推送
//   export function businessFundsEffective(data) {
//     return request({
//       url: '/areadetail/businessFundsEffective',
//       method: 'post',
//       data
//     })
// }
