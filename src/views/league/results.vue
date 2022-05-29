<template>
	<div class="index">
		<div class="container">
			<!-- <div class="league_head">
				<div class="league_head_text">PC</div>
				<div class="league_head_spot"></div>
				<div class="league_head_text">Dota 2</div>
			</div> -->
			<div class="league_switch">
				<div class="switch_head">
					<div class="switch_h_block"  @click="jump_league"><<</div>
					<div class="switch_h_block switch_h_av" v-if="leagueItem.leagueType == 'Premier'">Premier (Tab)</div>
					<div class="switch_h_block switch_h_av" v-if="leagueItem.leagueType == 'Armature'">Amateur (Tab)</div>
				</div>
				<div class="switch_bottom">
					<LeagueSwitch :index="4"></LeagueSwitch>
				</div>
			</div>
			<div class="league_result_container">
				
				<div class="result_list" v-for="(item,index) in matchday_list" :key="index">
					<div class="result_title">Matchday {{item.no}} Result</div>
					
					<div class="result_matchdoy">
						<div class="matchdoy_block_list">
							<div class="matchdoy_block"  v-for="(ttem,tndex) in item.fixtures" :key="tndex">
								<div class="matchdoy_left">
									<div class="team_1">
										<div class="team_1_left">
											<img class="matchdoy_team" :src="HOST + ttem.team1.teamLogo" alt="">
											<div class="matchdoy_text">{{ttem.team1.teamName}}</div>
										</div>
										<div class="matchdoy_score">
											<input :class="ttem.team1Score > ttem.team2Score ? 'matchdoy_input text_color' : 'matchdoy_input'" v-model="ttem.team1Score" :disabled="ttem.save_status==false"/>
										</div>
									</div>
									<div class="team_2">
										<div class="team_2_left">
											<img class="matchdoy_team" :src="HOST + ttem.team2.teamLogo" alt="">
											<div class="matchdoy_text">{{ttem.team2.teamName}}</div>
										</div>
										<div class="matchdoy_score">
											<input :class="ttem.team2Score > ttem.team1Score ? 'matchdoy_input text_color' : 'matchdoy_input '" v-model="ttem.team2Score" :disabled="ttem.save_status==false"/>
										</div>
									</div>
								</div>
								<div class="matchdoy_right">
									<div class="matchdoy_text">
										{{ttem.playTime}}
									</div>
								</div>
								<div class="record">
									<img src="../../assets/images/record.png" v-if="ttem.save_status == false"  @click="changeStatus(ttem.id,0)"/>
									<div class="save_btn" v-if="ttem.save_status == true"  @click="changeStatus(ttem.id,1)">save</div>
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
	import LeagueSwitch from '@/components/league/league.vue'
	import { findFixture,findMatchDay,saveFixtureResult,leagueList } from '@/api/league.js'  //分页查询对局、查询比赛日、联赛列表
	export default {
		name: "results",
		components:{
			LeagueSwitch
		},
		data() {
			return {
				h_swith:1,
				value1:'',
				matchday_list:[],
				list:[
					
				],
				team1Score:'',
				team2Score:'',
				score:[
					{
						score_1:'',
						score_2:'',
					}
				],
				leagueItem:{},//联赛信息
				leagueQuery:{},//获取联赛信息的条件，从/league/league传过来
			}
		},
		mounted() {
			this.leagueItem = JSON.parse(sessionStorage.getItem("leagueItem"))
			this.getMatchDay()
		},
		methods: {
			hswith(index){
				this.h_swith = index
			},
			changeStatus(id,index){
				console.log(id)
				if(index == 1){
					//点击save，保存对局成绩
					for(let i = 0; i<this.matchday_list.length;i++){
						for(let j=0; j < this.matchday_list[i].fixtures.length; j++){
							if(this.matchday_list[i].fixtures[j].id == id){
								this.matchday_list[i].fixtures[j]['save_status'] = false
								this.team1Score = this.matchday_list[i].fixtures[j].team1Score
								this.team2Score = this.matchday_list[i].fixtures[j].team2Score
							}
						}
					}
					// 保存对局结果
					let params = {
						fixtureId:id,
						team1Score: this.team1Score,
						team2Score: this.team2Score,
						
					}
					console.log(params)
					saveFixtureResult(params).then(res => {
						if(res.code == 200){
							this.$message({
							  message: res.message,
							  type: 'success'
							});
						}else{
							this.$message({
							  message: res.message,
							  type: 'error'
							});
						}
						
					})
				}else{
					//按钮状态，点击之后可以输入对局成绩
					for(let c = 0; c<this.matchday_list.length;c++){
						for(let d = 0; d < this.matchday_list[c].fixtures.length; d++){
							if(this.matchday_list[c].fixtures[d].id == id){
								this.matchday_list[c].fixtures[d]['save_status'] = true
							}
						}
					}
				}
			},
			//查询比赛日和对局结果
			getMatchDay(){
				let params = {
					leagueId:this.$route.query.id
				}
				console.log(params)
				findMatchDay(params).then(res => {
					for(let a = 0; a<res.data.list.length;a++){
						for(let b=0; b < res.data.list[a].fixtures.length; b++){
							res.data.list[a].fixtures[b]['save_status'] = false
						}
					}
					this.matchday_list = res.data.list
					// console.log(this.matchday_list)
				})
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
		.league_result_container{
			width: calc(100% - 36px);
			background: #000000;
			margin-bottom: 60px;
			border-radius: 17px;
			padding: 42px 0 35px 0px;
			position: relative;
			
			.result_list{
				padding-left:52px;
				margin-bottom: 61px;
				.result_title{
					color: #DBA83F;
					font-size: 21px;
					margin-bottom: 20px;
					font-family:'Quicksand-Regular';
				}
				
				.result_matchdoy{
					// display: flex;
					// flex-wrap: wrap;
					.matchdoy_block_list{
						// display: flex;
						width: 95%;
						// background-color: #fff000;
						display: flex;
						flex-wrap: wrap;
						align-items: center;
						justify-content: space-between;
						// .matchdoy_block{
						// 	display: flex;
						// 	align-items: center;
						// 	justify-content: space-between;
						// 	width: 594px;
						// 	height: 146px;
						// 	border: 1px solid #2A3235;
						// 	border-radius: 23px;
						// 	margin: 0 42px 20px 0;
						// 	.matchdoy_left{
						// 		display: flex;
						// 		align-items: center;
						// 		padding-left: 38px;
						// 		.matchdoy_team{
						// 			width: 51px;
						// 			height: 51px;
						// 			border-radius: 50%;
						// 			margin-right: 21px;
						// 		}
						// 		.matchdoy_text{
						// 			color: #FFFFFF;
						// 			font-size: 20px;
						// 		}
						// 	}
						// 	.matchdoy_right{
						// 		padding-right: 24px;
						// 		.matchdoy_input{
						// 			width: 120px;
						// 			display: flex;
						// 			align-items: center;
						// 			padding-left: 18px;
						// 			height: 44px;
						// 			color: #989898;
						// 			font-size: 20px;
						// 			background: #1B2023;
						// 			border-radius: 4px;
						// 			border: none;
						// 		}
						// 		.matchdoy_color{
						// 			color: #DBA83F;
						// 		}
						// 	}
						// }
						
						.matchdoy_block{
							width: 46%;
							display: flex;
							align-items: center;
							justify-content: space-between;
							// background-color: #fff;
							// width: 594px;
							height: 146px;
							border: 1px solid #2A3235;
							border-radius: 23px;
							// margin: 0 42px 20px 0;
							margin-bottom: 20px;
							.matchdoy_left{
								// display: flex;
								// align-items: center;
								width: 60%;
								// background-color: #FF0000;
								padding-left: 38px;
								.team_1{
									display: flex;
									align-items: center;
									justify-content: space-between;
									.team_1_left{
										display: flex;
										align-items: center;
										.matchdoy_team{
											width: 51px;
											height: 51px;
											border-radius: 50%;
											margin-right: 21px;
										}
										.matchdoy_text{
											color: #FFFFFF;
											font-size: 20px;
											font-family:'Roboto-Bold';
										}
										
									}
									.matchdoy_score{
										margin-left: 30px;
										font-family:'Roboto-Regular';
										.matchdoy_input{
											width: 50px;
											display: flex;
											align-items: center;
											padding-left: 18px;
											height: 40px;
											color: #989898;
											font-size: 20px;
											background: #1B2023;
											border-radius: 4px;
											border: none;
										}
										.text_color{
											color: #E5A518;
										}
									}
								}
								.team_2{
									// width: 30%;
									display: flex;
									align-items: center;
									justify-content: space-between;
									margin-top: 15px;
									.team_2_left{
										display: flex;
										align-items: center;
										// justify-content: space-between;
										.matchdoy_team{
											width: 51px;
											height: 51px;
											border-radius: 50%;
											margin-right: 21px;
										}
										.matchdoy_text{
											color: #FFFFFF;
											font-size: 20px;
											font-family:'Roboto-Bold';
										}
										
									}
									.matchdoy_score{
										margin-left: 30px;
										font-family:'Roboto-Regular';
										.matchdoy_input{
											width: 50px;
											display: flex;
											align-items: center;
											padding-left: 18px;
											height: 40px;
											color: #989898;
											font-size: 20px;
											background: #1B2023;
											border-radius: 4px;
											border: none;
										}
										.text_color{
											color: #E5A518;
										}
									}
								}
							}
							.matchdoy_right{
								width: 170px;
								text-align: right;
								line-height: 25px;
								font-size: 14px;
								// background-color: #fff000;
								padding-right: 24px;
								.matchdoy_text{
									color: #727272;
									font-family:'Roboto-Regular';
								}
							}
							.record{
								// position: absolute;
								// top: 34px;
								// right: 35px;
								img{
									width: 23px;
									height: 23px;
									margin-right: 20px;
									cursor: pointer;
								}
								.save_btn {
									width: 100px;
									height: 50px;
									color: #0E0F11;
									background: #D3AA53;
									border-radius: 25px;
									border: 1px solid #D3AA53;
									cursor: pointer;
									display: flex;
									align-items: center;
									justify-content: center;
									margin-right: 20px;
									font-size: 18px;
									font-family:'Roboto-Regular';
								}
							}
						}
														
					}
					
				}
			}
			.result_list:last-child{
				margin-bottom: 0;
			}
		}
		
	}
</style>
