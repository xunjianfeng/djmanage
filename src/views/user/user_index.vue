<template>
	<div class="index">
		<PlayView :index="1"></PlayView>
		<div class="container">
			<!-- 相对应的表格筛选条件 -->
			<div class="table_screen_container">
				<div class="screen_block">
					<div class="choice_left">
						<div class="status">
							<div class="status_text">Type</div>
							<div class="options_select">
								<el-select v-model="listQuery.userType" @change="handleFilter" placeholder="请选择"
									:popper-append-to-body="false">
									<el-option label="Basic" value="BASIC"></el-option>
									<el-option label="Pro Max" value="PRO MAX"></el-option>
								</el-select>
							</div>
						</div>
						<div class="sort_by">
							<div class="sort_by_text">Sort by</div>
							<div class="options_select">
								<el-select v-model="listQuery.order.register_time" @change="handleFilter"
									placeholder="请选择" :popper-append-to-body="false">
									<el-option label="Newest to oldest" value="desc"></el-option>
									<el-option label="Oldest to newest" value="asc"></el-option>
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
						<div class="export_block" @click="userExport">
							<img src="../../assets/images/export.png" alt="">
							Export to PDF / Excel
						</div>
					</div>
				</div>
			</div>
			<!-- 相对于的表格 -->
			<div class="table_table_container">
				<div class="table_table_block1">
					
					<div class="content_table">
						<div class="table_block1_head">
							<div class="block1_head1"></div>
							<div class="block1_head2">User Name</div>
							<div class="block1_head4">gender</div>
							<div class="block1_head2">Email Address</div>
							<div class="block1_head2">Phone Number</div>
							<div class="block1_head4">Way to Register</div>
							<!-- <div class="block1_head4">Certification</div> -->
							<div class="block1_head4">Security</div>
							<div class="block1_head4">Referral</div>
							<div class="block1_head4">DOB</div>
							<div class="block1_head4">State</div>
							<div class="block1_head4">Country</div>
							<div class="block1_head2">Game Profile</div>
							<div class="block1_head4">Member Level</div>
							<div class="block1_head4">Membership expired date</div>
							<!-- <div class="block1_head4">Open Status</div> -->
							<div class="block1_head3"></div>
						</div>
						<div class="table_block1_btom">
							<div class="blcok1_btom_list" v-for="(item,index) in list " :key="index">
								<div class="block1_btom1">{{item.userId}}</div>
								<div class="block1_btom2">
									<div class="block1_btom2_user">
										<el-image :src="HOST + item.avatar" class="avatar_img">
											<div slot="error" class="image-slot">
												<img src="../../assets/images/default.png" class="avatar_img" />
											</div>
										</el-image>
										<!-- <img src="../../assets/images/default.png" v-if="item.avatar == '' || item.avatar == null"/> -->
										<!-- <img :src="HOST + item.avatar" alt="" v-else> -->
										<el-tooltip class="item" effect="dark" :content="item.fullName" placement="bottom">
											<div class="block1_btom2_user_text user_name">{{item.fullName}}</div>
										</el-tooltip>
									</div>
								</div>
								<div class="block1_btom4">{{item.gender}}</div>
								<div class="block1_btom2">{{item.email}}</div>
								<div class="block1_btom2 "><span style="margin-right: 5px;" v-if="item.phoneCode!=null&&item.phoneCode!=''">+{{item.phoneCode}}</span>{{item.phoneNumber}}</div>
								<div class="block1_btom4 regtype">{{item.registerType}}</div>
								<!-- <div class="block1_btom4">{{item.type}}</div> -->
								<div class="block1_btom4 view" @click="jump_view(item)">View</div>
								<div class="block1_btom4 view" @click="jump_referral(item)">View</div>
								<div class="block1_btom4">{{(initDate(item.birthday)).substring(0, 10)}}</div>
								<div class="block1_btom4">{{item.state?item.state:'-'}}</div>
								<div class="block1_btom4">{{item.country?item.state:'-'}}</div>
								<div class="block1_btom2">
									game profile
								</div>
								<div class="block1_btom4">{{item.vipLevel}}</div>
								<div class="block1_btom4">{{item.vipExpireTime!=''&&item.vipExpireTime!=null&&item.vipExpireTime!=undefined? initDate(item.vipExpireTime):'-'}}</div>
								<!-- <div class="block1_btom4">Na</div> -->
								<div class="block1_btom3">
									<div class="block1_btom3_dian" @click="jump_user(item.userId)">
										<img src="../../assets/images/dian.png" alt="">
									</div>
								</div>
							</div>
						
						</div>
						
					</div>
					<!-- 分页 -->
					<div class="rank_pagination">
						<pagination v-show="total_count>0" :total="total_count" v-bind:page.sync="listQuery.page"
							:limit.sync="listQuery.size" @pagination="handlePageChange" @page_change="pageChange" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import PlayView from '@/components/play/left.vue';
	import Listing from '@/mixin/Listing';
	import Pagination from '@/components/Pagination'; // secondary package based on el-pagination
	import { exportMethod } from "../../utils/exportMethod.js";//导出
	import {
		userList
	} from '@/api/user';
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
		name: "user_index",
		components: {
			PlayView,
			Pagination
		},
		data() {
			return {
				user_table: 1,
				comp_index: 1,
				currentPage: 2,
				list: [],
				value1: '',
				total_count: 1,
				listQuery: {
					userId: '',
					phoneNumber: '',
					examine: '',
					fullName: '',
					registerTimeStart: '',
					registerTimeEnd: '',
					order: {
						register_time: 'desc'
					},
					userType: '', //等级筛选Type
					page: 1,
					size: 10
				},
			}
		},
		mounted() {
			setTimeout(() => {
				this.listQuery.page = this.PageNumber.page_number;
				this.getList()
			}, 180) //当组件跳转时获取全局变量页数进行跳转
		},
		methods: {
			//用户导出
			userExport(){
				let myObj = {
				  method: "POST",
				  //正式服
				  url: "https://api.bountee.com.my/api/user/info/export?userId="+this.listQuery.userId+"&phoneNumber="+this.listQuery.phoneNumber+"&examine="+this.listQuery.examine+"&registerTimeStart="+this.listQuery.registerTimeStart+"&registerTimeEnd="+this.listQuery.registerTimeEnd+"&userType="+this.listQuery.userType+"&order.register_time="+this.listQuery.order.register_time,
				  //测试版				  
				  // url: "http://13.212.212.253/game/api/user/info/export?userId="+this.listQuery.userId+"&phoneNumber="+this.listQuery.phoneNumber+"&examine="+this.listQuery.examine+"&registerTimeStart="+this.listQuery.registerTimeStart+"&registerTimeEnd="+this.listQuery.registerTimeEnd+"&userType="+this.listQuery.userType+"&order.register_time="+this.listQuery.order.register_time,
				  fileName: '用户导出', //下载好的文件名称，我这里是用的当前时间
				  params:``, //接口参数
				};
				exportMethod(myObj);
			},
			pageChange(value) {
				this.PageNumber.page_number = value.page
			},
			switch_selsect(val) {
				console.log(val)
			},
			// 表格切换
			switch_table(index) {
				this.user_table = index
			},
			switch_comp(index) {
				this.comp_index = index
			},
			// 用户管理列表
			getList() {
				let that = this;
				let params = that.listQuery
				userList(params).then(res => {
					const {
						list,
						total
					} = res.data
					this.list = list;
					this.total_count = total;
				})
			},
			handleFilter() {
				this.listQuery.page = 1;
				this.getList()
			},
			// 时间筛选
			determine: function(e) {
				let that = this;
				that.listQuery.registerTimeStart = that.value1[0]
				that.listQuery.registerTimeEnd = that.value1[1]
				that.userList();
			},
			// 重置
			Reset() {
				this.listQuery = {}
				this.value1 = ''
				this.userList();
			},
			jump_user(userId) {
				this.$router.push({
					path: '/user/user_details',
					query: {
						userId: userId
					}
				})
			},
			jump_view(item) {
				let {
					userId,
					fullName
				} = item
				this.$router.push({
					path: '/user/security_view',
					query: {
						userId: userId,
						fullName: fullName
					}
				})
			},

			jump_referral(item) {
				let {
					userId,
					fullName
				} = item
				this.$router.push({
					path: '/user/referralList',
					query: {
						userId: userId,
						fullName: fullName
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.container {
		background: #33384B;
		margin: 0 56px 0 224px;
		padding: 0 20px 40px 20px;

		// 相对应的表格筛选条件
		.table_screen_container {
			margin-bottom: 20px;
			padding-top: 20px;

			.screen_block {
				margin: 0 20px;
				display: flex;
				justify-content: space-between;

				.choice_left {
					display: flex;

					.status {
						margin-right: 26px;

						.status_text {
							font-size: 18px;
							text-align: left;
							color: #fff;
							font-family: 'Roboto-Bold';
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

						img {
							width: 50px;
							height: 10px;
						}
					}

					.sort_by {
						margin-right: 26px;

						.sort_by_text {
							font-size: 18px;
							text-align: left;
							letter-spacing: 0px;
							color: #fff;
							font-family: 'Roboto-Bold';

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
						font-family: 'Roboto-Regular';
						font-size: 18px;
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

		// 相对应的表格
		.table_table_container {

			// All User 表格
			.table_table_block1 {
				border-radius: 26px;
				padding-bottom: 20px;

				
				.content_table{
					// width: 100%;
					width: 1400px;
					margin-top: 16px;
					overflow-x: scroll;
					.table_header{
						width: 140%;
						// overflow-x: scroll;
						// overflow: hidden;
						background-color: #2A2E3F;
						display: flex;
						align-items: center;
						color: #727272;
						font-size: 17px;
						height: 60px;
						border-bottom: 1px solid #2D2D2D;
						text-align: left;
						font-family:'Quicksand-Bold';
						div{
							height: 60px;
							line-height: 60px;
							// width: 50%;
						}
						.header_1, .header_2{
							width: 100px;
							// width: 6%;
							// width: 15%;
						}
						.header_3, .header_4, .header_5, .header_6, .header_7, .header_8{
							width: 290px;
							// width: 12%;
							// width: 15%;
						}
						.header_5{
							text-align: center;
						}
						.header_9{
							width: 250px;
							// width: 8%;
							// width: 15%;
						}
						.header_10{
							width: 300px;
							// width: 13%;
							// width: 15%;
						}
					}
					.table_body{
						// margin-left: 20px;
						width: 140%;
						.body_row{
							// width: 1000px;
							// overflow-x: scroll;
							display: flex;
							align-items: center;
							color: #ffffff;
							font-size: 18px;
							font-family:'Roboto-Regular';
							padding: 25px 0;
							border-bottom: 1px solid #595959;
							div{
								display: flex;
								align-items: center;
							}
							.col_1{
								display: flex;
								justify-content: center;
							}
							.col_1, .col_2{
								width: 100px;
								// width: 6%;
								// width: 15%;
							}
							.col_2{
								display: flex;
								align-items: center;
								overflow: hidden;
								text-overflow: ellipsis;
								// white-space: nowrap;
								background-color: ;
								.avatar_img {
									width: 36px;
									height: 36px;
									border-radius: 12px;
									margin-right: 20px;
									object-fit: cover;
								}
								
								.block1_btom2_user_text {
									text-decoration: underline;
									overflow: hidden;
									text-overflow: ellipsis;
									white-space: nowrap;
								}
								
								.user_name {
									width: 130px;
									overflow: hidden;
									text-overflow: ellipsis;
									white-space: nowrap;
								}
							}
							.col_3,.col_4, .col_5, .col_6, .col_7, .col_8{
								// width: 12%;
								width: 290px;
								// width: 15%;\
								// width: 400px;
							}
							.col_3{
								overflow:hidden;
								text-overflow:ellipsis;
								white-space:nowrap
							}
							.col_6{
								.text{
									margin-bottom: 5px;
								}
							}
							.col_2{
								img{
									width: 40px;
									height: 40px;
								}
							}
							.col_9{
								// width: 8%;
								width: 250px;
								// width: 15%;
								display: flex;
								align-items: center;
								color: #23B709;
								position: relative;
								img{
									width: 12px;
									height: 12px;
									margin-left: 5px;
								}
								.pointer{
									cursor: pointer;
								}
								.reject_reason{
									position: absolute;
									// top: 0;
									top:40px;
									right: 60px;
									z-index: 999;
									background-color: #2A2E3F;
									padding: 20px;
									border-radius: 10px;
									max-width: 300px;
									.reject_text{
										color: #ffffff;
										font-size: 16px;
									}
								}
							}
							
							.col_10{
								width: 300px;
								// width:13%;
								// width: 15%;
								
								.text{
									margin-bottom: 5px;
								}
							}
						}
					}
					
					.table_block1_head {
						width: 140%;
						height: 54px;
						color: #FFFFFF;
						font-size: 17px;
						display: flex;
						align-items: center;
						background-color: #2A2E3F;
						font-family: 'Quicksand-Bold';
						border-bottom: 2px solid #2D2D2D;
					
						.block1_head1 {
							width: 6%;
							height: 54px;
							display: flex;
							align-items: center;
						}
					
						.block1_head2 {
							// width: 22%;
							width: 25%;
							height: 54px;
							display: flex;
							align-items: center;
						}
					
						.block1_head3 {
							width: 6%;
							height: 54px;
							display: flex;
							align-items: center;
						}
					
						.block1_head4 {
							// width: 11%;
							width: 15%;
							height: 54px;
							display: flex;
							align-items: center;
						}
					}
					
					.table_block1_btom {
						font-family: 'Roboto-Regular';
						width: 140%;
						.blcok1_btom_list {
							color: #fff;
							font-size: 18px;
							display: flex;
							align-items: center;
							border-bottom: 1px solid #4A516A;
					
							.block1_btom1 {
								width: 6%;
								height: 77px;
								display: flex;
								align-items: center;
								justify-content: center;
							}
					
							.block1_btom2 {
								// width: 22%;
								width: 25%;
								height: 77px;
								display: flex;
								align-items: center;
					
								.block1_btom2_user {
									display: flex;
									align-items: center;
									overflow: hidden;
									text-overflow: ellipsis;
									white-space: nowrap;
					
									.avatar_img {
										width: 36px;
										height: 36px;
										border-radius: 12px;
										margin-right: 20px;
										object-fit: cover;
									}
					
									.block1_btom2_user_text {
										text-decoration: underline;
										overflow: hidden;
										text-overflow: ellipsis;
										white-space: nowrap;
									}
					
									.user_name {
										width: 130px;
										overflow: hidden;
										text-overflow: ellipsis;
										white-space: nowrap;
									}
								}
					
							}
							.block1_btom5{
								width: 18%;
							}
							.block1_btom3 {
								width: 6%;
								// width: 10%;
								height: 77px;
								display: flex;
								align-items: center;
								justify-content: center;
					
								.block1_btom3_dian {
									width: 33px;
									cursor: pointer;
					
									img {
										width: 33px;
									}
								}
							}
					
							.block1_btom4 {
								// width: 11%;
								width: 15%;
								height: 77px;
								display: flex;
								align-items: center;
					
								.block1_btom2_user {
									display: flex;
					
									img {
										width: 36px;
										height: 36px;
										border-radius: 12px;
										margin-right: 20px;
									}
					
									.block1_btom2_user_text {
										text-decoration: underline;
										overflow: hidden;
										text-overflow: ellipsis;
										white-space: nowrap;
									}
								}
					
							}
					
							.regtype {
								// width: 18%;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}
					
							.view {
								cursor: pointer;
							}
						}
					
						.blcok1_btom_list:last-child {
							border-bottom: 0;
						}
					}
					
					&::-webkit-scrollbar {
						/*滚动条整体样式*/
						width : 13px;  /*高宽分别对应横竖滚动条的尺寸*/
						height: 10px;
					}
					&::-webkit-scrollbar-thumb {
						/*滚动条里面小方块*/
						border-radius: 10px;
						box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
						background   : #2A2D41;
					}
					&::-webkit-scrollbar-track {
					/*滚动条里面轨道*/
						box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
						border-radius: 10px;
						background   : #595959;
					}
				}
				
				.rank_pagination {
					text-align: right;
					font-family: 'Roboto-Regular';
				}
			}

		}
	}
</style>
