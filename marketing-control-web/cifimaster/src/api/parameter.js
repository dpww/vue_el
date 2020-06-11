import request from '@/utils/request'

// 查询所有的参数
export function getSystemAllParams(data) {
  return request({
    url: '/param/getSystemAllParams.action',
    method: 'post',
    data
  })
}


// 保存系统参数
export function saveSystemParam(data) {
  return request({
    url: '/param/saveSystemParam.action',
    method: 'post',
    data
  })
}

// 修改系统参数
export function modifySystemParam(data) {
  return request({
    url: '/param/modifySystemParam.action',
    method: 'post',
    data
  })
}

// 启用/禁用系统参数
// export function modifySystemParamStatus(data) {
//   return request({
//     url: '/param/modifySystemParamStatus.action',
//     method: 'post',
//     data
//   })
// }

// 删除系统参数
export function removeSystemParam(data) {
  return request({
    url: '/param/removeSystemParam.action',
    method: 'post',
    data
  })
}

// 查询子集参数（非树形）
export function getSystemChildParams(data) {
  return request({
    url: '/param/getSystemChildParams.action',
    method: 'get',
    params: {
      pid: data.pid,
      projectId: data.projectId,
      pageSize: data.pageSize,
      pageIndex: data.pageIndex,
    }
  })
}// 查询子集参数（非树形）

// 查询子集参数（树形）
export function getSystemTreeChildParams(data) {
  return request({
    url: '/param/getSystemTreeChildParams.action',
    method: 'get',
    params: {
      id: data.id,
      projectId: data.projectId
    }
  })
}
