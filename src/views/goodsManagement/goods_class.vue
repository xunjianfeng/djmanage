<template>
	<div class="index">
		<LeftView :index="2"></LeftView>
		<div class="container">
			<div class="top_tabs">
				<div class="tabs_block">商城管理 /</div>
				<div class="tabs_block">商品分类</div>
			</div>
			<div class="goods_container">
				<div class="right_container">
					<div class="right_content">
						<div class="block_title">
							<div class="title_name">商品分类</div>
						</div>
						<div class="new_category">
							<div class="add_btn" @click="dialog_category('')">新建分类</div>
						</div><!-- select_block -->
						<div class="new_category">
							<el-dialog :title="title" :visible.sync="dialogFormVisible" :modal-append-to-body="false" @close='closeDialog'>
								<el-form :model="form">
									<el-form-item label="分类名称">
										<el-input v-model="form.categoryName" placeholder="请输入分类名称" autocomplete="off"></el-input>
									</el-form-item>
									<el-form-item label="排序">
										<el-input type="number" v-model="form.sort" placeholder="请输入排序"   min="1"></el-input>
									</el-form-item>
									<!-- <el-form-item label="状态">
										<el-select v-model="form.isShow" placeholder="请选择" :popper-append-to-body="false">
											<el-option
											  v-for="item in options"
											  :key="item.value"
											  :label="item.label"
											  :value="item.value">
											</el-option>
										</el-select>
									</el-form-item> -->
								</el-form>
								<div slot="footer" class="dialog-footer">
									<el-button type="primary" @click="changeDialog">保存</el-button>
								</div>
							</el-dialog>
						</div>
						<div class="goods_table">
							<div class="table_header">
								<!-- <div class="">序号</div> -->
								<div class="">分类名</div>
								<div class="">排序</div>
								<div class="status_name">操作</div>
							</div>
							<div class="table_body">
								<div class="table_row" v-for="(item,index) in goods_list" :key="index">
									<!-- <div>{{item.commodityCategoryId}}</div> -->
									<div>{{item.categoryName}}</div>
									<div>{{item.sort}}</div>
									<div class="status_block">
										<div style="margin-right: 32px;" @click="dialog_category(item)">编辑</div>
										<div @click="handleSopnsDel(item.commodityCategoryId)">删除</div>
									</div>
								</div>
							</div>
						</div><!-- goods_table -->
					</div><!-- right_content -->
				</div><!-- right_container -->
			</div><!-- goods_container -->
		</div>
	</div>
</template>

<script>
	import {
		listCategory,
		delCategory,
		addCategory
	} from '@/api/good';
	import LeftView from '@/components/goods/left.vue'
	export default {
		name: "goods_class",
		components: {
			LeftView
		},
		data() {
			return {
				form: {
					commodityCategoryId: '',
					categoryName: '',
					isShow: '',
					sort:''
				},
				options: [{
				  value: true,
				  label: '显示'
				}, {
				  value: false,
				  label: '否'
				}],
				goods_list: [],
				title:'新建分类',
				dialogFormVisible: false,
			}
		},
		mounted() {
			this.listCategory()
		},
		methods: {
			// 商品分类列表
			listCategory() {
				listCategory({}).then(res => {
					const {
						list,total
					} = res.data
					this.goods_list = list;
				})
			},
			// 删除分类
			handleSopnsDel(commodityCategoryId){
				this.$confirm('是否删除该分类?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					delCategory({commodityCategoryId}).then(res => {
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.listCategory()
					})
				}).catch(() => {       
				});
			},
			// 打开弹窗
			dialog_category(item) {
				let {categoryName,commodityCategoryId,sort,isShow} = item;
				this.form.commodityCategoryId = commodityCategoryId
				if(item == ''){
					this.title = '新建分类'
				}else{
					this.title = '编辑分类'
					this.form = item
				}
				this.dialogFormVisible = true;
			},
			// 添加/编辑分类
			changeDialog() {
				let that = this;
				let {categoryName,commodityCategoryId,sort,isShow} = that.form;
				console.log(that.form)
				if(categoryName == '' || sort == '' || (isShow == ''&& isShow == null && isShow == undefined) ){
					console.log(that.form)
					that.$message({
					  message: '请输入完整的分类信息！！！',
					  type: 'warning'
					})
					// return false
				}else{
					addCategory(that.form).then(res => {
						this.$message({
							type: 'success',
							message: res.message
						});
						this.dialogFormVisible = false;
						this.listCategory()
					})
				}
			},
			//关闭弹框的事件
			closeDialog(){
			  this.form = {};//清空数据
			},
		}
	}
</script>

