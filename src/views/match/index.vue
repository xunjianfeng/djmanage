<template>
	<div class="index">
		<div class="container">
			<MatchView :index="1"></MatchView>
			<block style="flex: 1">
				<div class="rank_tabs_container">
					<div class="tabs_block" @click="tab_tabs(1)">赛事管理</div>
				</div>
				<div class="rank_container">
					<div class="rank_head">
						<div class="screen_title">
							<div class="screen_text">赛事列表</div>
							<!-- <div class="screen_return">返 回</div> -->
						</div>
					</div>
					<!-- rank_head -->
					<!-- 筛选条件 -->
					<div class="screen_condition">
						<div class="screen_block">
							<div class="search_span">赛事名称：</div>
							<div class="search_input">
								<input type="text" placeholder="请输入" v-model="listQuery.tournamentName">
							</div>
						</div>
						<div class="screen_left">
							<div class="search_span">赛事状态：</div>
							<el-select v-model="listQuery.state" placeholder="请选择" style="margin-right: 20px;" :popper-append-to-body="false">
								<el-option label="待审核" value="1">
								</el-option>
								<el-option label="报名中" value="2">
								</el-option>
								<el-option label="进行中" value="3">
								</el-option>
								<el-option label="已结束" value="4">
								</el-option>
								<el-option label="未通过" value="5">
								</el-option>
							</el-select>
						</div>
						<div class="screen_left">
							<div class="search_span">赛事类型：</div>
							<el-select v-model="listQuery.tournamentType" placeholder="请选择" style="margin-right: 20px;"
							 :popper-append-to-body="false">
								<el-option label="个人" value="0">
								</el-option>
								<el-option label="团队" value="1">
								</el-option>
							</el-select>
						</div>
						<div class="screen_left">
							<div class="search_span">赛事分类：</div>
							<el-select v-model="listQuery.tournamentCategory" placeholder="请选择" style="margin-right: 20px;"
							 :popper-append-to-body="false">
								<el-option label="私人" value="privately">
								</el-option>
								<el-option label="官方" value="officially">
								</el-option>
							</el-select>
						</div>
						<div class="screen_btn" @click="handleFilter">查 询</div>
						<div class="screen_btn2" @click="reset">重置</div>
						<div class="screen_btn" style="margin-right: 0;" @click="information">新建赛事</div>
					</div>
					<!-- 赛事列表 -->
					<div class="rank_content">
						<div class="rank_form">
							<div class="rank_table">
								<div class="table_header">
									<div class="table_head_div">序号</div>
									<div class="player">赛事名称</div>
									<div class="table_head_cover">赛事封面</div>
									<div class="table_head_div">开赛时间</div>
									<div class="table_head_div3">赛事format</div>
									<div class="table_head_div">赛事类型</div>
									<div class="table_head_div3">赛事分类</div>
									<div class="table_head_div">审核状态</div>
									<!-- <div class="table_head_div">提交时间</div> -->
									<div class="table_head_div2">操作</div>
								</div>
								<!-- table_header -->
								<div class="table_body">
									<div class="body_row" v-for="(item, index) in list" :key="index">
										<div class="row_td_block">{{ item.id }}</div>
										<div class="player_block">{{ item.tournamentName }}</div>
										<div class="cover_block">
											<el-image style="width: 100px; height: 100px" :src="HOST + item.tournamentCover" :preview-src-list="[HOST + item.tournamentCover]">
											</el-image>
										</div>
										<div class="row_td_block">{{initDete(item.tournamentTime)}}</div>
										<div class="row_td_block3">
											{{item.stages_format==1?'Single Elimination':item.stages_format==2?'Double Elimination':item.stages_format==3?'Round Robin':'Free For All'}}
											
										</div>
										<div class="row_td_block">{{ item.tournamentType==0?'个人':'团队' }}</div>
										<div class="row_td_block3 organizer_name">
											{{ item.tournamentCategory=='privately'?'私人':'官方' }}
											{{ item.tournamentCategory=='privately'?'-':'' }}
											{{ item.tournamentCategory=='privately'? item.organizerName:''}}
										</div>
										<!-- <div class="row_td_block">{{ item.gender }}</div> -->
										<div class="row_td_block">{{ item.status==1?'待审核':item.status==2?'报名中':item.status==3?'进行中':item.status==4?'已结束': item.status==5 ?'未通过' : '草稿' }}</div>
										<!-- <div class="row_td_block">{{ item.reg_time }}</div> -->
										<div class="row_td_block2">
											<div class="edit" v-if="item.status == 1" @click="open(item.id)">审核</div>
											<div class="see_detail" @click="see_info(item.id,item.status)">查看详情</div>
											<div class="set_top" v-if="item.status == 2  && item.hot == false " @click.stop="istop(item.id,true)">置顶</div>
											<div class="set_top" v-if="item.status == 2  && item.hot == true" @click.stop="istop(item.id,false)">取消置顶</div>
										</div>
									</div>
								</div>
							</div>
							<!-- 分页 -->
							<div class="rank_pagination">
								<pagination v-show="total_count>0" :total="total_count" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="handlePageChange" @page_change="pageChange" />
							</div>
						</div>
					</div>
				</div>
			</block>
		</div>
	</div>
