import request from '@/utils/request'

//管理端-消息列表
export function messageList(params) {
    return request({
        url: '/message/log',
        method: 'POST',
        params
    })
}

//管理端-消息列表
export function addMessage(params) {
    return request({
        url: '/message/add',
        method: 'POST',
        params
    })
}