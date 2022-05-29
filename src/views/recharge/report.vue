<template>
	<div class="index">
		<LeftView :index="3"></LeftView>
		<div class="container">
			<el-dialog title="" :visible.sync="dialogFormVisible" center  width="40%" :modal-append-to-body="false" @close='closeDialog'>
				 <span v-if="remark_status == 1"  style="font-size: 16px;font-weight:600;">You have changed the status to solved, do you want to have a remark on it ? Mark this abuse as completed and leave a remark?</span>
				 <div class="dialog_title" :style="remark_status == 1 ?'margin: 20px 0;':'margin: 0px 0 20px 0;'">Remark</div>
				 <el-input
				   type="textarea"
				   :rows="4"
				   resize="none"
				   placeholder="请输入内容"
				   v-model="dataForm.remark">
				 </el-input>
				  <span slot="footer" class="dialog-footer">
				    <el-button type="primary" @click="dialogFormVisible = false">No</el-button>
					<el-button v-if="remark_status == 1" @click="set_report">Yes</el-button>
				    <el-button v-else @click="set_report">Save</el-button>
				  </span>
			</el-dialog>
			<div class="withdraw_container">
				<div class="container_header">
					<div class="nav_left">
						<div class="nav_left_text">Abuse</div>
					</div>
				</div>
				<div class="content_block">
					<div class="content_table">
						<div class="table_header">
							<div class="header_1">User Name</div>
							<div class="header_1">Email</div>
							<div class="header_1">Type of Request</div>
							<div class="header_2">Description</div>
							<div class="header_1">Remark</div>
							<div class="header_1">Status</div>
							<div class="header_3"></div>
							<div class="header_1"></div>
						</div>
						<div class="table_body">
							<div class="no_data" v-if="list ==''">
								<div class="tip_text">暂无数据</div>
							</div>
							<div class="body_row" v-for="(item,index) in list" :key="index" v-if="list != ''">
								<div class="col_1">{{item.name}}</div>
								<div class="col_1">{{item.email}}</div>
								<div class="col_1">{{item.about}}</div>
								<div class="col_2">{{item.description}}</div>
								<div class="col_1">{{item.remark}}</div>
								<div class="col_1">{{item.status == 1 ?'未处理':'已处理'}}</div>
								<div class="col_3">
									<img src="../../assets/images/xz.png"  v-if="item.status == 1"  @click="open_diorg(item,1)">
									<img src="../../assets/images/xzs.png" v-else >
								</div>
								<div class="col_1">
									<div class="col_edit"  @click="open_diorg(item,2)">Edit</div>
								</div>
							</div>
						</div>
					</div>
					<!-- 分页 -->
					<div class="rank_pagination">
						<pagination v-show="total_count>0" :total="total_count" :page.sync="listQuery.page" :limit.sync="listQuery.size"
							@pagination="handlePageChange" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import LeftView from '@/components/recharge/left.vue'
	import Listing from '@/mixin/Listing';
	import Pagination from '@/components/Pagination';
	import {reportList, reportFix } from '@/api/recharge'
	export default{
		mixins: [Listing],
		filters: {
			statusFilter(status) {
				const statusMap = {
					published: 'success',
					draft: 'info',
					deleted: 'danger'
				};
				return statusMap[status];
			}
		},
		name:"report",
		components:{
			LeftView,
			Pagination
		},
		data(){
			return{
				listQuery: {
					page: 1,
					size: 10
				},
				total_count: 0,
				listInfo: {}, //备注
				dataForm: {
					reportId:'',
					remark:''
				},
				list:[],
				dialogFormVisible:false,
				remark_status:1, // 1修改状态 2修改remark
			}
		},
		methods:{
			// 关闭 dialog
			closeDialog() {
				this.dataForm = {
					reportId:'',
					remark:'',
				}; //清空数据
			},
			open_diorg(item,status){
				let that = this;
				that.remark_status = status
				that.dataForm.reportId = item.reportId
				that.dialogFormVisible = true
			},
			// 问题报告处理
			set_report() {
				let that = this;
				console.log(that.dataForm)
				if(that.dataForm.remark == ''){
					that.$message({
					  message: '请输入Remark！！！',
					  type: 'warning'
					})
					return false
				}else{
					reportFix(that.dataForm).then(res => {
						that.$message({
							type: 'success',
							message: res.message
						});
						that.dialogFormVisible = false;
						that.dataForm = {
							reportId:'',
							remark:'',
						}; //清空数据
						that.getList()
					})
				}
			},
			// 列表
			getList() {
				reportList(this.listQuery).then(res => {
					const {
						list,total
					} = res.data
					this.total_count = total
					this.list = list;
				})
			},
			// 切换优惠券列表状态
			tab_nav(index){
				this.listQuery.type = index
				this.getList()
			},
			// 筛选 排序
			eXPDate(e) {
				this.listQuery.order.create_time = e
			},
			//搜索
			handleFilter() {
				this.listQuery.page = 1;
				this.getList()
			},
		}
	}
</script>

<style lang="less" scoped>
.container {
	background: #33384B;
	margin: 0 56px 0 224px;
	padding-bottom:20px;
	/deep/ .el-dialog--center{
		background-color: #33384B;
	}
	/deep/ .el-dialog__body{
		color: rgba(255,255,255,1);
	}
	/deep/ .el-textarea textarea{
		background-color: #33384B;
		color: rgba(255,255,255,1);
	}
	.dialog_title{
		font-size: 20px;
		font-weight: bold;
	}
	.withdraw_container{
		.container_header{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 30px 20px 0;
			.nav_left{
				display: flex;
				align-items: center;
				.nav_left_text{
					color: #ffffff;
					font-size: 21px;
					font-family:'Quicksand-Bold';
				}
			}
		}
		.content_block{
			padding: 0 20px;
			.content_table{
				margin-top: 16px;
				.table_header{
					width: 100%;
					background-color: #2A2E3F;
					display: flex;
					align-items: center;
					color: #727272;
					font-size: 17px;
					height: 60px;
					border-bottom: 1px solid #2D2D2D;
					text-align: left;
					font-family:'Quicksand-Bold';
					.header_1{
						width: 13.3%;
						display: flex;
						justify-content: center;
					}
					.header_2{
						width: 15%;
						display: flex;
						justify-content: center;
					}
					.header_3{
						width: 5%;
						display: flex;
						background-color: red;
						justify-content: center;
					}
				}
				.table_body{
					.no_data{
						height: 80px;
						line-height: 80px;
						text-align: center;
						font-size: 18px;
						color: #727272;
					}
					.body_row{
						display: flex;
						align-items: center;
						color: #ffffff;
						font-size: 16px;
						padding: 25px 0;
						font-family:'Roboto-Regular';
						border-bottom: 1px solid #595959;
						.col_1{
							width: 13.3%;
							display: flex;
							justify-content: center;
							.col_edit{
								cursor: pointer;
							}
						}
						.col_2{
							width: 15%;
							display: flex;
							justify-content: center;
						}
						.col_3{
							width:5%;
							display: flex;
							justify-content: center;
							img{
								width: 25px;
								cursor: pointer;
								
							}
						}
					}
				}
			}
			.rank_pagination {
				margin: 32px 0 0px 0px;
				display: flex;
				justify-content: flex-end;
			}
		}
	}
}
</style>
