import request from '@/utils/request'
//let href='http://localhost:8001';
 //let href="http://10.129.37.102:9200";
let href=process.env.VUE_APP_BASE_API;
/* 集团月度计划查询 */
export function getGroupMonthPlans(params) {
  let {months}=params;
  return request({
    url: `${href}/group/getGroupMonthPlans`,
    method: 'post',
	  data:params
  })
}

/* 下发区域详情指标 和（編制）*/
export function getGroupAllMessage(params){
  return request({
    url: `${href}/group/getGroupAllMessages`,
    method: 'post',
    data:params
  })
}
/* 区域月度计划查询 */
export function getRegionalMonthPlans(params){
  return request({
    url:`${href}/group/getRegionalMonthPlans`,
    method:'post',
    data:params
  })
}
/* 获取区域月计划里的集团下达数据 */
export function getGroupReleaseInRegional(params){
  return request({
      url:`${href}/group/getGroupReleaseInRegional`,
      method:'post',
      data:params
  })
}
/* 获取区域月计划里的区域下达数据 */
export function getRegionalMessages(params){
  return request({
    url:`${href}/group/getRegionalMessages`,
    method:'post',
    data:params
  })
}
