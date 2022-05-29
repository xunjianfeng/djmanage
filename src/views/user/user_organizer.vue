<template>
	<div class="index">
		<PlayView :index="4"></PlayView>
		<div class="container">
			<!-- 表格筛选条件 -->
			<div class="table_screen_container">
				<div class="screen_block4">
					<div class="choice_left">
						<div class="status">
							<div class="status_text"></div>
							<div class="options_select">
								<el-select v-model="listQuery.order" placeholder="请选择" :popper-append-to-body="false">
									<el-option label="正序" value="asc"></el-option>
									<el-option label="倒序" value="desc"></el-option>
								</el-select>
							</div>
						</div>
						<div class="search_block">
							<div class="search">
								<input placeholder="Seacrh user name" v-model="listQuery.fullName" />
								<button class="btn" @click="handleFilter">
									<img src="../../assets/images/2search.png" />
								</button>
							</div>
						</div>
					</div>
					<div class="choice_right">
						<div class="export_block" @click="organExport">
							<img src="../../assets/images/export.png" alt="">
							Export to PDF / Excel
						</div>
					</div>
				</div>
			</div>
			<!-- 表格 -->
			<div class="table_table_container">
				<div class="table_table_block5">
					<div class="table_block5_head">
						<div class="block5_head1"></div>
						<div class="block5_head2">User Name</div>
						<div class="block5_head2">Company Email</div>
						<div class="block5_head4">Contact Number</div>
						<!-- <div class="block5_head4">Principal</div> -->
						<div class="block5_head4">Company Type</div>
						<div class="block5_head4">Tournament</div>
						<div class="block5_head3"></div>
					</div>
					<div class="table_block5_btom">
						<div class="block5_btom_list" v-for="(item,index) in organ_list " :key="index">
							<div class="block5_btom1">{{item.userId}}</div>
							<div class="block5_btom2">
								<div class="block5_btom2_user">
									<el-image :src="HOST + item.avatar" class="colum_avatar">
										<div slot="error" class="image-slot">
											<img src="../../assets/images/default.png" class="colum_avatar" />
										</div>
									</el-image>
									<!-- <img src="../../assets/images/default.png" v-if="item.avatar == null || item.avatar == ''"/> -->
									<!-- <img :src="HOST + item.avatar" v-else> -->
									<el-tooltip class="item" effect="dark" :content="item.fullName" placement="bottom">
										<div class="block5_btom2_user_text user_name">{{item.fullName}}</div>
									</el-tooltip>
								</div>
							</div>
							<div class="block5_btom2">{{item.email}}</div>
							<div class="block5_btom4">{{item.phoneNumber}}</div>
							<!-- <div class="block5_btom4">{{item.principal}}</div> -->
							<div class="block5_btom4">{{item.compamyType}}</div>
							<div class="block5_btom4">{{item.tournament}}</div>
							<div class="block5_btom3">
								<div class="status_area">
									<div class="status_text" v-if="item.block == false || item.block == null"
										@click="getStatus(1,item.userId)">Block</div>
									<div class="status_text" v-if="item.block == true"
										@click="getStatus(2,item.userId)">Unblock</div>
								</div>
							</div>
							<div class="block5_btom3">
								<div class="block5_btom3_dian" @click="jump_organ(item.userId)">
									<img src="../../assets/images/dian.png" alt="">
								</div>
							</div>
						</div>
					</div>
					<!-- 分页 -->
					<div class="rank_pagination">
						<pagination v-show="total_count>0" :total="total_count" :page.sync="listQuery.page"
							:limit.sync="listQuery.size" @pagination="handlePageChange" @page_change="pageChange" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import PlayView from '@/components/play/left.vue';
	import {
		manageList,blockOrganizer
	} from '@/api/user';
	import Listing from '@/mixin/Listing';
	import Pagination from '@/components/Pagination';
	import { exportMethod } from "../../utils/exportMethod.js";//导出
	export default {
		name: "user_organizer",
		mixins: [Listing],
		components: {
			PlayView,
			Pagination
		},
		data() {
			return {
				comp_index: 1,
				currentPage: 2,
				organ_list: [],
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
				value1: '',
				listQuery: {
					userId: '',
					phoneNumber: '',
					examine: '',
					fullName: '',
					page: 1,
					size: 10,
					order: '',
				},
				total_count: 1,
			}
		},
		mounted() {
			setTimeout(() => {
				this.listQuery.page = this.PageNumber.page_number;
				this.getList()
			}, 180) //当组件跳转时获取全局变量页数进行跳转
		},
		methods: {
			//主持人导出
			organExport(){
				let myObj = {
				  method: "POST",
				  //正式服
				  url: "https://api.bountee.com.my/api/manage/info/export?userId="+this.listQuery.userId+"&phoneNumber="+this.listQuery.phoneNumber+"&examine="+this.listQuery.examine+"&fullName="+this.listQuery.fullName,
				  // 测试服
				  // url: "http://13.212.212.253/game/api/manage/info/export?userId="+this.listQuery.userId+"&phoneNumber="+this.listQuery.phoneNumber+"&examine="+this.listQuery.examine+"&fullName="+this.listQuery.fullName,
				  fileName: '主持人导出', //下载好的文件名称，我这里是用的当前时间
				  params:``, //接口参数
				};
				exportMethod(myObj);
			},
			//禁用或者启用主持人
			getStatus(index, userId) {
				if (index == 1) {
					// console.log("启用")
					let params = {
						userId: userId,
						block: true
					}
					// console.log(params)
					blockOrganizer(params).then(res => {
						this.$message({
							type: 'success',
							message: res.message
						});
						this.getList()
					})
				} else if (index == 2) {
					// console.log("禁用")
					let params = {
						userId: userId,
						block: false
					}
					// console.log(params)
					blockOrganizer(params).then(res => {
						this.$message({
							type: 'success',
							message: res.message
						});
						this.getList()
					})
				}
			},
			pageChange(value) {
				this.PageNumber.page_number = value.page
			},
			// 主持人列表
			getList() {
				let that = this;
				let params = that.listQuery
				manageList(params).then(res => {
					const {
						list,
						total
					} = res.data
					this.organ_list = list;
					this.total_count = total;
				})
			},
			jump_organ(userId) {
				console.log(userId)
				this.$router.push({
					path: '/user/organ_details',
					query: {
						userId: userId
					}
				})
			},
			handleFilter() {
				this.listQuery.page = 1;
				this.getList()
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			}
		}
	}
