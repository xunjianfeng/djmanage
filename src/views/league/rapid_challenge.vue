<template>
	<div class="index">
		<!-- <LeftView :index="3"></LeftView> -->
		<div class="container">
			<div class="content_right">
				<div class="content_title">Rapid Challenge</div>
				<div class="block_area">
					<div class="commodity_statistics">
						<div class="commodity_statistics_tit">Rapid Challenge Total</div>
						<div class="commodity_statistics_num">{{overview_detail.createdGames || 0}}<span></span></div><!-- 总rapid challenge创建（累加） -->
					</div>
					<div class="commodity_statistics">
						<div class="commodity_statistics_tit">Bountee's Reward (coins)</div>
						<div class="commodity_statistics_num">{{overview_detail.platformRewardCoins || 0}}<span>coins</span></div><!-- 平台所吸纳的coins(累加) -->
					</div>
					<div class="commodity_statistics">
						<div class="commodity_statistics_tit">Host's Reward (coins)</div>
						<div class="commodity_statistics_num">{{overview_detail.hostRewardCoins || 0}}<span>coins</span></div><!-- 平台给host的coins总额（累加） -->
					</div>
				</div>
				<!-- 筛选 -->
				<div class="screen_area">
					<div class="screen_left">
						<!-- <div class="search_span">订单状态：</div> -->
						<el-select  placeholder="请选择" v-model="isPublic" @change="handleFilter" style="margin-right: 20px;" :popper-append-to-body="false">
							<el-option label="All" value=""></el-option>
							<el-option label="Private" value="0"></el-option>
							<el-option label="Public" value="1"></el-option>
						</el-select>
					</div>
					<div class="screen_left">
						<!-- <div class="search_span">订单状态：</div> -->
						<el-select  placeholder="请选择状态" v-model="listQuery.roomStatus" @change="handleFilter" style="margin-right: 20px;" :popper-append-to-body="false">
							<el-option label="All" value=""></el-option>
							<el-option label="Waiting to start" value="WaitingToStart"></el-option>
							<el-option label="To Update" value="ToUpdate"></el-option>
							<el-option label="Complete" value="Complete"></el-option>
						</el-select>
					</div>
					<div class="date_select">
						<el-date-picker
							v-model="listQuery.minDate"
							type="date"
							placeholder="开始日期"
							value-format="yyyy-MM-dd">
						</el-date-picker>
						<span>-</span>
						<el-date-picker
							v-model="listQuery.maxDate"
							type="date"
							placeholder="结束日期"
							value-format="yyyy-MM-dd" @change="handleFilter">
						</el-date-picker>
						<img src="../../assets/images/date.png" class="date_icon" />
					</div>
				</div>
				
				<div class="content_table">
					<div class="table_header">
						<div class="header_1">Game Type</div>
						<div class="header_2">Date</div>
						<div class="header_3">Room Name</div>
						<div class="header_4">Type</div>
						<div class="header_4">Mode</div>
						<div class="header_5">Best of</div>
						<div class="header_6">
							Joined
						</div>
						<div class="header_7">Room's fee</div>
						<div class="header_8">Bountee's Reward</div>
						<div class="header_9">Host's coins</div>
						<div class="header_10">Status</div>
						<!-- <div class="header_10" v-if="switch_index == 2">Remark</div> -->
					</div>
					<div class="table_body">
						<div class="body_row" v-for="(item,index) in challeng_list">
							<div class="col_1">{{item.game.name}}</div>
							<div class="col_2">
								{{item.planningPlayTime}}
							</div>
							<div class="col_3">
								{{item.roomName}}
							</div>
							<div class="col_4">
								{{item.isPublic == true ? 'Public' : 'Private'}}
							</div>
							<div class="col_4">
								{{item.gameMode}}
							</div>
							<div class="col_5">
								{{item.bestOf}}
							</div>
							<div class="col_6"  @mouseenter="openResult(item.roomId)" @mouseleave="item.table_up = false">
								{{item.players || 0}}/ {{item.capacity || 0}}
								<div class="result_area" v-if="item.table_up == true">
									<div class="result_table">
										<div class="table_header">
											<div class="result_header">Team</div>
											<div class="result_header">Member</div>
											<div class="result_header">Status</div>
											<div class="result_header">Coins</div>
										</div>
										<div class="result_body">
											<div class="result_body_row" v-for="(ptem,pndex) in player_list">
												<div class="result_body_row_col">{{ptem.teamNo}}</div>
												<div class="result_body_row_col player_name">{{ptem.playerName}}</div>
												<div class="result_body_row_col">{{ptem.gameStatus}}</div>
												<div class="result_body_row_col">{{ptem.winCoins || 0}}</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="col_7">
								{{item.fee || 0}}
							</div>
							<div class="col_8">
								{{item.platformRewardCoins || 0}}
							</div>
							<div class="col_9">
								{{item.hostEarnCoins || 0}}
								<!-- 'color:#23B709':item.status=='Complete'?'color:#1890FF':'color:#ff0000'" -->
								<!-- <div @mouseover="changeOpenStatus(item.id)" :class="item.withdrawalStatus=='2'?'pointer':''"   @click="open_popup(item)"  :style="item.withdrawalStatus=='1' || item.withdrawalStatus == null?'color:#23B709':item.withdrawalStatus==3?'color:#1890FF':'color:#ff0000'">
									{{item.withdrawalStatus == 2 ?'申请中':item.withdrawalStatus == 3 ?'成功':item.withdrawalStatus == 4 ?'失败':'未申请'}}
								</div> -->
							</div>
							<div :class="item.roomStatus == 'WaitingToStart' ? 'col_10 text_color1' : item.roomStatus == 'ToUpdate' ? 'col_10 text_color3' : 'col_10 text_color2' ">
								{{item.roomStatus == 'WaitingToStart' ? 'Waiting To Start' : item.roomStatus == 'ToUpdate' ? 'To Update' : 'Complete'}}
							</div>
							<!-- <div class="col_10">
								{{item.roomStatus}}
							</div> -->
						</div>
					</div>
				</div>
				
				<!-- 分页 -->
				<div class="rank_pagination">
					<pagination v-show="total_count>0" :total="total_count" :page.sync="listQuery.page" :limit.sync="listQuery.size"
						@pagination="handlePageChange" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// import LeftView from '@/components/legue/left.vue'
	import {challengList,getAllChallenge,getPlayerDetail} from '@/api/challenge.js'
	import Listing from '@/mixin/Listing';
	import Pagination from '@/components/Pagination';
	export default{
		name:"rapid_challenge",
		mixins: [Listing],
		components:{
			// LeftView
			Pagination
		},
		data(){
			return{
				challeng_list:[],//查询快速挑战订单
				listQuery:{
					isPublic:'',//转成bollean后的 是否是公开房间
					roomStatus:'',//房间状态：WaitingToStart（等待开始）、ToUpdate（待上传游戏结果）、Complete（已完成）
					minDate:'',//开始时间
					maxDate:'',//结束时间
					page:1,
					size:10
				},
				isPublic:'',//转成bollean前的 是否是公开房间
				total_count:0,
				overview_detail:{},//快速挑战总览
				// table_up:false,	//joined的数据是显示房间玩家详情	true为打开弹窗，false为关闭显示
				player_list:[],	//显示房间玩家详情数据
			}
		},
		mounted() {
			this.getList()
			this.getChallengeOverview()
		},
		methods:{
			//查询快速挑战订单列表
			getList(){
				// this.listQuery.isPublic = Boolean(Number(this.isPublic))
				challengList(this.listQuery).then(res => {
					for(let i = 0; i < res.data.list.length;i++){
						res.data.list[i]['table_up'] = false
					}
					this.challeng_list = res.data.list
					this.total_count = res.data.total
				})
			},
			//获取快速挑战总览
			getChallengeOverview(){
				getAllChallenge().then(res => {
					this.overview_detail = res.data
				})
			},
			//鼠标滑过joined的数据是显示房间玩家详情
			openResult(roomId){
				// this.table_up = true
				for(let c = 0; c < this.challeng_list.length;c++){
					if(this.challeng_list[c].roomId == roomId){
						this.challeng_list[c]['table_up'] = true
					}else{
						this.challeng_list[c]['table_up'] = false
					}
				}
				getPlayerDetail({roomId}).then(res => {
					this.player_list = res.data
				})
			},
			//筛选
			handleFilter() {
				this.listQuery.isPublic = Boolean(Number(this.isPublic))
				this.listQuery.page = 1;
				this.getList()
			},
		}
	}
