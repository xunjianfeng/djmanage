<template>
	<div class="index">
		<div class="container">
			<div class="league_switch">
				<div class="switch_head">
					<div class="switch_h_block" @click="jump_league"><<</div>
					<div :class="h_swith == 1 ?'switch_h_block switch_h_av':'switch_h_block' " @click="hswith(1)">Information</div>
					<div class="line">|</div>
					<div :class="h_swith == 2 ?'switch_h_block switch_h_av':'switch_h_block' " @click="hswith(2)">Predict List</div>
					<div class="line">|</div>
					<div :class="h_swith == 3 ?'switch_h_block switch_h_av':'switch_h_block' " @click="hswith(3)">Predict Team</div>
				</div>
			</div>
			<div class="container_content" v-if="h_swith == 1">
				<div class="content_top">
					<div class="top_left">
						<img class="bac_img" :src="HOST + predict_info.poster " />
						<div class="text_area">
							<div class="title_name">{{predict_info.title}} </div>
							<div class="join_num">{{predict_info.registeredPersons}} People Join</div>
						</div>
					</div>
					<div class="top_center">
						<div class="details_info">
							<div class="details_info_line">
								<div class="details_info_left">
									<div class="info_txt">Game Type</div>
									<div class="info_qvalue">{{predict_info.game.name}} </div>
								</div>
								<div class="details_info_right">
									<div class="info_txt">Registery Fee</div>
									<div class="info_qvalue">{{predict_info.registrationFee}} Coins</div>
								</div>
							</div>
							<div class="details_info_line">
								<div class="details_info_left">
									<div class="info_txt">Start Time</div>
									<div class="info_qvalue">{{predict_info.startTime}} </div>
								</div>
								<div class="details_info_right">
									<div class="info_txt">End Time</div>
									<div class="info_qvalue">{{predict_info.endTime}} </div>
								</div>
							</div>
							<div class="details_info_line">
								<div class="details_info_left">
									<div class="info_txt">Prize Amount</div>
									<div class="info_qvalue">{{predict_info.prizeAmount}} Coins</div>
								</div>
							</div>
							<div class="details_info_line">
								<div class="details_info_left">
									<div class="info_txt">Link</div>
									<div class="info_qvalue_link">{{predict_info.videoLink}}</div>
								</div>
							</div>
							<!-- <div class="carousel" v-if="select_it == false">
								<div class="label">Carousel</div>
								<div class="check_box">
									<img src="../../assets/images/xz.png" class="box_0" v-if="select_it2 == false" @click="select_it2 = true"/>
									<img src="../../assets/images/xzs.png" class="box_1" v-if="select_it2 == true" @click="select_it2 = false"/>
								</div>
							</div> -->
						</div>
					</div>
					<div class="top_right">
						<img src="../../assets/images/record.png" class="record_btn" @click="editInfo(predictId)"/>
						<img src="../../assets/images/delete_gray.png" class="del_btn" @click="delPredict(predictId)"/>
					</div>
					<div class="complete_btn" v-if="time_pk">Complete</div>
				</div>
				<!-- 置顶海报 -->
				<div class="content_carousel">
					<div class="carousel_head">
						<div class="label">Carousel</div>
						<div class="check_box">
							<img src="../../assets/images/xz.png" class="box_0" v-if="select_it == false" @click="select_it = true"/>
							<img src="../../assets/images/xzs.png" class="box_1" v-if="select_it == true" @click="select_it = false"/>
						</div>
					</div>
					<div class="carousel_content">
						<div class="content_img">
							<img v-if="predict_info.carousel != ''" :src="HOST + predict_info.carousel" />
							<el-upload v-else class="avatar-uploader" :action="HOST+'img/upload'" :show-file-list="false" :on-success="res => {return handleAvatarSuccess(res,'carousel', 0);}"
							 :before-upload="beforeAvatarUpload">
								<i   class="el-icon-plus avatar-uploader-icon" style="color: #fff;font-size: 20px;"></i>
							</el-upload>
							<!-- <img src="../../assets/images/game_img2.png" v-if="select_it == true"/>
							<img src="../../assets/images/bac_gary.png" v-if="select_it == false"/> -->
						</div>
					</div>
				</div>
				<div class="content_terms">
					<div class="terms_head">
						<div class="label">Terms and Conditions</div>
					</div>
					<div class="terms_content">
						<!-- <div class="term_title">Matchmaking Process Flow</div> -->
						<!-- <div class="term_tip">The usual model for getting groups together to play is as follows:</div> -->
						<div class="term_tip_content">
							<div class="text" v-html="predict_info.termsAndCondition"></div>
						</div>
					</div>
				</div>
			</div>
			<div class="container_content_2" v-if="h_swith == 2">
				<div class="list_table">
					<div class="header">
						<div class="label_left">
							<div class="label">Predict User</div>
							<div class="join_num">{{predict_info.registeredPersons}}Person</div>
						</div>
						<div class="label_right" v-if="predict_info.completed == true">Price</div>
					</div>
					<div class="list_body">
						<div  v-for="(ltem,ldex) in predict_list" :key="ldex" :class="ltem.winCoin != null ?'list_row_av':'list_row' ">
							<div class="row_col_4" v-if="ltem.winCoin != null">Winner</div>
							<div class="row_col_1">
								<el-image :src="HOST + ltem.userInfo.avatar" class="avatar_img">
									<div slot="error" class="image-slot">
										<img src="../../assets/images/default.png" class="avatar_img" />
									</div>
								</el-image>
								<!-- <img :src="HOST + ltem.userInfo.avatar" class="avatar_img"/> -->
								<div class="col_right">
									<div class="join_name">{{ltem.userInfo.fullName}}</div>
									<div class="join_time">{{ltem.createTime}}</div>
								</div>
							</div>
							<div class="row_col_2">{{ltem.fee}} Coins</div>
							<div class="row_col_3" >
								<div style="display: flex;">
									<div class="col_scroll" v-for="(teaem,tidex) in ltem.predictTeams" :key="tidex">
										<div v-if="tidex+1 === 1" class="rank_1">1st</div>
										<div v-if="tidex+1 === 2" class="rank_2">2nd</div>
										<div v-if="tidex+1 === 3" class="rank_3">3rd</div>
										<div v-if="tidex+1 > 3" class="rank_4">{{tidex+1}}th</div>
										<div class="city_name">{{teaem.teamName}}</div>
									</div>
								</div>
							</div>
							<div class="row_col_4" v-if="ltem.winCoin != null">{{ltem.winCoin}} Coins</div>
						</div>
					</div>
				</div>
			</div>
			<div class="container_content_3" v-if="h_swith == 3">
				<div class="teams_list_area">
					<div class="teams_list" v-for="(item,index) in predict_team" :key="index">
						<div class="block_1">
							<div class="team_logo">
								<img :src="HOST + item.teamLogo" />
							</div>
							<div class="team_info">
								<div class="team_name">{{item.teamName}}</div>
								<!-- <div class="game_type">{{item.team.gameName}}</div> -->
							</div>
						</div>
						<div class="block_2">
							<div class="team_intro">
								{{item.teamDescription}}
							</div>
						</div>
						<!-- <div class="block_3">
							<img src="../../assets/images/record.png" class="record_btn"/>
							<img src="../../assets/images/delete_gray.png" class="del_btn"/>
						</div> -->
						<div class="block_4">
							<div class="label">{{item.choosePersons}} people choose</div>
						</div>
					</div>
				</div>	
			</div>
		</div>
	</div>
