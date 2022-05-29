<template>
	<div class="index">
		<div class="container">
			<div class="top_tabs">
				<div class="tabs_block" @click="jump_taskIndex">任务管理  /</div>
				<div class="tabs_block">新建任务</div>
			</div>
			<div class="right_container">
				<div class="block_title">
					<div class="title_name">新建任务</div>
				</div>
				<div class="right_content">
					<div class="form_area">
						<div class="title_block">
							<div class="title_label">*标题：</div>
							<input type="text" placeholder="请输入"  class="text"/>
						</div>
						<div class="task_content">
							<div class="title_label">任务内容：</div>
							<textarea rows="3" cols="20" placeholder="请输入"></textarea>
						</div>
						<div class="msg_type">
							<div class="title_label">*消息类型：</div>
							<div class="sort_select">
								<el-select v-model="value" :popper-append-to-body="false">
								  <el-option
								    v-for="item in type_list"
								    :key="item.value"
								    :label="item.label"
								    :value="item.value">
								  </el-option>
								</el-select>
							</div>
						</div><!-- msg_type -->
						<div class="play_type">
							<div class="title_label">参赛类型：</div>
							<div class="block_area">
								<div class="left_block">
									<div class="left_block_1">
										<div class="left_block_radio">
											<el-radio v-model="dataForm.reward_type" label="1">积分奖励</el-radio>
										</div>
										<div>
											<label>
												<input type="text" v-model="dataForm.reward" v-if="dataForm.reward_type == 1"/>
												<input type="text" v-else/>积分
											</label>
										</div>
									</div>
									<div class="left_block_1">
										<div class="left_block_radio">
											<el-radio v-model="dataForm.reward_type" label="2">现金奖励</el-radio>
										</div>
										<div>
											<label>
												<input type="text" v-model="dataForm.reward" v-if="dataForm.reward_type == 2"/>
												<input type="text"  v-else/>Coin
											</label>
										</div>
									</div>
									<div class="left_block_1">
										<div class="left_block_radio">
											<el-radio v-model="dataForm.reward_type" label="3">实物奖励</el-radio>
										</div>
										<div>
											<label>
												<input type="text" v-model="dataForm.reward" v-if="dataForm.reward_type == 3"/>
												<input type="text" placeholder="奖品名称" v-else/>
											</label>
										</div>
										
									</div>
								</div>
								<div class="right_block">
									<img src="../../assets/images/bac.png" />
								</div>
							</div><!-- block_area -->
						</div><!-- play_type -->
						<div class="status_area">
							<div class="title_label">参赛类型：</div>
							<div class="status_radio">
								<div>
									<el-radio v-model="status" label="1">开启</el-radio>
									<!-- <label>
										<input type="radio" name="status" value="" checked/>开启
									</label> -->
								</div>
								<div>
									<el-radio v-model="status" label="2">关闭</el-radio>
									<!-- <label>
										<input type="radio" name="status" value=""/>关闭
									</label> -->
								</div>
							</div>
							
						</div>
						<div class="btn_area">
							<div class="reset_btn">重置</div>
							<div class="save_btn">保存</div>
						</div>
					</div>
					
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"new_task",
		data(){
			return{
				radio:'1',
				status:'1',
				type_list: [{
					value: '1',
					label: '公告'
				},
				{
					value: '2',
					label: '站内信'
				}, 
				{
					value: '3',
					label: '系统通知'
				}],
				dataForm:{
					taskName:'',
					taskContent:'',
					reward:'',
					reward_type:'',
					roleId:'',
					prizeName:'',
					taskId:'',	//传则修改
					taskLogo:'',
				}
			}
			
		},
		methods:{
			jump_taskIndex(){
				this.$router.push({path:'/task/task_index'})
			}
		}
	}
</script>