</script>

<style lang="less" scoped>
.container {
	// background: #33384B;
	// margin: 0 56px 0 224px;
	// padding-bottom:20px;
	width:93%;
	background: #33384B;
	margin: 0 56px;
	padding-bottom: 100px;
	.content_right{
		padding: 20px 20px 50px;
		.content_title{
			color: #FFFFFF;
			font-size: 21px;
			font-family:'Quicksand-Regular';
		}
		.block_area{
			padding: 30px 0 0 30px;
			.commodity_statistics {
				background-color: #2A2D41;
				width: 200px;
				padding: 20px;
				display: inline-block;
				margin-bottom: 20px;
				margin-right: 20px;
			
				.commodity_statistics_tit {
					color: rgba(255, 255, 255, 0.65);
					font-size: 13px;
					margin-bottom: 20px;
					font-family:'Roboto-Regular';
				}
			
				.commodity_statistics_num {
					color: #ffffff;
					font-size: 20px;
					padding-left: 10px;
					font-family:'Roboto-Bold';
					span {
						font-size: 14px;
						margin-left: 10px;
					}
				}
			}
			
		}
		.screen_area{
			display: flex;
			align-items: center;
			// justify-content: space-between;
			// padding: 30px 0 0 30px;
			padding-left: 30px;
			.screen_left {
				display: flex;
				align-items: center;
				margin-top: 20px;
				margin-right: 30px;
				.search_span {
					font-size: 14px;
					font-family:'Roboto-Regular';
					font-weight: 400;
					color: #FFFFFF;
				}
			
				/deep/ .el-select .el-input .el-input__inner {
					border: 0px;
					width: 300px;
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
					font-family:'Roboto-Regular';
					text-align: center;
				}
				/deep/ .el-select-dropdown__item.hover{
					background-color: #545873;
				}
				/deep/ .el-select-dropdown__item.selected{
					background-color: #545873;
				}
			}
			.date_select{
				display: flex;
				align-items: center;
				margin-top: 20px;
				margin-right: 30px;
				font-size: 14px;
				border: 1px solid #ACACAC;
				border-radius: 2px;
				span{
					color: rgba(255, 255, 255, 0.65);
					margin-right: 15px;
				}
				/deep/ .el-date-editor{
					width: 170px;
					background-color: #33384B;
					font-size: 14px;
					background-color: #33384B;
				}
				/deep/ .el-input{
					background-color: #33384B;
				}
				/deep/ .el-input__inner{
					background-color: #33384B;
					border: none;
					color: rgba(255, 255, 255, 0.65);
				}
				/deep/ .el-input__prefix .el-input__icon{
					color: #33384B;
				}
				/deep/.el-date-editor .el-range-separator{
					color: rgba(255, 255, 255, 0.65);
				}
				.date_icon{
					width: 15px;
					height: 15px;
					margin-right: 10px;
				}
			}
		}
		
		.content_table{
			width: 95%;
			// width: 1400px;
			margin-top: 16px;
			overflow-x: scroll;
			// padding-left: 30px;
			// margin-left: 30px;
			margin: 30px 0 0 30px;
			position: relative;
			.table_header{
				width: 140%;
				// overflow-x: scroll;
				// overflow: hidden;
				background-color: #2A2E3F;
				display: flex;
				align-items: center;
				color: #727272;
				font-size: 18px;
				height: 60px;
				border-bottom: 1px solid #2D2D2D;
				text-align: center;
				font-family:'Quicksand-Bold';
				div{
					height: 60px;
					line-height: 60px;
					// width: 50%;
				}
				.header_1, .header_2{
					// width: 100px;
					// width: 6%;
					width: 15%;
					// background-color: #F1FA8C;
				}
				.header_3, .header_4, .header_5, .header_6, .header_7, .header_8{
					// width: 290px;
					// width: 12%;
					width: 15%;
				}
				.header_5{
					text-align: center;
					// background-color: #F1C40F;
				}
				.header_9{
					// width: 250px;
					// width: 8%;
					width: 13%;
					// background-color: #F1FA8C;
				}
				.header_10{
					// width: 300px;
					// background-color: #F1FA8C;
					// width: 13%;
					width: 12%;
				}
				.header_6{
					position: relative;
				}
			}
			.table_body{
				// margin-left: 20px;
				width: 140%;
				.body_row{
					// width: 1000px;
					// overflow-x: scroll;
					display: flex;
					align-items: center;
					color: #ffffff;
					font-size: 18px;
					font-family:'Roboto-Regular';
					padding: 25px 0;
					border-bottom: 1px solid #595959;
					// div{
					// 	display: flex;
					// 	align-items: center;
					// 	text-align: center;
					// }
					.col_1{
						display: flex;
						justify-content: center;
					}
					.col_1, .col_2{
						// width: 100px;
						// width: 6%;
						width: 15%;
						display: flex;
						justify-content: center;
						text-align: center;
					}
					.col_3,.col_4, .col_5, .col_6, .col_7, .col_8{
						// width: 12%;
						// width: 290px;
						width: 15%;
						display: flex;
						justify-content: center;
						text-align: center;
						// width: 400px;
					}
					.col_3{
						overflow:hidden;
						text-overflow:ellipsis;
						white-space:nowrap
					}
					.col_6{
						position: relative;
						.result_area{
							position: absolute;
							top: 30px;
							// left: 50%;
							width: 600px;
							// height: 300px;
							background-color: #2A2E3F;
							// color: #FFFFFF;
							padding: 30px ;
							z-index: 999;
							.result_table{
								border: 1px solid #727272;
								.table_header{
									width: 100%;
									height: 60px;
									display: flex;
									align-items: center;
									// justify-content: space-between;
									border-bottom: 1px solid #727272;
									text-align: center;
									font-family:'Roboto-Bold';
									background-color: #2A2E3F;
									font-size: 16px;
									.result_header{
										// width: 33%;
										width: 50%;
										height: 60px;
										line-height: 60px;
										border-right: 1px solid #727272;
										color: #727272;
										&:last-child{
											border: none;
										}
									}
								}
								.result_body{
									.result_body_row{
										display: flex;
										align-items: center;
										height: 60px;
										text-align: center;
										font-family:'Roboto-Regular';
										border-bottom: 1px solid #727272;
										&:last-child{
											border: none;
										}
										.result_body_row_col{
											width: 50%;
											height: 60px;
											line-height: 60px;
											border-right: 1px solid #727272;
											color: #fff;
											&:last-child{
												border: none;
											}
										}
										.player_name{
											width: 50%;
											overflow: hidden;
											text-overflow: ellipsis;
											white-space: nowrap;
										}
									}
								}
							}
							
						}
						
					}
					.col_2{
						
					}
					.col_9{
						// width: 8%;
						// width: 250px;
						width: 13%;
						display: flex;
						justify-content: center;
						text-align: center;
					}
					
					.col_10{
						width:12%;
						display: flex;
						justify-content: center;
						text-align: center;
					}
					.text_color1{
						color: #FF971A;
					}
					.text_color2{
						color: #23B709;
					}
					.text_color3{
						color:#00AAFF;
					}
					.text_color4{
						color:#FF3636;
					}
				}
			}
			&::-webkit-scrollbar {
				/*滚动条整体样式*/
				width : 13px;  /*高宽分别对应横竖滚动条的尺寸*/
				height: 10px;
			}
			&::-webkit-scrollbar-thumb {
				/*滚动条里面小方块*/
				border-radius: 10px;
				box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
				background   : #2A2D41;
			}
			&::-webkit-scrollbar-track {
			/*滚动条里面轨道*/
				box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
				border-radius: 10px;
				background   : #595959;
			}
			
		}
		.rank_pagination{
			display: flex;
			justify-content: flex-end;
		}
	// 	.content_table{
	// 		// background-color: #2a2e3f;
	// 		border-radius: 20px;
	// 		margin-top: 30px;
	// 		.table_header{
	// 			background-color: #2a2e3f;
	// 			display: flex;
	// 			align-items: center;
	// 			padding: 20px 0;
	// 			color: #727272;
	// 			font-size: 17px;
	// 			// border-bottom: 2px solid #727272;
	// 			padding:20px 0;
	// 			margin: 0 30px;
	// 			font-family:'Roboto-Regular';
	// 			.header_1{
	// 				width: 10%;
	// 				margin-left: 10px;
	// 			}
	// 			.header_2{
	// 				width: 20%;
	// 			}
	// 			.header_3{
	// 				width: 15%;
	// 			}
	// 		}
	// 		.table_body{
	// 			margin: 0 30px;
	// 			.body_row{
	// 				color: #FFFFFF;
	// 				font-size: 18px;
	// 				display: flex;
	// 				align-items: center;
	// 				padding: 20px 0;
	// 				border-bottom: 1px solid #727272;
	// 				font-family:'Roboto-Regular';
	// 				.row_col_1{
	// 					width: 10%;
	// 					margin-left: 10px;
	// 				}
	// 				.row_col_2{
	// 					width: 20%;
	// 					display: flex;
	// 					align-items: center;
	// 					.host_img{
	// 						width: 36px;
	// 						height: 36px;
	// 						border-radius: 10px;
	// 						margin-right: 10px;
	// 						object-fit: cover;
	// 					}
	// 					.host_name{
	// 						text-decoration: underline;
	// 					}
	// 					.team_member{
	// 						width: 36px;
	// 						height: 36px;
	// 						border-radius: 15px;
	// 						margin-right: 5px;
	// 						object-fit: cover;
	// 					}
	// 				}
	// 				.row_col_3{
	// 					width: 15%;
	// 				}
	// 			}
	// 		}
	// 	}
	
	}
}
</style>
