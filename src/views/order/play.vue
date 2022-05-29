<template>
	<div class="index">
		<SettingView :index="2"></SettingView>
		<div class="container">
			<div class="top_tabs">
				<div class="tabs_block">订单管理  /</div>
				<div class="tabs_block">陪玩订单</div>
			</div>
			<div class="play_container">
				<div class="play_head">
					<div class="screen_title">
						<div class="screen_text">陪玩订单统计</div>
					</div>
                    <div class="commodity_statistics">
                        <div class="commodity_statistics_tit">陪玩订单总额</div>
                        <div class="commodity_statistics_num">{{play_all.amount || 0}}<span>Coins</span></div>
                    </div>
                    <div class="commodity_statistics">
                        <div class="commodity_statistics_tit">陪玩订单数</div>
                        <div class="commodity_statistics_num">{{play_all.orderCount || 0}}<span>笔</span></div>
                    </div>
					<!-- 筛选条件 -->
					<div class="screen_condition">
						<div class="condition_top">
							<div class="screen_block">
								<div class="search_span">订单编号：</div>
								<div class="search_input">
									<input type="text" placeholder="请输入" v-model="listQuery.orderId">
								</div>
							</div>
							<div class="screen_left">
								<div class="search_span">游戏类型：</div>
								<el-select v-model="listQuery.gameCategory" placeholder="请选择" style="margin-right: 20px;" @change="date_status" :popper-append-to-body="false">
									<el-option v-for="item in category_list" :key="item.gameCategoryId" :label="item.gameCategoryName" :value="item.gameCategoryId">
									</el-option>
								</el-select>
							</div>
							<div class="screen_left">
								<div class="search_span">订单状态：</div>
								<el-select v-model="listQuery.state" placeholder="请选择" style="margin-right: 20px;"  @change="date_status" :popper-append-to-body="false">
									<el-option label="待接单" value="1"></el-option>
									<el-option label="待完成" value="2"></el-option>
									<el-option label="To leave a review" value="3"></el-option>
									<el-option label="Completed" value="4"></el-option>
									<el-option label="Rejected" value="5"></el-option>
								</el-select>
							</div>
						</div>
						<div class="condition_bottom">
							<div class="bottom_left">
								<div class="screen_block1">
									<div class="search_span">下单用户：</div>
									<div class="search_input">
										<input type="text" placeholder="请输入" v-model="listQuery.userId">
									</div>
								</div>
								<div class="screen_date">
									<div class="search_span">下单时间:</div>
									<div class="date_select">
										<el-date-picker v-model="value1" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
										 value-format="yyyy-MM-dd HH:mm:ss"  format="yyyy-MM-dd HH:mm:ss"   @change="date_screen"></el-date-picker>
									</div>
								</div>
								<div class="screen_block2">
									<div class="search_span">陪玩ID：</div>
									<div class="search_input">
										<input type="text" placeholder="请输入" v-model="listQuery.companionId">
									</div>
								</div>
								<!-- <div class="screen_date">
									<el-radio v-model="radio2" label="1" border size="medium">今天</el-radio>
								    <el-radio v-model="radio2" label="2" border size="medium">近7天</el-radio>
								    <el-radio v-model="radio2" label="3" border size="medium">近30天</el-radio>
								</div> -->
							</div>
							<div class="bottom_right">
								<div class="screen_btn" @click="handleFilter">查 询</div>
								<div class="screen_btn2" @click="reset">重置</div>
								<div class="screen_btn" style="margin-right: 0;" @click="add_account">导出</div>
							</div>
						</div>
					</div>
				</div>
				<div class="play_content">
					<div class="play_form">
						<div class="play_table">
							<div class="table_header">
								<div class="table_head_div">订单编号</div>
								<div class="table_head_div2">游戏类型</div>
								<div class="table_head_div3">下单时间</div>
								<div class="table_head_div2">订单金额(Coins)</div>
								<div class="table_head_div">下单用户</div>
                                <div class="table_head_div">陪玩用户</div>
								<div class="table_head_div">订单状态</div>
								<div class="table_head_div4">操作</div>
							</div>
							<div class="table_body">
								<div class="body_row" v-for="(item,index) in play_list" :key="index">
									<div class="row_td_block">{{item.orderId}}</div>
									<div class="row_td_block2">{{item.gameName}}</div>
									<div class="row_td_block3">{{initDete(item.createTime)}}</div>
									<div class="row_td_block2">{{item.totalAmount}}</div>
									<div class="row_td_block">{{item.fullName}}</div>
									<div class="row_td_block">{{item.cfullName}}</div>
                                    <div class="row_td_block">
										<!-- /1. 待接单 2、待完成 3. To leave a review  4. Completed 5. Rejected -->
										{{item.state==1?'待接单':item.state==2?'待完成':item.state==3?'To leave a review':item.state==4?'Completed':item.state==5?'Rejected':''}}
									</div>
									<div class="row_td_block4">
										<!-- <div class="see_text" >禁用</div> -->
										<div class="see_detail" @click="jump_compan(item)">详情</div>
										<!-- <div class="see_del" >删除</div> -->
									</div>
								</div>
							</div>
						</div>
						<!-- 分页 -->
						<div class="play_pagination">
							<pagination v-show="total_count>0" :total="total_count" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="handlePageChange" @page_change="pageChange" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import SettingView from '@/components/setting/left2.vue';
	import {companionList} from '@/api/order';
	import {categoryList,gamdList} from '@/api/game';
	import Listing from '@/mixin/Listing';
	import Pagination from '@/components/Pagination'; // secondary package based on el-pagination
	export default {
		mixins: [Listing],
		filters: {
			statusFilter(status) {
				const statusMap = {
					published: 'success',
					draft: 'info',
					deleted: 'danger'
				};
				return statusMap[status];
			}
		},
		name: "play",
		components: {
		    SettingView,
			Pagination
		},
		data() {
			return {
				time:null,
				play_list: [],
				category_list:[],
                radio2: '1',
				value1:'',
				dialogFormVisible: false,
				listQuery: {
					orderId:"",       //订单ID
					gameCategory:"",  //邮箱Id
					state:"",        //状态 1. 待接单 2、待完成 3. To leave a review  4. Completed 5. Rejected
					userId:"",     //下单用户
					startTime:"",   
					endTime:"",     
					companionId:"", //陪玩Id
					page: 1,
					size: 10,
				},
				
				total_count: 1,
				play_all:'',
			}
		},
		mounted(){
			this.get_category();
			setTimeout(()=>{
				this.listQuery.page = this.PageNumber.page_number;
				this.getList()
			},180)	//当组件跳转时获取全局变量页数进行跳转
		},
		methods: {
			pageChange(value){
				this.PageNumber.page_number = value.page
			},
			get_category(){
				categoryList().then(res => {
					this.category_list = res.data
				})
			},
			// 陪玩订单列表
			getList(){
				let that = this;
				let params = that.listQuery
				if(that.time != null){
					let [startTime,endTime] = that.time;
					params['startTime'] = that.initDete(startTime);
					params['endTime'] = that.initDete(endTime);
				}
				companionList(params).then(res => {
					 const {list,total}=res.data.list
					 that.play_all = res.data;
					 that.play_list = list;
					 that.total_count = total;
				})
			},
			handleFilter(){
				this.listQuery.page = 1;
				this.getList()
			},
			// 下单时间Change
			date_screen(value){
				this.listQuery.startTime = Date.parse(value[0]);
				this.listQuery.endTime = Date.parse(value[1]);
				this.getList();
			},
			// 下单状态
			date_status(value){
				this.getList();
			},
			reset(){
			   this.listQuery = {
				   orderId:"",      
				   gameCategory:"", 
				   state:"",
				   userId:"",
				   startTime:"",   
				   endTime:"",     
				   companionId:"", 
				   page: 1,
				   size: 10,
			   }
			   this.getList()
			},
			add_account(){
				this.dialogFormVisible = ! this.dialogFormVisible
			},
			jump_compan(news){
				this.$router.push({ path: '/order/compan_order',query: {news: JSON.stringify(news)}})
			},
		}
	}
