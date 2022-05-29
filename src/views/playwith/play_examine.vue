<template>
	<div class="index">
		<PlayView :index="5"></PlayView>
		<div class="container">
			<!-- 拒绝审核 -->
			<div class="mark_bac" v-if="exam_status == true"></div>
			<div class="exam_window" v-show="exam_status">
				<div class="exam_head">
					<div class="exam_tit">对该用户提交的信息审核拒绝</div>
					<div class="sponsorsini_qr" @click="exam_status = ! exam_status">X</div>
				</div>
				<div class="exam_content">
					<div class="exam_area">
						<el-input type="textarea" :rows="4" v-model="refuse.reason"  placeholder="请填写审核拒绝原因"></el-input>
					</div>
				</div>
				<div class="exam_btom">
					<div class="sponsors_btom_left" @click="exam_status = ! exam_status">取消</div>
					<div class="sponsors_bton" @click="audit_exam">确认</div>
				</div>
			</div>
			<!-- end -->
			<div class="top_tabs">
				<div class="tabs_block" @click="jump_play">陪玩列表 /</div>
				<div class="tabs_block">陪玩管理</div>
			</div>
			<div class="user_container">
				<div class="user_head">
					<div class="screen_title"><div class="screen_text">陪玩详情</div></div>
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
								<!-- <img :src="HOST + info.avatar " class="colum_avatar" alt="" /> -->
							</div>
						</div>
						<div class="info_column_block">
							<div class="column_left">姓名：</div>
							<div class="column_right">{{info.fullName}}</div>
						</div>
						<div class="info_column_block">
							<div class="column_left">手机号：</div>
							<div class="column_right">{{info.phoneNumber}}</div>
						</div>
					</div>
					<div class="info_line_block">
						<div class="info_column_block">
							<div class="column_left">生日：</div>
							<div class="column_right">{{info.birthday}}</div>
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
				<div class="examne_container" v-for="(item,index) in companionGame" :key='index'>
					<div class="play_info_block2" >
						<div class="info_title">陪玩信息</div>
						<div class="info_line_block">
							<div class="info_column_block">
								<div class="column_left">游戏类型：</div>
								<div class="column_right">{{item.gameName}}</div>
							</div>
							<div class="info_column_block">
								<div class="column_left">In Game ID：</div>
								<div class="column_right">{{item.gameNickname}}</div>
							</div>
							<div class="info_column_block">
								<div class="column_left">Game Character：</div>
								<div class="column_right">{{item.role}}</div>
							</div>
							<div class="info_column_block">
								<div class="column_left">Your Strength：</div>
								<div class="column_right">{{item.strength}}</div>
							</div>
						</div>
						<div class="info_player_block">
							<div class="info_column_block">
								<div class="column_left">录音：</div>
								<div class="column_right">
									 <audio :src="HOST + item.soundUrl">您的浏览器不支持 audio 标签。</audio>
								</div>
							</div>
						</div>
						<div class="info_line_block2">
							<div class="info_column_block">
								<div class="column_left">介绍说明：</div>
								<div class="column_right">
									{{item.introduction}}
								</div>
							</div>
						</div>
					</div>
					<!-- 审核状态 -->
					<div class="examine_status" v-if="info.examine == 1 || info.examine == 3">
						<div class="examine_block" @click="audit(2,item.companionId)">审核通过</div>
						<div class="examine_block2" @click="audit(3,item.companionId)">审核失败</div>
					</div>
				</div>
				
			</div>
		</div>
	</div>
</template>

<script>
import aplayer from 'vue-aplayer';
import PlayView from '@/components/play/left.vue';
import {playDetail,playExamine} from '@/api/play';
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
				src: 'https://m3.8js.net:99/2000/431204004348786.mp3',
				pic: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg'
			},
			exam_status:false,
			userId:'',
			info:{}, //基本信息
			companionGame:[], //陪玩信息
			refuse:{
				companionId:'',
				examine:'',
				reason:'',
			}
		};
	},
	mounted(){
		 this.userId = this.$route.query.userId
		 this.playDetail(this.userId);
	},
	methods: {
		// 审核   2通过  3拒绝
		audit(index ,companionId){
			let that = this;
			that.refuse.examine =index
			that.refuse.companionId = companionId
			if(index == 2){
				let params = that.refuse
				playExamine(params).then(res => {
					this.$router.push({ path: '/playwith/play_details', query: {userId: userId}})
				})
			}else{
				that.exam_status = ! that.exam_status
			}
		},
		// 审核失败
		audit_exam(){
			let that = this;
			if(that.refuse.reason == '' ){
				this.$message({
				  message: '请填写拒绝原因！！！',
				  type: 'warning'
				});
				return false
			}
			let params = that.refuse
			playExamine(params).then(res => {
				that.exam_status = ! that.exam_status
				this.$router.push({ path: '/playwith/play_details', query: {userId: userId}})
			})
		},
		// 用户信息
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
		jump_play() {
			this.$router.push({ path: '/user/companion' });
		},
		// 播放调用
		// play() {
		// 	this.showPlayer = false;
		// 	let ipUrl = this.$store.getters.stateBaseUrl1604 + '/' + row.filepath;
		// 	// let ipUrl = "http://192.168.0.209:1604" + '/' + row.filepath;
		// 	this.$nextTick(() => {
		// 		this.videoPlay.src = ipUrl;
		// 		this.videoPlay.title = '录音记录音频';
		// 		this.videoPlay.artist = ' ';
		// 		this.showPlayer = true;
		// 	});
		// }
	}
};
</script>

