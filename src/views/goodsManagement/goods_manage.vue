<template>
	<div class="index">
		<LeftView :index="1"></LeftView>
		<div class="container">
			<div class="top_tabs">
				<div class="tabs_block">商城管理  /</div>
				<div class="tabs_block">商品管理</div>
			</div>
			<div class="goods_container">
				
				<div class="right_container">
					<div class="right_content">
						<div class="block_title">
							<div class="title_name">商品管理</div>
						</div>
						<div class="select_block">
							<div class="block_left">
								<div class="goods_name">
									<div class="tit_name">商品名称:</div>
									<input type="text" placeholder="请输入" v-model="listQuery.commodityName" />
								</div>
								<div class="sort">
									<div class="tit_name">分类:</div>
									<div class="sort_select">
										<el-select v-model="listQuery.categoryId" :popper-append-to-body="false">
											<el-option v-for="(item,index) in category_list" :key="index" :label="item.categoryName" :value="item.commodityCategoryId"></el-option>
										</el-select>
									</div>
								</div>
								<div class="goods_status">
									<div class="tit_name">商品状态:</div>
									<div class="sort_select">
										<el-select v-model="listQuery.commodityState" :popper-append-to-body="false">
											<el-option label="上架" value="1"></el-option>
											<el-option label="下架" value="2"></el-option>
										</el-select>
									</div>
								</div>
							</div><!-- block_left -->
							<div class="block_right">
								<div class="query_btn" @click="handleFilter">查询</div>
								<div class="reset_btn" @click="resetting">重置</div>
								<div class="add_btn" @click="add_goods('')">添加商品</div>
							</div>
						</div><!-- select_block -->
						<div class="goods_table">
							<div class="table_header">
								<div class="">商品名称</div>
								<div class="">分类</div>
								<div class="">库存</div>
								<div class="">商品状态</div>
								<div class="">售价</div>
								<div class="status_name">审核状态</div>
							</div>
							<div class="table_body">
								<div class="table_row" v-for="(item,index) in goods_list" :key="index">
									<div>{{item.commodityName}}</div>
									<div>{{item.categoryName}}</div>
									<div> 
										<div class="goods_num" v-if="item.specs != '' && item.specs != null ">{{item.specs[0]['specsStock']||0}} </div>
									</div>
									<div>{{item.commodityState==1?'上架':'下架'}}</div>
									<div>
										<div class="goods_num" v-if="item.specs != '' && item.specs != null ">{{item.specs[0]['specsPrice']||0}}{{item.payMethod}}</div>
									</div>
									<div class="status_block">
										<div @click="add_goods(item.commodityId)">编辑</div>
										<div v-if="item.commodityState==1" @click="del(item.commodityId,2)">下架</div>
										<div v-else @click="del(item.commodityId,1)">上架</div>
									</div>
								</div>
							</div>
						</div><!-- goods_table -->
						<!-- 分页 -->
						<div class="rank_pagination">
							<pagination v-show="total_count>0" :total="total_count" :page.sync="listQuery.page" :limit.sync="listQuery.size"
								@pagination="handlePageChange" @page_change="pageChange" />
						</div>
					</div><!-- right_content -->
				</div><!-- right_container -->
			</div><!-- goods_container -->
		</div>
	</div>
</template>