</template>

<script>
	import MatchView from '@/components/match/left.vue';
	import Listing from '@/mixin/Listing';
	import Pagination from '@/components/Pagination'; // secondary package based on el-pagination
	import {
		tournamentList,
		tournamentTop,
		toutnamentReview,
		eventDetail
	} from '@/api/macth'
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
		name: "matchIndex",
		components: {
			MatchView,
			Pagination
		},
		data() {
			return {
				value: "",
				activeName: 3,
				round_block: 2,
				currentPage: 2,
				dialogFormVisible: false,
				showFailed: 1,
				options: [],
				list: [],
				options2: [{
						value: "1",
						label: "LOL",
					},
					{
						value: "2",
						label: "PUBG",
					},
					{
						value: "3",
						label: "DOTA",
					},
					{
						value: "4",
						label: "已拒绝",
					},
				],
				form: {
					name: "EDward Gaming",
					rank: "1",
					win: "4",
					loss: "2",
					integral: "23",
					next: "true",
				},
				listQuery: {
					tournamentName: "",
					tournamentType: "",
					state: "",
					hot: "",
					gameId: "",
					page: 1,
					size: 10
				},
				total_count: 1,
				review: {
					tournamentId: '',
					examine: '',
					reason:'',
				}

			};
		},
		mounted() {
			setTimeout(()=>{
				this.listQuery.page = this.PageNumber.page_number;
				this.getList()
			},250)	//当组件跳转时获取全局变量页数进行跳转
			if(this.PageNumber.judge == 1){
				this.listQuery.tournamentType = this.PageNumber.search_type	//获取类型
				this.listQuery.state = this.PageNumber.search_status //获取状态
				this.listQuery.tournamentCategory = this.PageNumber.search_class  //获取赛事分类
				this.listQuery.tournamentName = this.PageNumber.search_name //获取赛事名字
			}
		},
		methods: {
			pageChange(value){
				this.PageNumber.page_number = value.page
				
			},
			// 置顶赛事
			istop(tournamentId,top){
				let params = {
					top,
					tournamentId
				}
				console.log(params)
				let text = top == true ?'是否置顶该赛事！！！':'是否取消置顶该赛事！！！'
				this.$confirm(text, '操作', {
					distinguishCancelAndClose: true,
					confirmButtonText: '同意',
					cancelButtonText: '取消',
					center: true
				})
				.then(() => {
					tournamentTop(params).then(res => {
						this.$message({
							type: 'success',
							message: res.message
						});
						this.getList();
					})
				})
			},
			// 审核
			open(id) {
				this.review.tournamentId = id
				this.$confirm('是否同意该赛事通过审核！！！', '审核', {
					distinguishCancelAndClose: true,
					confirmButtonText: '同意',
					cancelButtonText: '拒绝',
					center: true
				})
				.then(() => {
					this.review.examine = 3
					toutnamentReview(this.review).then(res => {
						this.$message({
							type: 'success',
							message: res.message
						});
						this.getList();
					})
				})
				.catch(action => {
					if(action != 'close'){
						this.review.examine = 4
						this.$prompt('请输入拒绝原因', '拒绝', {
						  confirmButtonText: '确定',
						  cancelButtonText: '取消',
						}).then(({ value }) => {
							this.review.reason = value
							 toutnamentReview(this.review).then(res => {
								this.$message({
									type: 'success',
									message: res.message
								});
								this.getList();
							 })
						}).catch(() => {

						});
					}
				});
			},
			reset() {
				this.listQuery = {
					tournamentName: "",
					tournamentType: "",
					state: "",
					hot: "",
					gameId: "",
					page: 1,
					size: 10
				}
				this.getList()
			},
			tab_tabs(index) {
				this.activeName = index;
			},
			tab_part(index) {
				this.round_block = index;
			},
			edit_info() {
				this.dialogFormVisible = true;
				// let form_obj = JSON.parse(JSON.stringify(this.rank_list[0]))
				// this.$set(this.form,0,form_obj);
				// console.log(this.form)
			},
			information() {
				this.$router.push({
					path: "/match/information"
				});
			},
			see_info(id,status) {
				this.$router.push({
					path: '/match/event_details?id=' + id
				})
			},
			changeDialog() {
				this.dialogFormVisible = false;
			},
			getList() {
				tournamentList(this.listQuery).then(res => {
					const {
						list,
						total
					} = res.data
					for ( let i in list ) {
						if(list[i].hot == null){
							list[i].hot = false
						}
						// 处理 列表 format 显示
						for(let j in  list[i].stages){
							list[i]['stages_format'] = list[i].stages[0].format
						}
					}
					// console.log(list)
					this.list = list;
					// console.log(this.list)
					this.total_count = total;
					
				})
			},
			handleFilter() {
				this.listQuery.page = 1;
				this.getList()
				this.PageNumber.search_type  = this.listQuery.tournamentType //将选项的值返回
				this.PageNumber.search_status = this.listQuery.state   //获取状态返回
				this.PageNumber.search_class = this.listQuery.tournamentCategory  //获取赛事分类返回
				this.PageNumber.search_name = this.listQuery.tournamentName   //获取赛事名字返回
				this.PageNumber.judge = 1
			},

		},
	};
