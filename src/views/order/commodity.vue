<template>
	<div class="index">
		<SettingView :index="1"></SettingView>
		<div class="container">
			<!-- 发货处理 -->
			<div class="add_count_container">
				<el-dialog title="发货处理" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
					<el-form :model="form" label-width="90px" label-position="right">
						<el-form-item label="物流编号：">
							<el-input v-model="form.orderNumber" placeholder="请输入该订单的物流编号"></el-input>
						</el-form-item>
						<el-form-item label="物流公司：">
							<el-input v-model="form.companyName" placeholder="请输入物流公司名称"></el-input>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button type="primary" @click="deliverGoods(order_id)">确认</el-button>
					</div>
				</el-dialog>
			</div>
			<!-- end -->
			<div class="top_tabs">
				<div class="tabs_block">订单管理 /</div>
				<div class="tabs_block">商品订单</div>
			</div>
			<div class="play_container">
				<div class="play_head">
					<div class="screen_title">
						<div class="screen_text">商品订单统计</div>
					</div>
					<!-- <div class="commodity_statistics">
						<div class="commodity_statistics_tit">商品订单总额</div>
						<div class="commodity_statistics_num" v-if="statistics">{{statistics.totalAmount||0}}<span>RM</span></div>
					</div> -->
					<div class="commodity_statistics">
						<div class="commodity_statistics_tit">商品订单数</div>
						<div class="commodity_statistics_num" v-if="statistics">{{statistics.count||0}}<span>笔</span></div>
					</div>
					<div class="commodity_statistics">
						<div class="commodity_statistics_tit">待发货</div>
						<div class="commodity_statistics_num" v-if="statistics">{{deliver_list.length||0}}<span>笔</span></div>
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
							<div class="screen_block2">
								<div class="search_span">商品名称：</div>
								<div class="search_input">
									<input type="text" placeholder="请输入" v-model="listQuery.commodityName">
								</div>
							</div>
							<div class="screen_left">
								<div class="search_span">订单状态：</div>
								<el-select v-model="listQuery.orderState" placeholder="请选择" style="margin-right: 20px;" :popper-append-to-body="false">
									<el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</div>
						</div>
						<div class="condition_bottom">
							<div class="screen_block">
								<div class="search_span">下单用户：</div>
								<div class="search_input">
									<input type="text" placeholder="请输入" v-model="listQuery.userId">
								</div>
							</div>
							<div class="screen_date">
								<div class="search_span">下单时间：</div>
								<el-date-picker v-model="value1" type="datetimerange" range-separator="至" start-placeholder="开始日期"
								 end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss"  format="yyyy-MM-dd HH:mm:ss" @change="date_screen">
								</el-date-picker>
							</div>

							<div class="screen_date">
								<el-radio v-model="radio2" label="1" border size="medium" @change="screenDate(1)">今天</el-radio>
								<el-radio v-model="radio2" label="2" border size="medium" @change="screenDate(2)">近7天</el-radio>
								<el-radio v-model="radio2" label="3" border size="medium" @change="screenDate(3)">近30天</el-radio>
							</div>
							<div class="btn_area">
								<div class="screen_btn" @click="handleFilter">查 询</div>
								<div class="screen_btn2" @click="resetting">重置</div>
								<!-- <div class="screen_btn" style="margin-right: 0;">导出</div> -->
							</div>
						</div>
					</div>
				</div>
				<div class="play_content">
					<div class="play_form">
						<div class="play_table">
							<div class="table_header">
								<div class="table_head_div3">订单编号</div>
								<div class="table_head_div4">商品昵称</div>
								<div class="table_head_div2">下单用户ID</div>
								<div class="table_head_div">数量</div>
								<div class="table_head_div">订单金额</div>
								<div class="table_head_div">下单时间</div>
								<div class="table_head_div">订单状态</div>
								<div class="table_head_div">支付方式</div>
								<div class="table_head_div">操作</div>
							</div>
							<div class="table_body">
								<div class="body_row" v-for="(item,index) in order_list" :key="index">
									<div class="row_td_block3">{{item.orderId}}</div>
									<div class="row_td_block4">{{item['commodityVos'].length>0?item['commodityVos'][0]['commodityName']:''}}</div>
									<div class="row_td_block2">{{item.userId}}</div>
									<div class="row_td_block">{{item['commodityVos'].length>0?item['commodityVos'][0]['amount']:''}}</div>
									<div class="row_td_block">{{item.totalAmount}}</div>
									<div class="row_td_block">{{initDete(item.createTime)}}</div>
									<div class="row_td_block">{{item.orderState==1?'待发货':item.orderState==2?'已发货':item.orderState==3?'已完成':''}}</div>
									<div class="row_td_block">{{item['commodityVos'].length>0?item['commodityVos'][0]['payMethod']:''}}</div>
									<div class="row_td_block">
										<!-- <div class="see_text" >禁用</div> -->
										<div class="see_detail" v-if="item.orderState==1" @click="handlerDeliver(item.orderId)">发货处理</div>
										<!-- <div class="see_detail" v-if="item.orderState==1" @click="deliverGoods(item.orderId)">发货</div> -->
										<div class="see_del">删除</div>
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
	import {
		commodityList,
		commoditySend
	} from '@/api/order'
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
		name: "commodity",
		components: {
			SettingView,
			Pagination
		},
		data() {
			return {
				currentPage: 2,
				order_list: [],
				options2: [{
						value: '1',
						label: '待发货'
					},
					{
						value: '2',
						label: '已发货'
					},
					{
						value: '3',
						label: '已完成'
					}
				],
				listQuery: {
					orderId: '',
					commodityName: '',
					orderState: '',
					userId: '',
					orderId: '',
					startTime: '',
					endTime: '',
					page: 1,
					size: 10
				},
				total_count: 0,
				statistics: {
					totalAmount: '',
					count: ''
				},
				radio2: '0',
				value2: '',
				value1: '',
				dialogFormVisible: false,
				form: {
					status: '1',
					orderNumber: '',
					companyName: ''
				},
				order_id: '',
				deliver_list: '',

			}
		},
		mounted() {
			this.getList()
			this.getNum()
		},
		methods: {
			//处理发货
			handlerDeliver(orderId) {
				this.dialogFormVisible = true
				this.order_id = orderId
			},
			// 发货
			deliverGoods(order_id) {
				if (this.form.orderNumber == '' || this.form.companyName == '') {
					this.$message({
						type: 'warning',
						message: "物流编号或物流公司名称不能为空！"
					});
				} else {
					this.dialogFormVisible = false
					this.$confirm('是否发货?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						let params = {
							orderId: order_id,
							orderNumber: this.form.orderNumber,
							companyName: this.form.companyName
						}
						console.log(params)
						commoditySend(params).then(res => {
							this.$message({
								type: 'success',
								message: res.message
							});
							this.getList()
							this.getNum()
						})
					}).catch(() => {});
				}

			},
			jump_play(index) {
				this.$router.push({
					path: '/user/integral_details'
				})
			},
			// 筛选 近期日期
			screenDate(index) {
				if (index == 1) {
					console.log("今天")
					this.getHDate()
				} else if (index == 2) {
					console.log("近7天")
					this.getH6Date()
				} else {
					console.log("近30天")
					this.getH30Date()
				}
			},
			//筛选今天
			getHDate() {
				let that = this;
				var h30Date = new Date();
				// h30Date.setDate(h30Date.getDate());
				var lastY = h30Date.getFullYear();
				var lastM = h30Date.getMonth() + 1;
				var lastD = h30Date.getDate();
				let after_today = lastY + "-" + (lastM < 10 ? "0" + lastM : lastM) + "-" + (lastD < 10 ? "0" + lastD : lastD);
				this.listQuery.startTime = this.initDetes(after_today + ' ' + "00:00:00")
				this.listQuery.endTime = this.initDetes(after_today + ' ' + "23:59:59")
				this.getList()
			},
			//筛选近7天
			getH6Date() {
				let that = this;
				var h30Date = new Date();
				var lastD1 = h30Date.getDate();
				h30Date.setDate(h30Date.getDate() - 6);
				console.log(lastD1,"h30Date")
				var lastY = h30Date.getFullYear();
				var lastM = h30Date.getMonth() + 1;
				var lastD = h30Date.getDate();
				var lastH = h30Date.getHours();
				var lastm = h30Date.getMinutes();
				var lasts = h30Date.getSeconds();
				let after_today = lastY + "-" + (lastM < 10 ? "0" + lastM : lastM) + "-" + (lastD < 10 ? "0" + lastD : lastD) + ' ' +
					(lastH < 10 ? "0" + lastH : lastH) + ':' + (lastm < 10 ? "0" + lastm : lastm) + ':' + (lasts < 10 ? "0" + lasts :
						lasts);
				let after_today1 = lastY + "-" + (lastM < 10 ? "0" + lastM : lastM) + "-" + (lastD1 < 10 ? "0" + lastD1 : lastD1) +
					' ' + (lastH < 10 ? "0" + lastH : lastH) + ':' + (lastm < 10 ? "0" + lastm : lastm) + ':' + (lasts < 10 ? "0" +
						lasts : lasts);
				this.listQuery.startTime = this.initDetes(after_today)
				this.listQuery.endTime = this.initDetes(after_today1)
				console.log(after_today,"startTime")
				console.log(after_today1,"endTime")
				this.getList()
			},
			//筛选近30天
			getH30Date() {
				let that = this;
				var h30Date = new Date();
				var lastD1 = h30Date.getDate();
				var lastY1 = h30Date.getFullYear();
				var lastM1 = h30Date.getMonth() + 1;
				h30Date.setDate(h30Date.getDate() - 30);
				var lastY = h30Date.getFullYear();
				var lastM = h30Date.getMonth() + 1;
				var lastD = h30Date.getDate();
				var lastH = h30Date.getHours();
				var lastm = h30Date.getMinutes();
				var lasts = h30Date.getSeconds();
				let after_today = lastY + "-" + (lastM < 10 ? "0" + lastM : lastM) + "-" + (lastD < 10 ? "0" + lastD : lastD) + ' ' +
					(lastH < 10 ? "0" + lastH : lastH) + ':' + (lastm < 10 ? "0" + lastm : lastm) + ':' + (lasts < 10 ? "0" + lasts :
						lasts);
				let after_today1 = lastY1 + "-" + (lastM1 < 10 ? "0" + lastM1 : lastM1) + "-" + (lastD1 < 10 ? "0" + lastD1 : lastD1) +
					' ' + (lastH < 10 ? "0" + lastH : lastH) + ':' + (lastm < 10 ? "0" + lastm : lastm) + ':' + (lasts < 10 ? "0" +
						lasts : lasts);
				this.listQuery.startTime = this.initDetes(after_today)
				this.listQuery.endTime = this.initDetes(after_today1)
				this.getList()
			},
			// 下单时间Change
			date_screen(value){
				this.listQuery.startTime = Date.parse(value[0]);
				this.listQuery.endTime = Date.parse(value[1]);
				this.getList();
				this.radio2 = '0'
			},
			getList() {
				// let that = this;
				commodityList(this.listQuery).then(res => {
					const {
						list,
						total
					} = res.data.list
					this.statistics = res.data.statistics
					this.total_count = total
					this.order_list = list;
				})
			},
			//获取待发货数量
			getNum(){
				commodityList({size:0}).then(res => {
					let arr = []
					for (let i = 0; i < res.data.list.list.length; i++) {
						if (res.data.list.list[i].orderState == 1) {
							arr.push(res.data.list.list[i])
						}
					}
					this.deliver_list = arr
					// console.log(this.deliver_list)
				})
			},
			handleFilter() {
				this.listQuery.page = 1;
				this.getList()
			},
			// 重置
			resetting() {
				this.listQuery = {
					orderId: '',
					commodityName: '',
					orderState: '',
					userId: '',
					orderId: '',
					startTime: '',
					endTime: '',
					page: 1,
					size: 10
				}
				this.radio2 = '0'
				this.getList()
			},
		}
	}
