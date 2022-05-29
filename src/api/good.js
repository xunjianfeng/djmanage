import request from '@/utils/request'

// 商品分类-列表
export function listCategory(params) {
  return request({
    url: '/commodity/category/list',
    method: 'POST',
    params
  })
}

// 商品分类-删除
export function delCategory(params) {
  return request({
    url: '/commodity/category/delete',
    method: 'POST',
    params
  })
}

// 商品详情
export function CommodityDetail(params) {
  return request({
    url: '/commodity/detail',
    method: 'POST',
    params
  })
}

// 商品分类-添加
export function addCategory(params) {
  return request({
    url: '/commodity/category/add',
    method: 'POST',
    params
  })
}

// 管理端-商品添加/修改
export function addCommodity(data) {
  return request({
    url: '/commodity/add',
    method: 'POST',
    data
  })
}

// 管理端-商品列表
export function listCommodity(params) {
  return request({
    url: '/commodity/list',
    method: 'POST',
    params
  })
}

// 管理端-商品下架/删除
export function updateCommodity(params) {
  return request({
    url: '/commodity/state/update',
    method: 'POST',
    params
  })
}