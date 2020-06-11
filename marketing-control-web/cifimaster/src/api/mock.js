import request from '@/utils/request'
export function yongjinlist(params) {
  return request({
    url: 'http://118.190.56.178:3000/mock/88/yongjinlist',
    method: 'get',
    params
  })
}
