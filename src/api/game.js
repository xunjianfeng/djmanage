import request from '@/utils/request'

//  游戏类型列表
export function categoryList(params) {
    return request({
        url: '/game/category/list',
        method: 'POST',
        params
    })
}

//  游戏类型添加
export function categoryAdd(params) {
    return request({
        url: '/game/category/add',
        method: 'POST',
        params
    })
}

//  添加游戏
export function gamdAdd(params) {
    return request({
        url: '/game/add',
        method: 'POST',
        params
    })
}

//  游戏列表
export function gamdList(params) {
    return request({
        url: '/game/list',
        method: 'POST',
        params
    })
}

//  删除游戏
export function gameDel(params) {
    return request({
        url: '/game/delete',
        method: 'POST',
        params
    })
}

//  修改游戏分类
export function editCategory(params) {
    return request({
        url: '/game/category/update',
        method: 'POST',
        params
    })
}

//  删除游戏分类
export function delCategory(params) {
    return request({
        url: '/game/category/delete',
        method: 'POST',
        params
    })
}

//  用户端-获取用户游戏配置
export function profileGameUser(params) {
    return request({
        url: '/game/profile/user',
        method: 'POST',
        params
    })
}