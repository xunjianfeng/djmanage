import request from '@/utils/request'

// 用户管理列表
export function userList(params) {
  return request({
    url: '/user/info/list',
    method: 'POST',
    params
  })
}

// 用户详细信息
export function userDetail(params) {
  return request({
    url: '/user/info/detail',
    method: 'POST',
    params
  })
}

// 管理端-主持人列表 Organizer
export function manageList(params) {
  return request({
    url: '/manage/info/list',
    method: 'POST',
    params
  })
}

// 管理端-主持人详细信息 Organizer
export function manageDetail(params) {
  return request({
    url: '/manage/info/detail',
    method: 'POST',
    params
  })
}

//管理端 添加coins
export function addCoins(params) {
  return request({
    url: '/recharge/order/topup',
    method: 'POST',
    params
  })
}

//管理端-用户提交认证记录
export function identificationList(params) {
  return request({
    url: '/identification/list',
    method: 'POST',
    params
  })
}

//管理端-用户邀请记录
export function referralList(params) {
  return request({
    url: '/referral/log/list',
    method: 'POST',
    params
  })
}

//管理端-用户审核
export function infoExamine(params) {
  return request({
    url: '/user/info/examine',
    method: 'POST',
    params
  })
}

//管理端赠送积分
export function addIntegral(params) {
  return request({
    url: '/points/transaction/give/user',
    method: 'POST',
    params
  })
}

//管理端-用户coin交易明细
export function coinDetail(params) {
  return request({
    url: '/coin/transaction/user/coins',
    method: 'POST',
    params
  })
}

//管理端-用户积分交易明细
export function pointDetail(params) {
  return request({
    url: '/points/transaction/user/points',
    method: 'POST',
    params
  })
}

//管理端-拉黑组织账号
export function blockOrganizer(params) {
  return request({
    url: '/manage/info/block',
    method: 'POST',
    params
  })
}
