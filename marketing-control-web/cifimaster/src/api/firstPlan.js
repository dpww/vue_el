import request from '@/utils/request'

// 首开计划编制页 三级联动选择接口(要光)
export function projectSelect(data) {
  return request({
    url: '/takeLand/queryRegion',
    method: 'post',
    data
  })
}
// 编制首页工作指引成果模板
export function planContent(data) {
  return request({
    url: '/takeLand/queryPlan',
    method: 'post',
    data
  })
}
// 编制首页节点状态
export function selectPlanNode(data) {
  return request({
    url: '/takeLand/selectPlanNode',
    method: 'post',
    data
  })
}
// 拿地后 保存
export function insertTakeLand(data) {
  return request({
    url: '/takeLand/insertTakeLand',
    method: 'post',
    data
  })
}
// 顶设1 保存
export function insertTopOne(data) {
  return request({
    url: '/takeLand/insertTopOne',
    method: 'post',
    data
  })
}

// 首开监控列表页
export function montitorIndex(data) {
  return request({
    url: '/planMontitor/montitorIndex',
    method: 'post',
    data
  })
}


// 顶设2核心指标
export function selectCodeIndex(data) {
  return request({
    url: '/designtwo/selectCodeIndex',
    method: 'post',
    data
  })
}


// 顶设2全盘量价规划
export function selectAllPlan(data) {
  return request({
    url: '/designtwo/selectAllPlan',
    method: 'post',
    data
  })
}


// 顶设2储客计划
export function selectStorageNodePlan(data) {
  return request({
    url: '/designtwo/selectStorageNodePlan',
    method: 'post',
    data
  })
}

// 顶设2全盘量价tab跳转
export function updateAllPlan(data) {
  return request({
    url: '/designtwo/updateAllPlan',
    method: 'post',
    data
  })
}
// 顶设2核心指标tab跳转
export function updateCodeIndex(data) {
  return request({
    url: '/designtwo/updateCodeIndex ',
    method: 'post',
    data
  })
}
// 顶设2客储计划tab跳转
export function updateStorageNodePlan(data) {
  return request({
    url: '/designtwo/updateStorageNodePlan',
    method: 'post',
    data
  })
}

// 顶设2确认保存
export function updateDesignTwoAll(data) {
  return request({
    url: '/designtwo/updateDesignTwoAll',
    method: 'post',
    data
  })
}
// 开盘-当日播报表-数据渲染
export function viewOpenThisDayInfo(data) {
  return request({
    url: '/opening/viewOpenThisDayInfo',
    method: 'post',
    data
  })
}
// 开盘-当日播报表-版本列表
export function getOpenVersionByPlanId(data) {
  return request({
    url: '/opening/getOpenVersionByPlanId',
    method: 'post',
    data
  })
}

// 开盘-当日播报表-提交
export function insertOpenThisDay(data) {
  return request({
    url: '/opening/insertOpenThisDay',
    method: 'post',
    data
  })

}
//顶设二货值
export function getDesignTwoValue(data) {
  return request({
    url: '/designtwo/getDesignTwoValue',
    method: 'post',
    data
  })
}

//顶设二货值
export function updateDesignTwoValue(data) {
  return request({
    url: '/designtwo/updateDesignTwoValue',
    method: 'post',
    data
  })
}
// 开盘-次日播报表-渲染
export function viewOpenMorrowDayInfo(data) {
  return request({
    url: '/opening/viewOpenMorrowDayInfo',
    method: 'post',
    data
  })
}
// 开盘-次日播报表-切换版本
export function getOpenVersionById(data) {
  return request({
    url: '/opening/getOpenVersionById',
    method: 'post',
    data
  })
}

// 开盘-次日播报表-提交
export function insertOpenMorrowBroadcast(data) {
  return request({
    url: '/opening/insertOpenMorrowBroadcast',
    method: 'post',
    data
  })
}
//开盘-客储达成进度渲染
export function initGuestStorage(data) {
  return request({
    url: '/opening/initGuestStorage',
    method: 'post',
    data
  })
}
//开盘-客储达成版本切换
export function queryGuestStorageList(data) {
  return request({
    url: '/opening/queryGuestStorageList',
    method: 'post',
    data
  })
}
//开盘-客储达成添加
export function insertGuestStorage(data) {
  return request({
    url: '/opening/insertGuestStorage',
    method: 'post',
    data
  })
}

