<template>
	<div class="index">
		<!-- <LeftView :index="1"></LeftView> -->
		<div class="container">
			<div class="content_right">
				<div class="header">
					<div class="header_left">Carousel</div>
					<div class="header_right" @click.stop="jump_carousel">Create New Carousel</div>
				</div>
				<div class="top_table">
					<div class="top_table_header">
						<div class="header_1"></div>
						<div class="header_2">Poster</div>
						<div class="header_3">Link</div>
						<div class="header_1"></div>
					</div>
					<div class="top_table_body">
						<div class="body_row" v-for="item in advertisement_list" :key="item.id">
							<div class="row_col_1">{{item.id}}.</div>
							<div class="row_col_2">
								<img class="poster" :src="HOST + item.imageUrl"/>
							</div>
							<div class="row_col_3">
								<div class="link_text">{{item.href}}</div>
							</div>
							<div class="row_col_1">
								<img class="del_img" src="../../assets/images/delete_gray.png" @click="delCarousel(item.id)"/>
							</div>
						</div>
					</div>
				</div>
				
				<div class="content_header_nav">
					<div v-for="item in category_list" :class="nav_index == item.gameCategoryId ? 'header_nav av' : 'header_nav'" @click="tab_nav(item.gameCategoryId)">
						{{item.gameCategoryName}}
						<div :class="nav_index == item.gameCategoryId ? 'line_under' : ''"></div>
					</div>
				</div>
				<div class="content_sub_nav">
					<div :class="sub_index == 1 ? 'header_nav av' : 'header_nav'" @click="tab_sub(1)">Preparing</div>
					<div class="line">|</div>
					<div :class="sub_index == 2 ? 'header_nav av' : 'header_nav'" @click="tab_sub(2)">History</div>
				</div>
				<div class="game_list_area">
					<div class="game_list_add" @click.stop="jump_league">
						<div class="add_img">
							<img src="../../assets/images/add_fff.png" />
						</div>
					</div>
					<div class="game_list" v-for="(item,index) in league_list" :key="index" @click="jump_teams(item.id,item)">
						<div class="list_left">
							<img class="game_poster" :src="HOST + item.poster" />
						</div>
						<div class="list_right">
							<div class="game_intro">{{item.title}}</div>
							<div class="game_info">
								<el-image :src="HOST + item.game.logo" class="game_logo">
									<div slot="error" class="image-slot">
										<img src="../../assets/images/default_game.png" class="game_logo" />
									</div>
								</el-image>
								<!-- <img class="game_logo" :src="HOST + item.game.logo" v-if="item.game.logo"/> -->
								<!-- <img class="game_logo" src="../../assets/images/default_game.png" v-else/> -->
								<div class="game_name">{{item.game.name}}</div>
							</div>
						</div>
						<div class="del_btn" @click.stop="handleSopnsDel(item.id)">
							<img src="../../assets/images/delete_gray.png" />
						</div>
					</div>
				</div>
			</div>
			
		</div>
	</div>
</template>

<script>
	import { advertisementList } from '@/api/carousel.js'
	import { categoryList } from '@/api/game.js'
	import { leagueList,leagueDelete,delLeagueCarousel,leagueCarouselList} from '@/api/league.js'
	
	export default{
		name:"league",
		inject:['reload'],
		components:{
		},
		data(){
			return{
				nav_index:1,
				sub_index:1,
				advertisement_list: [],
				category_list: [],
				league_list: [],
				game_list:[
					{
						poster:require("../../assets/images/game_img3.png"),
						intro:'KEJOHANAN MY ESPORTS PES 20 PERINGKAT NEGERI SARAWAK.',
						game_logo:require("../../assets/images/radiu5.png"),
						game_name:'PUBG'
					},
					{
						poster:require("../../assets/images/game_img4.png"),
						intro:'KEJOHANAN MY ESPORTS PES 20 PERINGKAT NEGERI SARAWAK.',
						game_logo:require("../../assets/images/radiu5.png"),
						game_name:'PUBG'
					},
					{
						poster:require("../../assets/images/game_img1.png"),
						intro:'KEJOHANAN MY ESPORTS PES 20 PERINGKAT NEGERI SARAWAK.',
						game_logo:require("../../assets/images/radiu5.png"),
						game_name:'PUBG'
					}
				],
				listQuery:{
					gameCategoryId:'',
					leagueStatus:'Processing',//联赛状态，Processing：进行中，Finished：已结束
				}
			}
		},
		mounted() {
			this.advertisementList()
			this.categoryList()
		},
		methods:{
			// 切换不同游戏分类下的联赛
			tab_nav(index){
				this.nav_index = index
				// 调用联赛列表
				this.getList()
			},
			// 游戏类型列表
			categoryList() {
				categoryList({}).then(res => {
					this.category_list = res.data
					for ( let i in this.category_list ) {
						if ( i == 0 ) {
							this.nav_index = this.category_list[i]['gameCategoryId']
						}
					}
					// 调用联赛列表
					this.getList()
				})
			},
			// 联赛列表
			getList() {
				// let params = {
				// 	gameCategoryId: this.nav_index
				// }
				this.listQuery.gameCategoryId = this.nav_index
				console.log(this.listQuery,"listQuery")
				leagueList(this.listQuery).then(res => {
					this.league_list = res.data
				})
			},
			// 删除联赛
			handleSopnsDel(leagueId){
				this.$confirm('是否删除该联赛?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					leagueDelete({leagueId}).then(res => {
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.getList()
					})
				}).catch(() => {       
				});
			},
			//切换Processing\history
			tab_sub(index){
				this.sub_index = index
				if(this.sub_index == 1){
					this.listQuery.leagueStatus = 'Processing'
					this.getList()
				}else{
					this.listQuery.leagueStatus = 'Finished'
					this.getList()
				}
			},
			jump_teams(id,item){
				let leagueItem = {}
				if(this.sub_index == 1){
					this.listQuery.leagueStatus = 'Processing'
				}else{
					this.listQuery.leagueStatus = 'Finished'
				}
				let leagueQuery = {
					leagueStatus:this.listQuery.leagueStatus,
					gameCategoryId:this.nav_index,
					size:0
				}
				sessionStorage.setItem("leagueItem", JSON.stringify(item))
				sessionStorage.setItem("leagueQuery", JSON.stringify(leagueQuery))
				 this.$router.push({ path: '/league/teams', query:{id}})
			},
			jump_league(){
				this.$router.push({ path: '/league/create_league'})
			},
			jump_carousel(){
				this.$router.push({ path: '/league/new_carousel'})
			},
			
			// 广告列表
			advertisementList() {
				let params = {}
				leagueCarouselList(params).then(res => {
					this.advertisement_list = res.data
				})
			},
			// 删除轮播海报
			delCarousel(id) {
				let params = {
					carouselId:id
				}
				console.log(params)
				this.$confirm('是否删除该海报?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					delLeagueCarousel(params).then(res => {
						// this.advertisement_list = res.data.list
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.reload()
					})
					
				})
					
			},
			
		}
	}
