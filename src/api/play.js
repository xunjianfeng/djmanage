import request from '@/utils/request'

// 陪玩列表
export function playList(params) {
    return request({
        url: '/companion/list',
        method: 'POST',
        params
    })
}

//  管理端-陪玩申请列表
export function applyList(params) {
    return request({
        url: '/companion/apply/list',
        method: 'POST',
        params
    })
}
// 陪玩审核
export function playExamine(params) {
    return request({
        url: '/companion/examine',
        method: 'POST',
        params
    })
}


// 陪玩详情
export function playDetail(params) {
    return request({
        url: '/companion/detail',
        method: 'POST',
        params
    })
}


// 战队列表
export function listTeam(params) {
    return request({
        url: '/team/list',
        method: 'POST',
        params
    })
}

// 战队详情
export function teamAchievement(params) {
    return request({
        url: '/team/achievement',
        method: 'POST',
        params
    })
}

// 战队详情
export function teamUserList(params) {
    return request({
        url: '/team/user/list',
        method: 'POST',
        params
    })
}

// 用户端 获取战队成员
export function teamUsers(params) {
  return request({
    url: '/team/users',
    method: 'POST',
    params
  })
}

// 管理端-禁用/启用陪玩
export function companionBan(params) {
  return request({
    url: '/companion/ban',
    method: 'POST',
    params
  })
}