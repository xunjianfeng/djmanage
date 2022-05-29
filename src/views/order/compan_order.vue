<template>
	<div class="index" id="wangeditor">
		<div class="container">
			<div class="predict_container">
				<!-- 内容 -->
				<div class="predict_content">
					<div class="predict_head">
						<div class="predict_back" @click="go_back">
							<span>
								<<</span> Order <span style="margin-left: 10px;">{{order_list.orderId}}
							</span>
						</div>
					</div>
					<div class="step_content">
						<!-- 订单信息 -->
						<div class="order_form">
							<div class="order_form_header">
								<div class="left_block" @click.stop="detail_open =! detail_open">
									<p>Date<span>{{(this.initDete(order_list.createTime))}}</span></p>
									<!-- <p>Buyer Peter<span>{{order_list.fullName}}</span></p> -->
									<p>Game Type<span>{{order_list.gameName}}</span></p>
									<p class="options">
										Status
										<span :style="order_list.state==1?'color: #FF971A;':order_list.state==2?'color: #23B709;':order_list.state==3?'color: #FF971A;':order_list.state==4?'color: #00AAFF;':order_list.state==5?'color: #FF3636;':''">
											{{order_list.state==1?'待接单':order_list.state==2?'待完成':order_list.state==3?'To leave a review':order_list.state==4?'Completed':order_list.state==5?'Rejected':''}}
										</span>
									</p>
								</div>
								<div class="right_block">
									<img src="../../assets/images/close.png" @click.stop="detail_open = false" />
								</div>
							</div>
							<div class="order_form_user" v-if="detail_open == true">
								<div class="user">
									<el-image :src="HOST + order_list.avatar" class="user_pic">
										<div slot="error" class="image-slot">
											<img src="../../assets/images/default.png" class="user_pic" />
										</div>
									</el-image>
									<!-- <img class="user_pic" :src="HOST+order_list.avatar" /> -->
									<p>{{order_list.fullName}}</p>
								</div>
								<!-- <div class="form_user_right" v-show="order_list.state==1">
									<div class="user_right_jian">
										<img  class="jian_img" src="../../assets/images/ban.png" />
										<div class="jian_text">Reject Order</div>
									</div>
									<img class="msg" src="../../assets/images/chat.png" />
								</div> -->
								<div class="form_user_right" v-show="order_list.state==2">
									<div class="form_review" @click.stop="companionComplete(item.orderId)">Completed</div>
								</div>
								<!-- <div class="form_user_right" v-show="order_list.state==4">
									<div class="form_review" @click.stop="update_up = true;companionOrderId=order_list.orderId">Review</div>
								</div> -->
							</div>
							<div class="order_form_table" v-if="detail_open === true">
								<div class="order_table_header">
									<p>Game Type</p>
									<p>Play Date</p>
									<p>Unit Price</p>
									<p>Quantity</p>
									<p>Price</p>
									<p>Remarks</p>
								</div>
								<div class="order_table_body">
									<div>
										<p>{{order_list.gameName}}</p>
										<p>{{initDete(order_list.startDate)}}</p>
										<p>{{order_list.price}} {{order_list.payMethod}}</p>
										<p>{{order_list.hours}}</p>
										<p>{{order_list.totalAmount}} {{order_list.payMethod}}</p>
										<p>-</p>
									</div>
									<div class="total_price">
										<p>Total</p>
										<p>{{order_list.totalAmount}}{{order_list.payMethod}}</p>
									</div>
								</div>
								<!-- <div class="table_bottom" v-if="order_list.state == 1">
									<div class="flx_l" @click="companionAgree(order_list.orderId,false)">
										<img src="../../assets/images/ban.png" />
										<p>Reject Order</p>
									</div>

									<button class="order_btn" @click="companionAgree(order_list.orderId,true)">Order Accept</button>
								</div> -->
							</div>
						</div>
						<!-- Companion Information -->
						<div class="companion_mation">
							<div class="compain_title">Companion Information</div>
							<div class="companion_container">
								<div class="mation_left">
									<el-image :src="HOST + info.avatar" class="mation_logo">
										<div slot="error" class="image-slot">
											<img src="../../assets/images/default.png" class="default_avatar" />
										</div>
									</el-image>
									<!-- <img class="mation_logo" :src="HOST + info.avatar" alt=""> -->
									<div class="popularity_block">
										<img src="../../assets/images/huo.png" alt="">
										<div class="popu_num">{{info.popularity}}</div>
									</div>
								</div>
								<div class="mation_right">
									<div class="right_head">
										<div class="head_text">{{info.fullName}}</div>
										<div class="head_button">{{info.vipLevel}} Member</div>
										<!-- <div class="head_button">Pro Max Member</div> -->
									</div>
									<div class="right_in">
										<div class="img_nav">
											<div :class="game_index == mtex ? 'nav_1 nav_av':'nav_1'" v-for="(mtem,mtex) in companionGame" :key="mtex">
												<el-image :src="HOST + mtem.gameLogo" class="game_logo" @click="switch_game(mtex)">
													<div slot="error" class="image-slot">
														<img src="../../assets/images/default_game.png" class="game_logo"  @click="switch_game(mtex)"/>
													</div>
												</el-image>
												<!-- <img :src="HOST + mtem.gameLogo" @click="switch_game(mtex)" /> -->
											</div>
										</div>
										<div class="content_right_info">
											<div class="top_3">
												<div class="table">
													<div class="tb_header">
														<p>In Game ID</p>
														<p>iN Game Name</p>
														<p>Game Character</p>
														<p>Strength</p>
														<p>Availability Time Slot</p>
													</div>
													<div class="tb_body">
														<p>{{companionGame[game_index].inGameId}}</p>
														<p>{{companionGame[game_index].gameNickname}}</p>
														<p>{{companionGame[game_index].role}}</p>
														<p>{{companionGame[game_index].strength}}</p>
														<p>
															<img src="../../assets/images/yg.png" style="margin-right: 10px;" />
															{{ (companionGame[game_index].startTime).substring(0,5) }} - {{ (companionGame[game_index].endTime).substring(0,5)}}
															<!-- {{initDete(companionGame[game_index].startTime)}} - {{initDete(companionGame[game_index].endTime)}} -->
														</p>
													</div>
												</div>
												<div class="top_1">
													<div class="price_hour">
														<p class="price"><span>{{companionGame[game_index].price}}</span>{{companionGame[game_index].priceUnit}}</p>
														<p>/ per hour</p>
													</div>
													<div class="select_num">
														<div class="audio">
															<audio controls v-if=" companionGame[game_index].soundUrl != ''">
																<!-- https://img.tukuppt.com/newpreview_music/00/10/93/5d819c5a0582950889.mp3 -->
																<source :src="HOST + companionGame[game_index].soundUrl" type="audio/mpeg">您的浏览器不支持 audio 元素。
															</audio>
														</div>
													</div>
												</div>
												<div class="note_tip">
													<p class="note_tit">Note For User Before Place Order</p>
													<p>{{companionGame[game_index].note}}</p>
												</div>
											</div>
										</div>
									</div>

								</div>
							</div>
						</div>
						<!-- Description / Display Area -->
						<div class="description_displayArea">
							<div class="area_head">
								<div :class="swit_bx == 1 ?'area_text  area_av':'area_text' " @click="bx_swit(1)">Description</div>
								<div :class="swit_bx == 2 ?'area_text  area_av':'area_text' " @click="bx_swit(2)">Display Area</div>
							</div>
							<div class="area_content">
								<div class="area_one" v-if="swit_bx == 1">
									<div class="area_txt">{{info.introduction}}</div>
								</div>
								<div class="area_two" v-else>
									<div class="area_two_left">
										<img :src="HOST + companionGame[game_index].displayArea[latex].url" alt="">
									</div>
									<div class="area_two_right">
										<img v-for="(atem,atex) in companionGame[game_index].displayArea" :key="atex" :src="HOST + atem.url" @click="uparea(atex)" />
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
	import {
		companionDetail,
		companionOrder,
		companionAgree,
		companionComplete
	} from '@/api/order';
	import LeftView from '@/components/center/left.vue';
	import Tinymce from '@/components/Tinymce';
	export default {
		name: "compan_order",
		components: {
			LeftView,
			Tinymce
		},
		data() {
			return {
				swit_bx: 1,
				game_index: 0, //切换陪玩信息
				info: {}, //基本信息
				companionGame: [], //陪玩信息
				latex: 0, //Display Area 切换index
				order_list: {}, //陪玩订单信息
				detail_open: true,
				
			};
		},
		mounted() {
			this.order_list = JSON.parse(this.$route.query.news)
			console.log(this.order_list)
			this.playDetail();
		},
		methods: {
			// 陪玩信息
			playDetail(userId) {
				let that = this;
				let params = {
					userId: that.order_list.companionId
				}
				companionDetail(params).then(res => {
					const {
						info,
						companionGame
					} = res.data
					that.info = info
					that.companionGame = companionGame
				})
			},
			// 同意/取消订单
			companionAgree(companionOrderId, agree) {
				let params = {
					companionOrderId,
					agree
				}
				companionAgree(params).then(res => {
					this.$message({
						type: 'success',
						message: res.message
					});
					this.getList()
				})
			},
			// 完成订单
			companionComplete(companionOrderId) {
				let params = {
					companionOrderId,
				}
				companionComplete(params).then(res => {
					this.$message({
						type: 'success',
						message: res.message
					});
					this.getList()
				})
			},
			bx_swit(index) {
				this.swit_bx = index;
			},
			// Display Area 切换
			uparea(index) {
				this.latex = index
			},
			// 切换陪玩信息
			switch_game(index) {
				this.game_index = index
			},
			go_back() {
				this.$router.go(-1);
			}
		}
	};
