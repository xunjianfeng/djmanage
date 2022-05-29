<template>
	<div class="index">
		<MsgView :index="2"></MsgView>
		<div class="container">
			<div class="top_tabs">
				<div class="tabs_block">消息中心  /</div>
				<div class="tabs_block">历史消息</div>
			</div>
			<div class="right_container">
				<div class="right_content">
					<div class="block_title">
						<div class="title_name">历史消息</div>
					</div>
					<div class="select_block">
						<div class="block_left">
							<div class="goods_name">
								<div class="tit_name">*标题:</div>
								<input type="text" placeholder="请输入" v-model="listQuery.messageTitle"/>
							</div>
							<div class="sort">
								<div class="tit_name">*消息类型:</div>
								<div class="sort_select">
									<el-select v-model="listQuery.messageType" :popper-append-to-body="false">
										 <!-- <el-option
										      v-for="item in options"
										      :key="item.value"
										      :label="item.label"
										      :value="item.value">
										</el-option> -->
										<el-option label="公告" value="1"></el-option>
										<el-option label="站内信" value="2"></el-option>
										<el-option label="系统通知" value="3"></el-option>
									</el-select>
								</div>
							</div>
							<div class="goods_status">
								<div class="tit_name">发送时间:</div>
								<div class="date_select">
									<el-date-picker
										v-model="listQuery.createTimeStart"
										type="date"
										placeholder="开始日期"
										value-format="timestamp">
									</el-date-picker>
									<span>至</span>
									<el-date-picker
										v-model="listQuery.createTimeEnd"
										type="date"
										placeholder="结束日期"
										value-format="timestamp">
									</el-date-picker>
								</div>
							</div>
						</div><!-- block_left -->
						<div class="block_right">
							<div class="query_btn" @click="handleFilter">查询</div>
							<div class="reset_btn" @click="reset">重置</div>
						</div>
					</div><!-- select_block -->
					<div class="goods_table">
						<div class="table_header">
							<div class="title_area">标题</div>
							<div class="content_area">内容</div>
							<div class="msg_type">消息类型</div>
							<div class="send_time">发送时间</div>
							<div class="operation">操作</div>
						</div>
						<div class="table_body">
							<div class="table_row" v-for="(item,idnex) in msg_list" :key="index">
								<div class="title_area">{{item.messageTitle}}</div>
								<div class="content_area" v-html="item.messageContent"></div>
								<div class="msg_type">{{ item.messageType==1?'公告':item.messageType==2?'站内信':'系统通知'}}</div>
								<div class="send_time">{{initDete(item.createTime)}}</div>
								<div class="operation">
									<div @click="jump_msgDetail(item.messageId)">详情</div>
									<div @click="handleDel(item.messageId)">删除</div>
								</div>
							</div>
						</div>
					</div><!-- goods_table -->
					<!-- 分页 -->
					<div class="rank_pagination">
						<pagination v-show="total_count>0" :total="total_count" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="handlePageChange" @page_change="pageChange" />
					</div>
				</div><!-- right_content -->
			</div><!-- play_container -->
		</div>
	</div>
</template>

<script>
	import MsgView from '@/components/message/left.vue'
	import {messageList,messageDel} from '@/api/message.js'
	import Listing from '@/mixin/Listing';
	import Pagination from '@/components/Pagination'; // secondary package based on el-pagination
	export default{
		mixins: [Listing],
		name: "past_times",
		components:{
		    MsgView,
			Pagination
		},
		data() {
			return {
				value:'',
				listQuery: {
					messageTitle:"",
					messageType:"",
					createTimeStart:'',
					createTimeEnd:'',
					page: 1,
					size: 10
				},
				options:[
					{
						value:'1',
						label:"公告"
					},
					{
						value:'2',
						label:"站内信"
					},
					{
						value:'3',
						label:"系统通知"
					}
				],
				msg_list:[],
				value_type:'1',
				search_list:[],
				total_count:0
			}
		},
		mounted() {
			this.reset();
			setTimeout(()=>{
				this.listQuery.page = this.PageNumber.page_number;
				this.getList()
			},180)	//当组件跳转时获取全局变量页数进行跳转
		},
		methods: {
			pageChange(value){
				this.PageNumber.page_number = value.page
			},
			handleDel(messageId) {
				const params = {
					messageId
				}
				this.$confirm('刪除数据后将无法恢复，请慎重删除！！！', '信息', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				})
				.then(() => {
					messageDel(params).then(res => {
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.reset();
					})
				})
				.catch(() => {
					
				});
			},
			jump_msgDetail(messageId){
				this.$router.push({ path: '/message/msg_detail',query:{id:messageId}})
			},
			reset(){
				this.listQuery = {
					messageTitle:"",
					messageType:"",
					createTimeStart:'',
					createTimeEnd:'',
					page: 1,
					size: 10
				}
			  this.getList()
			},
			getList(){
				messageList(this.listQuery).then(res => {
					const {list,total}=res.data
					this.msg_list = list;
					this.total_count = total;
				})
			},
			handleFilter(){
				this.listQuery.page_index = 1;
				this.getList()
			},
			
		},
		
	}
