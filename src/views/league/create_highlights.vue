<template>
	<div class="index" id="wangeditor">
		<div class="container">
			<div class="predict_container">
				<!-- 内容 -->
				<div class="predict_content">
					<div class="predict_head">
						<div class="predict_back" @click="add_league(0)">
							<span><<</span> Create New Highlight
						</div> 
					</div>
					<div class="step_content">
						<div class="step_active1" >
							<el-form ref="dataForm" :model="dataForm" :label-position="labelPosition">
								<el-form-item label="Title">
									<el-input v-model="dataForm.title" ></el-input>
								</el-form-item>
								<el-form-item label="Info">
									<el-input v-model="dataForm.introduction" type="textarea" :rows="8" resize="none"></el-input>
								</el-form-item>
								<el-form-item label="Video Link (url)">
									<div class="hundred_block">
										<div class="hund_left">
											<!-- 视频地址 -->
											<!-- https://vd2.bdstatic.com/mda-jm38zndgehisax4v/sc/mda-jm38zndgehisax4v.mp4?playlist=%5B%22hd%22%2C%22sc%22%5D&v_from_s=hkapp-haokan-hna&auth_key=1625105536-0-0-ba47be051224c8070ee18ed25899e364&bcevod_channel=searchbox_feed&pd=1&pt=3&abtest= -->
											<input type="text" class="input"  v-model="dataForm.videoUrl">
										</div>
									</div>
								</el-form-item>
								<el-form-item >
									<div class="step_btn">
										<div class="last_step" @click="add_league(1)">Save</div>
										<div class="nex_step" @click="add_league(0)">Cancel</div>
									</div>
								</el-form-item>
							</el-form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { saveHighlight } from '@/api/league.js'
	export default {
		name: "create_highlights",
		inject:['reload'],
		components: {
		},
		data() {
			return {
				dataForm: {
					leagueId:'',
					id:'',
					title:'',
					introduction:'',
					videoUrl:''
				},
				highinfo:{
					
				},
				labelPosition:'top'
			};
		},
		mounted() {
			console.log(this.$route.query.highinfo)
			
			if(this.$route.query.highinfo != undefined){
				this.highinfo = JSON.parse(this.$route.query.highinfo)
				this.dataForm = {
					leagueId:this.highinfo.leagueId,
					id:this.highinfo.id,
					title:this.highinfo.title,
					introduction:this.highinfo.introduction,
					videoUrl:this.highinfo.videoUrl,
				}
			}
			console.log(this.$route.query.leagueId)
			if( this.$route.query.leagueId){
				this.dataForm.leagueId = this.$route.query.leagueId
			}
			
			console.log('highinfo....')
			console.log(this.highinfo)
			console.log(this.dataForm)
			
		},
		methods: {
			// 添加精彩瞬间
			add_league(index){
				let that = this;
				if(index == 1){
					let { title , introduction ,videoUrl } = that.dataForm
					if(title == '' || introduction == '' || videoUrl == ''){
						this.$message({
							type: 'warning',
							message: '请输入完整信息！！！'
						});
					}else{
						saveHighlight(that.dataForm).then(res => {
							this.$message({
							  message: res.message,
							  type: 'success'
							});
							this.$router.push({ path: '/league/highlights',query:{id:this.dataForm.leagueId}})
						})
					}
				}else{
					this.$router.go(-1) ;
				}
			},
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
			// background-color: #0E0F11;
			background-color:#33384B;
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
						font-family:'Quicksand-Regular';
						span {
							margin-right: 26px;
						}
					}
				}
				// 步骤内容
				.step_content {
					padding: 62px 0 62px 0 ;
					border-radius: 24px;
					// background-color: #0E0F11;
					background-color:#33384B;
					margin-left: 30px;
					.step_active1 {
						width: 960px;
						margin-left: 80px;
						color: #fff;
						/deep/.el-input .el-input__count .el-input__count-inner{
							// background-color: #0E0F11;
							background-color:#33384B;
							color: #fff;
							font-family:'Roboto-Regular';
						}
						/deep/.el-textarea__inner{
							// background-color: #0E0F11;
							background-color:#33384B;
							color: #fff;
							font-family:'Roboto-Regular';
						}
						.el-form-item__label {
							padding-right: 0px;
							font-family:'Roboto-Regular';
						}
						.hundred_block {
							height: 47px;
							border-radius: 6px;
							padding: 0 20px;
							border: 1px solid #dcdfe6;
							display: flex;
							align-items: center;
							color: #fff;
							justify-content: space-between;
							font-family:'Roboto-Regular';
							.hund_left {
								width: 100%;
								.input {
									width: 100%;
									height: 55px;
									// color: #727272;
									color: #fff;
									background: inherit;
									font-size: 18px;
									border: none;
								}
							}
						
							.hund_right {
								.upload-demo {
									width: 20px;
						
								}
						
								.hund_san {
									width: 20px;
								}
							}
						}
						.step_btn {
							display: flex;
							font-size: 20px;
							// font-family: PingFangSC-Regular, PingFang SC;
							font-family:'Roboto-Regular';
							font-weight: 400;
							margin: 15px 0;
							.last_step {
								width: 163px;
								height: 58px;
								color: #0E0F11;
								background: #D3AA53;
								border-radius: 25px;
								border: 1px solid #D3AA53;
								cursor: pointer;
								display: flex;
								align-items: center;
								justify-content: center;
								margin-right: 20px;
							}
							.nex_step {
								width: 163px;
								height: 58px;
								color: #FFFFFF;
								// background-color: #0E0F11;
								background-color:#33384B;
								border: 1px solid #777777;
								border-radius: 25px;
								cursor: pointer;
								display: flex;
								align-items: center;
								justify-content: center;
							}
						}
					}
					
				}
			}
		}
	}
</style>
