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
					<LeagueSwitch :index="5"></LeagueSwitch>
				</div>
			</div>
			<div class="text" @click="jump_addTransfer">Transfer</div>
			<div class="league_table">
				<div class="leag_table_head">
					<div class="table_text1">Player Name</div>
					<div class="table_text1">New Club</div>
					<div class="table_text1">Ex Club</div>
					<div class="table_text1">Position</div>
					<div class="table_text3">Fee</div>
					<div class="table_text2">Date</div>
					<div class="table_text4"></div>
				</div>
				<div class="leag_table_btom_container">
					<div class="leag_table_btom" v-for="(item,index) in transfer_list" :key='index'>
						<div class="table_info1">
							<div class="tinfo_block">
								<el-image :src="HOST + item.player.avatar" class="tinfo_team">
									<div slot="error" class="image-slot">
										<img src="../../assets/images/default.png" class="tinfo_team" />
									</div>
								</el-image>
								<!-- <img class="tinfo_team" :src="HOST + item.player.avatar" alt="" v-if="item.player.avatar"> -->
								<div class="tinfo_text">{{item.player.fullName}}</div>
							</div>
						</div>
						<div class="table_info1">
							<div class="tinfo_block">
								<img class="tinfo_team" :src="HOST + item.newClub.teamLogo" alt="">
								<div class="tinfo_text">{{item.newClub.teamName}}</div>
							</div>
						</div>
						<div class="table_info1">
							<div class="tinfo_block">
								<img class="tinfo_team" :src="HOST + item.exClub.teamLogo" alt="">
								<div class="tinfo_text">{{item.exClub.teamName}}</div>
							</div>
						</div>
						<div class="table_info3">
							<div class="tinfo_block">
								<img class="tinfo_team" src="../../assets/images/icon4.png" alt="">
								<div class="tinfo_text">{{item.position}}</div>
							</div>
						</div>
						<div class="table_info4">{{item.transferFee}}</div>
						<div class="table_info2">{{item.transferTime}}</div>
						<div class="delete_btn">
							<img src="../../assets/images/delete_gray.png" @click="delTransfer(item.id)"/>
						</div>
					</div>
					
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import LeagueSwitch from '@/components/league/league.vue'
	import {showTransfer,delTransfer} from '@/api/league.js'
	import {teamUsers} from '@/api/play.js'
	export default {
		name: "transfer",
		inject:['reload'],
		components:{
			LeagueSwitch
		},
		data() {
			return {
				h_swith:1,
				value1:'',
				transfer_list:[],
				list:[
					{
						date:'23, July 2021',
						Free:'50 Coins',
						Position:'WARRIOR',
						ExClub:'Frogs',
						NewClub:'Frogs',
						PlayerName:'Frogs',
					},
				],
				transferRecordIds:[],
				leagueItem:{}
			}
		},
		mounted() {
			this.leagueItem = JSON.parse(sessionStorage.getItem("leagueItem"))
			this.getList()
		},
		methods: {
			hswith(index){
				this.h_swith = index
			},
			jump_addTransfer(){
				this.$router.push({ path: '/league/add_transfer',query:{id:this.$route.query.id}})
			},
			getList(){
				let params = {
					leagueId:this.$route.query.id
				}
				showTransfer(params).then(res => {
					for(let a = 0; a < res.data.list.length;a++){
						res.data.list[a]['position'] = ''
					}
					this.transfer_list = res.data.list
					// console.log(this.transfer_list)
					for(let i = 0; i < this.transfer_list.length; i++){
						// if()
						let params = {
							teamId: this.transfer_list[i].exClub.teamId
						}
						teamUsers(params).then(res => {
							// console.log(res.data)
							for(let j = 0; j < res.data.usrs.length; j++){
								if(this.transfer_list[i].player.id == res.data.usrs[j].userId){
									this.transfer_list[i]['position'] = res.data.usrs[j].role
								}
							}
						})
					}
				})
			},
			delTransfer(transferRecordIds){
				// console.log(id)
				let params = {
					transferRecordIds
				}
				// console.log(params)
				this.$confirm('是否删除该战队?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					delTransfer(params).then(res => {
						this.$message({
						  message: res.message,
						  type: 'success'
						});
						this.reload()
					})
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
				font-family:'Quicksand-Regular';
				// margin: 52px 0;
				margin: 0px 0 52px;
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
		.text{
			width: 95%;
			color: #E5A518;
			font-size: 18px;
			margin-bottom: 20px;
			text-align: right;
			cursor: pointer;
			font-family:'Roboto-Bold';
			// background-color: #FFF000;
			// margin-right: 30px;
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
					width: 16.6%;
				}
				.table_text3{
					width: 12%;
				}
				.table_text4{
					width: 4.6%;
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
							}
						}
					}
					.table_info3{
						width: 16.6%;
						.tinfo_block{
							display: flex;
							align-items: center;
							font-family:'Roboto-Bold';
							.tinfo_team{
								width: 39px;
								height: 39px;
								border-radius: 50%;
								margin-right: 20px;
							}
							.tinfo_text{
								color: #FFFFFF;
								font-weight: bold;
								font-family:'Roboto-Bold';
							}
						}
					}
					.table_info2{
						width: 16.6%;
					}
					.table_info4{
						width: 12%;
					}
					.delete_btn{
						width: 4.6%;
						img{
							width: 23px;
							height: 25px;
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
