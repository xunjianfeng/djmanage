import request from '@/utils/request'

// 账号列表
export function userList(params) {
  return request({
    url: '/admin/user/list',
    method: 'POST',
    params
  })
}

// 新建账号
export function addUser(params) {
  return request({
    url: '/admin/user/add',
    method: 'POST',
    params
  })
}

// 禁用账号
export function userDisable(params) {
  return request({
    url: '/user/disable',
    method: 'POST',
    params
  })
}

//获取用户角色
export function getRole(params) {
  return request({
    url: '/user/get/Role',
    method: 'POST',
    params
  })
}

// 获取所有角色
export function roleList(params) {
  return request({
    url: '/role/list',
    method: 'POST',
    params
  })
}

// 管理账号删除
export function userDelete(params) {
  return request({
    url: '/admin/user/delete',
    method: 'POST',
    params
  })
}

// 角色添加
export function addRole(params) {
  return request({
    url: '/role/add',
    method: 'POST',
    params
  })
}
// 菜单列表
export function menuList(params) {
  return request({
    url: '/menu/list',
    method: 'POST',
    params
  })
}

// 添加菜单
export function addMenu(params) {
  return request({
    url: '/menu/add',
    method: 'POST',
    params
  })
}

// 菜单删除
export function menuDelete(params) {
  return request({
    url: '/menu/delete',
    method: 'POST',
    params
  })
}