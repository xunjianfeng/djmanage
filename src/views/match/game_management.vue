<template>
	<div class="index">
		<LeftView :index="2"></LeftView>
		<div class="container">
			<!-- 添加游戏 弹窗 -->
			<div class="edit_game">
				<div class="mark_cancel"  v-if="update_up == true" @click.stop="open_update">
					<img src="../../assets/images/close.png" />
				</div>
				<div class="mark_bac" v-if="update_up == true"></div>
				<div class="mark_content" v-if="update_up == true">
					<div class="title_name" v-if="game_status == 1">Add Game</div>
					<div class="title_name" v-if="game_status == 2">Edit Game</div>
					<div class="content_region">
						<div class="block_region">
							<div class="label">Game Name</div>
							<input type="text" v-if="game_status == 1" v-model="game_form.gameName" placeholder="Pleease key in game name"/>
							<input type="text" v-if="game_status == 2" v-model="game_form.gameName" />
						</div>
						<div class="block_region">
							<div class="label">Game Icon</div>
							<div class="img_area">
								<div class="img">
									<img :src=" HOST + game_form.gameLogo " v-if="game_status == 1&&game_form.gameLogo!=''"/>
									<!-- <img :src=" HOST +  game_form.gameLogo " v-if="game_status == 2" /> -->
									<el-image :src="HOST + game_form.gameLogo" class="game_img"  v-if="game_status == 2">
										<div slot="error" class="image-slot">
											<img src="../../assets/images/default_game.png" class="game_img" />
										</div>
									</el-image>
								</div>
								<div class="text">
									<el-upload
										class="avatar-uploader"
										:action="HOST+'img/upload'"
										:show-file-list="false"
										:on-success="res => {return handleAvatarSuccess(res,'game_logo', 0);}"
										:before-upload="beforeAvatarUpload">
										<div v-if="game_status == 1">Upload Icon</div>
										<div v-if="game_status == 2">Change Icon</div>
										<!-- <img  class="active1_img" v-for="(item,index) in commodityPicture" :key="index" :src="HOST + item">
										<i class="el-icon-plus avatar-uploader-icon" style="margin-left:10px;"></i> -->
									</el-upload>
								</div>
							</div>
						</div>
					</div>
					<div class="save_btn">
						<div class="btn" @click="add_game">Save</div>						
					</div>
				</div>
			</div>
			<!-- end -->
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
							<div class="label">Game Name</div>
							<input type="text" v-if="open_status == 1" v-model="category_form.gameCategoryName" placeholder="Please key in game name"  maxlength="25" />
							<input type="text" v-if="open_status == 2" v-model="category_name"  maxlength="25" />
						</div>
					</div>
					<div class="save_btn">
						<div class="btn" @click="add_category(open_status,category_index)">Save</div>
						<!-- <div class="btn" @click="add_category(2)">Save</div> -->
					</div>
				</div>
			</div>
			<!-- end -->
			<div class="game_container">
				<div class="game_management">
					<div>Game Management</div>
				</div>
				<div class="container_header">
					<div v-for="(item,cdex) in category_list" :key='cdex'  :class="category_index == item.gameCategoryId ?'header_nav av':'header_nav'"  @click="switch_gory(item)">
						<div class="nav_name">{{item.gameCategoryName}}</div>
						<div class="nav_line"></div>
					</div>
					<div class="game_add" @click="open_category(1,item)">
						<img src="../../assets/images/add_DBA83F.png" />
					</div>
				</div>
				<div class="game_content">
					
					<div class="title_block">
						<div class="title_block_left">
							<div class="block_name">{{category_name}}</div>
							<img src="../../assets/images/record.png" @click="open_category(2,item)"/>
						</div>
						<div class="title_block_right" @click="deleteCategory(category_index)">
							<img src="../../assets/images/delete_gray.png" />
						</div>
						
					</div>
					<div class="content_block">
						<div class="block_region" v-for="(gtem,gdex) in game_list" :key="gdex" >
							<div class="close_div">
								<img @click="del_game(gtem.gameId)" src="../../assets/images/close.png"  class="close"/>
							</div>
							
							<div class="content"  @click="upda_status(2,gtem)">
								<el-image :src="HOST + gtem.gameLogo" class="game_img">
									<div slot="error" class="image-slot">
										<img src="../../assets/images/default_game.png" class="game_img" />
									</div>
								</el-image>
								<!-- <img :src="HOST + gtem.gameLogo" v-if="gtem.gameLogo"/> -->
								<!-- <img src="../../assets/images/default_game.png" v-else /> -->
								<div class="text">{{gtem.gameName}}</div>
							</div>
						</div>
						<div class="block_region" >
							<div class="content_add" @click="upda_status(1,'')">
								<img src="../../assets/images/add_fff.png" />
							</div>
						</div>
					</div>
				</div>
			</div>
		
		</div>
	</div>
