<template>
	<div class="index">
		<SettingView :index="2"></SettingView>
		<div class="container">
			<!-- 创建部门 -->
			<div class="add_depart_container">
				<el-dialog title="新建账户" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
					<el-form :model="form" label-width="90px" label-position="right">
						<el-form-item label="*用户名：">
							<el-input v-model="form.name" placeholder=""></el-input>
						</el-form-item>
						<el-form-item label="*上级部门：" > 
							<el-select v-model="form.next" :popper-append-to-body="false">
								<el-option label="市场部" value="1"></el-option>
								<el-option label="营销部" value="2"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="*排序：">
							<el-select v-model="form.user" :popper-append-to-body="false">
							</el-select>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button type="primary" @click="add_deaprts">确认</el-button>
					</div>
				</el-dialog>
			</div>
			<!-- end -->
			<div class="top_tabs">
				<div class="tabs_block">系统设置 /</div>
				<div class="tabs_block">部门管理 </div>
			</div>
			<div class="play_container">
				<div class="play_head">
					<div class="screen_title">
						<div class="screen_text">部门管理</div>
					</div>
					<!-- 筛选条件 -->
					<div class="screen_condition">
						<div class="scr_right">
							<div class="screen_btn" @click="add_deaprts">+新增</div>
						</div>
					</div>
				</div>
				<div class="play_content">
					<div class="play_form">
						<div class="play_table">
							<el-table :data="tableData1" style="width: 100%" row-key="id" lazy :load="load" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
								<el-table-column prop="branch" label="部门名称" width="320">
								</el-table-column>
								<el-table-column prop="superior" label="上级部门" width="320">
								</el-table-column>
								<el-table-column prop="sort" label="排序">
								</el-table-column>
								<el-table-column label="操作">
									<template slot-scope="scope">
										<el-button type="text" size="small" style="margin-right: 32px;">修改</el-button>
										<el-button type="text" size="small">删除</el-button>
									</template>
								</el-table-column>
							</el-table>
						</div>
						<!-- 分页 -->
						<div class="play_pagination">
							<el-pagination background :current-page="currentPage" layout="prev, pager, next,sizes,jumper" :total="100">
							</el-pagination>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import SettingView from '@/components/setting/left.vue';
	export default {
		name: "department",
		components: {
			SettingView
		},
		data() {
			return {
				currentPage: 2,
				play_list: [{
						play_id: 1,
						play_img: require("../../assets/images/toum3.png"),
						user_id: "213121241112",
						user_name: "daner",
						full_name: "李涵",
						phone: "13358181818",
						gender: "man",
						status: "待审核",
						num: "3456",
					},
					{
						play_id: 2,
						play_img: require("../../assets/images/toum3.png"),
						user_id: "213121241112",
						user_name: "daner",
						full_name: "李涵",
						phone: "13358181818",
						gender: "man",
						status: "待审核",
						num: "3456",
					},
					{
						play_id: 3,
						play_img: require("../../assets/images/toum3.png"),
						user_id: "213121241112",
						user_name: "daner",
						full_name: "李涵",
						phone: "13358181818",
						gender: "man",
						status: "待审核",
						num: "3456",
					},
					{
						play_id: 4,
						user_id: "213121241112",
						user_name: "daner",
						full_name: "李涵",
						phone: "13358181818",
						gender: "man",
						status: "待审核",
						num: "3456",
					},
					{
						play_id: 5,
						user_id: "213121241112",
						user_name: "daner",
						full_name: "李涵",
						phone: "13358181818",
						gender: "man",
						status: "待审核",
						num: "3456",
					},
					{
						play_id: 6,
						play_img: require("../../assets/images/toum3.png"),
						user_id: "213121241112",
						user_name: "daner",
						full_name: "李涵",
						phone: "13358181818",
						gender: "man",
						status: "待审核",
						num: "3456",
					},
					{
						play_id: 7,
						user_id: "213121241112",
						user_name: "daner",
						full_name: "李涵",
						phone: "13358181818",
						gender: "man",
						status: "待审核",
						num: "3456",
					},
					{
						play_id: 8,
						user_id: "213121241112",
						user_name: "daner",
						full_name: "李涵",
						phone: "13358181818",
						gender: "man",
						status: "待审核",
						num: "3456",
					},
					{
						play_id: 9,
						play_img: require("../../assets/images/toum3.png"),
						user_id: "213121241112",
						user_name: "daner",
						full_name: "李涵",
						phone: "13358181818",
						gender: "man",
						status: "待审核",
						num: "3456",
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
				value2: '',
				value1: '',
				dialogFormVisible: false,
				form: {
					status: '1'
				},
				tableData1: [{
					id: 1,
					branch: '总部',
					superior: '/',
					sort: '0'
				}, {
					id: 2,
					branch: '一级部门',
					superior: '一级部门',
					sort: '1'
				}, {
					id: 3,
					branch: '二级部门',
					superior: '一级部门/二级部门',
					sort: '1',
					hasChildren: true
				}, {
					id: 4,
					branch: '总部',
					superior: '/',
					sort: '0'
				}]

			}
		},
		methods: {
			add_deaprts() {
				this.dialogFormVisible = !this.dialogFormVisible
			},
			jump_play(index) {
				this.$router.push({
					path: '/user/integral_details'
				})
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
			load(tree, treeNode, resolve) {
				setTimeout(() => {
					resolve([{
						id: 31,
						branch: '新增',
						superior: '/',
						sort: '3'
					}])
				}, 1000)
			}
		}
	}
</script>

<style lang="less" scoped>
	/deep/ .el-select .el-input .el-input__inner {
		border: 0px;
		background-color: #33384B;
		border: 1px solid #ffffff;
		color: #FFFFFF;
	}
	
	/deep/ .el-select .el-input .el-input__inner:focus {
		color: #FFFFFF;
	}
	
	/deep/ .el-select-dropdown {
		background-color: #33384B;
		border: 1px solid rgba(255,255,255,0.2);
		color: #FFFFFF;
	}
	
	//修改单个的选项的样式
	/deep/ .el-select-dropdown__item {
		background-color: transparent;
		color: #FFFFFF;
		text-align: center;
	}
	/deep/ .el-select-dropdown__item.hover{
		background-color: #545873;
	}
	/deep/ .el-select-dropdown__item.selected{
		background-color: #545873;
	}
</style>
<style lang="less" scoped>
	.container {
		background: #33384B;
		margin: 0 56px 0 224px;
		padding-bottom: 20px;

		.add_depart_container {
			/deep/.el-dialog {
				width: 460px;
				background-color: #33384B;
				border-radius: 16px;
			}
			/deep/.el-dialog__title {
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
			/deep/.el-form-item{
				display: flex;
			}
			/deep/.el-form-item__label {
				width: 100px !important;
				font-size: 14px;
				font-family:'Roboto-Regular';
				font-weight: 400;
				color: #FFFFFF;
				// background-color: #ff0;
			}
			/deep/.el-form-item__content{
				margin-left: 0px !important;
			}
			/deep/.el-input__inner {
				width: 258px;
				height: 32px;
				border-radius: 2px;
				// border: 1px solid #595959;
				border: 1px solid #FFFFFF;
				color: #FFFFFF;
				background-color: #33384B;
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
						font-weight: 500;
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
							width: 123px;
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

			//.play_head
			.play_content {
				margin: 24px 24px 0px 24px;

				.play_form {
					.play_table {
						/deep/.el-table {
							color: #fff;
							background-color: #33384B;
						}

						/deep/.el-table thead {
							color: #fff;
							font-family:'Quicksand-Bold';
							line-height: 40px;
							background: #2A2E3F;
							border-radius: 4px 4px 0px 0px;
						}

						/deep/.el-table--border,
						.el-table--group {
							border: 0px;
						}
						/deep/.el-table .cell{
							font-family:'Roboto-Regular';
						}
						/deep/.el-table td,
						.el-table th.is-leaf {
							background-color: #33384b
						}

						/deep/.el-table th {
							background-color: #2A2E3F;
						}

						/deep/.el-table--enable-row-hover .el-table__body tr:hover>td {
							background-color: #33384B;
						}

						/deep/.el-table tr {
							background-color: #33384B;
						}
					}

					.play_pagination {
						margin: 32px 0 0px 0px;
						display: flex;
						justify-content: flex-end;
					}
				}
			}
		}
	}
</style>
