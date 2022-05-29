<template>
	<div class="index">
		<PlayView :index="1"></PlayView>
		<div class="container">
			<div class="top_tabs">
				<div class="tabs_block" @click="jump_user">用户管理  /</div>
				<div class="tabs_block">用户详情</div>
			</div>
			<div class="user_container">
				<div class="user_head">
					<div class="screen_title">
						<div class="screen_text">用户管理</div>
					</div>
				</div>
				<div class="user_info_block">
					<div class="info_title">基本信息</div>
					<div class="info_line_block">
						<div class="info_column_block">
							<div class="column_left">昵称：</div>
							<el-tooltip class="item" effect="dark" :content="userInfo.fullName" placement="bottom">
								<div class="column_right user_name">{{userInfo.fullName}}</div>
							</el-tooltip>
						</div>
						<div class="info_column_block">
							<div class="column_left">头像：</div>
							<div class="column_right">
								<el-image :src="HOST + userInfo.avatar" class="colum_avatar">
									<div slot="error" class="image-slot">
										<img src="../../assets/images/default.png" class="colum_avatar" />
									</div>
								</el-image>
								<!-- <img src="../../assets/images/default.png" v-if="userInfo.avatar == null || userInfo.avatar == ''" class="colum_avatar"/> -->
								<!-- <img :src="HOST + userInfo.avatar" class="colum_avatar" alt="" v-else> -->
							</div>
						</div>
						<div class="info_column_block">
							<div class="column_left">姓名：</div>
							<el-tooltip class="item" effect="dark" :content="userInfo.userName" placement="bottom">
								<div class="column_right user_name">{{userInfo.userName}}</div>
							</el-tooltip>
						</div>
						<div class="info_column_block">
							<div class="column_left">手机号：</div>
							<div class="column_right">{{userInfo.phoneNumber}}</div>
						</div>
					</div>
					<div class="info_line_block">
						<div class="info_column_block">
							<div class="column_left">生日：</div>
							<div class="column_right">
								{{(initDete(userInfo.birthday)).substring(0, 10)}}
							</div>
						</div>
						<div class="info_column_block">
							<div class="column_left">性别：</div>
							<div class="column_right">{{userInfo.gender}}</div>
						</div>
						
						<div class="info_column_block">
							<div class="column_left">婚姻状况：</div>
							<div class="column_right">{{userInfo.relationship}}</div>
						</div>
						<div class="info_column_block">
							<div class="column_left">Email：</div>
							<div class="column_right">{{userInfo.email}}</div>
						</div>
					</div>
					<div class="info_line_block">
						<div class="info_column_block">
							<div class="column_left">OKU：</div>
							<div class="column_right">
								{{userInfo.oku}}
							</div>
						</div>
						<div class="info_column_block">
							<div class="column_left">国籍：</div>
							<div class="column_right">{{userInfo.nationality}}</div>
						</div>
						
						<div class="info_column_block">
							<div class="column_left">个人简介：</div>
							<div class="column_right">{{userInfo.introduction}}</div>
						</div>
					</div>
				</div>
				<div class="user_info_block">
					<div class="info_title">地址信息</div>
					<div class="info_line_block2">
						<div class="info_column_block">
							<div class="column_left">地址：</div>
							<div class="column_right">{{userInfo.addressDetail}}</div>
						</div>
						<div class="info_column_block">
							<div class="column_left">邮政编码：</div>
							<div class="column_right">{{userInfo.postcode}}</div>
						</div>
					</div>
					<div class="info_line_block2">
						<div class="info_column_block">
							<div class="column_left">城市：</div>
							<div class="column_right">{{userInfo.addressState}}</div>
						</div>
						<div class="info_column_block">
							<div class="column_left">国家：</div>
							<div class="column_right">{{userInfo.addressCountry}}</div>
						</div>
					</div>
				</div>
				<div class="user_info_block">
					<div class="info_title">钱包信息</div>
					<div class="info_line_block">
						<div class="info_column_block">
							<div class="column_left">余额：</div>
							<div class="column_right">{{userInfo.coin}}</div>
						</div>
						<div class="info_column_block">
							<div class="column_left">积分：</div>
							<div class="column_right">{{userInfo.point}}</div>
						</div>
						<div class="info_column_block">
							<div class="column_left">奖金：</div>
							<div class="column_right">{{userInfo.prize}}</div>
						</div>
					</div>
				</div>
				<div class="user_info_block">
					<div class="info_title">银行卡信息</div>
					<div class="info_line_block" v-for="(btem,bdex) in bankAccount" :key='bdex'>
						<div class="info_column_block">
							<div class="column_left">银行名称：</div>
							<div class="column_right">{{btem.bankName}}</div>
						</div>
						<div class="info_column_block">
							<div class="column_left">开户行：</div>
							<div class="column_right">{{btem.name}}</div>
						</div>
						<div class="info_column_block">
							<div class="column_left">卡号：</div>
							<div class="column_right">{{btem.accountNumber}}</div>
						</div>
					</div>
				</div>
				<div class="user_info_block">
					<div class="info_title">战队信息</div>
					<div class="info_line_block" v-for="(ttam,tdex) in team" :key='tdex'>
						<div class="info_column_block">
							<div class="column_left">战队名称：</div>
							<div class="column_right">{{ttam.teamName}}</div>
						</div>
						<div class="info_column_block">
							<div class="column_left">战队身份：</div>
							<div class="column_right">{{ttam.leaderId == ttam.userId ? '队长' : '队员'}}</div>
						</div>
					</div>
				</div>
				<div class="user_info_block">
					<div class="info_title">游戏配置</div>
					<div class="right_form_information">
						<!-- 没有数据 -->
						<div class="no_data_area"  v-if="profile_list == ''" >
							<div class="no_data">
								<div class="no_data_text">No Game Profile</div>
								<!-- <div class="no_data_text">You may add yours now</div> -->
							</div>
						</div>
						<div class="form_inputs" v-if="profile_list != ''">
							<div class="form_input3">
								<div class="inputs_img1" v-for="(item,index) in profile_list" :key='index'>
									<el-image :src="HOST + item.gameLogo" :class="game_index == index ? 'game_img progile_img':'game_img'" @click="switch_game(index)"> 
										<div slot="error" class="image-slot"> 
											<img src="../../assets/images/default_game.png" class="default_img"  @click="switch_game(index)"/>
										</div>
									</el-image>
								</div>
							</div>
							<div class="form_content">
								<div class="form_input1">
									<p>In Game Name (IGN)</p>
									<input type="text" class="input" disabled="disabled" v-model="profile_list[game_index].ign">
								</div>
								<div class="form_input1">
									<p>In Game ID (IGID)</p>
									<input type="text" class="input" disabled="disabled" v-model="profile_list[game_index].igid">
								</div>
								<div class="form_input1">
									<p>Game Character</p>
									<input type="text" class="input" disabled="disabled" v-model="profile_list[game_index].role">
								</div>
							</div>
							<div class="form_input3" style="width:98%">
								<p>In Game Introduction （why people should team with me) </p>
								<textarea name="" id="" cols="30" rows="10" disabled="disabled" v-model="profile_list[game_index].introduce"></textarea>
							</div>
						</div>
					</div>
									
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {userDetail} from '@/api/user';
	import PlayView from '@/components/play/left.vue';
	import {profileGameUser} from '@/api/game.js'
	export default {
		name: "user_details",
		components: {
			PlayView
		},
		data() {
			return {
				userId:'',
				bankAccount:[],//银行卡信息
				team:[],//战队信息
				userInfo:{}, //用户信息
				profile_list:[],
				game_index:0
			}
		},
		mounted(){
			 this.userId = this.$route.query.userId
			 this.userDetail(this.userId);
			 this.getGameProfile()
		},
		methods: {
			switch_game(index) {
				this.game_index = index
			},
			getGameProfile(){
				profileGameUser({userId:this.userId}).then(res => {
					console.log(res.data,"游戏配置")
					this.profile_list = res.data
					console.log(this.profile_list,"profile_list")
				})
			},
			// 用户信息
			userDetail(userId){
				let that = this;
				let params = {
					userId
				}
				userDetail(params).then(res => {
					that.userInfo = res.data.userInfo
					that.team = res.data.team
					that.bankAccount = res.data.bankAccount
				})
			},
			jump_user(){
				this.$router.push({ path: '/user/user_index'})
			},
		}
	}
