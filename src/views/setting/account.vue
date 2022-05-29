<template>
	<div class="index">
		<SettingView :index="1"></SettingView>
		<div class="container">
			<!-- 创建账户 -->
			<div class="add_count_container">
				<el-dialog title="新建账户" :visible.sync="dialogFormVisible" :modal-append-to-body="false" @close='closeDialog'>
					<el-form :model="user_form" label-width="90px" label-position="right">
						<el-form-item label="*用户名：">
							<el-input v-model="user_form.loginName" placeholder=""></el-input>
						</el-form-item>
						<el-form-item label="*密码：">
							<el-input v-model="user_form.password" placeholder="" type="password"></el-input>
						</el-form-item>
						<el-form-item label="*确认密码：">
							<el-input v-model="confirm_password" placeholder="" type="password"></el-input>
						</el-form-item>
						<el-form-item label="*角色配置：">
							<el-select v-model="role_value" multiple @change="selectChanged" :popper-append-to-body="false">
								<el-option v-for="item in power_list" :key="item.id" :label="item.name" :value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="手机号：">
							<el-input v-model="user_form.phone" placeholder="" type="number"></el-input>
						</el-form-item>
						<el-form-item label="邮箱：">
							<el-input v-model="user_form.email" placeholder=""></el-input>
						</el-form-item>
						<el-form-item label="状态：">
							<el-radio v-model="user_form.disable" :label="true">开启</el-radio>
							<el-radio v-model="user_form.disable" :label="false">关闭</el-radio>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button type="primary" @click="add_account">确认</el-button>
					</div>
				</el-dialog>
			</div>
			<!-- end -->
			<div class="top_tabs">
				<div class="tabs_block">系统设置 /</div>
				<div class="tabs_block">账户管理</div>
			</div>
			<div class="play_container">
				<div class="play_head">
					<div class="screen_title">
						<div class="screen_text">账户管理</div>
					</div>
					<!-- 筛选条件 -->
					<div class="screen_condition">
						<div class="condition_left">
							<div class="screen_block">
								<div class="search_span">用户名：</div>
								<div class="search_input">
									<input type="text" placeholder="请输入" v-model="listQuery.userName">
								</div>
							</div>
							<!-- <div class="screen_left">
								<div class="search_span">部门：</div>
								<el-select v-model="listQuery.disable" placeholder="请选择" style="margin-right: 20px;" :popper-append-to-body="false">
									<el-option label="启用" value="true"></el-option>
									<el-option label="禁用" value="false"></el-option>
								</el-select>
							</div> -->
							<div class="screen_left">
								<div class="search_span">状态：</div>
								<el-select v-model="listQuery.disable" placeholder="请选择" style="margin-right: 20px;" :popper-append-to-body="false">
									<el-option label="启用" value="true"></el-option>
									<el-option label="禁用" value="false"></el-option>
								</el-select>
							</div>
							<div class="screen_date">
								<div class="search_span">创建时间：</div>
								<el-date-picker v-model="value1" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
								 value-format="yyyy-MM-dd HH:mm:ss"  format="yyyy-MM-dd HH:mm:ss"   @change="date_screen"></el-date-picker>
							</div>
						</div>
						<div class="condition_right">
							<div class="screen_btn" @click="getList">查 询</div>
							<div class="screen_btn2" @click="reset">重置</div>
							<div class="screen_btn" style="margin-right: 0;" @click="open_account('')">创建</div>
						</div>
					</div>
				</div>
				<div class="play_content">
					<div class="play_form">
						<div class="play_table">
							<div class="table_header">
								<div class="table_head_div3">序号</div>
								<div class="table_head_div3">用户昵称</div>
								<div class="table_head_div">手机号</div>
								<div class="table_head_div">邮箱</div>
								<div class="table_head_div3">状态</div>
								<div class="table_head_div">创建时间</div>
								<div class="table_head_div2">操作</div>
							</div><!-- table_header -->
							<div class="table_body">
								<div class="body_row" v-for="(item,index) in list" :key="index">
									<div class="row_td_block3">{{item.id}}</div>
									<div class="row_td_block3">{{item.loginName}}</div>
									<div class="row_td_block">{{item.phone}}</div>
									<div class="row_td_block">{{item.email}}</div>
									<div class="row_td_block3">{{item.disable == true ?'启用':'禁用'}}</div>
									<div class="row_td_block">{{initDete(item.registerTime)}}</div>
									<div class="row_td_block2">
										<div class="see_text" @click="forbidden(item.id,1)" v-if="item.disable == true">禁用</div>
										<div class="see_text" @click="forbidden(item.id,2)" v-else>启用</div>
										<div class="see_detail" @click="open_account(item)">编辑</div>
										<div class="see_del" @click="handleSopnsDel(item.id)">删除</div>
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
	import {
		userList,
		addUser,
		userDelete,
		roleList,
		userDisable
	} from '@/api/setting';
	import Listing from '@/mixin/Listing';
	import Pagination from '@/components/Pagination'; // secondary package based on el-pagination
	import SettingView from '@/components/setting/left.vue';
	export default {
		name: "account",
		mixins: [Listing],
		components: {
			SettingView,
			Pagination
		},
		data() {
			return {
				listQuery: {
					page: 1,
					size: 10,
					userName:'',
					startDate:'',
					endDate:'',
					disable:''
				},
				total_count: 0,
				list: [],
				value1: '',
				dialogFormVisible: false,
				user_form: {
					id: '',
					loginName: '',
					password: '',
					phone: '',
					email: '',
					roles: '',
					disable: 'true',
				},
				confirm_password: '', //确认密码
				power_list: [], //所有角色列表
				role_value: '',
			}
		},
		mounted() {
			this.roleList()
		},
		methods: {
			// 账户列表
			getList() {
				userList(this.listQuery).then(res => {
					const {
						list,
						total
					} = res.data
					this.list = list;
					this.total_count = total;
				})
			},
			// 角色列表
			roleList() {
				roleList({}).then(res => {
					this.power_list = res.data;
					console.log(this.power_list,"power_list")
				})
			},
			// 打开弹窗
			open_account(item) {
				if (item != '') {
					let {id,loginName,phone,email,roles,disable} = item;
					this.user_form = {
						id,
						loginName,
						password:'',
						phone,
						email,
						roles,
						disable
					}
					this.role_value =  roles.split(',');
				}
				this.dialogFormVisible = !this.dialogFormVisible
				if (this.dialogFormVisible == true) {
					this.roleList();
				}
			},
			//关闭弹框的事件
			closeDialog() {
				this.confirm_password = ''
				this.role_value = ''
				this.user_form = {}; //清空数据
			},
			selectChanged(value) {
				this.user_form.roles = this.role_value.toString()
			},
			date_screen(value){
				this.listQuery.startDate = Date.parse(value[0]);
				this.listQuery.endDate = Date.parse(value[0]);
				this.getList();
			},
			// 添加/修改账户
			add_account() {
				let that = this;
				let {
					loginName,
					password,
					phone,
					email,
					roles
				} = that.user_form;
				if (loginName == '' || password == '' || roles == '' || that.confirm_password == '') {
					that.$message({
						message: '请填写完整信息！！！',
						type: 'warning'
					})
					return false
				} else {
					if (that.confirm_password != password) {
						that.$message({
							message: '密码不一致！！！',
							type: 'warning'
						})
						return false
					}
					addUser(that.user_form).then(res => {
						that.$message({
							message: res.message,
							type: 'success'
						})
						that.dialogFormVisible = false;
						that.getList()
					})
				}
			},
			// 删除账户
			handleSopnsDel(id) {
				this.$confirm('是否删除该账户?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					userDelete({
						id
					}).then(res => {
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.getList()
					})
				}).catch(() => {});
			},
			// 禁用状态
			forbidden(id,index) {
				if(index == 1){
					this.$confirm('是否禁用该账户?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						let params = {
							id,
							disable:false,
						}
						userDisable(params).then(res => {
							this.$message({
								type: 'success',
								message: res.message
							});
							this.getList()
						})
					}).catch(() => {});
				}else{
					this.$confirm('是否启用该账户?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						let params = {
							id,
							disable:true,
						}
						userDisable(params).then(res => {
							this.$message({
								type: 'success',
								message: res.message
							});
							this.getList()
						})
					}).catch(() => {});
				}
				
			},
			// 重置
			reset() {
				this.listQuery = {
					page: 1,
					size: 10
				}
				this.getList()
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
		.add_count_container {
			/deep/.el-dialog {
				width: 520px;
				background-color: #33384B;
				border-radius: 16px;
			}
			/deep/.el-dialog__title {
				font-size: 16px;
				font-family:'Roboto-Bold';
				font-weight: 500;
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
				width: 120px !important;
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
				border: 1px solid #FFFFFF;
				background-color: #33384B;
				color: #FFFFFF;
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
						font-family:'Roboto-Bold';
						color: #FFFFFF;
					}
				}

				.screen_condition {
					display: flex;
					justify-content: space-between;
					.condition_left{
						display: flex;
						align-items: center;
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
								width: 151px;
								color: #fff;
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
							margin-right: 17px;
						
							.search_span {
								font-size: 14px;
								font-family:'Roboto-Regular';
								font-weight: 400;
								color: #FFFFFF;
							}
						
							.search_input {
								width: 100px;
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
						.screen_date {
							display: flex;
							align-items: center;
							// margin-right: 270px;
							.search_span {
								font-size: 14px;
								font-family:'Roboto-Regular';
								font-weight: 400;
								color: #FFFFFF;
							}
						
							/deep/.el-date-editor .el-range-separator {
								color: #fff;
							}
						
							/deep/ .el-input__inner {
								border: 0px;
								background-color: #33384B;
								border: 1px solid #ffffff;
							}
						
							/deep/ .el-range-input {
								background-color: #33384B;
							}
						
							/deep/ .el-date-editor .el-range-input {
								color: #fff;
							}
						}
						
					}
					.condition_right{
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
								width: 17.5%;
								color: #FFFFFF;
								font-size: 18px;
								display: flex;
								align-items: center;
								justify-content: center;
							}

							.table_head_div2 {
								width: 17.5%;
								color: #FFFFFF;
								font-size: 18px;
								display: flex;
								align-items: center;
								justify-content: flex-start;
							}

							.table_head_div3 {
								width: 10%;
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
								color: #FFFFFF;
								border-bottom: 1px solid #67717A;

								.row_td_block {
									width: 17.5%;
									height: 53px;
									display: flex;
									align-items: center;
									justify-content: center;
								}

								.row_td_block2 {
									width: 17.5%;
									height: 53px;
									display: flex;
									align-items: center;
									justify-content: flex-start;

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
									width: 10%;
									height: 53px;
									display: flex;
									align-items: center;
									justify-content: center;
								}
							}
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
