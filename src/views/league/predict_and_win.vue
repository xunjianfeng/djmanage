<template>
	<div class="index">
		<div class="container">
			<!-- 设置竞猜赢家 -->
			<div class="mark_container2">
				<div class="mark_check" v-if="comp_status == true" @click.stop="comp_status = false" @click="closeStyle">
					<img src="@/assets/images/cancel.png" >
				</div>
				<div class="mark_bac" v-if="comp_status == true"></div>
				<div class="mark_check_container" v-if="comp_status == true">
					<div class="mark_my_content ">
						<div class="mark_text_one">Predict the Winner!</div>
						<!-- 胜利的队伍 -->
						<div class="content_top" v-if="victorious_team != ''">
							<div class="selected_user_list">
								<div :class="team_num == item.id ? 'user_selected_av' : 'user_selected'" v-for="(item,tndex) in victorious_team" :key='tndex' @click="swithc_choose(item.id)">
									<div :class="tndex+1 == 1?'text_rank': (tndex) == 2?'text_rank2': tndex+1 == 3 ? 'text_rank3':'text_rank4'">
										       {{tndex+1 == 1 ? '1st' : tndex+1 == 2 ? '2nd' : tndex+1 == 3 ? '3rd': tndex+1 +'rd'  }}
									</div>
									<div class="img_area">
										<img :src="HOST + item.teamLogo" />
									</div> 
									<div class="user_info">
										<div class="user_name">{{item.teamName}}</div>
									</div>
									<img v-if="team_num == item.id" @click="qr_team(item.id)" src="../../assets/images/del.png"  class="close_item"/>
								</div>
								<!-- <div class="user_add">
									<div class="text_rank">3rd</div>
									<div class="choose_team">
										<div class="text">Choose Team</div>
									</div>
								</div> -->
							</div>
							<div class="mark_my_foot">
								<div class="confirm_btn" @click="save_victory">Complete</div>
								<div class="cancel_btn" @click="qr_cancel">Cancel</div>
							</div>
						</div>
						<div class="line"></div>
						<!-- 选择哪些队伍获胜 -->
						<div class="block_text">Choose Team</div>
						<div class="mark_product_container">
							<div class="content_area">
								<div class="team_list"  v-for="(item,index) in predict_team" :key="index" >
									<div class="list_left">
										<div class="team_logo">
											<img :src="HOST + item.teamLogo" />
										</div>
										<div class="team_info"> 
											<el-tooltip class="item" effect="dark" :content="item.teamName" placement="bottom">
												<div class="team_name">{{item.teamName}}</div>
											</el-tooltip>
											<!-- <div class="game_type">{{item.teamDescription}}</div> -->
										</div>
										<div class="team_intro">
											<!-- {{item.team.teamSlogan}} -->
											{{item.teamDescription}}
										</div>
									</div>
									<div class="list_right">
										<div class="choose_btn" @click="get_Choose(item)" v-if="item.choose_status == false">Choose</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- end -->
			<!-- 内容区 -->
			<div class="predict_container">
				<div class="container_header">
					<div class="nav_left">
						<div class="header_nav av">
							<div class="nav_name">Processing({{predict_list.length || 0}})</div>
							<div class="nav_line"></div>
						</div>
					</div>
				</div>
				<div class="content_block">
					<div class="content_top">
						<div class="choice_left">
							<div class="sort_by">
								<div class="sort_by_text">Date of Application</div>
								<div class="options_select">
									<el-select placeholder="请选择" :popper-append-to-body="false" v-model="listQuery.order" @change="selectOne">
										<el-option v-for="item in reorder" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>								
								</div>
							</div>
							<!-- <div class="search_block">
								<div class="search">
									<input placeholder="Seacrh host name" v-model="listQuery.keyword"/>
									<button class="btn" @click="getList()">
										<img src="../../assets/images/2search.png" />
									</button>
								</div>
							</div> -->
						</div>
						<div class="choice_right">
							<div class="export_block" @click="jump_predice"> <!-- @click="open_add_voucher" -->
								Create New Predict
							</div>
						</div>
					</div>
					<div class="content_table">
						<div class="table_header">
							<div class="header_first"></div>
							<div class="header_1">Poster</div>
							<div class="header_1">Predict Title</div>
							<div class="header_1">Game Type</div>
							<div class="header_2">Predict Time</div>
							<div class="header_2">Prize</div>
							<div class="header_1">Join Predict</div>
							<div class="header_1">Rate</div>
							<div class="header_last"></div>
						</div>
						<div class="table_body">
							<div class="body_row" v-for="(item,index) in predict_list" :key="index">
								<div class="row_col_first" @click="jump_info(item.id)" style="text-align: center;">{{item.id}}.</div>
								<div class="row_col_1" @click="jump_info(item.id)">
									<img class="poster" :src="HOST + item.poster" />
								</div>
								<div class="row_col_1 " @click="jump_info(item.id)">
									<div class="col_title">{{item.title}}</div>
								</div>
								<div class="row_col_1" @click="jump_info(item.id)">
									<el-image :src="HOST + item.game.logo" style="width: 46px;height: 47px;border-radius: 23px;margin-right: 5px;object-fit: cover;">
										<div slot="error" class="image-slot">
											<img src="../../assets/images/default_game.png" style="width: 46px;height: 47px;border-radius: 23px;margin-right: 5px;object-fit: cover;" />
										</div>
									</el-image>
									<!-- <el-image style="width: 46px;height: 47px;border-radius: 23px;margin-right: 5px;object-fit: cover;" :src="HOST + item.game.logo" :preview-src-list="[HOST + item.game.logo]"></el-image> -->
									<!-- <img class="game_logo" :src="HOST + item.game.logo" /> -->
									<div class="text">{{item.game.name}}</div>
								</div>
								<div class="row_col_2" @click="jump_info(item.id)">{{item.startTime}} to {{item.endTime}}</div>
								<div class="row_col_2" @click="jump_info(item.id)">{{item.totalPrize}} Coins</div>
								<div class="row_col_1" @click="jump_info(item.id)">
									<img class="eye_btn" src="../../assets/images/eye.png" />
									<div class="text">{{item.registeredPersons}} Person</div>
								</div>
								<div class="row_col_1">{{item.commissionRate}}</div>
								<div class="row_col_last">
									<div class="complete_btn" v-if="item.completed != true" @click="open_complete(item.id,item.predictTeamCount)">Complete</div>
									<div class="completed_btn" v-if="item.completed == true">Completed</div>
								</div>
							</div>
						</div>
					</div>
					<!-- 分页 -->
					<div class="rank_pagination">
						<pagination v-show="total_count>0" :total="total_count" :page.sync="listQuery.page" :limit.sync="listQuery.size"
							@pagination="handlePageChange" @page_change="pageChange" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {
		predictListPage,
		predictTeams,
		predictComplete
	} from '@/api/league'
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
		components:{
			Pagination
		},
		name:'predict_and_win',
		data(){
			return{
				comp_status:false,
				rake_text:'',
				team_num:'',
				reorder: [
					{
						value: 'NEW_TO_OLD',
						label: 'new to old'
					},
					{
						value: 'OLD_TO_NEW',
						label: 'old to new'
					},
				],
				listQuery: {
					order: 'NEW_TO_OLD',   // NEW_TO_OLD表示从新到旧，OLD_TO_NEW表示从旧到新
					keyword: '', // 搜索关键字
					top: '',   // 是否置顶，true表示置顶，false表示不置顶
					page: 1,
					size:10
				},
				total_count: 0,
				predict_list:[],
				predict_team:'', //弹窗 战队
				victorious_team:[], //获胜队伍
				team_Count:'', // 获胜队伍不能超过参与竞猜时需要选择的队伍数量 
				predictId:'', //竞猜ID
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
			closeStyle(){
				this.$emit("closeStyle")	//发送恢复样式事件
			},
			selectOne(event) {     //change 触发事件
				//直接就拿到当前的这个对象了
				this.getList();
			},
			// 打开 设置胜利队伍弹窗
			open_complete(id,predictTeamCount){
				let that = this;
				that.getTeams(id);
				that.predictId = id;
				that.team_Count = predictTeamCount
				console.log('predictTeamCount:'+ predictTeamCount)
				that.comp_status = true;
				this.$emit("changeStyle")
			},
			// 获取竞猜战队列表
			getTeams(predictId) {
				let that = this;
				let predictam = []
				let params = {
					predictId,
					size:0
				}
				predictTeams(params).then(res => {
					predictam = res.data
					for (let i = 0; i < predictam.length; i++) {
						predictam[i].choose_status = false
					}
					that.predict_team = predictam
				})
			},
			// 选择获胜队伍
			get_Choose(item){
				let that = this;
				let { id } = item;
				for (let i in that.predict_team) {
				 	if(that.predict_team[i].id == id){
						that.predict_team[i].choose_status = true
						if(that.predict_team[i].choose_status == true){
							that.victorious_team.push(that.predict_team[i])
							console.log(that.victorious_team,"victorious_team")
							if(that.victorious_team.length > that.team_Count){
								that.$message({
									message: '获胜队伍不能超过参与竞猜队伍数量！！！',
									type: 'warning'
								})
								that.predict_team[i].choose_status = false
								//选择的队伍大于可选择的数量时删除最后一个添加的队伍，数组的最后一个
								that.victorious_team.pop()
							}
						}
					}
				}
			},
			//将选中的队伍id缓存一下
			swithc_choose(id){
				let  that = this;
				that.team_num = id
			},
			//取消获胜团队
			qr_team(id){
				let  that = this;
				for (let i in that.predict_team) {
				 	if(that.predict_team[i].id == id){
						let is_index = that.victorious_team.findIndex((value)=>value["id"] == id ) //获取是否有被选中返回值来进行判断
						that.victorious_team.splice(is_index,1)
						that.predict_team[i].choose_status = false
					}
				}
			},
			// 结束竞猜
			save_victory() {
				let that = this;
				let  victoryTeamIds = []
				for (let i in that.victorious_team) {
					victoryTeamIds.push(that.victorious_team[i].id)
				}
				let params = {
					predictId:that.predictId,
					victoryTeamIds:victoryTeamIds.toString()
				}
				predictComplete(params).then(res => {
					this.$message({
						type: 'success',
						message: res.message
					});
					that.comp_status = false;
					this.getList()
					this.$emit("closeStyle")//发送事件
				})
			},
			//取消结束竞猜
			qr_cancel(){
				let that = this;
				that.victorious_team = []
				that.comp_status = false
				this.$emit("closeStyle")//发送事件
			},
			// 列表
			getList() {
				let that = this;
				predictListPage(that.listQuery).then(res => {
					const {
						list,total
					} = res.data
					that.total_count = total
					that.predict_list = list;
				})
			},
			
			jump_info(id){
				// this.$router.push({path: '/league/predict_info',query: {news: JSON.stringify(news)}})
				this.$router.push({path: '/league/predict_info',query: {id}})
			},
			jump_predice(){
				this.$router.push({ path: '/league/create_predict'})
			}
			
		}
	}
