<template>
	<div class="index">
		<div class="container">
			<!--优胜者弹窗 -->
			<div class="check_mark">
				<div class="mark_check" v-if="check_up== true" @click.stop="check_up = false">
					<img src="@/assets/images/cancel.png" >
				</div>
				<div class="mark_bac" v-if="check_up == true"></div>
				<div class="mark_check_container" v-if="check_up == true">
					<div class="mark_product_top">
						<div class="block_left">
							<img v-if="list[mark_index].rewardPicture == '' || list[mark_index].rewardPicture == null || list[mark_index].rewardPicture == undefined" src="../../assets/images/default_pic.png" alt="" />
							<img :src="HOST + list[mark_index].rewardPicture" v-else/>
							<div class="prize_name">{{list[mark_index].rewardName}}</div>
						</div>
						<div class="block_right">
							<div class="price_value">MYR {{list[mark_index].rewardPrice}}</div>
							<div class="select_box">
								<!-- <div class="check_box" v-if="select_all == false" @click="changeAll">
									<img src="../../assets/images/xz.png"/>
								</div>
								<div class="check_box" v-if="select_all == true" @click="changeAll">
									<img src="../../assets/images/xzs.png"/>
								</div> -->
							</div>
						</div>
					</div>
					<div class="mark_my_content ">
						<div class="mark_product_container">
							<div class="mark_product">
								<div class="product_two" v-for="(item,index) in mark_list" :key="index">
									<div class="product_id">
										<div class="text">{{index+1}}</div>
									</div>
									<div class="product_img">
										<el-image :src="HOST + item.avatar" class="avatar_img">
											<div slot="error" class="image-slot">
												<img src="../../assets/images/default.png" class="avatar_img" />
											</div>
										</el-image>
										<!-- <img :src="HOST + item.avatar" alt="" v-if="item.avatar"> -->
										<!-- <img src="../../assets/images/default.png" v-else /> -->
									</div>
									<div class="product_product">
										<div class="product_title">{{item.fullName}}</div>
										<div class="product_subtitle">USERID {{item.user_id}}</div>
									</div>
									<div class="product_right">
										<div class="check_box" v-if="item.gant_status == false" @click="changeOne(item)">
											<img src="../../assets/images/xz.png"/>
										</div>
										<div class="check_box" v-if="item.gant_status == true" @click="changeOne(item)">
											<img src="../../assets/images/xzs.png"/>
										</div>
									</div>
								</div>
								
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- end -->
			<div class="container_header">
				<div class="header_left" @click="jump_listManagement">
					<div class="back"><<</div>
					<div class="text">KEJOHANAN MYESPORT PERINGKAT NEGERI JOHOR</div>
				</div>
				<div class="header_right">
					<img :src="HOST + all_info.avatar" v-if="all_info.avatar != null && all_info.avatar != ''"/>
					<img src="../../assets/images/default.png" v-else/>
					<div class="organizer">{{all_info.fullName}}</div>
				</div>
			</div>
			<div class="content_area">
				<div class="content_top">
					<div class="time_area">
						<div class="label">Tournament Time</div>
						<div class="time_text">
							<div class="end_time">END</div>
							<div class="text">{{initDete(all_info.tournamentTime)}} to {{initDete(all_info.registrationTimeEnd)}}</div>
						</div>
					</div>
					<div class="total_value">
						<div class="label">Total Value</div>
						<div class="total_num">MYR {{all_info.bonus}}</div>
					</div>
					<!-- <div class="prize_type">
						<div class="label">Prize Type</div>
						<div class="text">Gift</div>
					</div> -->
					<div class="status">
						<div class="label">Status</div>
						<div class="text_area">
							<div class="text">{{all_info.authenticationStatus==1?'preparing':all_info.authenticationStatus==2?'history':''}}</div>
							<img src="../../assets/images/up_down.png" />
						</div>
					</div>
				</div>
				<div class="content_table">
					<div class="table_header">
						<div class="header_1"></div>
						<div class="header_2">Prize Image</div>
						<div class="header_3">Prize Name</div>
						<div class="header_4">Prize Value</div>
						<div class="header_5">Quantity</div>
						<div class="header_8">Prize Type</div>
						<div class="header_6">Winner</div>
						<div class="header_7"></div>
					</div>
					<div class="table_body">
						<div class="body_row" v-for="(item,index) in list" :key="index">
							<div class="col_1">{{item.tournamentId}}</div>
							<div class="col_2">
								<el-image :src="HOST + item.rewardPicture" class="pic_img">
									<div slot="error" class="image-slot">
										<img src="../../assets/images/default_pic.png" class="pic_img" />
									</div>
								</el-image>
								<!-- <img v-if="item.rewardPicture == '' || item.rewardPicture == null || item.rewardPicture == undefined" src="../../assets/images/default_pic.png" alt="" /> -->
								<!-- <img :src="HOST+item.rewardPicture" v-else /> -->
							</div>
							<div class="col_3">{{item.rewardName}}</div>
							<div class="col_4">{{item.rewardPrice}}</div>
							<div class="col_5">{{item.quantity}}</div>
							<div class="col_8">{{item.rewardType == 1 ?'奖品':'现金'}}</div>
							<div class="col_6" @click="up_bac(item,index)">
								<img src="../../assets/images/eye.png" />
							</div>
							<div class="col_7">
								<img src="../../assets/images/xz.png" v-if="!item.grantConfirm" />
								<img src="../../assets/images/xzs.png" class="check_av" v-if="item.grantConfirm == true" />
							</div>
						</div>
					</div>
				</div>
				<!-- 分页 -->
				<div class="rank_pagination">
					<!-- <pagination v-show="total_count>0" :total="total_count" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="handlePageChange" /> -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {tournamentContestant,tournamentGrant,tournamentConfirm } from '@/api/macth'
	import Pagination from '@/components/Pagination'; 
	export default{
		name:'prize_list',
		components:{
			Pagination
		},
		data(){
			return{
				check_up:false, //优胜者弹窗
				select_all:false, // 全选
				listQuery: {
					page: 1,
					size: 10
				},
				total_count:0,
				all_info:'', //全部信息
				list: [], //奖品列表
				mark_list:[],
				mark_index:'', //打开哪个优胜者的弹窗
				gantQuery:{
					rewardId:'',        //礼品Id
					userId:'',          //用户Id
					tournamentId:'',    //赛事Id
					id:'',              //取消发放时传入
				},
				userId_list:[], //发送用户id
				confirm_status:false,  //确认发放状态
			}
		},
		mounted() {
			if(this.$route.query.info != '' && this.$route.query.info != undefined && this.$route.query.info != null){
				let { info } = this.$route.query
				this.all_info = JSON.parse(info)
				this.list = this.all_info.rewards
			}
		},
		methods:{
			//打开优胜者弹窗
			up_bac(item,index){
				let that = this;
				that.mark_index = index
				that.gantQuery.rewardId = item.rewardId
				that.gantQuery.tournamentId = item.tournamentId
				that.getContestant();
			},
			// 赛事所有参赛人员
			getContestant() {
				let params = {
					tournamentId:this.all_info.id
				}
				tournamentContestant(params).then(res => {
					let mark_list = res.data
					for (let i in mark_list) {
						if(mark_list[i].id != null){
							mark_list[i].gant_status = true
						}else{
							mark_list[i].gant_status = false
						}
						
					}
					this.mark_list = mark_list
					this.check_up = true
				})
			},
			// 优胜者  全选  接口不支持
			// changeAll(){
			// 	let that = this;
			// 	that.select_all = !that.select_all
			// 	for (let i in that.mark_list) {
			// 		if(that.select_all == false){
			// 			that.mark_list[i].gant_status = false
			// 			console.log(that.mark_list)
			// 		}else{
			// 			that.mark_list[i].gant_status = true
			// 			that.gantQuery.userId = ''
			// 			that.userId_list.push(that.mark_list[i].userId)
			// 			console.log('userId_list')
			// 			console.log(that.userId_list)
			// 		}
			// 	}
			// 	if(that.select_all == true){
			// 		that.gantQuery.userId = that.userId_list.join(",");
			// 		tournamentGrant(that.gantQuery).then(res => {
			// 			console.log(res.data)
			// 			this.$message({
			// 			  message: res.message,
			// 			  type: 'success'
			// 			});
			// 			that.getContestant();
			// 		})
			// 	}
			// },
			//优胜者  单选  发放礼品
			changeOne(item){
				let that = this;
				let { userId } = item;
				for (let i in that.mark_list) {
					if(that.mark_list[i].userId == userId){
						that.gantQuery.userId = that.mark_list[i].userId
						if(that.mark_list[i].gant_status == false){
							that.gantQuery.id = ''
							that.mark_list[i].gant_status = true
							that.confirm_status = true
							tournamentGrant(that.gantQuery).then(res => {
								this.$message({
								  message: res.message,
								  type: 'success'
								});
								that.get_confirm();
								that.getContestant();
							})
						}else{
							that.gantQuery.id = that.mark_list[i].id
							that.mark_list[i].gant_status = false
							that.confirm_status = false
							tournamentGrant(that.gantQuery).then(res => {
								this.$message({
								  message: res.message,
								  type: 'success'
								});
								that.get_confirm();
								that.getContestant();
							})
						}
					}
				}
			},
			// 发送礼品成功后调用， 修改状态 
			get_confirm(){
				let that = this;
				let params = {
					rewardId:that.gantQuery.rewardId,
					confirm:that.confirm_status 
				}
				tournamentConfirm(params).then(res => {
					this.$message({
					  message: res.message,
					  type: 'success'
					});
				})
			},

			jump_listManagement(){
				this.$router.push({path:'/match/list_management'})
			},
			
			
		}
	}
