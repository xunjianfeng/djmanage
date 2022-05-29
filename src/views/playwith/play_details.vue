<template>
	<div class="index">
		<PlayView :index="5"></PlayView>
		<div class="container">
			<div class="top_tabs">
				<div class="tabs_block" @click="jump_play">陪玩列表 /</div>
				<div class="tabs_block">陪玩管理</div>
			</div>
			<div class="user_container">
				<div class="user_head">
					<div class="screen_title">
						<div class="screen_text">陪玩详情</div>
						<div class="screen_right">
							<div class="screen_btn" @click="back">返回</div>
						</div>
					</div>
				</div>
				<div class="play_info_block">
					<div class="info_title">基本信息</div>
					<div class="info_line_block">
						<div class="info_column_block">
							<div class="column_left">昵称：</div>
							<div class="column_right">{{info.fullName}}</div>
						</div>
						<div class="info_column_block">
							<div class="column_left">头像：</div>
							<div class="column_right">
								<el-image :src="HOST + info.avatar" class="colum_avatar">
									<div slot="error" class="image-slot">
										<img src="../../assets/images/default.png" class="colum_avatar" />
									</div>
								</el-image>
								<!-- <img :src="HOST + info.avatar " class="colum_avatar" alt="" v-if="info.avatar"/> -->
								<!-- <img src="../../assets/images/default.png" class="default_avatar" v-else/> -->
							</div>
						</div>
						<div class="info_column_block">
							<div class="column_left">姓名：</div>
							<div class="column_right">{{info.userName}}</div>
						</div>
						<div class="info_column_block">
							<div class="column_left">手机号：</div>
							<div class="column_right">{{info.phoneNumber}}</div>
						</div>
					</div>
					<div class="info_line_block">
						<div class="info_column_block">
							<div class="column_left">生日：</div>
							<div class="column_right">{{initDete(info.birthday).substring(0,10)}}</div>
						</div>
						<div class="info_column_block">
							<div class="column_left">性别：</div>
							<div class="column_right">{{info.gender}}</div>
						</div>
					
						<div class="info_column_block">
							<div class="column_left">婚姻状况：</div>
							<div class="column_right">{{info.relationship}}</div>
						</div>
						<!-- <div class="info_column_block">
							<div class="column_left">地址：</div>
							<div class="column_right">{{info.addressDetail}}</div>
						</div> -->
					</div>
					<div class="info_line_block">
						<div class="info_column_block">
							<div class="column_left">电子邮箱：</div>
							<div class="column_right">{{info.email}}</div>
						</div>
						<div class="info_column_block">
							<div class="column_left">证件类型：</div>
							<div class="column_right">{{info.IdentificationType}}</div>
						</div>
						<div class="info_column_block">
							<div class="column_left">证件号码：</div>
							<div class="column_right">{{info.Identification}}</div>
						</div>
					</div>
				</div>
				<div class="play_info_block">
					<div class="info_title">地址信息</div>
					<div class="info_line_block">
						<div class="info_column_block">
							<div class="column_left">地址：</div>
							<div class="column_right">{{info.addressDetail}}</div>
						</div>
						<div class="info_column_block">
							<div class="column_left">邮政编码：</div>
							<div class="column_right">{{info.postcode}}</div>
						</div>
						<div class="info_column_block">
							<div class="column_left">城市：</div>
							<div class="column_right">{{info.addressState}}</div>
						</div>
						<div class="info_column_block">
							<div class="column_left">国家：</div>
							<div class="column_right">{{info.addressCountry}}</div>
						</div>
					</div>
				</div>
				<div class="play_info_block2" v-for="(item,index) in companionGame" :key='index'>
					<div class="info_title">陪玩信息</div>
					<div class="info_line_block">
						<div class="info_column_block">
							<div class="column_left">游戏类型：</div>
							<div class="column_right">
								<el-image :src="HOST + item.gameLogo" class="colum_game">
									<div slot="error" class="image-slot">
										<img src="../../assets/images/default_game.png" class="colum_game" />
									</div>
								</el-image>
								<!-- <img :src="HOST + item.gameLogo " class="colum_game" alt="" v-if="item.gameLogo"/> -->
								<!-- <img src="../../assets/images/default_game.png" class="colum_game" v-else/> -->
							</div>
						</div>
					</div>
					<div class="info_line_block">
						<div class="info_column_block">
							<div class="column_left">In Game ID：</div>
							<div class="column_right">{{item. inGameId}}</div>
						</div>
						<div class="info_column_block">
							<div class="column_left">In Game Name：</div>
							<div class="column_right">{{item.gameNickname}}</div>
						</div>
						<div class="info_column_block">
							<div class="column_left">Game Character：</div>
							<div class="column_right">{{item.role}}</div>
						</div>
					</div>
					<div class="info_line_block">
						<div class="info_column_block">
							<div class="column_left">Price：</div>
							<div class="column_right">{{item.price||0}}</div>
						</div>
						<div class="info_column_block">
							<div class="column_left">display area：</div>
							<div class="column_right">
								<img  v-if="item.displayArea != ''"  v-for="(dtem,dtex) in item.displayArea" :key="dtex"  :src="HOST + dtem.url " class="colum_game" alt="" />
							</div>
						</div>
						<div class="info_column_block">
							<div class="column_left">Your Strength：</div>
							<div class="column_right">{{item.strength}}</div>
						</div>
					</div>
					<div class="info_line_block">
						<div class="info_column_block">
							<div class="column_left">note for user befor place order：</div>
							<div class="column_right note_text">{{item.note}}</div>
						</div>
						<div class="info_column_block" style="width: 37%;">
							<div class="column_left">Availability Time Slot：</div>
							<div class="column_right" v-if="item.startTime != null && item.endTime != null">{{(item.startTime).substring(0,5)}} - {{(item.endTime).substring(0,5)}}</div>
						</div>
					</div>
					<div class="info_player_block">
						<div class="info_column_block">
							<div class="column_left">录音：</div>
							<div class="column_right">
								<audio controls v-if="item.soundUrl">
								  <!-- <source src="horse.ogg" type="audio/ogg"> -->
								  <!-- https://img.tukuppt.com/newpreview_music/00/10/93/5d819c5a0582950889.mp3 -->
								  <source :src="HOST + item.soundUrl" type="audio/mpeg">您的浏览器不支持 audio 元素。
								</audio>
							</div>
						</div>
					</div>
					<div class="info_line_block2">
						<div class="info_column_block">
							<div class="column_left">介绍说明：</div>
							<div class="column_right note_text">
								{{item.introduction}}
							</div>
						</div>
					</div>
				</div>
				<!-- 审核状态 -->
				<div class="examine_status">
					<div class="examine_block">
						<img class="examine_avatar" src="../../assets/images/Check.png" alt="" />
						<div class="examine_text">审核成功</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import aplayer from 'vue-aplayer';
