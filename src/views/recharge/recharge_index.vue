<template>
	<div class="index">
		<LeftView :index="2"></LeftView>
		<div class="container">
			<!-- edit_category 弹窗 -->
			<div class="edit_package">
				<div class="mark_cancel"  v-if="package_up == true" @click.stop="package_up = false">
					<img src="../../assets/images/close.png" />
				</div>
				<div class="mark_bac" v-if="package_up == true"></div>
				<div class="mark_content" v-if="package_up == true">
					<div class="title_name">Add Package</div>
					<div class="content_region">
						<div class="block_region_price">
							<div class="label">Price</div>
							<div class="input_block">
								<div class="text">MYR</div>
								<input type="text"  v-model="dataForm.rm"  maxlength="25" />
							</div>
						</div>
						<div class="block_region">
							<div class="label">Coin</div>
							<input type="text"  v-model="dataForm.coin"  maxlength="25" />
						</div>
						<div class="block_region_free">
							<div class="block_left">
								<img src="../../assets/images/check_box.png" class="check_box" v-if="check_box == false" @click="changeBox"/>
								<img src="../../assets/images/check_av.png" class="check_av" v-if="check_box == true" @click="changeBox"/>
								<div class="label">Free Coin</div>
							</div>
							<input type="text"  v-model="dataForm.discount"  maxlength="25" />
						</div>
					</div>
					<div class="save_btn">
						<div class="btn" @click="submit">Save</div>						
					</div>
				</div>
			</div>
			<!-- edit_category 弹窗 end -->
			
			<div class="game_container">
				<div class="container_header">
					<div class="header_nav">
						<div class="nav_name ">Top Up Package</div>
					</div>
				</div>
				<div class="recharge_content">
					<div class="tip_text">You can only create and edit the top up package,no edit allow.</div>
					<div class="content_block">
						<div class="block_region" v-for="(item,index) in list"> <!-- @click="open_package" -->
							<img src="../../assets/images/close.png"  class="close" @click="delCounpon(item.id)"/>
							<div class="content">
								<div class="MYR_num">MYR {{item.rm || 0}}</div>
								<img src="../../assets/images/dollar.png" />
								<div class="coins_num">
									<div class="coin">{{item.coin || 0}} Coins</div>
									<div class="free_coins">Free {{item.discount || 0}} Coins</div>
								</div>
							</div>
						</div>
						<!-- <div class="block_region" >
							<img src="../../assets/images/close.png"  class="close"/>
							<div class="content" >
								<div class="MYR_num">MYR 9.99</div>
								<img src="../../assets/images/dollar.png" />
								<div class="coins_num">
									<div class="coin">800 Coins</div>
									<div class="free_coins">Free 50 Coins</div>
								</div>
							</div>
						</div> -->
						<div class="block_region" @click="open_package">
							<div class="content_add">
								<img src="../../assets/images/add_fff.png" />
							</div>
						</div>
					</div>
				</div>
				<div class="rank_pagination">
					<pagination v-show="total_count>0" :total="total_count" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="handlePageChange" />
				</div>
			</div>
		
		</div>
			
	</div>
</template>

<script>
	import LeftView from '@/components/recharge/left.vue';
	import {packageAdd,packageList,delPackage } from '@/api/recharge';
	import Listing from '@/mixin/Listing';
	import Pagination from '@/components/Pagination';
	export default{
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
		name:"recharge_index",
		components:{
			LeftView,
			Pagination
		},
		data(){
			return{
				package_up:false,
				package_form:{
					price_num:'100',
					coin_num:'1,000',
					free_coin:'20'
				},
				check_box:false,
				dataForm: {
					coin: '',
					rm: '',
					discount: '',
					disabled: '',

				},
				listQuery: {
					page: 1,
					size: 10
				},
				list:[],
				total_count:1
			}
		},
		mounted() {
			this.getList()
		},
		methods:{
			//套餐列表
			getList(){
				let that = this;
				let params = that.listQuery
				packageList(params).then(res => {
					const {
						list,
						total
					} = res.data
					this.list = list
					this.total_count = total
				})
			},
			// 提交
			submit() {
				let params = this.dataForm
				packageAdd(params).then(res => {
					this.$message({
						type: 'success',
						message: res.message
					});
					this.getList()
					this.package_up = false
					this.dataForm = {}
				})
			},
			open_package(){
				this.package_up = ! this.package_up
			},
			changeBox(){
				this.check_box = ! this.check_box
				this.dataForm.disabled = this.check_box
			},
			//删除充值
			delCounpon(id){
				this.$confirm('是否删除该套餐?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					delPackage({id}).then(res => {
						this.$message({
							type:'success',
							message:'删除成功！'
						})
						this.getList()
					})
				})
				
			}
		}
	}
</script>

