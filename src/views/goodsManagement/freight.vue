<template>
	<div class="index">
		<SettingView :index="3"></SettingView>
		<div class="container">
			<!-- 创建账户 -->
				<div class="add_count_container">
					<el-dialog title="新建方案" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
						<el-form :model="form" label-width="90px" label-position="right">
							<p>分类名称</p>
                            <el-input v-model="form.name" placeholder=""  style="width:85%"></el-input>
                            <p>方案名称</p>
                            <el-select v-model="form.next" style="width:85%" :popper-append-to-body="false">
                                <el-option label="按重量" value="1"></el-option>
                                <el-option label="按件数" value="2"></el-option>
                                <el-option label="包邮" value="3"></el-option>
                            </el-select>
                            <p>可配送区域</p>
                            <el-button type="primary" >选择区域</el-button>
                            <p>计算明细</p>
                            <div>
                                <span>首重/件费用</span>
								<el-input v-model="form.sortz" placeholder="" style="width:20%;margin-left:10px"></el-input>
                                <span style="padding:0 10px">KG/件</span>
                                <el-input v-model="form.sortz" placeholder="" style="width:20%;"></el-input>
                                <span style="padding:0 10px">RM</span>
                            </div>    
                            <div style="margin-top:20px">
                                <span>首重/件费用</span>
								<el-input v-model="form.sortz" placeholder="" style="width:20%;margin-left:10px"></el-input>
                                <span style="padding:0 10px">KG/件</span>
                                <el-input v-model="form.sortz" placeholder="" style="width:20%;"></el-input>
                                <span style="padding:0 10px">RM</span>
                            </div>   
						</el-form>
						<div slot="footer" class="dialog-footer">
							<el-button type="primary"  @click="add_account">确认</el-button>
						</div>
					</el-dialog>
				</div>
			<!-- end -->
			<div class="top_tabs">
				<div class="tabs_block">商城管理  /</div>
				<div class="tabs_block">运费模板</div>
			</div>
			<div class="play_container">
				<div class="play_head">
					<div class="screen_title">
						<div class="screen_text">运费模板</div>
					</div>
					<!-- 筛选条件 -->
					<div class="screen_condition">
						<div class="screen_block">
							<div class="search_span">方案名称:</div>
							<div class="search_input">
								<input type="text" placeholder="请输入">
							</div>
						</div>
						<div class="screen_btn">查 询</div>
						<div class="screen_btn2">重置</div>
						<div class="screen_btn" style="float:right" @click="add_account">新建分类</div>
					</div>
				</div>
				<div class="play_content">
					<div class="play_form">
						<div class="play_table">
							<div class="table_header">
								<div class="table_head_div3">方案名称</div>
								<div class="table_head_div3">可配送范围</div>
								<div class="table_head_div3">计算方式</div>
								<div class="table_head_div2">操作</div>
							</div><!-- table_header -->
							<div class="table_body">
								<div class="body_row" v-for="(item,index) in play_list" :key="index">
									<div class="row_td_block3">{{item.name}}</div>
									<div class="row_td_block3">{{item.fw}}</div>
									<div class="row_td_block3">{{item.fs}}</div>
									<div class="row_td_block2">
										<div class="see_detail" >编辑</div>
										<div class="see_del" >删除</div>
									</div>
								</div>
							</div>
						</div>
						<!-- 分页 -->
						<div class="play_pagination">
							<el-pagination background :current-page="currentPage" layout="prev, pager, next,sizes,jumper" :total="100">
							</el-pagination>
						</div>
					</div><!-- play_form -->
				</div><!-- play_content -->
			</div><!-- play_container -->
		</div>
	</div>
</template>