<script>
	import {
		listCommodity,
		updateCommodity,
		listCategory} from '@/api/good'
	import LeftView from '@/components/goods/left.vue'
	import Listing from '@/mixin/Listing';
	import Pagination from '@/components/Pagination'; // secondary package based on el-pagination
	export default{
		name:"goods_manage",
		mixins: [Listing],
		components:{
			LeftView,
			Pagination
		},
		data(){
			return{
				left_nav:1,
				value:'',
				options:[
					{
						value: '选项1',
						label: '黄金糕'
					}, 
				],
				listQuery: {
					commodityName: '',
					categoryId: '',
					commodityState: '',
					page: 1,
					size: 10
				},
				total_count: 0,
				goods_list:[],
				category_list: []
			}
		},
		mounted() {
			this.getListCategory()
			setTimeout(()=>{
				this.listQuery.page = this.PageNumber.page_number;
				this.getList()
			},180)	//当组件跳转时获取全局变量页数进行跳转
		},
		methods:{
			pageChange(value){
				this.PageNumber.page_number = value.page
			},
			add_goods(commodityId){
				this.$router.push({path:'/goodsManagement/add_goods',query:{commodityId}})
			},
			jump_goods_class(){
				this.$router.push({path:'/goodsManagement/goods_class'})
			},
			del(commodityId,state) {
				let params = {
					commodityId,
					state
				}
				let text = state == 1 ? '是否上架！！！' : '是否下架！！！'
				this.$confirm(text, '提示', {
					distinguishCancelAndClose: true,
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					center: true,
					customClass:'comfirm_box',
					dangerouslyUseHTMLString:true
				})
				.then(() => {
					updateCommodity(params).then(res => {
						this.$message({
							type: 'success',
							message: res.message
						});
						this.getList();
					})
				})
			},
			// 商品分类列表
			getListCategory() {
				listCategory({}).then(res => {
					const {
						list,total
					} = res.data
					this.category_list = list;
				})
			},
			getList() {
				listCommodity(this.listQuery).then(res => {
					const {
						list,total
					} = res.data
					this.total_count = total
					this.goods_list = list;
				})
			},
			handleFilter() {
				this.listQuery.page = 1;
				this.getList()
			},
			// 重置
			resetting() {
				this.listQuery = {
					commodityName: '',
					categoryId: '',
					commodityState: '',
					page: 1,
					size: 10
				}
				this.getList()
			},
		}
		
	}
</script>

