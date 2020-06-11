import request from '@/utils/request'
let href=process.env.VUE_APP_BASE_API;
// let href="http://localhost:8001";
export function getList(params) {
    return request({
        url: '/table/list',
        method: 'get',
        params
    })
}

//
export function getTreeList() {
    return request({
        url: '/system/job/org/project',
        method: 'get',
    })
}//
export function getTreeList2() {
    return request({
        url: '/system/job/org/project2',
        method: 'get',
    })
}

//  查询外渠的规则
export function channelRuleOuterCanal(data) {
    return request({
        url: '/system/projectClues/selectRuleCompany.action',
        method: 'post',
        data
    })
}

// 查询案场和自渠的公共规则
export function channelRule(data) {
    return request({
        url: '/system/projectClues/selectRuleInfo.action',
        method: 'post',
        data
    })
}
//  规则的操作
export function updateChannelRule(data) {
    return request({
        url: '/system/projectClues/updateChannelRule.action',
        method: 'post',
        data
    })
}
// 查询岗位
export function getChommenJobs(data) {
    return request({
        url: '/job/common/commonJobsSelectAll.action',
        method: 'post',
        data
    })
}

// 添加通用岗位
export function insertJobs(data) {
    return request({
        url: '/job/common/systemCommonJob_Insert.action',
        method: 'post',
        data
    })
}

// 删除通用岗位
export function deleteJobs(data) {
    return request({
        url: '/job/common/systemCommonJobDelete.action',
        method: 'post',
        data
    })
}

// 启用禁用通用岗位
export function updateJobs(data) {
    return request({
        url: '/job/common/systemCommonJobStatusUpdate.action',
        method: 'post',
        data
    })
}

// 更新通用岗位
export function systemCommonJobUpdate(data) {
    return request({
        url: '/job/common/systemCommonJobUpdate.action',
        method: 'post',
        data
    })
}

// 查询所有的可操作项目
export function projectListSelect(data) {
    return request({
        url: '/manager/projectListSelect.action',
        method: 'post',
        data
    })
}

// 启用禁用可操作项目
export function projectIsEnableUpdate(data) {
    return request({
        url: '/manager/projectIsEnableUpdate.action',
        method: 'post',
        data
    })
}

// 删除可操作项目
export function projectDeleteUpdate(data) {
    return request({
        url: '/manager/projectDeleteUpdate.action',
        method: 'post',
        data
    })
}
// 添加引入项目
export function addGlProject(data) {
  return request({
      url: '/manager/addGlProject.action',
      method: 'post',
      data
  })
}
// 编辑可操作项目
export function updateProject(data) {
  return request({
      url: '/manager/updateProject.action',
      method: 'post',
      data
  })
}
// 引入项目
export function getWglProject(data) {
  return request({
      url: '/manager/getWglProject.action',
      method: 'post',
      data
  })
}

// 编辑时查询单个的项目信息
export function selectOneProject(data) {
    return request({
        url: '/manager/selectOneProject.action',
        method: 'post',
        data
    })
}

// // 更新
// export function updateProject(data) {
//     return request({
//         url: '/system/job/project/update',
//         method: 'post',
//         data
//     })
// }

// 查询案场的台账信息
export function courtCase(data) {
    return request({
        url: '/system/projectClues/courtCase.action',
        method: 'post',
        data
    })
}

// 查询公共池信息
export function selectAllPublic(data) {
    return request({
        url: '/publicPool/selectAllPublic.action',
        method: 'post',
        data
    })
}

// 查询基本信息
export function essentialInformation(data) {
  return request({
    url: '/system/projectClues/essentialInformation',
    method: 'post',
    data
  })
}

// 查询客户详情中的关联客户
export function associatedCustomers(data) {
  return request({
    url: '/system/projectClues/associatedCustomers',
    method: 'post',
    data
  })
}

// 查询客户详情中的跟进记录
export function followUpRecord(data) {
  return request({
    url: '/system/projectClues/followUpRecord',
    method: 'post',
    data
  })
}

// 查询客户详情中的转介记录
export function toMoveRecord(data) {
  return request({
    url: '/system/projectClues/toMoveRecord',
    method: 'post',
    data
  })
}

// 查询客户详情中的节点记录
export function nodeRecord(data) {
  return request({
    url: '/system/projectClues/nodeRecord',
    method: 'post',
    data
  })
}

// 查询客户详情中的首访问卷
export function firstInterviewQuestionnaire(data) {
  return request({
    url: '/system/projectClues/firstInterviewQuestionnaire',
    method: 'post',
    data
  })
}

// 重分配时候项目查询的规则
export function currProjectInfoSelect(params) {
  return request({
    url: '/system/projectClues/currProjectInfoSelect',
    method: 'post',
    params
  })
}

// 重分配时候项目查询的规则
export function SelectClueConditionClue(data) {
  return request({
    url: '/system/projectClues/SelectClueConditionClue',
    method: 'post',
    data
  })
}

// 重分配时候项目查询的案场规则
export function SelectClueConditionAC(data) {
  return request({
    url: '/system/projectClues/SelectClueConditionAC',
    method: 'post',
    data
  })
}

// 交易信息
export function transactionInformation(data) {
  return request({
    url: 'system/projectClues/transactionInformation',
    method: 'post',
    data
  })
}
/*下载*/
export function downLoad(url,params){
  let query='';
  Object.keys(params).forEach(item=>{
    query+=((query?'&':'')+item+"="+params[item]);
  });
  return `${href}${url}?${query}`;
};