</script>

<style lang="less" scoped>
.container {
	background: #33384B;
	margin: 0 56px;
	padding-bottom:20px;
	// Check out 01弹窗 start
	.check_mark{
		.mark_check{
			position: absolute;
			right: 80px;
			top: 0px;
			img{
				width: 46px;
				height: 46px;
				cursor: pointer;
			}
			z-index: 999;
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
		.mark_check_container{
			position: absolute;
			left: 357px;
			top: 40px;
			z-index: 999;
			width: 753px;
			// padding: 48px 20px 31px 28px;
			background: #33384B;
			border-radius: 27px;
			overflow: hidden;
			display: flex;
			flex-flow: column;
			align-items: center;
			.mark_product_top{
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				background-color: #252a3b;
				padding: 20px 0;
				.block_left{
					display: flex;
					align-items: center;
					margin-left: 30px;
					img{
						width: 106px;
						height: 71px;
					}
					.prize_name{
						margin-left: 46px;
						color: #FFFFFF;
						font-family:'Roboto-Bold';
						font-size: 18px;
					}
				}
				.block_right{
					display: flex;
					align-items: center;
					margin-right: 30px;
					.price_value{
						color: #FFFFFF;
						font-size: 18px;
						margin-right: 50px;
						font-family:'Roboto-Regular';
					}
					.select_box{
						display: flex;
						align-items: center;
						.check_box{
							width: 30px;
							height: 30px;
							border: 2px solid #616568;
							img{
								width: 30px;
								height: 30px;
							}
						}
						
					}
				}
			}
			.mark_my_content{
				width: 100%;
				margin-bottom: 30px;
				.mark_product_container{
					width: 100%;
					height: 496px;
					overflow-y: scroll;
					// margin-bottom: 28px;
					.mark_product{
						width: 98%;
						border: 1px solid #313538;
						border-radius: 22px;
						.product_two{
							height: 165px;
							margin: 0 20px;
							display: flex;
							align-items: center;
							border-bottom: 1px solid #313538;
							.product_id{
								width: 100px;
								height: 119px;
								color: #fff;
								font-family:'Roboto-Regular';
								font-size: 18px;
								text-align: center;
								line-height: 119px;
							}
							.product_img{
								width: 120px;
								height: 119px;
								border-radius: 13px;
								overflow: hidden;
								margin-right: 46px;
								.avatar_img{
									width: 120px;
									height: 119px;
									object-fit: cover;
								}
							}
							.product_product{
								width: 60%;
								.product_title{
									color: #FFFFFF;
									font-size: 22px;
									margin-bottom: 20px;
									font-family:'Roboto-Bold';
								}
								.product_subtitle{
									color: #727272;
									font-size: 18px;
									font-family:'Roboto-Regular';
								}
							}
							.product_right{
								display: flex;
								align-items: center;
								.check_box{
									width: 30px;
									height: 30px;
									// border: 2px solid #616568;
									img{
										width: 30px;
										height: 30px;
									}
								}
							}
						}
						.product_two:last-child{
							border-bottom: none;
						}
					}
					&::-webkit-scrollbar {
						/*滚动条整体样式*/
						width : 13px;  /*高宽分别对应横竖滚动条的尺寸*/
						height: 1px;
					}
					&::-webkit-scrollbar-thumb {
					/*滚动条里面小方块*/
					border-radius: 10px;
					box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
					background   : #2B2B2B;
					}
					&::-webkit-scrollbar-track {
					/*滚动条里面轨道*/
					box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
					border-radius: 10px;
					background   : #000000;
					}
				}
				
			}
		}
		
	}
	
	//Check out 01弹窗  end
	.container_header{
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #fff;
		padding-top: 20px;
		padding: 20px 30px 0;
		font-family:'Quicksand-Bold';
		.header_left{
			display: flex;
			align-items: center;
			cursor: pointer;
			.back{
				font-size: 21px;
			}
			.text{
				font-size: 22px;
				margin-left: 30px;
			}
		}
		.header_right{
			display: flex;
			align-items: center;
			img{
				width: 35px;
				height: 35px;
				margin-right: 24px;
			}
			.organizer{
				color: #fff;
				font-size: 18px;
				font-family:'Quicksand-Bold';
				text-decoration: underline;
			}
		}
	}
	.content_area{
		margin-top: 40px;
		padding: 0 20px;
		.content_top{
			display: flex;
			align-items: center;
			justify-content: space-between;
			background: #252a3b;
			padding: 43px 0;
			border-radius: 15px 15px 0 0;
			.time_area{
				width: 40%;
				display: flex;
				align-items: center;
				margin-left: 40px;
				.label{
					color: #c4c4c4;
					font-size: 17px;
					font-family:'Roboto-Regular';
				}
				.time_text{
					display: flex;
					align-items: center;
					font-size: 18px;
					margin-left: 21px;
					.end_time{
						color: #D3AA53;
						font-family:'Roboto-Bold';
					}
					.text{
						color: #fff;
						margin-left: 10px;
						font-family:'Roboto-Regular';
					}
				}
			}
			.total_value{
				width: 20%;
				display: flex;
				align-items: center;
				.label{
					color: #c4c4c4;
					font-family:'Roboto-Regular';
					font-size: 17px;
				}
				.total_num{
					color: #fff;
					font-size: 18px;
					margin-left: 21px;
					font-family:'Roboto-Bold';
				}
			}
			.prize_type{
				width: 20%;
				display: flex;
				align-items: center;
				.label{
					color: #c4c4c4;
					font-size: 17px;
					font-family:'Roboto-Regular';
				}
				.text{
					color: #fff;
					font-size: 18px;
					margin-left: 21px;
					font-family:'Roboto-Bold';
				}
			}
			.status{
				width: 20%;
				display: flex;
				align-items: center;
				.label{
					color: #c4c4c4;
					font-size: 17px;
					font-family:'Roboto-Regular';
				}
				.text_area{
					display: flex;
					align-items: center;
					font-size: 18px;
					margin-left: 21px;
					.text{
						color: #23B709;
						font-family:'Roboto-Bold';
					}
					img{
						width: 12px;
						height: 12px;
						margin-left: 5px;
					}
				}
			}
		}
		.content_table{
			background: #252a3b;
			border-radius: 0 0 15px 15px ;
			.table_header{
				color: #FFFFFF;
				font-size: 18px;
				display: flex;
				align-items: center;
				padding: 22px 0;
				background-color: #5C5E70;
				font-family:'Quicksand-Bold';
				.header_1,.header_2{
					width: 10%;
				}
				.header_5,.header_6,.header_7,.header_8{
					width: 10%;
				}
				.header_3,.header_4{
					width: 20%;
				}
			}
			.table_body{
				font-family:'Roboto-Regular';
				.body_row{
					display: flex;
					align-items: center;
					padding: 10px 0;
					border-bottom: 1px solid #626f79;
					color: #fff;
					font-family:'Roboto-Regular';
					font-size: 18px;
					&:last-child{
						border: none;
					}
					.col_1,.col_2{
						width: 10%;
					}
					.col_5,.col_6,.col_7,.col_8{
						width: 10%;
					}
					.col_3,.col_4{
						width: 20%;
					}
					.col_1{
						text-align: center;
					}
					.col_2{
						.pic_img{
							width: 106px;
							height: 71px;
						}
					}
					.col_6{
						img{
							width: 28px;
							height: 19px;
						}
					}
					.col_7{
						display: flex;
						img{
							width: 30px;
							height: 30px;
							border: 2px solid #616568;
							cursor: pointer;
						}
						.check_av{
							width: 30px;
							height: 30px;
							border: 2px solid #616568;
						}
					}
				}
			}
		}
		.rank_pagination{
			margin: 32px 0 0px 0px;
			display: flex;
			justify-content: flex-end;
		}
	}
}
</style>
