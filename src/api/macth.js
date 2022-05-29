import request from '@/utils/request'

//  赛事列表
export function review(params) {
    return request({
        url: '/toutnament/review',
        method: 'POST',
        params
    })
}

// 创建赛事
export function tournamentAdd(data) {
    return request({
        url: '/tournament/add',
        method: 'POST',
        data
    })
}

// 赛事列表
export function tournamentList(params) {
    return request({
        url: '/tournament/list',
        method: 'POST',
        params
    })
}

// 管理端/用户端-游戏列表
export function gameList(params) {
    return request({
        url: '/game/list',
        method: 'POST',
        params
    })
}

// 管理端/用户端-赛事详情
export function eventDetail(params) {
    return request({
        url: '/tournament/detail',
        method: 'POST',
        params
    })
}

// 管理端-赛事赞助商添加
export function sponsorAdd(params) {
    return request({
        url: '/tournament/sponsor/add',
        method: 'POST',
        params
    })
}

// 管理端-赛事赞助商删除
export function sponsorDel(params) {
    return request({
        url: '/tournament/sponsor/delete',
        method: 'POST',
        params
    })
}

// 管理端-赛事赞助商修改
export function sponsorUpdate(params) {
    return request({
        url: '/tournament/sponsor/update',
        method: 'POST',
        params
    })
}

// 用户端/主持端-广告列表
export function getAdvertisement(params) {
    return request({
        url: '/advertisement/list/user',
        method: 'POST',
        params
    })
}

// 管理端/主持端 - 确认赛事报名完成
export function endRegistration(params) {
    return request({
        url: '/tournament/end/registration',
        method: 'POST',
        params
    })
}

// 用户端/管理端 - 赛事对阵信息
export function roundLog(params) {
    return request({
        url: '/tournament/round/log',
        method: 'POST',
        params
    })
}

// 管理端/主持段 - 修改roundBo
export function roundBest(params) {
    return request({
        url: '/tournament/round/best',
        method: 'POST',
        params
    })
}

// 管理端/支持端 - 开始阶段比赛
export function stageStart(params) {
    return request({
        url: '/stage/start',
        method: 'POST',
        params
    })
}

// 管理端-主持端 结束阶段比赛
export function stageStop(params) {
    return request({
        url: '/stage/stop',
        method: 'POST',
        params
    })
}

// 管理端-主持端/上传过的照片
export function listUserImg(params) {
    return request({
        url: '/user/image/list/user',
        method: 'POST',
        params
    })
}

// 管理端/主持端 名次管理（自由模式）
export function tournamentFreeRank(data) {
    return request({
        url: '/tournament/free/rank',
        method: 'POST',
        data
    })
}

// 管理端/主持端 名次管理（非自由模式）
export function tournamentRank(params) {
    return request({
        url: '/tournament/rank',
        method: 'POST',
        params
    })
}

// 管理端/主持段-赛事对阵交换
export function logSwap(data) {
    return request({
        url: '/tournament/round/log/swap',
        method: 'POST',
        data
    })
}

// 管理端-赛事审核
export function toutnamentReview(params) {
    return request({
        url: '/tournament/review',
        method: 'POST',
        params
    })
}

// 管理端-礼品确认列表
export function tournamentReward(params) {
    return request({
        url: '/tournament/reward/list',
        method: 'POST',
        params
    })
}

//管理端 - 赛事规则配置 - 手续费
export function ProfileAdd(params) {
    return request({
        url: '/tournament/profile/add',
        method: 'POST',
        params
    })
}

//管理端 - 赛事规则配置 - 手续费
export function tournamentProfile(params) {
    return request({
        url: '/tournament/profile/detail',
        method: 'POST',
        params
    })
}

//管理端 - 热门赛事
export function tournamentTop(params) {
    return request({
        url: '/tournament/top',
        method: 'POST',
        params
    })
}

// 赛事所有参赛人员
export function tournamentContestant(params) {
    return request({
        url: '/tournament/contestant',
        method: 'POST',
        params
    })
}

// 发放礼品
export function tournamentGrant(params) {
    return request({
        url: '/tournament/reward/grant',
        method: 'POST',
        params
    })
}

// 管理端-确认发放
export function tournamentConfirm(params) {
    return request({
        url: '/tournament/grant/confirm',
        method: 'POST',
        params
    })
}


// 主持端/管理端-收益管理
export function withdrawalList(params) {
    return request({
        url: '/tournament/organization/withdrawal/list',
        method: 'POST',
        params
    })
}

// 管理端-审核主持人提现
export function withdrawalAgree(params) {
    return request({
        url: '/tournament/organization/withdrawal/agree',
        method: 'POST',
        params
    })
}

// 主持端管理端签到
export function adminCheckIn(params) {
    return request({
        url: '/tournament/admin/checkin',
        method: 'POST',
        params
    })
}

// 打乱顺序重新生成对阵
export function tournamentReset(params) {
    return request({
        url: '/tournament/reset',
        method: 'POST',
        params
    })
}