<style lang="less" scoped>
.container {
	background: #33384b;
	margin: 0 56px 0 224px;
	padding-bottom: 20px;
	// 弹窗 start
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
		top: 420px;
		margin: 0 auto;
		width: 459px;
		background: #FFFFFF;
		box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.06);
		border-radius: 4px;
		z-index: 9;
		padding: 20px 20px 20px 20px;
		.exam_head {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 30px;
			.exam_tit {
				font-size: 16px;
				font-family:'Roboto-Regular';
				font-weight: bold;
				color: #1F2E4D;
			}
			.sponsorsini_qr {
				color: #8F9BB3;
				cursor: pointer;
				font-size: 20px;
			}
		}
		.exam_content {
			.exam_area{
				margin-bottom: 30px;
				/deep/.el-textarea__inner{ //el_input中的隐藏属性
					resize: none;  //主要是这个样式
				}
			}
		}
		.exam_btom {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			.sponsors_btom_left {
				width: 80px;
				height: 36px;
				background: #FFFFFF;
				border-radius: 4px;
				border: 1px solid #D3DBEB;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 14px;
				font-weight: 400;
				color: #1F2E4D;
				margin-right: 20px;
				cursor: pointer;
			}
			.sponsors_bton {
				width: 80px;
				height: 36px;
				display: flex;
				align-items: center;
				justify-content: center;
				background: #228BE1;
				border-radius: 4px;
				font-size: 14px;
				font-weight: 400;
				color: #FFFFFF;
				cursor: pointer;
			}
		}
	}
	//弹窗 end
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
				.screen_text {
					font-size: 18px;
					font-family:'Roboto-Bold';
					color: #ffffff;
				}
			}
		}
		.play_info_block {
			margin: 0px 31px 0px 17px;
			padding: 24px 0;
			border-bottom: 1px solid #707896;
			.info_title {
				font-size: 16px;
				font-family:'Roboto-Regular';
				font-weight: 500;
				color: rgba(255, 255, 255, 0.97);
				line-height: 24px;
				margin-bottom: 25px;
			}
			.info_line_block {
				display: flex;
				margin-bottom: 31px;
				.info_column_block {
					width: 22.5%;
					display: flex;
					align-items: center;
					font-size: 14px;
					font-weight: 500;
					color: #ffffff;
					.column_left {
						width: 27%;
						text-align: right;
						margin-right: 8px;
						font-family:'Roboto-Regular';
					}
					.column_right {
						width: 73%;
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
			.info_line_block:last-child {
				margin-bottom: 0;
			}
		}
		.examne_container{
			.play_info_block2 {
				padding: 41px 24px 41px 24px;
				margin: 24px 31px 24px 17px;
				background-color: #2a2e3f;
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
						width: 22.5%;
						display: flex;
						align-items: center;
						font-size: 14px;
						font-weight: 500;
						color: #ffffff;
						.column_left {
							// width: 27%;
							text-align: right;
							margin-right: 8px;
							font-family:'Roboto-Regular';
						}
						.column_right {
							// width: 73%;
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
							width: 27%;
							margin-right: 3px;
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
						}
					}
				}
			}
			.examine_status {
				margin:  40px 0 40px 0; 
				display: flex;
				justify-content: center;
				font-size: 14px;
				font-family:'Roboto-Regular';
				font-weight: 400;
				color: #ffffff;
				.examine_block {
					width: 140px;
					height: 40px;
					background: #228be1;
					border-radius: 4px;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-right: 24px;
					cursor: pointer;
				}
				.examine_block2 {
					width: 140px;
					height: 40px;
					background: #ff6161;
					border-radius: 4px;
					display: flex;
					align-items: center;
					justify-content: center;
					cursor: pointer;
				}
			}
		}
		
	}
}
</style>
