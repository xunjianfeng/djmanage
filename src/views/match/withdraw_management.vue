<template>
	<div class="index">
		<LeftView :index="4"></LeftView>
		<div class="container">
			<!-- Create New Voucher 弹窗 -->
			<div class="create_voucher">
				<div class="mark_cancel"  v-if="voucher_up == true" @click.stop="closeStatus(1)">
					<img src="../../assets/images/close.png" />
				</div>
				<div class="mark_bac" v-if="voucher_up == true"></div>
				<div class="mark_content" v-if="voucher_up == true">
					<div class="title_name">Please Choose Status</div>
					<div class="content_region">
						<div :class="tab_up_num == 1 ? 'block_1' : 'block_2'" @click="tab_up(1)">
							Complete Withdraw
							<!-- <input type="text" v-model="agree.withdrawalProfit" placeholder="Complete Withdraw"/> -->
						</div>
						
					</div>
					<div class="content_region">
						<div :class="tab_up_num == 2 ? 'block_1' : 'block_2'" @click="tab_up(2)">
							Reject Withdraw
							<!-- <input type="text" v-model="agree.refuse" placeholder="Reject Withdraw"/> -->
						</div>
					</div>
				</div>
			</div>
			<!--end -->
			<!-- Complete Withdraw -->
			<div class="create_voucher1">
				<div class="mark_cancel"  v-if="voucher_up1 == true" @click.stop="closeStatus(2)">
					<img src="../../assets/images/close.png" />
				</div>
				<div class="mark_bac" v-if="voucher_up1 == true"></div>
				<div class="mark_content" v-if="voucher_up1 == true">
					<div class="title_name">{{tournamentName}}</div>
					<div class="content_region">
						<div class="region_block">
							<div class="label">Exiting Amount</div>
							<div class="input_block">
								<input v-model="organizationProfit" disabled="disabled" class="input_text"/>
								<div class="text">Coins</div>
							</div>
						</div>
						<div class="region_block">
							<div class="label">Withdraw Amount(MYR)</div>
							<div class="input_block">
								<input v-model="agree.withdrawalProfit"  class="input_text1"/>
								<!-- <div class="text">Coins</div> -->
							</div>
							<!-- <input placeholder="100Coins" class="input_text"/> -->
						</div>
					</div>
					<div class="save_btn">
						<div class="btn" @click="pop_up(1)">Complete</div>	
						<div class="cancel_btn"  @click="pop_up(3)">Cancel</div>
					</div>
				</div>
			</div>
			<!-- Reject Withdraw -->
			<div class="create_voucher2">
				<div class="mark_cancel"  v-if="voucher_up2 == true" @click.stop="closeStatus(3)">
					<img src="../../assets/images/close.png" />
				</div>
				<div class="mark_bac" v-if="voucher_up2 == true"></div>
				<div class="mark_content" v-if="voucher_up2 == true">
					<!-- <div class="title_name">赛事标题</div> -->
					<div class="title_name">{{tournamentName}}</div>
					<div class="content_region">
						<div class="region_block">
							<div class="label">Reason reject</div>
							<div class="input_area">
								<textarea  class="input-left" maxlength="200" @input="Tontent" v-model="agree.refuse"></textarea>
								<div class="des_num">({{des_num}}/200)</div>
							</div>
						</div>
						
					</div>
					<div class="save_btn">
						<div class="btn" @click="pop_up(4)">Complete</div>	
						<div class="cancel_btn" @click="pop_up(3)">Cancel</div>
					</div>
				</div>
			</div>
			
			<!-- Create New Voucher 弹窗 -->
			<div class="confirm_voucher" v-if="confirm_up == true">
				<div class="mark_cancel" @click.stop="closeStatus(4)">
					<img src="../../assets/images/close.png" />
				</div>
				<div class="mark_bac"></div>
				<div class="mark_content">
					<div class="title_name">Confirm Complete Withdraw?</div>
					<div class="content_region">
						<div class="text">Cannot return after confirmation.</div>
					</div>
					<div class="save_btn">
						<div class="btn"  @click="pop_up(2)">Confirm</div>		
						<div class="cancel_btn"  @click="pop_up(3)">Cancel</div>
					</div>
				</div>
			</div>
			<!--end -->
			
			<div class="withdraw_container">
				<div class="container_header">
					<div class="nav_left">
						<div :class="switch_index == 1 ?'header_nav av':'header_nav' " @click="switch_tab(1)">  
							<div class="nav_name">Preparing({{preparing_num || 0}})</div>  
							<div class="nav_line"></div>
						</div>
						<div :class="switch_index == 2 ?'header_nav av':'header_nav' " @click="switch_tab(2)">
							<div class="nav_name">Withdraw History({{history_num || 0}})</div>
							<div class="nav_line"></div>
						</div>
					</div>
					<div class="text_right">
						<div class="text">Management of tournament's registration fee by organizer</div>
					</div>
				</div>
				<div class="content_block">
					<div class="content_top">
						<div class="sort_by">
							<div class="sort_by_text">Sort by</div>
							<div class="options_select">
								<el-select v-model="value" placeholder="请选择" :popper-append-to-body="false">
									<el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>								
							</div>
						</div>
						<div class="search_block">
							<div class="search">
								<input placeholder="Seacrh user name"/>
								<button class="btn">
									<img src="../../assets/images/2search.png" />
								</button>
							</div>
						</div>
						<div class="choice_right">
							<!-- <div class="export_block">
								<img src="../../assets/images/export.png" alt="">
								Export to PDF / Excel
							</div> -->
						</div>
					</div>
					<div class="content_table">
						<div class="table_header">
							<div class="header_1"></div>
							<div class="header_2"></div>
							<div class="header_3">Organizer Name</div>
							<div class="header_10">Tournament Name</div>
							<div class="header_4">Date of Application</div>
							<div class="header_5">Contact Number</div>
							<div class="header_6">Withdraw to Bank</div>
							<div class="header_7">Existing Amount</div>
							<div class="header_8">Withdraw Amount</div>
							<div class="header_9">Status</div>
							<!-- <div class="header_10" v-if="switch_index == 2">Remark</div> -->
						</div>
						<div class="table_body">
							<div class="body_row" v-for="(item,index) in list" :key="index">
								<div class="col_1">{{index+1}}.</div>
								<div class="col_2">
									<img :src="HOST +  item.tournamentCover" v-if="item.tournamentCover"/>
									<img src="../../assets/images/default.png" v-else/>
								</div>
								<div class="col_3">
									<div class="text">{{item.fullName}}</div>
								</div>
								<div class="col_10">
									<div class="text">{{item.tournamentName}}</div>
								</div>
								<div class="col_4" v-if="item.withdrawalTime != null && item.withdrawalTime != ''">
									<div >{{initDete(Number(item.withdrawalTime))}}</div>
								</div>
								<div class="col_4" v-if="item.withdrawalTime == null || item.withdrawalTime == ''">
									<div>-</div>
								</div>
								<div class="col_5" style="display: flex;justify-content: center;">
									<div class="">{{item.phoneNumber}}</div>
								</div>
								<div class="col_6">
									<div class="text">{{item.bankAccount}}</div>
								</div>
								<div class="col_7">
									<div class="">{{item.organizationProfit || 0}} {{item.registeryFeeType}}s</div>
									<!-- <div class="">{{item.organizationProfit}} Coins</div> -->
								</div>
								<div class="col_8">
									<div class="">{{item.withdrawalProfit || 0}} MYR</div>
								</div>
								<div class="col_9">
									<!-- 'color:#23B709':item.status=='Complete'?'color:#1890FF':'color:#ff0000'" -->
									<div :class="item.withdrawalStatus=='2'?'pointer':''"   @click="open_popup(item)"  @mouseenter="enterOpen(item.id)" @mouseleave="leaveClose(item.id)"   :style="item.withdrawalStatus=='1' || item.withdrawalStatus == null?'color:#23B709':item.withdrawalStatus==3?'color:#1890FF':'color:#ff0000'">
										{{item.withdrawalStatus == 2 ?'In Progress':item.withdrawalStatus == 3 ?'Success':item.withdrawalStatus == 4 ?'Failed':'Wait for apply'}}
									</div>
									<!-- <img src="../../assets/images/up_down.png" /> -->
									<div class="reject_reason" v-if="item.open_status == true">
										<div class="reject_text">{{item.refuse}}</div>
									</div>
								</div>
								<!-- <div class="col_10" v-if="switch_index == 2">
									<div class="">{{item.remark}}</div>
								</div> -->
							</div>
						</div>
					</div>
					<!-- 分页 -->
					<div class="rank_pagination">
						<pagination v-show="total_count>0" :total="total_count" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="handlePageChange" @page_change="pageChange" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {withdrawalList,withdrawalAgree} from '@/api/macth'
	import Listing from '@/mixin/Listing';
	import Pagination from '@/components/Pagination'; // secondary package based on el-pagination
	import LeftView from '@/components/match/left.vue'
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
		name:"withdraw_management",
		components:{
			LeftView,
			Pagination
		},
		data(){
			return{
				voucher_up:false, //提现弹窗
				voucher_up1:false,//Complete Withdraw弹窗
				voucher_up2:false,//Reject Withdraw弹窗
				confirm_up:false,
				tab_up_num:1,
				value:'',
				agree:{ 
					tournamentId:'',
					status:'',
					refuse:'',//Reject Withdraw弹窗  拒绝的原因
					withdrawalProfit:''//Withdraw Amount
				},
				switch_index:1,  //1收益管理 2 提现历史
				listQuery: {
					type:"1",  //1收益管理 2 提现历史
					status:"", //   1未申请 2 申请中 3 已完成
					page: 1,
					size: 10
				},
				total_count:0,
				options2: [{
						value: '1',
						label: 'LOL'
					},
				],
				list:[],
				preparing_num:0,
				history_num:0,
				des_num:0,//字数限制
				tournamentName:'',
				organizationProfit:0,	//Exiting Amount
				// withdrawalProfit:0 //Withdraw Amount
			}
		},
		mounted() {
			console.log(this.initDate(1626250623712))
			setTimeout(()=>{
				this.listQuery.page = this.PageNumber.page_number;
				// this.getList()
			},180)	//当组件跳转时获取全局变量页数进行跳转
			this.getWithdrawNum()
		},
		methods:{
			pageChange(value){
				this.PageNumber.page_number = value.page
			},
			//点击关闭图标 关闭弹窗
			closeStatus(index){
				if(index == 1){
					this.voucher_up = false
				}else if(index == 2){
					this.voucher_up1 = false
				}else if(index == 3){
					this.voucher_up2 = false
				}else if(index == 4){
					this.confirm_up = false
				}
			},
			// reject字数限制
			Tontent(){
				let that = this;
				that.des_num = that.agree.refuse.length
			},
			// 申请提现
			open_popup(item){
				let { withdrawalStatus,id,tournamentName,organizationProfit} = item;
				let that = this;
				if(withdrawalStatus == 2){	//withdrawalStatus==2 申请中
					that.voucher_up = true
					that.agree.tournamentId = id
					that.tournamentName = tournamentName
					that.organizationProfit = organizationProfit
					console.log(that.agree)
				}
			},
			// 切换收益管理 提现历史
			switch_tab(type){
				let that = this;
				that.switch_index = type
				that.listQuery.type = type
				that.getList();
			},
			//显示withdraw history数量
			getWithdrawNum(){
				let params = {
					type:"2",  //1收益管理 2 提现历史
					status:"", //   1未申请 2 申请中 3 已完成
				}
				withdrawalList(params).then(res => {
					this.history_num = res.data.list.total
				})
			},

			//列表
			getList() {
				let that = this;
				withdrawalList(that.listQuery).then(res => {
					for(let a = 0; a < res.data.list.list.length;a++){
						res.data.list.list[a]['open_status'] = false
					}
					const {
						list,statistics
					} = res.data
					if(list != '' ){
						that.list = list.list;
						that.total_count = list.total;
					}else if(statistics != ''){
						that.statistics = statistics;
					}
					if(that.switch_index == 1){
						that.preparing_num = list.total
					}else{
						that.history_num = list.total
					}
					// 	console.log(list)
					// 	that.list = list;
					// that.total_count = total;
				})
			},
			tab_up(index){
				this.tab_up_num = index
				if(this.tab_up_num == 1){
					this.voucher_up = false
					this.voucher_up1 = true
				}else if(this.tab_up_num == 2){
					this.voucher_up = false
					this.voucher_up2 = true
				}
			},
			// 打开弹窗
			pop_up(index){
				let that = this;
				if(index == 1){
					if(that.agree.withdrawalProfit == ''){
						this.$message({
						  message: 'Withdraw Amount不能为空！',
						  type: 'warning'
						});
						return false
					}
					that.voucher_up1 = false
					that.confirm_up = true
				}else if(index == 2){
					//审核通过
					if(that.agree.withdrawalProfit != ''){
						that.agree.status = 3
						that.agree.refuse = ''
					}
					that.get_agree();
					that.confirm_up = false
				}else if(index == 3){
					//关闭弹窗
					that.voucher_up1 = false
					that.confirm_up = false
					that.voucher_up2 = false
				}else if(index == 4){
					//审核不通过
					if(that.agree.refuse == ''){
						this.$message({
						  message: 'Reason reject不能为空！',
						  type: 'warning'
						});
					}else{
						that.agree.status = 4
						that.agree.withdrawalProfit = ''
						that.get_agree()
					}
				}
				// if(index == 1){
				// 	that.voucher_up = false
				// 	this.confirm_up = true
				// }else if(index == 2){
				// 	if(that.agree.withdrawalProfit == '' && that.agree.refuse == '' ){
				// 		this.$message({
				// 		  message: '请选择选项操作！！！',
				// 		  type: 'warning'
				// 		});
				// 		return false
				// 	}else{
				// 		if(that.agree.withdrawalProfit != ''){
				// 			that.agree.status = 3
				// 			that.agree.refuse = ''
				// 		}else{
				// 			that.agree.status = 4
				// 			that.agree.withdrawalProfit = ''
				// 		}
				// 		that.get_agree();
				// 	}
				// }else if(index == 3){
				// 	that.voucher_up1 = false
				// 	that.confirm_up = false
				// 	that.voucher_up2 = false
				// }else{
				// 	that.confirm_up = false
				// 	that.agree = {
				// 		tournamentId:'',
				// 		status:'',
				// 		refuse:'',
				// 		withdrawalProfit:''
				// 	}
				// }
			},
			//审核提现
			get_agree() {
				console.log('审核主持人提现')
				let that = this;
				withdrawalAgree(that.agree).then(res => {
					this.$message({
					  message: res.message,
					  type: 'success'
					});
					that.confirm_up = false
					that.voucher_up2 = false
					that.getList();
				})
			},
			//鼠标划入
			enterOpen(id){
				for(let k = 0; k < this.list.length; k++){
					if(this.list[k].id == id){
						if(this.list[k].withdrawalStatus == 4){
							this.list[k].open_status = true
							console.log(this.list[k].open_status)
						}
						else{
							this.list[k].open_status = false
						}
					}else{
						this.list[k].open_status = false
					}
				}
			},
			//鼠标划出
			leaveClose(id){
				for(let k = 0; k < this.list.length; k++){
					if(this.list[k].id == id){
						if(this.list[k].withdrawalStatus == 4){
							this.list[k].open_status = false
							console.log(this.list[k].open_status)
						}
					}
				}
			}
		}
	}
