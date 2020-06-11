import request from '@/utils/request'
/* 项目月度计划查询 */
export function getProjectMonthPlans(params) {
  return request({
    url: `http://localhost:8001/group/getProjectMonthPlans`,
    method: 'post',
	  data:params
  })
}
/* 从项目月度计划获取区域下达数据 */
export function getRegionalReleaseInProject(params){
  return request({
    url:`http://localhost:8001/group/getRegionalReleaseInProjects`,
    method:'post',
    data:params
  })
}