// 开盘前三个月
export function selectNodePlan(data) {
  return request({
    url: '/designmonths/selectNodePlan ',
    method: 'post',
    data
  })
}
// 开盘前三个月 保存
export function updateNodePlan(data) {
  return request({
    url: 'designmonths/updateNodePlan',
    method: 'post',
    data
  })
}
// 顶设2 版本选择
export function selectTwoNode(data) {
  return request({
    url: '/designtwo/selectPlanNode',
    method: 'post',
    data
  })
}
// 测试上传
export function uploadFile(data) {
  return request({
    url: '/Upload/uploadFile',
    method: 'post',
    data
  })
}
//开盘后一个月--版本列表
export function queryPlanNodeVersionByPlanId(data) {
  return request({
    url: '/opening/queryPlanNodeVersionByPlanId',
    method: 'post',
    data
  })

}
//开盘后一个月--渲染数据
export function queryOpenMonth(data) {
  return request({
    url: '/opening/queryOpenMonth',
    method: 'post',
    data
  })
}
//开盘后一个月--删除
export function delFile(data) {
  return request({
    url: '/Upload/delFile',
    method: 'post',
    data
  })
  //Upload/delFile删除{"id":"2"}
}


// 选择业态类型和产品类型
export function getDicByCodeLevelList(data) {
  return request({
    url: '/param/getDicByCodeLevelList',
    method: 'post',
    data
  })
}



// 拿地后顶设一 版本
export function selectNodeVersion(data) {
  return request({
    url: '/takeLand/selectNodeVersion',
    method: 'post',
    data
  })
}

// 拿地后 版本
export function queryTakeLands(data) {
  return request({
    url: '/takeLand/queryTakeLands',
    method: 'post',
    data
  })
}
//开盘后一个月--创建版本
export function insertOpenBack(data) {
  return request({
    url: '/opening/insertOpenBack',
    method: 'post',
    data
  })
}

// 顶设一 渲染
export function queryValueStructure(data) {
  return request({
    url: '/takeLand/queryValueStructure',
    method: 'post',
    data
  })
}

// 顶设一 货值结构
export function queryPlanNodeId(data) {
  return request({
    url: '/takeLand/queryPlanNodeId',
    method: 'post',
    data
  })
}


// 顶设一 户型配比
export function queryApartment(data) {
  return request({
    url: '/takeLand/queryApartment',
    method: 'post',
    data
  })
}

// 顶设一 时间节点
export function queryTimeNode(data) {
  return request({
    url: '/takeLand/queryTimeNode',
    method: 'post',
    data
  })
}

// 首页编制 成果模板
export function queryfile(data) {
  return request({
    url: '/takeLand/queryfile',
    method: 'post',
    data
  })
}

// 顶设1
export function queryTopOne(data) {
  return request({
    url: '/takeLand/queryTopOne',
    method: 'post',
    data
  })
}
// 查询文件列表
export function updateSattach(data) {
  return request({
    url: '/takeLand/updateSattach',
    method: 'post',
    data
  })
}
// 提交-三大件、开盘后一个月
export function subApprovePlanNode(data) {
  return request({
    url: '/opening/subApprovePlanNode',
    method: 'post',
    data
  })
}
//开盘前21天--延期开盘申请表
export function viewdelayOpenApplay(data) {
  return request({
    url: '/openBeforeTwentyone/viewdelayOpenApplay',
    method: 'post',
    data
  })
}
//开盘前21天--延期开盘申请表-切换版本
export function switchVersion(data) {
  return request({
    url: '/openBeforeTwentyone/switchVersion',
    method: 'post',
    data
  })
}
//开盘前21天-延期开盘申请表-保存/提交
export function savelayOpenApplay(data) {
  return request({
    url: '/openBeforeTwentyone/savelayOpenApplay',
    method: 'post',
    data
  })
}
//开盘前21天-延期开盘申请表-获取周拆分
export function getWeeklyResolution(data) {
  return request({
    url: '/openBeforeTwentyone/getWeeklyResolution',
    method: 'post',
    data
  })
}

// 监控详情
export function queryMonitor(data) {
  return request({
    url: '/monitor/queryMonitor',
    method: 'post',
    data
  })
}

//监控详情实时客储计划
export function monitorRealNode(data) {
  return request({
    url: '/monitor/monitorRealNode',
    method: 'post',
    data
  })
}
//开盘前7天
export function updatePlanTime(data) {
  return request({
    url: '/openBeforeSeven/updatePlanTime',
    method: 'post',
    data
  })
}

