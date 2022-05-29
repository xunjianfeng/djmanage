<template>
	<div class="index">
		<MatchView :index="5"></MatchView>
		<div class="container">
			<div class="top_tabs">
				<div class="tabs_block">赛事管理  /</div>
				<div class="tabs_block">战队列表</div>
			</div>
			<div class="play_container">
				<div class="play_head"> 
					<div class="screen_title"> 
						<div class="screen_text">战队列表</div> 
					</div>
					<!-- 筛选条件 --> 
					<div class="screen_condition">
						<div class="scr_left">
							<div class="screen_block">
								<div class="search_span">队伍名称：</div>
								<div class="search_input">
									<input type="text" placeholder="请输入" v-model="listQuery.teamName">
								</div>
							</div>
							<div class="screen_left">
								<div class="search_span">游戏类型：</div>
								<el-select v-model="listQuery.gameId" placeholder="请选择" :popper-append-to-body="false">
									<el-option  key='' label="全部" value=""></el-option>
									<el-option v-for="itm in category_list" :key='itm.gameId' :label="itm.gameName" :value="itm.gameId"></el-option>
								</el-select>
							</div>
						</div>
						<div class="scr_right">
							<div class="screen_btn" @click="handleFilter">查 询</div>
							<div class="screen_btn2" @click="reset">重置</div>
						</div>
					</div>
				</div>
				<!-- 表格 -->
				<div class="play_content">
					<div class="play_form">
						<div class="play_table">
							<div class="table_header">
								<div class="table_head_div">队伍名称</div>
								<div class="table_head_div">队伍logo</div>
								<div class="table_head_div">游戏类型</div>
								<div class="table_head_div">队伍人数</div>
								<div class="table_head_div">创建时间</div>
								<div class="table_head_div2">操作</div>
							</div>
							<div class="table_body">
								<div class="body_row" v-for="(item,index) in list" :key="index">
									<el-tooltip class="item" effect="dark" :content="item.teamName" placement="bottom">
										<div class="row_td_block team_name">{{item.teamName}}</div>
									</el-tooltip>
									<div class="row_td_block">
										<img :src=" HOST + item.teamLogo" alt="" class="team_avatar">
									</div>
									<div class="row_td_block">{{item.gameName}}</div>
									<div class="row_td_block">{{item.member}}</div>
									<div class="row_td_block">{{initDete(item.createTime)}}</div>
									<div class="row_td_block2">
										<div class="see_detail" @click="jump_team(item.teamId)">查看详情</div>
									</div>
								</div>
							</div>
						</div>
						<!-- 分页 -->
						<div class="play_pagination">
							<pagination v-show="total_count>0" :total="total_count" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="handlePageChange" @page_change="pageChange" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {listTeam,teamAchievement} from '@/api/play';
	import {categoryList,gamdList} from '@/api/game';
	import MatchView from '@/components/match/left.vue';
	import Listing from '@/mixin/Listing';
	import Pagination from '@/components/Pagination'; // secondary package based on el-pagination
	export default {
		name: "team_list",
		mixins: [Listing],
		components: {
		    MatchView,
			Pagination
		},
		data() {
			return {
				listQuery: {
					teamName:'',
					gameId:'',
					page: 1 ,
					size: 10
				},
				total_count: 0,
				list: [],
				category_list:[]
			}
		},
		mounted() {
			if(this.$route.query.page != '' && this.$route.query.page != undefined && this.$route.query.page != null){
				console.log( this.$route.query.page)
				this.listQuery.page = this.$route.query.page
				console.log(this.listQuery.page)			
				this.getList()
			}else{
				// this.listQuery.page = 1
			}
			// console.log(this.listQuery.page)
			setTimeout(()=>{
				this.listQuery.page = this.PageNumber.page_number;
				this.getList()
			},180)	//当组件跳转时获取全局变量页数进行跳转
			this.gameList()
		},
		methods: {
			pageChange(value){
				this.PageNumber.page_number = value.page
			},
			getList() {
				listTeam(this.listQuery).then(res => {
					const {
						list,total
					} = res.data
					this.total_count = total
					this.list = list;
				})
			},
			handleFilter() {
				this.listQuery.page = 1;
				this.getList()
			},
			// 重置
			reset() {
				this.listQuery = {
					teamName:'',
					gameId:'',
					page: 1,
					size: 10
				}
				this.getList()
			},
			// 游戏列表
			gameList() {
				gamdList({}).then(res => {
					this.category_list = res.data.list
				})
			},
			jump_team(teamId ){
				let page = this.listQuery.page
				sessionStorage.setItem("team_page", page)
				// console.log(team_page)
				this.$router.push({ path: '/match/team_details', query: {teamId: teamId}})
				
			},
		}
	}