<style lang="less" scoped>
.container {
	width:93%;
	margin: 0 56px;
	padding-bottom: 100px;
	.top_tabs{
		position: fixed;
		display: flex;
		top: 98px;
		.tabs_block{
			font-size: 14px;
			font-family:'Roboto-Regular';
			font-weight: 400;
			color: rgba(255, 255, 255, 0.65);
			line-height: 22px;
			margin-right: 8px;
		}
		.tabs_block:first-child{
			cursor: pointer;
		}
		.tabs_block:last-child{
			margin-right: 0;
		}
	}
	.right_container{
		height: 100vh;
		background: #33384B;
		margin-top: 10px;
		padding-top: 20px;
		padding-left: 20px;
	
		.block_title{
			.title_name{
				color: #ffffff;
				font-size: 18px;
				font-family:'Roboto-Bold';
			}
		}
		.right_content{
			width: 100%;
			.form_area{
				width: 55%;
				margin: 0 auto;
				margin-top: 40px;
				
				//标题
				.title_block{
					display: flex;
					align-items: center;
					justify-content: flex-end;
					.title_label{
						color: #fff;
						font-size: 14px;
						font-family:'Roboto-Regular';
					}
					input{
						width: 720px;
						height: 38px;
						background-color: #33384B;
						border: 1px solid #ACACAC;
						color: #fff;
						font-family:'Roboto-Regular';
						border-radius: 5px;
						padding-left: 10px;
						font-size: 14px;
					}
					input::-webkit-input-placeholder{
						color:#fff;
						font-size: 14px;
						font-family:'Roboto-Regular';
					}
				}
				//任务内容
				.task_content{
					display: flex;
					align-items: flex-start;
					justify-content: flex-end;
					margin-top: 40px;
					.title_label{
						color: #fff;
						font-size: 14px;
						font-family:'Roboto-Regular';
					}
					textarea{
						width: 720px;
						height: 181px;
						background-color: #33384B;
						border: 1px solid #ACACAC;
						color: #fff;
						border-radius: 5px;
						padding-left: 10px;
						font-size: 14px;
						font-family:'Roboto-Regular';
					}
					textarea::-webkit-input-placeholder{
						color:#fff;
						font-size: 14px;
						font-family:'Roboto-Regular';
					}
				}
				// 消息类型
				.msg_type{
					margin-top: 37px;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					.title_label{
						color: #fff;
						font-size: 14px;
						font-family:'Roboto-Regular';
					}
					.sort_select{
						// width: 720px;
						/deep/ .el-select .el-input{
							// width: 180px;
							width: 732px;
						}
						/deep/ .el-select .el-input .el-input__inner:focus{
							color:#fff;
							font-size: 14px;
						}
						/deep/ .el-select .el-input .el-input__inner{
						    border:0px;
							background-color: #33384B;
							border: 1px solid #ACACAC;
							// height: 50px;
							font-size: 14px;
							color:#fff;
						}
						/deep/ .el-select-dropdown{
						    background-color: #33384B;
							border: 1px solid rgba(255,255,255,0.2);
						}
						  //修改单个的选项的样式
						/deep/ .el-select-dropdown__item{
						    background-color: transparent;
						    color:#fff;
							text-align: center;
							font-size: 14px;
						}
						/deep/ .el-select-dropdown__item.hover{
							background-color: #545873;
						}
						/deep/ .el-select-dropdown__item.selected{
							background-color: #545873;
						}
					}
				}
				//参赛类型
				.play_type{
					// width: 30%;
					margin-top: 34px;
					display: flex;
					justify-content: flex-end;
					.title_label{
						color: #fff;
						font-size: 14px;
						font-family:'Roboto-Regular';
					}
					.block_area{
						width: 732px;
						display: flex;
						align-items: flex-start;
						justify-content: space-between;
						font-size: 14px;
						.left_block{
							width: 600px;
							display: flex;
							justify-content: space-between;
							color: #ffffff;
							font-family:'Roboto-Regular';
							div{
								input[type="text"]{
									width: 110px;
									height: 30px;
									background-color: #33384B;
									border: 1px solid #ACACAC;
									color: #fff;
									border-radius: 5px;
									padding-left: 10px;
									font-size: 14px;
									font-family:'Roboto-Regular';
								}
								input::-webkit-input-placeholder{
									color:#fff;
									font-family:'Roboto-Regular';
									font-size: 14px;
								}
							}
							.left_block_1{
								div{
									margin-bottom: 15px;
									/deep/ .el-radio__label{
										color: #fff;
										font-size: 14px;
										font-family:'Roboto-Regular';
									}
									input{
										margin-right: 5px;
									}
								}
								&:last-child{
									margin-right: 30px;
								}
								.left_block_radio{
									margin-left: 17px;
								}
								
								
							}
						}
						.right_block{
							width: 132px;
							height: 70px;
							img{
								width: 132px;
								height: 70px;
							}
						}
					}
				}
				.status_area{
					display: flex;
					align-items: center;
					justify-content: flex-end;
					color: #fff;
					margin-top: 34px;
					font-size: 14px;
					.status_radio{
						width: 732px;
						color: #fff;
						font-family:'Roboto-Regular';
						display: flex;
						align-items: center;
						div{
							margin-right: 40px;
							/deep/ .el-radio__label{
								color: #fff;
								font-family:'Roboto-Regular';
								font-size: 14px;
							}
						}
					}
				}
				.btn_area{
					display: flex;
					align-items: center;
					justify-content: center;
					margin-top: 60px;
					.reset_btn{
						width: 60px;
						height: 35px;
						background-color: #D9D9D9;
						color: #000000;
						font-family:'Roboto-Regular';
						line-height: 35px;
						text-align: center;
						margin-left: 10px;
						border-radius: 2px;
						font-size: 14px;
						cursor: pointer;
					}
					.save_btn{
						width: 60px;
						height: 35px;
						background-color: #228BE1;
						color: #ffffff;
						font-family:'Roboto-Regular';
						line-height: 35px;
						text-align: center;
						margin-left: 15px;
						border-radius: 2px;
						font-size: 14px;
						cursor: pointer;
					}
				}
						
			}
			
		}
	}
}
</style>
