<template>
	<div class="index">
		<div class="container">
			<!-- 查看内容弹窗 -->
			<div class="view_detail">
				<div class="mark_cancel"  v-if="detail_up == true" @click.stop="detail_up = false">
					<img src="../../assets/images/close.png" />
				</div>
				<div class="mark_bac" v-if="detail_up == true"></div>
				<div class="mark_content" v-if="detail_up == true">
					<div class="content_top">
						<div class="top_left">
							<div class="title">Selected New Team</div>
							<div class="selected">Select: {{teamIds.length || 0}} team</div>
						</div>
						<div class="delete">
							<div class="search_block">
								<div class="search">
									<input placeholder="Seacrh team name" v-model="listQuery.host_name"/>
									<button class="btn" @click="get_list(listQuery.host_name)">
										<img src="../../assets/images/2search.png" />
									</button>
								</div>
							</div>
							<!-- <img src="../../assets/images/delete_gray.png"  v-if="listQuery.type == 1"/> -->
							<!-- <img src="../../assets/images/recycle.png" v-if="listQuery.type == 3" @click="open_add_voucher"/> -->
						</div>
					</div>
					<div class="content_block">
						<div id="text_area" >
							<div class="team_list" v-for="(item,index) in list_team" :key="index">
								<div class="list_left">
									<img v-if="item.teamLogo != '' && item.teamLogo != null" :src="HOST + item.teamLogo" class="team_logo"/>
									<div class="team_info">
										<div class="team_name">{{item.teamName}}</div>
										<div class="game_type">{{item.gameName}}</div>
									</div>
								</div>
								<!-- <div class="list_right" v-if="item.add_team_status == true">
									<div class="btn_label">Remove</div>
								</div> -->
								<div class="list_right">
									<div class="select_btn"v-if="item.select_status == false"@click="add_click(item.teamId)">Select</div>
									<div class="selected_btn" v-if="item.select_status == true"  @click="add_click(item.teamId)">Selected</div>
								</div>
							</div>
						</div>
					</div>
					<div class="btn_area">
						<div class="save_btn" @click="addTeam">Add</div>
						<div class="cancel_btn" @click="detail_up = false">Cancel</div>
					</div>
				</div>
			</div>
			<!-- end -->
			<div class="league_switch">
				<div class="switch_head">
					<div class="switch_h_block" @click="jump_league"><<</div>
					<div class="switch_h_block switch_h_av" v-if="leagueItem.leagueType == 'Premier'">Premier (Tab)</div>
					<div class="switch_h_block switch_h_av" v-if="leagueItem.leagueType == 'Armature'">Amateur (Tab)</div>
				</div>
				<div class="switch_bottom">
					<LeagueSwitch :index="1"></LeagueSwitch>
				</div>
			</div>
			<div class="content_top">
				<div class="choice_left">
					<div class="search_block">
						<div class="search">
							<input placeholder="Seacrh team name" v-model="listQuery.teamName"/>
							<button class="btn" @click="teamList()">
								<img src="../../assets/images/2search.png" />
							</button>
						</div>
					</div>
				</div>
				<div class="choice_right">
					<div class="export_block" @click="get_list();detail_up = true"> <!-- @click="open_add_voucher" -->
						Add New Team
					</div>
				</div>
			</div>
			<div class="league_result_container">
				<div class="teams_list_area">
					<div class="teams_list" v-for="(item,index) in team_list" :key="index" @mouseenter="showMemeber(item.teamId)" @mouseleave="closeMember(item.teamId)">
						<div class="block_1">
							<div class="team_logo">
								<img :src="HOST + item.teamLogo" />
							</div>
							<div class="team_info">
								<el-tooltip class="item" effect="dark" :content="item.teamName" placement="bottom">
									<div class="team_name">{{item.teamName}}</div>
								</el-tooltip>
								<!-- <div class="team_name">{{item.teamName}}</div> -->
								<div class="game_type">{{item.gameName}}</div>
							</div>
						</div>
						<div class="block_2" v-if="item.show_status == false">
							<div class="team_intro">
								{{item.aboutTeam}}
							</div>
						</div>
						<div class="block_3" v-if="item.show_status == false">
							<div class="rank_1">
								<img src="../../assets/images/rank4.png" />
								<div class="rank_num">{{item.champions}}</div>
							</div>
							<div class="rank_2">
								<img src="../../assets/images/rank5.png" />
								<div class="rank_num">{{item.runnerUps}}</div>
							</div>
							<div class="rank_3">
								<img src="../../assets/images/rank6.png" />
								<div class="rank_num">{{item.thirdPlaces}}</div>
							</div>
						</div>
						<div class="team_member_list" v-if="item.show_status == true">
							<div class="team_member">
								<div class="member_block" v-for="(mtem,mndex) in member_list" :key="mndex">
									<el-image :src="HOST + mtem.avatar" class="member_avatar">
										<div slot="error" class="image-slot">
											<img src="../../assets/images/default.png" class="member_avatar" />
										</div>
									</el-image>
									<!-- <img :src="HOST + mtem.avatar" class="member_avatar" v-if="mtem.avatar"/> -->
									<!-- <img src="../../assets/images/default.png" class="member_avatar" v-else /> -->
									<el-tooltip class="item" effect="dark" :content="mtem.fullName" placement="bottom">
										<div class="member_name">{{mtem.fullName}}</div>
									</el-tooltip>
									<!-- <div class="member_name">{{mtem.fullName}}</div> -->
								</div>
							</div>
						</div>
						<div class="block_4">
							<div class="join_btn" @click="deleteBatch(item.teamId)">Remove</div>
						</div>
					</div>
					
				</div>	
			
			</div>
		</div>
	</div>
