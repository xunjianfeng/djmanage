<template>
	<div class="index">
		<LeftView :index="6"></LeftView>
		<div class="container">
			<!-- 添加FAQ、修改FAQ 弹窗 -->
			<div class="create_voucher">
				<div class="mark_cancel"  v-if="voucher_up == true" @click.stop="closeStatus">
					<img src="../../assets/images/close.png" />
				</div>
				<div class="mark_bac" v-if="voucher_up == true"></div>
				<div class="mark_scontent" v-if="voucher_up == true">
					<div class="title_name" v-if="open_index == 1">Create FAQ Question</div>
					<div class="title_name" v-if="open_index == 2">Edit FAQ Question</div>
					<div class="content_region">
						<div class="block_region_type">
							<div class="block_left">
								<div class="label">FAQ Category</div>
								<div class="sort_by">
									<div class="options_select">
										<el-select placeholder="请选择" v-model="dataForm.type" :popper-append-to-body="false" >
											<el-option v-for="(ctem,cndex) in category_list" :label="ctem.fqaCategory" :value="ctem.fqaCategoryId"></el-option>
										</el-select>
									</div>
								</div>
							</div>
						</div>
						<div class="block_region">
							<div class="label">FAQ Title</div>
							<div class="input_block">
								<input type="text"  v-model="dataForm.question" @input="Tontent()"  maxlength="30" />
								<div class="text">({{text_num}}/30)</div>
							</div>
						</div>
						<div class="block_region">
							<div class="label">FAQ Description</div>
							<div class="region_block">
								<textarea  class="input-left" maxlength="2000" @input="Dontent()"  v-model="dataForm.answer"></textarea>
								<div class="des_num">({{des_num}}/2000)</div>
							</div>
						</div>
					</div>
					<div class="save_btn">
						<div class="btn" @click="questionDeal(open_index,questionId)">Save</div>						
					</div>
				</div>
			</div>
			<!--end -->
			<div class="category_container">
				<div class="container_header">
					<div class="nav_left">
						<div class="nav_left_text">FAQ Question</div>
					</div>
				</div>
				<div class="content">
					<div class="content_top">
						<div class="top_left">
							<el-select placeholder="请选择" v-model="listQuery.type" :popper-append-to-body="false" @change="selectChanged">
								<el-option label="全部" value=""></el-option>
								<el-option v-for="(ctem,cndex) in category_list" :label="ctem.fqaCategory" :value="ctem.fqaCategoryId"></el-option>
							</el-select>
						</div>
						<div class="top_right" @click="open_mark(1,'')">Create FAQ</div>
					</div>
					<div class="content_table">
						<div class="table_header">
							<!-- <div class="header_col">Created Date</div> -->
							<div class="header_col">FAQ Category</div>
							<div class="header_col header_title">FAQ Title</div>
							<div class="header_col header_description">FAQ Description</div>
							<div class="header_col_1"></div>
						</div>
						<div class="table_body">
							<div class="body_row" v-for="(item,index) in question_list" :key="index">
								<!-- <div class="row_col">--</div> -->
								<div class="row_col">{{item.categoryName}}</div>
								<div class="row_col text_title">{{item.question}}</div>
								<div class="row_col text_description">{{item.answer}}</div>
								<div class="row_col_1">
									<div class="text" @click="open_mark(2,item)">Edit</div>  
									<div class="line">|</div>
									<div class="text" @click="delQuestion(item.id)"> Delete</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
					
		</div>
	</div>
</template>

