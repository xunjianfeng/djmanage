import request from '@/utils/request'

// 管理端-陪玩订单列表
export function companionList(params) {
    return request({
        url: '/companion/order/list',
        method: 'POST',
        params
    })
}

// 管理端-订单列表
export function commodityList(params) {
    return request({
        url: '/commodity/order/list',
        method: 'POST',
        params
    })
}

// 管理端-订单发货
export function commoditySend(params) {
    return request({
        url: '/commodity/order/send',
        method: 'POST',
        params
    })
}

// 用户端/管理端-陪玩详细信息
export function companionDetail(params) {
  return request({
    url: '/companion/detail',
    method: 'POST',
    params
  })
}


// 用户端-陪玩订单
export function companionOrder(params) {
  return request({
    url: '/companion/order/list/user',
    method: 'POST',
    params
  })
}

// 用户端-同意拒绝订单
export function companionAgree(params) {
    return request({
        url: '/companion/order/agree',
        method: 'POST',
        params
    })
}
// 用户端-完成订单
export function companionComplete(params) {
    return request({
        url: '/companion/order/complete',
        method: 'POST',
        params
    })
}

// 用户端-完成订单
export function rechargeOrderList(params) {
    return request({
        url: '/recharge/order/list',
        method: 'POST',
        params
    })
}