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
							<div class="title">Choose Transfer Player</div>
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
							<div class="team_card" v-for="(item,index) in team_list" :key="index">
								<div class="team_top">
									<img :src="HOST + item.teamLogo" class="team_logo"/>
									<div class="team_info">
										<div class="team_name">{{item.teamName}}</div>
										<div class="game_type">{{item.teamGameName}}</div>
									</div>
								</div>
								<div class="team_member_list">
									<div v-for="(utem,undex) in item.members" :key="undex" :class="utem.check == true ? 'team_member team_border' : 'team_member'"  @click="select_member(item,utem)">
										<el-image :src="HOST + utem.avatar" class="member_avatar">
											<div slot="error" class="image-slot">
												<img src="../../assets/images/default.png" class="member_avatar" />
											</div>
										</el-image>
										<!-- <img :src="HOST + utem.avatar" class="member_avatar" v-if="utem.avatar"/> -->
										<div class="member_info">
											<div class="user_name">{{utem.userName}}</div>
											<div class="bottom_info">
												<img src="../../assets/images/icon4.png" class="icon"/>
												<div class="position">{{utem.position}}</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="btn_area">
						<div class="save_btn" @click="getTransfer_list()">Next</div>
						<div class="cancel_btn" @click="detail_up = false">Back</div>
					</div>
				</div>
			</div>
			<!-- end -->
			<div class="switch_head">
				<div class="switch_h_block" @click="jump_transfer"><<</div>
				<div class="switch_h_block ">Transfer</div>
			</div>
			<div class="container_content">
				<div class="add_block" @click="detail_up = true">
					<img src="../../assets/images/add_fff.png" class="add_img"/>
				</div>
				<div class="info_card" v-for="(ttem,tndex) in transfer_list" :key="tndex">
					<div class="card_left" @click="detail_up = true">
						<el-image :src="HOST + ttem.avatar" class="avatar">
							<div slot="error" class="image-slot">
								<img src="../../assets/images/default.png" class="avatar" />
							</div>
						</el-image>
						<!-- <img :src="HOST + ttem.avatar" class="avatar"/> -->
						<div class="user_name">{{ttem.fullName}}</div>
						<div class="bottom_info">
							<img src="../../assets/images/icon4.png" class="icon"/>
							<div class="position">{{ttem.role}}</div>
						</div>
						<img src="../../assets/images/recycle.png"  class="recycle"/>
					</div>
					<div class="card_right">
						<div class="club_time">
							<div class="label">Now Club</div>
							<div class="time_value">{{ttem.transferTime}}</div>
						</div>
						<div class="select_city">
							<div class="sort_by_text">Transfer to</div>
							<div class="options_select">
								<el-image class="info_radio" :src="HOST+ttem.transferTeamLogo"></el-image>
								<!-- <img class="info_radio"  :src="HOST+ttem.transferTeamLogo" alt=""> -->
								<el-select v-model="ttem.transferTeam" value-key="teamId" placeholder="请选择" :popper-append-to-body="false" @change="showTeamLogo($event,ttem.userId)">
									<el-option v-for="(item,index) in team_list" :key="item.teamId" :label="item.teamName" :value="item.teamId"  >
									</el-option>
								</el-select>								
							</div>
						</div>
						<div class="free_area">
							<div class="label">Fee</div>
							<div class="coin_area">
								<input type="text" v-model="ttem.transferFee" class="coin_input" />
								<div class="coin">Coin</div>
							</div>
						</div>
					</div>
					<div class="remove">remove</div>
				</div>
				<div class="btn_area">
					<div class="save_btn" @click="saveTransfer">Save</div>
					<div class="cancel_btn" @click="jump_transfer">Back</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {teamAchievement,listTeam} from '@/api/play.js'
	import {showTransfer,saveTransfer,leagueTeamList} from '@/api/league.js'
	export default{
		name:'add_transfer',
		data(){
			return{
				detail_up:false,
				options2: [
					{
						value: '1',
						label: 'Manchester City'
					},
					{
						value: '2',
						label: 'Manchester City'
					},
				],
				dataForm:{
					teamId:'',
					teamName:''
					// options:'1',
					// coin_value:''
				},
				listQuery:{
					leagueId: '',
					teamName:''
				},
				team_list:[
					{
						team_detail:[
							
						]
					}
					
				],
				teamlogo:'',
				transfer_list:[],	//选择的战队成员
				team_member_list:[], //存储已选战队队员
				transfer_info:[]	//转会记录
			}
		},
		mounted() {
			// this.getTeam()
			this.getleagueTeamList()
		},
		methods:{
			jump_transfer(){
				this.$router.push({ path: '/league/transfer',query:{id:this.$route.query.id}})
			},
			
			///选择战队展示对应的战队logo
			showTeamLogo(event,userId){
				for(let k = 0; k < this.team_list.length; k++){
					if(this.team_list[k].teamId == event){
						// console.log("哈哈选中啦")
						for(let m=0;m < this.transfer_list.length;m++){
							if(this.transfer_list[m].userId == userId){
								this.transfer_list[m].transferTeamId = this.team_list[k].teamId
								this.transfer_list[m].transferTeamLogo = this.team_list[k].teamLogo
								// console.log("显示Id")
								console.log(this.transfer_list[m].transferTeamId)
								let params = {
									leagueId:this.$route.query.id
								}
								// console.log(params)
								showTransfer(params).then(res => {
									// console.log(res.data)
									this.transfer_info = res.data.list
									for(let n = 0; n < this.transfer_info.length; n++){
										if(this.transfer_info[n].player.id == userId){
											this.transfer_list[m].transferFree = this.transfer_info.transferFee
											this.transfer_list[m].transferTime = this.transfer_info.transferTime
										}
									}
									// console.log(this.transfer_info)
								})
							}
						}
						// this.teamlogo = this.team_list[k].teamLogo
					}
				}
			},
			//获取联赛战队及其战队成员
			getleagueTeamList(){
				this.listQuery.leagueId = this.$route.query.id
				leagueTeamList(this.listQuery).then(res => {
					for(let a = 0 ; a < res.data.length; a++){
						for(let b=0;b < res.data[a].members.length;b++){
							res.data[a].members[b]['check'] = false
						}
					}
					this.team_list = res.data
				})
			},
			//获取战队及其战队成员
			// getTeam(){
			// 	let that = this;
			// 	// 获取战队列表
			// 	listTeam({size:0}).then(res => {
			// 		that.team_list = res.data.list
			// 		console.log(that.team_list)
			// 		for(let d = 0; d < that.team_list.length; d++){
			// 			let params = {
			// 				teamId: that.team_list[d].teamId
			// 			}
			// 			// console.log(params)
			// 			// 获取战队详细信息
			// 			teamAchievement(params).then(res => {
			// 				// console.log(res.data)
			// 				let team_list = that.team_list
			// 				team_list[d].team_detail = res.data
			// 				for(let i = 0 ; i < team_list[d].team_detail.member.length; i++){
			// 					team_list[d].team_detail.member[i].check = false
			// 				}
			// 			})
						
			// 		}
			// 	})
			// },
			//选择战队成员
			select_member(item,utem){
				let that = this
				let { teamId } = item
				let { userId} = utem
				let team_list = that.team_list;
				for(let i = 0; i < team_list.length; i++){
					// console.log(team_list[i].team_detail.member)
					// 判断是否哪个战队的
					if(team_list[i].teamId == teamId){
						for(let j = 0; j < team_list[i].members.length; j++){
							if(team_list[i].members[j].userId == userId){
								team_list[i].members[j].check  = ! team_list[i].members[j].check
							}
						}
					}
					// that.$set(that.team_list, i, team_list[i])
				}
				// console.log(arr)
			},
			//将选择的战队成员赋给一个数组，在页面显示
			getTransfer_list(){
				let arr = []
				// console.log('追加')
				for(let a = 0; a < this.team_list.length; a++){
					// if(this.team_list[a].teamId == teamId){
						for(let c = 0; c < this.team_list[a].members.length;c++){
							if(this.team_list[a].members[c].check == true){
								// let data = Object.assign({}, this.team_list[a].team_detail.member[c]);
								// arr.push(data)
								// console.log(arr)
								let obj = {
									avatar:this.team_list[a].members[c].avatar,
									fullName:this.team_list[a].members[c].fullName,
									userId:this.team_list[a].members[c].userId,
									// role:this.team_list[a].members[c].role,
									position:this.team_list[a].members[c].position,
									teamId: this.team_list[a].teamId,
									teamLogo: this.team_list[a].teamLogo,
									teamName:this.team_list[a].teamName,
									transferTeam:'',
									transferTeamId:'',
									transferTeamLogo:'',
									transferTime:'',
									transferFee:''
								}
								arr.push(obj)
							}
						}
					// }
				}
				// console.log(arr)
				this.transfer_list = arr
				console.log(this.transfer_list)
				// this.showTransfer()
				this.detail_up = false
			},
			//显示用户转会的记录
			showTransfer(){
				console.log("执行了吗 ")
			},
			// 保存修改的转会记录
			saveTransfer(){
				let arr = []
				for(let h=0; h < this.transfer_list.length; h++){
					let obj1 = {
							leagueId:this.$route.query.id,
							playerId:this.transfer_list[h].userId,
							newClubId:this.transfer_list[h].transferTeamId,
							exClubId:this.transfer_list[h].teamId,
							transferFee:this.transfer_list[h].transferFee
					}
					if(this.transfer_list[h].transferTeamId != '' && this.transfer_list[h].transferTeamId != this.transfer_list[h].teamId){
						arr.push(obj1)
					}
				}
				// console.log(arr)
				if(arr == ''){
					this.$message({
						type: 'error',
						message: "请检查是否未选择新战队或者新战队与原战队一致！"
					});
				}else{
					let params = arr
					console.log(params)
					// let params = params_list
					saveTransfer(params).then(res => {
						this.$message({
							type: 'success',
							message: res.message
						});
					})
					this.$router.push({ path: '/league/transfer',query:{id:this.$route.query.id}})
				}
				
			},
		}
	}
