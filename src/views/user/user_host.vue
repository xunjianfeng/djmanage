<template>
	<div class="index">
		<PlayView :index="3"></PlayView>
		<div class="container">
			<div class="eye_container">
				<!-- 弹窗-->
				<div class="mark_bac" v-if="exam_status == true"></div>
				<div class="exam_window" v-show="exam_status">
					<div class="exam_head">
						<div class="exam_avatar">
							<img src="../../assets/images/friend_06.png" alt="">
						</div>
						<div class="exam_info_text">
							<div class="exam_text1">Michael Stevenson</div>
							<div class="exam_text2">View Personal Profile>></div>
						</div>
					</div>
					<div class="exam_content">
						<div class="exam_topic">
							<div class="topic_option_block">
								<div class="topic_tit">Lorem ipsum dolor sit amet, consectetuer adipiscing elit?</div>
								<div class="option_block">
									<img src="../../assets/images/yl.png" alt="" class="option_img">
									<div class="option_text">Tournament</div>
								</div>
								<div class="option_block">
									<img src="../../assets/images/yls.png" alt="" class="option_img">
									<div class="option_text">Tournament</div>
								</div>
								<div class="option_block">
									<img src="../../assets/images/yls.png" alt="" class="option_img">
									<div class="option_text">Tournament</div>
								</div>
							</div>
							<div class="topic_option_block">
								<div class="topic_tit">Lorem ipsum dolor sit amet, consectetuer adipiscing elit?</div>
								<div class="option_block">
									<img src="../../assets/images/yl.png" alt="" class="option_img">
									<div class="option_text">Tournament</div>
								</div>
								<div class="option_block">
									<img src="../../assets/images/yls.png" alt="" class="option_img">
									<div class="option_text">Tournament</div>
								</div>
								<div class="option_block">
									<img src="../../assets/images/yls.png" alt="" class="option_img">
									<div class="option_text">Tournament</div>
								</div>
							</div>
						</div>
					</div>
					<img src="../../assets/images/cancel.png" class="cancel_img" @click="exam_status = ! exam_status">
				</div>
				<!-- end -->
			</div>
			<!-- 头部video-修改video -->
			<div class="video_mark">
				<div class="mark_bac" v-if="exam_status1 == true"></div>
				<div class="exam_window" v-if="exam_status1 == true">
					<img src="../../assets/images/cancel.png" class="cancel_img" @click="exam_status1 = false">
					<div class="video_top">
						<div class="video_title">Host Video</div>
						<!-- <div class="edit_icon">
							<img src="../../assets/images/record.png" />
						</div> -->
					</div>
					<div class="video_content">
						<div class="label">Your Video Url Link</div>
						<input placeholder="Video Url Link" v-model="dataFrom.videoUrl" class="url_input" />
					</div>
					<div class="btn_area">
						<div class="save_btn" @click="updateVideo">Save</div>
						<div class="cancel_btn" @click="exam_status1 = false, dataFrom = {}">Cancel</div>
					</div>
				</div>
				<!-- end -->
			</div>

			<!-- 表格筛选条件 -->
			<div class="top_tabs">
				<div :class="nav_index == 1 ?  'tabs_block av' : 'tabs_block'" @click="tabNav(1)">Host Listing</div>
				<div :class="nav_index == 2 ?  'tabs_block av' : 'tabs_block'" @click="tabNav(2)">Video</div>
				<div class="tabs_block" @click="tabNav(3)">Question</div>
			</div>
			<div class="table_screen_container">
				<div class="screen_block4" v-if="nav_index == 1">
					<div class="choice_left">
						<div class="status">
							<div class="options_select">
								<el-select v-model="listQuery.gameId" placeholder="请选择" @change="handleFilter"
									:popper-append-to-body="false">
									<el-option label="All" value=""></el-option>
									<el-option v-for="(item,index) in game_list" :label="item.gameName"
										:value="item.gameId"></el-option>
								</el-select>
							</div>
						</div>
						<div class="search_block">
							<div class="search">
								<input placeholder="Seacrh host name" v-model="listQuery.hostName" />
								<button class="btn" @click="handleFilter">
									<img src="../../assets/images/2search.png" />
								</button>
							</div>
						</div>

					</div>
					<div class="choice_right">
						<div class="export_block" @click="hostExport">
							<img src="../../assets/images/export.png" alt="">
							Export to PDF / Excel
						</div>
					</div>
				</div>
				<div class="video_container" v-if="nav_index == 2">
					<div class="video_top">
						<div class="video_title">Host Video</div>
						<div class="edit_icon" @click="exam_status1 = true">
							<img src="../../assets/images/record.png" />
						</div>
					</div>
					<div class="video_content">
						<div class="label">Your Video Url Link</div>
						<input placeholder="Video Url Link" disabled v-model="video_url" class="url_input" />
					</div>

				</div>
			</div>
			<!-- 相对于的表格 -->
			<div class="table_table_container" v-if="nav_index == 1">
				<!-- Host  表格 -->
				<div class="table_table_block4">
					<div class="table_block4_head">
						<div class="block4_head1"></div>
						<div class="block4_head2">User Name</div>
						<div class="block4_head2">Email Address</div>
						<div class="block4_head4">Phone Number</div>
						<div class="block4_head4">Rapid Challenge</div>
						<div class="block4_head5">Host Assessment</div>
						<!-- <div class="block4_head4">Open Status</div> -->
						<div class="block4_head4">Coins'earned</div>
						<div class="block4_head3"></div>
					</div>
					<div class="table_block4_btom">
						<div class="block4_btom_list" v-for="(item,index) in host_list " :key="index">
							<div class="block4_btom1">{{item.userInfo.id}}</div>
							<div class="block4_btom2">
								<div class="block4_btom2_user">
									<el-image :src="HOST + item.userInfo.avatar" class="colum_avatar">
										<div slot="error" class="image-slot">
											<img src="../../assets/images/default.png" class="colum_avatar" />
										</div>
									</el-image>
									<!-- <img :src="HOST + item.userInfo.avatar" alt="" v-if="item.userInfo.avatar"> -->
									<!-- <img src="../../assets/images/default.png" v-else /> -->
									<el-tooltip class="item" effect="dark" :content="item.userInfo.fullName"
										placement="bottom">
										<div class="block4_btom2_user_text">{{item.userInfo.fullName}}</div>
									</el-tooltip>
								</div>
							</div>
							<div class="block4_btom2 ">{{item.userInfo.email}}</div>
							<div class="block4_btom4 block4_btom2_left">{{item.userInfo.phoneNumber}}</div>
							<div class="block4_btom4">{{item.createdGames || 0}}</div>
							<div class="block4_btom5">
								<div class="block4_btom4_host">
									<div class="block4_btom4_host_text">{{item.hostScore || 0}}</div>
									<!-- <img src="../../assets/images/see.png" alt="" @click="exam_status = ! exam_status"> -->
								</div>
							</div>
							<div class="block4_btom4">{{item.earningCoins || 0}}</div>
							<div class="block4_btom3">
								<div class="status_area">
									<div class="status_text" v-if="item.available == false"
										@click="getStatus(1,item.id)">Unblock</div>
									<!-- <div class="line">|</div> -->
									<div class="status_text" v-if="item.available == true"
										@click="getStatus(2,item.id)">Block</div>

								</div>
								<!-- <div class="block4_btom3_dian">
									<img src="../../assets/images/dian.png" alt="">
								</div> -->
							</div>
						</div>

					</div>
				</div>
				<!-- 分页 -->
				<div class="rank_pagination">
					<pagination v-show="total_count>0" :total="total_count" :page.sync="listQuery.page"
						:limit.sync="listQuery.size" @pagination="handlePageChange" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import PlayView from '@/components/play/left.vue';
	import {
		userList
	} from '@/api/user';
	import {
		gamdList
	} from '@/api/game.js'
	import {
		hostList,
		getVideo,
		blockHost,
		updateVideo
	} from '@/api/challenge.js'
	import Listing from '@/mixin/Listing';
	import Pagination from '@/components/Pagination';
	import { exportMethod } from "../../utils/exportMethod.js";//导出
	export default {
		name: "user_host",
		inject: ['reload'],
		mixins: [Listing],
		components: {
			PlayView,
			Pagination
		},
		data() {
			return {
				nav_index: 1,
				comp_index: 1,
				currentPage: 2,
				exam_status: false,
				exam_status1: false, //修改主持人视频弹窗
				game_list: [],
				total_count: 0,
				dataFrom: {
					videoUrl: '', //修改主持人教程视频
				},
				host_list: [
					// {
					// 	id:'01.',
					// 	user_name:'Michael Stevenson',
					// 	email:'michaelsteven@gmail.com',
					// 	phone:'+60 13 134 4322',
					// 	rapid:'12',
					// 	host:'12/12',
					// 	status:'Host/Companion'
					// },

				],
				video_url: '', //主持人视频
				listQuery: {
					hostName: '',
					gameId: '',
					page: 1,
					size: 10
				},
				options2: [{
						value: '1',
						label: 'LOL'
					},
					{
						value: '2',
						label: 'PUBG'
					},
					{
						value: '3',
						label: 'DOTA'
					},
					{
						value: '4',
						label: '已拒绝'
					}
				],
				value1: '',
				condition: {
					userId: '',
					phoneNumber: '',
					examine: '',
					fullName: '',
					registerTimeStart: '',
					registerTimeEnd: '',

				},
			}
		},
		mounted() {
			this.getGameList()
			if (this.$route.query.nav_index != '' && this.$route.query.nav_index != null && this.$route.query.nav_index !=
				undefined) {
				this.nav_index = this.$route.query.nav_index
			}
			this.getList()
			this.getVideo()
		},
		methods: {
			//导出host
			hostExport(){
				let myObj = {
				  method: "get",
				  //正式服
				  url: "https://api.bountee.com.my/api/rapid-challenge/host/export?hostName="+this.listQuery.hostName+"&gameId="+this.listQuery.gameId,
				  //测试版
				  // url: "http://13.212.212.253/game/api/rapid-challenge/host/export?hostName="+this.listQuery.hostName+"&gameId="+this.listQuery.gameId,
				  fileName: 'host导出', //下载好的文件名称，我这里是用的当前时间
				  params:``, //接口参数
				};
				exportMethod(myObj);
			},
			//分页查询主持人
			getList() {
				hostList(this.listQuery).then(res => {
					for (let i = 0; i < res.data.list.length; i++) {
						res.data.list[i]['hostScore'] = ''
					}
					this.host_list = res.data.list
					this.total_count = res.data.total
					for (let j = 0; j < this.host_list.length; j++) {
						this.host_list[j]['hostScore'] = (this.host_list[j].testScore / this.host_list[j]
							.testTotalScore)
					}
				})
			},
			//获取主持人视频
			getVideo() {
				getVideo().then(res => {
					// console.log(res.data)
					this.video_url = res.data
				})
			},
			//禁用或者启用主持人
			getStatus(index, id) {
				if (index == 1) {
					// console.log("启用")
					let params = {
						hostId: id,
						available: true
					}
					// console.log(params)
					blockHost(params).then(res => {
						this.$message({
							type: 'success',
							message: res.message
						});
						this.getList()
					})
				} else if (index == 2) {
					// console.log("禁用")
					let params = {
						hostId: id,
						available: false
					}
					// console.log(params)
					blockHost(params).then(res => {
						this.$message({
							type: 'success',
							message: res.message
						});
						this.getList()
					})
				}
			},
			//修改主持人视频
			updateVideo() {
				updateVideo(this.dataFrom).then(res => {
					this.$message({
						type: 'success',
						message: res.message
					});
					this.exam_status1 = false
					this.dataFrom = {}
				})
				this.getVideo()

			},
			//游戏列表
			getGameList() {
				gamdList().then(res => {
					this.game_list = res.data.list
				})
			},
			tabNav(index) {
				this.nav_index = index
				if (this.nav_index == 3) {
					this.$router.push({
						path: '/user/question'
					})
				}
			},
			//筛选
			handleFilter() {
				this.listQuery.page = 1;
				this.getList()
			},
		}
	}