</script>

<style lang="less" scoped>
.container {
	width:93%;
	background: #33384B;
	margin: 0 56px;
	padding-bottom: 100px;
	.mark_container2{
		// Check out 01弹窗 start
		.mark_check{
			position: absolute;
			right: 80px;
			top: 5px;
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
			left: 337px;
			top: 100px;
			z-index: 999;
			width: 850px;
			padding: 48px 45px 50px;
			// background: #0E0F11;
			background-color: #33384B;
			border-radius: 27px;
			overflow: hidden;
			display: flex;
			flex-flow: column;
			align-items: center;
			text-align: left;
			.mark_my_content{
				width: 100%;
				margin-bottom: 10px;
				text-align: center;
				.mark_text_one{
					color: #DBA83F;
					font-size: 24px;
					// text-align: center;
					margin-bottom: 50px;
				}
				.content_top{
					.selected_user_list{
						margin-top: 20px;
						display: flex;
						flex-wrap: wrap;
						justify-content: center;
						
						.user_selected{
							// width: 200px;
							width: 22%;
							// height: 116px;
							// height: 240px;
							// background-color: #000000;
							background-color: #2a2e3f;
							padding: 30px 10px;
							margin: 0 0 20px 25px;
							border-radius: 20px;
							// margin-bottom: 20px;
							// line-height: 230px;
							// text-align: center;
							.text_rank{
								color: #D3AA53;
								font-size: 20px;
							}
							.text_rank2{
								color: #8C8C8C;
								font-size: 20px;
							}
							.text_rank3{
								color: #A8684C;
								font-size: 20px;
							}
							.text_rank4{
								color: #ffffff;
								font-size: 20px;
							}
							.img_area{
								margin-top: 20px;
								img{
									width: 86px;
									height: 86px;
									border-radius: 43px;
									object-fit: cover;
								}
							}
							.user_info{
								display: block;
								margin-top: 20px;
								.user_name{
									color: #ffffff;
									font-size: 18px;
								}
							}
						}
						
						.user_selected_av{
							width: 22%;
							// background-color: #000000;
							background-color: #2a2e3f;
							padding: 30px 10px;
							margin: 0 0 20px 25px;
							border-radius: 20px;
							border: 1px solid #DBA83F;
							position: relative;
							.text_rank{
								color: #D3AA53;
								font-size: 20px;
							}
							.text_rank2{
								color: #8C8C8C;
								font-size: 20px;
							}
							.text_rank3{
								color: #A8684C;
								font-size: 20px;
							}
							.text_rank4{
								color: #ffffff;
								font-size: 20px;
							}
							.img_area{
								margin-top: 20px;
								img{
									width: 86px;
									height: 86px;
									border-radius: 43px;
									object-fit: cover;
								}
							}
							.user_info{
								display: block;
								margin-top: 20px;
								.user_name{
									color: #ffffff;
									font-size: 18px;
								}
							}
							
							.close_item{
								position: absolute;
								top: -20px;
								right: -20px;
								width: 45px;
								height: 45px;
							}
						}
						
						.user_add{
							width: 22%;
							height: 180px;
							// background-color: #000000;
							background-color: #2a2e3f;
							padding: 30px 10px;
							margin: 0 0 20px 25px;
							border-radius: 20px;
							border-radius: 20px;
							.text_rank{
								color: #A8684C;
								font-size: 20px;
								// margin-top: 25px;
							}
							.choose_team{
								height: 150px;
								display: flex;
								align-items: center;
								justify-content: center;
								.text{
									color: #5B5B5B;
									font-size: 20px;
								}
							}
						}
					}
					.mark_my_foot{
						margin: 35px 0;
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
						.confirm_btn{
							cursor: pointer;
							background-color: #D3AA53;
							color: #000;
							border-radius: 25px;
							width: 100px;
							height: 40px;
							text-align: center;
							line-height: 40px;
							font-size: 16px;
							margin-right: 30px;
						}
						.cancel_btn{
							cursor: pointer;
							// background-color: #D3AA53;
							border: 1px solid #666666;
							border-radius: 25px;
							width: 100px;
							height: 40px;
							text-align: center;
							line-height: 40px;
							font-size: 16px;
							color: #fff;
						}
					}								
				}
				.line{
					background-color: #ffffff;
					width: 100%;
					height: 1px;
					margin-bottom: 20px;
					// margin-top: 20px;
				}
				.block_text{
					color: #ffffff;
					font-size: 22px;
				}
				.mark_product_container{
					width: 100%;
					height: 496px;
					overflow-y: scroll;
					margin-top: 30px;
					// margin-bottom: 28px;
					padding-right: 20px;
					padding-bottom: 20px;
					// border-bottom: 2px solid #2D2D2D;
					.content_area{
						// background-color: #03060D;
						background-color: #2a2e3f;
						border-radius: 22px 22px 0px 0px;
						padding: 20px 30px;
						.team_list{
							width: 100%;
							display: flex;
							align-items: center;
							justify-content: space-between;
							// border-bottom: 2px solid #2D2D2D;
							border-bottom: 2px solid #727272;
							padding: 30px 0;
							.list_left{
								width: 85%;
								display: flex;
								align-items: center;
								.team_logo{
									img{
										width: 93px;
										height: 93px;
										border-radius: 46px;
									}
								}
								.team_info{
									width: 30%;
									margin: 0 30px;
									text-align: left;
									.team_name{
										color: #FFFFFF;
										font-size: 20px;
										overflow: hidden;
										text-overflow: ellipsis;
										white-space: nowrap;
									}
									.game_type{
										color: #727272;
										font-size: 18px;
										margin-top: 10px;
									}
								}
								.team_intro{
									width: 50%;
									text-align: left;
									color: #727272;
									font-size: 18px;
								}
							}
							.list_right{
								width: 10%;
								.choose_btn{
									color: #DBA83F;
									font-size: 18px;
									cursor: pointer;
								}
							}
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
					// background   : #2B2B2B;
					background: #727272;
					}
					&::-webkit-scrollbar-track {
					/*滚动条里面轨道*/
					box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
					border-radius: 10px;
					// background   : #000000;
					background:  #2a2e3f;
					}
				}
				
			}
			
			.mark_my_foot{
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				.confirm_btn{
					cursor: pointer;
					background-color: #D3AA53;
					color: #000;
					border-radius: 25px;
					width: 100px;
					height: 40px;
					text-align: center;
					line-height: 40px;
					font-size: 16px;
					margin-right: 30px;
				}
				.cancel_btn{
					cursor: pointer;
					// background-color: #D3AA53;
					border: 1px solid #666666;
					border-radius: 25px;
					width: 100px;
					height: 40px;
					text-align: center;
					line-height: 40px;
					font-size: 16px;
					color: #fff;
				}
			}
		}
		//Check out 01弹窗  end
	}
	
	.predict_container{
		.container_header{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 30px 20px 0;
			.nav_left{
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-family:'Quicksand-Regular';
				// padding-bottom: 30px;
				.header_nav{
					color: #ffffff;
					font-size: 21px;
					text-align: left;
					margin-right: 62px;
					.nav_name{
						height: 35px;
					}
					.nav_line{
						width: 40%;
						height: 2px;
					}
				}
				.av{
					color: #DBA83F;
					.nav_line{
						width: 40%;
						height: 2px;
						background-color: #DBA83F;
					}
				}
			}
			.nav_right{
				img{
					width: 45px;
					height: 45px;
				}
			}
		}//container_header
		.content_block{
			padding: 0 30px;
			.content_top{
				display: flex;
				align-items: flex-end;
				justify-content: space-between;
				margin-top: 40px;
				.choice_left{
					display: flex;
					align-items: flex-end;
					.sort_by{
						margin-right: 26px;
						.sort_by_text{
							font-size: 18px;
							text-align: left;
							letter-spacing: 0px;
							color: #727272;
							opacity: 1;
							margin-bottom: 11px;
						}
						.options_select{
							/deep/ .el-select .el-input .el-input__inner {
								border: 0px;
								width: 230px;
								height: 59px;
								padding: 0 20px;
								font-size: 18px;
								color: #fff;
								border-radius: 20px;
								background-color: #2a2e3f;
								font-family:'Roboto-Regular';
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
					.search_block{
						display: flex;
						flex-direction: column;
						justify-content: flex-end;
						cursor: pointer;
						.search{
							background: #2a2e3f;
							border-radius: 23px;
							input{
								width: 215px;
								height: 60px;
								background: #2a2e3f;
								border-radius: 23px;
								font-size: 18px;
								border: none;
								padding-left: 35px;
								color: #fff;
								font-family:'Roboto-Regular';
							}
							.btn{
								width: 60px;
								height: 60px;
								background: #D3AA53;
								border: none;
								border-radius: 22px;
								opacity: 1;
								cursor: pointer;
								img{
									width: 22px;
									height: 22px;
								}
							}
						}
					}
					
				}
				.choice_right{
					display: flex;
					flex-direction: column;
					justify-content: flex-end;
					.export_block{
						display: flex;
						align-items: center;
						height: 60px;
						color: #DBA83F;
						font-size: 18px;
						cursor: pointer;
						font-family:'Roboto-Bold';
						img{
							width: 22px;
							height: auto;
							margin-right: 20px;
						}
					}
				}
			}
			.content_table{
				margin-top: 16px;
				.table_header{
					width: 100%;
					background-color: #2A2E3F;
					display: flex;
					align-items: center;
					color: #727272;
					font-size: 17px;
					height: 60px;
					border-bottom: 1px solid #2D2D2D;
					text-align: left;
					font-family:'Roboto-Regular';
					.header_first{
						width: 5%;
					}
					.header_1{
						width: 12%;
					}
					.header_2{
						width: 15%;
					}
					// .header_3{
					// 	width: 15%;
					// }
					
					.header_last{
						width: 8%;
						
					}
					
				}
				.table_body{
					.body_row{
						width: 100%;
						display: flex;
						align-items: center;
						color: #ffffff;
						font-size: 18px;
						// height: 80px;
						padding: 10px 0;
						border-bottom: 1px solid #595959;
						height: 60px;
						font-family:'Roboto-Regular';
						.row_col_first{
							width: 5%;
							
						}
						.row_col_1{
							width: 12%;
							display: flex;
							align-items: center;
							.poster{
								width: 122px;
								height: 59px;
								object-fit: cover;
							}
							.game_logo{
								width: 46px;
								height: 47px;
								border-radius: 23px;
								margin-right: 5px;
								object-fit: cover;
							}
							.eye_btn{
								width: 28px;
								height: 19px;
								margin-right: 5px;
								cursor: pointer;
							}
							.col_title{
								width: 90%;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}
						}
						
						.row_col_2{
							width: 15%;
						}
						.row_col_last{
							width: 8%;
							// background-color: #00FF00;
							
							.complete_btn{
								width: 100px;
								height: 44px;
								line-height: 44px;
								text-align: center;
								background-color: #E5A518;
								font-size: 16px;
								color: #0E0F11;
								border-radius: 8px;
								font-family:'Roboto-Regular';
								cursor: pointer;
							}
							.completed_btn{
								width: 100px;
								height: 44px;
								line-height: 44px;
								text-align: center;
								border: 1px solid #E5A518;
								// background-color: #E5A518;
								font-size: 16px;
								color: #E5A518;
								border-radius: 8px;
								font-family:'Roboto-Regular';
							}
						}
					}
				}
			}//content_table
			.rank_pagination{
				display: flex;
				justify-content: flex-end;
			}
		}
	}
}
</style>