</script>

<style lang="less" scoped>
	.container {
		display: flex;
		margin: 0 56px 0 224px;
		padding-bottom: 100px;

		.rank_tabs_container {
			display: flex;
			flex: 1;
			margin-bottom: 20px;

			.tabs_block {
				font-size: 16px;
				font-family:'Roboto-Regular';
				font-weight: 500;
				color: #acacac;
				line-height: 22px;
				cursor: pointer;
				margin-right: 32px;
			}
		}

		.rank_container {
			background: #33384b;
			flex: 1;

			.rank_head {
				padding: 20px 20px 10px 20px;
				.screen_title {
					display: flex;
					align-items: center;
					justify-content: space-between;
					.screen_text {
						font-size: 18px;
						font-family:'Quicksand-Bold';
						color: #ffffff;
					}

					.screen_return {
						width: 69px;
						height: 40px;
						font-size: 14px;
						font-weight: 400;
						color: #595959;
						line-height: 40px;
						text-align: center;
						background: #ffffff;
						border-radius: 2px;
						border: 1px solid #d9d9d9;
						font-family:'Roboto-Regular';
					}
				}
			}
			.screen_condition {
				display: flex;
				flex-flow: wrap;
				padding: 20px 20px 10px 20px;
				.screen_left {
					display: flex;
					align-items: center;
					margin-top: 20px;
					.search_span {
						font-size: 14px;
						font-family:'Roboto-Regular';
						font-weight: 400;
						color: #FFFFFF;
					}

					/deep/ .el-select .el-input .el-input__inner {
						border: 0px;
						width: 151px;
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
						font-family:'Roboto-Regular';
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
					margin-right: 17px;
					margin-top: 20px;

					.search_span {
						font-size: 14px;
						font-family:'Roboto-Regular';
						font-weight: 400;
						color: #FFFFFF;
					}

					.search_input {
						width: 235px;
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

				.screen_date {
					display: flex;
					align-items: center;
					margin-right: 39px;
					margin-top: 20px;

					.search_span {
						font-size: 14px;
						font-family:'Roboto-Regular';
						font-weight: 400;
						color: #FFFFFF;
					}

					/deep/.el-date-editor .el-range-separator {
						color: #fff;
					}

					/deep/ .el-input__inner {
						border: 0px;
						background-color: #33384B;
						border: 1px solid #ffffff;
					}

					/deep/ .el-range-input {
						background-color: #33384B;
					}

					/deep/ .el-date-editor .el-range-input {
						color: #fff;
						font-family:'Roboto-Regular';
					}

					.el-radio {
						margin-right: 0;
					}

					/deep/ .el-radio__input {
						display: none;
					}
				}

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
					margin-right: 8px;
					margin-top: 20px;
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
					margin-right: 8px;
					font-family:'Roboto-Regular';
					margin-top: 20px;
				}
			}
			.rank_content {
				margin-left: 24px;
				margin-top: 24px;

				.rank_form {
					.rank_table {
						.table_header {
							display: flex;
							align-items: center;
							height: 54px;
							font-size: 14px;
							font-family:'Quicksand-Bold';
							color: #ffffff;
							background: #2a2e3f;

							.table_head_div {
								width: 9%;
								color: #ffffff;
								font-size: 18px;
								display: flex;
								align-items: center;
								justify-content: center;
							}

							.player {
								width: 12%;
								color: #ffffff;
								font-size: 18px;
								display: flex;
								align-items: center;
								justify-content: center;
							}
							.table_head_cover{
								width: 13%;
								color: #ffffff;
								font-size: 18px;
								display: flex;
								align-items: center;
								justify-content: center;
							}
							.table_head_div2 {
								width: 13%;
								color: #ffffff;
								font-size: 18px;
								margin-right: 24px;
								display: flex;
								align-items: center;
								justify-content: center;
							}
							.table_head_div3 {
								width: 12%;
								color: #ffffff;
								font-size: 18px;
								// margin-left: 24px;
								display: flex;
								align-items: center;
								justify-content: center;
							}
						}
						.table_body {
							color: #fff;
							margin-right: 24px;
							font-family:'Roboto-Regular';
							.body_row {
								display: flex;
								align-items: center;
								font-size: 14px;
								font-family:'Roboto-Regular';
								font-weight: 400;
								color: #ffffff;
								border-bottom: 1px solid #67717a;

								.row_td_block {
									width: 9%;
									height: 53px;
									display: flex;
									align-items: center;
									justify-content: center;
								}
								.row_td_block3 {
									width: 12%;
									height: 53px;
									margin-left: 10px;
									display: flex;
									align-items: center;
									justify-content: center;
								}
								.organizer_name{
									overflow: hidden;
									text-overflow: ellipsis;
									white-space: nowrap;
								}
								.cover_block {
									width: 13%;
									// height: 53px;
									display: flex;
									align-items: center;
									justify-content: center;
								}
								.player_block {
									width: 12%;
									display: flex;
									align-items: center;
									justify-content: center;
									overflow:hidden;
									text-overflow:ellipsis;
									white-space:nowrap
								}

								.row_td_block2 {
									width: 13%;
									// height: 53px;
									display: flex;
									align-items: center;
									margin-left: 24px;
									justify-content: center;

									.edit {
										color: #238ae8;
										cursor: pointer;
										margin-right: 12px;
									}

									.see_detail {
										color: #238ae8;
										cursor: pointer;
										margin-right: 12px;
									}
									.set_top{
										color: #238ae8;
										cursor: pointer;
									}
								}
							}
						}
					}
					.rank_pagination {
						margin: 32px 0 0px 0px;
						display: flex;
						justify-content: flex-end;
						font-family:'Roboto-Regular';
					}
				}
			}
		}
	}
</style>
