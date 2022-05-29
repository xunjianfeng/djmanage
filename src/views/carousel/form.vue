<template>
	<div class="index">
		<LeftView :index="4"></LeftView>
		<div class="container">
			<div class="top_tabs">
				<div class="tabs_block">轮播管理 /</div>
				<div class="tabs_block" @click="jump_carousel">轮播列表 /</div>
				<div class="tabs_block">添加轮播</div>
			</div>
			<div class="play_container">
				<div class="play_head">
					<div class="screen_title">
						<div class="screen_text">首页轮播：添加</div>
						<div class="screen_right">
							<div class="screen_btn" @click="back">返回</div>
						</div>
					</div>
				</div>
				<div class="goods_main">
					<div class="goods_form">
						<el-form :model="dataForm" ref="dataForm" label-width="90px" label-position="right">
							<div>
								<el-form-item label="添加海报:">
									<div style="display: flex;flex-wrap: wrap;align-items: center;">
										<el-upload class="avatar-uploader" :action="HOST+'img/upload'" :show-file-list="false" :on-success="res => {return handleAvatarSuccess(res,'advertisementUrl', 0);}"
										 :before-upload="beforeAvatarUpload">
											<img  v-if="dataForm.advertisementUrl != ''" class="active1_img" :src="HOST + dataForm.advertisementUrl">
											<i v-else  class="el-icon-plus avatar-uploader-icon" style="margin-left:10px;"></i>
										</el-upload>
									</div>
									<div style="color: #6f7a82;">建议尺寸：1505 x 412px</div>
								</el-form-item>
								<el-form-item label="推送对象">
									<el-select v-model="dataForm.advertisementRange" placeholder="请选择" :popper-append-to-body="false">
									    <el-option
									      v-for="item in options"
									      :key="item.value"
									      :label="item.label"
									      :value="item.value">
									    </el-option>
									  </el-select>
									
								</el-form-item>
								<el-form-item label="海报标题">
									<el-input placeholder="内容不超过10字" v-model="dataForm.advertisementTitle"></el-input>
								</el-form-item>
								<el-form-item label="海报链接:">
									<el-input placeholder="join链接标题" maxlength="50" v-model="dataForm.joinTitle" style="margin-bottom: 10px;"></el-input>
									<br>
									<el-input placeholder="URL" maxlength="50" v-model="dataForm.joinLink" style="margin-bottom: 10px;"></el-input>
									<br>
									<el-input placeholder="seeMore链接标题" maxlength="50" v-model="dataForm.seeMoreTitle" style="margin-bottom: 10px;"></el-input>
									<br>
									<el-input placeholder="URL" maxlength="50" v-model="dataForm.seeMore" style="margin-bottom: 10px;"></el-input>
									<br>
									<!-- <i class="el-icon-plus avatar-uploader-icon" style="margin-left:10px;"></i> -->
								</el-form-item>
							</div>
							<div class="footer_form">
								<div>
									<el-button type="primary" @click="submit">保存</el-button>
								</div>
							</div>
						</el-form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		advertisementAdd,
		advertisementUpdate,
		advertisementList
	} from '@/api/carousel'
	import LeftView from '@/components/recharge/left.vue'
	export default {
		name: "carousel_form",
		components: {
			LeftView
		},
		data() {
			return {
				form: {},
				category_list: [],
				dataForm: {
					advertisementId:'',
					advertisementUrl: '',
					advertisementTitle: '',
					joinLink: '',
					seeMore: '',
					joinTitle:'',
					seeMoreTitle:'',
					advertisementRange: '', //1 用户端  2 主持端
				},
				advertisementId: '',
				options: [{
				  value: 1,
				  label: '用户端'
				}, {
				  value: 2,
				  label: '主持端'
				}],
			}
		},
		mounted() {
			if(this.$route.query.info == 0 ){
			}else{
				this.dataForm = JSON.parse(this.$route.query.info)
			}
		},
		methods: {
			// 提交
			submit() {
				let that = this;
				let {
					advertisementUrl,
					advertisementTitle,
					joinLink,
					seeMore,
					joinTitle,
					seeMoreTitle,
					advertisementRange
				} = that.dataForm;
				if (advertisementUrl == '' || (advertisementRange =='' || advertisementRange == null || advertisementRange == undefined)) {
					that.$message({
						message: '请填写完整信息！！！',
						type: 'warning'
					})
					return false
				} else {
					let adveroute = that.dataForm.advertisementId == ''?  advertisementAdd :advertisementUpdate;
					adveroute(that.dataForm).then(res => {
						this.$message({
							type: 'success',
							message: res.message
						});
						this.$router.go(-1)
					})
				}
			},
			// 上传成功
			handleAvatarSuccess(res, attr, index) {
				let that = this;
				that.$loading({
					customClass: "animated fadeOut"
				}).close();
				if(res.code == 200){
					this.$message({
						type: 'success',
						message: res.message
					});
					if (attr === 'advertisementUrl') {
						that.dataForm.advertisementUrl = res.data
					}
				}else{
					this.$message({
						type: 'error',
						message: res.message
					});
				}
				
			},
			// 上传中
			beforeAvatarUpload(file) {
				const isJPG = file.type;
				const isLt2M = file.size / 1024 / 1024 < 3;
				this.$loading({
					background: "rgba(255, 255, 255, 0.7)",
					customClass: "animated fadeIn",
					text: "上传中"
				});

				return isJPG && isLt2M;
			},
			back() {
				this.$router.go(-1); //返回上一层
			},
			jump_carousel(){
				this.$router.push({path:'/carousel/index'})
			}
		}
	}
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
		text-align: center;
	}
	/deep/ .el-select-dropdown__item.hover{
		background-color: #545873;
	}
	/deep/ .el-select-dropdown__item.selected{
		background-color: #545873;
	}
