<template>
	<div class="index">
		<div class="container">
			<div id="myChart" :style="{ height: '440px'}"></div>
		</div>
	</div>
</template>

<script>
	import {
		orderAnalysis
	} from '@/api/center.js'
	export default {
		name: "order_data",
		data() {
			return {
				listQuery: {
					type: 2, //1表示年、2表示月
				},
				commodity: [], //按月查询的商品订单 
				companion: [], //按月查询的陪玩订单 
				recharge: [], //按月查询的充值订单 
				year_commodity: [], //按年查询的商品订单
				year_companion: [], //按年查询的陪玩订单 
				year_recharge: [], //按年查询的充值订单 
				dayCommodity: [], //当天的商品订单
				dayCompanion: [], //当天的陪玩订单
				dayRecharge: [], //当天的充值订单
				source: [], //处理之后条形统计图的数据
				day_list: ['1号', '2号', '3号', '4号', '5号', '6号', '7号', '8号', '9号', '10号', '11号', '12号', '13号', '14号', '15号',
					'16号', '17号', '18号', '19号', '20号', '21号', '22号', '23号', '24号', '25号', '26号', '27号', '28号', '29号',
					'30号', "31号"
				], //日份的数据
				month_list: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'], //月份的数据
				monthNow: 0,
				show: [
					['product', '充值订单', '陪玩订单', '商品订单']
				],
				commodity_index: 0, //商品订单下标
				companion_index: 0, //陪玩订单下标
				recharge_index: 0, //充值订单下标
				index: 0, //设置下标
				date: 1, //设置每月的日期
				month: new Date(),

			}
		},
		mounted() {
			if(sessionStorage.getItem("token") != '' && sessionStorage.getItem("token") != null && sessionStorage.getItem("token") != undefined){
				this.getList()
			}
			
		},
		methods: {
			switch_date(data) {
				if (data == 1) {
					this.dealData(1)
				}
				if (data == 2) {
					this.dealData(2)
				}
				if (data == 3) {
					this.dealData(3)
				}
				if (data == 4) {
					this.dealData(4)
				}
			},
			getList() {
				new Promise((resolve, reject) => { //使用promise同时获取年和月的数据
					orderAnalysis(this.listQuery).then(res => {
						this.commodity = res.data.commodity //商品订单
						this.companion = res.data.companion //陪玩订单
						this.recharge = res.data.recharge //充值订单
						let today = new Date()
						let todayDate = this.initDate(today)
						if(todayDate == res.data.dayRecharge[0].date){
							this.dayRecharge = res.data.dayRecharge[0].counrOrder //当天充值订单
						}
						if(todayDate == res.data.dayCompanion[0].date){
							this.dayCompanion = res.data.dayCompanion[0].counrOrder //当天充值订单
						}
						if(todayDate == res.data.dayCommodity[0].date){
							this.dayCommodity = res.data.dayCommodity[0].counrOrder //当天充值订单
						}
						// this.dayCommodity = res.data.dayCommodity[0].counrOrder //当天商品订单
						// this.dayCompanion = res.data.dayCompanion[0].counrOrder //当天陪玩订单
						this.dealData(3)
						resolve()
					}) //获取月的数据
				}).then(data => {
						this.listQuery.type = 1
						orderAnalysis(this.listQuery).then(res => {
							this.year_commodity = res.data.commodity //商品订单
							this.year_companion = res.data.companion //陪玩订单
							this.year_recharge = res.data.recharge //充值订单
						})
					} //获取年的数据
				)
			},
			dealData(data) {
				//切换到今日
				if (data == 1) {
					this.show = [
						['product', '充值订单', '陪玩订单', '商品订单']
					]
					let order = "今日"
					order = order.split()
					order.push(this.dayCommodity)
					order.push(this.dayCompanion)
					order.push(this.dayRecharge)
					this.show.push(order)
					this.drawLine()
				}
				// 切换到本月
				if (data == 3) {
					this.index = 0
					this.date = 1
					this.commodity_index = 0
					this.companion_index = 0
					this.recharge_index = 0
					this.show = [
						['product', '充值订单', '陪玩订单', '商品订单']
					]

					for (let i = 0; i < 31; i++) {
						let order = this.day_list[this.index].split() //根据下标获取日期

						if (this.recharge_index == this.recharge.length) { //添加充值数量
							order.push("")
						} else {
							if (this.recharge[this.recharge_index].day == this.date) {
								order.push(this.recharge[this.recharge_index].counrOrder)
								this.recharge_index++
							} else {
								order.push("")
							}
						}

						if (this.companion_index == this.companion.length) { //添加陪玩数量
							order.push("")
						} else {
							if (this.companion[this.companion_index].day == this.date) {
								order.push(this.companion[this.companion_index].counrOrder)
								this.companion_index++
							} else {
								order.push("")
							}
						}

						if (this.commodity_index == this.commodity.length) { //添加商品数量
							order.push("")
						} else {
							if (this.commodity[this.commodity_index].day == this.date) {
								order.push(this.commodity[this.commodity_index].counrOrder)
								this.commodity_index++
							} else {
								order.push("")
							}
						}

						this.index++
						this.date++
						if (order[1] == "" && order[2] == "" && order[3] == "") {
							//进行判断如果商品、陪玩、充值都为空则不添加显示
						} else {
							this.show.push(order)
						}
						if (i == 30) { //当添加完毕后直接加载
							this.drawLine()
						}
					}
				}
				//end

				//切换到年
				if (data == 4) {

					this.commodity_index = 0
					this.companion_index = 0
					this.recharge_index = 0

					this.commodity_index = this.year_commodity.length - 1
					this.companion_index = this.year_companion.length - 1
					this.recharge_index = this.year_recharge.length - 1

					this.show = [
						['product', '充值订单', '陪玩订单', '商品订单']
					]
					this.monthNow = this.month.getMonth()
					this.date = this.monthNow + 1
					for (let i = 0; i <= 11; i++) {

						let order = this.month_list[this.monthNow].split() //根据下标获取日期
						if (this.recharge_index == -1) { //添加充值数量
							order.push("")
						} else {
							if (this.year_recharge[this.recharge_index].month == this.date) {
								order.push(this.year_recharge[this.recharge_index].counrOrder)
								this.recharge_index--
							} else {
								order.push("")
							}
						}

						if (this.companion_index == -1) { //添加陪玩数量
							order.push("")
						} else {
							if (this.year_companion[this.companion_index].month == this.date) {
								order.push(this.year_companion[this.companion_index].counrOrder)
								this.companion_index--
							} else {
								order.push("")
							}
						}

						if (this.commodity_index == -1) { //添加商品数量
							order.push("")
						} else {
							if (this.year_commodity[this.commodity_index].month == this.date) {
								order.push(this.year_commodity[this.commodity_index].counrOrder)
								this.commodity_index--
							} else {
								order.push("")
							}
						}

						if (this.monthNow == 0) {
							this.monthNow = 11
						} else {
							this.monthNow--
						}
						if (this.date == 0) {
							this.date = 11
						} else {
							this.date--
						}

						this.show.splice(1, 0, order) //添加数据

						if (i == 11) { //当添加完毕后直接加载
							this.drawLine()
						}
					}
				}
				//end
			},
			drawLine() {
				// var i=0;
				// 基于准备好的dom，初始化echarts实例
				let myChart = this.$echarts.init(document.getElementById("myChart"));
				// var chartDom = document.getElementById('main');
				// var myChart = echarts.init(chartDom);
				var option;
				var color = ["#228BE1", "#45F277", "#FF6161"];
				option = {
					legend: {
						textStyle: {
							color: "#ffffff"
						}
					},
					tooltip: {},
					color: ["#228BE1", "#45F277", "#FF6161"],
					// backgroundColor:['#fff'],
					dataset: {
						source: this.show
					},
					xAxis: {
						type: 'category'
					},
					yAxis: {},

					series: [{
							type: 'bar'
						},
						{
							type: 'bar'
						},
						{
							type: 'bar'
						}
					]
				};
				option && myChart.setOption(option);
			}
		}
	}
</script>

<style lang="less" scoped>
	.container {

		// width: 93%;
		// background: #33384B;
		// margin: 0 56px;
		// padding-bottom: 100px;
		#myChart {
			color: #fff;
		}
	}
</style>
