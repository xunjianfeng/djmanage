<template>
	<div class="index">
		<div class="container">
			<div class="center_container">
				<!-- 赛事数据 -->
				<div class="event_data">
					<div class="title_block">
						<div class="title_name">赛事数据</div>
					</div>
					<div class="data_block">
						<!-- 待审核 -->
						<div class="check_pending">
							<div class="top">
								<div class="text">待审核</div>
								<div class="top_icon">
									<img src="../../assets/images/center_icon_1.png" />
								</div>
							</div>
							<div class="amount">
								<div class="text">{{tournamentUnPass.countTournament}}</div>
							</div>
							<div class="chart_area">
								<!-- <AreaChart :index="1"></AreaChart> -->
							</div>
						</div>
						<!-- 报名中 -->
						<div class="appling">
							<div class="top">
								<div class="text">报名中</div>
								<div class="top_icon">
									<img src="../../assets/images/center_icon_1.png" />
								</div>
							</div>
							<div class="amount">
								<div class="text">{{tournamentResg.countTournament}}</div>
							</div>
							<div class="chart_area">
								<!-- <AreaChart :index="2"></AreaChart> -->
							</div>
						</div>
						<!-- 进行中 -->
						<div class="block_3">
							<div class="top">
								<div class="text">进行中</div>
								<div class="top_icon">
									<img src="../../assets/images/center_icon_1.png" />
								</div>
							</div>
							<div class="amount">
								<div class="text">{{tournamentProcessing.countTournament}}</div>
							</div>
							<div class="chart_area">
								<!-- <div id="AreaChart_3" :style="{ height: '100px'}"></div> -->
								<!-- <AreaChart :index="3"></AreaChart> -->
							</div>
						</div>
					</div><!-- data_block -->
				</div><!-- event_data -->
				<!-- 订单数据 -->
				<div class="order_data">
					<div class="title_block">
						<div class="title_name">订单数据</div>
					</div>
					<div class="order_data_block">
						<div class="date_block">
							<div class="date_text">
								<div @click="change_table(1)" :class="{'the_weed':font_show==1}">今日</div>
								<!-- <div @click="change_table(2)" :class="{'the_weed':font_show==2}">本周</div> -->
								<div @click="change_table(3)" :class="{'the_weed':font_show==3}">本月</div>
								<div @click="change_table(4)" :class="{'the_weed':font_show==4}">全年</div>
							</div><!-- date_text -->
							<div class="date_select">
								<el-date-picker
								    v-model="value"
									type="daterange"
								    range-separator="-"
								    start-placeholder="开始日期"
								    end-placeholder="结束日期">
								</el-date-picker>
							</div>
						</div><!-- date_block -->
						<div class="chart_area">
							<OrderData ref="data_table"></OrderData>
						</div>
					</div><!-- order_data_block -->
				</div><!-- order_data -->
				<div class="data_block_3">
					<!-- 用户实时注册情况 -->
					<div class="registration_block">
						<div class="title_block">
							<div class="title_name">用户实时注册情况</div>
						</div>
						<div class="line_chart_area">
							<LineChart></LineChart>
						</div>
					</div>
					<!-- 今日交易金额类比 -->
					<div class="deal_money_block">
						<div class="title_block">
							<div class="title_name">今日交易金额类比</div>
						</div>
						<div class="line_chart_area">
							<PieChart></PieChart>
						</div>
					</div>
				</div>
				
			</div><!-- center_container -->
		</div>
	</div>
</template>

