import request from '@/utils/request'

//管理端-任务列表
export function taskList(params) {
    return request({
        url: '/task/list',
        method: 'POST',
        params
    })
}