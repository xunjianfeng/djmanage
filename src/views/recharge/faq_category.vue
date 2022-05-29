<template>
	<div class="index">
		<LeftView :index="5"></LeftView>
		<div class="container">
			<!-- 游戏类型 弹窗 -->
			<div class="edit_category">
				<div class="mark_cancel"  v-if="category_up == true" @click.stop="closeCategory">
					<img src="../../assets/images/close.png" />
				</div>
				<div class="mark_bac" v-if="category_up == true"></div>
				<div class="mark_content" v-if="category_up == true">
					<div class="title_name" v-if="open_status == 1">Add Category</div>
					<div class="title_name" v-if="open_status == 2">Edit Category</div>
					<div class="content_region">
						<div class="block_region">
							<div class="label">FAQ Category</div>
							<input type="text" v-if="open_status == 1" v-model="dataForm.category" maxlength="25" />
							<input type="text" v-if="open_status == 2" v-model="dataForm.category" maxlength="25" />
						</div>
					</div>
					<div class="save_btn">
						<div class="btn" @click="add_category(open_status,category_index)" v-if="open_status == 1">Create FAQ</div>
						<div class="btn" @click="add_category(open_status,category_index)" v-if="open_status == 2">Save</div>
					</div>
				</div>
			</div>
			<div class="category_container">
				<div class="container_header">
					<div class="nav_left">
						<div class="nav_left_text">FAQ Category</div>
					</div>
				</div>
				<div class="content">
					<div class="content_table">
						<div class="table_header">
							<!-- <div class="header_col">Created Date</div> -->
							<div class="header_col">FAQ Category</div>
							<div class="header_col"></div>
						</div>
						<div class="table_body">
							<div class="body_row" v-for="(item,index) in category_list" :key="index">
								<!-- <div class="row_col">--</div> -->
								<div class="row_col">{{item.fqaCategory}}</div>
								<div class="row_col_1">
									<div class="text" @click="open_category(2,item)">Edit</div>  
									<div class="line">|</div>
									<div class="text" @click="del_category(item.fqaCategoryId)"> Delete</div>
								</div>
							</div>
						</div>
					</div>
					<div class="table_col_add" @click="open_category(1,'')">+</div>
				</div>
			</div>
		
		</div>
	</div>
	
</template>

<script>
	import LeftView from '@/components/recharge/left.vue'
	import {faqCategory,faqCategoryAdd,faqCategoryUpdate,faqCategoryDelete} from '@/api/recharge.js'
	export default{
		name:"faq_category",
		components:{
			LeftView
		},
		data(){
			return{
				category_up:false,//弹窗
				open_status:1, //1.添加    2.修改
				category_index:'',//分类ID
				category_list:[],//分类列表
				dataForm:{
					category:''
				},
			}
		},
		mounted() {
			this.getList()
		},
		methods:{
			//分类列表
			getList(){
				faqCategory().then(res => {
					this.category_list = res.data
				})
			},
			//关闭弹窗
			closeCategory(){
				this.category_up = false
				this.dataForm = {}
				// this.ategory_form.gameCategoryName = ''
			},
			//打开添加、编辑
			open_category(index,item){
				console.log(item)
				this.open_status = index
				if(this.open_status == 1){
					this.category_up = true
				}else if(this.open_status == 2){
					this.category_up = true
					let {fqaCategory,fqaCategoryId} = item
					this.category_index = fqaCategoryId
					this.dataForm.category = fqaCategory
				}
			},
			// 添加类型
			add_category(open_status,category_index) {
				let that = this
				console.log(category_index)
				if(that.open_status == 1){
					//分类添加
					if(that.dataForm.category == ''){
						that.$message({
						  message: 'FAQ Category不能为空！',
						  type: 'warning'
						})
					}else{
						faqCategoryAdd(that.dataForm).then(res => {
							that.$message({
							  message: res.message,
							  type: 'success'
							})
							that.getList()
							that.category_up = false
							that.dataForm = {}
						})
					}
				}else if(that.open_status == 2){
					//分类名修改
					let params ={
						fqaCategoryId:that.category_index,
						fqaCategory:that.dataForm.category
					}
					faqCategoryUpdate(params).then(res => {
						that.$message({
						  message: res.message,
						  type: 'success'
						})
						that.getList()
						that.category_up = false
						that.dataForm = {}
					})
				}
			},
			//删除分类
			del_category(fqaCategoryId){
				let params = {
					id:fqaCategoryId
				}
				this.$confirm('是否确定删除该分类', '信息', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					faqCategoryDelete(params).then(res => {
						this.$message({
						  message: res.message,
						  type: 'success'
						})
						this.getList()
					})
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.container {
		background: #33384B;
		margin: 0 56px 0 224px;
		padding-bottom:20px;
		height: 100vh;
		.edit_category{
			position: relative;
			left: 220px;
			top: 120px;
			
			.mark_cancel{
				width: 46px;
				height: 46px;
				position: absolute;
				right: 240px;
				top: -120px;
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
			.mark_content{
				// width: 831px;
				// height: 510px;
				width: 600px;
				height: 430px;
				background: #33384B;
				border-radius: 25px;
				position: absolute;
				z-index: 999;
				.title_name{
					color: #E5A518;
					font-size: 24px;
					display: flex;
					justify-content: center;
					padding-top: 50px;
					margin-bottom: 40px;
					font-family:'Quicksand-Bold';
				}
				.content_region{
					padding-left: 100px;
					.block_region{
						margin-bottom: 40px;
						.label{
							color: #727272;
							font-size: 20px;
							margin-bottom: 10px;
							font-family:'Roboto-Regular';
						}
						input{
							// width: 427px;
							width: 80%;
							height: 59px;
							border: 1px solid #2a2e3f;
							border-radius: 19px;
							color: #fff;
							background: #2a2e3f;
							padding-left: 20px;
							font-size: 16px;
							font-family:'Roboto-Regular';
						}
						
					}
				}
				.save_btn{
					display: flex;
					align-items: center;
					justify-content: center;
					margin-top:100px;
					.btn{
						cursor: pointer;
						width: 143px;
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
				display: flex;
				align-items: center;
				padding: 0 20px;
				margin-top: 30px;
				margin-left: 30px;
				.content_table{
					width: 60%;
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
						.header_col{
							// width: 33%;
							width: 50%;
							height: 60px;
							line-height: 60px;
							border-right: 1px solid #727272;
							color: #727272;
							font-size: 18px;
							&:last-child{
								border: none;
							}
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
							font-size: 18px;
							.row_col{
								// width: 33%;
								width: 50%;
								height: 60px;
								line-height: 60px;
								border-right: 1px solid #727272;
								color: #fff;
							}
							.row_col_1{
								// width: 33%;
								width: 50%;
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
				.table_col_add{
					width: 30px;
					height: 30px;
					line-height: 30px;
					text-align: center;
					background-color: #0080FF;
					color: #fff;
					border-radius: 5px;
					margin-left: 20px;
					cursor: pointer;
				}
			}
				
		}
		
	}
</style>
