<template>
	<div class="index">
		<PlayView :index="4"></PlayView>
		<div class="container">
			<!-- 详情切换 -->
			<div class="user_type_container">
				<div class="user_return" @click="back"><<</div>
				<div class="user_type_block user_av" @click="jump_organizer">Organizer</div>
			</div>
			<!-- 对应详情块 -->
			<div class="information_container">
				<div class="user_details_block_container" >
					<div class="user_details_block" >
						<div class="user_details_left">
							<div class="user_avatr">
								<el-image :src="HOST + organInfo.avatar">
									<div slot="error" class="image-slot">
										<img src="../../assets/images/default.png" class="default_img"/>
									</div>
								</el-image>
								<!-- <el-image :src="HOST + organInfo.avatar" ></el-image> -->
							</div>
						</div>
						<div class="user_details_right">
							<div class="details_head">
								<div class="head_password">
									<div class="head_tit">Organizer</div>
									<div class="head_txt">{{organInfo.fullName}}</div>
									<!-- <div class="head_txt">Password</div>
									<div class="head_txt2">***********</div> -->
								</div>
								<!-- <div class="head_btn">Pro Max Member</div> -->
							</div>
							<div class="details_info">
								<div class="details_info_line">
									<div class="details_info_left">
										<div class="info_txt">Company Email</div>
										<div class="info_qvalue">{{organInfo.companyEmail}}</div>
									</div>
									<div class="details_info_right">
										<div class="info_txt">Contact Number</div>
										<div class="info_qvalue">{{organInfo.contactNumber}}</div>
									</div>
								</div>
								<div class="details_info_line">
									<!-- <div class="details_info_left">
										<div class="info_txt">Principal</div>
										<div class="info_qvalue">{{organInfo.email}}</div>
									</div> -->
									<div class="details_info_left">
										<div class="info_txt">Year of Registration</div>
										<div class="info_qvalue">{{organInfo.yearOfRegistration}}</div>
									</div>
									<div class="details_info_right">
										<div class="info_txt">Company Type</div>
										<div class="info_qvalue">{{organInfo.compamyType}}</div>
									</div>
								</div>
								<div class="details_info_line">
									<div class="details_info_left">
										<div class="info_txt">About Organizer</div>
										<div class="info_qvalue">{{organInfo.aboutOrganizer}}</div>
									</div>
									<div class="details_info_right">
										<div class="info_txt2">Company Registration Number</div>
										<div class="info_qvalue">{{organInfo.companyRegistrationNumber}}</div>
									</div>
								</div>
								<!-- <div class="details_info_line2">
									
								</div> -->
							</div>
						</div>
					</div>
					<div class="address_title">Address Information</div>
					<div class="user_details_address">
						<div class="address_info_line">
							<div class="address_info_left">
								<div class="info_txt">Address</div>
								<div class="info_qvalue">{{organInfo.addressDetail}}</div>
							</div>
							<div class="address_info_right">
								<div class="info_txt">Postcode</div>
								<div class="info_qvalue">{{organInfo.postcode}}</div>
							</div>
						</div>
						<div class="address_info_line">
							<div class="address_info_left">
								<div class="info_txt">State</div>
								<div class="info_qvalue">{{organInfo.addressState}}</div>
							</div>
							<div class="address_info_right">
								<div class="info_txt">Country</div>
								<div class="info_qvalue">{{organInfo.addressCountry}}</div>
							</div>
						</div>
					</div>
					<!-- Organize Tournament -->
					<div class="oragan_tour_container">
						<div class="tour_title">Organize Tournament</div>
						<div class="info_tour_container">
							<div class="tour_head">
								<div :class="tour_index == 1 ?'tour_tabs_tit tour_av':' tour_tabs_tit'" @click="tab_tour(1)">Upcoming</div>
								<div :class="tour_index == 2 ?'tour_tabs_tit tour_av':' tour_tabs_tit'" @click="tab_tour(2)">Processing</div>
								<div :class="tour_index == 3 ?'tour_tabs_tit tour_av':' tour_tabs_tit'" @click="tab_tour(3)">History</div>
							</div>
							<div class="tour_screen">
								<div class="screen_block" >
									<div class="choice_left">
										<!-- <div class="choice_block2">
											<div class="choice_text">Game Type</div>
											<div class="choice_date" >
												<div class="date_date">Dota 2</div>
												<div class="date_img">
													<img src="../../assets/images/more2.png" alt="">
												</div>
											</div>
										</div> -->
										<div class="status_block" >
											<div class="status_text">Game Type</div>
											<div class="options_select">
												<el-select v-model="listQuery.gameId" @change="handleFilter" placeholder="请选择" :popper-append-to-body="false">
													<el-option  key='' label="全部" value=""></el-option>
													<el-option v-for="gtem in category_list" :key='gtem.gameId' :label="gtem.gameName" :value="gtem.gameId">
													</el-option>
												</el-select>								
											</div>
										</div>
										<div class="status_block" >
											<div class="status_text">Game Format</div>
											<div class="options_select">
												<el-select v-model="listQuery.format" @change="handleFilter" placeholder="请选择" :popper-append-to-body="false">
													<el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
													</el-option>
												</el-select>								
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="upcom_container">
								<div class="upcom_card"  v-for="(item,index) in create_list" :key="index">
									<div class="upcom_left">
										<img class="upcom_left_img" :src="HOST + item.tournamentCover" alt="">
										<div class="upcom_position" v-if="item.authentication">
											<img class="upcom_position_img" src="../../assets/images/position.png" alt="">
										</div>
										<div class="myam_botm">
											<div class="myam_btom_left">
												<div class="myam_img" v-for="(utem,index) in detail_list" :key="index" v-show="utem.teamId != null && utem.teamId !=''" v-if="index<=3">
													<img :src="HOST + utem.teamLogo" alt="">
													
												</div>
												<div class="myam_img" v-for="(atem,index) in detail_list" :key="index" v-show="atem.teamId == null && atem.teamId ==''" v-if="index<=3">
													<img :src="HOST + atem.avatar" alt="" v-if="atem.avatar">
													<img src="../../assets/images/default.png" v-else />
												</div>
												<div class="join_num">+{{detail_list.length}}</div>
												<!-- <div class="myam_img">
													<img src="../../assets/images/friend_08.png" alt="">
												</div>
												<div class="myam_img">
													<img src="../../assets/images/friend_08.png" alt="">
												</div> -->
											</div>
										</div>
									</div>
									<div class="upcom_right">
										<div class="upcom_tit">{{ item.tournamentName }}</div>
										<div class="upcom_flex_text">
											<div class="upcom_time">Tournament ends at</div>
											<div class="text_right">{{initDete(item.createTime)}}</div>
										</div>
										<!-- <div class="upcom_time">Tournament ends at</div> -->
										<!-- <div class="match_hour_text">{{initDete(item.createTime)}}</div> -->
										<!-- <div class="upcom_time">11 October 2020</div> -->
										<div class="upcom_flex">
											<div class="upcom_flex_left">
												<div class="flex_left_img">
													<!-- <img src="../../assets/images/icon1.png" alt=""> -->
													<img src="../../assets/images/icon1.png" alt="" v-show="item.tournamentCategory=='privately'">
													<img src="../../assets/images/icon0.png" alt="" v-show="item.tournamentCategory=='officially'">
												</div>
												<div class="flex_left_img">
													<!-- <img src="../../assets/images/2icon.png" alt=""> -->
													<img src="../../assets/images/2icon.png" alt="" v-show="item.tournamentType==0">
													<img src="../../assets/images/icon3.png" alt="" v-show="item.tournamentType!='0'">
												</div>
											</div>
											<div class="upcom_flex_right">
												<div class="flex_right_img">
													<img :src="HOST + item.gameLogo" alt="" v-if="item.gameLogo">
													<img src="../../assets/images/default_game.png" v-else />
												</div>
											</div>
										</div>
										<div class="upcom_flex_text">
											<div class="text_left">Format</div>
											<div class="text_right">
												{{item.stages_format==1?'Single Elimination':item.stages_format==2?'Double Elimination':item.stages_format==3?'Round Robin':'Free For All'}}
											</div>
											<!-- <div class="text_right">Single Elimination</div> -->
										</div>
										<!-- <div class="upcom_flex_text">
											<div class="text_left">Best Of</div>
											<div class="text_right">4</div>
										</div> -->
										<div class="upcom_flex_text">
											<div class="text_left">Joinned</div>
											<div class="text_right">( {{player_list_len}}/{{item.participantsSize||0}} )</div>
											<!-- <div class="text_left">Progressed To</div>
											<div class="text_right">Round 1</div> -->
										</div>
										<div class="upcom_flex_text2" style="border-top: 1px solid #BF9D62;">
											<div class="text_left">Total Value</div>
											<div class="text_right">{{item.bonus}} USD</div>
											<!-- <div class="text_right">500,000,000 USD</div> -->
										</div>
									</div>
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
	import {manageDetail} from '@/api/user';
	import {tournamentList,eventDetail} from '@/api/macth.js'
	import PlayView from '@/components/play/left.vue';
	import {gamdList} from '@/api/game';
	export default {
		name: "organ_details",
		components: {
			PlayView
		},
		data() {
			return {
				userId:'',
				tour_index:1,
				condition:{
					type:'',
					type2:''
				},
				options2: [
					{
					value: '1',
					label: 'Single Elimination'
					},
					{
					value: '2',
					label: 'Double Elimination'
					},
					{
					value: '3',
					label: 'Round Robin'
					},
					{
					value: '4',
					label: 'Free For All'
					},
				],
				options3:[
					{
						value: '0',
						label: '个人赛'
					},
					{
						value: '1',
						label: '团队赛'
					}
				],
				organInfo:{},
				create_list:'',
				detail_list:'',
				listQuery: {
					tournamentName: "",
					// tournamentCategory: '',//officially
					tournamentType: "",
					state: 2,
					hot: "",
					gameId: "",
					createUser:this.$route.query.userId,
					format:'',//比赛模式1.单败 2.双败 3.循环 4.自由模式
					page: 1,
					size: 10
				},
				totalPrice:0,
				player_list_len:'',
				category_list:[],//游戏类型
			}
		},
		mounted(){
			 this.userId = this.$route.query.userId
			 this.manageDetail(this.userId);
			 this.getList(this.userId);
			 this.gameList()
		},
		methods: {
			back(){
				this.$router.go(-1);//返回上一层
			},
			tab_tour(index){
				this.tour_index = index
				if(this.tour_index == 1){
					this.listQuery.state = 2
					// this.getList(this.userId);
				}else if(this.tour_index == 2){
					this.listQuery.state = 3
					// this.getList(this.userId);
				}else if(this.tour_index == 3){
					this.listQuery.state = 4
					// this.get_events_list(this.userId);
				}
				this.getList(this.userId);
			},
			// 用户信息
			manageDetail(userId){
				let that = this;
				console.log('用户信息')
				let params = {
					userId
				}
				manageDetail(params).then(res => {					
					that.organInfo = res.data
				})
				
			},
			// 游戏列表
			gameList() {
				gamdList({}).then(res => {
					this.category_list = res.data.list
					console.log(this.category_list)
				})
			},
			//创建过的赛事
			getList(userId){
				// console.log(userId)
				tournamentList(this.listQuery).then(res => {
					// console.log(res.data.list)
					let arr = []
					let arr_list = []
					let total = 0
					for(let i=0;i<(res.data.list).length;i++){
						if(res.data.list[i].createUser == this.listQuery.createUser){
							// console.log(res.data.list[i].createUser)
							arr.push(res.data.list[i])
							// this.get_events_detail(res.data.list[i].id)
						}
						for(let j in  res.data.list[i].stages){
							res.data.list[i]['stages_format'] = res.data.list[i].stages[0].format
						}
						let params = {
							tournamentId:res.data.list[i].id
						}
						// console.log(params)
						eventDetail(params).then(res => {
							this.player_list_len = (res.data.contestant).length;
							// console.log(this.player_list_len)
							// arr_list.push(res.data)
							this.detail_list = res.data.contestant
							console.log(this.detail_list)
							
						})
					}
					this.create_list = arr
				})
			},
			//筛选
			handleFilter(){
				this.listQuery.page = 1;
				this.getList(this.userId);
			},
			jump_user(){
				this.$router.push({ path: '/user/user_index'})
			},
			jump_organizer(){
				this.$router.push({ path: '/user/user_organizer'})
			}
		}
	}