<script>
	import LeftView from '@/components/recharge/left.vue'
	import {faqCategory,faqQuestion,faqQuestionAdd,faqQuestionUpdate,faqQuestionDelete} from '@/api/recharge.js'
	import Listing from '@/mixin/Listing';
	export default{
		name:"faq_question",
		components:{
			LeftView
		},
		mixins: [Listing],
		data(){
			return{
				voucher_up:false,
				text_num:0,//title的字数
				des_num:0,//解说的字数
				category_list:[],//分类列表s
				question_list:[],//问题列表
				open_index:1,// 1.添加，2修改
				dataForm:{
					question:'',
					answer:'',
					type:''
				},
				listQuery:{
					type:'',
					// page:1,
					// size:10
				},
				questionId:''
			}
		},
		mounted() {
			this.getCategory()
			this.getList()
		},
		methods:{
			//分类列表
			getCategory(){
				faqCategory().then(res => {
					this.category_list = res.data
				})
			},
			// 问题列表
			getList(){
				faqQuestion(this.listQuery).then(res => {
					// console.log(res.data)
					for(let a = 0; a < res.data.length;a++){
						res.data[a]['categoryName'] = ''
					}
					this.question_list = res.data
					for(let c=0;c<this.question_list.length;c++){
						for(let d=0;d<this.category_list.length;d++){
							if(this.question_list[c].type == this.category_list[d].fqaCategoryId){
								this.question_list[c]['categoryName'] = this.category_list[d].fqaCategory
								// console.log(this.question_list[c]['categoryName'])
							}else{
								// console.log("错了？")
							}
						}
					}
				})
				
			},
			//关闭弹窗
			closeStatus(){
				this.voucher_up = false
				this.dataForm = {}
			},
			// title字数限制
			Tontent(){
				let that = this;
				that.text_num = that.dataForm.question.length
			},
			// description字数限制
			Dontent(){
				let that = this;
				that.des_num = that.dataForm.answer.length
			},
			open_mark(index,item){
				// this.voucher_up = true
				this.open_index = index
				console.log(this.open_index)
				console.log(item)
				if(this.open_index == 1){
					this.voucher_up = true
				}else if(this.open_index == 2){
					this.voucher_up = true
					let {question,answer,type,id} = item
					this.questionId = id
					this.dataForm.question = question
					this.dataForm.answer = answer
					this.dataForm.type = type
				}
			},
			questionDeal(open_index,questionId){
				let that = this
				console.log(questionId)
				if(that.open_index == 1){
					console.log("添加")
					//分类添加
					if(that.dataForm.question == ''){
						that.$message({
						  message: 'FAQ Title不能为空！',
						  type: 'warning'
						})
					}else if(that.dataForm.answer == ''){
						that.$message({
						  message: 'FAQ Description不能为空！',
						  type: 'warning'
						})
					}else if(that.dataForm.type == '' || that.dataForm.type == null || that.dataForm.type == undefined){
						that.$message({
						  message: '请选择所属Category！',
						  type: 'warning'
						})
					}else{
						faqQuestionAdd(that.dataForm).then(res => {
							that.$message({
							  message: res.message,
							  type: 'success'
							})
							that.getList()
							that.voucher_up = false
							that.dataForm = {}
						})
					}
					
				}else if(that.open_index == 2){
					that.dataForm.id = questionId
					faqQuestionUpdate(that.dataForm).then(res => {
						that.$message({
						  message: res.message,
						  type: 'success'
						})
						that.getList()
						that.voucher_up = false
						that.dataForm = {}
					})
				}
			},
			delQuestion(id){
				let params = {
					id
				}
				this.$confirm('是否确定删除该问题？', '信息', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					faqQuestionDelete(params).then(res => {
						this.$message({
						  message: res.message,
						  type: 'success'
						})
						this.getList()
					})
				})
			},
			selectChanged(value) {
				console.log("你选上了")
				this.handleFilter();
			},
			handleFilter() {
				console.log("选了")
				console.log(this.listQuery.type)
				// this.listQuery.page = 1;
				this.getList()
			},
		}
	}
</script>