</script>

<style lang="less" scoped>
	.container {
		width:93%;
		background: #33384B;
		margin: 0 56px;
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
							font-family:'Quicksand-Bold';
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
									width: 30%;
									background-color: #1B2023;
									display: flex;
									align-items: center;
									// justify-content: center;
									justify-content: flex-start;
									border-radius: 12px;
									padding: 20px 0 20px 10px;
									margin-right: 1%;
									margin-bottom: 20px;
									cursor: pointer;
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
											font-family:'Roboto-Bold';
											
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
												font-family:'Roboto-Regular';
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
		
		.switch_head{
			display: flex;
			align-items: center;
			margin: 0px 0 52px;
			font-family:'Quicksand-Regular';
			.switch_h_block{
				font-size: 20px;
				color: #FFFFFF;
				cursor: pointer;
				margin-right: 50px;
			}
		}
		.container_content{
			width: 95%;
			.add_block{
				height: 106px;
				background-color: #2a2e3f;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 7px;
				cursor: pointer;
				.add_img{
					width: 35px;
					height: 35px;
				}
			}
			.info_card{
				margin-top: 30px;
				background-color: #2a2e3f;
				display: flex;
				align-items: center;
				padding: 40px 50px;
				position: relative;
				border-radius: 14px;
				.card_left{
					width: 249px;
					height: 280px;
					background-color: #000000;
					display: flex;
					flex-flow: column;
					justify-content: center;
					align-items: center;
					position: relative;
					border-radius: 20px;
					.avatar{
						width: 123px;
						height: 123px;
						border-radius: 30px;
						object-fit: cover;
					}
					.user_name{
						color: #FFFFFF;
						font-size: 20px;
						margin: 20px 0 10px;
						font-family:'Roboto-Bold';
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
							font-family:'Roboto-Regular';
						}
					}
					.recycle{
						width: 20px;
						height: 20px;
						position: absolute;
						top: 16px;
						right: 16px;
					}
				}
				.card_right{
					margin-left: 120px;
					.club_time{
						font-family:'Roboto-Regular';
						.label{
							font-size: 16px;
							text-align: left;
							color: #727272;
							margin-bottom: 11px;
						}
						.time_value{
							color: #FFFFFF;
							font-size: 16px;
						}
					}
					.select_city{
						margin-right: 26px;
						margin-top: 30px;
						font-family:'Roboto-Regular';
						.sort_by_text{
							font-size: 18px;
							text-align: left;
							color: #727272;
							margin-bottom: 11px;
						}
						.options_select{
							position: relative;
							background-color: #33384B;
							// border: 1px solid #fff;
							width: 404px;
							height: 51px;
							border: 1px solid #76828E;
							display: flex;
							align-items: center;
							.info_radio{
								width: 26px;
								height: 26px;
								border-radius: 50%;
								margin-left: 10px;
							}
							/deep/ .el-select .el-input .el-input__inner {
								border: 0px;
								width: 360px;
								// height: 59px;
								padding: 0 20px;
								font-size: 18px;
								color: #fff;
								background-color: #33384B;
								font-family:'Roboto-Regular';
							}
							/deep/ .el-select-dropdown {
								background-color: #2a2e3f;
								border: 1px solid rgba(255,255,255,0.2);
							}
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
					.free_area{
						margin-top: 30px;
						.label{
							font-size: 16px;
							text-align: left;
							color: #727272;
							margin-bottom: 11px;
						}
						.coin_area{
							background-color: #33384B;
							width: 384px;
							height: 51px;
							border: 1px solid #76828E;
							display: flex;
							align-items: center;
							justify-content: space-between;
							padding: 0 10px;
							font-family:'Roboto-Regular';
							.coin_input{
								background-color: #33384B;
								padding-left: 20px;
								width: 360px;
								height: 48px;
								border: none;
								color: #FFFFFF;
								font-family:'Roboto-Regular';
							}
							.coin{
								color: #DBA83F;
								font-size: 16px;
							}
						}
					}
				}
				.remove{
					color: #FF2F06;
					font-size: 18px;
					position: absolute;
					top: 45px;
					right: 50px;
					font-family:'Roboto-Bold';
					cursor: pointer;
				}
			}
			.btn_area{
				display: flex;
				align-items: center;
				margin: 50px 0 0 50px;
				.save_btn{
					width: 163px;
					height: 58px;
					border-radius: 25px;
					background-color: #DBA83F;
					line-height: 58px;
					text-align: center;
					font-size: 20px;
					margin-right: 20px;
					font-family:'Roboto-Regular';
					cursor: pointer;
				}
				.cancel_btn{
					width: 163px;
					height: 58px;
					border: 1px solid #777777;
					border-radius: 25px;
					color: #FFFFFF;
					font-size: 20px;
					line-height: 58px;
					text-align: center;
					font-family:'Roboto-Regular';
					cursor: pointer;
				}
			}
		}
	}
</style>