<style lang="less" scoped>
	.container {
		background: #33384B;
		margin: 0 56px 0 224px;
		padding-bottom: 20px;

		.top_tabs {
			position: fixed;
			display: flex;
			top: 98px;

			.tabs_block {
				font-size: 14px;
				// font-family: PingFangSC-Regular, PingFang SC;
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

		.goods_container {
			display: flex;

			.right_container {
				width: 100%;

				.content_top {
					.text {
						color: #949494;
					}
				}

				//content_top
				.right_content {
					height: 100vh;
					background: #33384B;
					margin-top: 20px;
					padding-top: 10px;
					padding-left: 20px;

					.block_title {
						.title_name {
							color: #ffffff;
							font-size: 18px;
							font-family:'Roboto-Bold';
						}
					}

					.new_category {
						margin-top: 30px;
						.add_btn {
							width: 123px;
							height: 40px;
							background-color: #228BE1;
							color: #fff;
							line-height: 40px;
							text-align: center;
							font-size: 14px;
							font-family:'Roboto-Bold';
							cursor: pointer;
						}
					}

					.new_category {
						/deep/ .el-dialog__wrapper {
							position: fixed;
							top: 150px;
						}
						/deep/ .el-dialog__title {
							// color: #000000;
							color: #FFFFFF;
							font-weight: bold;
							font-family:'Roboto-Bold';
						}
						/deep/ .el-dialog {
							width: 460px;
							border-radius: 15px;
							font-size: 16px;
							background-color: #33384B;
						}
						/deep/ .el-dialog .el-dialog__body {
							display: flex;
							font-size: 14px;
						}
						
						/deep/ .el-dialog .el-dialog__body .el-form .el-form-item .el-form-item__label {
							// color: #000;
							color: #FFFFFF;
							font-weight: 500;
							font-family:'Roboto-Regular';
						}
						/deep/.el-dialog__headerbtn{
							/deep/.el-dialog__close{
								color: #FFFFFF;
							}
						}
						/deep/ .el-dialog .el-dialog__body .el-form .el-form-item .el-form-item__content .el-select .el-input__suffix {
							margin-right: 20px;
						}
						/deep/ .el-dialog .el-dialog__body .el-form .el-form-item .el-form-item__content .el-input {
							width: 365px;
						}
						/deep/ .el-dialog .el-dialog__body .el-form .el-form-item .el-form-item__content .el-input .el-input__inner {
							// width: 450px;
							height: 40px;
							// border: 1px solid #ACACAC;
							border: 1px solid #FFFFFF;
							background-color: #33384B;
							border-radius: 10px;
							color: #FFFFFF;
							font-family:'Roboto-Regular';
						}
						// input 去除type=number的上下箭头 
						/deep/ input::-webkit-outer-spin-button,
						/deep/ input::-webkit-inner-spin-button {
						  -webkit-appearance: none !important;
						}
						/deep/ input[type='number'] {
						  -moz-appearance: textfield !important;
						}
						/deep/ .el-dialog .el-dialog__body .el-form .player_input .el-form-item__content .el-input .el-input__inner {
							// border: none;
						}
						/deep/ .el-select .el-input .el-input__inner{
						    // border:0px;
							// background-color: #33384B;
							height: 48px;
							// width: 404px;
							// border: 1px solid #ffffff;
							background-color: #33384B;
							color: #fff;
							border-radius: 10px;
							// border-radius: 10px;
							font-family:'Roboto-Regular';
						}
						/deep/ .el-select-dropdown{
						    background-color: #33384B;
							border: 1px solid rgba(255,255,255,0.2);
						}
						
						//修改单个的选项的样式
						/deep/ .el-select-dropdown__item{
						    background-color: transparent;
						    // color:#3D3D3D;
							color: #fff;
							text-align: center;
							// background-color: #33384B;
						}
						/deep/ .el-button--primary {
							background-color: #1890FF;
							border-color: #1890FF;
							font-family:'Roboto-Bold';
						}
						/deep/ .el-select-dropdown__item.hover{
							background-color: #545873;
						}
						/deep/ .el-select-dropdown__item.selected{
							background-color: #545873;
						}
					}

					.goods_table {
						margin-right: 20px;
						margin-top: 30px;

						.table_header {
							height: 60px;
							display: flex;
							align-items: center;
							color: #fff;
							text-align: center;
							background-color: #2A2E3F;
							font-size: 14px;
							font-family:'Roboto-Bold';
							div {
								width: 33.3%;
							}

							.status_name {
								width: 33.3%;
								text-align: center;
							}
						}

						.table_body {

							color: #fff;
							text-align: center;
							font-size: 14px;

							.table_row {
								height: 60px;
								display: flex;
								align-items: center;
								border-bottom: 1px solid #4A516A;
								font-family:'Roboto-Regular';
								div {
									width: 33.3%;
								}

								.status_block {
									width: 33.3%;
									display: flex;
									align-items: center;
									justify-content: center;
									color: #238AE8;
									div{
										width: auto;
										cursor: pointer;
									}
								}
							}
						}
					}
				}
			}
		}
	}
</style>
<style lang="less">
	.el-message-box{
		background-color: #33384B;
		border: none;
		border-radius: 16px;
		.el-message-box__header{
			.el-message-box__title{
				color: #fff;
			}
			.el-message-box__close{
				color: #fff;
			}
		}
		.el-message-box__content{
			color: #FFFFFF;
		}
	}
</style>