//开盘前7天数据渲染
export function viewOpenBeforeSevenDayOpenApplay(data) {
  return request({
    url: '/openBeforeSeven/viewOpenBeforeSevenDayOpenApplay',
    method: 'post',
    data
  })
}
//开盘前七天-首开审批提交审批
export function saveOpenBeforeSevenDayOpenApplay(data) {
  return request({
    url: '/openBeforeSeven/saveOpenBeforeSevenDayOpenApplay',
    method: 'post',
    data
  })
}
//开盘前七天-切换版本
export function switchVersionSevenDayOpenApplay(data) {
  return request({
    url: '/openBeforeSeven/switchVersionSevenDayOpenApplay',
    method: 'post',
    data
  })
}


//开盘当日数据渲染
export function getOpenThisDayInfo(data) {
  return request({
    url: '/opening/getOpenThisDayInfo',
    method: 'post',
    data
  })
}

//开盘后一个月附件数据渲染
export function getOpenMonth(data) {
  return request({
    url: '/opening/getOpenMonth',
    method: 'post',
    data
  })
}
//监控页面获取区域
export function getIdmBuinessData(data) {
  return request({
    url: '/planMontitor/getIdmBuinessData',
    method: 'post',
    data
  })
}

// 楼栋
export function queryBuildingName(data) {
  return request({
    url: '/opening/queryBuildingName',
    method: 'post',
    data
  })
}
/* get */
export function get(url, params) {
  return request({
    url: url,
    method: 'get',
    params
  });
}
//监控页面获取区域
export function approveOpenNodeInfo(data) {
  return request({
    url: '/opening/approveOpenNodeInfo',
    method: 'post',
    data
  })
}


//顶设2提交发起审批
export function forMtstart(data) {
  return request({
    url: '/designtwo/forMtstart',
    method: 'post',
    data
  })
}

//开盘前三个月提交发起审批
export function forMtstartThreeAndTwo(data) {
  return request({
    url: '/designmonths/forMtstart',
    method: 'post',
    data
  })
}


//pad钉钉登录
export function dingLogin(data) {
  return request({
    url: 'auth/dingLogin',
    method: 'post',
    data
  })
}


//进度监控判断是否有版本
export function selectMonitorPlanNode(data) {
  return request({
    url: 'monitor/selectMonitorPlanNode',
    method: 'post',
    data
  })
}


//顶设2楼栋大定价表格  嘉龙
export function getProjectStages(data) {
  return request({
    url: 'buildBigPrice/getProjectStages',
    method: 'post',
    data
  })
}

//顶设2楼栋大定价表格  嘉龙
export function viewBigPriceBuildData(data) {
  return request({
    url: '/buildBigPrice/viewBigPriceBuildData',
    method: 'post',
    data
  })
}
//顶设2首开费用计划   锦章
export function insertOpenCost(data) {
  return request({
    url: '/designtwo/insertOpenCost',
    method: 'post',
    data
  })
}


//顶设2首开费用计划   锦章
export function queryOpenCost(data) {
  return request({
    url: '/designtwo/queryOpenCost',
    method: 'post',
    data
  })
}
//首开前7天/21天快速审批接口
export function applyAdoptTell(data) {
  return request({
    url: '/openBeforeSeven/applyAdoptTell',
    method: 'post',
    data
  })
}

//顶设2楼栋大定价表格保存  嘉龙
export function saveBigPriceBuildData(data) {
  return request({
    url: '/buildBigPrice/saveBigPriceBuildData',
    method: 'post',
    data
  })
}

//拿地快速审批
export function takeLandSuccess(data) {
  return request({
    url: '/takeLand/takeLandSuccess',
    method: 'post',
    data
  })
}

//拿地快速审批
export function fastUpdate(data) {
  return request({
    url: '/designtwo/fastUpdate',
    method: 'post',
    data
  })
}


//编制首页节点控制
export function nodeControl(data) {
  return request({
    url: '/nodeContrl/queryPlanNode',
    method: 'post',
    data
  })

}
//顶设2楼栋大定价导出模版
export function buildBigPriceExportTemplate(data) {
  return request({
    url: '/buildBigPrice/buildBigPriceExportTemplate',
    method: 'post',
    data
  })
}


//首开刷新数据
export function addOrderByProject(data) {
  return request({
    url: '/datainterface/addOrderByProject',
    method: 'post',
    data
  })
}
//首开刷新数据
export function insertGuestStorageByProject(data) {
  return request({
    url: '/dataAccess/insertGuestStorageByProject',
    method: 'post',
    data
  })
}

