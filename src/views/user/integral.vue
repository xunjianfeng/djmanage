<template>
	<div class="index">
		<integView :index="1"></integView>
		<div class="container">
			<!-- 赠送积分 -->
			<div class="add_integral_container">
				<el-dialog title="赠送积分" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
					<el-form :model="form" label-width="90px" label-position="right">
						<el-form-item label="赠送积分：">
							<el-input v-model.number="form.integral_num" placeholder=""></el-input>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="dialogFormVisible = false">取 消</el-button>
						<el-button type="primary" @click="confirm_status">确定</el-button>
					</div>
				</el-dialog>
				<div class="add_integral_container">
					<el-dialog title="是否确定" :visible.sync="confirmVisible" :modal-append-to-body="false">
						<span class="span_text">请谨慎操作，确认后将无法返现！</span>
						<div slot="footer" class="dialog-footer">
							<el-button @click="confirmVisible = false">取 消</el-button>
							<el-button type="primary" @click="submit_integral">确定</el-button>
						</div>
					</el-dialog>
				</div>
			</div>
			<!-- end -->
			<div class="top_tabs">
				<div class="tabs_block">积分管理 /</div>
				<div class="tabs_block">用户积分</div>
			</div>
			<div class="play_container">
				<div class="play_head">
					<div class="screen_title">
						<div class="screen_text">用户积分</div>
					</div>
					<!-- 筛选条件 -->
					<div class="screen_condition">
						<div class="scr_left">
							<div class="screen_block">
								<div class="search_span">用户姓名：</div>
								<div class="search_input">
									<input type="text" placeholder="请输入" v-model="listQuery.fullName">
								</div>
							</div>
							<div class="screen_block">
								<div class="search_span">手机号：</div>
								<div class="search_input">
									<input type="text" placeholder="请输入" v-model="listQuery.phoneNumber">
								</div>
							</div>
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
								<div class="table_head_div">序号</div>
								<div class="table_head_div">姓名</div>
								<div class="table_head_div">手机号</div>
								<div class="table_head_div">积分总额</div>
								<div class="table_head_div2">审核状态</div>
								<div class="table_head_div2">操作</div>
							</div><!-- table_header -->
							<div class="table_body">
								<div class="no_data" v-if="list == ''">暂无数据</div>
								<div class="body_row" v-for="(item,index) in list" :key="index" v-if="list != ''">
									<div class="row_td_block">{{item.userId}}</div>
									<div class="row_td_block">{{item.fullName}}</div>
									<div class="row_td_block">{{item.phoneNumber}}</div>
									<div class="row_td_block">{{item.point}}</div>
									<div class="row_td_block2">
										<div class="see_detail" @click="jump_play(item.userId)">积分明细</div>
									</div>
									<div class="row_td_block2">
										<div class="see_detail" @click="add_integral(item.userId)">赠送积分</div>
									</div>
								</div>
							</div>
						</div>
						<!-- 分页 -->
						<div class="play_pagination">
							<pagination v-show="total_count>0" :total="total_count" :page.sync="listQuery.page" :limit.sync="listQuery.size"
							 @pagination="handlePageChange"  @page_change="pageChange" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import integView from '@/components/integral/left.vue';
	import Listing from '@/mixin/Listing';
	import Pagination from '@/components/Pagination';
	import {
		userList,addIntegral
	} from '@/api/user';
	export default {
		name: "integral",
		mixins: [Listing],
		components: {
			integView,
			Pagination
		},
		data() {
			return {
				dialogFormVisible: false,
				confirmVisible: false,
				value2: '',
				value1: '',
				list: '',
				form: {
					integral_num: ''
				},
				comfirm_id: '',
				listQuery: {
					phoneNumber: '',
					fullName: '',
					page: 1,
					size: 10
				},
				total_count: 1,
			}
		},
		mounted() {
			this.getList()
			setTimeout(()=>{
				this.listQuery.page = this.PageNumber.page_number;
				this.getList()
			},180)	//当组件跳转时获取全局变量页数进行跳转
		},
		methods: {
			pageChange(value){
				this.PageNumber.page_number = value.page
			},
			jump_play(userId) {
				this.$router.push({
					path: '/user/integral_details',query:{userId}
				})
			},
			handleFilter(){
				this.listQuery.page = 1;
				this.getList()
			},
			reset(){
			   this.listQuery = {
				   phoneNumber: '',
				   fullName: '',
				   page: 1,
				   size: 10
			   }
			   this.getList()
			},
			// 积分列表
			getList() {
				let that = this;
				let params = that.listQuery
				userList(params).then(res => {
					const {
						list,
						total
					} = res.data
					that.list = list;
					that.total_count = total;
				})
			},
			//
			confirm_status() {
				for (let i = 0; i < this.list.length; i++) {
					if (this.list[i].userId == this.comfirm_id) {
						if (this.form.integral_num == '') {
							this.$message({
								type: 'warning',
								message: '请输入具体数额！'
							});
						} else if (!(/^[1-9]\d*$/.test(this.form.integral_num))) {
							this.$message({
								type: 'warning',
								message: '您输入的不是数字，请输入数字！'
							});
						} else {
							this.dialogFormVisible = false;
							this.confirmVisible = true;
						}
					} else {

					}
				}

			},
			//打开赠送积分窗口
			add_integral(userId) {
				this.dialogFormVisible = true
				this.comfirm_id = userId;
				for (let i = 0; i < this.list.length; i++) {
					if (this.list[i].userId == userId) {
						
					} else {}
				}
			},
			submit_integral() {
				let params = {
					toUser: this.comfirm_id,
					point: this.form.integral_num
				}
				addIntegral(params).then(res => {
					this.$message({
						type: 'success',
						message: res.message
					});
					// console.log(this.listQuery.page)
					this.getList();
					// this.reload()
				})
				this.confirmVisible = false;
				this.form.integral_num = ''
			},
			//筛选
			handleFilter() {
				this.listQuery.page = 1;
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

		.add_integral_container {
			/deep/.el-dialog {
				width: 460px;
				position: relative;
				top: 150px;
				background-color: #33384B;
				color: #FFFFFF;
				border-radius: 16px;
			}

			/deep/.el-dialog__title {
				font-size: 16px;
				font-family:'Roboto-Regular';
				font-weight: 500;
				color: #fff;
			}

			/deep/.el-dialog__headerbtn {
				/deep/.el-dialog__close {
					color: #FFFFFF;
				}
			}

			/deep/.el-form-item__label {
				font-size: 14px;
				font-family:'Roboto-Regular';
				font-weight: 400;
				color: #FFFFFF;
				width: 109px !important;
			}
			/deep/ .el-form-item__content{
				margin-left: 110px !important;
			}
			/deep/.el-input {}

			/deep/.el-input__inner {
				width: 258px;
				height: 32px;
				border-radius: 2px;
				border: none;
				border-bottom: 1px solid #FFFFFF;
				background-color: #33384B;
				color: #FFFFFF;
			}

			/deep/.el-dialog__body {
				padding: 24px 24px;

				.span_text {
					color: #FFFFFF;
				}
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
				font-weight: 400;
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
						font-family:'Roboto-Bold';
						color: #FFFFFF;
					}
				}

				.screen_condition {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.scr_left {
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

					.scr_right {
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

						.screen_btn3 {
							width: 80px;
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
							font-weight: 500;
							color: #FFFFFF;
							background: #2A2E3F;

							.table_head_div {
								width: 16.6%;
								color: #FFFFFF;
								font-size: 18px;
								display: flex;
								align-items: center;
								justify-content: center;
							}

							.table_head_div2 {
								width: 16.6%;
								color: #FFFFFF;
								font-size: 18px;
								display: flex;
								align-items: center;
								justify-content: center;
							}

						}

						//tabler_header
						.table_body {
							color: #fff;
							.no_data{
								line-height: 60px;
								color: #727272;
								font-size: 18px;
								text-align: center;
								font-family:'Roboto-Regular';
							}
							.body_row {
								display: flex;
								align-items: center;
								font-size: 14px;
								font-family:'Roboto-Regular';
								color: #FFFFFF;
								border-bottom: 1px solid #67717A;

								.row_td_block {
									width: 16.6%;
									height: 53px;
									display: flex;
									align-items: center;
									justify-content: center;
								}

								.row_td_block2 {
									width: 16.6%;
									height: 53px;
									display: flex;
									align-items: center;
									justify-content: center;

									.see_detail {
										color: #238AE8;
										cursor: pointer;
										font-family:'Roboto-Regular';
									}
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

		//play_container
	}
</style>