</script>

<style lang="less" scoped>
	.container {
		background: #33384B;
		margin: 0 56px 0 224px;
		padding-bottom:20px;
		.top_tabs{
			position: fixed;
			display: flex;
			top: 98px;
			.tabs_block{
				cursor: pointer;
				font-size: 14px;
				font-family:'Roboto-Regular';
				font-weight: 400;
				color: rgba(255, 255, 255, 0.65);
				line-height: 22px;
				margin-right: 8px;
			}
			.tabs_block:last-child{
				margin-right: 0;
			}
		}
		.play_container {
			.play_head {
				padding: 30px 30px 0px 30px;
				.screen_title {
					display: flex;
					align-items: center;
					margin-bottom: 24px;
					.screen_text {
						font-size: 18px;
						font-family:'Quicksand-Bold';
						color: #FFFFFF;
					}
				}
				.screen_condition {
					display: flex;
					align-items: center;
					// justify-content: space-between;
					.scr_left{
						display: flex;
						.screen_left {
							display: flex;
							align-items: center;
							margin-right: 33px;
							.search_span {
								font-size: 14px;
								font-family:'Roboto-Regular';
								font-weight: 400;
								color: #FFFFFF;
							}
							/deep/ .el-select .el-input .el-input__inner {
								border: 0px;
								color: #fff;
								background-color: #33384B;
								border: 1px solid #ffffff;
							}
						
							/deep/ .el-select-dropdown {
								background-color: #33384B;
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
						.screen_block {
							display: flex;
							align-items: center;
							margin-right: 33px;
							.search_span {
								font-size: 14px;
								font-family:'Roboto-Regular';
								font-weight: 400;
								color: #FFFFFF;
							}
							.search_input {
								width: 389px;
								height: 37px;
								border-radius: 2px;
								border: 1px solid #FFFFFF;
								display: flex;
								align-items: center;
								position: relative;
								input {
									width: 90%;
									outline: none;
									height: 30px;
									border: none;
									margin: 0 12px;
									font-size: 14px;
									color: #fff;
									font-family:'Roboto-Regular';
									background-color: #33384B;
								}
							}
						}
					}
					.scr_right{
						display: flex;
						.screen_btn {
							width: 65px;
							height: 40px;
							font-size: 14px;
							color: #FFFFFF;
							font-weight: 400;
							line-height: 40px;
							text-align: center;
							border-radius: 2px;
							background: #228BE1;
							cursor: pointer;
							border: 1px solid #228BE1;
							font-family:'Roboto-Regular';
							margin-right: 15px;
						}
						.screen_btn2 {
							width: 65px;
							height: 40px;
							font-size: 14px;
							color: #595959;
							font-weight: 400;
							line-height: 40px;
							text-align: center;
							border-radius: 2px;
							background: #FFFFFF;
							cursor: pointer;
							border: 1px solid #D9D9D9;
							font-family:'Roboto-Regular';
						}
					}	
				}
			}
			.play_content {
				margin: 24px 24px 0px 24px;
				.play_form {
					.play_table {
						.table_header {
							display: flex;
							align-items: center;
							height: 54px;
							font-size: 14px;
							font-family:'Quicksand-Bold';
							color: #FFFFFF;
							background: #2A2E3F;
							.table_head_div {
								width: 16.6%;
								color: #FFFFFF;
								font-size: 18px;
								display: flex;
								align-items: center;
								justify-content: center;
							}
							.table_head_div2 {
								width: 16.6%;
								color: #FFFFFF;
								font-size: 18px;
								display: flex;
								align-items: center;
								justify-content: center;
							}
						}
						.table_body {
							color: #fff;
							.body_row {
								display: flex;
								align-items: center;
								font-size: 14px;
								font-family:'Roboto-Regular';
								font-weight: 400;
								height: 60px;
								color: #FFFFFF;
								border-bottom: 1px solid #67717A;
								.row_td_block{
									width: 16.6%;
									display: flex;
									align-items: center;
									justify-content: center;
									.team_avatar{
										width: 100px;
										height: 40px;
										object-fit: cover;
									}
								}
								.team_name{
									overflow: hidden;
									text-overflow: ellipsis;
									white-space: nowrap;
								}
								.row_td_block2{
									width: 16.6%;
									display: flex;
									align-items: center;
									justify-content: center;
									.see_detail {
										color: #238AE8;
										cursor:pointer;
										font-family:'Roboto-Regular';
									}
								}
								
							}
						}
					}
					.play_pagination {
						margin:32px 0 0px 0px;
						display: flex;
						justify-content: flex-end;
						font-family:'Roboto-Regular';
					}
				}
			}
		}
	}
</style>
