<template>
	<div class="index">
		<SettingView :index="3"></SettingView>
		<div class="container">
			<!-- 创建账户 -->
				<div class="add_count_container">
					<el-dialog title="新建账户" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
						<el-form :model="form" label-width="90px" label-position="right">
							<el-form-item label="*用户名：">
								<el-input v-model="form.name" placeholder="" ></el-input>
							</el-form-item>
							<el-form-item label="*所属部门：">
								<el-select v-model="form.next" :popper-append-to-body="false">
									<el-option label="市场部" value="1"></el-option>
									<el-option label="营销部" value="2"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="*密码：">
								<el-input v-model="form.sorting" placeholder="" ></el-input>
							</el-form-item>
							<el-form-item label="*确认密码：">
								<el-input v-model="form.sortz" placeholder="" ></el-input>
							</el-form-item>
							<el-form-item label="*角色配置：">
								<el-select v-model="form.user" :popper-append-to-body="false">
								</el-select>
							</el-form-item>
							<el-form-item label="手机号：">
								<el-input v-model="form.phone" placeholder="" ></el-input>
							</el-form-item>
							<el-form-item label="邮箱：">
								<el-input v-model="form.email" placeholder="" ></el-input>
							</el-form-item>
							<el-form-item label="状态：">
								<el-radio v-model="form.status" label="1">开启</el-radio>
								<el-radio v-model="form.status" label="2">关闭</el-radio>
							</el-form-item>
						</el-form>
						<div slot="footer" class="dialog-footer">
							<el-button type="primary"  @click="add_account">确认</el-button>
						</div>
					</el-dialog>
				</div>
			<!-- end -->
			<div class="top_tabs">
				<div class="tabs_block">订单管理  /</div>
				<div class="tabs_block">充值订单</div>
			</div>
			<div class="play_container">
				<div class="play_head">
					<div class="screen_title">
						<div class="screen_text">充值订单统计</div>
					</div>
                    <div class="commodity_statistics">
                        <div class="commodity_statistics_tit">充值总额</div>
                        <div class="commodity_statistics_num">{{statistics.sumNum || 0}}<span>RM</span></div>
                    </div>
                    <div class="commodity_statistics">
                        <div class="commodity_statistics_tit">充值订单数</div>
                        <div class="commodity_statistics_num">{{statistics.countNum || 0}}<span>笔</span></div>
                    </div>
					<!-- 筛选条件 -->
					<div class="screen_condition">
						<div class="screen_block">
							<div class="search_span">订单编号：</div>
							<div class="search_input">
								<input type="text" v-model="listQuery.id" placeholder="请输入">
							</div>
						</div>
						<div class="goods_status">
							<div class="tit_name">下单时间:</div>
							<div class="date_select">
								<el-date-picker
									v-model="listQuery.startTime"
									type="date"
									placeholder="开始日期"
									value-format="timestamp">
								</el-date-picker>
								<span>-</span>
								<el-date-picker
									v-model="listQuery.endTime"
									type="date"
									placeholder="结束日期"
									value-format="timestamp">
								</el-date-picker>
								<img src="../../assets/images/date.png" class="date_icon" />
							</div>
						</div>
                        <!-- <div class="screen_date">
							<el-radio v-model="radio2" label="1" border size="medium">今天</el-radio>
                            <el-radio v-model="radio2" label="2" border size="medium">近7天</el-radio>
                            <el-radio v-model="radio2" label="3" border size="medium">近30天</el-radio>
						</div> -->
						<div class="screen_btn" @click="handleFilter">查 询</div>
						<div class="screen_btn2" @click="reset">重置</div>
						<div class="screen_btn" style="margin-right: 0;" @click="add_account">导出</div>
					</div>
				</div>
				<div class="play_content">
					<div class="play_form">
						<div class="play_table">
							<div class="table_header">
								<div class="table_head_div2">订单编号</div>
								<div class="table_head_div2">充值用户ID</div>
								<div class="table_head_div2">Top Up</div>
								<div class="table_head_div2">Coins</div><!-- 充值金额(RM) -->
								<div class="table_head_div2">充值时间</div>
								<div class="table_head_div2">充值状态</div>
								<div class="table_head_div2">操作</div>
							</div><!-- table_header -->
							<div class="table_body">
								<div class="body_row" v-for="(item,index) in recharge_list" :key="index">
									<div class="row_td_block2">{{item.id}}</div>
									<div class="row_td_block2">{{item.user_id}}</div>
									<div class="row_td_block2">{{item.rm}}</div>
									<div class="row_td_block2">{{item.total_amount}}</div>
									<div class="row_td_block2">{{initDete(item.create_time)}}</div>
									<div class="row_td_block2">{{item.state == 3 ? '管理员充值' : item.state == 2? '成功':'未成功'}}</div>
									<div class="row_td_block2">
										<!-- <div class="see_text" >禁用</div> -->
										<!-- <div class="see_detail">详情</div> -->
										<div class="see_del" >删除</div>
									</div>
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
	import SettingView from '@/components/setting/left2.vue';
	import Listing from '@/mixin/Listing';
	import Pagination from '@/components/Pagination'; // secondary package based on el-pagination
	import {rechargeOrderList} from '@/api/order.js'
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
		name: "recharge",
		components: {
		    SettingView,
			Pagination
		},
		data() {
			return {
				total_count: 0,
				play_list: [{
						id: '01',
						user_name: "daner",
						section:'市场部',
						phone: "13358181818",
						email:'123284@google.com',
						status: "启用",
						time: "2020-08-30 20:00:33",
					},
				],
				options2: [{
						value: '1',
						label: 'LOL'
					},
					{
						value: '2',
						label: 'PUBG'
					},
					{
						value: '3',
						label: 'DOTA'
					},
					{
						value: '4',
						label: '已拒绝'
					}
				],
                radio2: '1',
				value2: '',
				value1:'',
				dialogFormVisible: false,
				form:{
					status:'1'
				},
				recharge_list:[],
				total_count:0,
				listQuery:{
					id:'',
					startTime:'',
					endTime:'',
					page:1,
					size:10
				},
				statistics:{}
			}
		},
		mounted() {
			// this.getList()
		},
		methods: {
			//筛选
			handleFilter(){
				this.listQuery.page = 1;
				this.getList()
			},
			//重置
			reset(){
			   this.listQuery = {
				   id:'',
				   startTime:'',
				   endTime:'',
				   page:1,
				   size:10
			   }
			   this.getList()
			},
			getList(){
				rechargeOrderList(this.listQuery).then(res => {
					this.recharge_list = res.data.list.list
					this.total_count = res.data.list.total
					this.statistics = res.data.statistics[0]
				})
			},
			add_account(){
				// this.dialogFormVisible = ! this.dialogFormVisible
			},
			jump_play(index){
				this.$router.push({ path: '/user/integral_details'})
			},
		}
	}