</script>

<style lang="less" scoped>
	.container {
		background: #33384B;
		margin: 0 56px 0 224px;
		padding-bottom:20px;
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
				height: 100vh;
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
				.select_block{
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 30px;
					.block_left{
						display: flex;
						align-items: center;
						.goods_name{
							display: flex;
							align-items: center;
							.tit_name{
								color: #fff;
								margin-right: 10px;
								font-size: 14px;
								font-family:'Roboto-Regular';
							}
							input{
								width: 220px;
								height: 38px;
								background-color: #33384B;
								border: 1px solid #ACACAC;
								color: #fff;
								border-radius: 5px;
								padding-left: 10px;
								font-family:'Roboto-Regular';
								font-size: 14px;
							}
							input::-webkit-input-placeholder{
								color:#fff;
								font-size: 14px;
								font-family:'Roboto-Regular';
							}
						}
						.sort{
							display: flex;
							align-items: center;
							margin-left: 10px;
							.tit_name{
								color: #fff;
								margin-right: 10px;
								font-size: 14px;
								font-family:'Roboto-Regular';
							}
							.sort_select{
								/deep/ .el-select .el-input{
									width: 180px;
								}
								/deep/ .el-select .el-input .el-input__inner:focus{
									color:#fff;
									font-family:'Roboto-Regular';
									font-size: 14px;
								}
								/deep/ .el-select .el-input .el-input__inner{
								    border:0px;
									background-color: #33384B;
									border: 1px solid #ACACAC;
									font-family:'Roboto-Regular';
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
						
						.goods_status{
							display: flex;
							align-items: center;
							margin-left: 10px;
							.tit_name{
								color: #fff;
								margin-right: 10px;
								font-size: 14px;
								font-family:'Roboto-Regular';
							}
							.date_select{
								display: flex;
								align-items: center;
								margin-left: 10px;
								font-size: 14px;
								border: 1px solid #ACACAC;
								border-radius: 2px;
								span{
									color: #fff;
									margin-right: 15px;
								}
								/deep/ .el-date-editor{
									width: 180px;
									background-color: #33384B;
									font-size: 14px;
								}
								/deep/ .el-input__inner{
									background-color: #33384B;
									border: none;
									padding: 0 50px;
									color: #fff;
								}
								/deep/.el-date-editor .el-range-separator{
									color: #fff;
								}
							}
						}
					}
					.block_right{
						display: flex;
						align-items: center;
						margin-right: 20px;
						.query_btn{
							width: 60px;
							height: 35px;
							background-color: #228BE1;
							color: #ffffff;
							line-height: 35px;
							text-align: center;
							font-size: 14px;
							cursor: pointer;
							font-family:'Roboto-Regular';
						}
						.reset_btn{
							width: 60px;
							height: 35px;
							background-color: #ffffff;
							color: #000000;
							line-height: 35px;
							text-align: center;
							margin-left: 10px;
							font-size: 14px;
							cursor: pointer;
							font-family:'Roboto-Regular';
						}
					}
				}
				.goods_table{
					margin-right: 20px;
					margin-top: 30px;
					.table_header{
						height: 60px;
						display: flex;
						align-items: center;
						color: #fff;
						text-align: center;
						background-color: #2A2E3F;
						font-size: 14px;
						font-family:'Quicksand-Bold';
						div{
							width: 20%;
						}
						.title_area{
							width: 30%;
						}
						.msg_type{
							width: 15%;
						}
						.operation{
							width: 15%;
							text-align: left;
						}
					}
					.table_body{
						font-family:'Roboto-Regular';
						color: #fff;
						text-align: center;
						font-size: 14px;
						.table_row{
							height: 60px;
							display: flex;
							align-items: center;
							font-family:'Roboto-Regular';
							border-bottom: 1px solid #4A516A;
							div{
								width: 20%;
							}
							.title_area{
								width: 30%;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}
							.content_area{
								// background-color: #FFF000;
								// width:200px;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}
							::v-deep{
								img{
									// overflow: hidden;
									width: 0;
									height: 0;
								}
							}
							.msg_type{
								width: 15%;
								// background-color: #00ffff;
							}
							.operation{
								width: 15%;
								display: flex;
								align-items: center;
								color: #238AE8;
								// background-color: #00ff00;
								div{
									width: 50px;
									cursor: pointer;
								}
							}
						}
					}
				}
				.rank_pagination {
				  margin: 32px 0 0px 0px;
				  display: flex;
				  font-family:'Roboto-Regular';
				  justify-content: flex-end;
				}
			}
		}
	}
</style>
