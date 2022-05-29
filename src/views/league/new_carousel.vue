<template>
	<div class="index">
		<div class="container">
			<div class="league_switch">
				<div class="switch_head">
					<div class="switch_h_block" @click="jump_league"><<</div>
					<div class="switch_h_block ">Create New Carousel</div>
				</div>
				<div class="container_content">
					<div class="item_label">Poster</div>
					<div class="img_area">
						<div v-if="dataForm.poster==''" style="border:1px solid #fff" class="poster2_img">
							<div class="img_tip">Please upload a poster</div>
							<div class="img_size">Size recommend: 1500 x 326 px</div>
						</div>
						<!-- <img v-if="dataForm.poster==''||dataForm.poster==null" src="../../assets/images/game_img2.png" class="bac_img"/> -->
						<img v-if="dataForm.poster" class="bac_img" :src="HOST + dataForm.poster" alt="">
						<!-- <el-upload
						  class="avatar-uploader"
						  :action="HOST+'img/upload'"
						  :show-file-list="false"
						  :on-success="res => {return handleAvatarSuccess(res,'poster',0);}"
						  :before-upload="beforeAvatarUpload">
						  <i>
							  <img src="../../assets/images/recycle.png" alt="" class="recycle">
						  </i>
						</el-upload> -->
						<el-upload class="avatar-uploader" :action="HOST+'img/upload'" :show-file-list="false" :on-success="res => {return handleAvatarSuccess(res,'Poster', 0);}"
						 :before-upload="beforeAvatarUpload">
							<img class="recycle" src="../../assets/images/recycle.png"  alt="">
						</el-upload>
						<!-- <img src="../../assets/images/recycle.png" class="recycle"/> -->
					</div>
					<div class="link_area">
						<div class="link_label">Link</div>
						<div class="check_box">
							<img src="../../assets/images/xz.png" class="empty" v-if="check_status == false" @click="check_status = true"/>
							<img src="../../assets/images/xzs.png" class="check_av" v-if="check_status == true" @click="check_status = false"/>
						</div>
						<input class="link_input" placeholder="URL" v-model="dataForm.href" v-if="check_status == true"/>
					</div>
					<div class="btn_area">
						<div class="save_btn" @click="addCarousel">Save</div>
						<div class="cancel_btn" @click="jump_league">Cancel</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {addLeagueCarousel} from '@/api/league.js'
	export default{
		name:'new_carousel',
		data(){
			return{
				check_status:true,
				link_value:'',
				dataForm: {
					poster: '',
					imageUrl:'',
					href:''
				},
			}
		},
		methods:{
			jump_league(){
				this.$router.push({ path: '/league/league'})
			},
			addCarousel(){
				let parmas = {
					imageUrl:this.dataForm.poster,
					href:this.dataForm.href
				}
				addLeagueCarousel(parmas).then(res => {
					this.$message({
						type: 'success',
						message: '添加成功!'
					});
					this.jump_league()
				})
			},
			//上传成功
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
					if (attr === 'Poster') {
						that.dataForm.poster = res.data
					}
				}else{
					this.$message({
						type: 'error',
						message: res.message
					});
				}
				
			},
			//上传中
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
			// beforeAvatarUpload(file) {
			// 	const isJPG = file.type;
			// 	const isLt2M = file.size / 1024 / 1024 < 2;
			// 	this.$loading({
			// 		background: "rgba(255, 255, 255, 0.7)",
			// 		customClass: "animated fadeIn",
			// 		text: "上传中"
			// 	});
			// 	return isJPG && isLt2M;
			// },
		}
	}
</script>

<style lang="less" scoped>
	.container {
		width:93%;
		background: #33384B;
		margin: 0 56px;
		padding: 30px 20px 100px;
		.switch_head{
			display: flex;
			align-items: center;
			margin: 0px 0 52px;
			font-family:'Quicksand-Regular';
			.switch_h_block{
				font-size: 20px;
				color: #FFFFFF; 
				cursor: pointer;
				margin-right: 50px;
			}
		}
		.container_content{
			padding: 10px 0 0 70px;
			.item_label{ 
				color: #909090;
				font-size: 16px;
				font-family:'Roboto-Regular';
			}
			.img_area{
				display: flex;
				align-items: center;
				margin-top: 30px;
				.poster2_img{
					// 1500 x 326
					// width: 1500px;
					// height: 326px;
					width: 757px;
					height: 165px;
					margin-right: 44px;
					object-fit: fill;
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
				.bac_img{
					width: 1500px;
					height: 326px;
					object-fit: fill;
					// object-fit: cover;
				}
				.recycle{
					width: 28px;
					height: 28px;
					margin-left: 35px;
				}
			}
			.link_area{
				display: flex;
				align-items: center;
				margin-top: 60px;
				// background-color: #FFF000;
				.link_label{
					color: #909090;
					font-size: 16px;
					font-family:'Roboto-Regular';
				}
				.check_box{
					margin: 0 30px;
					.empty{
						width: 30px;
						height: 30px;
					}
					.check_av{
						width: 30px;
						height: 30px;
					}
				}
				.link_input{
					background-color: #33384B;
					width: 850px;
					height: 30px;
					padding-left: 30px;
					border: 1px solid #727272;
					color: #FFFFFF;
				}
			}
			.btn_area{
				display: flex;
				align-items: center;
				margin-top: 160px;
				.save_btn{
					width: 163px;
					height: 58px;
					border-radius: 25px;
					background-color: #DBA83F;
					line-height: 58px;
					text-align: center;
					font-size: 20px;
					margin-right: 20px;
					font-family:'Roboto-Regular';
					cursor: pointer;
				}
				.cancel_btn{
					width: 163px;
					height: 58px;
					border: 1px solid #777777;
					border-radius: 25px;
					color: #FFFFFF;
					font-size: 20px;
					line-height: 58px;
					text-align: center;
					font-family:'Roboto-Regular';
					cursor: pointer;
				}
			}
		}
	}
</style>
