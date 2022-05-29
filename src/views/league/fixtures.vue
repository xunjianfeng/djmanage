<template>
	<div class="index">
		<div class="container">
			<div class="league_switch">
				<div class="switch_head">
					<div class="switch_h_block"  @click="jump_league"><<</div>
					<div class="switch_h_block switch_h_av" v-if="leagueItem.leagueType == 'Premier'">Premier (Tab)</div>
					<div class="switch_h_block switch_h_av" v-if="leagueItem.leagueType == 'Armature'">Amateur (Tab)</div>
				</div>
				<div class="switch_bottom">
					<LeagueSwitch :index="2"></LeagueSwitch>
				</div>
			</div>
			<div class="record" @click="jump_create_fixtures">
				<img src="../../assets/images/record.png" />
			</div>
			<div class="league_table">
				<div class="leag_table_head">
					<div class="table_text1">Date</div>
					<div class="table_text1">Time</div>
					<div class="table_text1">Matchday</div>
					<div class="table_text1">Team</div>
				</div>
				<div class="leag_table_btom_container">
					<div class="leag_table_btom" v-for="(item,index) in list" :key="index">
						<div class="table_info1">
							<div class="tinfo_block">
								<div class="tinfo_text">{{item.date}}</div>
							</div>
						</div>
						<div class="table_info1">
							<div class="tinfo_block">
								<div class="tinfo_text">{{item.time}}</div>
							</div>
						</div>
						<div class="table_info1">
							<div class="tinfo_block">
								<!-- <div class="tinfo_text">{{item.matchday}}</div> -->
								<div class="tinfo_text">{{item.matchDayNo}} / {{leagueItem.matchDayCount}}</div>
							</div>
						</div>
						<div class="table_info2">
							<div class="tinfo_block">
								<div class="team_1">
									<img class="tinfo_team" :src="HOST + item.team1.teamLogo" />
									<div class="tinfo_text">{{item.team1.teamName}}</div>
								</div>
								<div class="vs_color">VS</div>
								<div class="team_2">
									<img class="tinfo_team" :src="HOST + item.team2.teamLogo" />
									<div class="tinfo_text">{{item.team2.teamName}}</div>
								</div>
							</div>
						</div>
						<div class="table_info3" >
							<img class="table_edit" @click="jump_edit_fixtures(item)" src="../../assets/images/record.png" />
							<img class="table_del"  @click="del_fixtures(item.id)" src="../../assets/images/delete_gray.png" />
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import LeagueSwitch from '@/components/league/league.vue'
	import {
		findFixture,
		delFixture,leagueList
	} from '@/api/league.js';
	export default {
		name: "fixtures",
		components: {
			LeagueSwitch
		},
		data() {
			return {
				h_swith: 1,
				value1: '',
				listQuery: {
					leagueId: this.$route.query.id,
					pageNum: 1,
					pageSize: 10
				},
				list: [],
				leagueItem: {},
				leagueQuery:{}
			}
		},
		mounted() {
			this.getList()
			// this.leagueItem = JSON.parse(sessionStorage.getItem("leagueItem"))
			this.leagueQuery = JSON.parse(sessionStorage.getItem("leagueQuery"))
			setTimeout(()=>{
				this.getleagueList()
			},100)
		},
		methods: {
			// 联赛列表
			getleagueList() {
				// let params = {
				// 	gameCategoryId: this.nav_index
				// }
				leagueList(this.leagueQuery).then(res => {
					console.log(res.data,"联盟")
					for(let l =0;l<res.data.length;l++){
						if(res.data[l].id == this.$route.query.id){
							this.leagueItem = res.data[l]
							console.log(this.leagueItem,"leagueItem")
						}
					}
				})
			},
			// 分页查询对局
			getList() {
				let params = this.listQuery
				params['leagueId'] = this.$route.query.id || ''
				findFixture(params).then(res => {
					for (let i = 0; i < res.data.list; i++) {
						res.data.list[i]['date'] = ''
						res.data.list[i]['time'] = ''
					}
					this.list = res.data.list
					for (let j = 0; j < this.list.length; j++) {
						this.list[j]['date'] = this.list[j].playTime.substring(0, 10)
						this.list[j]['time'] = this.list[j].playTime.substring(11, 19)
					}
				})
			},
			hswith(index) {
				this.h_swith = index
			},
			//删除对局
			del_fixtures(fixtureId) {
				let params = {
					fixtureId
				}
				console.log(params)
				// this.$confirm('是否删除该战队?', '提示', {
				// 	confirmButtonText: '确定',
				// 	cancelButtonText: '取消',
				// 	type: 'warning'
				// }).then(() => {
					delFixture(params).then(res => {
						console.log(res)
						this.$message({
							message: res.message,
							type: 'success'
						});
						this.getList();
					})
				// })
			},
			// 跳转添加比赛日和对局
			jump_create_fixtures() {
				this.$router.push({
					path: '/league/create_fixtures',
					query: {
						id: this.$route.query.id
					}

				})
			},
			//跳转编辑对局
			jump_edit_fixtures(fixture_info) {
				this.$router.push({
					path: '/league/edit_fixtures',
					query: {
						fixture_info: JSON.stringify(fixture_info)
					}
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
		width: 93%;
		background: #33384B;
		margin: 0 56px;
		padding: 30px 20px 100px;

		.league_head {
			display: flex;
			align-items: center;
			padding: 46px 0 32px 0;
			border-bottom: 1px solid #2D2D2D;

			.league_head_text {
				color: #FFFFFF;
				font-size: 24px;
				font-weight: bold;
			}

			.league_head_spot {
				width: 8px;
				height: 8px;
				background-color: #FFFFFF;
				border-radius: 50%;
				margin: 0 20px;
			}
		}

		.league_switch {
			.switch_head {
				display: flex;
				align-items: center;
				// margin: 52px 0;
				margin: 0px 0 52px;
				font-family:'Quicksand-Regular';
				.switch_h_block {
					font-size: 24px;
					color: #FFFFFF;
					// cursor: pointer;
					margin-right: 70px;
					cursor: pointer;
				}

				.switch_h_block:last-child {
					margin-right: 0;
				}

				.switch_h_av {
					color: #DBA83F;
					position: relative;
				}

				.switch_h_av:before {
					content: '';
					position: absolute;
					left: 0px;
					bottom: 0px;
					right: 0px;
					border-top: 3px solid #DBA83F;
				}
			}

			.switch_bottom {
				margin-bottom: 40px;
			}
		}

		.text {
			width: 95%;
			color: #E5A518;
			font-size: 18px;
			margin-bottom: 20px;
			text-align: right;
			// background-color: #FFF000;
			// margin-right: 30px;
		}

		.record {
			width: 95%;
			display: flex;
			justify-content: flex-end;
			margin-bottom: 20px;
			cursor: pointer;
			img {
				width: 23px;
				height: 23px;
			}
		}

		.league_table {
			width: calc(100% - 36px);
			background: #000000;
			margin-bottom: 60px;
			border-radius: 17px;

			.leag_table_head {
				display: flex;
				align-items: center;
				border-bottom: 2px solid #2D2D2D;
				padding: 34px 0 20px 0;
				margin: 0 2% 0 2%;
				color: #E4E4E4;
				font-weight: bold;
				font-size: 18px;
				font-family:'Roboto-Bold';
				.table_text1 {
					width: 16.6%;
				}

				.table_text2 {
					width: 16.6%;
				}

				.table_text3 {
					width: 12%;
				}

				.table_text4 {
					width: 4.6%;
				}
			}

			.leag_table_btom_container {
				.leag_table_btom {
					height: 74px;
					display: flex;
					align-items: center;
					margin: 0 1% 0 1%;
					padding: 0 1% 0 1%;
					color: #989898;
					font-size: 18px;
					font-family:'Roboto-Regular';
					.table_info1 {
						width: 16.6%;

						.tinfo_block {
							display: flex;
							align-items: center;

							.tinfo_team {
								width: 39px;
								height: 39px;
								border-radius: 50%;
								margin-right: 40px;
							}

							.tinfo_text {
								color: #999999;
							}
						}
					}

					.table_info2 {
						width: 40%;

						.tinfo_block {
							display: flex;
							align-items: center;
							justify-content: space-between;

							.team_1 {
								width: 40%;
								display: flex;
								align-items: center;
								justify-content: flex-start;

								.tinfo_team {
									width: 39px;
									height: 39px;
									border-radius: 50%;
									margin-right: 40px;
								}

								.tinfo_text {
									color: #999999;
								}
							}

							.vs_color {
								color: #E5A518;
								font-size: 18px;
							}

							.team_2 {
								width: 40%;
								display: flex;
								align-items: center;
								justify-content: flex-end;

								.tinfo_team {
									width: 39px;
									height: 39px;
									border-radius: 50%;
									margin-right: 40px;
								}

								.tinfo_text {
									color: #999999;
								}
							}
						}

					}

					.table_info3 {
						width: 10%;
						display: flex;
						align-items: center;
						justify-content: center;

						.table_edit {
							width: 20px;
							margin-right:10px;
							cursor: pointer;
						}
						.table_del {
							width: 30px;
							cursor: pointer;
						}
					}

					.delete_btn {
						width: 4.6%;

						img {
							width: 23px;
							height: 25px;
						}
					}
				}

				.leag_table_btom:nth-child(2n) {
					background-color: #1B2023;
				}
			}
		}
	}
</style>