</script>

<style lang="less" scoped>
	.container {
		background: #33384B;
		// margin: 0 56px;
		// padding-bottom:80px;
		margin: 0 56px 0 224px;
		padding: 0 20px 100px 20px;
		.top_tabs{
			position: fixed;
			display: flex;
			top: 98px;
			.tabs_block{
				font-size: 14px;
				font-family:'Roboto-Regular';
				font-weight: 400;
				color: rgba(255, 255, 255, 0.65);
				line-height: 22px;
				margin-right: 8px;
				cursor: pointer;
			}
			.tabs_block:last-child{
				margin-right: 0;
			}
		}
		.user_container {
			.user_head {
				padding: 18px 31px 18px 17px;
				.screen_title {
					display: flex;
					align-items: center;
					.screen_text {
						font-size: 18px;
						
						font-weight: 500;
						color: #FFFFFF;
					}
				}
			}
			.user_info_block{
				margin: 0px 31px 0px 17px;
				padding: 24px 0;
				border-bottom: 1px solid #707896;
				.info_title{
					font-size: 16px;
					font-family:'Roboto-Regular';
					font-weight: 500;
					color: rgba(255, 255, 255, 0.97);
					line-height: 24px;
					margin-bottom: 25px;
				}
				.info_line_block{
					display: flex;
					margin-bottom: 31px;
					.info_column_block{
						width: 24%;
						display: flex;
						align-items: center;
						font-size: 14px;
						font-weight: 500;
						color: #FFFFFF;
						.column_left{
							// width: 28%;
							width: 130px;
							text-align: right;
							margin-right: 8px;
							font-family:'Roboto-Regular';
						}
						.column_right{
							width: 78%;
							font-family:'Roboto-Regular';
							.colum_avatar{
								width: 44px;
								height: 44px;
								border-radius: 50%;
								object-fit: cover;
								// border: 1px solid #FAFAFA;
							}
						}
						.user_name{
							width: 78%;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
					}
				}
				.info_line_block:last-child{
					margin-bottom: 0;
				}
				.info_line_block2{
					display: flex;
					margin-bottom: 31px;
					.info_column_block{
						width: 40%;
						display: flex;
						align-items: center;
						font-size: 14px;
						font-weight: 500;
						color: #FFFFFF;
						.column_left{
							// width: 15%;
							width: 110px;
							text-align: right;
							margin-right: 8px;
							font-family:'Roboto-Regular';
						}
						.column_right{
							width: 75%;
							font-family:'Roboto-Regular';
							.colum_avatar{
								width: 44px;
								height: 44px;
								border-radius: 50%;
								object-fit: cover;
								border: 1px solid #FAFAFA;
							}
						}
					}
				}
				.info_line_block2:last-child{
					margin-bottom: 0;
				}
				.right_form_information {
					width: 95%;
					margin: 0 2.5%;
					margin-top: 30px;
				
					.information_title {
						color: #fff;
						padding-top: 20px;
					}
					.no_data_area{
						width: 100%;
						height:50px;
						display: flex;
						align-items: center;
						justify-content: center;
						font-family:'Roboto-Regular';
						.no_data{
							text-align: center;
							img{
								margin-bottom: 25px;
							}
							.no_data_text{
								color: #565656;
								font-size: 20px;
								margin-bottom: 10px;
							}
						}
					}
					.form_inputs {
						font-family:'Roboto-Regular';
						.form_content {
							display: flex;
							justify-content: space-between;
							/* 横向中间自动空间 */
							flex-wrap: wrap;
							margin-bottom: 20px;
							.form_input1 {
								// width: 45%;
								width: 33%;
								margin-top: 20px;
								position: relative;
								// &:nth-child(2n) {
								// 	position: relative;
								// 	left: -20px;
								// }
								p {
									color: #727272;
									font-size: 15px;
									span {
										color: red;
									}
								}
								.input {
									width: 100%;
									border: none;
									// border-radius: 19px;
									color: #fff;
									background: inherit;
									font-size: 16px;
								}
								.form_input_phone {
									width: 150px;
									display: flex;
									align-items: center;
									position: absolute;
									top: 47px;
									left: 20px;
									p {
										height: 30px;
										line-height: 30px;
										margin-left: 10px;
										border-right: 1px solid #2d2d2d;
										padding-right: 10px;
									}
								}
								.form_input1_content {
									width: 105%;
									height: 55px;
									border: 2px solid #2D2D2D;
									border-radius: 19px;
									position: relative;
									input {
										width: 85%;
										height: 55px;
										color: #fff;
										background: inherit;
										padding-left: 20px;
										border: none;
										font-size: 16px;
									}
									.input1 {
										width: 50%;
										margin-left: 130px;
									}
									img {
										position: absolute;
										right: 15px;
										top: 20px
									}
								}
				
							}
				
						}
						.form_input3 {
							width: 100%;
							display: inline-block;
							&:nth-child(1) {
								border-bottom: 1px solid #2d2d2d;
							}
							padding-bottom: 30px;
							.inputs_img1 {
								display: flex;
								align-items: center;
								float: left;
								.game_img {
									width: 100px;
									height: 100px;
									object-fit: fill;
									margin-right: 40px;
									border-radius: 50%;
								}
								.progile_img{
									border: 2px solid rgba(255,255,255,0.5);
								}
								.default_img{
									width: 100px;
									height: 100px;
									object-fit: fill;
									margin-right: 40px;
								}
								p {
									color: #fff;
									margin-left: 20px;
								}
							}
							p {
								color: #727272;
								font-size: 15px;
				
								span {
									color: red;
								}
							}
							input {
								width: 100%;
								height: 55px;
								border: 2px solid #2D2D2D;
								border-radius: 19px;
								color: #fff;
								background: inherit;
								padding-left: 20px;
								font-size: 16px;
							}
							textarea {
								width: calc(100% - 20px);
								border: none;
								border-radius: 15px;
								color: #fff;
								background: inherit;
								font-size: 16px;
								height: 120px;
								resize: none;
								font-family:'Roboto-Regular';
							}
						}
					}
				}
							
			}
			
		}

	}
</style>
