import request from '@/utils/request'

export function getCompanyList(data) {
  return request({
    url: '/company/queryAll.action',
    method: 'post',
    data
  })
}
  export function saveCompany(data) {
    return request({
      url: 'company/add.action',
      method: 'post',
      data
    })
}
export function getAllProject() {
  return request({
    url: 'pro/getProjectList.action',
    method: 'post'
  })
}


export function getRelProject() {
  return request({
    url: 'company/getRelProject',
    method: 'get'
  })

}
export function queryAssInforData(data) {
  return request({
    url: 'company/queryAssInforData.action',
    method: 'post',
    data
  })
}
export function updateCompanyById(data) {
  return request({
    url: 'company/updateCompanyById.action',
    method: 'post',
    data
  })
}export function deleteCompanyById(data) {
  return request({
    url: 'company/deleteCompanyById.action',
    method: 'post',
    data
  })
//hhhh





}
