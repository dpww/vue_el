import request from '@/utils/request';
let href=process.env.VUE_APP_BASE_API;   // 测试
export function sendJSON(url,data){
  return request({
    url: url,
    method: 'post',
    headers:{"Content-Type":'application/json'},
    data
  });
}
/* 上传JSON */
export function sendJSONAllPath(url,data){
  return request({
    url,
    method: 'post',
    headers:{"Content-Type":'application/json'},
    data
  });
}
export function sendJSONGet(url,params){
  return request({
    url: href+url,
    method: 'get',
    headers:{"Content-Type":'application/json'},
    data:params
  });
}
/* 直接渲染文件 参数：1.请求地址2.请求参数3.渲染到的列表4.渲染时是否初始化列表 */
export function render(url,params,data,init=false){
  request({
    url:href+url,
    method: 'post',
    headers:{"Content-Type":'application/json'},
    data:params
  }).then(res=>{
    if(init)data.splice(0,data.length);
    data.push(...res.result);
  });
}
/* 上传文件*/
export function sendFile(url,params){
  let formDate=new FormData();
  Object.keys(params).forEach(key=>{
    formDate.append(key,params[key]);
  });
  return request({
    url: href+url,
    method: 'post',
    headers:{"Content-Type":'multipart/form-data'},
    data:formDate
  });
}
/* get */
export function get(url,params){
  return request({
    url:url,
    method: 'get',
    params
  });
}
/* post */
export function post(url,data){
  return request({
    url:url,
    method: 'post',
    data
  });
}
/* 下载文件 */
export function downLoad(url,params){
  if(!params){
    return `${href}${url}`
  }
  let query='';
  Object.keys(params).forEach(item=>{
    query+=((query?'&':'')+item+"="+params[item]);
  });
  return `${href}${url}?${query}`;
};

/* 上传文件 */
export function upFile(url){
  return href+url;
}
/* restful */
export function restful(url,params){
  params.forEach(item=>{
    url+='/'+item;
  });
  return request({
    url:href+url,
    method: 'get'
  })
}

// 周报窗口期
export function windowPhase(data){
  return request({
    url:"package/windowPhase",
    method: 'post',
    data
  });
}
// 项目全盘周期计划
export function projectAllWeek(data){
  return request({
    url:"group/getProjectAreaID",
    method: 'post',
    data
  });
}
// 定调价数据渲染
export function getAllStatistics(data){
  return request({
    url:"/pricing/getAllStatistics",
    method: 'post',
    data
  });
}



