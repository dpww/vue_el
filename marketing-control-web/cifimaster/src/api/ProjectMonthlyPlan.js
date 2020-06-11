import request from '@/utils/request'
//let href="http://localhost:8001";
//let href="http://10.129.37.102:9000";
let href=process.env.VUE_APP_BASE_API;
/*
 表一接口如下
 */
/*
 获取表一初始化项目数据
 */
export function getProjectMessages(params) {

 return request({
   url: `${href}/group/getProjectMessages`,
   method: 'post',
   data:params,
   headers:{'content-type':'application/json'}
  })
}
/*
 暂存表一数据
 */
export function updateMonthlyPlan(params) {

 return request({
   url: `${href}/group/updateMonthlyPlan`,
   method: 'post',
   data:params,
   headers:{'content-type':'application/json'}
  })
}
/*
 表一上报
 */
export function updatePlanStatus(params) {

 return request({
   url: `${href}/group/updatePlanEffective`,
   method: 'post',
   data:params,
   headers:{'content-type':'application/json'}
  })
}


/*
 月度计划明细接口如下：
 */

/*
 查找月度计划明细到表二，若没有则初始化
 */
export function allMouthPlanSelect(params) {
  let {projectId,months,is_effective,userId}=params;
  return request({
    url: `${href}/projectmanager/allMouthPlanSelect/${userId}/${projectId}/${months}/${is_effective}`,
    method: 'get'
  })
}
/*
 更新表二信息（月度计划明细）
 */
export function mouthPlanUpdate(params) {

 return request({
   url: `${href}/projectmanager/mouthPlanUpdate`,
   method: 'post',
   data:params,
   headers:{'content-type':'application/json'}
  })
}
/*
 通过项目ID和月份来设置表二（月度计划明细）是否生效状态
 */
export function mouthPlanEffective(params) {
  let {projectId,months,is_effective}=params;
  return request({
    url: `${href}/projectmanager/mouthPlanEffective/${projectId}/${months}/${is_effective}`,
    method: 'get'
  })
}



/*
 月度计划渠道费用明细接口如下
 */

/*
 查询月度计划渠道费用明细
 */
export function allChannelDetail(params) {
  let {projectId,months,is_effective}=params;
    return request({
    url: `${href}/projectmanager/allChannelDetail/${projectId}/${months}/${is_effective}`,
    method: 'get'
  })
}

/*
 通过项目ID和月份更新渠道费用明细
 */
export function updateChannelDetail(params) {

  return request({
    url: `${href}/projectmanager/updateChannelDetail`,
    method: 'post',
    data:params,
	headers:{'content-type':'application/json'}
  })
}


/*
通过项目ID和月份来更改渠道费用明细生效状态
 */
export function channelDetailEffective(params) {
  let {projectId,months,is_effective}=params;
  return request({
    url: `${href}/projectmanager/channelDetailEffective/${projectId}/${months}/${is_effective}`,
    method: 'get'
  })
}

/*
周计划接口
 */
/*
通过项目ID和月份来查找周计划
 */
export function allWeeklyPlanSelect(params) {
  let {projectId,months,is_effective}=params;
  return request({
    url: `${href}/projectmanager/allWeeklyPlanSelect/${projectId}/${months}/${is_effective}`,
    method: 'get'
  })
}
/*
通过项目ID和月份来决定周计划生效状态
 */
export function weeklyPlanIsEffective(params) {
  let {projectId,months,is_effective}=params;
  return request({
    url: `${href}/projectmanager/weeklyPlanIsEffective/${projectId}/${months}/${is_effective}`,
    method: 'get'
  })
}
/*
 通过项目ID和月份来跟新周计划
 */
export function updateWeeklyPlan(params) {

  return request({
    url: `${href}/projectmanager/updateWeeklyPlan`,
    method: 'post',
    data:params,
	headers:{'content-type':'application/json'}
  })
}



/*
 通过项目ID和月份来设置表 四（月度计划明细）里面的风险
 */
export function mouthPlanUpdateRisk(params) {

  return request({
    url: `${href}/projectmanager/mouthPlanUpdateRisk`,
    method: 'post',
    data:params,
	headers:{'content-type':'application/json'}
  })
}

/*
 附件上传
 */
export function UploadAttach(params) {

 return request({
   url: `${href}/projectmanager/UploadAttach`,
   method: 'post',
   data:params
  })
}
    /**
     * 附件的删除
     *
     * @return
     */
   export function deleteAttach(params) {
   let {fileID,IsDel}=params;
    return request({
      url: `${href}/projectmanager/deleteAttach/${fileID}/${IsDel}`,
      method: 'get'
     })
   }
   /**
     * 附件传到前端
     *
     * @return
     */
   export function selectAttach() {

    return request({
      url: `${href}/projectmanager/selectAttach`,
      method: 'get'
     })
   }

   /*
//  获取周规则
//  */
// export function getMonthBiao(data) {

//   return request({
//     url: `/datainterface/getMonthBiao`,
//     method: 'post',
//     data
// 	// headers:{'content-type':'application/json'}
//   })
// }
