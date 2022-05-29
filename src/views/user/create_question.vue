<template>
	<div class="index">
		<PlayView :index="3"></PlayView>
		<div class="container">
			<div class="top_tabs">
				<div class="tabs_block" @click="jump_userHost(1)">Host Listing</div>
				<div class="tabs_block" @click="jump_userHost(2)">Video</div>
				<div class="tabs_block av" @click="jump_question">Question</div>
			</div>
			<div class="top_header">Create Question</div>
			<div class="content">
				<div class="question_list" v-for="(item,index) in dataForm">
					<div class="content_top">
						<div class="top_block">
							<div class="label">Question</div>
							<img src="../../assets/images/delete_gray.png" class="del_icon" @click="delQuestion(index)"/>
						</div>
						<div class="top_input">
							<input v-model.number="item.order" type="number" placeholder="填入号码代表序号" class="order_input" />
							<!-- <input v-model="item.question" placeholder="Please enter your question"  class="question_input"/> -->
						</div>
					</div>
					<div class="content_top">
						<div class="top_block">
							<div class="label">Title</div>
							<!-- <img src="../../assets/images/delete_gray.png" class="del_icon" @click="delQuestion(index)"/> -->
						</div>
						<div class="top_input">
							<!-- <input v-model.number="item.order" type="number" class="order_input" /> -->
							<el-input v-model="item.question" placeholder="Please enter your question" maxlength="200" show-word-limit class="question_input"/>
							<!-- <div class="limit_num">({{name_num}}/200)</div> -->
						</div>
					</div>
					<div class="content_answers">
						<div class="answer_label">Single choice answer</div><!-- Multiple -->
						<div class="answers_area">
							<div class="answers_block" v-for="(atem,index1) in item.answers">
								<el-input v-model="atem.answer" class="answers_input" placeholder="Please enter your answer" maxlength="200" show-word-limit/>
								<!-- <div class="limit_num">({{name_num}}/200)</div> -->
								<img src="../../assets/images/xz.png" v-if="atem.isRight == false" class="answer_select"  @click="selectRight(index,index1)"/>
								<img src="../../assets/images/xzs.png" v-if="atem.isRight == true" class="answer_select"  @click="selectRight(index,index1)"/>
							</div>
							<!-- <div class="answers_block">
								<input placeholder="Apply through bountee platform" class="answers_input"/>
								<img src="../../assets/images/xz.png" class="answer_select"/>
							</div>
							<div class="answers_block">
								<input placeholder="Apply through bountee platform" class="answers_input"/>
								<img src="../../assets/images/xz.png" class="answer_select"/>
							</div> -->
						</div>
					</div>
								
				</div>
				<div class="question_add">
					<div class="add" @click="add_question_list">
						<img src="../../assets/images/add_fff.png" />
					</div>
					<div class="add_text">Add new question</div>
				</div>
				<div class="btn_area">
					<div class="confirm_btn" @click="confirm">Confirm</div>
					<div class="cancel_btn" @click="jump_question">Cancel</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import PlayView from '@/components/play/left.vue';
	import {createQuestion,getQuestions} from '@/api/challenge.js'
	export default{
		name:"create_question",
		inject:['reload'],
		components:{
			PlayView
		},
		data(){
			return{
				dataForm:[
					{
						order:'',
						question:'',
						answers:[
							{
								answer:'',
								isRight:false
							},
							{
								answer:'',
								isRight:false
							},
							{
								answer:'',
								isRight:false
							}
						]
					},
				],
				option_list:[],
				name_num:0,//title的限制字数
			}
		},
		mounted() {
			this.getQuestions()
		},
		methods:{
			//获取主持人问题
			getQuestions(){
				getQuestions().then(res => {
					this.dataForm = res.data
				})
			},
			// 选择答案
			selectRight(index,index1){
				for(let b = 0; b < this.dataForm[index].answers.length;b++){
					if(this.dataForm[index].answers[index1]['answer'] == this.dataForm[index].answers[b]['answer']){
						if(this.dataForm[index].answers[b]['isRight'] == false ){
							this.dataForm[index].answers[b]['isRight'] = true
							console.log(this.dataForm[index].answers[b]['isRight'])
						}else{
							this.dataForm[index].answers[b]['isRight'] = false
							console.log(this.dataForm[index].answers[b]['isRight'])
						}
						
					}else{
						this.dataForm[index].answers[b]['isRight'] = false
					}
				}
				// console.log(index1)
				// if(this.dataForm[index].answers[index1].isRight == false){
				// 	this.dataForm[index].answers[index1].isRight == true
				// }else{
				// 	// this.dataForm[index].answers[index1].isRight = false
				// }
				// console.log(this.dataForm[index].answers[index1])
				// if(this.dataForm[index].answers[index1].isRight)
				// this.dataForm[index].answers[index1].isRight = ! this.dataForm[index].answers[index1].isRight 
				// console.log(this.dataForm[index].order)
				// console.log(typeof(this.dataForm[index].order))
				// console.log(this.dataForm[index].answers)
				
				
			},
			//设置问题
			confirm(){
				let that = this
				// console.log(this.dataForm)
				if(that.dataForm[0].order == '' || that.dataForm[0].question == '' || that.dataForm[0].answers[0].answer == '' || that.dataForm[0].answers[1].answer == '' || that.dataForm[0].answers[2].answer == ''){
					that.$message({
						type:'warning',
						message:'Please fill in every details before confirm.'
					})
				}else{
					createQuestion(this.dataForm).then(res => {
						this.$message({
							type: 'success',
							message: res.message
						});
						this.$router.push({path: '/user/question'})
						// this.reload()
					})
				}
				
			},
			//新增问题
			add_question_list(){
				this.dataForm.push({order:'',question:'',answers:[{answer:'',isRight:false},{answer:'',isRight:false},{answer:'',isRight:false}]})
			},
			//删除问题
			delQuestion(index){
				this.dataForm.splice(index,1)
				console.log(this.dataForm,"delQuestion")
			},
			jump_userHost(index){
				let nav_index = index
				// console.log(nav_index)
				this.$router.push({
					path: '/user/user_host',
					query:{nav_index}
				})
			},
			jump_question(){
				this.$router.push({path: '/user/question'})
			},
			//title的字体限制
			team_name() {
				this.name_num = this.dataForm.question.length
			},
		}
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
		.content{
			.question_list{
				padding: 40px 0;
				border-bottom: 2px solid #727272;
				.content_top{
					margin-top: 30px;
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
						// width: 55%;
						margin-top: 20px;
						// width: 750px;
						display: flex;
						align-items: center;
						// background: #2a2e3f;
						// position: relative;
						.order_input::-webkit-input-placeholder{
							color: rgba(255,255,255,0.3);
							font-size: 16px;
							font-family:'Roboto-Regular';
						}
						.order_input{
							width: 180px;
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
						
						/deep/.el-input{
							input::-webkit-input-placeholder{
								color: rgba(255,255,255,0.3);
								font-size: 16px;
								font-family:'Roboto-Regular';
							}
						}
						/deep/.el-input__inner {
							height: 51px;
							background-color: #2a2e3f;
							border: none;
							border-radius: 19px;
							color: #fff;
						}
						/deep/.el-input .el-input__count .el-input__count-inner{
							background-color: #2a2e3f;
							color: #606060;
							font-size: 18px;
						}
						.question_input{
							width: 700px;
							height: 53px;
							background: #2a2e3f;
							// background: #FFF0B7;
							border-radius: 19px;
							font-size: 18px;
							border: none;
							padding-right: 35px;
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
								// padding-left: 35px;
								padding-right: 35px;
								// color: #fff;
								color: rgba(255,255,255,0.5);
								font-family:'Roboto-Regular';
								// border-top-left-radius: 19px;
								// border-bottom-left-radius: 19px;
							}
							/deep/.el-input{
								input::-webkit-input-placeholder{
									color: rgba(255,255,255,0.3);
									font-size: 16px;
									font-family:'Roboto-Regular';
								}
							}
							/deep/.el-input__inner {
								height: 51px;
								background-color: #2a2e3f;
								border: none;
								border-radius: 19px;
								color: #fff;
							}
							/deep/.el-input .el-input__count .el-input__count-inner{
								background-color: #2a2e3f;
								color: #606060;
								font-size: 18px;
							}
							.answer_select{
								width: 35px;
								height: 35px;
								margin-left: 20px;
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
					cursor: pointer;
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
