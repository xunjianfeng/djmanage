<template>
	<div class="index">
		
		<LeftView :index="1"></LeftView>
		<div class="container">
			<!-- Rejected -->
			<div class="create_voucher2">
				<div class="mark_cancel"  v-if="voucher_up2 == true" @click.stop="closeStatus">
					<img src="../../assets/images/close.png" />
				</div>
				<div class="mark_bac" v-if="voucher_up2 == true"></div>
				<div class="mark_content" v-if="voucher_up2 == true">
					<!-- <div class="title_name">赛事标题</div> -->
					<!-- <div class="title_name">{{tournamentName}}</div> -->
					<div class="content_region">
						<div class="region_block">
							<div class="label">Reason reject</div>
							<div class="input_area">
								<textarea  class="input-left" maxlength="200" @input="Tontent" v-model="reason"></textarea>
								<div class="des_num">({{des_num}}/200)</div>
							</div>
						</div>
						
					</div>
					<div class="save_btn">
						<div class="btn" @click="changeStatus">Complete</div>	
						<div class="cancel_btn" @click="closeStatus">Cancel</div>
					</div>
				</div>
			</div>
			<div class="category_container">
				<div class="container_header">
					<div class="nav_left">
						<div class="nav_left_text text_click" @click="jump_user">用户列表 / </div>
						<div class="nav_left_text">Security</div>
					</div>
				</div>
				<div class="content">
					<div class="content_top">
						<div class="user_name">{{fullName}}</div>
					</div>
					<div class="content_table">
						<div class="table_header">
							<div class="header_col">Security</div>
							<div class="header_col header_title">Date</div>
							<div class="header_col header_title">Number</div>
							<div class="header_col header_description">Front Photo</div>
							<div class="header_col header_description">Back Photo</div>
							<div class="header_col_1"></div>
						</div>
						<div class="table_body">
							<div class="no_data" v-if="list == ''">暂无数据</div>
							<div class="body_row" v-for="(item,index) in list">
								<div class="row_col row_col_2">{{item.type}}</div>
								<div class="row_col">{{initDate(item.create_time)}}</div>
								<el-tooltip class="item" effect="dark" :content="item.Identification" placement="bottom">
									<div class="row_col text_title">{{item.Identification}}</div>
								</el-tooltip>
								<div class="row_col text_description">
									<el-image style="width: 50%; height: 50%" :src="HOST + item.front_url" :preview-src-list="[HOST + item.front_url]">
									</el-image>
									<!-- <viewer :image="HOST + item.front_url">
										<img :src="HOST + item.front_url" />
									</viewer> -->
									<!-- <img :src="HOST + item.front_url" /> -->
								</div>
								<div class="row_col text_description">
									<el-image style="width: 50%; height: 50%" :src="HOST + item.back_url" :preview-src-list="[HOST + item.back_url]"  v-if="item.type == 'nric' || item.type == 'NRIC'">
									</el-image>
									<!-- <img :src="HOST + item.back_url"  v-if="item.type == 'nric' || item.type == 'NRIC'"/> -->
								</div>
								<div class="row_col_1">
									<!-- 1 未处理 2 通过 3 拒绝 -->
									<!-- <div class="text">Request tp re-upload</div> -->
									<!-- <div class="text_area" v-if="item.examine != 3 || item.examine == null || item.examine == ''">
										<div class="text_pass" @click="changeStatus(2,item.type)">通过</div>
										<div class="text_line">|</div>
										<div class="text_reject" @click="open(item.type)">Request to re-upload</div>
									</div> -->
									<div :class="item.examine != 3 ? 'text text_pointer' : 'text'" @click="item.examine != 3 || item.examine == null || item.examine == '' ? open(item.type):''">
										<!-- {{item.examine == 2 ? '已通过' : item.examine == 3 ? '已拒绝' : '未处理'}} -->
										{{item.examine == 3 ? 'Rejected' : 'Request to re-upload'}}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
					
		</div>
	</div>
</template>