</script>

<style lang="less" scoped>
	.container {
		background: #33384B;
		margin: 0 56px 0 224px;
		padding: 0 20px 100px 20px;

		// 弹窗 start
		.eye_container {
			.mark_bac {
				width: 100%;
				height: 100%;
				background: rgba(0, 0, 0, 0.5);
				position: fixed;
				left: 0;
				top: 0;
				z-index: 8;
			}

			.exam_window {
				position: fixed;
				left: 0;
				right: 0;
				top: 90px;
				margin: 0 auto;
				width: 900px;
				// background: #0E0F11;
				background-color: #33384B;
				border-radius: 60px;
				box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.06);
				z-index: 9;
				padding: 70px 66px 40px 66px;

				.exam_head {
					display: flex;
					align-items: center;
					padding-bottom: 30px;
					border-bottom: 2px solid #2D2D2D;

					.exam_avatar {
						width: 106px;
						height: 106px;
						margin-right: 37px;

						img {
							width: 106px;
							height: 106px;
							border-radius: 14px;
							object-fit: cover;
						}
					}

					.exam_info_text {
						.exam_text1 {
							color: #FFFFFF;
							font-size: 22px;
							font-family: 'Roboto-Bold';
							margin-bottom: 7px;
						}

						.exam_text2 {
							color: #DBA83F;
							font-size: 18px;
							font-family: 'Roboto-Regular';
							cursor: pointer;
						}
					}
				}

				.exam_content {
					height: 500px;
					margin-top: 26px;
					overflow-y: scroll;

					.exam_topic {
						.topic_option_block {
							padding-top: 60px;

							.topic_tit {
								color: #727272;
								font-family: 'Roboto-Regular';
								font-size: 18px;
								margin-bottom: 26px;
							}

							.option_block {
								display: flex;
								align-items: center;
								margin-bottom: 26px;

								.option_img {
									width: 26px;
									height: 26px;
									margin-right: 25px;
								}

								.option_text {
									font-size: 18px;
									font-family: 'Roboto-Regular';
									color: #FFFFFF;
								}
							}
						}
					}

					&::-webkit-scrollbar {
						width: 12px;
						background-color: #000000;
					}

					/* 滚动槽 */
					&::-webkit-scrollbar-track {
						-webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.3);
						border-radius: 10px;
						background-color: #000000;
					}

					/* 滚动条滑块 */
					&::-webkit-scrollbar-thumb {
						border-radius: 10px;
						-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
						background-color: #2B2B2B;
					}
				}

				.cancel_img {
					width: 46px;
					position: fixed;
					right: 126px;
					top: 90px;
				}
			}

		}

		.video_mark {
			.mark_bac {
				width: 100%;
				height: 100%;
				background: rgba(0, 0, 0, 0.5);
				position: fixed;
				left: 0;
				top: 0;
				z-index: 8;
			}

			.exam_window {
				position: fixed;
				left: 0;
				right: 0;
				top: 90px;
				margin: 0 auto;
				width: 700px;
				// background: #0E0F11;
				background-color: #33384B;
				border-radius: 60px;
				box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.06);
				z-index: 99;
				padding: 70px 66px 40px 66px;

				.cancel_img {
					width: 46px;
					position: fixed;
					right: 126px;
					top: 90px;
				}

				.video_top {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.video_title {
						font-size: 24px;
						color: #fff;
						font-family: 'Roboto-Bold';
					}
				}

				.video_content {
					margin-top: 50px;

					.label {
						font-size: 18px;
						color: rgba(255, 255, 255, 0.5);
						font-family: 'Roboto-Regular';
					}

					.url_input {
						margin-top: 15px;
						width: 90%;
						height: 59px;
						background: #2a2e3f;
						border-radius: 19px;
						font-size: 18px;
						border: none;
						padding-left: 35px;
						color: #fff;
						font-family: 'Roboto-Regular';
					}
				}

				.btn_area {
					padding: 50px 0;
					display: flex;
					align-items: center;
					justify-content: center;

					.save_btn {
						width: 163px;
						height: 58px;
						background: #DBA83F;
						border-radius: 25px;
						color: #0E0F11;
						font-size: 20px;
						text-align: center;
						line-height: 58px;
						font-family: 'Roboto-Regular';
						cursor: pointer;
					}

					.cancel_btn {
						width: 163px;
						height: 58px;
						border: 1px solid #777777;
						border-radius: 25px;
						color: #ffffff;
						font-size: 20px;
						text-align: center;
						line-height: 58px;
						margin-left: 30px;
						font-family: 'Roboto-Regular';
						cursor: pointer;
					}
				}
			}
		}

		//弹窗 end

		// 表格筛选条件
		.top_tabs {
			position: fixed;
			display: flex;
			top: 98px;

			.tabs_block {
				cursor: pointer;
				font-size: 14px;
				font-family: 'Roboto-Regular';
				font-weight: 400;
				color: rgba(255, 255, 255, 0.65);
				line-height: 22px;
				margin-right: 30px;
			}

			.av {
				color: #D3AA53;
			}

			.tabs_block:last-child {
				margin-right: 0;
			}
		}

		.table_screen_container {
			margin-bottom: 20px;
			padding-top: 20px;

			.top_nav {
				display: flex;
				align-items: center;
				margin-bottom: 20px;

				.nav {
					font-size: 24px;
					color: #fff;
					font-family: 'Quicksand-Bold';
					margin-right: 30px;
					cursor: pointer;
				}

				.av {
					color: #D3AA53;
				}
			}

			.screen_block4 {
				margin: 0 20px;
				display: flex;
				justify-content: space-between;

				.choice_left {
					display: flex;

					.status {
						margin-right: 300px;

						.status_text {
							font-size: 18px;
							text-align: left;
							color: #fff;
							font-family: 'Roboto-Bold';
							margin-bottom: 11px;
						}

						.options_select {
							/deep/ .el-select .el-input .el-input__inner {
								border: 0px;
								width: 230px;
								height: 59px;
								padding: 0 20px;
								font-size: 18px;
								color: #fff;
								font-family: 'Roboto-Regular';
								border-radius: 20px;
								background-color: #2a2e3f;
							}

							/deep/ .el-select-dropdown {
								background-color: #33384b;
								border: 1px solid rgba(255, 255, 255, 0.2);
							}

							/deep/ .el-icon-arrow-up:before {
								content: "";
							}

							/deep/ .el-icon-arrow-down:before {
								content: "";
							}

							//修改单个的选项的样式
							/deep/ .el-select-dropdown__item {
								background-color: transparent;
								color: #fff;
								font-family: 'Roboto-Regular';
								text-align: center;
							}

							/deep/ .el-select-dropdown__item.hover {
								background-color: #545873;
							}

							/deep/ .el-select-dropdown__item.selected {
								background-color: #545873;
							}
						}
					}

					.search_block {
						display: flex;
						flex-direction: column;
						justify-content: flex-end;

						.search {
							background: #2a2e3f;
							border-radius: 23px;

							input {
								width: 215px;
								height: 53px;
								background: #2a2e3f;
								border-radius: 23px;
								font-size: 18px;
								border: none;
								padding-left: 35px;
								color: #fff;
								font-family: 'Roboto-Regular';
							}

							.btn {
								width: 60px;
								height: 60px;
								background: #D3AA53;
								border: none;
								border-radius: 22px;
								font-family: 'Roboto-Regular';
								cursor: pointer;

								img {
									width: 22px;
									height: 22px;
								}
							}
						}
					}
				}

				.choice_right {
					display: flex;
					flex-direction: column;
					justify-content: flex-end;

					.export_block {
						display: flex;
						align-items: center;
						height: 60px;
						color: #DBA83F;
						font-size: 18px;
						cursor: pointer;

						img {
							width: 22px;
							height: auto;
							margin-right: 20px;
						}
					}
				}

			}

			.video_container {
				margin-top: 30px;
				padding: 0 40px;

				.video_top {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.video_title {
						font-size: 20px;
						color: #fff;
						font-family: 'Roboto-Bold';
					}

					.edit_icon {
						cursor: pointer;

						img {
							width: 30px;
							height: 30px;
						}
					}
				}

				.video_content {
					margin-top: 30px;

					.label {
						font-size: 18px;
						color: rgba(255, 255, 255, 0.5);
						font-family: 'Roboto-Regular';
					}

					.url_input {
						margin-top: 15px;
						width: 80%;
						height: 59px;
						background: #2a2e3f;
						border-radius: 19px;
						font-size: 18px;
						border: none;
						padding-left: 35px;
						color: #fff;
						font-family: 'Roboto-Regular';
					}
				}

			}
		}

		// 表格
		.table_table_container {

			// Host  表格
			.table_table_block4 {
				background: #33384b;
				border-radius: 26px;
				padding-bottom: 20px;

				.table_block4_head {
					height: 54px;
					color: #FFFFFF;
					font-size: 17px;
					display: flex;
					align-items: center;
					background-color: #2A2E3F;
					font-family: 'Quicksand-Bold';
					border-bottom: 2px solid #2D2D2D;

					.block4_head1 {
						width: 5%;
						height: 54px;
						display: flex;
						align-items: center;
					}

					.block4_head2 {
						width: 17%;
						height: 54px;
						display: flex;
						align-items: center;
					}

					.block4_head3 {
						width: 6%;
						height: 54px;
						display: flex;
						align-items: center;
					}

					.block4_head4 {
						width: 13%;
						height: 54px;
						display: flex;
						align-items: center;
					}

					.block4_head5 {
						width: 16%;
						height: 54px;
						display: flex;
						align-items: center;
					}
				}

				.table_block4_btom {
					font-family: 'Roboto-Regular';

					.block4_btom_list {
						color: #fff;
						font-size: 18px;
						display: flex;
						align-items: center;
						border-bottom: 1px solid #4A516A;

						.block4_btom1 {
							width: 5%;
							height: 77px;
							display: flex;
							align-items: center;
							justify-content: center;
						}

						.block4_btom2 {
							width: 17%;
							height: 77px;
							display: flex;
							align-items: center;

							.block4_btom2_user {
								display: flex;
								align-items: center;

								.colum_avatar {
									width: 36px;
									height: 36px;
									border-radius: 12px;
									margin-right: 20px;
									object-fit: cover;
								}

								.block4_btom2_user_text {
									text-decoration: underline;
									width: 120px;
									overflow: hidden;
									text-overflow: ellipsis;
									white-space: nowrap;
								}
							}

						}

						.block4_btom3 {
							width: 7%;
							height: 77px;
							display: flex;
							align-items: center;
							justify-content: center;
							cursor: pointer;

							.status_area {
								display: flex;
								align-items: center;

								.status_text {
									color: #238AE8;
									font-size: 18px;
									font-family: 'Roboto-Bold';
									cursor: pointer;
								}

								.line {
									margin: 0 5px;
								}
							}

							.block4_btom3_dian {
								width: 33px;

								img {
									width: 33px;
								}
							}
						}

						.block4_btom4 {
							width: 12%;
							height: 77px;
							display: flex;
							align-items: center;
							justify-content: center;
						}

						.block4_btom2_left {
							display: flex;
							align-items: center;
							justify-content: flex-start;
						}

						.block4_btom5 {
							width: 16%;
							height: 77px;
							display: flex;
							align-items: center;
							justify-content: center;

							.block4_btom4_host {
								display: flex;
								align-items: center;

								img {
									width: 36px;
									height: 36px;
									border-radius: 12px;
									cursor: pointer;
								}

								.block4_btom4_host_text {
									text-decoration: underline;
									margin-right: 70px;
								}
							}

						}
					}

					.block4_btom_list:last-child {
						border-bottom: 0;
					}
				}
			}

			.rank_pagination {
				display: flex;
				justify-content: flex-end;
				// margin-top: 30px;
			}
		}
	}
</style>
