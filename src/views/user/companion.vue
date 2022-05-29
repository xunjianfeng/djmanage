<template>
	<div class="index">
		<PlayView :index="5"></PlayView>
		<div class="container">
			<!-- 审核-拒接 -->
			<el-dialog title="审核" :visible.sync="dialogFormVisible" center width="30%" :modal-append-to-body="false" @close='closeDialog'>
				<span>是否拒绝通过该审核！</span>
				<el-input type="textarea" :rows="4" resize="none" placeholder="拒绝原因" v-model="examine_form.reason" style="margin: 15px 0;"></el-input>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取消</el-button>
					<el-button @click="audit(3)" type="primary">确 定</el-button>
				</span>
			</el-dialog>
			<!-- 审核-同意 -->			
			<el-dialog title="审核" :visible.sync="centerDialogVisible" center width="30%" :modal-append-to-body="false" >
				<span>是否同意通过该审核！！！</span>
				<span slot="footer" class="dialog-footer">
					<el-button @click="centerDialogVisible = false">取 消</el-button>
					<el-button @click="audit(2)" type="primary" >确 定</el-button>
				</span>
			</el-dialog>
			<!-- 陪玩申请信息 弹窗 -->
			<div class="create_voucher">
				<div class="game_bac" v-if="see_game == true"></div>
				
				<div class="game_content" v-if="see_game  == true">
					<div class="game_cancel" @click.stop="see_game = false">
						<img src="../../assets/images/close.png" />
					</div>
					<div class="game_heade">
						<div class="game_head_left">
							<div class="game_head_avatar">
								<el-image :src="HOST + profies.avatar" class="colum_avatar">
									<div slot="error" class="image-slot">
										<img src="../../assets/images/default.png" class="colum_avatar" />
									</div>
								</el-image>
								<!-- <img :src="HOST + profies.avatar" alt="" v-if="profies.avatar"> -->
								<!-- <img src="../../assets/images/default.png" v-else /> -->
							</div>
							<div class="game_info">
								<div class="game_name">{{profies.fullName}}</div>
								<!-- <div class="game_text">View Personal Profile>></div> -->
							</div>
						</div>
						<div class="game_head_right">
							<div class="game_accept" @click="open_diorg(profies,2)">Accept</div>
							<div class="game_reject" @click="open_diorg(profies,3)">Reject</div>
						</div>
					</div>
					<div class="game_details">
						<div class="game_profile">
							<p>Game</p>
							<div class="ganmes_info">
								<el-image :src="HOST + profies.gameLogo" class="game_Img">
									<div slot="error" class="image-slot">
										<img src="../../assets/images/default_game.png" class="game_Img" />
									</div>
								</el-image>
								<!-- <img :src="HOST + profies.gameLogo" class="game_Img" alt=""> -->
								<div class="games_text">{{profies.gameName}}</div>
							</div>
						</div>
						<div class="form_content">
							<div class="form_input1">
								<p>In Game ID</p>
								<div  class="input" > {{profies.inGameId}}</div>
							</div>
							<div class="form_input1">
								<p>Game Character</p>
								<div  class="input" > {{profies.role}}</div>
							</div>
							<div class="form_input1">
								<p>Your Strength</p>
								<div class="input" > {{profies.strength}}</div>
							</div>
							<div class="form_input1">
								<p>Your Sound (in mp3 format)</p>
								<audio controls v-if="profies.soundUrl">
								  <!-- <source src="horse.ogg" type="audio/ogg"> -->
								  <!-- https://img.tukuppt.com/newpreview_music/00/10/93/5d819c5a0582950889.mp3 -->
								  <source :src="HOST + profies.soundUrl" type="audio/mpeg">您的浏览器不支持 audio 元素。
								</audio>
							</div>
						</div>
						<div class="game_Introduction">
							<p>In Game Introduction (Short briefing why people want to engage you)</p>
							<div class="introd_text">{{profies.introduction}}</div>
						</div>
					</div>
				</div>
			</div>
			<!--end -->
			<!-- 筛选 -->
			<div class="table_screen_container">
				<div class="screen_block3">
					<div class="choice_left">
						<div class="list_tabs">
							<div :class="switch_index == 1 ?'list_tabs_text list_tabs_av':'list_tabs_text'" @click="switch_comp(1)">Companion</div>
							<div class="list_tabs_border"></div>
							<div :class="switch_index == 2 ?'list_tabs_text list_tabs_av':'list_tabs_text'" @click="switch_comp(2)">ApplicationList</div>
						</div>
						<div class="search_block">
							<div class="search">
								<input placeholder="Seacrh user name" v-model="listQuery.name" />
								<button class="btn" @click="handleFilter">
									<img src="../../assets/images/2search.png" />
								</button>
							</div>
						</div>
					</div>
					<div class="choice_right">
						<!-- <div class="export_block">
							<img src="../../assets/images/export.png" alt="">
							Export to PDF / Excel
						</div> -->
					</div>
				</div>
			</div>
			<!-- 表格 -->
			<div class="table_table_container">
				<!-- Companion 表格 -->
				<div class="table_table_block3" v-if="switch_index == 1 ">
					<div class="table_block3_head">
						<div class="block3_head1"></div>
						<div class="block3_head2">User Name</div>
						<div class="block3_head2">Email Address</div>
						<div class="block3_head4">Phone Number</div>
						<div class="block3_head4">Popularity</div>
						<div class="block3_head4">Game</div>
						<div class="block3_head5">Action</div>
						<!-- <div class="block3_head3"></div> -->
					</div>
					<div class="table_block3_btom">
						<div class="block3_btom_list" v-for="(item,index) in companion_list " :key="index">
							<div class="block3_btom1">{{item.userId}}</div>
							<div class="block3_btom2">
								<div class="block3_btom2_user" @click="jump_play(2,item.userId)">
									<el-image :src="HOST + item.avatar" class="colum_avatar">
										<div slot="error" class="image-slot">
											<img src="../../assets/images/default.png" class="colum_avatar" />
										</div>
									</el-image>
									<!-- <img :src="HOST + item.avatar" alt="" v-if="item.avatar"> -->
									<!-- <img src="../../assets/images/default.png" v-else/> -->
									<el-tooltip class="item" effect="dark" :content="item.fullName" placement="bottom">
										<div class="block3_btom2_user_text user_name">{{item.fullName}}</div>
									</el-tooltip>
								</div>
							</div>
							<div class="block3_btom2">{{item.email}}</div>
							<div class="block3_btom4">{{item.phoneNumber}}</div>
							<div class="block3_btom4">{{item.popularity}}</div>
							<div class="block3_btom4">
								 <el-image v-for="mtem in item.companionGames" :src="HOST + mtem.gameLogo" class="btom4_logo" v-if="item.companionGames != ''">
								 	<div slot="error" class="image-slot">
								 		<img src="../../assets/images/default_game.png" class="btom4_logo" />
								 	</div>
								 </el-image>
								<!-- <img  v-for="mtem in item.companionGames" :src="HOST + mtem.gameLogo"  class="btom4_logo" v-if="item.companionGames != ''"> -->
							</div>
							<!-- <div class="block3_btom5">
								<audio class="block3_audio" src="../../assets/images/horse.mp3" controls="controls">
									Your browser does not support the audio element.
								</audio>
							</div> -->
							<div class="block3_btom3">
								<div class="text" @click="item.ban == true ? changeBan(1,item.companionId) : changeBan(2,item.companionId)">{{item.ban == true ? 'Activate' : 'Deactivate'}}</div>
								<!-- <div class="block3_btom3_dian">
									<img src="../../assets/images/dian.png" alt="">
								</div> -->
							</div>
						</div>
						<div class="block3_nothing" v-if="companion_list == ''">暂无陪玩人员</div>
					</div>
				</div>
				<!-- Application List 表格  -->
				<div class="table_table_block6" v-if="switch_index == 2 ">
					<div class="table_block6_head">
						<div class="block6_head1"></div>
						<div class="block6_head2">User Name</div>
						<div class="block6_head2">Email Address</div>
						<div class="block6_head4">Phone Number</div>
						<div class="block6_head4">Game Type</div>
						<div class="block6_head5">Application Date</div>
						<div class="block6_head3"></div>
					</div>
					<div class="table_block6_btom">
						<div class="block6_btom_list" v-for="(item,index) in application_list " :key="index">
							<div class="block6_btom1">{{item.companionId}}</div>
							<div class="block6_btom2">
								<div class="block6_btom2_user">
									<el-image :src="HOST + item.avatar" class="colum_avatar">
										<div slot="error" class="image-slot">
											<img src="../../assets/images/default.png" class="colum_avatar" />
										</div>
									</el-image>
									<!-- <img :src="HOST + item.avatar" alt=""> -->
									<div class="block6_btom2_user_text">{{item.fullName}}</div>
								</div>
							</div>
							<div class="block6_btom2">{{item.email}}</div>
							<div class="block6_btom4">{{item.phoneNumber}}</div>
							<div class="block6_btom4">{{item.gameName}}</div>
							<div class="block6_btom5">
								<div class="block6_btom4_host">
									<div class="block6_btom4_host_text">{{initDete(item.createTime)}}</div>
									<img src="../../assets/images/see.png" @click="open_game(item)">
								</div>
							</div>
							<div class="block6_btom3">
								<div class="block6_accept" @click="open_diorg(item,2)">Accept</div>
								<div class="block6_reject" @click="open_diorg(item,3)">Reject</div>
							</div>
						</div>
						<div class="block6_nothing" v-if="application_list == ''">暂无陪玩申请人员</div>
					</div>
				</div>
				<div class="rank_pagination">
					<pagination v-show="total_count>0" :total="total_count" :page.sync="listQuery.page" :limit.sync="listQuery.size"
					 @pagination="handlePageChange" @page_change="pageChange" />
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {
		playList,
		applyList,
		playExamine,
		companionBan
	} from '@/api/play';
	import {
		userList
	} from '@/api/user';
	import Listing from '@/mixin/Listing';
	import Pagination from '@/components/Pagination';
	import PlayView from '@/components/play/left.vue';
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
		name: "companion",
		components: {
			PlayView,
			Pagination
		},
		data() {
			return {
				switch_index: 1, //1 陪玩  2 陪玩申请		
				companion_list: [], //陪玩列表
				application_list: [], //陪玩申请列表
				listQuery: {
					// userId: '',
					// phone: '',
					name: '',
					page: 1,
					size: 10,
				},
				examine_form: {
					companionId: '',
					examine: '', //审核状态  2 通过 3 拒绝
					reason: '', //不通过的原因
				},
				see_game:false,
				dialogFormVisible: false,
				centerDialogVisible: false,
				profies:{},
			}
		},
		mounted() {
			setTimeout(()=>{
				this.listQuery.page = this.PageNumber.page_number;
				this.getList()
				console.log(this.listQuery.page)
			},180)	//当组件跳转时获取全局变量页数进行跳转
		},
		methods: {
			pageChange(value){
				this.PageNumber.page_number = value.page
				console.log(this.PageNumber.page_number)
			},
			handleFilter(){
				console.log(this.switch_index)
				this.listQuery.page = 1;
				this.getList()
			},
			getList() {
				let that = this;
				let params = that.listQuery
				let routCompanion = that.switch_index == 1 ? playList : applyList;
				if(that.switch_index == 1){
					playList(that.listQuery).then(res => {
						const {
							list,
							total
						} = res.data
						that.companion_list = list;
						that.total_count = total;
					})
				}else if(that.switch_index == 2){
					// console.log(that.listQuery.name)
					// let params = {
					// 	name:that.listQuery.name,
					// 	page:1,
					// 	size:10
					// }
					applyList(this.listQuery).then(res => {
						const {
							list,
							total
						} = res.data
						this.application_list = list;
						this.total_count = total;
					})
				}
				
			},
			//companion的action状态
			changeBan(index,companionId){
				let ban = ''
				if(index == 1){
					ban = false
				}else if(index == 2){
					ban = true
				}
				let params = {
					ban,
					companionId
				}
				console.log(params)
				this.$confirm('是否确定禁用/启用该陪玩?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					companionBan(params).then(res => {
						this.$message({
							type:'success',
							message:res.message
						})
						this.getList()
					})
				})
			},
			open_game(item){
				this.profies = item;
				this.see_game = ! this.see_game
			},
			// 关闭 dialog
			closeDialog() {
				this.examine_form = {
					companionId: '',
					examine: '',
					reason: '',
				}; //清空数据
			},
			switch_comp(index) {
				let that = this;
				that.switch_index = index
				that.listQuery.name = ''
				that.listQuery.page = 1
				that.getList();
			},
			open_diorg(item, examine) {
				let that = this;
				that.examine_form.companionId = item.companionGameId
				that.examine_form.examine = examine
				if (examine == 2) {
					that.centerDialogVisible = true
				} else {
					that.dialogFormVisible = true
				}
				
			},
			// 审核   2通过  3拒绝
			audit(index) {
				let that = this;
				if (index == 2) {
					playExamine(that.examine_form).then(res => {
						this.$message({
							message: res.message,
							type: 'success'
						});
						that.centerDialogVisible = false
						that.see_game = false
						that.getList();
					})
				} else {
					if (that.examine_form.reason == '') {
						this.$message({
							message: '请填写拒绝原因！！！',
							type: 'warning'
						});
						return false
					}
					playExamine(that.examine_form).then(res => {
						this.$message({
							message: res.message,
							type: 'success'
						});
						that.dialogFormVisible = false
						that.see_game = false
						that.getList();
					})
				}
			},
			// 跳转 陪玩详情
			jump_play(index, userId) {
				if (index == 1) {
					this.$router.push({
						path: '/playwith/play_examine',
						query: {
							userId: userId
						}
					})
				} else if (index == 2) {
					this.$router.push({
						path: '/playwith/play_details',
						query: {
							userId: userId
						}
					})
				}
			},
			// 未知页面 注释
			// jump_user(index,userId){
			// 	if(index == 1){
			// 		this.$router.push({ path: '/user/user_examine' , query: {userId: userId}})
			// 	}else if(index == 2){
			// 		this.$router.push({ path: '/user/user_details'})
			// 	}
			// },
		}
	}