<script>
	import LeftView from '@/components/play/left.vue'
	import {identificationList,infoExamine} from '@/api/user.js'
	import Listing from '@/mixin/Listing';
	export default{
		name:"security_view",
		components:{
			LeftView
		},
		mixins: [Listing],
		data(){
			return{
				voucher_up2:false,
				list:[
					// {
					// 	security:'NRIC',
					// 	date:'2021-08-09',
					// 	Number:'1232341212',
					// 	front_url:require("@/assets/images/radiu1.png"),
					// 	back_url:require("@/assets/images/radiu1.png")
					// },
				],
				userId:'',
				fullName:'',
				reason:'',
				type:'',
				des_num:0
			}
		},
		mounted() {
			this.userId = this.$route.query.userId
			this.fullName = this.$route.query.fullName
			this.getList()
		},
		methods:{
			getList(){
				let params = {
					userId:this.$route.query.userId
				}
				identificationList(params).then(res => {
					this.list = res.data
				})
			},
			// 打开拒绝的弹窗
			open(type){
				let that = this;
				that.voucher_up2 = true
				that.type = type
				// console.log(that.type)
				// console.log(that.voucher_up2)
			},
			// reject字数限制
			Tontent(){
				let that = this;
				that.des_num = that.reason.length
			},
			//审核
			changeStatus(){
				let params = {
					authenticationType:this.type,
					status:3,
					reason:this.reason,
					authenticationId:this.$route.query.userId,
				}
				// console.log(params)
				infoExamine(params).then(res => {
					this.$message({
						type: 'success',
						message: res.message
					});
					this.voucher_up2 = false
					this.reason = ''
				})
			},
			jump_user(){
				this.$router.push({ path: '/user/user_index'})
			},
			//关闭拒绝的弹窗
			closeStatus(){
				this.voucher_up2 = false
				this.reason = ''
			}
		}
	}
</script>