</template>

<script>
	import {
		categoryList,
		categoryAdd,
		gamdAdd,
		gamdList,
		gameDel,editCategory,delCategory
	} from '@/api/game';
	import LeftView from '@/components/match/left.vue'
	export default{
		name:"game_management",
		inject:['reload'],
		components:{
			LeftView
		},
		data(){
			return{
				update_up:false,
				category_up:false,
				category_list:[], //游戏类型列表
				game_list:[], //游戏列表
				category_index:'',
				switch_index:'', //当前类型，添加后切换回当前类型
				category_name:'',
				open_status:1, //游戏分类 1.添加 2.编辑
				game_status:1,//游戏 1.添加 2.编辑
				category_status:1,//调用游戏分类功能接口  1.添加  2.编辑
				category_form:{
					gameCategoryName:'',
				},
				game_form:{
					gameId:'',
					gameName:'',
					gameLogo:'',
					gameCategory:'',
				}
			}
		},
		mounted() {
			this.categoryList();
			// this.gamdList();
		},
		methods:{
			// 类型切换
			switch_gory(item){
				let {gameCategoryId,gameCategoryName, games } = item
				this.category_index = gameCategoryId
				this.switch_index = item
				this.category_name = gameCategoryName
				this.game_list = games
			},
			// 游戏类型列表
			categoryList() {
				categoryList({}).then(res => {
					this.category_list = res.data
					if(this.switch_index != ''){
						for (let i = 0; i < res.data.length; i++) {
							if(res.data[i].gameCategoryId == this.switch_index.gameCategoryId ) {
								this.switch_gory(res.data[i])
							}
						}
					}else{
						this.category_index = res.data[0].gameCategoryId
						this.category_name = res.data[0].gameCategoryName
						this.game_list = res.data[0].games
					}
					
				})
			},
			// 打开游戏类型弹窗
			open_category(index,item){
				this.open_status = index
				console.log(item)
				if(this.open_status == 1){
					this.category_up = true
				}else if(this.open_status == 2){
					this.category_up = true
					let {gameCategoryName} = item
					this.category_name = gameCategoryName
				}
				// this.category_up = ! this.category_up
			},
			// 添加游戏类型
			add_category(open_status,category_index) {
				let that = this;
				that.category_status = open_status
				// console.log(that.category_status)
				console.log(category_index)
				if(that.category_status == 1){
					console.log("添加")
					if(that.category_form.gameCategoryName == ''){
						that.$message({
						  message: '请输入Game Name ！！！',
						  type: 'warning'
						})
						return false
					}
					categoryAdd(that.category_form).then(res => {
						that.category_up = ! that.category_up
						that.categoryList();
					})
				}else if(that.category_status == 2){
					console.log("编辑")
					let params = {
						gameCategoryId: category_index,
						gameCategoryName:that.category_name
					}
					console.log(params)
					editCategory(params).then(res => {
						console.log(res)
						that.$message({
						  message: '修改游戏分类名称成功！',
						  type: 'success'
						})
						this.category_up = false
					})
					
					this.reload()
				}
			},
			//关闭添加游戏分类弹窗
			closeCategory(){
				this.category_up = false
				this.ategory_form.gameCategoryName = ''
			},
			//删除游戏分类
			deleteCategory(category_index){
				this.$confirm('是否删除该游戏类型?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
				}).then(() => {
					let params = {
						id:category_index
					}
					console.log(params)
					delCategory(params).then(res => {
						this.$message({
						  message: '游戏类型删除成功！！',
						  type: 'success'
						})
					})
					this.reload()
				})
				
			},
			// 开启/关闭添加游戏
			open_update(){
				this.update_up = ! this.update_up
				if(this.update_up == false){
					this.game_form = {
						gameId:'',
						gameName:'',
						gameLogo:'',
						gameCategory:'',
					}
				}
			},
			// 游戏列表
			gamdList() {
				gamdList({}).then(res => {
					const {
						list,total
					} = res.data
					this.game_list = list;
				})
			},
		
			upda_status(index,gtem){
				let that = this;
				let { gameId, gameName, gameLogo, gameCategory } = gtem;
				that.game_status = index
				if(that.game_status == 1){
					this.update_up = true
				}else if(that.game_status == 2){
					if(gtem != ''){
						that.game_form = {
							gameId,
							gameName,
							gameLogo,
							gameCategory,
						}
					}else{					
						that.game_form.gameCategory = that.category_index
					}
					this.update_up = ! this.update_up
				}
				// if(gtem != ''){
				// 	that.game_form = {
				// 		gameId,
				// 		gameName,
				// 		gameLogo,
				// 		gameCategory,
				// 	}
				// }else{					
				// 	that.game_form.gameCategory = that.category_index
				// }
				// this.update_up = ! this.update_up
			},
			//添加游戏
			add_game() {
				console.log('添加游戏')
				
				let that = this;
				console.log(that.switch_index)
				that.game_form.gameCategory = that.category_index
				let {
					gameId,
					gameName,
					gameLogo,
					gameCategory
				} = that.game_form;
				if (gameName == '' || gameLogo == '' ) {
					that.$message({
						message: '请填写完整信息！！！',
						type: 'warning'
					})
					return false
				} else {
					console.log(that.game_form)
					console.log(that.switch_index)
					gamdAdd(that.game_form).then(res => {
						that.$message({
							message: res.message,
							type: 'success'
						})
						console.log(that.switch_index)
						that.update_up = false;
						this.game_form = {
							gameId:'',
							gameName:'',
							gameLogo:'',
							gameCategory:'',
						}	//保存后重置表单数据
						that.categoryList();
						
					})
				}
			},
			handleAvatarSuccess(res,attr,index) {
				this.$loading({
				customClass: "animated fadeOut"
				}).close();
				if(res.code == 200){
					this.$message({
						type: 'success',
						message: res.message
					});
					if(attr === 'game_logo'){
						this.game_form.gameLogo = res.data
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
			// 删除游戏
			del_game(gameId) {
				this.$confirm('是否删除该游戏?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					gameDel({
						gameId
					}).then(res => {
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.categoryList()
					})
				}).catch(() => {});
			},
			
		}
	}