</script>

<style lang="less" scoped>
.container {
	background: #33384B;
	margin: 0 40px 0 224px;
	padding-bottom:20px;
	.create_voucher{
		position: fixed;
		// left: 165px;
		z-index: 99;
		.mark_cancel{
			width: 46px;
			height: 46px;
			position: fixed;
			right: 180px;
			z-index: 999;
			img{
				width: 46px;
				height: 46px;
				cursor: pointer;
			}
		}
		.mark_bac{
			width: 100%;
			height: 100vh;
			background:#000000b3;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 88;
		}
		.mark_content{
			width: 831px;
			padding-bottom: 80px;
			// height: 1513px;
			background: #33384B;
			border-radius: 32px;
			position: absolute;
			z-index: 999;
			top: 60px;
			left: 100px;
			.title_name{
				color: #E5A518;
				font-size: 24px;
				font-family:'Quicksand-Bold';
				display: flex;
				justify-content: center;
				padding-top: 70px;
				margin-bottom: 40px;
			}
			.content_region{
				// padding: 0 100px;
				width: 831px;
				display: flex;
				justify-content: center;
				// flex-flow: column;
				// flex-wrap: wrap;
				// text-align: center;
				// background-color: #FFFF00;
				// padding: 0 auto ;
				.block_1{
					// margin-top: 30px;
					margin-bottom: 30px;
					font-family:'Roboto-Regular';
					width: 210px;
					height: 59px;
					border: 1px solid #E5A518;
					border-radius: 19px;
					color: #E5A518;
					background: #33384b;
					font-size: 16px;
					text-align: center;
					line-height: 59px;
					cursor: pointer;
				}
				.block_2{
					margin-bottom: 30px;
					font-family:'Roboto-Regular';
					width: 210px;
					height: 59px;
					border: 1px solid rgba(255,255,255,0.5);
					border-radius: 19px;
					color: #ffffff;
					background: #33384b;
					font-size: 16px;
					text-align: center;
					line-height: 59px;
					cursor: pointer;
				}
			}
			.save_btn{
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: 80px;
				.btn{
					cursor: pointer;
					width: 163px;
					height: 58px;
					background: #D3AA53;
					border-radius: 25px;
					color: #0E0F11;
					font-size: 20px;
					font-family:'Roboto-Regular';
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}
	}
	.create_voucher1{
		position: fixed;
		// left: 165px;
		z-index: 99;
		.mark_cancel{
			width: 46px;
			height: 46px;
			position: fixed;
			right: 180px;
			z-index: 999;
			img{
				width: 46px;
				height: 46px;
				cursor: pointer;
			}
		}
		.mark_bac{
			width: 100%;
			height: 100vh;
			background:#000000b3;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 88;
		}
		.mark_content{
			width: 831px;
			padding-bottom: 80px;
			// height: 1513px;
			background: #33384B;
			border-radius: 32px;
			position: absolute;
			z-index: 999;
			top: 60px;
			left: 100px;
			.title_name{
				width: 80%;
				padding: 70px 10% 0;
				color: #E5A518;
				font-size: 20px;
				font-family:'Quicksand-Bold';
				display: flex;
				// justify-content: center;
				// padding-top: 70px;
				margin-bottom: 40px;
			}
			.content_region{
				// padding: 0 100px;
				// width: 831px;
				// display: flex;
				// justify-content: center;
				width: 80%;
				padding: 0 10%;
				.region_block{
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 30px;
					.label{
						color: #727272;
						font-size: 20px;
						margin-bottom: 10px;
						font-family:'Roboto-Regular';
					}
					.input_block{
						width: 400px;
						display: flex;
						align-items: center;
						border-radius: 19px;
						height: 59px;
						border: 1px solid #2a2e3f;
						color: #fff;
						background: #2a2e3f;
						.input_text{
							// width: 30px;
							width: 10%;
							height: 58px;
							border: 1px solid #2a2e3f;
							background: #2a2e3f;
							border-radius: 19px;
							// border: 1px solid #2a2e3f;
							color: #fff;
							// background: #2a2e3f;
							padding-left: 20px;
							font-size: 16px;
							font-family:'Roboto-Regular';
						}
						.text{
							color: #fff;
						}
						.input_text1{
							// width: 30px;
							width: 400px;
							height: 58px;
							border: 1px solid #2a2e3f;
							background: #2a2e3f;
							border-radius: 19px;
							// border: 1px solid #2a2e3f;
							color: #fff;
							// background: #2a2e3f;
							padding-left: 20px;
							font-size: 16px;
							font-family:'Roboto-Regular';
						}
					}
					
				}
			}
			.save_btn{
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: 80px;
				.btn{
					cursor: pointer;
					width: 163px;
					height: 58px;
					background: #D3AA53;
					border-radius: 25px;
					color: #0E0F11;
					font-size: 20px;
					font-family:'Roboto-Regular';
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.cancel_btn{
					cursor: pointer;
					width: 163px;
					height: 58px;
					// background: #D3AA53;
					// border: 1px solid #33384b;
					border: 1px solid rgba(255,255,255,0.5);
					color: #ffffff;
					border-radius: 25px;
					font-size: 20px;
					font-family:'Roboto-Regular';
					display: flex;
					align-items: center;
					justify-content: center;
					margin-left: 30px;
				}
			}
		}
	}
	.create_voucher2{
		position: fixed;
		// left: 165px;
		z-index: 99;
		.mark_cancel{
			width: 46px;
			height: 46px;
			position: fixed;
			right: 180px;
			z-index: 999;
			img{
				width: 46px;
				height: 46px;
				cursor: pointer;
			}
		}
		.mark_bac{
			width: 100%;
			height: 100vh;
			background:#000000b3;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 88;
		}
		.mark_content{
			width: 831px;
			padding-bottom: 80px;
			// height: 1513px;
			background: #33384B;
			border-radius: 32px;
			position: absolute;
			z-index: 999;
			top: 60px;
			left: 100px;
			.title_name{
				width: 80%;
				padding: 70px 10% 0;
				color: #E5A518;
				font-size: 24px;
				font-family:'Quicksand-Bold';
				margin-bottom: 40px;
			}
			.content_region{
				width: 80%;
				padding: 0 10%;
				.region_block{
					.label{
						color: #727272;
						font-size: 20px;
						margin-bottom: 10px;
						font-family:'Roboto-Regular';
					}
					.input_area{
						border-radius: 19px;
						background: #2a2e3f;
						.des_num {
							color: #727272;
							font-size: 20px;
							padding-right: 10px;
							font-family:'Roboto-Regular';
							text-align: right;
							padding-bottom: 10px;
						}
						.input-left{
							width: 627px;
							height: 120px;
							// height: 227px;
							border: 1px solid #2a2e3f;
							border-radius: 19px;
							color: #fff;
							background: #2a2e3f;
							font-family:'Roboto-Regular';
							padding: 20px 0 20px 20px;
							font-size: 20px;
							border: none;
							resize: none;
							// overflow-y: scroll;
						}
						.input-left::-webkit-scrollbar {
							/*滚动条整体样式*/
							width : 10px;  /*高宽分别对应横竖滚动条的尺寸*/
							height: 1px;
							// background-color: #33384B;
						}
						.input-left::-webkit-scrollbar-thumb {
							/*滚动条里面小方块*/
							border-radius   : 10px;
							box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
							background-color: #595959;
						}
						.input-left::-webkit-scrollbar-track {
							/*滚动条里面轨道*/
							box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
							background   : #7C7C7C;
							border-radius: 10px;
						}
					}
					
				}
			}
			.save_btn{
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: 70px;
				.btn{
					cursor: pointer;
					width: 163px;
					height: 58px;
					background: #D3AA53;
					border-radius: 25px;
					color: #0E0F11;
					font-size: 20px;
					font-family:'Roboto-Regular';
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.cancel_btn{
					cursor: pointer;
					width: 163px;
					height: 58px;
					// background: #D3AA53;
					// border: 1px solid #33384b;
					border: 1px solid rgba(255,255,255,0.5);
					color: #ffffff;
					border-radius: 25px;
					font-size: 20px;
					font-family:'Roboto-Regular';
					display: flex;
					align-items: center;
					justify-content: center;
					margin-left: 30px;
				}
			}
		}
	}
	.confirm_voucher{
		position: fixed;
		z-index: 99;
		.mark_cancel{
			width: 46px;
			height: 46px;
			position: fixed;
			right: 180px;
			z-index: 999;
			img{
				width: 46px;
				height: 46px;
				cursor: pointer;
			}
		}
		.mark_bac{
			width: 100%;
			height: 100vh;
			background:#000000b3;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 88;
		}
		.mark_content{
			width: 831px;
			padding-bottom: 80px;
			// height: 1513px;
			background: #33384B;
			border-radius: 32px;
			position: absolute;
			z-index: 999;
			top: 60px;
			left: 100px;
			.title_name{
				color: #E5A518;
				font-size: 24px;
				font-family:'Quicksand-Bold';
				display: flex;
				justify-content: center;
				padding-top: 70px;
				margin-bottom: 40px;
			}
			.content_region{
				display: flex;
				justify-content: center;
				.text{
					color: #989898;
					font-size: 20px;
					font-family:'Roboto-Regular';
				}
			}
			.save_btn{
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: 80px;
				.btn{
					cursor: pointer;
					width: 163px;
					height: 58px;
					background: #D3AA53;
					font-family:'Roboto-Regular';
					border-radius: 25px;
					color: #0E0F11;
					font-size: 20px;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.cancel_btn{
					cursor: pointer;
					width: 163px;
					height: 58px;
					background: #33384B;
					border-radius: 25px;
					color: #ffffff;
					font-size: 20px;
					display: flex;
					font-family:'Roboto-Regular';
					align-items: center;
					justify-content: center;
					border: 1px solid #777777;
					margin-left: 30px;
				}
			}
		}
	}
	
	.withdraw_container{
		.container_header{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 30px 20px 0;
			border-bottom: 1px solid #595959;
			.nav_left{
				display: flex;
				align-items: center;
				cursor: pointer;
				.header_nav{
					color: #ffffff;
					font-size: 21px;
					text-align: left;
					margin-right: 62px;
					font-family:'Quicksand-Bold';
					.nav_name{
						height: 35px;
					}
					.nav_line{
						width: 40%;
						height: 2px;
					}
				}
				.av{
					color: #DBA83F;
					font-family:'Quicksand-Bold';
					.nav_line{
						width: 40%;
						height: 2px;
						background-color: #DBA83F;
					}
				}
			}
			.text_right{
				color: #727272;
				font-size: 17px;
				font-family:'Roboto-Regular';
			}
		}
		.content_block{
			padding: 0 30px;
			.content_top{
				display: flex;
				align-items: flex-end;
				justify-content: space-between;
				margin-top: 30px;
				.sort_by{
					margin-right: 26px;
					.sort_by_text{
						font-size: 18px;
						text-align: left;
						letter-spacing: 0px;
						color: #727272;
						font-family:'Roboto-Regular';
						margin-bottom: 11px;
					}
					.options_select{
						/deep/ .el-select .el-input .el-input__inner {
							border: 0px;
							width: 230px;
							height: 59px;
							padding: 0 20px;
							font-size: 18px;
							color: #fff;
							border-radius: 20px;
							background-color: #2a2e3f;
							font-family:'Roboto-Regular';
						}
						/deep/ .el-select-dropdown {
							background-color: #2a2e3f;
							border: 1px solid rgba(255,255,255,0.2);
						}
						/deep/ .el-icon-arrow-up:before { content: ""; }
						/deep/ .el-icon-arrow-down:before { content: ""; }
						//修改单个的选项的样式
						/deep/ .el-select-dropdown__item {
							background-color: transparent;
							color: #fff;
							font-family:'Roboto-Regular';
							text-align: center;
						}
						/deep/ .el-select-dropdown__item.hover{
							background-color: #545873;
						}
						/deep/ .el-select-dropdown__item.selected{
							background-color: #545873;
						}
					}
				}
				.search_block{
					display: flex;
					flex-direction: column;
					justify-content: flex-end;
					.search{
						background: #2a2e3f;
						border-radius: 23px;
						input{
							width: 215px;
							height: 60px;
							background: #2a2e3f;
							border-radius: 23px;
							font-size: 18px;
							border: none;
							padding-left: 35px;
							color: #fff;
							font-family:'Roboto-Regular';
						}
						.btn{
							width: 60px;
							height: 60px;
							background: #D3AA53;
							border: none;
							border-radius: 22px;
							opacity: 1;
							cursor: pointer;
							img{
								width: 22px;
								height: 22px;
							}
						}
					}
				}
				.choice_right{
					display: flex;
					flex-direction: column;
					justify-content: flex-end;
					.export_block{
						display: flex;
						align-items: center;
						height: 60px;
						color: #DBA83F;
						font-size: 18px;
						font-family:'Roboto-Bold';
						cursor: pointer;
						img{
							width: 22px;
							height: auto;
							margin-right: 20px;
						}
					}
				}
			}
			.content_table{
				// width: 100%;
				width: 1400px;
				margin-top: 16px;
				overflow-x: scroll;
				.table_header{
					width: 140%;
					// overflow-x: scroll;
					// overflow: hidden;
					background-color: #2A2E3F;
					display: flex;
					align-items: center;
					color: #727272;
					font-size: 17px;
					height: 60px;
					border-bottom: 1px solid #2D2D2D;
					text-align: left;
					font-family:'Quicksand-Bold';
					div{
						height: 60px;
						line-height: 60px;
						// width: 50%;
					}
					.header_1, .header_2{
						width: 100px;
						// width: 6%;
						// width: 15%;
					}
					.header_3, .header_4, .header_5, .header_6, .header_7, .header_8{
						width: 290px;
						// width: 12%;
						// width: 15%;
					}
					.header_5{
						text-align: center;
					}
					.header_9{
						width: 250px;
						// width: 8%;
						// width: 15%;
					}
					.header_10{
						width: 300px;
						// width: 13%;
						// width: 15%;
					}
				}
				.table_body{
					// margin-left: 20px;
					width: 140%;
					.body_row{
						// width: 1000px;
						// overflow-x: scroll;
						display: flex;
						align-items: center;
						color: #ffffff;
						font-size: 18px;
						font-family:'Roboto-Regular';
						padding: 25px 0;
						border-bottom: 1px solid #595959;
						div{
							display: flex;
							align-items: center;
						}
						.col_1{
							display: flex;
							justify-content: center;
						}
						.col_1, .col_2{
							width: 100px;
							// width: 6%;
							// width: 15%;
						}
						.col_3,.col_4, .col_5, .col_6, .col_7, .col_8{
							// width: 12%;
							width: 290px;
							// width: 15%;\
							// width: 400px;
						}
						.col_3{
							overflow:hidden;
							text-overflow:ellipsis;
							white-space:nowrap
						}
						.col_6{
							.text{
								margin-bottom: 5px;
							}
						}
						.col_2{
							img{
								width: 40px;
								height: 40px;
							}
						}
						.col_9{
							// width: 8%;
							width: 250px;
							// width: 15%;
							display: flex;
							align-items: center;
							color: #23B709;
							position: relative;
							img{
								width: 12px;
								height: 12px;
								margin-left: 5px;
							}
							.pointer{
								cursor: pointer;
							}
							.reject_reason{
								position: absolute;
								// top: 0;
								top:40px;
								right: 60px;
								z-index: 999;
								background-color: #2A2E3F;
								padding: 20px;
								border-radius: 10px;
								max-width: 300px;
								.reject_text{
									color: #ffffff;
									font-size: 16px;
								}
							}
						}
						
						.col_10{
							width: 300px;
							// width:13%;
							// width: 15%;
							
							.text{
								margin-bottom: 5px;
							}
						}
					}
				}
				&::-webkit-scrollbar {
					/*滚动条整体样式*/
					width : 13px;  /*高宽分别对应横竖滚动条的尺寸*/
					height: 10px;
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
			.rank_pagination {
				margin: 32px 0 0px 0px;
				display: flex;
				justify-content: flex-end;
			}
		}//content_block
	}
}
</style>