<style lang="less" scoped>
	.container {
		background: #33384B;
		margin: 0 56px 0 224px;
		padding-bottom:20px;
		.create_voucher2{
			position: fixed;
			// left: 165px;
			z-index: 99;
			.mark_cancel{
				width: 46px;
				height: 46px;
				position: fixed;
				right: 180px;
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
				padding-bottom: 80px;
				// height: 1513px;
				background: #33384B;
				border-radius: 32px;
				position: absolute;
				z-index: 999;
				top: 60px;
				left: 100px;
				.title_name{
					width: 80%;
					padding: 70px 10% 0;
					color: #E5A518;
					font-size: 24px;
					font-family:'Quicksand-Bold';
					margin-bottom: 40px;
				}
				.content_region{
					width: 80%;
					padding: 0 10%;
					padding: 70px 10% 0;
					.region_block{
						.label{
							color: #727272;
							font-size: 20px;
							margin-bottom: 10px;
							font-family:'Roboto-Regular';
						}
						.input_area{
							border-radius: 19px;
							background: #2a2e3f;
							.des_num {
								color: #727272;
								font-size: 20px;
								padding-right: 10px;
								font-family:'Roboto-Regular';
								text-align: right;
								padding-bottom: 10px;
							}
							.input-left{
								width: 627px;
								height: 120px;
								// height: 227px;
								border: 1px solid #2a2e3f;
								border-radius: 19px;
								color: #fff;
								background: #2a2e3f;
								font-family:'Roboto-Regular';
								padding: 20px 0 20px 20px;
								font-size: 20px;
								border: none;
								resize: none;
								// overflow-y: scroll;
							}
							.input-left::-webkit-scrollbar {
								/*滚动条整体样式*/
								width : 10px;  /*高宽分别对应横竖滚动条的尺寸*/
								height: 1px;
								// background-color: #33384B;
							}
							.input-left::-webkit-scrollbar-thumb {
								/*滚动条里面小方块*/
								border-radius   : 10px;
								box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
								background-color: #595959;
							}
							.input-left::-webkit-scrollbar-track {
								/*滚动条里面轨道*/
								box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
								background   : #7C7C7C;
								border-radius: 10px;
							}
						}
						
					}
				}
				.save_btn{
					display: flex;
					align-items: center;
					justify-content: center;
					margin-top: 70px;
					.btn{
						cursor: pointer;
						width: 163px;
						height: 58px;
						background: #D3AA53;
						border-radius: 25px;
						color: #0E0F11;
						font-size: 20px;
						font-family:'Roboto-Regular';
						display: flex;
						align-items: center;
						justify-content: center;
					}
					.cancel_btn{
						cursor: pointer;
						width: 163px;
						height: 58px;
						// background: #D3AA53;
						// border: 1px solid #33384b;
						border: 1px solid rgba(255,255,255,0.5);
						color: #ffffff;
						border-radius: 25px;
						font-size: 20px;
						font-family:'Roboto-Regular';
						display: flex;
						align-items: center;
						justify-content: center;
						margin-left: 30px;
					}
				}
			}
		}
		
		.create_voucher{
			position: relative;
			left: 165px;
			.mark_cancel{
				width: 46px;
				height: 46px;
				position: absolute;
				right: 180px;			
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
			.mark_scontent{
				width: 800px;
				background: #33384B;
				border-radius: 32px;
				position: absolute;
				top: 0px;
				z-index: 999;
				.title_name{
					color: #E5A518;
					font-size: 24px;
					display: flex;
					justify-content: center;
					padding-top: 40px;
					margin-bottom: 20px;
					font-family:'Quicksand-Bold';
				}
				.content_region{
					display: flex;
					flex-direction: column;
					align-items: center;
					.block_region{
						margin-bottom: 30px;
						.label{
							color: #727272;
							font-size: 20px;
							margin-bottom: 10px;
							font-family:'Roboto-Regular';
							span{
								color: red;
								font-family:'Roboto-Regular';
							}
						}
						input{
							width: 627px;
							height: 45px;
							border: 1px solid #2a2e3f;
							border-radius: 19px;
							color: #fff;
							background: #2a2e3f;
							padding-left: 20px;
							font-size: 16px;
							font-family:'Roboto-Regular';
						}
						.input_block{
							display: flex;
							align-items: center;
							width: 645px;
							height: 45px;
							background: #2a2e3f;
							border: 1px solid #2a2e3f;
							border-radius: 19px;
							.text{
								color: #727272;
								font-size: 20px;
								padding-right: 10px;
								font-family:'Roboto-Regular';
							}
							input{
								height: 44px;
								border: 1px solid #2a2e3f;
								border-radius: 19px;
								color: #fff;
								background: #2a2e3f;
								padding-left: 20px;
								font-size: 16px;
								font-family:'Roboto-Regular';
								
							}
						}
						.img_area{
							display: flex;
							align-items: center;
							.img{
								width: 245px;
								height: 245px;
								background: #2a2e3f;
								border-radius: 17px;
								display: flex;
								align-items: center;
								justify-content: center;
								img{
									width: 149px;
									height: 154px;
									border-radius: 72.5px 77px;
								}
							}
							.text{
								color: #ffffff;
								font-size: 20px;
								margin-left: 70px;
								font-family:'Roboto-Regular';
							}
						}
						.region_block{
							border-radius: 19px;
							background: #2a2e3f;
							
							.des_num {
								color: #727272;
								font-size: 20px;
								padding-right: 10px;
								font-family:'Roboto-Regular';
								text-align: right;
								padding-bottom: 10px;
							}
							.input-left{
								width: 627px;
								height: 90px;
								// height: 227px;
								border: 1px solid #2a2e3f;
								border-radius: 19px;
								color: #fff;
								background: #2a2e3f;
								background: inherit;
								border: none;
								font-family:'Roboto-Regular';
								padding: 20px 0 20px 20px;
								font-size: 20px;
								resize: none;
								// overflow-y: scroll;
							}
							.input-left::-webkit-scrollbar {
								/*滚动条整体样式*/
								width : 10px;  /*高宽分别对应横竖滚动条的尺寸*/
								height: 1px;
								background-color: #33384B;
							}
							.input-left::-webkit-scrollbar-thumb {
								/*滚动条里面小方块*/
								border-radius   : 10px;
								background-color: #595959;
							}
							.input-left::-webkit-scrollbar-track {
								/*滚动条里面轨道*/
								background   : #7C7C7C;
								border-radius: 10px;
							}
						}
						
					}
					.block_region_type{
						width: 645px;
						display: flex;
						align-items: center;
						justify-content: space-between;
						margin-bottom: 30px;
						.block_left{
							.label{
								color: #727272;
								font-size: 20px;
								margin-bottom: 10px;
								font-family:'Roboto-Regular';
								span{
									color: red;
								}
							}
							.sort_by{
								font-family:'Roboto-Regular';
								.options_select{
									/deep/ .el-select .el-input .el-input__inner {
										border: 0px;
										width: 645px;
										height: 45px;
										padding: 0 20px;
										font-size: 18px;
										font-family:'Roboto-Regular';
										color: #fff;
										border-radius: 20px;
										background-color: #2a2e3f;
										// border: 1px solid #fff;
									}
									/deep/ .el-select-dropdown {
										background-color: #2a2e3f;
										border: 1px solid rgba(255,255,255,0.2);
									}
									/deep/ .el-icon-arrow-up:before { content: ""; }
									/deep/ .el-icon-arrow-down:before { content: ""; }
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
							}
						}
						
					}
				}
				.save_btn{
					display: flex;
					align-items: center;
					justify-content: center;
					margin: 20px 0 50px 0;
					.btn{
						cursor: pointer;
						width: 163px;
						height: 50px;
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
		}
		
		.category_container{
			.container_header{
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 30px 20px 0;
				.nav_left{
					display: flex;
					align-items: center;
					.nav_left_text{
						color: #ffffff;
						font-size: 20px;
						font-family:'Quicksand-Bold';
						margin-right: 5px;
					}
					.text_click{
						cursor: pointer;
					}
				}
			}
			.content{
				width: 95%;
				padding: 0 20px;
				margin-top: 30px;
				margin-left: 30px;
				.content_top{
					width: 98%;
					margin-bottom: 25px;
					.user_name{
						color: #FFFFFF;
						font-size: 18px;
						font-family:'Roboto-Bold';
						
					}
				}
				.content_table{
					width: 98%;
					// border: 1px solid #727272;					
					.table_header{
						height: 60px;
						display: flex;
						align-items: center;
						// justify-content: space-between;
						// border-bottom: 1px solid #727272;
						text-align: center;
						font-family:'Quicksand-Bold';
						background-color: #2A2E3F;
						.header_col{
							// width: 15%;
							width: 20%;
							height: 60px;
							line-height: 60px;
							// border-right: 1px solid #727272;
							color: #727272;
							&:last-child{
								border: none;
							}
						}
						.header_title{
							// width: 25%;
							// width: 30%;
						}
						.header_description{
							// width: 30%;
							// width: 25%;
						}
						.header_col_1{
							width: 15%;
							// width: 20%;
						}
					}
					.table_body{
						.no_data{
							font-size: 20px;
							color: #727272;
							text-align: center;
							height: 80px;
							line-height: 80px;
						}
						.body_row{
							display: flex;
							align-items: center;
							// height: 80px;
							text-align: center;
							font-family:'Roboto-Regular';
							border-bottom: 1px solid #727272;
							padding: 20px 0;
							.row_col{
								// width: 15%;
								width: 20%;
								// height: 80px;
								// line-height: 80px;
								// border-right: 1px solid #727272;
								color: #fff;
							}
							.text_title{
								// width: 25%;
								// width: 30%;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: none;
							}
							.text_description{
								// width: 30%;
								// width: 35%;
								display: flex;
								align-items: center;
								justify-content: center;
								img{
									width: 50%;
									height: 50%;
									object-fit: cover;
								}
							}
							.row_col_2{
								// width: 10%;
								// height: 80px;
								line-height: 80px;
								// border-right: 1px solid #727272;
								color: #fff;
							}
							.row_col_1{
								width: 15%;
								// width: 20%;
								// height: 80px;
								// line-height: 80px;
								// border-right: 1px solid #727272;
								color: #fff;
								display: flex;
								align-items: center;
								justify-content: center;
								.text{
									color:#0080FF;
								}
								.text_pointer{
									cursor: pointer;
								}
								.text_area{
									display: flex;
									align-items: center;
									.text_pass{
										color:#0080FF;
										cursor: pointer;
									}
									.text_line{
										color: #FFFFFF;
										margin: 0 10px;
									}
									.text_reject{
										color:#0080FF;
										cursor: pointer;
									}
								}
								.line{
									margin: 0 10px;
								}
								&:last-child{
									border: none;
								}
							}
						}
					}
				}
			}	
		}
		
	}
</style>