</template>

<script>
	import LeagueSwitch from '@/components/league/league.vue'
	import {listTeam} from '@/api/play.js';
	import {addBatch,deleteBatch,teamFindList} from '@/api/league.js';
	import {teamUsers} from '@/api/play.js'
	export default {
		name: "teams",
		components:{
			LeagueSwitch
		},
		data() {
			return {
				h_swith:1,
				detail_up:false,
				// select_status:false,
				member_list:[],
				team_list:[],
				listQuery: {
					leagueId: this.$route.query.id,
					order: {create_time:'desc'},
					teamName: '',
					type: 1,
					page: 1,
					size: 10
				},
				list_team:[],
				teamIds:[],
				leagueItem:''
			}
		},
		mounted() {
			// 联赛战队列表
			this.teamList()
			this.leagueItem = JSON.parse(sessionStorage.getItem("leagueItem"))
			// console.log(sessionStorage.getItem("leagueItem"))
		},
		methods: {
			hswith(index){
				this.h_swith = index
			},
			jump_league(){
				this.$router.push({ path: '/league/league'})
			},
			// 联赛战队列表
			teamList() {
				let that = this;
				let params = {
					leagueId: this.$route.query.id||'',
					teamName:this.listQuery.teamName
				}
				teamFindList(params).then(res => {
					for(let i = 0; i < res.data.list.length;i++){
						res.data.list[i]['show_status'] = false
					}
					that.team_list = res.data.list
					console.log('竞赛列表')
					console.log(that.team_list)
				})
			},
			// 删除联赛战队
			deleteBatch(teamIds) {
				let params = {
					leagueId: this.$route.query.id||'',
					teamIds
				}
				this.$confirm('是否删除该战队?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					deleteBatch(params).then(res => {
						this.$message({
						  message: res.message,
						  type: 'success'
						});
						this.teamList()
					})
				})
				
			},
			get_list(teamName){
				let params = {
					teamName: teamName|| '',
					size: 0
				}
				listTeam(params).then(res => {
					for(let a = 0; a< (res.data.list).length; a++){
						res.data.list[a]['select_status'] = false;
					}
					this.list_team = res.data.list
					console.log(this.list_team)
				})
			},
			// 添加联赛战队
			addTeam() {
				let params = {
					teamIds: this.teamIds.join(','),
					leagueId: this.$route.query.id
				}
				addBatch(params).then(res => {
					this.$message({
					  message: res.message,
					  type: 'success'
					});
					this.detail_up = false
					this.teamList()
				})
			},
			add_click(teamId){
				console.log(teamId)
				let that = this
				// this.add_team_status = ! this.add_team_status
				let arr = []
				for(let i=0;i<that.list_team.length;i++){
					if(that.list_team[i].teamId == teamId){
						// that.list_team[i]['select_status']  = true
						that.list_team[i]['select_status']  = !that.list_team[i]['select_status']
					}else{
						// that.list_team[i]['select_status']  = false
					}
				}
				for(let j=0;j<that.list_team.length;j++){
					if(that.list_team[j]['select_status'] == true){
						arr.push(that.list_team[j].teamId)
					}
				}
				that.teamIds = arr
				console.log(that.teamIds)
				
				
			},
			//鼠标划入显示战队成员
			showMemeber(teamId){
				// console.log(teamId)
				// this.show_status = true
				teamUsers({teamId}).then(res => {
					this.member_list = res.data.usrs
					console.log(this.member_list)
				})
				for(let a = 0; a< this.team_list.length; a++){
					if(this.team_list[a].teamId == teamId){
						this.team_list[a].show_status = true
					}else{
						
					}
				}
			},
			//鼠标滑出关闭显示
			closeMember(teamId){
				for(let a = 0; a< this.team_list.length; a++){
					if(this.team_list[a].teamId == teamId){
						this.team_list[a].show_status = false
					}
				}
			}
		}

	}