<script>
	import OrderData from '@/components/center/order_data.vue'
	import LineChart from '@/components/center/line_chart.vue'
	import PieChart from '@/components/center/pie_chart.vue'		
	import AreaChart from '@/components/center/area_chart.vue'
	import {tournamentData} from '@/api/center.js'
	export default {
		name: "center",
		components:{
			OrderData,
			LineChart,
			PieChart,
			AreaChart
		},
		data() {
			return {
				value:'',
				font_show:3,
				tournamentData:[],//赛事统计
				tournamentUnPass:{},//待审核
				tournamentResg:{},//报名中
				tournamentProcessing:{},//进行中
				pickerOptions: {
				    shortcuts: [{
				        text: '最近一周',
				        onClick(picker) {
				            const end = new Date();
				            const start = new Date();
				            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
				            picker.$emit('pick', [start, end]);
				        }
				    }, {
				        text: '最近一个月',
				        onClick(picker) {
				            const end = new Date();
				            const start = new Date();
				            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
				            picker.$emit('pick', [start, end]);
				        }
				     }, {
				        text: '最近三个月',
				        onClick(picker) {
				            const end = new Date();
				            const start = new Date();
				            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
				            picker.$emit('pick', [start, end]);
				        }
				    }]
				},
				
			}
		},
		mounted() {
			if(sessionStorage.getItem("token") != '' && sessionStorage.getItem("token") != null && sessionStorage.getItem("token") != undefined){
				this.getTourData()
				this.drawLine_3()
			}
		},
		methods: {
			change_table(data){
				if(data == 1){
					this.font_show = 1
					this.$refs.data_table.switch_date(1)
				}
				if(data == 2){
					this.font_show = 2
					this.$refs.data_table.switch_date(2)
				}
				if(data == 3){
					this.font_show = 3
					this.$refs.data_table.switch_date(3)
				}
				if(data == 4){
					this.font_show = 4
					this.$refs.data_table.switch_date(4)
				}
			},
			getTourData(){
				tournamentData().then(res => {
					this.tournamentData = res.data
					for(let i=0;i<this.tournamentData.length;i++){
						if(this.tournamentData[i].status == 1){
							this.tournamentUnPass = this.tournamentData[i]
						}
						if(this.tournamentData[i].status == 2){
							this.tournamentResg = this.tournamentData[i]
						}
						if(this.tournamentData[i].status == 3){
							this.tournamentProcessing = this.tournamentData[i]
						}
					}
				})
			},
			drawLine_3() {
				let AreaChart_3 = this.$echarts.init(document.getElementById("AreaChart_3"));
				var option;
				var color = [ "#228BE1","#45F277","#FF6161"];
				option = {
				    tooltip: {
				        trigger: 'axis',
				        axisPointer: {
				            type: 'cross',
				            label: {
				                backgroundColor: '#FF6161'
				            }
				        }
				    },
					color : [ "#228BE1"],
				    legend: {
				        data: ['邮件营销']
				    },
				    
				    grid: {
				        left: '3%',
				        right: '4%',
				        bottom: '3%',
				        containLabel: true
				    },
				    xAxis: [
				        {
				            type: 'category',
				            // boundaryGap: false,
				            data: ['', '', '', '', '', '', '']
				        }
				    ],
				    yAxis: [
				        {
				            type: 'value'
				        }
				    ],
				    series: [
				        {
				            name: '待审核',
				            type: 'line',
				            areaStyle: {},
				            emphasis: {
				                focus: 'series'
				            },
				            data: [120, 132, 101, 134, 90, 230, 210]
				        },
				        
				    ]
				};
				option && AreaChart_3.setOption(option);
			}
		}
	}
</script>

