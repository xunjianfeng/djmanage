import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
// import HomeRouter from './router/home'
import less from 'less'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import vueAplayer from 'vue-aplayer'

import page_number from "@/api/global.js"	//引入全局变量

import './assets/index.css'	//日期选择器样式文件

import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer)
Viewer.setDefaults({
    Options: { 'inline': true, 'button': true, 'navbar': true, 'title': true, 'toolbar': true, 
	'tooltip': true, 'movable': true, 'zoomable': true, 'rotatable': true, 'scalable': true,
	 'transition': true, 'fullscreen': true, 'keyboard': true, 'url': 'data-source' }
})

Vue.use(vueAplayer);
Vue.use(ElementUI);

Vue.use(less)
// Vue.prototype.HOST = 'http://8002.frp.wanghuiwen.com/'
Vue.prototype.PageNumber = page_number //设置成全局变量，让每个组件都可以使用该全局变量
Vue.prototype.HOST = 'https://api.bountee.com.my/api/'	//正式服
// Vue.prototype.HOST = 'http://13.212.212.253/game/api/'	//测试服
Vue.prototype.initDete = function(date) {
	var timestamp4 = new Date(date); //直接用 new Date(时间戳) 格式转化获得当前时间
	return timestamp4.toLocaleDateString().replace(/\//g, "-") + " " + timestamp4.toTimeString().substr(0, 8)
}
Vue.prototype.initDetes = function(date) {
	// var time1 = new Date(date).getTime() / 1000
	var date1 = new Date(date);
	let time1 = date1.getTime()
	return time1
}

Vue.prototype.initDate = function(date) {
	var date = new Date(date);
	var YY = date.getFullYear() + '-';
	var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
	var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
	var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
	var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
	// return YY + MM + DD + " " + hh + mm + ss;
	return YY + MM + DD;
}


Vue.prototype.returns = function() {
	history.go(-1)
}

Vue.config.productionTip = false
Vue.use(VueRouter)

//获取原型对象上的push函数  解决重复点击同页面的报错
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}
export default function createApp() {
	const router = new VueRouter({
		mode: 'hash',
		routes: [{
				path: '/',
				name: 'center',
				component: () =>
					import('@/views/center/center'),
				meta: {
					ssr: true
				}
			}, {
				path: '/center/back-up',
				name: 'back-up',
				component: () =>
					import('@/views/center/back-up'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/match/index',
				name: 'matchIndex',
				component: () =>
					import('@/views/match/index'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/user/user_index',
				name: 'user_index',
				component: () =>
					import('@/views/user/user_index'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/user/user_details',
				name: 'user_details',
				component: () =>
					import('@/views/user/user_details'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/playwith/play_details',
				name: 'play_details',
				component: () =>
					import('@/views/playwith/play_details'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/playwith/play_examine',
				name: 'play_examine',
				component: () =>
					import('@/views/playwith/play_examine'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/order/commodity',
				name: 'commodity',
				component: () =>
					import('@/views/order/commodity'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/order/play',
				name: 'play',
				component: () =>
					import('@/views/order/play'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/order/compan_order',
				name: 'compan_order',
				component: () =>
					import('@/views/order/compan_order'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/order/recharge',
				name: 'recharge',
				component: () =>
					import('@/views/order/recharge'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/goodsManagement/goods_manage',
				name: 'goods_manage',
				component: () =>
					import('@/views/goodsManagement/goods_manage'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/goodsManagement/goods_class',
				name: 'goods_class',
				component: () =>
					import('@/views/goodsManagement/goods_class'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/user/integral',
				name: 'integral',
				component: () =>
					import('@/views/user/integral'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/user/integral_details',
				name: 'integral_details',
				component: () =>
					import('@/views/user/integral_details'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/user/rule',
				name: 'rule',
				component: () =>
					import('@/views/user/rule'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/setting/role',
				name: 'role',
				component: () =>
					import('@/views/setting/role'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/setting/account',
				name: 'account',
				component: () =>
					import('@/views/setting/account'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/setting/department',
				name: 'department',
				component: () =>
					import('@/views/setting/department'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/setting/menu',
				name: 'menu',
				component: () =>
					import('@/views/setting/menu'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/task/task_index',
				name: 'task_index',
				component: () =>
					import('@/views/task/task_index'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/task/new_task',
				name: 'new_task',
				component: () =>
					import('@/views/task/new_task'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/message/past_times',
				name: 'past_times',
				component: () =>
					import('@/views/message/past_times'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/message/msg_detail',
				name: 'msg_detail',
				component: () =>
					import('@/views/message/msg_detail'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/message/msg_push',
				name: 'msg_push',
				component: () =>
					import('@/views/message/msg_push'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/goodsManagement/freight',
				name: 'freight',
				component: () =>
					import('@/views/goodsManagement/freight'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/goodsManagement/add_goods',
				name: 'add_goods',
				component: () =>
					import('@/views/goodsManagement/add_goods'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/match/match_rule',
				name: 'match_rule',
				component: () =>
					import('@/views/match/match_rule'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/login/index',
				name: 'login',
				component: () =>
					import('@/views/login/index'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/match/information',
				name: 'information',
				component: () =>
					import('@/views/match/information'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/user/user_host',
				name: 'user_host',
				component: () =>
					import('@/views/user/user_host'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/user/user_organizer',
				name: 'user_organizer',
				component: () =>
					import('@/views/user/user_organizer'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/user/organ_details',
				name: 'organ_details',
				component: () =>
					import('@/views/user/organ_details'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/match/event_details',
				name: 'event_details',
				component: () =>
					import('@/views/match/event_details'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/user/coin',
				name: 'coin',
				component: () =>
					import('@/views/user/coin'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/user/coin_details',
				name: 'coin_details',
				component: () =>
					import('@/views/user/coin_details'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/user/companion',
				name: 'companion',
				component: () =>
					import('@/views/user/companion'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/match/game_management',
				name: 'game_management',
				component: () =>
					import('@/views/match/game_management'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/match/withdraw_management',
				name: 'withdraw_management',
				component: () =>
					import('@/views/match/withdraw_management'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/recharge/index',
				name: 'rechargeIndex',
				component: () =>
					import('@/views/recharge/index'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/match/team_list',
				name: 'team_list',
				component: () =>
					import('@/views/match/team_list'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/match/team_details',
				name: 'team_details',
				component: () =>
					import('@/views/match/team_details'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/recharge/recharge_index',
				name: 'recharge_index',
				component: () =>
					import('@/views/recharge/recharge_index'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/recharge/coupon',
				name: 'coupon',
				component: () =>
					import('@/views/recharge/coupon'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/match/list_management',
				name: 'list_management',
				component: () =>
					import('@/views/match/list_management'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/match/prize_list',
				name: 'prize_list',
				component: () =>
					import('@/views/match/prize_list'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/league/league',
				name: 'league',
				component: () =>
					import('@/views/league/league'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/league/predict_and_win',
				name: 'predict_and_win',
				component: () =>
					import('@/views/league/predict_and_win'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/league/rapid_challenge',
				name: 'rapid_challenge',
				component: () =>
					import('@/views/league/rapid_challenge'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/league/teams',
				name: 'teams',
				component: () =>
					import('@/views/league/teams'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/league/standing',
				name: 'standing',
				component: () =>
					import('@/views/league/standing'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/league/results',
				name: 'results',
				component: () =>
					import('@/views/league/results'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/league/transfer',
				name: 'transfer',
				component: () =>
					import('@/views/league/transfer'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/league/info',
				name: 'info',
				component: () =>
					import('@/views/league/info'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/league/top_players',
				name: 'top_players',
				component: () =>
					import('@/views/league/top_players'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/league/fixtures',
				name: 'fixtures',
				component: () =>
					import('@/views/league/fixtures'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/league/highlights',
				name: 'highlights',
				component: () =>
					import('@/views/league/highlights'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/league/predict_info',
				name: 'predict_info',
				component: () =>
					import('@/views/league/predict_info'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/league/create_predict',
				name: 'create_predict',
				component: () =>
					import('@/views/league/create_predict'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/league/create_league',
				name: 'create_league',
				component: () =>
					import('@/views/league/create_league'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/league/create_fixtures',
				name: 'create_fixtures',
				component: () =>
					import('@/views/league/create_fixtures'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/league/edit_fixtures',
				name: 'edit_fixtures',
				component: () =>
					import('@/views/league/edit_fixtures'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/league/new_carousel',
				name: 'new_carousel',
				component: () =>
					import('@/views/league/new_carousel'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/league/add_transfer',
				name: 'add_transfer',
				component: () =>
					import('@/views/league/add_transfer'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/league/create_highlights',
				name: 'create_highlights',
				component: () =>
					import('@/views/league/create_highlights'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/carousel/index',
				name: 'carousel',
				component: () =>
					import('@/views/carousel/index'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/carousel/form',
				name: 'carousel_form',
				component: () =>
					import('@/views/carousel/form'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/recharge/report',
				name: 'report',
				component: () =>
					import('@/views/recharge/report'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/recharge/faq_category',
				name: 'faq_category',
				component: () =>
					import('@/views/recharge/faq_category'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/recharge/faq_question',
				name: 'faq_question',
				component: () =>
					import('@/views/recharge/faq_question'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/user/create_question',
				name: 'create_question',
				component: () =>
					import('@/views/user/create_question'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/user/security_view',
				name: 'security_view',
				component: () =>
					import('@/views/user/security_view'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/user/referralList',
				name: 'referralList',
				component: () =>
					import('@/views/user/referralList'),
				meta: {
					ssr: true
				}
			},
			{
				path: '/user/question',
				name: 'question',
				component: () =>
					import('@/views/user/question'),
				meta: {
					ssr: true
				}
			},
		],
	})
	// 2. Create the root component option
	const app = {
		router,
		// This is necessary, it is for vue-meta
		head: {},
		render: h => h(App)
	}

	// 3. return
	return app
}
