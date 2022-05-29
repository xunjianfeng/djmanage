<template>
	<div class="index">
		<MsgView :index="1"></MsgView>
		<div class="container">
			<div class="top_tabs">
				<div class="tabs_block">消息中心  /</div>
				<div class="tabs_block">消息推送</div>
			</div>
			<div class="right_container">
				<div class="right_content">
					<div class="block_title">
						<div class="title_name">消息推送</div>
					</div>
					<div class="form_area">
						<div class="title_block">
							<div class="title_label">*标题：</div>
							<input type="text" placeholder="请输入"  class="text" v-model="form.messageTitle" />
						</div>
						<div class="msg_type">
							<div class="title_label">*消息类型：</div>
							<div class="sort_select">
								<el-select v-model="form.messageType" :popper-append-to-body="false">
								  <el-option
								    v-for="item in type_list"
								    :key="item.value"
								    :label="item.label"
								    :value="item.value">
								  </el-option>
								</el-select>
							</div>
						</div>
						<div class="msg_type">
							<div class="title_label">*接受客户：</div>
							<div class="sort_select">
								<el-select v-model="form.roleId" :popper-append-to-body="false">
								  <el-option
								    v-for="item in role_list"
								    :key="item.value"
								    :label="item.label"
								    :value="item.value">
								  </el-option>
								</el-select>
							</div>
						</div>
						<div class="editor_area">
							<Tinymce ref="editor" class="edit" :height="300" v-model="form.messageContent" style="width:98%; zoom: 0.9;background-color: #33384B;"  />
						</div>
						<div class="btn_area">
							<div class="reset_btn" @click="reset">重置</div>
							<div class="send_btn"  @click="send_out">发送</div>
						</div>
					</div>
					
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {addMessage} from '@/api/message.js'
	import MsgView from '@/components/message/left.vue';
	import Tinymce from '@/components/Tinymce';
	export default{ 
		name:"msg_push",
		components: {
		    MsgView,
			Tinymce
		},
		data(){
			return{
				value:'',
				form:{
					messageTitle:'',
					messageType:'',
					messageContent:'',
					roleId:''
				},
				role_list: [{
				  value: '1',
				  label: '全部'
				}, {
				  value: '2',
				  label: '已认证用户'
				}, {
				  value: '3',
				  label: '陪玩用户'
				}, {
				  value: '4',
				  label: '主持者'
				}, {
				  value: '5',
				  label: '未认证用户'
				}],
				type_list: [{
				  value: '1',
				  label: '公告'
				}, {
				  value: '2',
				  label: '站内信'
				}, {
				  value: '3',
				  label: '系统通知'
				}],
			}
		},
		mounted() {
			this.dealStyle()
		},
		methods: {
			dealStyle(){
				return this.$refs.editor.$el.style.background = '#33384B'
			},
			// 发送
			send_out() {
				let that = this;
				let { messageTitle ,messageType , messageContent,roleId } = that.form;
				if(messageTitle == '' || messageType == '' || roleId == ''){
					that.$message({
						message: '请填写发送信息！！！',
						type: 'warning'
					})
					return false
				}else{
					addMessage(that.form).then(res => {
						that.$message({
							message: res.message,
							type: 'success'
						})
						that.form = {}
						that.$refs.editor.setContent("");
					})
				}
				
			},
			// 重置
			reset(){
				this.form = {
					messageTitle:'',
					messageType:'',
					messageContent:'',
					roleId:''
				}
				this.$refs.editor.setContent("");
			},
		}
	}
</script>

<style>
	body.panel-body {
	   background-color: #33384B !important; 
	} 
</style>
<style lang="less" scoped>
	body.panel-body {background:#000; color:#fff;}
	body.mceContentBody {
	   background:#000; 
	} 
	
	.container {
		background: #33384B;
		margin: 0 56px 0 224px;
		padding-bottom:60px;
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
			.tabs_block:last-child{
				margin-right: 0;
			}
		}
		.right_container{
			.right_content{
				width: 100%;
				background: #33384B;
				margin-top: 10px;
				padding-top: 10px;
				padding-left: 20px;
				.block_title{
					.title_name{
						color: #ffffff;
						font-size: 18px;
						font-family:'Quicksand-Bold';
					}
				}
				.form_area{
					width: 53%;
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
							width: 650px;
							height: 38px;
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
					// 消息类型
					.msg_type{
						margin-top: 37px;
						display: flex;
						align-items: center;
						justify-content: flex-end;
						.title_label{
							color: #fff;
							font-size: 14px;
						}
						.sort_select{
							/deep/ .el-select .el-input{
								width: 660px;
							}
							/deep/ .el-select .el-input .el-input__inner:focus{
								color:#fff;
								font-size: 14px;
								font-family:'Roboto-Regular';
							}
							/deep/ .el-select .el-input .el-input__inner{
							    border:0px;
								background-color: #33384B;
								border: 1px solid #ACACAC;
								font-size: 14px;
								color:#fff;
								font-family:'Roboto-Regular';
							}
							/deep/ .el-select-dropdown{
							    background-color: #33384B;
								border: 1px solid rgba(255,255,255,0.2);
							}
							  //修改单个的选项的样式
							/deep/ .el-select-dropdown__item{
							    background-color: transparent;
							    color:#fff;
								font-family:'Roboto-Regular';
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
					.editor_area{
						// width: 52%;
						margin-top: 30px;
						display: flex;
						justify-content: flex-end;
						.mce-container{
							background-color: #33384B !important;
							border: 1px solid #fff;
							.mce-container-body{
								#mceu_47{
									background-color: #33384B !important;
									border: 1px solid #fff;
								}
								.mce-edit-area{
									body.mceBackBody{
										background-color: #33384B;
									}
									iframe{
										background-color: #33384B !important;
										border: 1px solid #fff;
									}
									
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
							line-height: 35px;
							text-align: center;
							margin-left: 10px;
							border-radius: 2px;
							font-size: 14px;
							cursor: pointer;
						}
						.send_btn{
							width: 60px;
							height: 35px;
							background-color: #228BE1;
							color: #ffffff;
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
<style lang="less">
	.editor_area{
		// width: 52%;
		margin-top: 30px;
		display: flex;
		justify-content: flex-end;
		// .tinymce-textarea{
		// 	background-color: #33384B;
		// 	border: 1px solid #fff;
		// }
		.mce-container{
			.mce-container-body{
				.mce_edit_area{
					iframe{
						#document{
							html{
								#tinymce{
									background-color: #33384B !important;
									border: 1px solid #fff;
									font-family:'Roboto-Regular';
								}
							}
						}
					}
				}
			}
		}
	}
</style>