</script>

<style lang="less" scoped>
	.container {
		background: #33384B;
		margin: 0 56px 0 224px;
		padding: 0 20px 120px 20px;
		/deep/.el-dialog{
			background: #33384B ;
			border-radius: 10px;
			.el-dialog__header{
				.el-dialog__title{
					color: #FFFFFF;
				}
			}
			.el-dialog__body{
				color: #FFFFFF;
				
			}
			.el-textarea__inner{
				background: #2A2E3F !important;
				border: none;
				color: #FFFFFF;
			}
		}
		.create_voucher{
			position: fixed;
			z-index: 99;
			
			.game_bac{
				width: 100%;
				height: 100vh;
				background:#000000b3;
				position: fixed;
				left: 0;
				top: 0;
				z-index: 88;
			}
			.game_content{
				width: 981px;
				padding: 70px 50px 80px 50px;
				background: #33384B;
				border-radius: 32px;
				position: absolute;
				z-index: 999;
				top: 40px;
				left: 0;
				right: 0;
				margin: 0 auto;
				.game_cancel{
					width: 46px;
					height: 46px;
					// position: fixed;
					// right: 180px;
					position: absolute;
					top: 25px;
					right: 30px;
					// left: 0;
					z-index: 999;
					img{
						width: 30px;
						height: 30px;
					}
				}
				.game_heade{
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-bottom: 2px solid #2D2D2D;
					padding-bottom: 40px;
					margin-bottom: 40px;
					.game_head_left{
						display: flex;
						align-items: center;
						.game_head_avatar{
							width: 106px;
							height: 106px;
							margin-right: 37px;
							.colum_avatar{
								width: 106px;
								height: 106px;
								border-radius: 12px;
								object-fit: cover;
							}
						}
						.game_info{
							.game_name{
								color: #FFFFFF;
								font-size: 22px;
								font-family:'Roboto-Bold';
								margin-bottom: 7px;
							}
							.game_text{
								color: #DBA83F;
								font-size: 18px;
								font-family:'Roboto-Regular';
							}
						}
					}
					.game_head_right{
						display: flex;
						.game_accept {
							width: 96px;
							height: 40px;
							color: #9BF40F;
							font-size: 16px;
							background: #1C2023;
							border: 1px solid #9BF40F;
							border-radius: 11px;
							display: flex;
							align-items: center;
							justify-content: center;
							margin-right: 23px;
							cursor: pointer;
							font-family:'Roboto-Regular';
						}
						
						.game_reject {
							width: 96px;
							height: 40px;
							color: #FF390B;
							font-size: 16px;
							background: #1C2023;
							border: 1px solid #FF390B;
							border-radius: 11px;
							display: flex;
							cursor: pointer;
							align-items: center;
							justify-content: center;
							font-family:'Roboto-Regular';
						}
					}
				}
				.game_details{
					.game_profile {
						width: 45%;
						margin-top: 20px;
						position: relative;
						p {
							color: #727272;
							font-size: 15px;
							font-family:'Roboto-Regular';
							span {
								color: red;
							}
						}
						.ganmes_info {
							display: flex;
							align-items: center;
							.game_Img{
								width: 44px;
								height: 45px;
								margin-right: 33px;
							}
							.games_text{
								color: #fff;
								font-size: 18px;
								font-family:'Roboto-Regular';
							}
						}
						
					}
					.game_Introduction {
						width: 80%;
						margin-top: 20px;
						position: relative;
						p {
							color: #727272;
							font-size: 15px;
							font-family:'Roboto-Regular';
							span {
								color: red;
							}
						}
						.introd_text{
							color: #fff;
							font-size: 18px;
							font-family:'Roboto-Regular';
							width: 100%;
							word-wrap: break-word;
							white-space: pre-wrap;
							// background-color: #ff0;
						}
					}
					.form_content {
						display: flex;
						justify-content: space-between;
						flex-wrap: wrap;
						.form_input1 {
							width: 45%;
							margin-top: 20px;
							position: relative;
							.input {
								width: 100%;
								border: none;
								border-radius: 19px;
								color: #fff;
								font-family:'Roboto-Regular';
								background: inherit;
								font-size: 16px;
							}
							p {
								color: #727272;
								font-size: 15px;
								font-family:'Roboto-Regular';	
								span {
									color: red;
								}
							}
						}
					}
				}
			}
		}
		// 表格筛选条件
		.table_screen_container {
			margin-bottom: 20px;
			padding-top: 20px;

			.screen_block3 {
				margin: 0 20px;
				display: flex;
				justify-content: space-between;

				.choice_left {
					display: flex;

					.list_tabs {
						display: flex;
						align-items: center;
						margin-right: 130px;

						.list_tabs_text {
							color: #888888;
							font-size: 20px;
							cursor: pointer;
							font-family:'Quicksand-Bold';
						}

						.list_tabs_border {
							width: 0px;
							height: 25px;
							margin: 0 40px;
							border: 1px solid #7F7F7F;
						}

						.list_tabs_av {
							cursor: pointer;
							color: #C69B58;
							font-size: 20px;
							font-family:'Quicksand-Bold';
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
								// #565656
								color: #fff;
								font-family:'Roboto-Regular';
							}

							.btn {
								width: 60px;
								height: 60px;
								background: #D3AA53;
								border: none;
								border-radius: 22px;
								opacity: 1;
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
						font-family:'Roboto-Bold';
						img {
							width: 22px;
							height: auto;
							margin-right: 20px;
						}
					}
				}
			}
		}

		// 表格
		.table_table_container {

			// Companion 表格
			.table_table_block3 {
				background: #33384b;
				border-radius: 26px;

				.table_block3_head {
					height: 54px;
					color: #FFFFFF;
					font-size: 17px;
					display: flex;
					align-items: center;
					background-color: #2A2E3F;
					border-bottom: 2px solid #2D2D2D;
					font-family:'Roboto-Bold';
					.block3_head1 {
						width: 7%;
						height: 54px;
						display: flex;
						align-items: center;
					}

					.block3_head2 {
						width: 18%;
						height: 54px;
						display: flex;
						align-items: center;
					}
					.block3_head4 {
						width: 16%;
						height: 54px;
						display: flex;
						align-items: center;
					}
					.block3_head3 {
						width: 8%;
						height: 54px;
						display: flex;
						align-items: center;
					}
					
				}

				.table_block3_btom {
					font-family:'Roboto-Regular';
					.block3_btom_list {
						color: #fff;
						font-size: 18px;
						display: flex;
						align-items: center;

						.block3_btom1 {
							width: 7%;
							height: 65px;
							display: flex;
							align-items: center;
							justify-content: center;
						}

						.block3_btom2 {
							width: 18%;
							height: 65px;
							display: flex;
							align-items: center;

							.block3_btom2_user {
								width: 90%;
								display: flex;
								align-items: center;
								cursor: pointer;

								.colum_avatar {
									width: 36px;
									height: 36px;
									border-radius: 12px;
									margin-right: 20px;
									object-fit: cover;
								}
								.block3_btom2_user_text {
									text-decoration: underline;
									
								}
								.user_name{
									width: 130px;
									overflow: hidden;
									white-space: nowrap;
									text-overflow: ellipsis;
								}
							}

						}
						.block3_btom4 {
							width: 16%;
							height: 65px;
							display: flex;
							align-items: center;
							.btom4_logo{
								width: 36px;
								height: 36px;
								border-radius: 12px;
								margin-right: 10px;
							}
						}
						.block3_btom3{
							width: 8%;
							height: 65px;
							display: flex;
							align-items: center;
							.text{
								color:#0080FF;
								font-size: 16px;
								cursor: pointer;
							}
						}
					}
					.block3_btom_list:last-child {
						border-bottom: 0;
					}
					.block3_nothing{
						color: #fff;
						text-align: center;
						font-family:'Roboto-Regular';
						margin: 20px 0;
					}
				}
			}

			// Application List 表格
			.table_table_block6 {
				background: #33384b;
				border-radius: 26px;

				.table_block6_head {
					height: 54px;
					color: #FFFFFF;
					font-size: 17px;
					display: flex;
					align-items: center;
					background-color: #2A2E3F;
					border-bottom: 2px solid #2D2D2D;
					font-family:'Roboto-Bold';
					.block6_head1 {
						width: 5%;
						height: 54px;
						display: flex;
						align-items: center;
					}

					.block6_head2 {
						width: 17%;
						height: 54px;
						display: flex;
						align-items: center;
					}

					.block6_head3 {
						width: 6%;
						height: 54px;
						display: flex;
						align-items: center;
					}

					.block6_head4 {
						width: 13%;
						height: 54px;
						display: flex;
						align-items: center;
					}

					.block6_head5 {
						width: 16%;
						height: 54px;
						display: flex;
						align-items: center;
					}
				}

				.table_block6_btom {
					font-family:'Roboto-Regular';
					.block6_btom_list {
						color: #fff;
						font-size: 18px;
						display: flex;
						align-items: center;

						.block6_btom1 {
							width: 5%;
							height: 65px;
							display: flex;
							align-items: center;
							justify-content: center;
						}

						.block6_btom2 {
							width: 17%;
							height: 65px;
							display: flex;
							align-items: center;

							.block6_btom2_user {
								display: flex;
								align-items: center;
								cursor: pointer;

								.colum_avatar {
									width: 36px;
									height: 36px;
									border-radius: 12px;
									margin-right: 20px;
									object-fit: cover;
								}

								.block6_btom2_user_text {
									text-decoration: underline;
								}
							}

						}

						.block6_btom3 {
							width: 17%;
							height: 65px;
							display: flex;
							align-items: center;
							justify-content: center;

							.block6_accept {
								width: 96px;
								height: 40px;
								color: #9BF40F;
								font-size: 16px;
								background: #1C2023;
								border: 1px solid #9BF40F;
								border-radius: 11px;
								display: flex;
								align-items: center;
								justify-content: center;
								margin-right: 23px;
								cursor: pointer;
							}

							.block6_reject {
								width: 96px;
								height: 40px;
								color: #FF390B;
								font-size: 16px;
								background: #1C2023;
								border: 1px solid #FF390B;
								border-radius: 11px;
								display: flex;
								cursor: pointer;
								align-items: center;
								justify-content: center;
							}
						}

						.block6_btom4 {
							width: 13%;
							height: 65px;
							display: flex;
							align-items: center;
						}

						.block6_btom5 {
							width: 18%;
							height: 65px;
							display: flex;
							align-items: center;

							.block6_btom4_host {
								width: 92%;
								display: flex;
								align-items: center;
								justify-content: space-between;

								img {
									width: 36px;
									height: 36px;
									border-radius: 12px;
								}

								.block6_btom4_host_text {
									text-decoration: underline;
								}
							}

						}
					}

					.block6_btom_list:last-child {
						border-bottom: 0;
					}
					.block6_nothing{
						color:#fff;
						text-align: center;
						margin: 20px 0;
					}
				}
			}
			.rank_pagination{
				display: flex;
				justify-content: flex-end;
				margin-top: 15px;
			}
		}
	}
</style>