import { playDetail, playExamine } from '@/api/play';
import PlayView from '@/components/play/left.vue';
export default {
	name: 'user_details',
	components: {
		aplayer,
		PlayView
	},
	data() {
		return {
			videoPlay: {
				title: '音频',
				artist: '',
				src: '',
				pic: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg'
			},
			userId: '',
			info: {}, //基本信息
			companionGame: [] //陪玩信息
		};
	},
	mounted() {
		this.userId = this.$route.query.userId;
		this.playDetail(this.userId);
	},
	methods: {
		jump_play() {
			this.$router.push({ path: '/user/companion' });
		},
		// 陪玩信息
		playDetail(userId){
			let that = this;
			let params = {
				userId
			}
			playDetail(params).then(res => {					
				const {info,companionGame}=res.data
				that.info = info
				that.companionGame = companionGame
			})
		},
		back() {
			this.$router.go(-1); //返回上一层
		},
	}
};
</script>

<style lang="less" scoped>
.container {
	background: #33384b;
	margin: 0 56px 0 224px;
	padding-bottom: 20px;
	.top_tabs {
		position: fixed;
		display: flex;
		top: 98px;
		.tabs_block {
			cursor: pointer;
			font-size: 14px;
			font-family:'Roboto-Regular';
			font-weight: 400;
			color: rgba(255, 255, 255, 0.65);
			line-height: 22px;
			margin-right: 8px;
		}
		.tabs_block:last-child {
			margin-right: 0;
		}
	}
	.user_container {
		.user_head {
			padding: 18px 31px 52px 17px;
			.screen_title {
				display: flex;
				align-items: center;
				justify-content: space-between;
				.screen_text {
					font-size: 18px;
					font-family:'Roboto-Regular';
					font-weight: 500;
					color: #ffffff;
				}
				.screen_right {
					.screen_btn {
						width: 69px;
						height: 40px;
						font-size: 14px;
						color: #595959;
						cursor: pointer;
						font-weight: 400;
						line-height: 40px;
						text-align: center;
						border-radius: 2px;
						background: #FFFFFF;
						border: 1px solid #D9D9D9;
						font-family:'Roboto-Regular';
					}
				}
			}
		}
		.play_info_block {
			margin: 0px 31px 0px 17px;
			padding: 24px 0;
			border-bottom: 1px solid #707896;
			.info_title {
				font-size: 16px;
				font-family:'Roboto-Bold';
				color: rgba(255, 255, 255, 0.97);
				line-height: 24px;
				margin-bottom: 25px;
			}
			.info_line_block {
				display: flex;
				margin-bottom: 31px;
				.info_column_block {
					width: 24%;
					display: flex;
					align-items: center;
					font-size: 14px;
					font-weight: 500;
					color: #ffffff;
					.column_left {
						width: 25%;
						text-align: right;
						margin-right: 8px;
						font-family:'Roboto-Regular';
					}
					.column_right {
						width: 75%;
						font-family:'Roboto-Regular';
						.colum_avatar {
							width: 44px;
							height: 44px;
							border-radius: 50%;
							object-fit: cover;
							// border: 1px solid #fafafa;
						}
						.default_avatar{
							width: 44px;
							height: 44px;
							border-radius: 50%;
							object-fit: cover;
						}
					}
				}
			}
			.info_line_block:last-child {
				margin-bottom: 0;
			}
		}
		.play_info_block2 {
			padding: 41px 24px 41px 24px;
			margin: 24px 31px 24px 17px;
			background-color: #2a2e3f;
			.info_title {
				font-size: 16px;
				font-family:'Roboto-Bold';
				font-weight: 500;
				color: rgba(255, 255, 255, 0.97);
				line-height: 24px;
				margin-bottom: 25px;
			}
			.info_line_block {
				display: flex;
				margin-bottom: 31px;
				.info_column_block {
					width: 33.3%;
					display: flex;
					align-items: center;
					font-size: 14px;
					font-weight: 500;
					color: #ffffff;
					.column_left {
						text-align: right;
						margin-right: 8px;
						font-family:'Roboto-Regular';
					}
					.column_right {
						font-family:'Roboto-Regular';
						.colum_avatar {
							width: 44px;
							height: 44px;
							border-radius: 50%;
							object-fit: cover;
							border: 1px solid #fafafa;
						}
						.colum_game {
							width: 44px;
							height: 44px;
							object-fit: cover;
						}
					}
					.note_text{
						width:45%;
						word-wrap: break-word;
						white-space: pre-wrap;
					}
				}
			}
			.info_line_block:last-child {
				margin-bottom: 0;
			}
			.info_player_block {
				display: flex;
				margin-bottom: 25px;
				.info_column_block {
					display: flex;
					align-items: center;
					font-size: 14px;
					font-weight: 500;
					color: #ffffff;
					width: 100%;
					.column_left {
						width: 5%;
						text-align: right;
						font-family:'Roboto-Regular';
					}
					.column_right {
						width: 93%;
						font-family:'Roboto-Regular';
						.colum_avatar {
							width: 44px;
							height: 44px;
							border-radius: 50%;
							object-fit: cover;
							border: 1px solid #fafafa;
						}
					}
				}
			}
			.info_line_block2 {
				display: flex;
				.info_column_block {
					display: flex;
					align-items: center;
					font-size: 14px;
					font-weight: 500;
					color: #ffffff;
					width:100%;
					.column_left {
						width: 8%;
						margin-right: 3px;
						font-family:'Roboto-Regular';
					}
					.column_right {
						width: 93%;
						font-family:'Roboto-Regular';
						.colum_avatar {
							width: 44px;
							height: 44px;
							border-radius: 50%;
							object-fit: cover;
							border: 1px solid #fafafa;
						}
					}
					.note_text{
						width:85%;
						word-wrap: break-word;
						white-space: pre-wrap;
					}
				}
			}
		}
		.examine_status {
			margin: 47px 0;
			display: flex;
			justify-content: center;
			.examine_block {
				text-align: center;
				.examine_avatar {
					width: 67px;
					height: 67px;
					margin-bottom: 24px;
				}
				.examine_text {
					font-size: 24px;
					font-family:'Roboto-Regular';
					font-weight: 500;
					color: #f9f9f9;
				}
			}
		}
	}
}
</style>
