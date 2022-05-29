<template>
	<div class="index">
		<div class="container">
			<div class="top_tabs">
				<div class="tabs_block">任务管理</div>
			</div>
			<div class="right_container">
				<div class="right_content">
					<div class="block_title">
						<div class="title_name">任务管理</div>
					</div>
					<div class="select_block">
						<div class="block_left">
							<div class="goods_name">
								<div class="tit_name">任务标题:</div>
								<input type="text" placeholder="请输入" />
							</div>
							<div class="sort">
								<div class="tit_name">创建人:</div>
								<div class="sort_select">
									<el-select v-model="value" :popper-append-to-body="false">
									  <el-option
									    v-for="item in options"
									    :key="item.value"
									    :label="item.label"
									    :value="item.value">
									  </el-option>
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
									<span>-</span>
									<el-date-picker
										v-model="listQuery.createTimeEnd"
										type="date"
										placeholder="结束日期"
										value-format="timestamp">
									</el-date-picker>
									<img src="../../assets/images/date.png" class="date_icon" />
								</div>
								<!-- <div class="date_select">
									<el-date-picker
									    v-model="value_time"
										type="daterange"
									    range-separator="-"
									    start-placeholder="开始日期"
									    end-placeholder="结束日期">
									</el-date-picker>
								</div> -->
							</div>
						</div><!-- block_left -->
						<div class="block_right">
							<div class="query_btn">查询</div>
							<div class="reset_btn">重置</div>
							<div class="add_btn" @click="jump_newTask">新建任务</div>
						</div>
					</div><!-- select_block -->
					<div class="goods_table">
						<div class="table_header">
							<div class="title_area">标题</div>
							<div class="content_area">内容</div>
							<!-- <div class="">创建人</div>
							<div class="send_time">发送时间</div>
							<div class="status">状态</div> -->
							<!-- <div class="operation">操作</div> -->
						</div>
						<div class="table_body">
							<div class="table_row" v-for="(item,index) in task_list" :key="index">
								<div class="title_area">{{item.taskName}}</div>
								<div class="content_area">{{item.taskContent}}</div>
								<!-- <div class=""></div>
								<div class="send_time"></div>
								<div class="status"></div> -->
								<!-- <div class="operation">
									<div>详情</div>
									<div>编辑</div>
									<div>删除</div>
								</div> -->
							</div>
						</div>
					</div><!-- goods_table -->
				</div><!-- right_content -->
			</div><!-- right_container -->
		</div>
	</div>
</template>

<script>
	import {taskList} from '@/api/task.js'
	export default{
		name:"task_index",
		data(){
			return{
				left_nav:1,
				value:'',
				value_time:'',
				options:[
					{
						value: '选项1',
						label: '黄金糕'
					}, 
				],
				task_list:[],
				listQuery:{
					createTimeStart:'',
					createTimeEnd:''
				},
				total_count:0
			}
		},
		mounted() {
			this.getList()
		},
		methods:{
			jump_goods_class(){
				this.$router.push({path:'/goodsManagement/goods_class'})
			},
			jump_newTask(){
				this.$router.push({path:'/task/new_task'})
			},
			getList(){
			taskList().then(res => {
				this.task_list = res.data.list
			})
		},
			
		},
		
	}
</script>

<style lang="less" scoped>
.container {
	width:93%;
	// background: #33384B;
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
					font-family:'Roboto-Bold';
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
							font-family:'Roboto-Regular';
							color: rgba(255, 255, 255, 0.65);
							margin-right: 10px;
							font-size: 14px;
						}
						input{
							width: 220px;
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
							font-family:'Roboto-Regular';
							color: rgba(255, 255, 255, 0.65);
							font-size: 14px;
						}
					}
					.sort{
						display: flex;
						align-items: center;
						margin-left: 10px;
						.tit_name{
							font-family:'Roboto-Regular';
							color: rgba(255, 255, 255, 0.65);
							margin-right: 10px;
							font-size: 14px;
						}
						.sort_select{
							/deep/ .el-select .el-input{
								width: 180px;
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
					.goods_status{
						display: flex;
						align-items: center;
						margin-left: 10px;
						.tit_name{
							font-family:'Roboto-Regular';
							color: rgba(255, 255, 255, 0.65);
							margin-right: 10px;
							font-size: 14px;
						}
						.date_select{
							display: flex;
							align-items: center;
							margin-left: 10px;
							font-size: 14px;
							border: 1px solid #ACACAC;
							border-radius: 2px;
							span{
								color: rgba(255, 255, 255, 0.65);
								margin-right: 15px;
							}
							/deep/ .el-date-editor{
								width: 170px;
								background-color: #33384B;
								font-size: 14px;
								background-color: #33384B;
							}
							/deep/ .el-input{
								background-color: #33384B;
							}
							/deep/ .el-input__inner{
								background-color: #33384B;
								border: none;
								color: rgba(255, 255, 255, 0.65);
							}
							/deep/ .el-input__prefix .el-input__icon{
								color: #33384B;
							}
							/deep/.el-date-editor .el-range-separator{
								color: rgba(255, 255, 255, 0.65);
							}
							.date_icon{
								width: 15px;
								height: 15px;
								margin-right: 10px;
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
						font-family:'Roboto-Bold';
						// color: rgba(255, 255, 255, 0.65);
						color: #FFFFFF;
						line-height: 35px;
						text-align: center;
						font-size: 14px;
						cursor: pointer;
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
					}
					.add_btn{
						width: 120px;
						height: 35px;
						background-color: #228BE1;
						font-family:'Roboto-Bold';
						// color: rgba(255, 255, 255, 0.65);
						color: #FFFFFF;
						line-height: 35px;
						text-align: center;
						margin-left: 15px;
						font-size: 14px;
						cursor: pointer;
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
					font-family:'Quicksand-Bold';
					color: rgba(255, 255, 255, 0.75);
					text-align: center;
					background-color: #2A2E3F;
					font-size: 14px;
					.title_area{
						width: 50%;
						height: 60px;
						line-height: 60px;
						border-right: 1px solid #4A516A;
					}
					.content_area{
						width: 50%;
						height: 60px;
						line-height: 60px;
					}
					// .operation{
					// 	width: 20%;
					// 	text-align: left;
					// }
				}
				.table_body{
					font-family:'Roboto-Regular';
					color: rgba(255, 255, 255, 0.65);
					text-align: center;
					font-size: 14px;
					.table_row{
						height: 60px;
						display: flex;
						align-items: center;
						border-bottom: 1px solid #4A516A;
						text-align: center;
						.title_area{
							width: 50%;
							height: 60px;
							line-height: 60px;
							border-right: 1px solid #4A516A;
						}
						.content_area{
							width: 50%;
							// background-color: #FFF0B7;
							height: 60px;
							line-height: 60px;
						}
						// .operation{
						// 	width: 20%;
						// 	display: flex;
						// 	align-items: center;
						// 	color: #238AE8;
						// 	div{
						// 		width: 50px;
						// 		cursor: pointer;
						// 	}
						// }
					}
				}
			}
		}
	}
}
</style>