</script>

<style lang="less" scoped>
	.container {
		background: #33384B;
		margin: 0 56px 0 224px;
		padding-bottom:20px;
		.add_count_container{
			/deep/.el-dialog{
				width: 460px;
				background-color: #33384B;
				border-radius: 16px;
			}
			/deep/.el-dialog__title{
				font-size: 16px;
				font-family:'Roboto-Regular';
				font-weight: 500;
				// color: #000000;
				color: #FFFFFF;
			}
			/deep/.el-dialog__headerbtn{
				/deep/.el-dialog__close{
					color: #FFFFFF;
				}
			}
			/deep/.el-form-item__label{
				font-size: 14px;
				font-family:'Roboto-Regular';
				font-weight: 400;
				color: #FFFFFF;
			}
			/deep/.el-input__inner{
				width: 258px;
				height: 32px;
				border: 1px solid #FFFFFF;
				color: #FFFFFF;
				background-color: #33384B;
				border-radius: 8px;
			}
			/deep/ .el-radio__label{
				// color: #FFFFFF;
			}
			/deep/.el-dialog__body{
				padding: 24px 24px;
			}
		}
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
                        padding-left: 10px;
						font-family:'Roboto-Bold';
                        span {
                            font-size: 14px;
                            margin-left: 10px;
                        }
                    }
                }
				.screen_condition {
					display: flex;
                    flex-flow: wrap;
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
							width: 151px;
							font-family:'Roboto-Regular';
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
							font-family:'Roboto-Regular';
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
						margin-right: 17px;
                        margin-top: 20px;
						.search_span {
							font-size: 14px;
							font-family:'Roboto-Regular';
							font-weight: 400;
							color: #FFFFFF;
						}
						.search_input {
							width: 235px;
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
								font-family:'Roboto-Regular';
								background-color: #33384B;
							}
						}
					}
					
					.goods_status{
						display: flex;
						align-items: center;
						// margin-left: 10px;
						margin-right: 39px;
						margin-top: 20px;
						.tit_name{
							font-family:'Roboto-Regular';
							color: rgba(255, 255, 255, 0.65);
							margin-right: 10px;
							font-size: 14px;
						}
						.date_select{
							display: flex;
							align-items: center;
							margin-left: 10px;
							font-size: 14px;
							border: 1px solid #ACACAC;
							border-radius: 2px;
							span{
								color: rgba(255, 255, 255, 0.65);
								margin-right: 15px;
							}
							/deep/ .el-date-editor{
								width: 170px;
								background-color: #33384B;
								font-size: 14px;
								background-color: #33384B;
							}
							/deep/ .el-input{
								background-color: #33384B;
							}
							/deep/ .el-input__inner{
								background-color: #33384B;
								border: none;
								color: rgba(255, 255, 255, 0.65);
							}
							/deep/ .el-input__prefix .el-input__icon{
								color: #33384B;
							}
							/deep/.el-date-editor .el-range-separator{
								color: rgba(255, 255, 255, 0.65);
							}
							.date_icon{
								width: 15px;
								height: 15px;
								margin-right: 10px;
							}
						}
					}
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
			//.play_head
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
								width: 13.6%;
								color: #FFFFFF;
								font-size: 18px;
								display: flex;
								align-items: center;
								justify-content: center;
							}
							.table_head_div2 {
								// width: 20.6%;
								width: 14.3%;
								color: #FFFFFF;
								font-size: 18px;
								display: flex;
								align-items: center;
								justify-content: center;
							}
							.table_head_div3 {
								width: 8%;
								color: #FFFFFF;
								font-size: 18px;
								display: flex;
								align-items: center;
								justify-content: center;
							}
						}
						.table_body {
							color: #fff;
							font-family:'Roboto-Regular';
							.body_row {
								display: flex;
								align-items: center;
								font-size: 14px;
								font-family:'Roboto-Regular';
								font-weight: 400;
								color: #FFFFFF;
								border-bottom: 1px solid #67717A;
								.row_td_block{
									width: 13.6%;
									height: 53px;
									display: flex;
									align-items: center;
									justify-content: center;
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
								.row_td_block2{
									width: 14.3%;
									height: 53px;
									display: flex;
									align-items: center;
									justify-content: center;
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
								.row_td_block3{
									width: 8%;
									height: 53px;
									display: flex;
									align-items: center;
									justify-content: center;
								}
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
