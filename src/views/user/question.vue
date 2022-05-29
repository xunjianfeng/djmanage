<template>
	<div class="index">
		<PlayView :index="3"></PlayView>
		<div class="container">
			<div class="top_tabs">
				<div class="tabs_block" @click="jump_userHost(1)">Host Listing</div>
				<div class="tabs_block" @click="jump_userHost(2)">Video</div>
				<div class="tabs_block av">Question</div>
			</div>
			<div class="top_header">Question</div>
			<div class="btn">
				<!-- Create Question -->
				<div class="create_btn" @click="jump_createQuestion" v-if="option_list == '' || option_list == null || option_list == undefined">Create Question</div>
				<div class="create_btn" @click="jump_createQuestion" v-else>Edit</div>
			</div>
			<div class="content">
				<div class="question_list" v-for="(item,index) in option_list">
					<div class="content_top">
						<div class="top_block">
							<div class="label">Question</div>
							<!-- <img src="../../assets/images/delete_gray.png" class="del_icon" @click="delQuestion(index)"/> -->
						</div>
						<div class="top_input">
							<input v-model="item.order" disabled  type="number" class="order_input" />
							<!-- <input v-model="item.question" placeholder="Please enter your question"  class="question_input"/> -->
						</div>
					</div>
					<div class="content_top">
						<div class="top_block">
							<div class="label">Title</div>
						</div>
						<div class="top_input">
							<input v-model="item.question" disabled class="question_input"/>
						</div>
					</div>
					<div class="content_answers">
						<div class="answer_label">Single choice answer</div>
						<div class="answers_area">
							<div class="answers_block" v-for="(atem,andex) in item.answers">
								<input v-model="atem.answer" disabled placeholder="answer"  class="answers_input"/>
								<img src="../../assets/images/xzs.png" v-if="atem.isRight == true" class="answer_select"/>
								<img src="../../assets/images/xz.png"  v-else class="answer_select"/>
							</div>
						</div>
					</div>
								
				</div>
				<!-- <div class="question_add">
					<div class="add" @click="add_question_list">
						<img src="../../assets/images/add_fff.png" />
					</div>
					<div class="add_text">Add new question</div>
				</div> -->
				<!-- <div class="btn_area">
					<div class="confirm_btn" @click="confirm">Confirm</div>
					<div class="cancel_btn">Cancel</div>
				</div> -->
			</div>
		</div>
	</div>
</template>

<script>
	import PlayView from '@/components/play/left.vue';
	import {getQuestions} from '@/api/challenge.js'
	export default{
		name:"question",
		inject:['reload'],
		components:{
			PlayView
		},
		data(){
			return{
				option_list:[]
			}
		},
		mounted() {
			this.getQuestions()
		},
		methods:{
			//获取主持人问题
			getQuestions(){
				getQuestions().then(res => {
					this.option_list = res.data
					console.log(this.option_list)
				})
			},
			jump_userHost(index){
				let nav_index = index
				console.log(nav_index)
				this.$router.push({
					path: '/user/user_host',
					query:{nav_index}
				})
			},
			jump_createQuestion(){
				this.$router.push({path: '/user/create_question'})
			}
		},
		
	}
</script>

<style lang="less" scoped>
	.container {
		background: #33384B;
		margin: 0 56px 0 224px;
		padding: 0 20px 100px 20px;
		.top_tabs {
			position: fixed;
			display: flex;
			top: 98px;
		
			.tabs_block {
				cursor: pointer;
				font-size: 14px;
				font-family:'Roboto-Regular';
				font-weight: 400;
				color: rgba(255, 255, 255, 0.65);
				line-height: 22px;
				margin-right: 30px;
			}
			.av{
				color: #D3AA53;
			}
			.tabs_block:last-child {
				margin-right: 0;
			}
		}
		.top_header{
			padding-top: 20px;
			font-size: 24px;
			color: #fff;
			font-family:'Quicksand-Bold';
			// margin-right: 30px;
		}
		.btn{
			display: flex;
			justify-content: flex-end;
			margin-right: 15px;
			.create_btn{
				margin: 20px 0 0;
				width: 180px;
				height: 55px;
				color: #FFFFFF;
				background-color: #228be1;
				text-align: center;
				line-height: 55px;
				cursor: pointer;
				font-size: 20px;
				font-family:'Roboto-Bold';
				border-radius: 10px;
				
			}
		}
		.content{
			.question_list{
				padding: 20px 0;
				border-bottom: 2px solid #727272;
				.content_top{
					margin-top: 20px;
					.top_block{
						display: flex;
						align-items: center;
						.label{
							font-size: 20px;
							color: #fff;
							font-family:'Roboto-Regular';
						}
						.del_icon{
							width: 28px;
							height: 30px;
							margin-left: 15px;
							cursor: pointer;
						}
					}
					.top_input{
						margin-top: 20px;
						display: flex;
						align-items: center;
						.order_input{
							width: 53px;
							height: 53px;
							background: #2a2e3f;
							border-radius: 19px;
							font-size: 18px;
							border: none;
							padding-left: 20px;
							color: #fff;
							font-family:'Roboto-Regular';
							margin-right: 20px;
						}
						.question_input{
							width: 700px;
							height: 53px;
							background: #2a2e3f;
							border-radius: 19px;
							font-size: 18px;
							border: none;
							padding-left: 35px;
							color: #fff;
							font-family:'Roboto-Regular';
						}
					}
				}
				.content_answers{
					margin-left: 30px;
					margin: 30px 0 0 30px;
					.answer_label{
						font-size: 20px;
						color: #fff;
						margin-bottom: 20px;
						font-family:'Roboto-Regular';
					}
					.answers_area{
						.answers_block{
							display: flex;
							align-items: center;
							margin-bottom: 20px;
							.answers_input{
								width: 670px;
								height: 53px;
								background: #2a2e3f;
								border-radius: 19px;
								font-size: 18px;
								border: none;
								padding-left: 35px;
								color: #fff;
								font-family:'Roboto-Regular';
								margin-right: 20px;
							}
							.answer_select{
								width: 35px;
								height: 35px;
								
							}
						}
					}
				}
						
			}
			.question_add{
				display: flex;
				align-items: center;
				padding: 40px 0;
				border-bottom: 2px solid #727272;
				.add{
					width: 50px;
					height: 50px;
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: #000;
					img{
						width: 30px;
						height: 30px;
					}
				}
				.add_text{
					font-size: 20px;
					color: #fff;
					font-family:'Roboto-Bold';
					margin-left: 30px;
				}
			}
			.btn_area{
				margin-top: 80px;
				display: flex;
				align-items: center;
				// justify-content: center;
				.confirm_btn{
					width: 163px;
					height: 58px;
					background: #DBA83F;
					border-radius: 25px;
					color: #0E0F11;
					font-size: 20px;
					text-align: center;
					line-height: 58px;
					font-family:'Roboto-Regular';
					cursor: pointer;
				}
				.cancel_btn{
					width: 163px;
					height: 58px;
					border: 1px solid #777777;
					border-radius: 25px;
					color: #ffffff;
					font-size: 20px;
					text-align: center;
					line-height: 58px;
					margin-left: 30px;
					font-family:'Roboto-Regular';
					cursor: pointer;
				}
			}
		}
	}
</style>