<style lang="less" scoped>
	.container {
		background: #33384B;
		margin: 0 56px 0 224px;
		padding-bottom:20px;
		.create_voucher{
			position: relative;
			left: 165px;
			.mark_cancel{
				width: 46px;
				height: 46px;
				position: absolute;
				right: 180px;			
				z-index: 999;
				img{
					width: 46px;
					height: 46px;
					cursor: pointer;
				}
			}
			.mark_bac{
				width: 100%;
				height: 100vh;
				background:#000000b3;
				position: fixed;
				left: 0;
				top: 0;
				z-index: 88;
			}
			.mark_scontent{
				width: 800px;
				background: #33384B;
				border-radius: 32px;
				position: absolute;
				top: 0px;
				z-index: 999;
				.title_name{
					color: #E5A518;
					font-size: 24px;
					display: flex;
					justify-content: center;
					padding-top: 40px;
					margin-bottom: 20px;
					font-family:'Quicksand-Bold';
				}
				.content_region{
					display: flex;
					flex-direction: column;
					align-items: center;
					.block_region{
						margin-bottom: 30px;
						.label{
							color: #727272;
							font-size: 20px;
							margin-bottom: 10px;
							font-family:'Roboto-Regular';
							span{
								color: red;
								font-family:'Roboto-Regular';
							}
						}
						input{
							width: 627px;
							height: 45px;
							border: 1px solid #2a2e3f;
							border-radius: 19px;
							color: #fff;
							background: #2a2e3f;
							padding-left: 20px;
							font-size: 16px;
							font-family:'Roboto-Regular';
						}
						.input_block{
							display: flex;
							align-items: center;
							width: 645px;
							height: 45px;
							background: #2a2e3f;
							border: 1px solid #2a2e3f;
							border-radius: 19px;
							.text{
								color: #727272;
								font-size: 20px;
								padding-right: 10px;
								font-family:'Roboto-Regular';
							}
							input{
								height: 44px;
								border: 1px solid #2a2e3f;
								border-radius: 19px;
								color: #fff;
								background: #2a2e3f;
								padding-left: 20px;
								font-size: 16px;
								font-family:'Roboto-Regular';
								
							}
						}
						.img_area{
							display: flex;
							align-items: center;
							.img{
								width: 245px;
								height: 245px;
								background: #2a2e3f;
								border-radius: 17px;
								display: flex;
								align-items: center;
								justify-content: center;
								img{
									width: 149px;
									height: 154px;
									border-radius: 72.5px 77px;
								}
							}
							.text{
								color: #ffffff;
								font-size: 20px;
								margin-left: 70px;
								font-family:'Roboto-Regular';
							}
						}
						.region_block{
							border-radius: 19px;
							background: #2a2e3f;
							
							.des_num {
								color: #727272;
								font-size: 20px;
								padding-right: 10px;
								font-family:'Roboto-Regular';
								text-align: right;
								padding-bottom: 10px;
							}
							.input-left{
								width: 627px;
								height: 90px;
								// height: 227px;
								border: 1px solid #2a2e3f;
								border-radius: 19px;
								color: #fff;
								background: #2a2e3f;
								background: inherit;
								border: none;
								font-family:'Roboto-Regular';
								padding: 20px 0 20px 20px;
								font-size: 20px;
								resize: none;
								// overflow-y: scroll;
							}
							.input-left::-webkit-scrollbar {
								/*滚动条整体样式*/
								width : 10px;  /*高宽分别对应横竖滚动条的尺寸*/
								height: 1px;
								background-color: #33384B;
							}
							.input-left::-webkit-scrollbar-thumb {
								/*滚动条里面小方块*/
								border-radius   : 10px;
								background-color: #595959;
							}
							.input-left::-webkit-scrollbar-track {
								/*滚动条里面轨道*/
								background   : #7C7C7C;
								border-radius: 10px;
							}
						}
						
					}
					.block_region_type{
						width: 645px;
						display: flex;
						align-items: center;
						justify-content: space-between;
						margin-bottom: 30px;
						.block_left{
							.label{
								color: #727272;
								font-size: 20px;
								margin-bottom: 10px;
								font-family:'Roboto-Regular';
								span{
									color: red;
								}
							}
							.sort_by{
								font-family:'Roboto-Regular';
								.options_select{
									/deep/ .el-select .el-input .el-input__inner {
										border: 0px;
										width: 645px;
										height: 45px;
										padding: 0 20px;
										font-size: 18px;
										font-family:'Roboto-Regular';
										color: #fff;
										border-radius: 20px;
										background-color: #2a2e3f;
										// border: 1px solid #fff;
									}
									/deep/ .el-select-dropdown {
										background-color: #2a2e3f;
										border: 1px solid rgba(255,255,255,0.2);
									}
									/deep/ .el-icon-arrow-up:before { content: ""; }
									/deep/ .el-icon-arrow-down:before { content: ""; }
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
							}
						}
						
					}
				}
				.save_btn{
					display: flex;
					align-items: center;
					justify-content: center;
					margin: 20px 0 50px 0;
					.btn{
						cursor: pointer;
						width: 163px;
						height: 50px;
						background: #E5A518;
						border-radius: 25px;
						color: #0E0F11;
						font-size: 20px;
						display: flex;
						font-family:'Roboto-Regular';
						align-items: center;
						justify-content: center;
					}
				}
			}
		}
		
		.category_container{
			.container_header{
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 30px 20px 0;
				.nav_left{
					display: flex;
					align-items: center;
					.nav_left_text{
						color: #ffffff;
						font-size: 21px;
						font-family:'Quicksand-Bold';
					}
				}
			}
			.content{
				width: 95%;
				padding: 0 20px;
				margin-top: 30px;
				margin-left: 30px;
				.content_top{
					width: 98%;
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 30px;
					.top_left{
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
					.top_right{
						width: 160px;
						height: 45px;
						background-color: #0080FF;
						border-radius: 10px;
						color: #fff;
						text-align: center;
						line-height: 45px;
						cursor: pointer;
						font-size: 16px;
					}
				}
				.content_table{
					width: 98%;
					border: 1px solid #727272;					
					.table_header{
						height: 60px;
						display: flex;
						align-items: center;
						// justify-content: space-between;
						border-bottom: 1px solid #727272;
						text-align: center;
						font-family:'Quicksand-Bold';
						background-color: #2A2E3F;
						font-size: 18px;
						.header_col{
							// width: 15%;
							width: 20%;
							height: 60px;
							line-height: 60px;
							border-right: 1px solid #727272;
							color: #727272;
							&:last-child{
								border: none;
							}
						}
						.header_title{
							// width: 25%;
							width: 30%;
						}
						.header_description{
							// width: 30%;
							width: 35%;
						}
						.header_col_1{
							width: 15%;
						}
					}
					.table_body{
						.body_row{
							display: flex;
							align-items: center;
							height: 60px;
							text-align: center;
							font-family:'Roboto-Regular';
							border-bottom: 1px solid #727272;
							font-size: 16px;
							.row_col{
								// width: 15%;
								width: 20%;
								height: 60px;
								line-height: 60px;
								border-right: 1px solid #727272;
								color: #fff;
							}
							.text_title{
								// width: 25%;
								width: 30%;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: none;
							}
							.text_description{
								// width: 30%;
								width: 35%;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: none;
							}
							.row_col_1{
								width: 15%;
								height: 60px;
								line-height: 60px;
								border-right: 1px solid #727272;
								color: #fff;
								display: flex;
								align-items: center;
								justify-content: center;
								.text{
									color:#0080FF;
									cursor: pointer;
								}
								.line{
									margin: 0 10px;
								}
								&:last-child{
									border: none;
								}
							}
						}
					}
				}
			}	
		}
		
	}
</style>