<style lang="less" scoped>
.container {
	background: #33384B;
	margin: 0 56px 0 224px;
	padding-bottom:20px;
	
	// edit_package弹窗
	.edit_package{
		position: relative;
		left: 160px;
		top: 70px;
		
		.mark_cancel{
			width: 50px;
			height: 50px;
			position: absolute;
			right: 180px;
			top: -70px;
			z-index: 999;
			img{
				width: 46px;
				height: 46px;
				cursor: pointer;
			}
		}
		.mark_bac{
			width: 100%;
			height: 100vh;
			background:#000000b3;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 88;
			
		}
		.mark_content{
			width: 831px;
			height: 674px;
			background: #33384B;
			border-radius: 25px;
			position: absolute;
			z-index: 999;
			.title_name{
				color: #E5A518;
				font-size: 24px;
				display: flex;
				justify-content: center;
				padding-top: 70px;
				margin-bottom: 40px;
				font-family:'Quicksand-Bold';
			}
			.content_region{
				padding-left: 100px;
				.block_region_price{
					margin-bottom: 40px;
					.label{
						color: #727272;
						font-size: 20px;
						margin-bottom: 10px;
					}
					.input_block{
						display: flex;
						align-items: center;
						width: 645px;
						height: 59px;
						background: #2a2e3f;
						border: 1px solid #2a2e3f;
						border-radius: 19px;
						.text{
							color: #727272;
							font-size: 20px;
							padding-left: 10px;
							font-family:'Roboto-Regular';
						}
						input{
							font-family:'Roboto-Regular';
							height: 59px;
							border: 1px solid #2a2e3f;
							border-radius: 19px;
							color: #fff;
							background: #2a2e3f;
							padding-left: 20px;
							font-size: 16px;
							
						}
					}
				}
				.block_region{
					margin-bottom: 40px;
					.label{
						color: #727272;
						font-size: 20px;
						margin-bottom: 10px;
						font-family:'Roboto-Regular';
					}
					input{
						width: 627px;
						height: 59px;
						border: 1px solid #2a2e3f;
						border-radius: 19px;
						color: #fff;
						font-family:'Roboto-Regular';
						background: #2a2e3f;
						padding-left: 20px;
						font-size: 16px;
					}
				}
				.block_region_free{
					width: 645px;
					display: flex;
					align-items: center;
					justify-content: space-between;
					.block_left{
						display: flex;
						align-content: flex-end;
						.label{
							color: #727272;
							font-size: 20px;
							font-family:'Roboto-Regular';
							margin-top: 5px;
							margin-left: 25px;
						}
						.check_box{
							width: 32px;
							height: 32px;
						}
						.check_av{
							width: 32px;
							height: 32px;
						}
					}
					input{
						width: 410px;
						height: 59px;
						border: 1px solid #2a2e3f;
						border-radius: 19px;
						color: #fff;
						font-family:'Roboto-Regular';
						background: #2a2e3f;
						padding-left: 20px;
						font-size: 16px;
						
					}
				}
			}
			.save_btn{
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: 100px;
				.btn{
					cursor: pointer;
					width: 163px;
					height: 58px;
					background: #E5A518;
					border-radius: 25px;
					color: #0E0F11;
					font-size: 20px;
					display: flex;
					font-family:'Roboto-Regular';
					align-items: center;
					justify-content: center;
				}
			}
		}
	}//edit_category
	.game_container{
		padding: 24px 24px;
		.container_header{
			display: flex;
			align-items: center;
			padding-bottom: 30px;
			border-bottom: 1px solid #595959;
			.header_nav{
				color: #ffffff;
				font-size: 21px;
				text-align: left;
				margin-right: 62px;
				font-family:'Quicksand-Bold';
				.nav_name{
					height: 35px;
				}
				
			}
			
		}
		.recharge_content{
			.tip_text{
				font-size: 18px;
				color: rgba(255,255,255,0.5);
				font-family:'Roboto-Bold';
				margin-top: 40px;
			}
			.content_block{
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				.block_region{
					width: 280px;
					height: 280px;
					background: #2a2e3f;
					border-radius: 22px;
					display: flex;
					align-items: center;
					justify-content: center;
					position: relative;
					margin-right: 33px;
					margin-top: 45px;
					.close{
						width: 25px;
						height: 25px;
						position: absolute;
						right: 15px;
						top: 15px;
						cursor: pointer;
					}
					.content{
						text-align: center;
						.MYR_num{
							color: #DBA83F;
							font-size: 18px;
							font-family:'Roboto-Bold';
						}
						img{
							width: 58px;
							height: 58px;
							border-radius: 72.5px 77px;
							margin: 20px 0 30px;
						}
						.coins_num{
							.coin{
								color: #ffffff;
								font-size: 18px;
								font-family:'Roboto-Regular';
							}
							.free_coins{
								color: #727272;
								font-size: 17px;
								margin-top: 5px;
								font-family:'Roboto-Regular';
							}
						}
					}
					.content_add{
						img{
							width: 39px;
							height: 39px;
							cursor: pointer;
						}
					}
				}
				.block_region:nth-child(4n){
					margin-right: 0;
				}
			}
		}
		.rank_pagination{
			display: flex;
			justify-content: flex-end;
			margin: 50px 0 30px 0;
		}
	}
}
</style>
