import request from '@/utils/request'

// 管理端-优惠券列表
export function couponList(params) {
    return request({
        url: '/coupon/list',
        method: 'POST',
        params
    })
}

// 管理端-优惠券-添加
export function couponSave(params) {
    return request({
        url: '/coupon/add',
        method: 'POST',
        params
    })
}

// 管理端-套餐添加
export function packageAdd(params) {
    return request({
        url: '/package/coin/add',
        method: 'POST',
        params
    })
}

// 管理端-问题报告列表
export function reportList(params) {
    return request({
        url: '/report/list',
        method: 'POST',
        params
    })
}

// 管理端-问题报告处理
export function reportFix(params) {
    return request({
        url: '/report/fix',
        method: 'POST',
        params
    })
}

// 优惠券删除
export function couponDelete(params) {
    return request({
        url: '/coupon/delete',
        method: 'POST',
        params
    })
}

// FQA分类
export function faqCategory(params) {
    return request({
        url: '/fqa/category/list',
        method: 'POST',
        params
    })
}

// FQA问题列表
export function faqQuestion(params) {
    return request({
        url: '/fqa/list',
        method: 'POST',
        params
    })
}

// FQA问题修改
export function faqQuestionUpdate(params) {
    return request({
        url: '/fqa/update',
        method: 'POST',
        params
    })
}

// FQA问题添加
export function faqQuestionAdd(params) {
    return request({
        url: '/fqa/add',
        method: 'POST',
        params
    })
}

// FQA问题删除
export function faqQuestionDelete(params) {
    return request({
        url: '/fqa/delete',
        method: 'POST',
        params
    })
}

// FQA分类添加
export function faqCategoryAdd(params) {
    return request({
        url: '/fqa/category/add',
        method: 'POST',
        params
    })
}

// FQA分类修改
export function faqCategoryUpdate(params) {
    return request({
        url: '/fqa/category/update',
        method: 'POST',
        params
    })
}

// FQA分类删除
export function faqCategoryDelete(params) {
    return request({
        url: '/fqa/category/delete',
        method: 'POST',
        params
    })
}

//用户端-套餐列表
export function packageList(params) {
    return request({
        url: '/package/coin/list',
        method: 'POST',
        params
    })
}

// 管理端-套餐删除
export function delPackage(params) {
    return request({
        url: '/package/coin/delete',
        method: 'POST',
        params
    })
}