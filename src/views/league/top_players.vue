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
							<div class="title">Choose TOP Player</div>
							<!-- <div class="exp_date">EXP:{{listInfo.timeMode==1?listInfo.startTime:'领券起'+listInfo.validityDay+'天后过期'}}</div> -->
						</div>
						<div class="delete">
							<div class="search_block">
								<div class="search">
									<input placeholder="Seacrh team name" v-model="listQuery.teamName"/>
									<button class="btn" @click="getleagueTeamList">
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
							<div class="team_card" v-for="(ttem,tndex) in league_teamList" :key="tndex">
								<div class="team_top">
									<img :src="HOST + ttem.teamLogo" class="team_logo"/>
									<div class="team_info">
										<div class="team_name">{{ttem.teamName}}</div>
										<div class="game_type">{{ttem.teamGameName}}</div>
									</div>
								</div>
								<div class="team_member_list">
									<div :class="mtem.check == true ? 'team_member team_border' : 'team_member'" v-for="(mtem,mndex) in ttem.members" :key="mndex" @click="select_member(ttem,mtem)">
										<el-image :src="HOST + mtem.avatar" class="member_avatar">
											<div slot="error" class="image-slot">
												<img src="../../assets/images/default.png" class="member_avatar" />
											</div>
										</el-image>
										<!-- <img :src="HOST + mtem.avatar" class="member_avatar" v-if="mtem.avatar"/> -->
										<div class="member_info">
											<div class="user_name">{{mtem.userName}}</div>
											<div class="bottom_info">
												<img src="../../assets/images/icon4.png" class="icon"/>
												<div class="position">{{mtem.position}}</div>
											</div>
										</div>
									</div>
									<!-- <div class="team_member">
										<img src="../../assets/images/friend_06.png" class="member_avatar"/>
										<div class="member_info">
											<div class="user_name">Peter Tang</div>
											<div class="bottom_info">
												<img src="../../assets/images/icon4.png" class="icon"/>
												<div class="position">WARRIOR</div>
											</div>
										</div>
									</div> -->
								
								</div>
							</div>	
												
						</div>
					</div>
					<div class="btn_area">
						<div class="save_btn" @click="getTransfer_list()">Comfirm</div>
						<div class="cancel_btn" @click="detail_up = false">Back</div>
					</div>
				</div>
			</div>
			<!-- end -->
			<div class="league_switch">
				<div class="switch_head">
					<div class="switch_h_block"  @click="jump_league"><<</div>
					<div class="switch_h_block switch_h_av" v-if="leagueItem.leagueType == 'Premier'">Premier (Tab)</div>
					<div class="switch_h_block switch_h_av" v-if="leagueItem.leagueType == 'Armature'">Amateur (Tab)</div>
				</div>
				<div class="switch_bottom">
					<LeagueSwitch :index="7"></LeagueSwitch>
				</div>
			</div>
			
			<div class="league_table">
				<div class="leag_table_head">
					<div class="table_text1"></div>
					<div class="table_text1">Player Name</div>
					<div class="table_text1">Team</div>
					<div class="table_text2">Position</div>
					<div class="table_text3"></div>
				</div>
				<div class="leag_table_btom_container">
					<div class="leag_table_btom" v-for="(item,index) in player_list" :key='index'>
						<div class="table_info2">
							<div class="tinfo_block">
								<div class="tinfo_text">Top {{item.rank}}</div>
							</div>
						</div>
						<div class="table_info1">
							<div class="tinfo_block">
								<el-image :src="HOST + item.playerAvatar" class="tinfo_team">
									<div slot="error" class="image-slot">
										<img src="../../assets/images/default.png" class="tinfo_team" />
									</div>
								</el-image>
								<!-- <img class="tinfo_team" :src="HOST + item.playerAvatar" alt="" v-if="item.playerAvatar"> -->
								<!-- <img class="tinfo_team" src="../../assets/images/default.png" alt="" v-else> -->
								<div class="tinfo_text">{{item.playerName}}</div>
							</div>
						</div>
						<div class="table_info1">
							<div class="tinfo_block">
								<img class="tinfo_team" :src="HOST + item.teamLogo" alt="">
								<div class="tinfo_text">{{item.teamName}}</div>
							</div>
						</div>
						<div class="table_info3">
							<div class="tinfo_block">
								<img class="tinfo_team" src="../../assets/images/icon4.png" alt="">
								<div class="tinfo_text">{{item.playerPosition}}</div>
							</div>
						</div>
						<div class="table_info4" >
							<img src="../../assets/images/recycle.png" @click="updatePlayer(item.rank)"/>
						</div>
					</div>
					<div class="leag_table_btom"  @click="detail_up = true">
						<div class="table_info2">
							<div class="tinfo_block">
								<div class="tinfo_text">Top {{top_rank}}</div>
							</div>
						</div>
						<div class="table_info1">
							<div class="tinfo_block">
								<div class="tinfo_text">Choose Player</div>
							</div>
						</div>
						<div class="table_info1"></div>
						<div class="table_info3"></div>
						<div class="table_info4">
							<img src="../../assets/images/add_fff.png" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import LeagueSwitch from '@/components/league/league.vue'
	import {getTopPlayers,leagueTeamList,updateTopPlayer} from '@/api/league.js'
	export default {
		name: "fixtures",
		components:{
			LeagueSwitch
		},
		data() {
			return {
				h_swith:1,
				detail_up:false,
				listQuery:{
					leagueId: '',
					teamName:''
				},
				leagueItem:{},
				list:[
					// {
					// 	top:'TOP 1',
					// 	PlayerName:'Frogs',
					// 	Team:'Frogs',
					// 	Position:'WARRIOR',
					// },
				],
				player_list:[],
				league_teamList:[],
				transfer_list:{},
				top_rank:1
			}
		},
		mounted() {
			this.leagueItem = JSON.parse(sessionStorage.getItem("leagueItem"))
			this.getList()
			this.getleagueTeamList()
		},
		methods: {
			// handleFilter(){
			// 	this.getleagueTeamList()
			// },
			getList(){
				let params = {
					leagueId: this.$route.query.id
				}
				console.log(params)
				getTopPlayers(params).then(res => {
					this.player_list = res.data
					this.top_rank = this.player_list.length + 1
					// console.log(this.top_rank,"top_rank")
				})
			},
			//choose top player
			getleagueTeamList(){
				this.listQuery.leagueId = this.$route.query.id
				leagueTeamList(this.listQuery).then(res => {
					for(let a = 0 ; a < res.data.length; a++){
						for(let b=0;b < res.data[a].members.length;b++){
							res.data[a].members[b]['check'] = false
						}
					}
					this.league_teamList = res.data
				})
			},
			//选择战队成员
			select_member(ttem,mtem){
				let that = this
				let { teamId } = ttem
				let { userId} = mtem
				let team_list = that.league_teamList;
				for(let i = 0; i < team_list.length; i++){
					// console.log(team_list[i].team_detail.member)
					// 判断是否哪个战队的
					for(let j = 0; j < team_list[i].members.length; j++){
						if(team_list[i].teamId == teamId){
							if(team_list[i].members[j].userId == userId){
								team_list[i].members[j].check  = ! team_list[i].members[j].check
								console.log(team_list[i].members[j].check)
							}else{
								team_list[i].members[j].check = false
							}
						}else{
							team_list[i].members[j].check = false
						}
					}
					// that.$set(that.team_list, i, team_list[i])
				}
			},
			//将选择的战队成员赋给一个数组
			getTransfer_list(){
				let arr = []
				// console.log('追加')
				for(let d = 0; d < this.league_teamList.length; d++){
					// if(this.team_list[a].teamId == teamId){
					for(let c = 0; c < this.league_teamList[d].members.length;c++){
						if(this.league_teamList[d].members[c].check == true){
							let obj = {
								leagueId:this.$route.query.id,
								rank:this.top_rank,
								playerId:this.league_teamList[d].members[c].userId,
								teamId: this.league_teamList[d].teamId,
							}
							// arr.push(obj)
							this.transfer_list = obj
						}
					}
				}
				console.log(this.transfer_list,"transfer_list")
				updateTopPlayer(this.transfer_list).then(res => {
					this.$message({
						type:'success',
						message:res.message
					})
					this.detail_up = false
					this.getList()
				})
			},
			//更新玩家
			updatePlayer(rank){
				this.detail_up = true
				this.top_rank = rank
				console.log(this.top_rank,"top_rank")
			},
			hswith(index){
				this.h_swith = index
			},
			jump_league(){
				this.$router.push({ path: '/league/league'})
			},
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
				width: 960px;
				// height: 674px;
				background: #33384B;
				border-radius: 25px;
				position: absolute;
				z-index: 999;
				padding-bottom: 70px;
				.content_top{
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin: 40px 50px 10px 0px;
					// padding-left: 0 30px;
					// margin-left: 30px;
					padding-bottom: 10px;
					.top_left{
						margin-left: 60px;
						.title{
							color: #DBA83F;
							font-size: 22px;
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
						width: 800px;
						height: 450px;
						border: 1px solid black;
						overflow-y:scroll;
						// line-height:1;
						color: #7C7C7C;
						font-size: 18px;
						border: none;
						padding-right: 20px;
						.team_card{
							background-color: #2a2e3f;
							border-radius: 16px;
							padding: 20px;
							margin-bottom: 30px;
							.team_top{
								display: flex;
								align-items: center;
								padding-bottom: 20px;
								border-bottom: 2px solid #7C7C7C;
								.team_logo{
									width: 88px;
									height: 88px;
									border-radius: 44px;
									object-fit: cover;
								}
								.team_info{
									margin-left: 20px;
									.team_name{
										color: #FFFFFF;
										font-size: 24px;
									}
									.game_type{
										color: #727272;
										font-size: 18px;
										margin-top: 5px;
									}
								}
							}
							.team_member_list{
								display: flex;
								align-items: center;
								flex-wrap: wrap;
								width: 100%;
								margin-top: 20px;
								// background-color: #FF0000;
								.team_border{
									border: 1px solid #E5A518;
								}
								.team_member{
									width: 32%;
									background-color: #1B2023;
									display: flex;
									align-items: center;
									justify-content: center;
									border-radius: 12px;
									padding: 20px 0;
									margin-right: 1%;
									margin-bottom: 20px;
									.member_avatar{
										width: 70px;
										height: 70px;
										border-radius: 20px;
										object-fit: cover;
									}
									.member_info{
										margin-left: 10px;
										.user_name{
											color: #FFFFFF;
											font-size: 20px;
											margin-bottom: 10px;
										}
										.bottom_info{
											display: flex;
											align-items: center;
											.icon{
												width: 30px;
												height: 30px;
											}
											.position{
												color: #848484;
												font-size: 16px;
												margin-left: 10px;
											}
										}
									}
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
				// margin: 52px 0;
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
		
		.league_table{
			width: calc(100% - 36px);
			background: #000000;
			margin-bottom: 60px;
			border-radius: 17px;
			.leag_table_head{
				display: flex;
				align-items: center;
				border-bottom: 2px solid #2D2D2D;
				padding: 34px 0 20px 0;
				margin: 0 2% 0 2%;
				color: #E4E4E4;
				font-weight: bold;
				font-size: 18px;
				font-family:'Roboto-Bold';
				.table_text1{
					width: 16.6%;
				}
				.table_text2{
					width: 30%;
				}
				.table_text3{
					width: 16.6%;
				}
			}
			.leag_table_btom_container{
				.leag_table_btom{
					height: 74px;
					display: flex;
					align-items: center;				
					margin: 0 1% 0 1%;
					padding: 0 1% 0 1%;
					color: #989898;
					font-size: 18px;
					.table_info1{
						width: 16.6%;
						.tinfo_block{
							display: flex;
							align-items: center;
							.tinfo_team{
								width: 39px;
								height: 39px;
								border-radius: 50%;
								margin-right: 40px;
							}
							.tinfo_text{
								color: #999999;
								font-family:'Roboto-Regular';
							}
						}
					}
					.table_info2{
						width: 16.6%;
						.tinfo_block{
							display: flex;
							align-items: center;
							.tinfo_text{
								color: #E5A518;
								font-size: 18px;
								font-weight: bold;
								font-family:'Roboto-Bold';
							}
						}
					}
					.table_info3{
						width: 30%;
						.tinfo_block{
							display: flex;
							align-items: center;
							.tinfo_team{
								width: 30px;
								margin-right: 20px;
							}
							.tinfo_text{
								color: #FFFFFF;
								font-weight: bold;
								font-family:'Roboto-Bold';
							}
						}
					}
					.table_info4{
						width: 16.6%;
						text-align: right;
						img{
							width: 21px;
							height: 21px;
							cursor: pointer;
						}
					}
					
				}
				.leag_table_btom:nth-child(2n){
					background-color:#1B2023;
				}
			}
		}
	}
</style>
