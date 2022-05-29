import request from '@/utils/request'

// 管理端-广告添加
export function advertisementAdd(params) {
  return request({
    url: '/advertisement/add',
    method: 'POST',
    params
  })
}

// 管理端广告-列表
export function advertisementList(params) {
  return request({
    url: '/advertisement/list',
    method: 'POST',
    params
  })
}

// 管理端广告-列表
export function advertisementDelete(params) {
  return request({
    url: '/advertisement/delete',
    method: 'POST',
    params
  })
}

// 管理端广告-修改
export function advertisementUpdate(params) {
  return request({
    url: '/advertisement/update',
    method: 'POST',
    params
  })
}
