import request from '@/utils/request'

// 查询所有用户
export function getUserMessage(data) {
  return request({
    url: '/userManager/getUserMessage.action',
    method: 'post',
    data
  })
}

// 查询所有的组织岗位
export function getGroupList(data) {
  return request({
    url: '/org/queryAll.action',
    method: 'post',
    data
  })
}

// 修改用户
export function updateUsers(data) {
  return request({
    url: '/userManager/updateUsers.action',
    method: 'post',
    data
  })
}

// 删除用户
export function deleteUsers(data) {
  return request({
    url: '/userManager/deleteUsers.action',
    method: 'post',
    data
  })
}