</script>
<style lang="less" scoped>
	.container {
		width: 93%;
		margin: 0 84px 0 45px;
		padding: 0 0 40px 0;
		color: #fff;

		/deep/.el-input__inner {
			background-color: #33384b;
			color: #fff
		}

		/deep/.el-form-item__label {
			color: #919191;
		}

		/deep/.el-form-item {
			margin-bottom: 20px;
		}

		.predict_container {
			.predict_content {
				.predict_head {
					display: flex;
					align-items: center;
					margin-bottom: 26px;

					.predict_back {
						color: #FFFFFF;
						font-size: 21px;
						margin-right: 246px;
						cursor: pointer;

						span {
							margin-right: 26px;
						}
					}
				}

				.step_content {
					padding: 0px 0 0px 0;
					margin-left: 30px;

					.order_form {
						padding: 0 2%;
						background-color: #33384b;

						.order_form_header {
							width: 100%;
							display: flex;
							height: 90px;
							align-items: center;
							justify-content: space-between;

							.left_block {
								width: 90%;
								display: flex;
								cursor: pointer;
								align-items: center;
								justify-content: space-between;

								p {
									font-size: 18px;
									color: #727272;
									margin-left: 24px;

									span {
										margin-left: 5px;
										font-size: 20px;
										color: #ffffff;
									}

									.dropdown {
										width: 10px;
										height: 8px;
										position: relative;
										right: 30px;
									}

									select {
										width: 204px;
										height: 54px;
										border: 2px solid #ada9a9;
										border-radius: 8px;
										background-color: #1D2023;
										color: #FFCE00;
										/*取消默认箭头开始*/
										appearance: none;
										-moz-appearance: none;
										-webkit-appearance: none;
										/*取消默认箭头结束*/
										padding-left: 5px;
									}
								}
							}

							.right_block {
								img {
									width: 26px;
									height: 26px;
									margin-right: 24px;
									cursor: pointer;
									// background-color: #FFF000;
								}
							}

							// p {
							// 	font-size: 18px;
							// 	color: #727272;
							// 	margin-left: 24px;

							// 	span {
							// 		margin-left: 5px;
							// 		font-size: 20px;
							// 		color: #ffffff;
							// 	}

							// 	.dropdown {
							// 		width: 10px;
							// 		height: 8px;
							// 		position: relative;
							// 		right: 30px;
							// 	}

							// 	select {
							// 		width: 204px;
							// 		height: 54px;
							// 		border: 2px solid #ada9a9;
							// 		border-radius: 8px;
							// 		background-color: #1D2023;
							// 		color: #FFCE00;
							// 		/*取消默认箭头开始*/
							// 		appearance: none;
							// 		-moz-appearance: none;
							// 		-webkit-appearance: none;
							// 		/*取消默认箭头结束*/
							// 		padding-left: 5px;
							// 	}
							// }
							// img {
							// 	width: 26px;
							// 	height: 26px;
							// 	margin-right: 24px;
							// }
						}

						.order_form_user {
							display: flex;
							align-items: center;
							padding-top: 26px;
							width: 100%;
							justify-content: space-between;
							border-top: 2px solid #ada9a9;

							.user {
								display: flex;
								margin-left: 34px;

								p {
									text-align: left;
									letter-spacing: 0px;
									color: #FFFFFF;
									font-size: 20px;
									margin-left: 20px;
								}

								.user_pic {
									width: 74px;
									height: 74px;
									object-fit: cover;
									border-radius: 10px;
								}
							}

							.form_user_right {
								display: flex;
								align-items: center;

								.user_right_jian {
									display: flex;
									align-items: center;
									margin-right: 45px;

									.jian_img {
										width: 29px;
										height: 29px;
										margin-right: 18px;
									}

									.jian_text {
										color: #FF1717;
										font-size: 18px;
									}
								}

								.msg {
									width: 33px;
									height: 33px;
									margin-right: 59px;
								}

								.form_review {
									width: 163px;
									height: 51px;
									line-height: 51px;
									color: #D3AA53;
									cursor: pointer;
									font-size: 18px;
									text-align: center;
									border: 1px solid #D3AA53;
									border-radius: 24px;
									margin-right: 42px;
								}
							}

						}

						.order_form_table {
							margin-top: 33px;

							.order_table_header {
								height: 64px;
								display: flex;
								align-items: center;
								background: #27292D;

								// border-bottom: 2px solid #ada9a9;
								p {
									width: 20%;
									height: 64px;
									display: flex;
									align-items: center;
									color: #cecece;
									font-size: 18px;
									margin-left: 27px;
								}
							}

							.order_table_body {
								div {
									display: flex;
									height: 68px;
									border-bottom: 2px solid #ada9a9;
									font-size: 18px;
									color: #FFFFFF;
									display: flex;
									align-items: center;

									p {
										width: 20%;
										margin-left: 27px;
									}
								}

								div:last-child {
									border-bottom: 0px;
								}

								.total_price {
									p:first-child {
										width: 64.5%;
									}
								}
							}

							.table_bottom {
								display: flex;
								align-items: center;
								border: none;
								justify-content: space-between;
								height: 90px;
								border-top: 2px solid #ada9a9;

								.flx_l {
									margin-left: 30px;
									display: flex;
									align-items: center;

									img {
										width: 28px;
										height: 28px;
									}

									p {
										letter-spacing: 0px;
										color: #FF1717;
										font-size: 18px;
										margin-left: 18px;
									}
								}

								.order_btn {
									width: 163px;
									height: 51px;
									background: #D3AA53 0% 0% no-repeat padding-box;
									border-radius: 24px;
									opacity: 1;
									border: none;
									margin-right: 42px;
									cursor: pointer;
								}
							}
						}
					}

					.companion_mation {
						.compain_title {
							color: #FFFFFF;
							font-size: 21px;
							margin: 25px 0;
						}

						.companion_container {
							background-color: #33384b;
							display: flex;

							.mation_left {
								width: 15%;
								padding: 0 2.5%;
								text-align: center;

								.mation_logo {
									width: 160px;
									height: 160px;
									border-radius: 12px;
									object-fit: cover;
									margin: 70px 0 30px 0;
									// background-color: #ff0;
									.default_avatar{
										width: 100%;
										height: 100%;
										display: flex;
										align-items: center;
										justify-content: center;
									}
								}
								
								.popularity_block {
									width: 168px;
									padding: 22px 32px;
									background: #1D2023;
									border-radius: 23px;
									display: flex;
									align-items: center;
									justify-content: space-between;

									img {
										width: 17px;
									}

									.popu_num {
										color: #C9C9C9;
										font-size: 20px;
										font-weight: bold;
									}
								}
							}

							.mation_right {
								width: 75%;
								padding-right: 5%;

								.right_head {
									height: 70px;
									display: flex;
									align-items: center;
									justify-content: space-between;
									border-bottom: 2px solid #ada9a9;

									.head_text {
										color: #DBA83F;
										font-size: 22px;
										font-weight: bold;
									}

									.head_button {
										padding: 0 10px;
										min-width: 133px;
										height: 40px;
										color: #DBA83F;
										font-size: 14px;
										font-weight: 600;
										background: #1C2023;
										display: flex;
										align-items: center;
										justify-content: center;
										border: 1px solid #DBA83F;
										border-radius: 13px;
									}
								}

								.right_in {
									.img_nav {
										display: flex;
										border-bottom: 2px solid #ada9a9;
										padding: 25px 0;

										.nav_1 {
											width: 73px;
											height: 90px;
											margin-right: 71px;

											.game_logo {
												width: 74px;
												height: 75px;
											}
										}

										.nav_av {
											border-bottom: 1px solid #D3AA53;
										}
									}

									.content_right_info {
										.top_3 {
											.table {
												.tb_header {
													display: flex;
													color: #FFFFFF;
													font-size: 18px;
													font-weight: bold;
													padding-top: 20px;
													margin-bottom: 11px;

													p {
														width: 20%;
														margin: 0;
													}
												}

												.tb_body {
													display: flex;
													color: #CECECE;
													font-size: 18px;
													margin-top: 5px;

													p {
														width: 20%;
														margin: 0;
														display: flex;
														align-items: center;
													}
												}
											}

											.top_1 {
												color: #D3AA53;
												display: flex;
												align-items: center;
												padding: 25px 0;
												border-bottom: 2px solid #ada9a9;

												.price_hour {
													display: flex;
													align-items: center;
													font-size: 18px;
													margin-right: 55px;

													.price {
														margin-right: 60px;

														span {
															font-size: 30px;
															margin-right: 10px;
														}
													}
												}

												.select_num {
													height: 59px;
													font-size: 25px;
													display: flex;

													.audio {
														display: flex;

														img {
															width: 20px;
															height: 20px;
														}
													}
												}
											}

											.note_tip {
												color: #CECECE;
												font-size: 18px;
												margin-top: 23px;

												.note_tit {
													color: #FFFFFF;
													font-size: 18px;
													font-weight: bold;
												}
											}
										}
									}
								}
							}
						}
					}

					.description_displayArea {
						.area_head {
							display: flex;
							align-items: center;

							.area_text {
								width: 170px;
								color: #969696;
								font-size: 22px;
								margin: 35px 0;
								cursor: pointer;
							}

							.area_av {
								color: #FFFFFF;
							}
						}

						.area_content {
							.area_one {
								padding: 2%;
								height: 150px;
								background-color: #33384b;

								.area_txt {
									color: #fff;
									font-size: 18px;
								}
							}

							.area_two {
								display: flex;

								.area_two_left {
									margin-right: 40px;

									img {
										width: 600px;
										height: 380px;
										object-fit: cover;
									}
								}

								.area_two_right {
									display: flex;
									flex-direction: column;

									img {
										width: 154px;
										height: 87px;
										object-fit: cover;
										margin-bottom: 20px;
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