</script>

<style lang="less" scoped>
	.container {
		background: #33384B;
		margin: 0 56px 0 224px;
		padding-bottom: 20px;
		.add_count_container {
			/deep/.el-dialog {
				width: 460px;
			}

			/deep/.el-dialog__title {
				font-size: 16px;
				font-family:'Roboto-Regular';
				font-weight: 500;
				color: #000000;
			}

			/deep/.el-form-item__label {
				font-size: 14px;
				font-family:'Roboto-Regular';
				font-weight: 400;
				color: #000000;
			}

			/deep/.el-input__inner {
				width: 258px;
				height: 32px;
				border-radius: 2px;
				border: 1px solid #595959;
			}

			/deep/.el-dialog__body {
				padding: 24px 24px;
			}

			/deep/.el-dialog__body {
				padding: 24px 24px;
			}
		}
		.top_tabs {
			position: fixed;
			display: flex;
			top: 98px;
			.tabs_block {
				cursor: pointer;
				font-size: 14px;
				font-family:'Roboto-Regular';
				color: rgba(255, 255, 255, 0.65);
				line-height: 22px;
				margin-right: 8px;
			}

			.tabs_block:last-child {
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
					.condition_top {
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
								width: 420px;
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
									font-family:'Roboto-Regular';
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
								width: 340px;
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

					}

					.condition_bottom {
						display: flex;
						align-items: center;
						justify-content: space-between;

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
								width: 300px;
								height: 37px;
								border-radius: 2px;
								border: 1px solid #FFFFFF;
								display: flex;
								align-items: center;
								position: relative;
								font-family:'Roboto-Regular';
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

						.screen_date {
							display: flex;
							align-items: center;
							margin-right: 39px;
							margin-top: 20px;

							.search_span {
								font-size: 14px;
								font-family:'Roboto-Regular';
								font-weight: 400;
								color: #FFFFFF;
							}

							/deep/.el-date-editor .el-range-separator {
								color: #fff;
								font-family:'Roboto-Regular';
							}

							/deep/ .el-input__inner {
								border: 0px;
								background-color: #33384B;
								border: 1px solid #ffffff;
								width: 355px;
							}

							/deep/ .el-range-input {
								background-color: #33384B;
							}

							/deep/ .el-date-editor .el-range-input {
								color: #fff;
								font-family:'Roboto-Regular';
							}

							.el-radio {
								margin-right: 0;
								margin-left: 0;
							}

							/deep/ .el-radio__input {
								display: none;
							}
						}

						.btn_area {
							display: flex;
							align-content: center;

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
								width: 13.6%;
								color: #FFFFFF;
								font-size: 18px;
								display: flex;
								align-items: center;
								justify-content: center;
							}

							.table_head_div2 {
								width: 8%;
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
							.table_head_div4 {
								width: 13.6%;
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

								.row_td_block {
									width: 13.6%;
									height: 53px;
									display: flex;
									align-items: center;
									justify-content: center;

									.see_text {
										color: #238AE8;
										cursor: pointer;
										margin-right: 24px;
									}

									.see_detail {
										color: #238AE8;
										cursor: pointer;
										margin-right: 24px;
									}

									.see_del {
										color: #238AE8;
										cursor: pointer;
									}
								}

								.row_td_block2 {
									width: 8%;
									height: 53px;
									display: flex;
									align-items: center;
									justify-content: center;

									.see_text {
										color: #238AE8;
										cursor: pointer;
										margin-right: 24px;
									}

									.see_detail {
										color: #238AE8;
										cursor: pointer;
										margin-right: 24px;
									}

									.see_del {
										color: #238AE8;
										cursor: pointer;
									}
								}

								.row_td_block3 {
									width: 8%;
									height: 53px;
									display: flex;
									align-items: center;
									justify-content: center;
								}
								.row_td_block4 {
									width: 13.6%;
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
						margin: 32px 0 0px 0px;
						display: flex;
						justify-content: flex-end;
					}
				}

				//play_form
			}

			//play_content
		}
	}
</style>
