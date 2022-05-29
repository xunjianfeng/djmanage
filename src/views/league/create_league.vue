<template>
	<div class="index" id="wangeditor">
		<div class="container">
			<div class="predict_container">
				<!-- 内容 -->
				<div class="predict_content">
					<div class="predict_head">
						<div class="predict_back" @click="add_league(0)">
							<span><<</span> Create New League
						</div> 
					</div>
					<!-- 步骤内容 Predict Information -->
					<div class="step_content">
						<div class="step_active1" >
							<el-form ref="dataForm" :model="dataForm" :label-position="labelPosition" :rules="rules">
								<el-form-item label="Poster" prop="poster">
									<div class="poster_flex">
										<img v-if="dataForm.poster" class="poster_img" :src="HOST + dataForm.poster" alt="">
										<div v-if="dataForm.poster==''" style="border:1px solid #fff" class="poster_img1">
											<div class="img_tip">Please upload a poster</div>
											<div class="img_size">Size recommend: 350 x 530 px</div>
										</div>
										<el-upload
										  class="avatar-uploader"
										  :action="HOST+'img/upload'"
										  :show-file-list="false"
										  :on-success="res => {return handleAvatarSuccess(res,'poster');}"
										  :before-upload="beforeAvatarUpload">
										  <i>
											  <img class="recycle_Img" src="../../assets/images/recycle.png" alt="">
										  </i>
										</el-upload>
										
									</div>
								</el-form-item>
								<el-form-item label="Game Type" prop="gameId">
									<el-select v-model="dataForm.gameId" placeholder="请选择" style="width: 100%;" :popper-append-to-body="false">
										<el-option :label="item.gameName" :value="item.gameId" v-for="item in gamd_list" :key="item.gameId" ></el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="League Type" prop="leagueType">
									<el-radio v-model="dataForm.leagueType" label="Premier">Premier</el-radio>
									<el-radio v-model="dataForm.leagueType" label="Armature">Amateur</el-radio>
									<!-- <el-radio v-model="dataForm.leagueType" label="Both">Both</el-radio> -->
								</el-form-item>
								<el-form-item label="Title" prop="title">
									<el-input v-model="dataForm.title" maxlength="100" show-word-limit></el-input>
								</el-form-item>
								<el-form-item label="Info" prop="introduction">
									<Tinymce ref="editor" :height="160" v-model="dataForm.introduction" style="width: 591px;zoom: 0.9;" />
								</el-form-item>
								<el-form-item >
									<div class="step_btn">
										<div class="last_step" @click="onSubmit('dataForm')">Save</div>
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
	import Tinymce from '@/components/Tinymce';
	import { gamdList } from '@/api/game.js'
	import { leagueCreate } from '@/api/league.js'
	export default {
		name: "create_league",
		components: {
			
			Tinymce
		},
		data() {
			return {
				dataForm: {
					gameId: '',
					leagueType: '',
					poster: '',
					title: '',
					introduction: '',
				},
				rules: {
				  gameId: [
					{ required: true, message: '请选择游戏ID', trigger: 'change' }
				  ],
				  leagueType: [
				  	{ required: true, message: '请选择联赛类型', trigger: 'change' }
				  ],
				  title: [
				  	{ required: true, message: '请填写联赛标题', trigger: 'blur' }
				  ],
				},
				gamd_list: [],
				edit: '',
				labelPosition:'top',
			};
		},
		mounted() {
			this.gamdList()
		},
		methods: {
			add_league(index){
				if(index == 1){
					this.$router.go(-1) ;
				}else{
					this.$router.go(-1) ;
				}
			},
			// 创建联赛
			onSubmit(formName) {
				this.$refs[formName].validate(valid => {
					if (valid) {
						let params = this.dataForm
						leagueCreate(params).then(res => {
							this.$message({
							  message: res.message,
							  type: 'success'
							});
							this.$router.go(-1) ;
						})
					}
				})
			},
			
			// 游戏列表
			gamdList() {
				let params = {
					size:0,
				}
				gamdList(params).then(res => {
					this.gamd_list = res.data.list
				})
			},
			
			handleAvatarSuccess(res, attr) {
				this.$loading({
					customClass: "animated fadeOut"
				}).close();
				if(res.code == 200){
					this.$message({
						type: 'success',
						message: res.message
					});
					if (attr === 'poster') {
						this.dataForm.poster = res.data
					}
				}else{
					this.$message({
						type: 'error',
						message: res.message
					});
				}
				
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type;
				const isLt2M = file.size / 1024 / 1024 < 2;
				this.$loading({
					background: "rgba(255, 255, 255, 0.7)",
					customClass: "animated fadeIn",
					text: "上传中"
				});
				return isJPG && isLt2M;
			},
		}
	};
</script>
<style lang="less" scoped>
	/deep/ .el-select .el-input .el-input__inner {
		border: 0px;
		background-color: #33384B;
		border: 1px solid #ffffff;
		color: #FFFFFF;
	}

	/deep/ .el-select .el-input .el-input__inner:focus {
		color: #FFFFFF;
	}

	/deep/ .el-select-dropdown {
		background-color: #33384B;
		border: 1px solid rgba(255,255,255,0.2);
		color: #FFFFFF;
	}

	//修改单个的选项的样式
	/deep/ .el-select-dropdown__item {
		background-color: transparent;
		color: #FFFFFF;
	}

	/deep/ .el-select-dropdown__item.hover {
		background-color: #545873;
	}

	/deep/ .el-select-dropdown__item.selected {
		background-color: #545873;
	}
</style>

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
					font-family:'Quicksand-Regular';
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
				// 步骤内容
				.step_content {
					padding: 62px 0 62px 0 ;
					border-radius: 24px;
					background-color: #33384b;
					margin-left: 30px;
					.step_active1 {
						width: 960px;
						margin-left: 80px;
						/deep/.el-input .el-input__count .el-input__count-inner{
							background-color: #33384b;
							font-family:'Roboto-Regular';
						}
						.el-form-item__label {
							padding-right: 0px;
							font-family:'Roboto-Regular';
						}

						.active1_img {
							width: 334px;
							height: 180px;
							border-radius: 2px;
							border: 1px solid #FFFFFF;
						}
						
						.poster_flex{
							display: flex;
							align-items: center;
							.poster_img{
								width: 178px;
								height: 264px;
								margin-right: 40px;
								object-fit: cover;
								
							}
							.poster_img1{
								// width: 350px;
								// height: 530px;
								// margin-right: 44px;
								width: 205px;
								height: 264px;
								margin-right: 40px;
								display: flex;
								flex-flow: column;
								justify-content: center;
								text-align: center;
								.img_tip{
									color: #919191;
									font-size: 14px;
								}
								.img_size{
									color: #919191;
									font-size: 14px;
								}
							}
							.recycle_Img{
								width: 28px;
							}
						}
						.time_flex {
							display: flex;
							align-items: center;
							justify-content: space-between;
						}
						.price_check{
							display: flex;
							align-items: center;
							.check_text{
								color: #919191;
								font-size: 16px;
								font-size: 600;
								margin-right: 22px;
								font-family:'Roboto-Regular';
							}
							.check_block{
								width: 31px;
								height: 31px;
								display: flex;
								align-items: center;
								justify-content: center;
								img{
									width: 31px;
									height: 31px;
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