<style lang="less" scoped>
.container {
	background: #33384B;
	margin: 0 56px 0 224px;
	padding-bottom:20px;
	.top_tabs{
		position: fixed;
		display: flex;
		top: 98px;
		.tabs_block{
			font-size: 14px;
			// font-family: PingFangSC-Regular, PingFang SC;
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
	.goods_container{
		display: flex;
		
		.right_container{
			width: 100%;
			.content_top{
				.text{
					color: #949494;
				}
			}//content_top
			.right_content{
				height: 100vh;
				background: #33384B;
				margin-top: 20px;
				padding-top: 10px;
				padding-left: 20px;
				.block_title{
					.title_name{
						color: #ffffff;
						font-size: 18px;
						font-family:'Roboto-Bold';
					}
				}
				.select_block{
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 30px;
					.block_left{
						display: flex;
						align-items: center;
						.goods_name{
							display: flex;
							align-items: center;
							font-family:'Roboto-Regular';
							.tit_name{
								color: #fff;
								margin-right: 10px;
								font-size: 14px;
							}
							input{
								width: 220px;
								height: 38px;
								background-color: #33384B;
								border: 1px solid #ACACAC;
								color: #fff;
								border-radius: 5px;
								padding-left: 10px;
								font-size: 14px;
								font-family:'Roboto-Regular';
							}
							input::-webkit-input-placeholder{
								color:#fff;
								font-size: 14px;
								font-family:'Roboto-Regular';
							}
						}
						.sort{
							display: flex;
							align-items: center;
							margin-left: 10px;
							font-family:'Roboto-Regular';
							.tit_name{
								color: #fff;
								margin-right: 10px;
								font-size: 14px;
							}
							.sort_select{
								/deep/ .el-select .el-input{
									width: 180px;
								}
								/deep/ .el-select .el-input .el-input__inner:focus{
									color:#fff;
									font-size: 14px;
									font-family:'Roboto-Regular';
								}
								/deep/ .el-select .el-input .el-input__inner{
								    border:0px;
									background-color: #33384B;
									border: 1px solid #ACACAC;
									// height: 50px;
									font-size: 14px;
									color:#fff;
									font-family:'Roboto-Regular';
								}
								/deep/ .el-select-dropdown{
								    background-color: #33384B;
									border:  1px solid rgba(255,255,255,0.2);
								}
								  //修改单个的选项的样式
								/deep/ .el-select-dropdown__item{
								    background-color: transparent;
								    color:#fff;
									text-align: center;
								}
								/deep/ .el-select-dropdown__item.hover{
									background-color: #545873;
								}
								/deep/ .el-select-dropdown__item.selected{
									background-color: #545873;
								}
							}
						}
						.goods_status{
							display: flex;
							align-items: center;
							margin-left: 10px;
							.tit_name{
								color: #fff;
								margin-right: 10px;
								font-size: 14px;
								font-family:'Roboto-Regular';
							}
							.sort_select{
								/deep/ .el-select .el-input{
									width: 180px;
								}
								/deep/ .el-select .el-input .el-input__inner:focus{
									color:#fff;
									font-size: 14px;
									font-family:'Roboto-Regular';
								}
								/deep/ .el-select .el-input .el-input__inner{
								    border:0px;
									background-color: #33384B;
									border: 1px solid #ACACAC;
									// height: 50px;
									font-size: 14px;
									color:#fff;
									font-family:'Roboto-Regular';
								}
								/deep/ .el-select-dropdown{
								    background-color: #33384B;
									border: 1px solid rgba(255,255,255,0.2);
								}
								  //修改单个的选项的样式
								/deep/ .el-select-dropdown__item{
								    background-color: transparent;
								    color:#fff;
									text-align: center;
								}
								/deep/ .el-select-dropdown__item.hover{
									background-color: #545873;
								}
								/deep/ .el-select-dropdown__item.selected{
									background-color: #545873;
								}
							}
						}//goods_status
					}//block_left
					.block_right{
						display: flex;
						align-items: center;
						margin-right: 20px;
						.query_btn{
							width: 60px;
							height: 35px;
							background-color: #228BE1;
							color: #ffffff;
							line-height: 35px;
							text-align: center;
							font-size: 14px;
							cursor: pointer;
							font-family:'Roboto-Regular';
						}
						.reset_btn{
							width: 60px;
							height: 35px;
							background-color: #ffffff;
							color: #000000;
							line-height: 35px;
							text-align: center;
							margin-left: 10px;
							font-size: 14px;
							cursor: pointer;
							font-family:'Roboto-Regular';
						}
						.add_btn{
							width: 120px;
							height: 35px;
							background-color: #228BE1;
							color: #ffffff;
							line-height: 35px;
							text-align: center;
							margin-left: 15px;
							font-size: 14px;
							cursor: pointer;
							font-family:'Roboto-Regular';
						}
					}
				}//.select_block
				.goods_table{
					margin-right: 20px;
					margin-top: 30px;
					.table_header{
						height: 60px;
						display: flex;
						align-items: center;
						color: #fff;
						text-align: center;
						background-color: #2A2E3F;
						font-size: 14px;
						font-family:'Roboto-Bold';
						div{
							width: 16%;
						}
						.status_name{
							width: 20%;
							text-align: left;
						}
					}
					.table_body{
						
						color: #fff;
						text-align: center;
						font-size: 14px;
						.table_row{
							height: 60px;
							display: flex;
							align-items: center;
							border-bottom: 1px solid #4A516A;
							font-family:'Roboto-Regular';
							div{
								width: 16%;
								text-align: center;
							}
							.goods_num{
								width: 100%;
								// background-color: #FFF0B7;
							}
							.status_block{
								width: 20%;
								display: flex;
								align-items: center;
								color: #238AE8;
								div	{
									cursor: pointer;
								}
							}
						}
					}
				}//goods_table
			}//right_content
		}//right_container
	}//goods_container
}
</style>

<style lang="less">
	.el-message-box--center{
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