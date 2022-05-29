<template>
	<div class="index">
		<LeftView :index="2"></LeftView>
		<div class="container">
			<!-- edit_game 弹窗 -->
			<div class="edit_game">
				<div class="mark_cancel"  v-if="update_up == true" @click.stop="update_up = false">
					<img src="../../assets/images/close.png" />
				</div>
				<div class="mark_bac" v-if="update_up == true"></div>
				<div class="mark_content" v-if="update_up == true">
					<div class="title_name">Edit Game</div>
					<div class="content_region">
						<div class="block_region">
							<div class="label">Game Name</div>
							<input type="text" value="" v-model="game_form.gameName" />
						</div>
						<div class="block_region">
							<div class="label">Game Icon</div>
							<div class="img_area">
								<div class="img">
									<img src="../../assets/images/bac.png" />
								</div>
								<div class="text">Change Icon</div>
							</div>
						</div>
					</div>
					<div class="save_btn">
						<div class="btn">Save</div>						
					</div>
				</div>
			</div>
			<!-- edit_game 弹窗 end -->
			<!-- edit_category 弹窗 -->
			<div class="edit_category">
				<div class="mark_cancel"  v-if="category_up == true" @click.stop="category_up = false">
					<img src="../../assets/images/close.png" />
				</div>
				<div class="mark_bac" v-if="category_up == true"></div>
				<div class="mark_content" v-if="category_up == true">
					<div class="title_name">Edit Category</div>
					<div class="content_region">
						<div class="block_region">
							<div class="label">Game Name</div>
							<input type="text"  v-model="category_form.gameCategoryName"  maxlength="25" />
						</div>
					</div>
					<div class="save_btn">
						<div class="btn" @click="add_category">Save</div>						
					</div>
				</div>
			</div>
			<!-- edit_category 弹窗 end -->
			<div class="game_container">
				<div class="container_header">
					<div class="header_nav">
						<div class="nav_name ">Multiplayer Online Battle Arena(MOBA)</div>
						<div class="nav_line"></div>
					</div>
					<div v-for="(item,cdex) in category_list" :key='cdex'  :class="category_index == item.gameCategoryId ?'header_nav av':'header_nav'"  @click="switch_gory(item)">
						<div class="nav_name">{{item.gameCategoryName}}</div>
						<div class="nav_line"></div>
					</div>
					<div class="game_add" @click="open_category">
						<img src="../../assets/images/add_DBA83F.png" />
					</div>
				</div>
				<div class="game_content">
					<div class="title_block">
						<div class="block_name">{{category_name}}</div>
						<img src="../../assets/images/record.png" />
					</div>
					<div class="content_block">
						<div class="block_region" v-for="(gtem,gdex) in game_list" :key="gdex" @click.stop="upda_status(gtem)">
							<img src="../../assets/images/close.png"  class="close"/>
							<div class="content" >
								<el-image :src="HOST + gtem.gameLogo" class="colum_game">
									<div slot="error" class="image-slot">
										<img src="../../assets/images/default_game.png" class="colum_game" />
									</div>
								</el-image>
								<!-- <img :src="HOST + gtem.gameLogo" /> -->
								<div class="text">{{gtem.gameName}}</div>
							</div>
						</div>
						<div class="block_region" >
							<div class="content_add" @click="upda_status('')">
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
		gameDel
	} from '@/api/game';
	import LeftView from '@/components/match/left.vue'
	export default{
		name:"game_management",
		components:{
			LeftView
		},
		data(){
			return{
				update_up:false,
				category_up:false,
				category_list:[], //游戏类型列表
				game_list:[], //游戏列表
				category_index:1,
				category_name:'',
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
				this.category_name = gameCategoryName
				this.game_list = games
			},
			// 游戏类型列表
			categoryList() {
				categoryList({}).then(res => {
					this.category_list = res.data
					this.category_index = res.data[0].gameCategoryId
					this.category_name = res.data[0].gameCategoryName
					this.game_list = res.data[0].games
				})
			},
			// 打开游戏类型弹窗
			open_category(){
				this.category_up = ! this.category_up
			},
			// 添加游戏类型
			add_category() {
				let that = this;
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
			// 打开添加游戏
			upda_status(gtem){
				let that = this;
				let { gameId, gameName, gameLogo, gameCategory } = gtem;
				if(gtem == ''){
					
				}else{
					that.game_form = {
						gameId,
						gameName,
						gameLogo,
						gameCategory,
					}
				}
				this.update_up = ! this.update_up
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
		.mark_content{
			width: 831px;
			height:733px;
			background: #33384B;
			border-radius: 32px;
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
						font-family:'Roboto-Regular';
						margin-bottom: 10px;
					}
					input{
						width: 627px;
						height: 59px;
						border: 1px solid #2a2e3f;
						border-radius: 19px;
						color: #fff;
						font-family:'Roboto-Regular';
						background: #2a2e3f;
						padding-left: 20px;
						font-size: 16px;
						
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
							font-family:'Roboto-Regular';
							margin-left: 70px;
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
						font-family:'Roboto-Regular';
						border: 1px solid #2a2e3f;
						border-radius: 19px;
						color: #fff;
						background: #2a2e3f;
						padding-left: 20px;
						font-size: 16px;
						
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
					align-items: center;
					font-family:'Roboto-Regular';
					justify-content: center;
				}
			}
		}
	}
	.game_container{
		padding: 24px 24px;
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
				margin-top: 40px;
				.block_name{
					color: #ffffff;
					font-size: 22px;
					margin-right: 15px;
					font-family:'Quicksand-Bold';
				}
				img{
					width: 23px;
					height: 23px;
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
					display: flex;
					align-items: center;
					justify-content: center;
					position: relative;
					margin-right: 33px;
					margin-top: 45px;
					.close{
						width: 25px;
						height: 25px;
						position: absolute;
						right: 15px;
						top: 15px;
					}
					.content{
						text-align: center;
						.colum_game{
							width: 149px;
							height: 154px;
							border-radius: 72.5px 77px;
							margin-bottom: 30px;
						}
						.text{
							color: #ffffff;
							font-size: 18px;
							font-family:'Roboto-Regular';
						}
					}
					.content_add{
						img{
							width: 39px;
							height: 39px;
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
