import request from '@/utils/request'

//登录
export function loginauth(data) {
    return request({
        url: '/auth/login',
        method: 'post',
        data
    })
}
// 切换项目
export function getProjectList(data) {
    return request({
        url: '/pro/getProjectList.action',
        method: 'post',
        data
    })
}

// export function getInfo(params) {
//     return request({
//       url: '/user/info',
//       method: 'get',
//       params
//     })
//   }