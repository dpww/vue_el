import request from '@/utils/request'
 //let href="http://10.129.37.101:9000";
 let href=process.env.VUE_APP_BASE_API;
//let href='http://localhost:8001';

/*
href='http://localhost:8001';
http://10.129.37.101:9000
 区域查看区域查看  项目上报
 */
export function regionReportSelect(params) {
  let {regionOrgId,months}=params;
  return request({
    url: `${href}/areadetail/regionReportSelect/${regionOrgId}/${months}`,
    method: 'get'
  })
}
/*
 区域查看项目上报合计
 */
export function regionFundsSelect(params) {
 let {regionOrgId,months}=params;
 return request({
   url: `${href}/areadetail/regionFundsSelect/${regionOrgId}/${months}`,
   method: 'get'
  })
}
/*
 修改区域项目合計
 */

export function regionFundsUpdate(params) {
  return request({
    url: `${href}/areadetail/regionFundsUpdate`,
    method: 'post',
    data:params,
	 headers:{'content-type':'application/json'}
  })
}

/*
 区域项目合計上报
 */
export function regionFundsEffective(params) {
  return request({
    url: `${href}/areadetail/regionFundsEffective`,
    method: 'post',
    data:params,
	 headers:{'content-type':'application/json'}
  })
}
/*
 事业部列表
 */
export function businessDepartSelect(params) {
 let {regionOrgId,months}=params;
 return request({
   url: `${href}/areadetail/businessDepartSelect/${months}`,
   method: 'get'
  })
}
/*
 事业部 项目列表
 */
export function businessprojectSelect(params) {
 let {regionOrgId,months}=params;
 return request({
   url: `${href}/areadetail/businessprojectSelect/${regionOrgId}/${months}`,
   method: 'get'
  })
}
/*
 事业部列表合计
 */
export function businessTotalSelect(params) {
 let {regionOrgId,months}=params;
 return request({
   url: `${href}/areadetail/businessTotalSelect/${regionOrgId}/${months}`,
   method: 'get'
  })
}
/*
 项目级别修改列表合计
 */
export function businessFundsUpdate(params) {
 return request({
   url: `${href}/areadetail/businessFundsUpdate`,
   method: 'post',
   data:params,
    headers:{'content-type':'application/json'}
  })
}
