<template>
	<div class="index">
		<SettingView :index="3"></SettingView>
		<div class="container">
			<!-- 新增角色 -->
			<div class="add_roles_container">
				<el-dialog title="新建角色" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
					<el-form :model="form" label-width="90px" label-position="right">
						<el-form-item label="名称：">
							<el-input v-model="form.name" placeholder=""></el-input>
						</el-form-item>
						<el-form-item label="备注：">
							<el-input v-model="form.description" placeholder=""></el-input>
						</el-form-item>
						<el-form-item label="菜单授权：">
							<el-select v-model="menus_value" multiple @change="selectChanged" :popper-append-to-body="false">
								<el-option v-for="item in menus_list" :key="item.id" :label="item.name" :value="item.id">
								</el-option>
							</el-select>
							<!-- <el-tree :data="data" show-checkbox node-key="id" :default-expanded-keys="[]" :default-checked-keys="[]" :props="defaultProps" @node-click="handleNodeClick"></el-tree> -->
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
				<div class="tabs_block">角色管理 </div>
			</div>
			<div class="play_container">
				<div class="play_head">
					<div class="screen_title">
						<div class="screen_text">角色管理 </div>
					</div>
					<!-- 筛选条件 -->
					<div class="screen_condition">
						<div class="scr_left">
							<div class="screen_block">
								<div class="search_span">用户名：</div>
								<div class="search_input">
									<input type="text" placeholder="请输入">
								</div>
							</div>
						</div>
						<div class="scr_right">
							<div class="screen_btn">查 询</div>
							<div class="screen_btn2">重置</div>
							<div class="screen_btn3" 　@click="open_deaprts">+新增</div>
						</div>
					</div>
				</div>
				<div class="play_content">
					<div class="play_form">
						<div class="play_table">
							<div class="table_header">
								<div class="table_head_div">角色名称</div>
								<div class="table_head_div">备注</div>
								<div class="table_head_div">创建时间</div>
								<div class="table_head_div2">操作</div>
							</div><!-- table_header -->
							<div class="table_body">
								<div class="body_row" v-for="(item,index) in play_list" :key="index">
									<div class="row_td_block">{{item.user_name}}</div>
									<div class="row_td_block">{{item.mark}}</div>
									<div class="row_td_block">{{item.creat_time}}</div>
									<div class="row_td_block2">
										<div class="edit">修改</div>
										<div class="see_detail">删除</div>
									</div>
								</div>
							</div>
						</div>
						<!-- 分页 -->
						<div class="play_pagination">
							<el-pagination background :current-page="currentPage" layout="prev, pager, next,sizes,jumper" :total="100">
							</el-pagination>
						</div>
					</div><!-- play_form -->
				</div><!-- play_content -->
			</div><!-- play_container -->
		</div>
	</div>
</template>

