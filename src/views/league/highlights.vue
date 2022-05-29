<template>
	<div class="index">
		<div class="container">
			<div class="mark_container2">
				
				<div class="mark_bac" v-if="check_status == true"></div>
				<div class="mark_check_container" v-if="check_status == true">
					<div class="mark_check" v-if="check_status == true" @click.stop="check_status = false">
						<img src="@/assets/images/cancel.png">
					</div>
					<div class="mark_my_content ">
						<div class="mark_text_one">{{popup_info.title}}</div>
						<div class="mark_text_two">{{popup_info.introduction}}</div>
						<div class="content_top">
							<!-- <video width="100%" height="472px" controls class="video_play">
								<source :src="popup_info.videoUrl" type="video/mp4">
								</source>
							</video> -->
							<iframe width="100%" height="472px" class="video_play" :src="popup_info.videoUrl"
							 title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
							 allowfullscreen></iframe>
						</div>
						<div class="prompt_scroll"></div> <!-- 设置同级盒子使得页面可以滚动 -->
					</div>
				</div>
			</div>

			<div class="league_switch">
				<div class="switch_head">
					<div class="switch_h_block" @click="jump_league"><<</div> 
					<div class="switch_h_block switch_h_av" v-if="leagueItem.leagueType == 'Premier'">Premier (Tab)</div>
					<div class="switch_h_block switch_h_av" v-if="leagueItem.leagueType == 'Armature'">Amateur (Tab)</div>
				</div>
				<div class="switch_bottom">
					<LeagueSwitch :index="8"></LeagueSwitch>
				</div>
			</div>
			<div class="text" @click="jump_hlight">Add New Highlight</div>
			<div class="league_table">
				<div class="leag_table_head">
					<div class="table_text2"></div>
					<div class="table_text4">Update Time</div>
					<div class="table_text1">Title</div>
					<div class="table_text3">Content</div>
					<div class="table_text1">Details</div>
				</div>
				<div class="leag_table_btom_container">
					<div class="leag_table_btom" v-for="(item,index) in list" :key="index">
						<div class="table_info2">
							<div class="tinfo_block">
								<div class="tinfo_text">{{item.id}}.</div>
							</div>
						</div>
						<div class="table_info4">
							<div class="tinfo_block">
								<div class="tinfo_text">{{item.createTime}}</div>
							</div>
						</div>
						<div class="table_info1">
							<div class="tinfo_block">
								<div class="tinfo_text">{{item.title}}</div>
							</div>
						</div>
						<div class="table_info3">
							<div class="tinfo_block">
								<div class="tinfo_text">{{item.introduction}}</div>
							</div>
						</div>
						<div class="table_info1">
							<div class="btn_area">
								<img src="../../assets/images/eye.png" class="eye_btn" @click.stop="open_popup(item)" />
								<img src="../../assets/images/record.png" class="record_btn" @click.stop="edit_high(item)" />
								<img src="../../assets/images/delete_gray.png" class="del_btn" @click="get_del(item.id)" />
							</div>
						</div>
						<!-- <div class="delete_btn">
							<img src="../../assets/images/delete_gray.png" />
						</div> -->
					</div>
				</div>
				<!-- 分页 -->
				<div class="rank_pagination">
					<pagination v-show="total_count>0" :total="total_count" :page.sync="listQuery.page" :limit.sync="listQuery.size"
					 @pagination="handlePageChange" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		HighlightList,
		highlightDelete
	} from '@/api/league.js'
	import LeagueSwitch from '@/components/league/league.vue'
	import Listing from '@/mixin/Listing';
	import Pagination from '@/components/Pagination';
	export default {
		mixins: [Listing],
		filters: {
			statusFilter(status) {
				const statusMap = {
					published: 'success',
					draft: 'info',
					deleted: 'danger'
				};
				return statusMap[status];
			}
		},
		components: {
			Pagination,
			LeagueSwitch
		},
		name: "highlights",
		data() {
			return {
				h_swith: 1,
				value1: '',
				check_status: false,
				list: [],
				listQuery: {
					leagueId: this.$route.query.id,
					page: 1,
					size: 10
				},
				total_count: 0,
				popup_info: '', //弹窗信息
				leagueItem:{}
			}
		},
		mounted() {
			this.leagueItem = JSON.parse(sessionStorage.getItem("leagueItem"))
		},
		methods: {
			// 打开弹窗
			open_popup(info) {
				this.popup_info = info;
				this.popup_info.videoUrl = this.popup_info.videoUrl.replace("watch?v=","embed/")
				this.check_status = true;
			},
			replace:function(input){
				// console.log(input);
				return input;
			},
			// 列表
			getList() {
				let that = this;
				HighlightList(that.listQuery).then(res => {
					const {
						list,
						total
					} = res.data
					that.total_count = total
					that.list = list;
				})
			},
			// 删除联赛
			get_del(id){
				this.$confirm('是否删除该Highlights?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					highlightDelete({id}).then(res => {
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.getList()
					})
				}).catch(() => {       
				});
			},
			hswith(index) {
				this.h_swith = index
			},
			// 返回联赛列表
			jump_league() {
				this.$router.push({
					path: '/league/league'
				})
			},
			jump_hlight() {
				this.$router.push({
					path: '/league/create_highlights',
					query: {
						leagueId: this.$route.query.id
					}
				})
			},
			edit_high(item) {
				this.$router.push({
					path: '/league/create_highlights',
					query: {
						highinfo:JSON.stringify(item),						
					}
				})
			},
		}

	}
