<template>
	<div class="index">
		<integView :index="3"></integView>
		<div class="container">
			<div class="top_tabs">
				<div class="tabs_block" @click="jump_play(1)">积分管理  /</div>
				<div class="tabs_block" @click="jump_play(2)">用户Coin /</div>
				<div class="tabs_block">Coin明细</div>
			</div>
			<div class="play_container">
				<div class="play_head">
					<div class="screen_title">
						<div class="screen_text">Coin明细</div>
					</div>
					<!-- 筛选条件 -->
					<div class="screen_condition">
						<div class="scr_left">
							<div class="screen_left">
								<div class="search_span">Coin来源：</div>
								<el-select v-model="listQuery.transactionType" placeholder="请选择" style="margin-right: 24px;" :popper-append-to-body="false">
									<el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</div>
							<!-- <div class="screen_left">
								<div class="search_span">Coin变化：</div>
								<el-select v-model="value2" placeholder="请选择" style="margin-right: 24px;" :popper-append-to-body="false">
									<el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</div> -->
						</div>
						<div class="scr_right">
							<div class="screen_btn" @click="handleFilter">查 询</div>
							<div class="screen_btn2" @click="reset">重置</div>
						</div>
					</div>
				</div>
				<div class="play_content">
					<div class="play_form">
						<div class="play_table">
							<div class="table_header">
								<div class="table_head_div2">时间</div>
								<div class="table_head_div2">操作人</div>
								<div class="table_head_div">Coin来源</div>
								<div class="table_head_div">Coin变化前</div>
								<div class="table_head_div">Coin变化</div>
								<div class="table_head_div2">Coin变化后</div>
							</div>
							<div class="table_body">
								<div class="no_data" v-if="coin_list ==''">暂无数据</div>
								<div class="body_row" v-for="(item,index) in coin_list" :key="index" v-if="coin_list !=''">
									<div class="row_td_block2">{{initDete(item.transactionTime)}}</div>
									<div class="row_td_block2">{{item.createUser}}</div>
									<div class="row_td_block">{{item.remark}}</div>
									<div class="row_td_block">{{item.coinBefore}}</div>
									<div class="row_td_block">
										<span :class="item.prefix == '+' ?'num_color':'num_color2'">
										{{item.prefix}}
										{{Math.abs(item.amountBalance)}}
										</span> 
									</div>
									<div class="row_td_block2">{{item.toCoinAfter}}</div>
								</div>
							</div>
						</div>
						<!-- 分页 -->
						<div class="play_pagination">
							<pagination v-show="total_count>0" :total="total_count" :page.sync="listQuery.page" :limit.sync="listQuery.size"
							 @pagination="handlePageChange" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import integView from '@/components/integral/left.vue';
	import {coinDetail} from '@/api/user.js'
	import Listing from '@/mixin/Listing';
	import Pagination from '@/components/Pagination';
	export default {
		name: "coin_details",
		mixins: [Listing],
		components: {
		    integView,
			Pagination
		},
		data() {
			return {
				currentPage: 2,
				play_list: [{
						play_id: 1,
						play_img: require("../../assets/images/toum3.png"),
						user_name: "充值奖励",
						status: "1",
						num1: "1231",
						num2: "+122",
						num3: "3456",
						time:'2020-12-14 20:00:54'
					}
				],
				options2: [{
						value: '1',
						label: '会员资格充值'
					},
					{
						value: '2',
						label: '任务已完成'
					},
					{
						value: '3',
						label: '加入快速挑战'
					},
					{
						value: '4',
						label: '参加比赛'
					},
					{
						value: '5',
						label: '在兑换中心兑换'
					},
					{
						value: '6',
						label: '加入预测并获胜'
					},
					{
						value: '7',
						label: '陪玩订单'
					}
				],
				value2: '',
				value1:'',
				listQuery:{
					userId:this.$route.query.userId,
					order:{
						balance_transaction_id:'desc',
					},
					transactionType:'',
					orderId:'',
					page:1,
					size:10
				},
				total_count:0,
				coin_list:[]
			}
		},
		mounted() {
			this.getList()
			// this.listQuery.userId = this.$route.query.userId
			// console.log(this.listQuery.userId)
		},
		methods: {
			// 列表
			getList(){
				coinDetail(this.listQuery).then(res => {
					this.coin_list = res.data.list
					this.total_count = res.data.total
				})
			},
			//筛选
			handleFilter(){
				this.listQuery.page = 1;
				this.getList()
			},
			//重置
			reset(){
				this.listQuery.transactionType = ''
			},
			jump_play(index){
				if(index == 1){
					this.$router.push({ path: '/user/integral'})
				}else if(index == 2){
					this.$router.push({ path: '/user/coin'})
				}
			},
		}
	}
</script>

