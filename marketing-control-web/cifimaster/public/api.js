// function findById(params) { //面签页面--根据apid查询已有信息
//   return service({
//       url: '/api/backend/approvalProcess/findById',
//       method: 'get',
//       params
//   })
// }
 function sendJSONAllPath(url,data){
  return service({
    url,
    method: 'post',
    headers:{"Content-Type":'application/json'},
    data
  });
}
 function sendJSON(url,data){
  return service({
    url: url,
    method: 'post',
    headers:{"Content-Type":'application/json'},
    data
  });
}
 function examineInfo(data) {
  return service({
      url: '/api/public/selectdatatobpm',
      method: 'post',
      data
  })
}
 function toHistoryUrl(data) {
  return service({
      url: '/Workflow/toHistoryUrl',
      method: 'post',
      data
  })
}
 function queryFlowId(data,BOID) {
  return service({
      url: `WorkflowChoose/queryFlowId?BOID=${BOID}`,
      method: 'post',
      data
  })
}
function get(url,params){
  return service({
    url:url,
    method: 'get',
    params
  });
}