</template>

<script>
	import {
		predictTeams,
		predictRegistrations,
		predictCarousel,delPredict,predictListPage
	} from '@/api/league'
	export default {
		name: "predict_info",
		data() {
			return {
				h_swith:1,
				select_it:false,
				select_it2:true,
				predict_info:'',
				predict_list:'',
				predict_team:'',
				now_time:'',
				time_pk:false, //false 未结束  true 结束
				predictId:'',
				listQuery: {
					order: 'NEW_TO_OLD',   // NEW_TO_OLD表示从新到旧，OLD_TO_NEW表示从旧到新
					keyword: '', // 搜索关键字
					top: '',   // 是否置顶，true表示置顶，false表示不置顶
					page: 1,
					size:0
				},
			}
		},
		mounted() {
			// this.predict_info = JSON.parse(this.$route.query.news)
			// console.log(this.predict_info)
			// this.predictId = this.predict_info.id
			this.predictId = this.$route.query.id
			console.log(this.predictId,"predictId")
			// if(this.predict_info.id != '' &&  this.predict_info.id != undefined){}
			var d = new Date();
			var year = d.getFullYear();
			var month = d.getMonth();
			month = month + 1 > 12 ? 1 : month + 1;
			month =  month > 9 ? month : "0" +month.toString();
			var day = d.getDate();
			var hour = d.getHours();
			hour = hour > 9 ? hour : "0" + hour.toString();
			var minute = d.getMinutes();
			minute = minute > 9 ? minute : "0" + minute.toString();
			var second = d.getSeconds();
			this.now_time = year+'-'+month+'-'+day+' '+ hour+':'+minute+':'+second;
			// 判断 现在时间是否大于结束时间 是的话显示Complete 按钮
			if(this.initDetes(this.now_time) > this.initDetes(this.predict_info.endTime)){
				this.time_pk = true
			}
			this.getInfo()
		},
		methods: {
			//竞猜内容
			getInfo() {
				let that = this;
				predictListPage(that.listQuery).then(res => {
					for(let a = 0; a < res.data.list.length;a++){
						if(res.data.list[a].id == that.predictId){
							that.predict_info = res.data.list[a]
							console.log(that.predict_info,"predict_info")
						}
					}
				})
			},
			// 添加置顶海报
			getCarousel(carousel) {
				let that = this;
				let params = {
					predictId:that.predictId,
					carousel
				}
				predictCarousel(params).then(res => {
					console.log(res.data)
					that.$message({
						type: 'success',
						message: res.message
					});
				})
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
					if (attr === 'carousel') {
						that.predict_info.carousel = res.data
						that.getCarousel(res.data)
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
			// 获取竞猜参与者列表
			getRegistrations() {
				let that = this;
				let params = {
					predictId:that.predict_info.id
				}
				predictRegistrations(params).then(res => {
					that.predict_list = res.data
					console.log(that.predict_list,"predict_list")
				})
			},
			// 获取竞猜战队列表
			getTeams() {
				let that = this;
				let params = {
					predictId:that.predict_info.id
				}
				predictTeams(params).then(res => {
					that.predict_team = res.data
					console.log(that.predict_team,"predict_team")
				})
			},
			// 切换
			hswith(index){
				this.h_swith = index
				if(index == 2){
					this.getRegistrations();
				}else if(index == 3){
					this.getTeams();
				}
			},
			jump_league(){
				this.$router.push({ path: '/league/predict_and_win'})
			},
			//跳转修改竞猜
			editInfo(predictId){
				console.log("修改")
				// console.log(predictId)
				this.$router.push({ path: '/league/create_predict',query:{predictId}})
			},
			//删除竞猜
			delPredict(predictId){
				console.log("删除")
				console.log(predictId)
				let params = {
					predictId:predictId
				}
				this.$confirm('是否删除该竞猜?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					delPredict(params).then(res => {
						this.$message({
							type:'success',
							message:"删除成功！"
						})
						this.$router.push({path:'/league/predict_and_win'})
					})
				})
			}
		}
	}