<style lang="less" scoped>
	.container {
		background: #33384B;
		margin: 0 56px 0 224px;
		padding-bottom:20px;
		.top_tabs{
			position: fixed;
			display: flex;
			top: 98px;
			.tabs_block{
				cursor: pointer;
				font-size: 14px;
				font-family:'Roboto-Regular';
				font-weight: 400;
				color: rgba(255, 255, 255, 0.65);
				line-height: 22px;
				margin-right: 8px;
			}
			.tabs_block:last-child{
				margin-right: 0;
			}
		}
		.play_container {
			.play_head {
				padding: 30px 30px 0px 30px;
				.screen_title {
					display: flex;
					align-items: center;
					margin-bottom: 24px;
					.screen_text {
						font-size: 18px;
						font-family:'Roboto-Bold';
						font-weight: 500;
						color: #FFFFFF;
					}
				}
				.screen_condition {
					display: flex;
					align-items: center;
					justify-content: space-between;
					.scr_left{
						display: flex;
						.screen_left {
							display: flex;
							align-items: center;
							.search_span {
								font-size: 14px;
								font-family:'Roboto-Regular';
								font-weight: 400;
								color: #FFFFFF;
							}
							/deep/ .el-select .el-input .el-input__inner {
								border: 0px;
								width: 389px;
								color: #FFFFFF;
								background-color: #33384B;
								border: 1px solid #ffffff;
							}
						
							/deep/ .el-select-dropdown {
								background-color: #33384B;
								border: 1px solid rgba(255,255,255,0.2);
							}
						
							//修改单个的选项的样式
							/deep/ .el-select-dropdown__item {
								background-color: transparent;
								color: #fff;
								text-align: center;
							}
							/deep/ .el-select-dropdown__item.hover{
								background-color: #545873;
							}
							/deep/ .el-select-dropdown__item.selected{
								background-color: #545873;
							}
						}
						.screen_block {
							display: flex;
							align-items: center;
							margin-right: 33px;
							.search_span {
								font-size: 14px;
								font-family:'Roboto-Regular';
								font-weight: 400;
								color: #FFFFFF;
							}
							.search_input {
								width: 389px;
								height: 37px;
								border-radius: 2px;
								border: 1px solid #FFFFFF;
								display: flex;
								align-items: center;
								position: relative;
								input {
									width: 90%;
									outline: none;
									height: 30px;
									border: none;
									margin: 0 12px;
									font-size: 14px;
									color: #fff;
									background-color: #33384B;
								}
							}
						}
					}
					.scr_right{
						display: flex;
						.screen_btn {
							width: 65px;
							height: 40px;
							font-size: 14px;
							color: #FFFFFF;
							font-weight: 400;
							line-height: 40px;
							text-align: center;
							border-radius: 2px;
							background: #228BE1;
							cursor: pointer;
							border: 1px solid #228BE1;
							font-family:'Roboto-Regular';
							margin-right: 8px;
						}
						.screen_btn2 {
							width: 65px;
							height: 40px;
							font-size: 14px;
							color: #595959;
							font-weight: 400;
							line-height: 40px;
							text-align: center;
							border-radius: 2px;
							background: #FFFFFF;
							cursor: pointer;
							border: 1px solid #D9D9D9;
							font-family:'Roboto-Regular';
						}
					}	
				}
			}
			.play_content {
				margin: 24px 24px 0px 24px;
				.play_form {
					.play_table {
						.table_header {
							display: flex;
							align-items: center;
							height: 54px;
							font-size: 14px;
							font-family:'Roboto-Bold';
							color: #FFFFFF;
							background: #2A2E3F;
							.table_head_div {
								width: 20%;
								color: #FFFFFF;
								font-size: 18px;
								display: flex;
								align-items: center;
								justify-content: center;
							}
							.table_head_div2 {
								width: 20%;
								color: #FFFFFF;
								font-size: 18px;
								display: flex;
								align-items: center;
								justify-content: center;
							}
							
						}
						.table_body {
							color: #fff;
							.no_data{
								color: #727272;
								text-align: center;
								font-size: 18px;
								line-height: 80px;
							}
							.body_row {
								display: flex;
								align-items: center;
								font-size: 14px;
								font-family:'Roboto-Regular';
								color: #FFFFFF;
								border-bottom: 1px solid #67717A;
								.row_td_block{
									width: 20%;
									height: 53px;
									display: flex;
									align-items: center;
									justify-content: center;
									.num_color{
										color: #45F277;
										font-family:'Roboto-Bold';
									}
									.num_color2{
										color: #FF6161;
										font-family:'Roboto-Bold';
									}
								}
								.row_td_block2{
									width: 20%;
									height: 53px;
									display: flex;
									align-items: center;
									justify-content: center;
									.see_detail {
										color: #238AE8;
										font-family:'Roboto-Bold';
										cursor:pointer;
									}
								}
								
							}
						}
					}
					.play_pagination {
						margin:32px 0 0px 0px;
						display: flex;
						justify-content: flex-end;
					}
				}
			}
		}
	}
</style>
