import request from '@/utils/request'

export function changeChecked(data) {
  return request({
      url: '/weeklyMarketing/updateCheckeds',
      method: 'post',
      data
  })
}
export function submitApproval(data) {
  return request({
      url: '/weeklyMarketing/reportExcel',
      method: 'post',
      data
  })
}