</script>
<style lang="less" scoped>
	.container {
		// width: calc(100% - 191px);
		// margin-left: 72px;
		width:93%;
		background: #33384B;
		margin: 0 56px;
		// padding-bottom: 100px;
		padding: 30px 20px 100px;
		.league_head{
			display: flex;
			align-items: center;
			padding:46px 0 32px 0 ;
			border-bottom: 1px solid #2D2D2D;
			.league_head_text{
				color: #FFFFFF;
				font-size: 24px;
				font-weight: bold;
			}
			.league_head_spot{
				width: 8px;
				height: 8px;
				background-color: #FFFFFF;
				border-radius: 50%;
				margin: 0 20px;
			}
		}
		.league_switch{
			.switch_head{
				display: flex;
				align-items: center;
				margin: 0px 0 52px;
				.switch_h_block{
					font-size: 20px;
					color: #FFFFFF;
					cursor: pointer;
					margin-right: 50px;
					font-family:'Roboto-Regular';
				}
				.switch_h_block:last-child{
					margin-right: 0;
				}
				.switch_h_av{
					color: #DBA83F;
					position: relative;
					font-size: 20px;
					font-family:'Roboto-Bold';
				}
				.switch_h_av:before{
				    content: '';
				    position: absolute;
					left: 0px;
				    bottom: 0px;
				    right: 0px;
				    // border-top: 3px solid  #DBA83F;
				}
				.line{
					color: #FFFFFF;
					margin-right: 50px;
				}
			}
		}
		.container_content{
			.content_top{
				background-color: #2a2e3f;
				display: flex;
				align-items: center;
				padding: 20px 20px 70px 20px;
				border-radius: 16px;
				position: relative;
				// align-items: center;
				.top_left{
					width: 30%;
					// background-color: #ff0000;
					.bac_img{
						width: 407px;
						height: 195px;
					}
					.text_area{
						// margin-top: 20px;
						margin: 20px 0 0 20px;
						.title_name{
							color: #FFFFFF;
							font-size: 22px;
							font-family:'Roboto-Medium';
						}
						.join_num{
							color: #727272;
							font-size: 17px;
							margin-top: 10px;
							font-family:'Roboto-Regular';
						}
					}
				}
				.top_center{
					width: 50%;
					margin-top: 60px;
					margin-left: 30px;
					// background-color: #00ff00;
					position: relative;
					.details_info{
						width: 100%;
						font-family:'Roboto-Regular';
						// margin: 24px 0 0 0 ;
						// background-color: #FFF000;
						.details_info_line{
							display: flex;
							justify-content: space-between;
							margin-bottom: 30px;
							.details_info_left{
								width: 50%;
								display: flex;
								align-items: center;
								.info_txt{
									// width: 37%;
									// color: #FFFFFF;
									color: #919191;
									font-size: 18px;
									font-weight: bold;
									margin-right: 30px;
								}
								.info_qvalue{
									color: #CECECE;
									font-size: 18px;
									font-weight: 500;
								}
								.info_qvalue_link{
									color: #D3AA53;
									font-size: 18px;
									font-weight: 500;
								}
							}
							.details_info_right{
								width: 50%;
								display: flex;
								align-items: center;
								.info_txt{
									// width: 44%;
									// color: #FFFFFF;
									color: #919191;
									font-size: 18px;
									font-weight: bold;
									margin-right: 30px;
								}
								.info_qvalue{
									color: #CECECE;
									font-size: 18px;
									font-weight: 500;
								}
							}
						}
						.carousel{
							display: flex;
							align-items: center;
							position: absolute;
							left: -55px;
							top: -60px;
							.label{
								color: #919191;
								font-size: 16px;
								margin-right: 20px;
							}
							.check_box{
								display: flex;
								align-items: center;
								.box_0{
									width: 26px;
									height: 26px;
									border: 2px solid #727272;
								}
								.box_1{
									width: 26px;
									height: 26px;
									border: 2px solid #727272;
								}
							}
						}
					}
										
				}
				.top_right{
					position: absolute;
					top: 20px;
					right: 40px;
					display: flex;
					align-items: center;
					font-family:'Roboto-Regular';
					.record_btn{
						width: 23px;
						height: 23px;
						margin-right: 30px;
						cursor: pointer;
					}
					.del_btn{
						width: 28px;
						height: 30px;
						cursor: pointer;
					}
				}
				.complete_btn{
					width: 163px;
					height: 58px;
					// color: #E5A518;
					line-height: 58px;
					background-color: #E5A518;
					text-align: center;
					font-size: 20px;
					border-radius: 8px;
					position: absolute;
					bottom: 30px;
					right: 40px;
					cursor: pointer;
				}
			}
			.content_carousel{
				margin-top: 40px;
				.carousel_head{
					display: flex;
					align-items: center;
					.label{
						color: #FFFFFF;
						font-size: 22px;
						margin-right: 25px;
						font-family:'Quicksand-Bold';
					}
					.check_box{
						display: flex;
						align-items: center;
						// width: 40px;
						// height: 40px;
						// background-color: #fff000;
						.box_0{
							width: 30px;
							height: 30px;
						}
						.box_1{
							// width: 26px;
							// height: 26px;
							width: 30px;
							height: 30px;
						}
					}
				}
				.carousel_content{
					// width: 100%;
					padding: 20px 0 30px 50px;
					background-color: #2a2e3f;
					border-radius: 16px;
					margin-top: 20px;
					.content_img{
						// width: 40%;
						img{
							width: 893px;
							height: 194px;
							object-fit: fill;//高度显示齐全但是图片被压缩
						}
					}
				}
			}
			.content_terms{
				margin-top: 40px;
				.terms_head{
					display: flex;
					align-items: center;
					.label{
						color: #FFFFFF;
						font-size: 22px;
						margin-right: 25px;
						font-family:'Quicksand-Bold';
					}
				}
				.terms_content{
					// width: 100%;
					padding: 40px 0 30px 50px;
					background-color: #2a2e3f;
					border-radius: 16px;
					margin-top: 20px;
					.term_title{
						color: #DBA83F;
						font-size: 24px;
						font-family:'Quicksand-Bold';
					}
					.term_tip{
						color: #727272;
						font-size: 20px;
						margin: 20px 0;
						font-weight: bold;
						font-family:'Roboto-Bold';
					}
					.term_tip_content{
						width: 80%;
						color: #727272;
						font-size: 20px;
						margin-left: 15px;
						font-family:'Roboto-Regular';
						.text{
							margin-bottom: 20px;
						}
						::v-deep{
							img{
								max-width: 100%;
								auto: 100%;
							}
						}
					}
				}
			}
		}
		.container_content_2{
			.list_table{
				.header{
					background-color: #2a2e3f;
					padding: 20px 0 20px 40px;
					display: flex;
					align-items: center;
					justify-content: space-between;
					.label_left{
						display: flex;
						align-items: center;
						font-family:'Roboto-Regular';
						.label{
							color: #727272;
							font-size: 17px;
							margin-right: 30px;
						}
						.join_num{
							color: #FFFFFF;
							font-size: 18px;
						}
					}
					
					.label_right{
						width: 10%;
						color: #dba83f;
						font-weight: bold;
						font-family:'Roboto-Regular';
						font-size: 18px;
					}
				}
				.list_body{
					.list_row{
						padding: 20px 20px 20px 40px;
						display: flex;
						align-items: center;
						border-bottom: 1px solid #727272;
						color: #FFFFFF;
						font-size: 18px;
						font-family:'Roboto-Regular';
						.row_col_1{
							width: 25%;
							display: flex;
							align-items: center;
							.avatar_img{
								width: 36px;
								height: 36px;
								border-radius: 8px;
								object-fit: cover;
								margin-right: 10px;
							}
							.col_right{
								.join_name{
									color: #FFFFFF;
									font-size: 18px;
									text-decoration: underline;
									margin-bottom: 5px;
								}
								.join_time{
									color: #727272;
									font-size: 16px;
								}
							}
						}
						.row_col_2{
							width: 15%;
						}
						.row_col_3{
							width: 60%;
							display: flex;
							overflow-x: scroll;
							// overflow-x: hidden;
							.col_scroll{
								width: 100px;
								margin-right: 20px;
								.rank_1{
									color: #D3AA53;
								}
								.rank_2{
									color: #8C8C8C;
								}
								.rank_3{
									color: #A8684C;
								}
								.rank_4{
									color: rgba(255,255,255,0.9);
								}
							}
							&::-webkit-scrollbar {
								/*滚动条整体样式*/
								width : 13px;  /*高宽分别对应横竖滚动条的尺寸*/
								height: 10px;
								// background   : #FFF000;
							}
							&::-webkit-scrollbar-thumb {
								/*滚动条里面小方块*/
								border-radius: 10px;
								box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
								background   : #2A2D41;
							}
							&::-webkit-scrollbar-track {
							/*滚动条里面轨道*/
								box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
								border-radius: 10px;
								background   : #595959;
							}
						}
						
					}
					.list_row_av{
						padding: 20px 20px 20px 40px;
						display: flex;
						align-items: center;
						border-bottom: 1px solid #727272;
						color: #FFFFFF;
						font-size: 18px;
						font-family:'Roboto-Regular';
						.row_col_1{
							width: 20%;
							display: flex;
							align-items: center;
							.avatar_img{
								width: 36px;
								height: 36px;
								border-radius: 8px;
								object-fit: cover;
								margin-right: 10px;
							}
							.col_right{
								.join_name{
									color: #FFFFFF;
									font-size: 18px;
									text-decoration: underline;
									margin-bottom: 5px;
								}
								.join_time{
									color: #727272;
									font-size: 16px;
								}
							}
						}
						.row_col_2{
							width: 10%;
						}
						.row_col_3{
							width: 50%;
							display: flex;
							overflow-x: scroll;
							.col_scroll{
								width: 100px;
								margin-right: 20px;
								.rank_1{
									color: #D3AA53;
								}
								.rank_2{
									color: #8C8C8C;
								}
								.rank_3{
									color: #A8684C;
								}
							}
						}
						.row_col_4{
							width: 10%;
						}
					}
				}
			}
		}
		.container_content_3{
			// width: calc(100% - 36px);
			// background: #03060D;
			// background: #000000;
			background-color: #2a2e3f;
			// margin-bottom: 60px;
			border-radius: 17px;
			// padding: 42px 0 35px 0px;
			margin-left: 30px;
			.teams_list_area{
				.teams_list{
					width: 95%;
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-bottom: 2px solid #2D2D2D;
					border-bottom: 2px solid #727272;
					// padding: 30px 40px;
					padding: 30px 0px;
					margin-left: 30px;
					// text-align: center;
					// background-color: #FF0000;
					&:last-child{
						border: none;
					}
					.block_1{
						width: 25%;
						display: flex;
						align-items: center;
						.team_logo{
							img{
								width: 93px;
								height: 93px;
								border-radius: 46px;
								object-fit: cover;
							}
						}
						.team_info{
							margin: 0 30px;
							text-align: left;
							.team_name{
								color: #FFFFFF;
								font-size: 22px;
								font-weight: bold;
								font-family:'Roboto-Bold';
							}
							.game_type{
								color: #727272;
								font-size: 18px;
								margin-top: 10px;
								font-family:'Roboto-Regular';
							}
						}
					}
					.block_2{
						width: 35%;
						.team_intro{
							width: 85%;
							text-align: left;
							// background-color: #FFF000;
							color: #727272;
							font-size: 18px;
							font-family:'Roboto-Regular';
						}
					}
					.block_3{
						width: 25%;
						display: flex;
						align-items: center;
						justify-content: center;
						margin-right: 30px;
						.record_btn{
							width: 23px;
							height: 23px;
							margin-right: 35px;
							cursor: pointer;
						}
						.del_btn{
							width: 28px;
							height: 30px;
							cursor: pointer;
						}
					}
					.block_4{
						width: 15%;
						.label{
							color: #727272;
							font-size: 18px;
							font-family:'Roboto-Regular';
						}
					}
				}
			}
		
		
		}
	}
</style>
