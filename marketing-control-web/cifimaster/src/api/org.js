import request from '@/utils/request'

export function getOrgTree(data) {
  return request({
    url: '/menus/queryAll.action',
    method: 'post',
    data
  })
}
export function getChildeMenus(data) {
  return request({
    url: '/menus/queryChildMenus.action',
    method: 'post',
    data
  })
}

// 启用禁用可操作参数信息
export function updateMenuStatus(data) {
  return request({
    url: '/manager/updateMenuStatus.action',
    method: 'post',
    data
  })
}
// 新增菜单
export function addMenu(data) {
  return request({
    url: '/menus/add.action',
    method: 'post',
    data
  })
}

// 修改菜单
export function updateMenu(data) {
  return request({
    url: '/menus/updateMenu.action',
    method: 'post',
    data
  })
}

// 删除
export function delMenu(data) {
  return request({
    url: '/menus/updateMenuStatus',
    method: 'post',
    data
  })
}
