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
					<LeagueSwitch :index="3"></LeagueSwitch>
				</div>
			</div>
			<!-- <div class="league_date">
				<div class="date_block">
					<div class="date_head">Date Range</div>
					<div class="date_area">
						<div class="date_btom">
							<el-date-picker
							  v-model="start_date"
							  type="date"
							  placeholder="Date"
							  value-format="yyyy-MM-dd"
							  >
							</el-date-picker>
						</div>
						<div class="date_btom">
							<el-date-picker
							  v-model="end_date"
							  type="date"
							  placeholder="Date"
							  value-format="yyyy-MM-dd"
							  @change="getList"
							  >
							</el-date-picker>
						</div>
					</div>
					
				</div>
			</div> -->
			<div class="league_table">
				<div class="leag_table_head">
					<!-- <div class="table_text1">Date</div> -->
					<div class="table_text1">Team</div>
					<div class="table_text2">P</div>
					<div class="table_text2">W</div>
					<div class="table_text2">D</div>
					<div class="table_text2">L</div>
					<div class="table_text2">F</div>
					<div class="table_text2">A</div>
					<div class="table_text2">Diffi</div>
					<div class="table_text2">Points</div>
				</div>
				<div class="leag_table_btom_container">
					<div class="leag_table_btom" v-for="(item,index) in list" :key='index'>
						<!-- <div class="table_info1">{{item.matchDay}}</div> -->
						<!-- <div class="table_info1">{{item.date}}</div> -->
						<div class="table_info1">
							<div class="tinfo_block">
								<img class="tinfo_team" :src="HOST + item.team.teamLogo" alt="">
								<!-- <img class="tinfo_team" src="../../assets/images/radiu1.png" alt=""> -->
								<div class="tinfo_text">{{item.team.teamName}}</div>
							</div>
						</div>
						<div class="table_info2">{{item.p}}</div>
						<div class="table_info2">{{item.w}}</div>
						<div class="table_info2">{{item.d}}</div>
						<div class="table_info2">{{item.l}}</div>
						<div class="table_info2">{{item.f}}</div>
						<div class="table_info2">{{item.a}}</div>
						<div class="table_info2">{{item.diff}}</div>
						<div class="table_info2">{{item.point}}</div>
					</div>
					
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import LeagueSwitch from '@/components/league/league.vue'
	import {leagueStanding,findMatchDay} from '@/api/league.js'
	export default {
		name: "standing",
		components:{
			LeagueSwitch
		},
		data() {
			return {
				h_swith:1,
				// value1:'',
				start_date:'',
				end_date:'',
				matchDay_list:[],
				leagueItem:{},
				list:[
				]
			}
		},
		mounted() {
			this.leagueItem = JSON.parse(sessionStorage.getItem("leagueItem"))
			// this.getMatchDay()
			this.getList()
		},
		methods: {
			hswith(index){
				this.h_swith = index
			},
			getList(){
				// console.log(this.start_date)
				// console.log(this.end_date)
				let params = {
					leagueId:this.$route.query.id,
					beginDate:this.start_date,
					endDate:this.end_date
					// beginDate:Date.parse(this.start_date),
					// endDate:Date.parse(this.end_date)
				}
				console.log(params)
				leagueStanding(params).then(res => {
					// console.log(res)
					// for(let a = 0; a < res.data.list.length; a++){
					// 	res.data.list[a]['matchDay'] = '';
					// }
					this.list = res.data.list
					// for(let i=0;i<this.list.length;i++){
					// 	for(let j=0;i<this.matchDay_list.length;j++){
					// 		if(this.list[i].matchDayId == this.matchDay_list[j].id){
					// 			for(let k=0;k<this.matchDay_list[j].fixtures.length;k++){
					// 				this.list[i]['matchDay'] = this.matchDay_list[j].fixtures[k].playTime
					// 				console.log(this.list[i]['matchDay'])
					// 			}
					// 		}
					// 	}
					// }
					console.log(this.list)
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
				margin-bottom: 60px;
			}
		}
		.league_date{
			margin-bottom: 15px;
			.date_block{
				.date_head{
					color: #909090;
					font-size: 16px;
					margin-bottom: 12px;
				}
				.date_area{
					display: flex;
					align-items: center;
					.date_btom{
						margin-right: 20px;
						/deep/ .el-date-editor {
							width: 230px;
							height: 59px;
							border-radius: 20px;
							background-color: #000000;
						}
						/deep/ .el-input__inner{
							// background-color: #0E0F11;
							background-color: #000000;
								color: #ffffff;
								height: 59px;
								border-radius: 20px;
								border: 1px solid #000000;
						}
					}
				}
				
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
					width: 24%;
				}
				.table_text2{
					// width: 6.5%;
					width: 9%;
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
					font-family:'Roboto-Regular';
					.table_info1{
						width: 24%;
						.tinfo_block{
							display: flex;
							align-items: center;
							.tinfo_team{
								width: 39px;
								height: 39px;
								border-radius: 50%;
								margin-right: 54px;
							}
							.tinfo_text{
								color: #989898;
							}
						}
					}
					.table_info2{
						// width: 6.5%;
						width: 9%;
					}
				}
				.leag_table_btom:nth-child(2n){
					background-color:#1B2023;
				}
			}
		}
	}
</style>
