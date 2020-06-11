import request from '@/utils/request'

export function getAllProject() {
  return request({
    url: 'pro/getProjectList.action',
    method: 'post'
  })
}
export function queryLogInfo(data) {
  return request({
    url: 'log/queryLogInfo.action',
    method: 'post',
    data
  })
}