<script>
	import SettingView from '@/components/goods/left.vue';
	export default {
		name: "account",
		components: {
		    SettingView
		},
		data() {
			return {
				currentPage: 2,
				play_list: [{
						id: '01',
                        name:"方案一",
						fw: "全国",
						fs:'按件',
					},{
						id: '01',
                        name:"方案一",
						fw: "全国",
						fs:'按件',
					},{
						id: '01',
                        name:"方案一",
						fw: "全国",
						fs:'按件',
					},
				],
				value2: '',
				value1:'',
				dialogFormVisible: false,
				form:{
					status:'1'
				}
			}
		},
		methods: {
			add_account(){
				this.dialogFormVisible = ! this.dialogFormVisible
			},
			jump_play(index){
				this.$router.push({ path: '/user/integral_details'})
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			}
		}
	}
</script>

<style lang="less" scoped>
	.container {
		background: #33384B;
		margin: 0 56px 0 224px;
		padding-bottom:20px;
		.add_count_container{
			/deep/.el-dialog{
				width: 460px;
				background-color: #33384B;
				border-radius: 16px;
			}
			/deep/.el-dialog__title{
				font-size: 16px;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				// color: #000000;
				color: #FFFFFF;
			}
			/deep/.el-dialog__headerbtn{
				/deep/.el-dialog__close{
					color: #FFFFFF;
				}
			}
			/deep/.el-form-item__label{
				font-size: 14px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				// color: #000000;
				color: #FFFFFF;
			}
			/deep/.el-input__inner{
				height: 40px;
				border-radius: 2px;
				// border: 1px solid #595959;
				border: 1px solid #FFFFFF;
				background-color: #33384B;
				color: #FFFFFF;
				border-radius: 10px;
			}
			/deep/ .el-select .el-input .el-input__inner{
				height: 48px;
				background-color: #33384B;
				color: #fff;
				border-radius: 10px;
				// border-radius: 10px;
			}
			/deep/.el-dialog__body{
				padding: 24px 24px;
				/deep/ .el-form--label-right{
					p{
						color: #FFFFFF;
					}
					div{
						span{
							color: #FFFFFF;
						}
					}
				}
			}
		}
		.top_tabs{
			position: fixed;
			display: flex;
			top: 98px;
			.tabs_block{
				cursor: pointer;
				font-size: 14px;
				// font-family: PingFangSC-Regular, PingFang SC;
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
		.play_container {
			.play_head {
				padding: 30px 30px 0px 30px;
				.screen_title {
					display: flex;
					align-items: center;
					margin-bottom: 24px;
					.screen_text {
						font-size: 18px;
						// font-family: PingFangSC-Medium, PingFang SC;
						font-family:'Roboto-Bold';
						font-weight: 500;
						color: #FFFFFF;
					}
				}
				.screen_condition {
					display: flex;
					.screen_left {
						display: flex;
						align-items: center;
						.search_span {
							font-size: 14px;
							// font-family: PingFangSC-Regular, PingFang SC;
							font-family:'Roboto-Regular';
							font-weight: 400;
							color: #FFFFFF;
						}
						/deep/ .el-select .el-input .el-input__inner {
							border: 0px;
							width: 151px;
							background-color: #33384B;
							border: 1px solid #ffffff;
							font-family:'Roboto-Regular';
						}
				
						/deep/ .el-select-dropdown {
							background-color: #33384B;
							border: 1px solid rgba(255,255,255,0.2);
						}
				
						//修改单个的选项的样式
						/deep/ .el-select-dropdown__item {
							background-color: transparent;
							color: #fff;
							text-align: center;
						}
						/deep/ .el-select-dropdown__item.hover{
							background-color: #545873;
						}
						/deep/ .el-select-dropdown__item.selected{
							background-color: #545873;
						}
				
					}
					.screen_block {
						display: flex;
						align-items: center;
						margin-right: 17px;
						.search_span {
							font-size: 14px;
							// font-family: PingFangSC-Regular, PingFang SC;
							font-family:'Roboto-Regular';
							font-weight: 400;
							color: #FFFFFF;
						}
						.search_input {
							width: 250px;
                            margin-left:10px;
							height: 37px;
							border-radius: 2px;
							border: 1px solid #FFFFFF;
							display: flex;
							align-items: center;
							position: relative;
							input {
								width: 90%;
								outline: none;
								height: 30px;
								border: none;
								margin: 0 12px;
								font-size: 14px;
								color: #fff;
								background-color: #33384B;
								font-family:'Roboto-Regular';
							}
						}
					}
					.screen_date{
						display: flex;
						align-items: center;
						margin-right: 39px;
						.search_span {
							font-size: 14px;
							// font-family: PingFangSC-Regular, PingFang SC;
							font-family:'Roboto-Regular';
							font-weight: 400;
							color: #FFFFFF;
						}
						/deep/.el-date-editor .el-range-separator{
							color: #fff;
						}
						/deep/ .el-input__inner{
							border: 0px;
							background-color: #33384B;
							border: 1px solid #ffffff;
						}
						/deep/ .el-range-input{
							background-color: #33384B;
						}
						/deep/ .el-date-editor .el-range-input{
							color: #fff;
							font-family:'Roboto-Regular';
						}
					}
					.screen_btn {
						width: 150px;
						height: 40px;
						font-size: 14px;
						color: #FFFFFF;
						font-weight: 400;
						line-height: 40px;
						text-align: center;
						border-radius: 2px;
						background: #228BE1;
						cursor: pointer;
						border: 1px solid #228BE1;
						// font-family: PingFangSC-Regular, PingFang SC;
						font-family:'Roboto-Regular';
						margin-right: 8px;
                        position: absolute;
                        right: 80px;
					}
					.screen_btn2 {
						width: 65px;
						height: 40px;
						font-size: 14px;
						color: #595959;
						font-weight: 400;
						line-height: 40px;
						text-align: center;
						border-radius: 2px;
						background: #FFFFFF;
						cursor: pointer;
						border: 1px solid #D9D9D9;
						margin-right: 8px;
						// font-family: PingFangSC-Regular, PingFang SC;
						font-family:'Roboto-Regular';
					}
				}
			}
			//.play_head
			.play_content {
				margin: 24px 24px 0px 24px;
				.play_form {
					.play_table {
						.table_header {
							display: flex;
							align-items: center;
							height: 54px;
							font-size: 14px;
							// font-family: PingFangSC-Medium, PingFang SC;
							font-family:'Roboto-Bold';
							font-weight: 500;
							color: #FFFFFF;
							background: #2A2E3F;
							.table_head_div {
								width: 13.6%;
								color: #FFFFFF;
								font-size: 18px;
								display: flex;
								align-items: center;
								justify-content: center;
							}
							.table_head_div2 {
								width: 13.6%;
								color: #FFFFFF;
								font-size: 18px;
								display: flex;
								align-items: center;
								justify-content: flex-start;
							}
							.table_head_div3 {
								width: 25%;
								color: #FFFFFF;
								font-size: 18px;
								display: flex;
								align-items: center;
								justify-content: center;
							}
							
						}
						//tabler_header
						.table_body {
							color: #fff;
							.body_row {
								display: flex;
								align-items: center;
								font-size: 14px;
								// font-family: PingFangSC-Regular, PingFang SC;
								font-family:'Roboto-Regular';
								font-weight: 400;
								color: #FFFFFF;
								border-bottom: 1px solid #67717A;
								.row_td_block{
									width: 13.6%;
									height: 53px;
									display: flex;
									align-items: center;
									justify-content: center;
								}
								.row_td_block2{
									width: 13.6%;
									height: 53px;
									display: flex;
									align-items: center;
									justify-content: flex-start;
									.see_text {
										color: #238AE8;
										cursor:pointer;
										margin-right: 24px;
									}
									.see_detail {
										color: #238AE8;
										cursor:pointer;
										margin-right: 24px;
									}
									.see_del {
										color: #238AE8;
										cursor:pointer;
									}
								}
								.row_td_block3{
									width: 25%;
									height: 53px;
									display: flex;
									align-items: center;
									justify-content: center;
								}
							}
						}
					}

					//play_table
					.play_pagination {
						margin:32px 0 0px 0px;
						display: flex;
						justify-content: flex-end;
					}
				}

				//play_form
			}

			//play_content
		}

		//play_container
	}
</style>