</script>
<style lang="less" scoped>
	.container {
		// width: calc(100% - 191px);
		// margin-left: 72px;
		width: 93%;
		background: #33384B;
		margin: 0 56px;
		// padding-bottom: 100px;
		padding: 30px 20px 100px;

		.mark_container2 {

			// Check out 01弹窗 start
			

			.mark_bac {
				width: 100%;
				height: 100vh;
				background: #000000b3;
				position: fixed;
				left: 0;
				top: 0;
				z-index: 88;

			}
			.mark_check_container {
				position: absolute;
				left: 337px;
				// top: 40px;
				top: 15%;
				z-index: 999;
				width: 850px;
				padding: 28px 45px 30px;
				// background: #0E0F11;
				background-color: #33384B;
				border-radius: 27px;
				overflow: hidden;
				display: flex;
				flex-flow: column;
				align-items: center;
				text-align: left;
				.mark_check {
					position: absolute;
					right: 30px;
					top: 5%;
					img {
						width: 30px;
						height: 30px;
						cursor: pointer;
					}
					z-index: 999;
				}
				.mark_my_content {
					width: 90%;
					margin-bottom: 10px;
					text-align: center;

					.mark_text_one {
						color: #FFFFFF;
						font-size: 24px;
						// text-align: center;
						margin-bottom: 30px;
						font-family:'Roboto-Bold';
					}

					.mark_text_two {
						color: #727272;
						font-size: 18px;
						margin-bottom: 30px;
						padding: 0 40px;
						font-family:'Roboto-Regular';
					}
					.prompt_scroll{		//设置同级盒子的样式
						width: 1730px;
						height: 1700px;
						position: absolute;
						top:-170px;
						left: -1300px;
						z-index: -1;
					}
					.content_top {}
				}
			}

			//Check out 01弹窗  end
		}

		.league_head {
			display: flex;
			align-items: center;
			padding: 46px 0 32px 0;
			border-bottom: 1px solid #2D2D2D;

			.league_head_text {
				color: #FFFFFF;
				font-size: 24px;
				font-weight: bold;
			}

			.league_head_spot {
				width: 8px;
				height: 8px;
				background-color: #FFFFFF;
				border-radius: 50%;
				margin: 0 20px;
			}
		}

		.league_switch {
			.switch_head {
				display: flex;
				align-items: center;
				// margin: 52px 0;
				margin: 0px 0 52px;
				font-family:'Quicksand-Regular';
				.switch_h_block {
					font-size: 24px;
					color: #FFFFFF;
					// cursor: pointer;
					margin-right: 70px;
					cursor: pointer;
				}

				.switch_h_block:last-child {
					margin-right: 0;
				}

				.switch_h_av {
					color: #DBA83F;
					position: relative;
				}

				.switch_h_av:before {
					content: '';
					position: absolute;
					left: 0px;
					bottom: 0px;
					right: 0px;
					border-top: 3px solid #DBA83F;
				}
			}

			.switch_bottom {
				margin-bottom: 40px;
			}
		}

		.text {
			width: 95%;
			color: #E5A518;
			font-size: 18px;
			margin-bottom: 20px;
			text-align: right;
			cursor: pointer;
			font-family:'Roboto-Bold';
		}

		.league_table {
			width: calc(100% - 36px);
			background: #000000;
			margin-bottom: 60px;
			border-radius: 17px;

			.leag_table_head {
				display: flex;
				align-items: center;
				border-bottom: 2px solid #2D2D2D;
				padding: 34px 0 20px 0;
				margin: 0 2% 0 2%;
				// color: #E4E4E4;
				color: #727272;
				font-weight: bold;
				font-size: 18px;
				font-family:'Roboto-Regular';
				.table_text1 {
					width: 20%;
				}

				.table_text2 {
					width: 8%;
				}

				.table_text3 {
					width: 35%;
				}

				.table_text4 {
					width: 17%;
				}
			}

			.leag_table_btom_container {
				.leag_table_btom {
					// height: 74px;
					display: flex;
					align-items: center;
					margin: 15px 15px;
					padding: 30px 1% 20px 1%;
					color: #FFFFFF;
					font-size: 18px;
					font-family:'Roboto-Regular';
					.table_info1 {
						width: 20%;

						.tinfo_block {
							display: flex;
							align-items: center;

							.tinfo_team {
								width: 39px;
								height: 39px;
								border-radius: 50%;
								margin-right: 40px;
							}

							.tinfo_text {
								color: #FFFFFF;
							}
						}

						.btn_area {
							display: flex;
							align-items: center;
							justify-content: space-between;
							padding: 0 20px 0 15px;

							.eye_btn {
								width: 28px;
								height: 19px;
								cursor: pointer;
							}

							.record_btn {
								width: 23px;
								height: 23px;
								cursor: pointer;
							}

							.del_btn {
								width: 28px;
								height: 30px;
								cursor: pointer;
							}
						}
					}

					.table_info3 {
						width: 35%;

						.tinfo_block {
							display: flex;
							align-items: center;
							padding-right: 25px;

							.tinfo_team {
								width: 39px;
								height: 39px;
								border-radius: 50%;
								margin-right: 20px;
							}

							.tinfo_text {
								color: #FFFFFF;
								font-weight: bold;
							}
						}
					}

					.table_info2 {
						width: 8%;
					}

					.table_info4 {
						width: 17%;

						.tinfo_block {
							display: flex;
							align-items: center;

							.tinfo_team {
								width: 39px;
								height: 39px;
								border-radius: 50%;
								margin-right: 20px;
							}

							.tinfo_text {
								color: #FFFFFF;
								font-weight: bold;
							}
						}
					}

					.delete_btn {
						width: 4.6%;

						img {
							width: 23px;
							height: 25px;
						}
					}
				}

				.leag_table_btom:nth-child(2n) {
					background-color: #1B2023;
				}
			}
		}
	}
</style>
