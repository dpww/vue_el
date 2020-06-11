
import request from '@/utils/request'
//风控列表信息
export function ristListInfo(data) {
  return request({
      url: '/riskControl/getRiskData',
      method: 'post',
      data
  })
}
// 风控详细信息
export function getRiskDetail(data) {
  return request({
      url: 'riskControl/getRiskDetail',
      method: 'post',
      data
  })
}

// 选择区域事业部
export function findBusinessName(data){
  return request({
    url:"/riskControl/findBusinessName",
    method: 'post',
    data
  });
}
