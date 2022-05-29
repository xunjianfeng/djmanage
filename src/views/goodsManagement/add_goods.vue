<template>
	<div class="index">
		<SettingView :index="1"></SettingView>
		<div class="container">
			<!-- end -->
			<div class="top_tabs">
				<div class="tabs_block">商城管理 /</div>
				<div class="tabs_block" @click="jump_goodsManage">商品管理 /</div>
				<div class="tabs_block">添加商品</div>
			</div>
			<div class="play_container">
				<div class="play_head">
					<div class="screen_title">
						<div class="screen_text">添加商品</div>
					</div>
				</div>
				<div class="goods_main">
					<el-steps :active="active" finish-status="success">
						<el-step title="商品基本信息"></el-step>
						<el-step title="款式设置"></el-step>
					</el-steps>
					<div class="goods_form">
						<el-form :model="dataForm" ref="dataForm" label-width="90px" label-position="right">
							<div v-show="active==0">
								<el-form-item label="商品名称:">
									<el-input placeholder="请输入" v-model="dataForm.commodityName"></el-input>
								</el-form-item>
								<el-form-item label="商品分类:">
									<el-select v-model="dataForm.categoryId" style="width:250px" :popper-append-to-body="false">
										<el-option v-for="(item,index) in category_list" :key="index" :label="item.categoryName" :value="item.commodityCategoryId"></el-option>
									</el-select>
								</el-form-item>
								<!-- <el-form-item label="有效期限:">
									<el-date-picker
										v-model="dataForm.value1"
										type="datetimerange"
										range-separator="至"
										start-placeholder="开始日期"
										end-placeholder="结束日期">
									</el-date-picker>
								</el-form-item> -->
								<el-form-item label="商品标准:">
									<el-input placeholder="请输入" maxlength="20" v-model="dataForm.standard"></el-input>
								</el-form-item>
								<el-form-item label="商品简介:">
									<el-input type="textarea" rows="4" placeholder="请输入" v-model="dataForm.commodityIntroduce"></el-input>
								</el-form-item>
								<el-form-item label="如何使用:">
									<el-input type="textarea" rows="4" placeholder="请输入" v-model="dataForm.howUse"></el-input>
								</el-form-item>
								<el-form-item label="商品规则:">
									<el-input type="textarea" rows="4" placeholder="请输入" v-model="dataForm.rule"></el-input>
								</el-form-item>
								<!-- <el-form-item label="运费模版:">
									<el-select v-model="dataForm.next" style="width:250px">
										<el-option label="显示" value="true"></el-option>
										<el-option label="否" value="false"></el-option>
									</el-select>
								</el-form-item> -->
								<el-form-item label="支付方式:">
									<el-select v-model="dataForm.payMethod" style="width:250px" :popper-append-to-body="false">
										<el-option label="coin" value="coin"></el-option>
										<el-option label="point" value="point"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="上架:">
									<el-switch v-model="dataForm.commodityState" active-color="#2A2E3F" inactive-color="#cccccc">
									</el-switch>
								</el-form-item>
								<el-form-item label="商品图片/封面:">
									<div style="display: flex;flex-wrap: wrap;align-items: center;">
										<img class="active1_img" v-for="(item,index) in commodityPicture" :key="index" :src="HOST + item" @click="del_Img(index)">
										<div v-if="commodityPicture==''" style="border:1px solid #fff" class="poster_img">
											<div class="img_tip">Please upload a poster</div>
											<div class="img_size">Size recommend: 547 x 547 px</div>
										</div>
										<el-upload class="avatar-uploader" :action="HOST+'img/upload'" :show-file-list="false" :on-success="res => {return handleAvatarSuccess(res,'commodityPicture', 0);}"
										 :before-upload="beforeAvatarUpload">
											<i class="el-icon-plus avatar-uploader-icon" style="margin-left:10px;"></i>
										</el-upload>
									</div>
								</el-form-item>
							</div>
							<div v-show="active==1" style="text-align: center;font-family:'Roboto-Bold';">
								<!-- <el-form-item label="参赛类型:">
									<el-radio v-model="form.type" label="1">单款式</el-radio>
									<el-radio v-model="form.type" label="2">多款式</el-radio>
								</el-form-item> -->
								<el-table :data="tableData">
									<el-table-column prop="name" label="规格" width="220">
										<template slot-scope="{ row }">
											<el-input v-model="row.specsName"></el-input>
										</template>
									</el-table-column>
									<el-table-column label="售价">
										<template slot-scope="{ row }">
											<el-input v-model="row.specsPrice" oninput="value=value.replace(/[^\d\.]/g,'')" onblur="value=value.replace(/[^\d\.]/g,'')"></el-input>
										</template>
									</el-table-column>
									<el-table-column label="库存">
										<template slot-scope="{ row }">
											<el-input v-model="row.specsStock" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
										</template>
									</el-table-column>
									<el-table-column prop="del" label="删除" width="80">
										<template slot-scope="{ row, $index }">
											<div class="rulel_position">
												<img src="../../assets/images/Frame2.png" alt="" @click="handleJianReward($index)">
											</div>
										</template>
										
									</el-table-column>
								</el-table>
								<el-button type="primary" style="font-family:'Roboto-Bold';" @click="add">添加规格</el-button>

							</div>
							<div class="footer_form">
								<el-button type="primary" v-if="active==0" @click="nextStep">下一步</el-button>
								<div v-else>
									<el-button type="primary" style="background:#FEFFFF;border:none;color:#333;font-family:'Roboto-Bold';" @click="lastStep">上一步</el-button>
									<el-button type="primary" style="font-family:'Roboto-Bold';" @click="submit">添加</el-button>
								</div>
							</div>
						</el-form>
					</div>

				</div>
			</div><!-- play_container -->
		</div>
	</div>