</script>

<style lang="less" scoped>
	.container {
		background: #33384B;
		margin: 0 56px 0 224px;
		padding: 0 20px 100px 20px;

		// 表格筛选条件
		.table_screen_container {
			margin-bottom: 20px;
			padding-top: 20px;

			.screen_block4 {
				margin: 0 20px;
				display: flex;
				justify-content: space-between;

				.choice_left {
					display: flex;

					.status {
						margin-right: 300px;

						.status_text {
							font-size: 18px;
							text-align: left;
							color: #fff;
							font-family: 'Roboto-Regular';
							margin-bottom: 11px;
						}

						.options_select {
							/deep/ .el-select .el-input .el-input__inner {
								border: 0px;
								width: 230px;
								height: 59px;
								padding: 0 20px;
								font-size: 18px;
								color: #fff;
								font-family: 'Roboto-Regular';
								border-radius: 20px;
								background-color: #2a2e3f;
							}

							/deep/ .el-select-dropdown {
								background-color: #33384b;
								border: 1px solid rgba(255, 255, 255, 0.2);
							}

							/deep/ .el-icon-arrow-up:before {
								content: "";
							}

							/deep/ .el-icon-arrow-down:before {
								content: "";
							}

							//修改单个的选项的样式
							/deep/ .el-select-dropdown__item {
								background-color: transparent;
								color: #fff;
								text-align: center;
							}

							/deep/ .el-select-dropdown__item.hover {
								background-color: #545873;
							}

							/deep/ .el-select-dropdown__item.selected {
								background-color: #545873;
							}
						}
					}

					.search_block {
						display: flex;
						flex-direction: column;
						justify-content: flex-end;

						.search {
							background: #2a2e3f;
							border-radius: 23px;

							input {
								width: 215px;
								height: 53px;
								background: #2a2e3f;
								border-radius: 23px;
								font-size: 18px;
								border: none;
								padding-left: 35px;
								color: #fff;
								font-family: 'Roboto-Regular';
							}

							.btn {
								width: 60px;
								height: 60px;
								background: #D3AA53;
								border: none;
								border-radius: 22px;
								opacity: 1;
								cursor: pointer;

								img {
									width: 22px;
									height: 22px;
								}
							}
						}
					}
				}

				.choice_right {
					display: flex;
					flex-direction: column;
					justify-content: flex-end;

					.export_block {
						display: flex;
						align-items: center;
						height: 60px;
						color: #DBA83F;
						font-size: 18px;
						font-family: 'Roboto-Bold';
						cursor: pointer;

						img {
							width: 22px;
							height: auto;
							margin-right: 20px;
						}
					}
				}

			}
		}

		// 表格
		.table_table_container {

			// Organizer 表格
			.table_table_block5 {
				background: #33384b;
				border-radius: 26px;
				padding-bottom: 20px;

				.table_block5_head {
					height: 54px;
					color: #FFFFFF;
					font-size: 17px;
					display: flex;
					align-items: center;
					font-family: 'Quicksand-Bold';
					background-color: #2A2E3F;
					border-bottom: 2px solid #2D2D2D;

					.block5_head1 {
						width: 5%;
						height: 54px;
						display: flex;
						align-items: center;
					}

					.block5_head2 {
						width: 20%;
						height: 54px;
						display: flex;
						align-items: center;
					}

					.block5_head3 {
						width: 6%;
						height: 54px;
						display: flex;
						align-items: center;
					}

					.block5_head4 {
						width: 16%;
						height: 54px;
						display: flex;
						align-items: center;
					}
				}

				.table_block5_btom {
					font-family: 'Roboto-Regular';

					.block5_btom_list {
						color: #fff;
						font-size: 18px;
						display: flex;
						align-items: center;
						border-bottom: 1px solid #4A516A;

						.block5_btom1 {
							width: 5%;
							height: 77px;
							display: flex;
							align-items: center;
							justify-content: center;
						}

						.block5_btom2 {
							width: 20%;
							height: 77px;
							display: flex;
							align-items: center;

							.block5_btom2_user {
								display: flex;
								align-items: center;

								.colum_avatar {
									width: 36px;
									height: 36px;
									border-radius: 12px;
									margin-right: 20px;
									object-fit: cover;
								}

								.block5_btom2_user_text {
									text-decoration: underline;
								}

								.user_name {
									width: 130px;
									overflow: hidden;
									text-overflow: ellipsis;
									white-space: nowrap;
								}
							}

						}

						.block5_btom3 {
							width: 6%;
							height: 77px;
							display: flex;
							align-items: center;
							justify-content: center;

							.block5_btom3_dian {
								width: 33px;
								cursor: pointer;

								img {
									width: 33px;
								}
							}
							.status_area {
								display: flex;
								align-items: center;
							
								.status_text {
									color: #238AE8;
									font-size: 18px;
									font-family: 'Roboto-Bold';
									cursor: pointer;
								}
							
								.line {
									margin: 0 5px;
								}
							}

						}

						.block5_btom4 {
							width: 16%;
							height: 77px;
							display: flex;
							align-items: center;

							.block5_btom2_user {
								display: flex;

								img {
									width: 36px;
									height: 36px;
									border-radius: 12px;
									margin-right: 20px;
								}

								.block5_btom2_user_text {
									text-decoration: underline;
								}
							}

						}
					}

					.block5_btom_list:last-child {
						border-bottom: 0;
					}
				}

				//rank_table
				.rank_pagination {
					margin: 32px 0 0px 0px;
					display: flex;
					font-family: 'Roboto-Regular';
					justify-content: flex-end;
				}
			}
		}
	}
</style>
