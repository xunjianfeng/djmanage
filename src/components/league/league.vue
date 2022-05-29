<template>
	<div class="index">
		<div class="container">
			<div class="switch_leag_left">
				<div class="switch_leag_left_col">
					<p :class="nav==1?'av':''" @click="navs(1)">Teams</p>
					<p :class="nav==2?'av':''" @click="navs(2)">Fixtures</p>
					<p :class="nav==3?'av':''" @click="navs(3)">Standing</p>
					<p :class="nav==4?'av':''" @click="navs(4)">Results</p>
					<p :class="nav==5?'av':''" @click="navs(5)">Transfer</p>
					<p :class="nav==6?'av':''" @click="navs(6)">Info</p>
					<p :class="nav==7?'av':''" @click="navs(7)">Top Players</p>
					<p :class="nav==8?'av':''" @click="navs(8)">Highlights</p>
				</div>
				<div class="btn_area">
					<div class="complete_btn" v-if="leagueItem.status != 'Finished'" @click="completeLeague">Complete</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {completeLeague} from '@/api/league.js'
	export default {
		name: "league",
		components: {},
		props: ['index'],
		data() {
			return {
				nav: this.index,
				west_status:false,
				leagueItem:{},
				list:[
					
				]
			};
		},
		mounted() {
			this.leagueItem = JSON.parse(sessionStorage.getItem("leagueItem"))
			console.log(this.leagueItem,"leagueItem")
			// this.leagueItem = this.$route.query.leagueItem
		},
		methods: {
			//结束联赛
			completeLeague(){
				this.$confirm('是否确定结束该联赛?', '信息', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let params = {
						leagueId:this.$route.query.id
					}
					console.log(params)
					completeLeague(params).then(res => {
						this.$message({
						  message: res.message,
						  type: 'success'
						})
						this.$router.push({path:'/league/league'})
					})
				})
				
			},
			navs(index) {
				if (index == 1) {
					this.$router.push({
						path: '/league/teams',
						query:{id:this.$route.query.id}
					})
				} else if (index == 2) {
					this.$router.push({
						path: '/league/fixtures',
						query:{id:this.$route.query.id}
					})
				} else if (index == 3) {
					this.$router.push({
						path: '/league/standing',
						query:{id:this.$route.query.id}
					})
				} else if (index == 4) {
					this.$router.push({
						path: '/league/results',
						query:{id:this.$route.query.id}
					})
				} else if (index == 5) {
					this.$router.push({
						path: '/league/transfer',
						query:{id:this.$route.query.id}
					})
				} else if (index == 6) {
					this.$router.push({
						path: '/league/info',
						query:{id:this.$route.query.id}
					})
				} else if (index == 7) {
					this.$router.push({
						path: '/league/top_players',
						query:{id:this.$route.query.id}
					})
				} else if (index == 8) {
					this.$router.push({
						path: '/league/highlights',
						query:{id:this.$route.query.id}
					})
				}
			}
		}
	};
</script>
<style lang="less" scoped>
	.container {
		.switch_leag_left {
			// display: flex;
			// align-items: center;
			position: relative;
			.switch_leag_left_col {
				display: flex;
				align-items: center;
				p {
					cursor: pointer;
					color: #898989;
					font-size: 20px;
					padding-right: 39px;
					margin: 0 39px 0 0;
					border-right: 1px solid #7F7F7F;
					font-family:'Roboto-Regular';
				}
				p:last-child {
					padding-right: 0;
					margin-right: 0;
					border-right: 0px ;
				}

				.av {
					color: #BF9D62;
					font-family:'Roboto-Bold';
				}
			}
			.btn_area{
				position: absolute;
				right: 70px;
				bottom: 50px;
				.complete_btn{
					width: 120px;
					height: 50px;
					line-height: 50px;
					text-align: center;
					font-size: 18px;
					border-radius: 19px;
					background-color: #BF9D62;
					font-family:'Roboto-Regular';
					cursor: pointer;
				}
			}
		}
		.switch_right {
			position: absolute;
			right: 0;
			bottom: -9%;

			.float_right_block {
				width: 102px;
				height: 278px;
				background: #03060D;
				border-radius: 18px 0px 0px 18px;
				color: #C9C9C9;
				font-size: 24px;
				display: flex;
				align-items: center;
				margin-bottom: 23px;
				cursor: pointer;
				.flota_rotate {
					transform: rotate(-90deg);
				}
				.rotate_color{
					color:#DBA83F;
				}
			}
		}
		// 弹窗
		.west_three_rapic{
			position: absolute;
			right: 140px;
			bottom:-140px;
			z-index: 999;
			width: 943px;
			background: #000000;
			border-radius: 44px 31px 31px 44px;
			overflow: hidden;
			display: flex;
			flex-flow: column;
			.league_table{
				margin-bottom: 60px;
				.leag_table_head{
					display: flex;
					align-items: center;
					border-bottom: 2px solid #2D2D2D;
					padding: 34px 0 20px 0;
					margin: 0 4% 0 4%;
					color: #E4E4E4;
					font-weight: bold;
					font-size: 18px;
					.table_text1{
						width: 25%;
					}
					.table_text2{
						width: 25%;
					}
				}
				.leag_table_btom_container{
					.leag_table_btom{
						height: 74px;
						display: flex;
						align-items: center;				
						margin: 0 3% 0 3%;
						padding: 0 1% 0 1%;
						color: #989898;
						font-size: 18px;
						.table_info1{
							width: 25%;
							.info1_date{
								width: 50%;
							}
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
							width: 25%;
						}
					}
					.leag_table_btom:nth-child(2n){
						background-color:#1B2023;
					}
				}
			}
		}
	}
</style>