</script>

<style lang="less" scoped>
.container {
	// background: #33384B;
	// margin: 0 56px 0 224px;
	// padding-bottom:20px;
	width:93%;
	background: #33384B;
	margin: 0 56px;
	// padding-bottom: 100px;
	padding: 15px 20px 100px;
	.content_right{
		.header{
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 30px;
			.header_left{
				color: #E5A518;
				font-size: 21px;
				font-family:'Quicksand-Regular';
			}
			.header_right{
				color: #E5A518;
				font-size: 18px;
				font-weight: bold;
				font-family:'Roboto-Bold';
				cursor: pointer;
			}
		}
		.top_table{
			width: 100%;
			background-color: #2a2e3f;
			border-radius: 15px;
			padding-bottom: 40px;
			
			.top_table_header{
				display: flex;
				align-items: center;
				border-bottom: 2px solid #727272;
				color: #727272;
				font-size: 17px;
				padding:20px 0;
				margin: 0 30px;
				font-family:'Roboto-Regular';
				.header_1{
					width: 10%;
				}
				.header_2{
					width: 45%;
				}
				.header_3{
					width: 35%;
				}
			}
			.top_table_body{
				padding: 15px 0;
				margin: 0 30px;
				.body_row{
					display: flex;
					align-items: center;
					border-bottom: 1px solid #727272;
					padding: 10px 0;
					font-family:'Roboto-Regular';
					.row_col_1{
						width: 10%;
						color: #FFFFFF;
						font-size: 18px;
						text-align: center;
						.del_img{
							cursor: pointer;
							width: 27px;
							height: 29px;
						}
					}
					.row_col_2{
						width: 45%;
						.poster{
							width: 317px;
							height: 80px;
							object-fit: cover;
						}
					}
					.row_col_3{
						width: 35%;
						.link_text{
							color: #DBA83F;
							font-size: 18px;
						}
					}
				}
			}
		}
		.content_header_nav{
			display: flex;
			align-items: center;
			margin: 40px 0 0px;
			.header_nav{
				color: #8C8C8C;
				font-size: 20px;
				margin-right: 50px;
				font-family:'Quicksand-Regular';
				cursor: pointer;
			}
			.av{
				color: #E5A518;
			}
			.line_under{
				width: 60%;
				height: 2px;
				margin: auto;
				background-color: #E5A518;
			}
			
		}
		.content_sub_nav{
			display: flex;
			align-items: center;
			margin: 25px 0 30px;
			.header_nav{
				color: #8C8C8C;
				font-size: 20px;
				margin-right: 50px;
				font-family:'Roboto-Regular';
				cursor: pointer;
			}
			.line{
				color: #8C8C8C;
				margin-right: 50px;
			}
			.av{
				color: #E5A518;
				font-family:'Roboto-Bold';
			}
			
		}
		.game_list_area{
			width: 90%;
			// background-color: #FFF000;
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			.game_list_add{
				width: 40%;
				background-color: #2a2e3f;
				margin-right: 40px;
				border-radius: 20px;
				padding: 20px;
				margin-bottom: 20px;
				.add_img{
					height: 298px;
					display: flex;
					justify-content: center;
					align-items: center;
					cursor: pointer;
					img{
						width: 39px;
						height: 39px;
					}
				}
				
			}
			.game_list{
				width: 40%;
				display: flex;
				align-items: center;
				background-color: #2a2e3f;
				margin-right: 40px;
				border-radius: 20px;
				padding: 20px;
				margin-bottom: 20px;
				position: relative;
				cursor: pointer;
				.list_left{
					.game_poster{
						width: 201px;
						height: 298px;
						border-radius: 20px;
						object-fit: cover;
					}
				}
				.list_right{
					margin: 0 30px;
					.game_intro{
						margin-bottom: 10px;
						color: #FFFFFF;
						font-size: 18px;
						font-family:'Roboto-Bold';
					}
					.game_info{
						display: flex;
						align-items: center;
						.game_logo{
							width: 52px;
							height: 52px;
							border-radius: 26px;
							object-fit: cover;
						}
						.game_name{
							color: #FFFFFF;
							font-size: 18px;
							margin-left: 10px;
							font-family:'Roboto-Regular';
						}
					}
				}
				.del_btn{
					position: absolute;
					top: 15px;
					right: 15px;
					img{
						width: 27px;
						height: 29px;
					}
				}
			}
		}
	}
}
</style>