</script>

<style lang="less" scoped>
.container {
	background: #33384B;
	margin: 0 56px 0 224px;
	padding-bottom:20px;
	.edit_game{
		position: relative;
		left: 165px;
		.mark_cancel{
			width: 46px;
			height: 46px;
			position: fixed;
			right: 180px;
			// top: -30px;
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
			width: 831px;
			height:733px;
			background: #33384B;
			border-radius: 32px;
			position: fixed;
			// top: 20px;
			z-index: 999;
			.title_name{
				color: #E5A518;
				font-size: 24px;
				display: flex;
				justify-content: center;
				padding-top: 70px;
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
						width: 627px;
						height: 59px;
						border: 1px solid #2a2e3f;
						border-radius: 19px;
						color: #fff;
						background: #2a2e3f;
						padding-left: 20px;
						font-size: 16px;
						font-family:'Roboto-Regular';
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
							.game_img{
								width: 149px;
								height: 154px;
								object-fit: cover;
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
				}
			}
			.save_btn{
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: 80px;
				.btn{
					cursor: pointer;
					width: 163px;
					height: 58px;
					background: #E5A518;
					border-radius: 25px;
					color: #0E0F11;
					font-family:'Roboto-Regular';
					font-size: 20px;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}
	}
	// edit_category弹窗
	.edit_category{
		position: relative;
		left: 160px;
		top: 120px;
		
		.mark_cancel{
			width: 46px;
			height: 46px;
			position: absolute;
			right: 180px;
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
			width: 831px;
			height: 510px;
			background: #33384B;
			border-radius: 25px;
			position: absolute;
			z-index: 999;
			.title_name{
				color: #E5A518;
				font-size: 24px;
				display: flex;
				justify-content: center;
				padding-top: 70px;
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
						width: 627px;
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
				margin-top: 150px;
				.btn{
					cursor: pointer;
					width: 163px;
					height: 58px;
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
	.game_container{
		padding: 24px 24px;
		.game_management{
			width: 20%;
			height: 59px;
			background: #2a2e3f;
			border-radius: 18px;
			color: #FFFFFF;
			line-height: 59px;
			text-align: center;
			margin-bottom: 30px;
			font-family:'Questrial-Regular';
			font-size: 18px;
		}
		.container_header{
			display: flex;
			align-items: center;
			padding-bottom: 30px;
			border-bottom: 1px solid #595959;
			.header_nav{
				color: #ffffff;
				font-size: 21px;
				text-align: left;
				margin-right: 62px;
				cursor: pointer;
				.nav_name{
					height: 35px;
					font-family:'Quicksand-Bold';
				}
				.nav_line{
					width: 40%;
					height: 2px;
				}
			}
			.av{
				color: #DBA83F;
				font-family:'Quicksand-Bold';
				.nav_line{
					width: 40%;
					height: 2px;
					background-color: #DBA83F;
				}
			}
			.game_add{
				width: 50px;
				height: 50px;
				background: #2a2e3f;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 2px;
				cursor: pointer;
				img{
					width: 22px;
					height: 22px;
				}
			}
		}
		.game_content{
			.title_block{
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 40px;
				margin-right: 40px;
				.title_block_left{
					display: flex;
					align-items: center;
					.block_name{
						color: #ffffff;
						font-size: 22px;
						margin-right: 15px;
						font-family:'Quicksand-Bold';
					}
					img{
						width: 23px;
						height: 23px;
						cursor: pointer;
					}
				}
				.title_block_right{
					img{
						width: 35px;
						height: 45px;
						cursor: pointer;
					}
				}
				
			}
			.content_block{
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				.block_region{
					width: 322px;
					height: 296px;
					background: #2a2e3f;
					border-radius: 22px;
					margin-right: 33px;
					margin-top: 45px;
					position: relative;
					
					.close_div{
						position: absolute;
						right: 15px;
						top: 15px;
						.close{
							width: 25px;
							height: 25px;
							cursor: pointer;
						}
					}
					.content{
						height: 100%;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						text-align: center;
						cursor: pointer;
						.game_img{
							width: 149px;
							height: 154px;
							object-fit: cover;
							border-radius: 72.5px 77px;
							margin-bottom: 20px;
						}
						.text{
							color: #ffffff;
							font-size: 18px;
							font-family:'Roboto-Regular';
						}
					}
					.content_add{
						display: flex;
						align-items: center;
						justify-content: center;
						height: 100%;
						img{
							width: 39px;
							height: 39px;
							cursor: pointer;
						}
					}
				}
				.block_region:nth-child(4n){
					margin-right: 0;
				}
			}
		}
	}
}
</style>