</script>

<style lang="less" scoped>
	.container {
		background: #33384B;
		margin: 0 56px 0 224px;
		padding-bottom:80px;
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
						font-family:'Quicksand-Bold';
						color: #FFFFFF;
					}
				}
                .commodity_statistics {
                    background-color: #2A2D41;
                    width: 200px;
                    padding: 20px;
                    display: inline-block;
                    margin-bottom: 20px;
                    margin-right: 20px;
                    .commodity_statistics_tit {
                        color: rgba(255, 255, 255, 0.65);
                        font-size: 13px;
                        margin-bottom: 20px;
						font-family:'Roboto-Regular';
                    }
                    .commodity_statistics_num {
                        color: #ffffff;
                        font-size: 20px;
						font-family:'Roboto-Bold';
                        padding-left: 10px;
                        span {
                            font-size: 14px;
                            margin-left: 10px;
                        }
                    }
                }
				.screen_condition {
					display: flex;
                    flex-flow: wrap;
					.condition_top{
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: space-between;
						.screen_left {
							display: flex;
							align-items: center;
							margin-top: 20px;
							.search_span {
								font-size: 14px;
								font-family:'Roboto-Regular';
								font-weight: 400;
								color: #FFFFFF;
							}
							/deep/ .el-select .el-input .el-input__inner {
								border: 0px;
								width: 300px;
								background-color: #33384B;
								border: 1px solid #ffffff;
								color: #ffffff;
								font-family:'Roboto-Regular';
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
							width: 40%;
							display: flex;
							align-items: center;
							margin-right: 17px;
							margin-top: 20px;
							.search_span {
								font-size: 14px;
								font-family:'Roboto-Regular';
								color: #FFFFFF;
							}
							.search_input {
								// width: 235px;
								// background-color: #ffff00;
								width: 440px;
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
					.condition_bottom{
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: space-between;
						.bottom_left{
							display: flex;
							align-items: center;
							.screen_block1 {
								display: flex;
								align-items: center;
								margin-right: 17px;
								margin-top: 20px;
								.search_span {
									font-size: 14px;
									font-family:'Roboto-Regular';
									font-weight: 400;
									color: #FFFFFF;
								}
								.search_input {
									// width: 235px;
									width: 150px;
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
							.screen_block2 {
								display: flex;
								align-items: center;
								margin-right: 17px;
								margin-top: 20px;
								.search_span {
									font-size: 14px;
									font-family:'Roboto-Regular';
									font-weight: 400;
									color: #FFFFFF;
								}
								.search_input {
									width: 137px;
									height: 37px;
									border-radius: 2px;
									border: 1px solid #FFFFFF;
									display: flex;
									align-items: center;
									position: relative;
									input {
										width: 40%;
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
							.screen_date{
								display: flex;
								align-items: center;
								margin-right: 15px;
								margin-top: 20px;
								.search_span {
									font-size: 14px;
									font-family:'Roboto-Regular';
									font-weight: 400;
									color: #FFFFFF;
								}
								.date_select{
									width: 355px;
									display: flex;
									align-items: center;
									margin-left: 10px;
									font-size: 14px;
									border-radius: 2px;
									/deep/.el-date-editor .el-range-separator{
										color: #fff;
									}
									/deep/ .el-input__inner{
										border: 0px;
										border: 1px solid #ffffff;
									}
									/deep/ .el-range-input{
										background-color: #33384B;
									}
									/deep/ .el-date-editor .el-range-input{
										color: #fff;
									}
									.el-radio {
										margin-right: 0;
										margin-left: 0;
									}
									/deep/ .el-radio__input {
										display: none;
									}
								}
								/deep/.el-date-editor .el-range-separator{
									color: #fff;
								}
								/deep/ .el-input__inner{
									border: 0px;
									background-color: #33384B;
									border: 1px solid #ffffff;
								}
								/deep/ .el-range-input{
									background-color: #33384B;
								}
								/deep/ .el-date-editor .el-range-input{
									color: #fff;
								}
								.el-radio {
									margin-right: 0;
									margin-left: 0;
								}
								/deep/ .el-radio__input {
									display: none;
								}
							}
							
						}
						.bottom_right{
							display: flex;
							align-items: center;
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
								margin-top: 20px;
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
								margin-right: 8px;
								font-family:'Roboto-Regular';
								margin-top: 20px;
							}
							
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
							font-family:'Quicksand-Bold';
							color: #FFFFFF;
							background: #2A2E3F;
							.table_head_div {
								width: 15%;
								color: #FFFFFF;
								font-size: 18px;
								display: flex;
								align-items: center;
								justify-content: center;
							}
							.table_head_div2 {
								width: 10%;
								color: #FFFFFF;
								font-size: 18px;
								display: flex;
								align-items: center;
								justify-content: center;
							}
							.table_head_div3 {
								width: 20%;
								color: #FFFFFF;
								font-size: 18px;
								display: flex;
								align-items: center;
								justify-content: center;
							}
							.table_head_div4{
								width: 10%;
								color: #FFFFFF;
								font-size: 18px;
								display: flex;
								align-items: center;
								justify-content: flex-start;
							}
							
						}
						//tabler_header
						.table_body {
							color: #fff;
							.body_row {
								display: flex;
								align-items: center;
								font-size: 14px;
								font-family:'Roboto-Regular';
								font-weight: 400;
								color: #FFFFFF;
								border-bottom: 1px solid #67717A;
								.row_td_block{
									width: 15%;
									height: 53px;
									display: flex;
									align-items: center;
									justify-content: center;
								}
								.row_td_block2{
									width: 10%;
									height: 53px;
									display: flex;
									align-items: center;
									justify-content: center;
								}
								.row_td_block3{
									width: 20%;
									height: 53px;
									display: flex;
									align-items: center;
									justify-content: center;
								}
								.row_td_block4{
									width: 10%;
									height: 53px;
									display: flex;
									align-items: center;
									justify-content: flex-start;
									.see_text {
										color: #238AE8;
										cursor:pointer;
										margin-right: 24px;
									}
									.see_detail {
										color: #238AE8;
										cursor:pointer;
										margin-right: 24px;
									}
									.see_del {
										color: #238AE8;
										cursor:pointer;
									}
								}
								// .row_td_block3{
								// 	width: 8%;
								// 	height: 53px;
								// 	display: flex;
								// 	align-items: center;
								// 	justify-content: center;
								// }
							}
						}
					}

					//play_table
					.play_pagination {
						margin:32px 0 0px 0px;
						display: flex;
						justify-content: flex-end;
					}
				}

				//play_form
			}

			//play_content
		}

		//play_container
	}
</style>