</template>

<script>
	import {
		addCommodity,
		CommodityDetail,
		listCategory
	} from '@/api/good'
	import SettingView from '@/components/goods/left.vue';
	export default {
		name: "account",
		components: {
			SettingView
		},
		data() {
			return {
				active: 0,
				form: {},
				category_list: [],
				dataForm: {
					commodityName: '',
					categoryId: '',
					commodityIntroduce: '',
					commodityState: true,
					commodityPicture: '',
					howUse: '',
					rule: '',
					standard: '',
					specs: [],
				},
				commodityPicture: [],
				tableData: [
					// {
					// 	specsName: '',
					// 	specsPrice: "",
					// 	payMethod: "",
					// 	specsStock: ""
					// }
					
				],
				commodityId: '',
			}
		},
		mounted() {
			this.getListCategory();
			this.commodityId = this.$route.query.commodityId
			if (this.commodityId != '' && this.commodityId != undefined && this.commodityId != null) {
				this.commody_details(this.commodityId)
			}

		},
		methods: {
			jump_goodsManage(){
				this.$router.push({path:'/goodsManagement/goods_manage'})
			},
			handleJianReward(index){
				this.tableData.splice(index,1)
			},
			// 删除图片
			del_Img(index) {
				this.$confirm('是否删除该图片?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.commodityPicture.splice(index, 1);
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				}).catch(() => {});
			},
			// 商品详情
			commody_details(commodityId) {
				let that = this;
				CommodityDetail({
					commodityId
				}).then(res => {
					let goodsInfo = res.data
					goodsInfo['commodityState'] = goodsInfo['commodityState'] == 1 ? true : false
					if (goodsInfo['picture']) {
						for (var i = 0; i < goodsInfo.picture.length; i++) {
							this.commodityPicture.push(goodsInfo.picture[i].url)
						}
					}

					this.tableData = goodsInfo['specs'] || []
					this.dataForm = goodsInfo
				})
			},
			// 提交
			submit() {
				let that = this
				if (this.tableData != '') {
					that.dataForm['specs'] = []
					this.tableData.map((item) => {
						that.dataForm['specs'].push(item)
					})
				}
				if (that.dataForm['specs'].length==0) {
					this.$message({
						type: 'warning',
						message: '商品规格不能为空'
					});
					return false
				}
				let params = this.dataForm,
					commodityPicture = JSON.parse(JSON.stringify(this.commodityPicture))
				params['commodityPicture'] = commodityPicture.join(',')
				params['commodityState'] = params['commodityState'] ? '1' : '0'
				addCommodity(params).then(res => {
					this.$message({
						type: 'success',
						message: res.message
					});
					this.$router.go(-1)
				})
			},
			// 上一步
			lastStep() {
				this.active = 0
			},
			// 下一步
			nextStep() {
				if(this.dataForm.commodityName == ''){
					this.$message({
						type:'warning',
						message:'商品名称不能为空！'
					})
				}else if(this.dataForm.categoryId == '' || this.dataForm.categoryId == null){
					this.$message({
						type:'warning',
						message:'请选择商品分类！'
					})
				}else if(this.dataForm.standard == ''){
					this.$message({
						type:'warning',
						message:'商品的标准不能为空！'
					})
				}else if(this.dataForm.commodityIntroduce == ''){
					this.$message({
						type:'warning',
						message:'商品的简介不能为空！'
					})
				}else if(this.dataForm.howUse == ''){
					this.$message({
						type:'warning',
						message:'请说明商品的使用方法！'
					})
				}else if(this.dataForm.rule == ''){
					this.$message({
						type:'warning',
						message:'商品的规则不能为空！'
					})
				}else if(this.dataForm.payMethod == '' || this.dataForm.payMethod == null){
					this.$message({
						type:'warning',
						message:'请选择商品的支付方式！'
					})
				}else if(this.commodityPicture.length == 0){
					this.$message({
						type:'warning',
						message:'请上传商品图片/封面！'
					})
				}else{
					this.active = 1
				}
			},
			// 添加规格
			add() {
				this.tableData.push({
					specsName: '',
					specsPrice: "",
					specsStock: ""
				})
			},
			// 商品分类列表
			getListCategory() {
				listCategory({}).then(res => {
					const {
						list,
						total
					} = res.data
					this.category_list = list;
				})
			},
			add_account() {
				this.dialogFormVisible = !this.dialogFormVisible
			},
			jump_play(index) {
				this.$router.push({
					path: '/user/integral_details'
				})
			},
			handleDelImg(attr, index) {
				this.dataForm[attr][index]['sponsorLogo'] = ''
			},
			handleAvatarSuccess(res, attr, index) {
				console.log(index)
				this.$loading({
					customClass: "animated fadeOut"
				}).close();
				if(res.code == 200){
					this.$message({
						type: 'success',
						message: res.message
					});
					if (attr === 'commodityPicture') {
						this.commodityPicture.push(res.data)
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
		margin: 0 56px 0 224px;
		padding-bottom: 20px;

		/deep/ .el-table td,
		.el-table th.is-leaf {
			background: #484C5D;
			color: #fff;
			border: 1px solid #414558;
			text-align: center;
		}

		/deep/ .el-table th,
		.el-table tr {
			background: #5D5F71;
			color: #fff;
			border: 1px solid #414558;
			text-align: center;
		}

		/deep/ .el-table {
			border: 1px solid #414558;
		}

		/deep/ .el-table--border:after,
		.el-table--group:after,
		.el-table:before {
			background-color: #414558;
		}

		/deep/ .el-table--enable-row-hover .el-table__body tr:hover>td {
			background: #5D5F71;
		}

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
				font-family: PingFangSC-Regular, PingFang SC;
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
					margin-bottom: 24px;

					.screen_text {
						font-size: 18px;
						// font-family: PingFangSC-Medium, PingFang SC;
						font-family:'Roboto-Bold';
						font-weight: 500;
						color: #FFFFFF;
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
			.el-table__empty-block{
				background-color: #33384B; 
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
				/deep/ .el-form-item__label {
					width: 160px !important;
					// background-color: #FFF0B7;
					padding-right: 10px;
					// color: #000000;
					padding-right: 30px;
				}
				/deep/ .el-form-item__content{
					margin-left: 170px !important;
				}
				.active1_img {
					width: 120px;
					height: 120px;
					margin-right: 10px;
				}
				
				.active1_img:last-child {
					margin-right: 0;
				}
				.poster_img{
					// 466 x 224
					// width: 466px;
					// height: 224px;
					width: 321px;
					height: 154px;
					margin-right: 44px;
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
					font-family:'Roboto-Bold';
				}
			}

			.el-input__inner {
				background: initial;
				color: #fff;
			}
		}

		//play_container

	}
</style>