</script>

<style lang="less" scoped>
	.container {
		background: #33384B;
		margin: 0 56px 0 224px;
		padding: 0 20px 100px 20px;
		.user_type_container{
			margin: 0px 0 48px 0;
			padding: 48px 0 0px 0;
			display: flex;
			align-items: center;
			.user_return{
				color: #FFFFFF;
				font-size: 21px;
				cursor: pointer;
				font-family:'Quicksand-Bold';
				margin-right: 53px;
			}
			.user_type_block{
				color: #FFFFFF;
				font-size: 21px;
				font-family:'Quicksand-Bold';
				margin-right: 50px;
				cursor: pointer;
			}
			.user_av{
				color: #DBA83F;
				position: relative;
				font-family:'Quicksand-Bold';
			}
			.user_av:before {
				content: '';
				position: absolute;
				left: 0px;
				bottom:-10px;
				width: 100%;
				border-top: 3px solid #DBA83F;
			}
		}
		// 对应详情块
		.information_container{
			// User Information / Host  头部
			.user_details_block_container{
				.user_details_block{
					padding:40px 143px 40px  71px;
					background: #0E0F11;
					border-radius: 22px;
					display: flex;
					justify-content: space-between;
					.user_details_left{
						display: flex;
						align-items: center;
						.user_avatr{
							width: 168px;
							height: 168px;
							margin-right: 100px;
							/deep/.el-image{
								width: 168px;
								height: 168px;
								border-radius: 24px;
								object-fit: cover;
							}
							.default_img{
								width: 168px;
								height: 168px;
							}
						}
					}
					.user_details_right{
						width: 80%;
						.details_head{
							display: flex;
							align-items: center;
							justify-content: space-between;
							padding-bottom: 10px;
							border-bottom: 2px solid #2d2d2d;
							.head_password{
								display: flex;
								align-items: center;
								.head_tit{
									color: #DBA83F;
									font-size: 22px;
									margin-right: 37px;
								}
								.head_txt{
									color: #FFFFFF;
									font-size: 18px;
									font-family:'Roboto-Bold';
									margin-right: 27px;
								}
								.head_txt2{
									font-size: 18px;
									color: #CECECE;
									font-family:'Roboto-Regular';
								}
							}
							.head_btn{
								width: 133px;
								height: 40px;
								background: #1C2023;
								border: 1px solid #DBA83F;
								border-radius: 13px;
								color: #DBA83F;
								font-family:'Roboto-Regular';
								font-size: 14px;
								display: flex;
								align-items: center;
								justify-content: center;
							}
						}
						.details_info{
							margin: 24px 0 0 0 ;
							.details_info_line{
								display: flex;
								margin-bottom: 30px;
								.details_info_left{
									width: 50%;
									display: flex;
									align-items: center;
									.info_txt{
										width: 37%;
										color: #FFFFFF;
										font-size: 18px;
										font-family:'Roboto-Bold';
									}
									.info_qvalue{
										color: #CECECE;
										font-size: 18px;
										font-family:'Roboto-Regular';
									}
								}
								.details_info_right{
									width: 50%;
									display: flex;
									align-items: center;
									.info_txt{
										width: 44%;
										color: #FFFFFF;
										font-size: 18px;
										font-family:'Roboto-Bold';
									}
									.info_txt2{
										width: 52%;
										color: #FFFFFF;
										font-size: 18px;
										font-family:'Roboto-Bold';
									}
									.info_qvalue{
										color: #CECECE;
										font-size: 18px;
										font-family:'Roboto-Regular';
									}
								}
							}
							.details_info_line2{
								display: flex;
								margin-bottom: 30px;
								.details_info_left{
									display: flex;
									width: 100%;
									.info_txt{
										width: 19%;
										color: #FFFFFF;
										font-size: 18px;
										font-weight: bold;
									}
									.info_qvalue{
										color: #CECECE;
										font-size: 18px;
										font-weight: 500;
										line-height: 25px;
									}
								}
								
							}
						}
					}
				}
				.address_title{
					color: #FFFFFF;
					font-size: 22px;
					font-family:'Quicksand-Bold';
					margin: 46px 0 20px 20px;
				}
				.user_details_address{
					padding:43px 52px 43px  52px;
					background: #0E0F11;
					border-radius: 13px;
					.address_info_line{
						display: flex;
						margin-bottom: 30px;
						.address_info_left{
							width: 57%;
							display: flex;
							align-items: center;
							.info_txt{
								width: 20%;
								color: #FFFFFF;
								font-size: 18px;
								font-family:'Roboto-Bold';
							}
							.info_qvalue{
								color: #CECECE;
								font-size: 18px;
								font-family:'Roboto-Regular';
							}
						}
						.address_info_right{
							width: 43%;
							display: flex;
							align-items: center;
							.info_txt{
								width: 30%;
								color: #FFFFFF;
								font-size: 18px;
								font-family:'Roboto-Bold';
							}
							.info_qvalue{
								color: #CECECE;
								font-size: 18px;
								font-family:'Roboto-Regular';
							}
						}
					}
					.address_info_line:last-child{
						margin-bottom: 0;
					}
				}
				.oragan_tour_container{
					.tour_title{
						color: #FFFFFF;
						font-size: 22px;
						font-family:'Quicksand-Bold';
						margin: 46px 0 20px 20px;
					}
					.info_tour_container{
						padding:0px 0px 0px  0px;
						background: #0E0F11;
						border-radius: 28px;
						.tour_head{
							display: flex;
							align-items: center;
							padding: 44px 32px 26px 32px;
							border-bottom: 2px solid #2D2D2D;
							.tour_tabs_tit{
								width: 200px;
								color: #868686;
								font-size: 22px;
								font-family:'Roboto-Bold';
								cursor: pointer;
							}
							.tour_av{
								color: #FFFFFF;
								font-size: 22px;
								font-family:'Roboto-Bold';
							}
						}
						.tour_screen{
							margin-top: 32px;
							padding: 0 47px;
							.screen_block{
								display: flex;
								.choice_left{
									display: flex;
									.choice_text{
										font-size: 18px;
										text-align: left;
										color: #fff;
										font-family:'Roboto-Regular';
										margin-bottom: 11px;
									}
									.choice_block2{
										.choice_date{
											width: 230px;
											height: 59px;
											background-color: #33384b;
											border: 1px solid #fff;
											border-radius: 20px;
											padding: 0 24px 0 16px;
											margin-right: 44px;
											display: flex;
											align-items: center;
											justify-content: space-between;
											.date_date{
												color: #FFFFFF;
												font-size: 20px;
												font-family:'Roboto-Regular';
											}
											.date_img{
												width: 32px;											
												img{
													width: 32px;
													height: 21px;
													object-fit: fill;
												}
											}
										}
									}
									.status_block{
										margin-right: 36px;
										.status_text{
											font-size: 18px;
											text-align: left;
											color: #fff;
											font-family:'Roboto-Regular';
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
												font-family:'Roboto-Regular';
												border-radius: 20px;
												background-color: #33384b;
												border: 1px solid #fff;
											}
											/deep/ .el-select-dropdown {
												background-color: #33384b;
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
								}
							}
						}
						.upcom_container{
							display: flex;
							flex-wrap: wrap;
							margin-top: 65px;
							padding: 0 32px;
							.upcom_card{
								width: 985px;
								height: 371px;
								background: #000000;
								border: 2px solid #232323;
								border-radius: 16px;
								display: flex;
								margin-bottom: 28px;
								overflow: hidden;
								cursor:pointer;
								.upcom_left{
									width: 369px;
									height: 371px;
									position: relative;
									.upcom_left_img{
										width: 369px;
										height: 371px;
										object-fit: cover;
									}
									//定位
									.upcom_position{
										position: absolute;
										right: -13px;
										top: -11px;
										.upcom_position_img{
											width: 220px;
										}
									}
									.myam_botm{
										position: absolute;
										bottom: 0;
										display: flex;
										align-items: center;
										width: 100%;
										background: rgba(0, 0, 0, 0.6);
										.myam_btom_left{
											display: flex;
											padding: 10px 20px;
											.myam_img{
												width: 43px;
												height: 43px;
												border-radius: 18px;
												overflow: hidden;
												margin-right: 7px;
												img{
													width: 43px;
													height: 43px;
													object-fit: cover;
												}
											}
											.join_num{
												width: 49px;
												height: 49px;
												line-height: 49px;
												color: #7C7C7C;
												font-family:'Roboto-Regular';
												font-size: 18px;
												overflow: hidden;
												border-radius: 18px;
												text-align: center;
												background-color: #303030;
											}
										}
									}
								}
								.upcom_right{
									width: 52%;
									padding: 41px 30px 0px  30px ;
									.upcom_tit{
										font-size: 21px;
										color: #fff;
										line-height: 27px;
										font-family:'Roboto-Regular';
										margin-bottom: 25px;
									}
									// .upcom_time{
									// 	color: #D3AA53;
									// 	font-size: 18px;
									// 	font-weight: 500;
									// 	margin: 10px 0;
									// }
									.upcom_flex{
										display: flex;
										align-items: center;
										justify-content: space-between;
										.upcom_flex_left{
											display: flex;
											align-items: center;
											.flex_left_img{
												width: 45px;
												height: 45px;
												background: #0E0F11;
												border-radius: 12px;
												display: flex;
												align-items: center;
												justify-content: center;
												margin-right: 12px;
												img{
													width: 45px;
													height: 45px;
												}
											}
											
										}
										.upcom_flex_right{
											.flex_right_img{
												width: 55px;
												height: 57px;
												img{
													width: 55px;
													height: 57px;
												}
											}
										}
									}
									.upcom_flex_text{
										display: flex;
										align-items: center;
										line-height: 35px;
										justify-content: space-between;
										.text_left{
											color: #BF9D62;
											font-size: 18px;
											font-family:'Roboto-Regular';
										}
										.upcom_time{
											color: #D3AA53;
											font-size: 18px;
											font-family:'Roboto-Regular';
										}
										.text_right{
											color: #ffffff;
											font-size: 18px;
											font-family:'Roboto-Regular';
										}
									}
									.upcom_flex_text2{
										display: flex;
										align-items: center;
										line-height: 35px;
										padding-top: 12px;
										margin-top: 10px;
										justify-content: space-between;
										.text_left{
											color: #BF9D62;
											font-size: 18px;
											font-family:'Roboto-Regular';
										}
										.text_right{
											color: #ffffff;
											font-size: 22px;
											font-family:'Roboto-Bold';
										}
									}
								}
							}
						}
					}
				}
			}
			
		}
	}
</style>
