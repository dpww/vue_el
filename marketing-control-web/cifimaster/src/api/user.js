import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}
export function loginBack(data) {
  return request({
    url: '/auth/backLogin',
    method: 'post',
    data
  })
}


export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function loginOut(params){
  return request({
    url: '/auth/loginOutUserName',
    method: 'get',
    params
  })
}
