import request from '@/utils/request'

  
  /* 集团月度计划查询 */
export function getGroupMonthPlans(params) {
  let {months}=params;
  return request({
    url: `http://localhost:8001/group/getGroupMonthPlans`,
    method: 'post',
	  data:params
  })
  }
    /* 集团月度计划查询 */
export function GetMonthlyPlanByTheMonthCount(params) {
  let {months}=params;
  return request({
    url: `http://localhost:8001/GroupMonthlyPlan/GetMonthlyPlanByTheMonthCount.action`,
    method: 'post',
	  data:params
  })
  
}

export function SetMonthlyPlanInsert(params) {
  let {months}=params;
  
  //http://localhost:8001/GroupMonthlyPlan/SetMonthlyPlanInsert.action
  return request({
    url: `http://localhost:8001/GroupMonthlyPlan/SetMonthlyPlanInsert.action`,
    method: 'post',
	  data:params
  })
  
}


