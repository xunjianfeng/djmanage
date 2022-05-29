<template>
	<div class="index">
		<div class="container">
			<div class="top_tabs">
				<div class="tabs_block" @click="jump_user" >战队列表  /</div>
				<div class="tabs_block" >战队详情</div>
			</div>
			<div class="user_container">
				<div class="user_head">
					<div class="screen_title">
						<div class="screen_text">战队详情</div>
						<div class="screen_right">
							<div class="screen_btn" @click="back">返回</div>
						</div>
					</div>
				</div>
				<!-- 队伍基本信息 -->
				<div class="user_info_block">
					<div class="info_title">队伍基本信息</div>
					<div class="info_line_block">
						<div class="info_column_block">
							<div class="column_left">名称：</div>
							<div class="column_right">{{team_info.teamName}}</div>
						</div>
						<div class="info_column_block">
							<div class="column_left">logo：</div>
							<div class="column_right">
								<img :src="HOST + team_info.teamLogo" class="colum_avatar" alt="">
								<!-- <img src="../../assets/images/default.png" v-else class="default_avatar"/> -->
							</div>
						</div>
						<div class="info_column_block">
							<div class="column_left">游戏类型：</div>
							<div class="column_right">{{team_info.gameName}}</div>
						</div>
					</div>
					<div class="info_line_block">
						<div class="info_column_block">
							<div class="column_left">创建时间：</div>
							<div class="column_right">{{initDete(team_info.createTime)}}</div>
						</div>
						<div class="info_column_block">
							<div class="column_left">队伍人数：</div>
							<div class="column_right">{{member_list.length}}</div>
						</div>
						
						<!-- <div class="info_column_block">
							<div class="column_left">队伍排名：</div>
							<div class="column_right">{{team_info.relationship}}</div>
						</div> -->
					</div>
					<div class="info_line_block">
						<div class="info_column_block">
							<div class="column_left">队伍介绍：</div>
							<div class="column_right">
								{{team_info.aboutTeam}}
							</div>
						</div>
					</div>
				</div>
				<!-- 参赛信息 -->
				<div class="user_info_block">
					<div class="info_title">参赛信息</div>
					<div class="info_line_block">
						<div class="info_column_block">
							<div class="column_left">参加赛事数：</div>
							<div class="column_right">{{team_info.privately + team_info.officially }}</div>
						</div>
						<div class="info_column_block">
							<div class="column_left">主持赛：</div>
							<div class="column_right">{{team_info.officially}}</div>
						</div>
						<div class="info_column_block">
							<div class="column_left">平台赛：</div>
							<div class="column_right">{{team_info.privately}}</div>
						</div>
					</div>
					<div class="info_line_block">
						<div class="info_column_block">
							<div class="column_left">第一名次数：</div>
							<div class="column_right">{{team_info.champion}}</div>
						</div>
						<div class="info_column_block">
							<div class="column_left">第二名次数：</div>
							<div class="column_right">{{team_info.runnerUp}}</div>
						</div>
						
						<div class="info_column_block">
							<div class="column_left">第三名次数：</div>
							<div class="column_right">{{team_info.thirdPlace}}</div>
						</div>
					</div>
				</div>
				<!-- 队伍成员 -->
				<div class="user_info_block">
					<div class="info_title">队伍成员</div>
					<div class="info_team_block">
						<!-- <div class="team_people">
							<div class="team_avatar">
								<img :src="HOST + item.avatar" alt="">
							</div>
							<div class="team_uid">UID：{{item.userId}}</div>
							<div class="team_identity">{{item.fullName}}</div>
						</div> -->
						<div class="team_people" v-for="(item,index) in member_list" :key='index'>
							<div class="team_avatar">
								<el-image :src="HOST + item.avatar" class="avatar_img">
									<div slot="error" class="image-slot">
										<img src="../../assets/images/default.png" class="avatar_img" />
									</div>
								</el-image>
								<!-- <img :src="HOST + item.avatar" alt="" v-if="item.avatar"> -->
								<!-- <img src="../../assets/images/default.png" v-else /> -->
							</div>
							<div class="team_uid">UID：{{item.userId}}</div>
							<div class="team_identity">{{item.fullName}}</div>
							<div class="team_leader" v-show="item.userId == item.leaderId">【队长】</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {teamAchievement} from '@/api/play';
	export default {
		name: "team_details",
		data() {
			return {
				teamId:'',
				team_info:{},//战队信息
				member_list:{}, //队伍信息
				// leader_info:{}
			}
		},
		mounted(){
			 this.teamId = this.$route.query.teamId
			 this.get_team(this.teamId);
		},
		methods: {
			// 用户信息
			get_team(teamId){
				let that = this;
				let params = {
					teamId
				}
				teamAchievement(params).then(res => {
					that.member_list = res.data.member
					that.team_info = res.data
				})
			},
			jump_user(){
				this.$router.push({ path: '/match/team_list'})
			},
			back(){
				// this.$router.go(-1);//返回上一层
				this.$router.push({ path: '/match/team_list',query:{page:sessionStorage.getItem("team_page")}})
			},
		}
	}
</script>

<style lang="less" scoped>
	.container {
		background: #33384B;
		margin: 0 56px;
		padding-bottom:20px;
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
					justify-content: space-between;
					.screen_text {
						font-size: 18px;
						font-family:'Quicksand-Bold';
						color: #FFFFFF;
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
						width: 33.3%;
						display: flex;
						align-items: center;
						font-size: 14px;
						font-weight: 500;
						color: #FFFFFF;
						.column_left{
							width: 22%;
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
								border: 1px solid #FAFAFA;
							}
							.default_avatar{
								width: 44px;
								height: 44px;
								border-radius: 50%;
								object-fit: cover;
								border: none;
							}
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
							width: 12%;
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
								border: 1px solid #FAFAFA;
							}
						}
					}
				}
				.info_line_block2:last-child{
					margin-bottom: 0;
				}
				// 队伍成员
				.info_team_block{
					width: 100%;
					display: flex;
					flex-wrap: wrap;  
					.team_people{
						width:20%;
						margin-bottom: 30px;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: space-around;
						.team_avatar{
							width:80px;
							height: 80px;
							.avatar_img{
								width:80px;
								height: 80px;
								object-fit: cover;
								border-radius: 50%;
							}
						}
						.team_uid{
							color: #fff;
							margin: 15px 0;
							font-size: 18px;
							font-family:'Roboto-Regular';
						}
						.team_identity{
							color: #fff;
							font-size: 18px;
							font-family:'Roboto-Regular';
						}
						.team_leader{
							color: #fff;
							font-family:'Roboto-Regular';
							font-size: 18px;
							position: relative;
							top: 15px;
						}
					}
				}
			}
			.user_info_block:last-child{
				border-bottom: 0;
				padding: 24px 0 0 0 ;
			}
			
		}

	}
</style>