</script>
<style lang="less" scoped>
	.container {
		// width: calc(100% - 191px);
		// margin-left: 72px;
		width:93%;
		background: #33384B;
		margin: 0 56px;
		// padding-bottom: 100px;
		padding: 30px 20px 100px;
		.view_detail{
			position: relative;
			left: 160px;
			top: 70px;
			
			.mark_cancel{
				width: 50px;
				height: 50px;
				position: absolute;
				right: 180px;
				top: -90px;
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
				width: 890px;
				// height: 674px;
				background: #33384B;
				border-radius: 25px;
				position: absolute;
				left: 100px;
				z-index: 999;
				.content_top{
					display: flex;
					align-items: center;
					justify-content: space-between;
					// margin: 40px 50px 10px 86px;
					// padding-left: 0 30px;
					// margin-left: 30px;
					padding-bottom: 10px;
					.top_left{
						margin-left: 60px;
						display: flex;
						align-items: center;
						.title{
							color: #DBA83F;
							font-size: 22px;
							font-family:'Quicksand-Bold';
						}
						.selected{
							color: #727272;
							font-size: 16px;
							margin-left: 20px;
							font-family:'Roboto-Regular';
						}
					}
					.delete{
						display: flex;
						// align-items: flex-end;
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
				}
				.content_block{
					padding-left: 86px;
					// padding-right: 50px;
					margin-top: 40px;
					#text_area{
						width: 740px;
						height: 450px;
						border: 1px solid black;
						overflow-y:scroll;
						// line-height:1;
						color: #7C7C7C;
						font-size: 18px;
						border: none;
						padding-right: 20px;
						.team_list{
							display: flex;
							align-items: center;
							justify-content: space-between;
							border-bottom: 1px solid #727272;
							padding: 20px 20px 20px 0;
							.list_left{
								display: flex;
								align-items: center;
								.team_logo{
									width: 88px;
									height: 88px;
									border-radius: 44px;
									
								}
								.team_info{
									margin-left: 20px;
									.team_name{
										color: #FFFFFF;
										font-size: 24px;
										font-family:'Roboto-Bold';
									}
									.game_type{
										color: #727272;
										font-size: 18px;
										margin-top: 5px;
										font-family:'Roboto-Regular';
									}
								}
							}
							.list_right{
								.btn_label{
									color: #FF2F06;
									font-size: 18px;
								}
								.select_btn{
									width: 80px;
									height: 40px;
									background-color: #DBA83F;
									color: #FFFFFF;
									font-size: 16px;
									border-radius: 8px;
									text-align: center;
									line-height: 40px;
									font-family:'Roboto-Bold';
									cursor: pointer;
								}
								.selected_btn{
									width: 80px;
									height: 40px;
									// background-color: #DBA83F;
									border: 1px solid #DBA83F;
									color: #DBA83F;
									font-size: 16px;
									border-radius: 8px;
									text-align: center;
									line-height: 40px;
									font-family:'Roboto-Regular';
									cursor: pointer;
								}
							}
						}
						
					}
					#text_area::-webkit-scrollbar {
						/*滚动条整体样式*/
						width : 15px;  /*高宽分别对应横竖滚动条的尺寸*/
						height: 1px;
						background-color: #33384B;
					}
					#text_area::-webkit-scrollbar-thumb {
						/*滚动条里面小方块*/
						border-radius   : 10px;
						background-color: #595959;
					}
					#text_area::-webkit-scrollbar-track {
						/*滚动条里面轨道*/
						background   : #7C7C7C;
						border-radius: 10px;
					}
				}
				.btn_area{
					padding: 50px 0;
					display: flex;
					align-items: center;
					justify-content: center;
					.save_btn{
						width: 163px;
						height: 58px;
						background: #DBA83F;
						border-radius: 25px;
						color: #0E0F11;
						font-size: 20px;
						text-align: center;
						line-height: 58px;
						font-family:'Roboto-Regular';
						cursor: pointer;
					}
					.cancel_btn{
						width: 163px;
						height: 58px;
						border: 1px solid #777777;
						border-radius: 25px;
						color: #ffffff;
						font-size: 20px;
						text-align: center;
						line-height: 58px;
						margin-left: 30px;
						font-family:'Roboto-Regular';
						cursor: pointer;
					}
				}
			}
		}
		
		.league_head{
			display: flex;
			align-items: center;
			padding:46px 0 32px 0 ;
			border-bottom: 1px solid #2D2D2D;
			.league_head_text{
				color: #FFFFFF;
				font-size: 24px;
				font-weight: bold;
			}
			.league_head_spot{
				width: 8px;
				height: 8px;
				background-color: #FFFFFF;
				border-radius: 50%;
				margin: 0 20px;
			}
		}
		.league_switch{
			.switch_head{
				display: flex;
				align-items: center;
				margin: 0px 0 52px;
				font-family:'Quicksand-Regular';
				.switch_h_block{
					font-size: 24px;
					color: #FFFFFF;
					// cursor: pointer;
					margin-right: 70px;
					cursor: pointer;
				}
				.switch_h_block:last-child{
					margin-right: 0;
				}
				.switch_h_av{
					color: #DBA83F;
					position: relative;
				}
				.switch_h_av:before{
				    content: '';
				    position: absolute;
					left: 0px;
				    bottom: 0px;
				    right: 0px;
				    border-top: 3px solid  #DBA83F;
				}
			}
			.switch_bottom{
				margin-bottom: 40px;
			}
		}
		.content_top{
			display: flex;
			align-items: flex-end;
			justify-content: space-between;
			margin: 40px 0;
			// width: calc(100% - 48px);
			width: 95%;
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
		
		.league_result_container{
			width: calc(100% - 36px);
			// background: #03060D;
			background: #000000;
			// margin-bottom: 60px;
			border-radius: 17px;
			// padding: 42px 0 35px 0px;
			.teams_list_area{
				.teams_list{
					width: 95%;
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-bottom: 2px solid #2D2D2D;
					// padding: 30px 40px;
					padding: 30px 0px;
					margin-left: 30px;
					// text-align: center;
					// background-color: #FF0000;
					&:last-child{
						border: none;
					}
					.block_1{
						width: 25%;
						display: flex;
						align-items: center;
						.team_logo{
							img{
								width: 93px;
								height: 93px;
								border-radius: 46px;
								object-fit: cover;
							}
						}
						.team_info{
							margin: 0 30px;
							text-align: left;
							.team_name{
								color: #FFFFFF;
								font-size: 20px;
								font-family:'Roboto-Bold';
								width: 170px;
								// background-color: #FFF000;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}
							.game_type{
								color: #727272;
								font-size: 18px;
								margin-top: 10px;
								font-family:'Roboto-Regular';
							}
						}
					}
					.block_2{
						width: 35%;
						.team_intro{
							width: 85%;
							text-align: left;
							// background-color: #FFF000;
							color: #727272;
							font-size: 18px;
							font-family:'Roboto-Regular';
						}
					}
					.block_3{
						width: 25%;
						display: flex;
						align-items: center;
						margin-right: 30px;
						.rank_1{
							display: flex;
							align-items: center;
							margin-right: 35px;
							img{
								width: 40px;
								height: 40px;
							}
							.rank_num{
								color: #FFFFFF;
								font-size: 18px;
								margin-left: 15px;
								font-family:'Roboto-Bold';
							}
						}
						.rank_2{
							display: flex;
							align-items: center;
							margin-right: 35px;
							img{
								width: 40px;
								height: 40px;
							}
							.rank_num{
								color: #FFFFFF;
								font-size: 18px;
								margin-left: 15px;
								font-family:'Roboto-Bold';
							}
						}
						.rank_3{
							display: flex;
							align-items: center;
							img{
								width: 40px;
								height: 40px;
							}
							.rank_num{
								color: #FFFFFF;
								font-size: 18px;
								margin-left: 15px;
								font-family:'Roboto-Bold';
							}
						}
					}
					.block_4{
						width: 15%;
						.join_btn{
							color: #FF2F06;
							cursor: pointer;
							// text-decoration: underline;
							font-size: 18px;
							text-align: center;
							font-family:'Roboto-Bold';
						}
					}
					.team_member_list{
						width: 70%;
						.team_member{
							display: flex;
							align-items: center;
							flex-wrap: wrap;
							// justify-content: space-between;
							.member_block{
								display: flex;
								align-items: center;
								margin-right: 25px;
								margin-bottom: 20px;
								.member_avatar{
									width: 40px;
									height: 40px;
									border-radius: 50%;
									margin-right: 10px;
								}
								.member_name{
									width:100px;
									color: #FFFFFF;
									font-size: 16px;
									font-family:'Roboto-Regular';
									overflow: hidden;
									text-overflow: ellipsis;
									white-space: nowrap;
								}
							}
						}
					}
					
				}
			}
		}
		
	}
</style>
