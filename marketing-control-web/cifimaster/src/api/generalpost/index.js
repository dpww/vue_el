import request from '@/utils/request'

export function getTableDataList(data) {
    return request({
        url: '/system/projectClues/selectAllQudao.action',
        method: 'post',
        data
    })
}

// 查询渠道重分配记录
export function ProjectClueDeriveMustAcByToker(data) {
  return request({
    url: '/system/projectClues/ProjectClueDeriveMustAcByToker',
    method: 'post',
    data
  })
}

// 查询案场重分配记录
export function queryRedistributionRecord(data) {
  return request({
    url: '/system/projectClues/queryRedistributionRecord',
    method: 'post',
    data
  })
}

// 重分配接口
export function redistribution(data) {
  return request({
    url: '/system/projectClues/redistribution',
    method: 'post',
    timeout:120000,
    data
  })
}

// 重分配选择人员
export function selectMan(data) {
  return request({
    url: '/system/projectClues/selectMan.action',
    method: 'post',
    data
  })
}

// 查询重分配原因
export function getClueResetCause(data) {
  return request({
    url: '/publicPool/getClueResetCause',
    method: 'post',
    data
  })
}
