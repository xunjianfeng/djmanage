import request from '@/utils/request'

//后端-创建竞猜
export function predictCreate(data) {
    return request({
        url: '/predict/create',
        method: 'POST',
        data
    })
}

//前端&后端-分页查询竞猜列表
export function predictListPage(params) {
    return request({
        url: '/predict/list-by-page',
        method: 'get',
        params
    })
}

//前端&后端-获取竞猜战队列表
export function predictTeams(params) {
    return request({
        url: '/predict/get-teams',
        method: 'get',
        params
    })
}

//前端&后端-获取竞猜参与者列表
export function predictRegistrations(params) {
    return request({
        url: '/predict/get-registrations',
        method: 'get',
        params
    })
}

//后端-添加竞猜置顶海报
export function predictCarousel(params) {
    return request({
        url: '/predict/add-carousel',
        method: 'POST',
        params
    })
}

//后端-结束竞猜
export function predictComplete(params) {
    return request({
        url: '/predict/complete',
        method: 'POST',
        params
    })
}


//管理端-战队列表
export function listTeam(params) {
    return request({
        url: '/team/list',
        method: 'POST',
        params
    })
}
// 前端-查询联赛列表
export function leagueList(params) {
  return request({
    url: '/league/list',
    method: 'GET',
    params
  })
}

// 后端-创建联赛
export function leagueCreate(params) {
  return request({
    url: '/league/create',
    method: 'POST',
    params
  })
}

// 后端-批量添加联赛战队
export function addBatch(params) {
  return request({
    url: '/league/team/add-batch',
    method: 'POST',
    params
  })
}

// 后端-批量删除联赛战队
export function deleteBatch(params) {
  return request({
    url: '/league/team/delete-batch',
    method: 'POST',
    params
  })
}

// 前端&后端-获取联赛战队列表
export function teamFindList(params) {
  return request({
    url: '/league/team/find-by-page',
    method: 'GET',
    params
  })
}

// 后端-分页查询对局
export function findFixture(params) {
  return request({
    url: '/league/match/find-fixture-page',
    method: 'GET',
    params
  })
}

// 前端-分页查询比赛日和对局及结果
export function findMatchDay(params) {
  return request({
    url: '/league/match/find-match-day-page',
    method: 'GET',
    params
  })
}

// 后端-批量添加比赛日和对局
export function addFixtureBatch(data) {
  return request({
    url: '/league/match/add-fixture-batch',
    method: 'POST',
    data
  })
}

// 后端-保存精彩瞬间
export function saveHighlight(params) {
  return request({
    url: '/league/highlight/save',
    method: 'POST',
    params
  })
}

// 后端-删除比赛日
export function delmMatchDay(params) {
  return request({
    url: '/league/match/delete-match-day',
    method: 'POST',
    params
  })
}

// 后端-删除对局
export function delFixture(params) {
  return request({
    url: '/league/match/delete-fixture',
    method: 'POST',
    params
  })
}

// 后端-保存对局结果
export function saveFixtureResult(params) {
  return request({
    url: '/league/match/save-fixture-result',
    method: 'POST',
    params
  })
}

// 后端-分页查询比赛日战绩
export function showStanding(params) {
  return request({
    url: '/league/match/find-match-day-standing-page',
    method: 'GET',
    params
  })
}

// 前端&后端-分页查询队员转会记录
export function showTransfer(params) {
  return request({
    url: '/league/team/transfer-record-page',
    method: 'GET',
    params
  })
}

// 后端-批量保存队员转会记录
export function saveTransfer(data) {
  return request({
    url: '/league/team/create-transfer-record-batch',
    method: 'POST',
    data
  })
}

// 后端-批量删除队员转会记录
export function delTransfer(params) {
  return request({
    url: '/league/team/delete-transfer-record-batch',
    method: 'POST',
    params
  })
}


// 后端-删除联赛
export function leagueDelete(params) {
  return request({
    url: '/league/delete',
    method: 'get',
    params
  })
}

// 后端-批量修改对局
export function leagueUpdateFixture(data) {
  return request({
    url: '/league/match/update-fixture-batch',
    method: 'POST',
    data
  })
}


// 后端-精彩瞬间列表
export function HighlightList(params) {
  return request({
    url: '/league/highlight/find-page',
    method: 'get',
    params
  })
}

//联赛-获取联赛资讯
export function leagueInfo(params) {
    return request({
        url: '/league/info',
        method: 'GET',
        params
    })
}

//后端-删除精彩瞬间
export function highlightDelete(params) {
    return request({
        url: '/league/highlight/delete',
        method: 'POST',
        params
    })
}

//前端&后端-获取轮播海报
export function leagueCarouselList(params) {
    return request({
        url: '/league/list-carousels',
        method: 'GET',
        params
    })
}

//后端-添加轮播海报
export function addLeagueCarousel(params) {
    return request({
        url: '/league/add-carousel',
        method: 'POST',
        params
    })
}

//后端-删除轮播海报
export function delLeagueCarousel(params) {
    return request({
        url: '/league/delete-carousel',
        method: 'POST',
        params
    })
}

// 后端-删除竞猜
export function delPredict(params) {
    return request({
        url: '/predict/delete',
        method: 'POST',
        params
    })
}

//后端-创建竞猜
export function predictUpdate(data) {
    return request({
        url: '/predict/update',
        method: 'POST',
        data
    })
}

//后端-获取联赛战队和队员列表
export function leagueTeamList(params) {
    return request({
        url: '/league/team/detail-list',
        method: 'GET',
        params
    })
}

//前端-分页查询战队战绩
export function leagueStanding(params) {
    return request({
        url: '/league/match/find-team-standing-page',
        method: 'GET',
        params
    })
}

// 前端&后端-获取Top玩家
export function getTopPlayers(params) {
  return request({
    url: '/league/get-top-players',
    method: 'GET',
    params
  })
}

// 后端-设置或更新Top玩家
export function updateTopPlayer(params) {
  return request({
    url: '/league/update-top-player',
    method: 'POST',
    params
  })
}

// 后端-结束联赛
export function completeLeague(params) {
  return request({
    url: '/league/archive',
    method: 'POST',
    params
  })
}