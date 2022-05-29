import request from '@/utils/request'

// 赛事统计
export function tournamentData(params) {
  return request({
    url: '/tournament/analysis',
    method: 'POST',
    params
  })
}

// 订单统计
export function orderAnalysis(params) {
  return request({
    url: '/order/analysis',
    method: 'POST',
    params
  })
}

// 用户统计
export function userAnalysis(params) {
  return request({
    url: '/user/analysis',
    method: 'POST',
    params
  })
}

