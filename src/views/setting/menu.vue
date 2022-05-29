<template>
	<div class="index">
		<SettingView :index="4"></SettingView>
		<div class="container">
			<!-- 创建菜单 -->
			<div class="add_depart_container">
				<el-dialog title="新增菜单" :visible.sync="dialogFormVisible" :modal-append-to-body="false" @close='closeDialog'>
					<el-form :model="form" label-width="90px" label-position="right">
						<el-form-item label="菜单类型：">
							<el-radio v-model="form.type" label="1">目录</el-radio>
						    <el-radio v-model="form.type" label="2">菜单</el-radio>
						    <el-radio v-model="form.type" label="3">按钮</el-radio>
						</el-form-item>
						<el-form-item label="菜单名称：">
							<el-input v-model="dataForm.name" placeholder=""></el-input>
						</el-form-item>
						<el-form-item label="菜单路由：">
							<el-input v-model="form.router" placeholder=""></el-input>
						</el-form-item>
						<el-form-item label="菜单排序：">
							<el-input v-model="form.sort" placeholder=""></el-input>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button type="primary" @click="add_menu">确认</el-button>
					</div>
				</el-dialog>
			</div>
			<!-- end -->
			<div class="top_tabs">
				<div class="tabs_block">系统设置 /</div>
				<div class="tabs_block">菜单配置 </div>
			</div>
			<div class="play_container">
				<div class="play_head">
					<div class="screen_title">
						<div class="screen_text">菜单配置</div>
					</div>
					<!-- 筛选条件 -->
					<div class="screen_condition">
						<div class="scr_right">
							<div class="screen_btn" @click="open_menu">+新增</div>
						</div>
					</div>
				</div>
				<div class="play_content">
					<div class="play_form">
						<div class="play_table">
							<el-table :data="tableData1" style="width: 100%" row-key="id" lazy :load="load" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
								<el-table-column prop="branch" label="菜单名称" width="180"></el-table-column>
								<el-table-column prop="superior" label="上级部门" width="180"></el-table-column>
								<el-table-column prop="sort" label="排序"></el-table-column>
								<el-table-column prop="address" label="组件地址"></el-table-column>
								<el-table-column prop="creat_user" label="创建人"></el-table-column>
								<el-table-column label="操作">
									<template slot-scope="scope">
										<el-button type="text" size="small" style="margin-right: 32px;" @click="open_menu">修改</el-button>
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
	import {
		addMenu,
		menuDelete
	} from '@/api/setting';
	import SettingView from '@/components/setting/left.vue';
	export default {
		name: "department",
		components: {
			SettingView
		},
		data() {
			return {
				currentPage: 2,
				dialogFormVisible: false,
				form: {
					id:'',
					name:'',
					router:'',
					sort: '',
					type:'1'
				},
				tableData1: [{
					id: 1,
					branch: '首页',
					superior: '/',
					sort: '目录',
					address: '/',
					creat_user: '系统管理员',
					
				}, {
					id: 2,
					branch: '系统管理',
					superior: '/',
					sort: '目录',
					address: '/',
					creat_user: '系统管理员',
				}, {
					id: 3,
					branch: '系统管理',
					superior: '/',
					sort: '菜单',
					address: 'system/menu:add',
					creat_user: '系统管理员',
					hasChildren: true
				},],
				dataForm:{
					name:"",
					pid:"",
					router:"",
					sort:"",
					type:1
				}

			}
		},
		methods: {
			open_menu(item) {
				this.dialogFormVisible = !this.dialogFormVisible
			},
			// 添加菜单
			add_menu() {
				let that = this;
				let  { name, router,sort,type} = that.form;
				if(name == '' || router == '' || sort == '' || type == ''){
					that.$message({
						message: '请填写完整信息！！！',
						type: 'warning'
					})
					return false
				}else{
					addMenu(that.form).then(res => {
						that.$message({
							message: res.message,
							type: 'success'
						})
						that.dialogFormVisible = false;
						// that.getList()
					})
				}
			},
			//关闭弹框的事件
			closeDialog() {
				this.form = {
					id:'',
					name:'',
					router:'',
					sort: '',
					type:'1'
				}; //清空数据
			},
			load(tree, treeNode, resolve) {
				setTimeout(() => {
					resolve([{
						id: 31,
						branch: '新增',
						superior: '/',
						sort: '菜单',
						address: '/',
						creat_user: '系统管理员',
						hasChildren: true
					}])
				}, 1000)
			}
		}
	}
</script>

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
				// align-items: center;
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
							line-height: 40px;
							background: #2A2E3F;
							border-radius: 4px 4px 0px 0px;
						}

						/deep/.el-table--border,
						.el-table--group {
							border: 0px;
						}

						/deep/.el-table td,
						.el-table th.is-leaf {
							background-color: #33384b
						}
						/deep/.el-table .cell{
							font-family:'Roboto-Regular';
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