<script>
	import {
		addRole,
		roleList,
		getRole,
		menuList
	} from '@/api/setting';
	import SettingView from '@/components/setting/left.vue';
	export default {
		name: "role",
		components: {
			SettingView
		},
		data() {
			return {
				currentPage: 2,
				play_list: [{
						play_id: 1,
						play_img: require("../../assets/images/toum3.png"),
						user_name: "一级部门管理员",
						mark: "可进行删除，修改，编辑操作",
						creat_time: "2020-08-30 20:00:33",
					},
					{
						play_id: 2,
						play_img: require("../../assets/images/toum3.png"),
						user_name: "一级部门管理员",
						mark: "可进行删除，修改，编辑操作",
						creat_time: "2020-08-30 20:00:33",
					},
					{
						play_id: 3,
						play_img: require("../../assets/images/toum3.png"),
						user_name: "一级部门管理员",
						mark: "可进行删除，修改，编辑操作",
						creat_time: "2020-08-30 20:00:33",
					},
					{
						play_id: 4,
						user_name: "一级部门管理员",
						mark: "可进行删除，修改，编辑操作",
						creat_time: "2020-08-30 20:00:33",
					},
					{
						play_id: 5,
						user_name: "一级部门管理员",
						mark: "可进行删除，修改，编辑操作",
						creat_time: "2020-08-30 20:00:33",
					},
				],
				dialogFormVisible: false,
				form: {
					id: '',
					description: '',
					name: '',
					menus: '',
				},
				menus_list:[],
				menus_value:'',
				data: [{
						id: 1,
						label: '系统管理',
						children: [{
								id: 11,
								label: '账户管理',
							},
							{
								id: 12,
								label: '角色管理',

							},
							{
								id: 13,
								label: '部门管理',

							},
							{
								id: 14,
								label: '菜单配置',

							}
						]
					},
					{
						id: 2,
						label: '商城管理',
						children: [{
							id: 21,
							label: '二级 2-1'
						}, {
							id: 22,
							label: '二级 2-2'
						}]
					},
					{
						id: 3,
						label: '订单管理',
						children: [{
							id: 31,
							label: '31'
						}, {
							id: 32,
							label: '32'
						}]
					},
					{
						id: 4,
						label: '积分管理',
						children: [{
							id: 41,
							label: '41'
						}, {
							id: 42,
							label: '42'
						}]
					},
					{
						id: 5,
						label: '赛事管理',
						children: [{
							id: 51,
							label: '51'
						}, {
							id: 52,
							label: '52'
						}]
					},
					{
						id: 6,
						label: '用户管理',
						children: [{
							id: 61,
							label: '61'
						}, {
							id: 62,
							label: '62'
						}]
					},
				],
				defaultProps: {
					children: 'children',
					label: 'label'
				}

			}
		},
		mounted() {
			this.menuList()
		},
		methods: {
			// 菜单列表
			menuList() {
				menuList({}).then(res => {
					this.menus_list = res.data;
				})
			},
			selectChanged(value) {
				this.form.menus = this.menus_value.toString()
			},
			open_deaprts() {
				this.dialogFormVisible = !this.dialogFormVisible
			},
			// 添加角色
			add_deaprts() {
				let that = this;
				let  { name, description,menus} = that.form;
				if(name == '' || description == '' || menus == '' ){
					that.$message({
						message: '请填写完整信息！！！',
						type: 'warning'
					})
					return false
				}else{
					addRole(that.form).then(res => {
						that.$message({
							message: res.message,
							type: 'success'
						})
						that.dialogFormVisible = false;
					})
				}
			},
			//关闭弹框的事件
			closeDialog() {
				this.menus_value = ''
				this.form = {}; //清空数据
			},
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

		.add_roles_container {
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
				width: 110px !important;
				font-size: 14px;
				font-family:'Roboto-Regular';
				font-weight: 400;
				color: #FFFFFF;
			}
			/deep/.el-form-item__content{
				margin-left: 0px !important;
			}

			/deep/.el-input__inner {
				width: 258px;
				height: 32px;
				border-radius: 8px;
				// border: 1px solid #595959;
				border: 1px solid #FFFFFF;
				color: #FFFFFF;
				background-color: #33384B;
			}
			/deep/.el-dialog__body {
				padding: 24px 24px;
			}
			/deep/ .el-tag{
				background-color: #33384B;
				color: #FFFFFF;
				border: 1px solid rgba(255,255,255,0.3);
			}
		}

		.top_tabs {
			position: fixed;
			display: flex;
			top: 98px;

			.tabs_block {
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
									font-family:'Roboto-Regular';
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
							margin-right: 8px;
							font-family:'Roboto-Regular';
						}

						.screen_btn3 {
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
							font-weight: 500;
							color: #FFFFFF;
							background: #2A2E3F;

							.table_head_div {
								width: 25%;
								color: #FFFFFF;
								font-size: 18px;
								display: flex;
								align-items: center;
								justify-content: center;
							}

							.table_head_div2 {
								width: 25%;
								color: #FFFFFF;
								font-size: 18px;
								display: flex;
								align-items: center;
								justify-content: flex-start;
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
									width: 25%;
									height: 53px;
									display: flex;
									align-items: center;
									justify-content: center;
								}

								.row_td_block2 {
									width: 25%;
									height: 53px;
									display: flex;
									align-items: center;
									justify-content: flex-start;

									.edit {
										color: #238AE8;
										cursor: pointer;
										margin-right: 32px;
									}

									.see_detail {
										color: #238AE8;
										cursor: pointer;
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

			}
		}
	}
</style>
