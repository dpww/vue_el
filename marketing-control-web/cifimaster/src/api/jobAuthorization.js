import request from '@/utils/request'

// 获取指定岗位
export function getJobByAuthId(data) {
  return request({
    url: '/system/job/getJobByAuthId.action',
    method: 'get',
    params: {
      AuthCompanyID: data.AuthCompanyID,
      ProductID: data.ProductID,
      OrgID: data.OrgID,
      pageSize: data.pageSize,
      pageNum: data.pageNum
    }
  })
}

// 查询所有的组织结构
export function getGroupList(data) {
  return request({
    url: '/org/queryAll.action',
    method: 'post',
    data
  })
}

// 查询通用岗位
export function getAllCommonJob(data) {
  return request({
    url: '/system/job/getAllCommonJob.action',
    method: 'get',
    params: {
      AuthCompanyID: data.AuthCompanyID,
      ProductID: data.ProductID,
      JobName: data.JobName
    }
  })
}

// 获取岗位下的人员
export function getSystemUserList(data) {
  return request({
    url: '/system/job/getSystemUserList.action',
    method: 'post',
    data
  })
}

// 获取当前和下属所有组织岗位
export function getSystemJobAllList(data) {
  return request({
    url: '/system/job/getSystemJobAllList.action',
    method: 'post',
    data
  })
}

// 查询所有的组织结构
export function getAllOrg(data) {
  return request({
    url: '/system/job/getAllOrg.action',
    method: 'get',
    params: {
      AuthCompanyID: data.AuthCompanyID,
      ProductID: data.ProductID,
      OrgID: data.OrgID,
      PID: data.PID
    }
  })
}

// 新增岗位-插入Jobs信息
export function saveSystemJobForManagement(data) {
  return request({
    url: '/system/job/saveSystemJobForManagement.action',
    method: 'post',
    data
  })
}

// 删除岗位信息
export function removeSystemJobByUserId(data) {
  return request({
    url: '/system/job/removeSystemJobByUserId.action',
    method: 'post',
    data
  })
}

// 修改岗位信息
export function modifySystemJobByUserId(data) {
  return request({
    url: '/system/job/modifySystemJobByUserId.action',
    method: 'post',
    data
  })
}

// 查询引入用户
export function pullinUser(data) {
  return request({
    url: '/system/job/pullinUser.action',
    method: 'post',
    data
  })
}

// 保存用户
export function saveSystemUser(data) {
  return request({
    url: '/system/job/saveSystemUser.action',
    method: 'post',
    data
  })
}

// 删除用户
export function removeSystemJobUserRel(data) {
  return request({
    url: '/system/job/removeSystemJobUserRel.action',
    method: 'post',
    data
  })
}

// 修改用户
export function modifySystemJobUserRel(data) {
  return request({
    url: '/system/job/modifySystemJobUserRel.action',
    method: 'post',
    data
  })
}

// 保存岗位下的用户
export function saveSystemJobUserRel(data) {
  return request({
    url: '/system/job/saveSystemJobUserRel.action',
    method: 'post',
    data
  })
}

// 获取所有菜单
export function getAllMenus(data) {
  return request({
    url: '/system/job/menu/list',
    method: 'post',
    data
  })
}

//保存指定岗位权限
export function saveJobMenus(data) {
  return request({
    url: '/system/job/menu/save',
    method: 'post',
    data
  })
}
//保存通用指定岗位权限
export function saveCommonJobMenus(data) {
  return request({
    url: '/system/job/common/menu/save',
    method: 'post',
    data
  })
}


// 获取所有菜单
export function getCommonAllMenus(data) {
  return request({
    url: '/system/job/common/menu',
    method: 'post',
    data
  })
}

// 导入数据
export function getAllVistData() {
  return request({
    url: '/excel/getAllImportData',
    method: 'get',
    timeout: 10000000
  })
}
//确认导入
export function importBizTable() {
  return request({
    url: '/excel/importBizTable',
    method: 'post',
    timeout: 10000000
  })
}
/* 获取所有报表 */
export function getReportForm(data){
  return request({
    url:'/system/job/report/getFunctions',
    method:'post',
    data
  });
}
/* 保存报表 */
export function seveReportForm(data){
  return request({
    url:'/system/job/report/saveAuthorization',
    method:'post',
    data
  });
}
// 岗位组
/* 获取所有报表 */
export function getReport__Form(data){
  return request({
    url:'system/job/common/ReportMenu',
    method:'post',
    data
  });
}
/* 保存报表 */
export function seveReport__Form(data){
  return request({
    url:'system/job/common/reportMenu/save',
    method:'post',
    data
  });
}



/* 获取所有报表 */
export function getDATA__Form(data){
  return request({
    url:'org/getAreaProjectRel.action',
    method:'post',
    data
  });
}
/* 保存报表 */
export function seveDATA__Form(data){
  return request({
    url:'org/addAreaProjectRel.action',
    method:'post',
    data
  });
}