</style>
<style lang="less" scoped>
	.container {
		background: #33384B;
		// margin: 0 56px 0 56px;
		margin: 0 56px 0 224px;
		padding-bottom: 20px;

		/deep/.el-date-editor .el-range-separator {
			color: #fff;
		}

		/deep/ .el-range-input {
			background-color: #33384B;
		}

		/deep/ .el-textarea__inner {
			background-color: #33384B;
			color: #fff;
		}

		.top_tabs {
			position: fixed;
			display: flex;
			top: 98px;

			.tabs_block {
				cursor: pointer;
				font-size: 14px;
				// font-family: PingFangSC-Regular, PingFang SC;
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

		.play_container {
			.play_head {
				padding: 30px 30px 0px 30px;

				.screen_title {
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 24px;

					.screen_text {
						font-size: 18px;
						// font-family: PingFangSC-Medium, PingFang SC;
						font-family:'Roboto-Bold';
						font-weight: 500;
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
							// font-family: PingFangSC-Regular, PingFang SC;
							font-family:'Roboto-Regular';
						}
					}
				}

				.screen_condition {
					display: flex;

					.screen_left {
						display: flex;
						align-items: center;

						.search_span {
							font-size: 14px;
							// font-family: PingFangSC-Regular, PingFang SC;
							font-family:'Roboto-Regular';
							font-weight: 400;
							color: #FFFFFF;
						}

						/deep/ .el-select .el-input .el-input__inner {
							border: 0px;
							width: 151px;
							background-color: #33384B;
							border: 1px solid #ffffff;
							font-family:'Roboto-Regular';
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
						margin-right: 17px;

						.search_span {
							font-size: 14px;
							// font-family: PingFangSC-Regular, PingFang SC;
							font-family:'Roboto-Regular';
							font-weight: 400;
							color: #FFFFFF;
						}

						.search_input {
							width: 250px;
							margin-left: 10px;
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
								background-color: #33384B;
								font-family:'Roboto-Regular';
							}
						}
					}

					.screen_date {
						display: flex;
						align-items: center;
						margin-right: 39px;

						.search_span {
							font-size: 14px;
							// font-family: PingFangSC-Regular, PingFang SC;
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
							font-family:'Roboto-Regular';
						}

						/deep/ .el-range-input {
							background-color: #33384B;
						}

						/deep/ .el-date-editor .el-range-input {
							color: #fff;
						}
					}

					.screen_btn {
						width: 150px;
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
						// font-family: PingFangSC-Regular, PingFang SC;
						font-family:'Roboto-Regular';
						margin-right: 8px;
						position: absolute;
						right: 80px;
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
						// font-family: PingFangSC-Regular, PingFang SC;
						font-family:'Roboto-Regular';
					}
				}
			}
		}

		/deep/ .goods_main {
			width: 80%;
			margin: 0 auto;
			color: #fff;

			.el-input {
				width: 260px;
			}

			.el-step__title.is-process {
				color: #fff;
			}

			.el-form-item__label {
				color: #fff;
				font-family:'Roboto-Regular';
			}

			.el-radio__label {
				color: #fff;
			}

			.rulel_position {
				img {
					width: 23px;
					height: 23px;
					cursor: pointer;
				}
			}

			.footer_form {
				margin: 40px 300px;
				font-family:'Roboto-Bold';
			}

			.goods_form {
				margin-top: 30px;
				.el-form-item__label {
					// width: 89px !important;
					width: 90px !important;
					// background-color: #FFF0B7;
					// color: #000;
					// padding-right: 0px;
					// margin-right:5px;
				}
				 .el-form-item__content{
					margin-left: 110px !important;
					// margin-left: 210px !important;
				}
				.active1_img {
					width: 320px;
					height: 120px;
					margin-right: 10px;
				}

				.active1_img:last-child {
					margin-right: 0;
				}

				.img_col {
					float: left;
					margin-right: 30px;

					.upload {
						width: 100%;
						border: 1px solid #fff;
						margin-top: 10px;
						height: 150px;
						display: flex;
						justify-items: center;
						align-items: center;
						
						p {
							border: 1px solid #414558;
							width: 80%;
							margin: 0 auto;
							text-align: center;
						}
					}
				}

				.img_button {
					margin-top: 90px;
				}

				.img_buttons {
					width: 550px;
					background: initial;
					border: 1px dashed #218BE4;
					color: #218BE4;
				}
			}

			.el-input__inner {
				background: initial;
				color: #fff;
				font-family:'Roboto-Regular';
			}
		}

	}
</style>
