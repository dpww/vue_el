import request from '@/utils/request'
export function getList(params) {
  let {project_id,months,is_effective}=params;
  return request({
    url: `http://10.129.37.101:8080/projectmanager/allChannelDetail/${project_id}/${months}/${is_effective}`,
    method: 'get'
  })
}
export function saveList(params) {
  return request({
    url: `http://10.129.37.101:8080/projectmanager/allChannelDetail/`,
    method: 'post',
    params:params
  })
}
