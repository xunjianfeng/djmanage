import request from '@/utils/request'

//后端-设置主持人问题
export function createQuestion(data) {
    return request({
        url: '/rapid-challenge/host/batch-update-questions',
        method: 'POST',
        data
    })
}

//后端-分页查询快速挑战订单
export function challengList(params) {
    return request({
        url: '/rapid-challenge/list-by-page',
        method: 'GET',
        params
    })
}

//后端-修改主持人教程视频
export function updateVideo(params) {
    return request({
        url: '/rapid-challenge/host/update-tutorial-video',
        method: 'POST',
        params
    })
}

//后端-禁用或启用主持人
export function blockHost(params) {
    return request({
        url: '/rapid-challenge/host/block-host',
        method: 'POST',
        params
    })
}

//后端-获取快速挑战总览
export function getAllChallenge(params) {
    return request({
        url: '/rapid-challenge/get-overview',
        method: 'GET',
        params
    })
}

//后端-获取房间玩家详情
export function getPlayerDetail(params) {
    return request({
        url: '/rapid-challenge/get-player-detail',
        method: 'GET',
        params
    })
}

//前端-获取主持人教程视频
export function getVideo(params) {
    return request({
        url: '/rapid-challenge/host/get-tutorial-video',
        method: 'GET',
        params
    })
}

//前端-分页查询主持人
export function hostList(params) {
    return request({
        url: '/rapid-challenge/host/list-host-by-page',
        method: 'GET',
        params
    })
}

//后端-获取主持人问题
export function getQuestions(params) {
  return request({
    url: '/rapid-challenge/host/list-questions',
    method: 'GET',
    params
  })
}
