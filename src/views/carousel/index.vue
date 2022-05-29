<template>
	<div class="index">
		<LeftView :index="4"></LeftView>
		<div class="container">
			<div class="top_tabs">
				<div class="tabs_block">轮播管理  /</div>
				<div class="tabs_block">轮播列表</div>
			</div>
			<div class="goods_container">
				
				<div class="right_container">
					<div class="right_content">
						<div class="block_title">
							<div class="title_name">轮播管理</div>
							<div class="add_btn" @click="add_goods(0)">添加轮播</div>
						</div>
						<div class="goods_table">
							<div class="table_header">
								<div class="car_head">海报</div>
								<div class="car_head">标题</div>
								<div class="car_head">推送对象</div>
								<div class="car_head"></div>
								<div class="car_head2"></div>
							</div>
							<div class="table_body">
								<div class="table_row" v-for="(item,index) in list" :key="index">
									<div class="row_block">
										<el-image style="width: 120px; height: 50px" :src="HOST + item.advertisementUrl" :preview-src-list="[HOST + item.advertisementUrl]"></el-image>
									</div>
									<div class="row_block">{{item.advertisementTitle}}</div>
									<div class="row_block">{{item.advertisementRange == 1 ?'用户端':'主持端'}}</div>
									<div class="row_block"> 
										<div class="row_button" @click="open_url(item.joinLink)" v-if="item.joinLink">Join</div>
										<div class="row_button2" @click="open_url(item.seeMore)" v-if="item.seeMore">See More</div>
									</div>
									<div class="row_block2">
										<div class="row_edit" @click="add_goods(item)">Edit >></div>
										<div class="row_del" @click="handleSopnsDel(item.advertisementId)">Delete</div>
									</div>
								</div>
							</div>
						</div><!-- goods_table -->
						<!-- 分页 -->
						<div class="rank_pagination">
							<pagination v-show="total_count>0" :total="total_count" :page.sync="listQuery.page" :limit.sync="listQuery.size"
								@pagination="handlePageChange" @page_change="pageChange" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		advertisementAdd,
		advertisementList,
		advertisementDelete} from '@/api/carousel'
	import LeftView from '@/components/recharge/left.vue'
	import Listing from '@/mixin/Listing';
	import Pagination from '@/components/Pagination'; // secondary package based on el-pagination
	export default{
		name:"carousel",
		mixins: [Listing],
		components:{
			LeftView,
			Pagination
		},
		data(){
			return{
				listQuery: {
					page: 1,
					size: 10
				},
				total_count: 0,
				list:[],
			}
		},
		mounted() {
			setTimeout(()=>{
				this.listQuery.page = this.PageNumber.page_number;
				this.getList()
			},180)	//当组件跳转时获取全局变量页数进行跳转
		},
		methods:{
			pageChange(value){
				this.PageNumber.page_number = value.page
			},
			// 跳转链接
			open_url(url){
				window.open(url);   
			},
			// 添加/编辑
			add_goods(item){
				console.log(item)
				let info = JSON.stringify(item)
				console.log(info)
				this.$router.push({path:'/carousel/form',query:{info}})
			},
			// 删除
			handleSopnsDel(id){
				this.$confirm('是否删除该轮播?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					advertisementDelete({id}).then(res => {
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.getList()
					})
				}).catch(() => {       
				});
			},
			getList() {
				advertisementList(this.listQuery).then(res => {
					const {
						list,total
					} = res.data
					this.total_count = total
					this.list = list;
				})
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
			}
			.right_content{
				height: 100vh;
				background: #33384B;
				margin-top: 20px;
				padding-top: 10px;
				padding-left: 20px;
				.block_title{
					width: 98%;
					display: flex;
					align-items: center;
					justify-content: space-between;
					.title_name{
						color: #ffffff;
						font-size: 18px;
						font-family:'Roboto-Bold';
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
						font-family:'Roboto-Bold';
					}
				}
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
						.car_head{
							width: 20%;
							height: 60px;
							display: flex;
							align-items: center;
							justify-content: center;
						}
						.car_head2{
							width: 20%;
							text-align: left;
							height: 60px;
							display: flex;
							align-items: center;
							justify-content: center;
						}
					}
					.table_body{
						color: #fff;
						text-align: center;
						font-size: 14px;
						.table_row{
							height: 90px;
							display: flex;
							align-items: center;
							border-bottom: 1px solid #4A516A;
							font-family:'Roboto-Regular';
							.row_block{
								width: 20%;
								display: flex;
								align-items: center;
								justify-content: center;
								.row_button{
									width: 100px;
									height: 45px;
									display: flex;
									align-items: center;
									justify-content: center;
									border-radius: 6px;
									border: 1px solid #238AE8;
									color: #238AE8;
									font-size: 18px;
									cursor: pointer;
									margin-right: 20px;
								}
								.row_button2{
									width: 100px;
									height: 45px;
									display: flex;
									align-items: center;
									justify-content: center;
									border-radius: 6px;
									border: 1px solid #238AE8;
									color: #238AE8;
									cursor: pointer;
									font-size: 18px;
								}
							}
							.row_block2{
								width: 20%;
								display: flex;
								align-items: center;
								font-size: 18px;
								justify-content: center;
								.row_edit{
									color: #fe9200;
									cursor: pointer;
									margin-right: 20px;
									font-family:'Roboto-Regular';
								}
								.row_del{
									color: red;
									cursor: pointer;
									font-family:'Roboto-Regular';
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