<style lang="less" scoped>
.container {
	width: 93%;
	// background: #33384B;
	margin: 0 56px;
	padding-bottom: 100px;
	.center_container{
		// 赛事数据
		.event_data{
			.title_block{
				margin-bottom: 40px;
				.title_name{
					color: #ffffff;
					font-size: 16px;
					font-family:'Roboto-Regular';
				}
			}
			// align-items: center;
			.data_block{
				display: flex;
				justify-content: space-between;
				// 待审核
				.check_pending{
					width: 517px;
					height: 189px;
					background: #33384B;
					color: #ffffff;
					border-radius: 5px;
					.top{
						display: flex;
						align-items: center;
						justify-content: space-between;
						font-size: 18px;
						.text{
							margin-left: 20px;
							margin-top: 20px;
							font-size: 16px;
							font-family:'Roboto-Bold';
						}
						.top_icon{
							width: 20px;
							height: 20px;
							margin-top: 20px;
							margin-right: 20px;
							border: 1px dashed #7A8493;
							img{
								width: 20px;
								height: 20px;
							}
						}
					}//top
					.amount{
						margin-left: 20px;
						margin-top: 15px;
						.text{
							font-size: 30px;
							font-family:'Roboto-Regular';
						}
					}
					.chart_area{
						width: 90%;
						height: 50px;
						margin-left: 20px;
						margin-top: 15px;
						background-color: #228BE1;
					}
				}//.check_pending
				// 报名中
				.appling{
					width: 517px;
					height: 189px;
					background: #33384B;
					color: #ffffff;
					border-radius: 5px;
					.top{
						display: flex;
						align-items: center;
						justify-content: space-between;
						font-size: 18px;
						.text{
							margin-left: 20px;
							margin-top: 20px;
							font-size: 16px;
							font-family:'Roboto-Bold';
						}
						.top_icon{
							width: 20px;
							height: 20px;
							margin-top: 20px;
							margin-right: 20px;
							border: 1px dashed #7A8493;
							img{
								width: 20px;
								height: 20px;
							}
						}
					}//top
					.amount{
						margin-left: 20px;
						margin-top: 15px;
						.text{
							font-size: 30px;
							font-family:'Roboto-Regular';
						}
					}
					.chart_area{
						width: 90%;
						height: 50px;
						margin-left: 20px;
						margin-top: 15px;
						background-color: #45F277;
					}
				}//.appling
				// 进行中
				.block_3{
					width: 517px;
					height: 189px;
					background: #33384B;
					color: #ffffff;
					border-radius: 5px;
					.top{
						display: flex;
						align-items: center;
						justify-content: space-between;
						font-size: 18px;
						.text{
							margin-left: 20px;
							margin-top: 20px;
							font-size: 16px;
							font-family:'Roboto-Bold';
						}
						.top_icon{
							width: 20px;
							height: 20px;
							margin-top: 20px;
							margin-right: 20px;
							border: 1px dashed #7A8493;
							img{
								width: 20px;
								height: 20px;
							}
						}
					}//top
					.amount{
						margin-left: 20px;
						margin-top: 15px;
						.text{
							font-size: 30px;
							font-family:'Roboto-Regular';
						}
					}
					.chart_area{
						width: 90%;
						height: 50px;
						margin-left: 20px;
						margin-top: 15px;
						background-color: #FF6161;
						
					}
				}//.block_3		
			}//data_block
		}//event_data
		// 订单数据
		.order_data{
			margin-top: 30px;
			// height: 200px;
			.title_block{
				margin-bottom: 40px;
				.title_name{
					color: #ffffff;
					font-size: 16px;
					font-family:'Roboto-Regular';
				}
			}
			.order_data_block{
				background: #33384B;
				.date_block{
					display: flex;
					align-items: center;
					justify-content: flex-end;
					
					.date_text{
						display: flex;
						align-items: center;
						color: #A4A4A4;
						margin-top: 30px;
						font-size: 16px;
						font-family:'Roboto-Regular';
						cursor:pointer;
						div{
							margin-left: 20px;
						}
						.the_weed{
							color: #fff;
							font-family:'Roboto-Bold';
						}
					}
					.date_select{
						margin-top: 30px;
						margin-left: 30px;
						margin-right: 20px;
						/deep/ .el-date-editor {
							width: 300px;
							background-color: #33384B;
							border: 1px solid #fff;
						}
						/deep/ .el-range-input{
							background-color: #33384B;
							color: #ffffff;
							font-family:'Roboto-Regular';
						}
					}
				}//.date_block
				.chart_area{
					margin-top: 40px;
				}
			}//order_data_block
		}//order_data
		.data_block_3{
			margin-top: 50px;
			display: flex;
			justify-content: space-between;
			// 用户实时注册情况
			.registration_block{
				width: 49%;
				.title_block{
					margin-bottom: 20px;
					.title_name{
						color: #ffffff;
						font-size: 16px;
						font-family:'Roboto-Regular';
					}
				}
				.line_chart_area{
					background: #33384B;
				}
			}//registration_block
			// 今日交易金额类比
			.deal_money_block{
				width: 49%;
				.title_block{
					margin-bottom: 20px;
					.title_name{
						color: #ffffff;
						font-size: 16px;
						font-family:'Roboto-Regular';
					}
				}
				.line_chart_area{
					background: #33384B;
				}
			}//deal_money_block
		}//.data_block_3
	}//center_container
}
</style>
