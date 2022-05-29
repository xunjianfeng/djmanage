<template>
	<div class="index">
		<LeftView :index="1"></LeftView>
		<div class="container">
			<!-- 添加优惠券 弹窗 -->
			<div class="create_voucher">
				<div class="mark_cancel"  v-if="voucher_up == true" @click.stop="voucher_up = false">
					<img src="../../assets/images/close.png" />
				</div>
				<div class="mark_bac" v-if="voucher_up == true"></div>
				<div class="mark_scontent" v-if="voucher_up == true">
					<div class="title_name">Create New Voucher</div>
					<div class="content_region">
						<div class="block_region">
							<div class="label">Title<span>*</span></div>
							<div class="block_region_tip">
								<div class="text">Eg:</div>
								<div class="text_tip">1. 20 off with any purchase</div>
								<div class="text_tip">2. 10 off with minimum consumption of 300</div>
							</div>
							<div class="input_block">
								<input type="text"  v-model="dataForm.couponTitle" v-on:keyup="Tontent"  maxlength="100" />
								<div class="text">({{text_num}}/100)</div>
							</div>
						</div>
						<div class="block_region_type">
							<div class="block_left">
								<div class="label">Promo Code Type<span>*</span></div>
								<div class="sort_by">
									<div class="options_select">
										<el-select placeholder="请选择" v-model="dataForm.couponMode" :popper-append-to-body="false">
											<el-option v-for="item in mode_list" :label="item.label" :value="item.value"></el-option>
										</el-select>								
									</div>
								</div>
							</div>
							<div class="block_right">
								<div class="label">Discount Type<span>*</span></div>
								<input type="number" v-model="dataForm.denomination"  maxlength="10" min="1" />
							</div>
						</div>
						<div class="block_region">
							<div class="label">Minimum Consumption<span v-if="dataForm.couponMode == 1">*</span></div>
							<input type="number" :disabled="dataForm.couponMode != 1" v-model="dataForm.couponMin" min="1" />
						</div>
						<div class="block_region">
							<div class="label">EXP Date<span>*</span></div>
							<el-date-picker
							      v-model="dataForm.endTime"
							      type="date"
							      placeholder="选择日期"
								  format="yyyy-MM-dd "
								  value-format="timestamp"
								  :picker-options="pickerOptions0"
								  >
							    </el-date-picker>
						</div>
						<div class="block_region">
							<div class="label">Quantity<span>*</span></div>
							<input type="number"  v-model="dataForm.quantity" min="1" />
						</div>
						<div class="block_region">
							<div class="label">Rule</div>
							<textarea rows="4" class="input-left" maxlength="100" v-model="dataForm.rule"></textarea>
						</div>
					</div>
					<div class="save_btn">
						<div class="btn" @click="submit">Save</div>						
					</div>
				</div>
			</div>
			<!--end -->
			<!-- 查看内容 弹窗 -->
			<div class="view_detail">
				<div class="mark_cancel"  v-if="detail_up == true" @click.stop="detail_up = false">
					<img src="../../assets/images/close.png" />
				</div>
				<div class="mark_bac" v-if="detail_up == true"></div>
				<div class="mark_content" v-if="detail_up == true">
					<div class="content_top">
						<div class="top_left">
							<div class="title">{{listInfo.couponTitle}}</div>
							<div class="exp_date">EXP:{{initDete(listInfo.endTime)}}</div>
						</div>
						<div class="delete">
							<img src="../../assets/images/delete_gray.png" @click="handleSopnsDel(listInfo.couponId,2)"  v-if="listQuery.type == 1"/>
							<img src="../../assets/images/recycle.png" v-if="listQuery.type == 3" @click="open_add_voucher"/>
						</div>
					</div>
					<div class="content_block">
						<div id="text_area" >
							<div class="text">
								{{listInfo.rule}}
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- end -->
			<div class="withdraw_container">
				<div class="container_header">
					<div class="nav_left">
						<div :class=" listQuery.type == 1 ? 'header_nav av' : 'header_nav'" @click="tab_nav(1)">
							<div class="nav_name">All Voucher({{all || 0}})</div>
							<div class="nav_line"></div>
						</div>
						<div :class=" listQuery.type == 2 ? 'header_nav av' : 'header_nav'" @click="tab_nav(2)">
							<div class="nav_name">Valid Period({{valid || 0}})</div>
							<div class="nav_line"></div>
						</div>
						<div :class=" listQuery.type == 3 ? 'header_nav av' : 'header_nav'" @click="tab_nav(3)">
							<div class="nav_name">History({{history || 0}})</div>
							<div class="nav_line"></div>
						</div>
					</div>
				</div>
				<div class="content_block">
					<div class="content_top">
						<div class="sort_by">
							<div class="sort_by_text">EXP Date</div>
							<div class="options_select">
								<el-select placeholder="请选择" :popper-append-to-body="false" @change="chagne_status" v-model="listQuery.type">
									<el-option label="全部" :value="1"></el-option>
									<el-option label="可用" :value="2"></el-option>
									<el-option label="过期" :value="3"></el-option>
								</el-select>								
							</div>
						</div>
						<div class="search_block">
							<div class="search">
								<input placeholder="Seacrh user name" v-model="listQuery.title"/>
								<button class="btn" @click="handleFilter">
									<img src="../../assets/images/2search.png" />
								</button>
							</div>
						</div>
						<div class="choice_right">
							<div class="export_block" @click="open_add_voucher">
								Create New Voucher
							</div>
						</div>
					</div>
					<!-- 优惠券列表 -->
					<div class="content_table">
						<div class="table_header">
							<div class="header_1"></div>
							<div class="header_2">Voucher Title</div>
							<div class="header_1">Discount</div>
							<div class="header_3">Minimum Consumption</div>
							<div class="header_3">EXP Date</div>
							<div class="header_1">Rule</div>
							<div class="header_1">Received</div>
							<div class="header_last"></div>
						</div>
						<div class="table_body">
							<div class="body_row" v-for="(item,index) in list" :key="index">
								<div class="col_num">{{item.couponId}}.</div>
								<div class="col_2">
									<div class="text">{{item.couponTitle}}</div>
								</div>
								<div class="col_1">
									<div class="text">{{item.denomination}}</div>
								</div>
								<div class="col_3">
									<div>{{item.couponMin || 0}}</div>
								</div>
								<div class="col_3">
									<div :class="item.userLimit == item.quantity ? 'text_color' : 'text'"> {{initDate(item.endTime)}} </div>
								</div>
								<div class="col_rule" @click="showDetail(item)">
									<img src="../../assets/images/eye.png" />
								</div>
								<div class="col_1">
									<!-- <div :class="item.userLimit == item.quantity ? 'text_color' : 'text'">({{item.userLimit+'/'+item.quantity}})</div> -->
									<div :class="item.userLimit == item.quantity ? 'text_color' : 'text'">({{item.countCoupon||0}}/{{item.quantity ||0}})</div>
								</div>
								<div class="col_last">
									<img src="../../assets/images/delete_gray.png" @click="handleSopnsDel(item.couponId,1)" v-if="item.userLimit != item.quantity"/>
									<img src="../../assets/images/recycle.png" v-if="item.userLimit == item.quantity" @click="open_add_voucher"/>
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
	import Pagination from '@/components/Pagination'; // secondary package based on el-pagination
	import Listing from '@/mixin/Listing';
	import {couponList, couponSave,couponDelete} from '@/api/recharge'
	export default{
		name:"coupon",
		mixins: [Listing],
		components:{
			LeftView,
			Pagination
		},
		data(){
			return{
				nav_index:1,
				detail_up:false,
				voucher_up:false,
				check_box:false,
				check_second:false,
				listQuery: {
					order: {create_time:'desc'},
					title: '',
					type:1, //1全部 2 可用 3 过期
					page: 1,
					size: 10
				},
				total_count: 0,
				listInfo: {}, //备注
				dataForm:{
					couponId:'',
					couponTitle: '',
					couponMin: '',       //优惠券门槛
					denomination: '',   //优惠券 面额
					couponMode: '',    //优惠方式 1 满减 2 固定额度
					quantity: '',     //发放数量
					endTime: '',   //有效期 结束
					userLimit:'',   //每个用户领取的上限
					startTime: '', //有效期 开始  可不传
					timeMode: 1,  //1 有效期 2 领券起计算
					couponCategory: 1,   //优惠券类型 1通用 2商品 3 陪玩
					rule:'', //规则
				},
				mode_list: [
					{
						value: '1',
						// label: '满减'
						label:' Minimum consumption discount'
					},
					{
						value: '2',
						// label: '固定额度'
						label:'Fixed amount discount'
					},
				],
				list:[],    //优惠券列表
				text_num:0,
				all:0,
				valid:0,
				history:0,
				pickerOptions0: {
					disabledDate: (time) => {
						return time.getTime() < Date.now() - 8.64e7;
					}
				},
			}
		},
		mounted() {
			this.getList()
			
		},
		methods:{
			// 添加优惠券
			submit() {
				let that = this;
				let { couponTitle, couponMin, denomination, couponMode, quantity, userLimit, endTime,rule } = that.dataForm;

				if(couponTitle == '' || denomination == '' || couponMode == '' || quantity  == '' || endTime  == '' ){
					that.$message({
					  message: '请输写完整！',
					  type: 'warning'
					})
					// return false
				}else{
					if(couponMode  == 1){
						if(couponMin == ''){
							that.$message({
							  message: 'Promo Code Type为Minimum consumption discount，Minimum Consumption不能为空！',
							  type: 'warning'
							})
							// return false
						}else{
							couponSave(that.dataForm).then(res => {
								this.$message({
									type: 'success',
									message: res.message
								});
								that.voucher_up = false;
								that.dataForm= {
									couponId:'',
									couponTitle: '',
									couponMin: '', 
									denomination: '', 
									couponMode: '',  
									quantity: '',   
									endTime: '',  
									userLimit:'',   
									startTime: '', 
									timeMode: 1,  
									couponCategory: 1,   
									rule:'', 
								}
								that.getList()
							})
						}
					}else{
						couponSave(that.dataForm).then(res => {
							this.$message({
								type: 'success',
								message: res.message
							});
							that.voucher_up = false;
							that.dataForm= {
								couponId:'',
								couponTitle: '',
								couponMin: '', 
								denomination: '', 
								couponMode: '',  
								quantity: '',   
								endTime: '',  
								userLimit:'',   
								startTime: '', 
								timeMode: 1,  
								couponCategory: 1,   
								rule:'', 
							}
							that.getList()
						})
					}
				}
			},
			// 列表
			getList() {
				couponList(this.listQuery).then(res => {
					const {
						list,total
					} = res.data
					this.total_count = total
					this.list = list;
					if(this.listQuery.type == 1){
						this.all = list.length
					}else if(this.listQuery.type == 2){
						this.valid = total
					}else{
						this.history = total
					}
					this.getValidNum()
					this.getHistoryNum()
				})
				
			},
			getValidNum(){
				let params = {
					order: {create_time:'desc'},
					title: '',
					type:2, //1全部 2 可用 3 过期
				}
				couponList(params).then(res => {
					const {total} = res.data
					this.valid = total
				})
			},
			getHistoryNum(){
				let params = {
					order: {create_time:'desc'},
					title: '',
					type:3, //1全部 2 可用 3 过期
				}
				couponList(params).then(res => {
					const {total} = res.data
					this.history = total
				})
			},
			// 删除
			handleSopnsDel(id,type){
				this.$confirm('是否删除该优惠券?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					couponDelete({id}).then(res => {
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						if(type == 2){
							this.detail_up = false
						}
						this.getList()
					})
				}).catch(() => {       
				});
			},
			// 切换优惠券列表状态
			tab_nav(index){
				this.listQuery.type = index
				this.getList()
			},
			chagne_status(value){
				this.getList();
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
			// 打开 查看内容弹窗
			showDetail(item){
				this.detail_up = ! this.detail_up
				if ( this.detail_up ) {
					this.listInfo = item
				} else {
					this.listInfo = {}
				}
			},
			
			open_add_voucher(){
				this.voucher_up = ! this.voucher_up
				this.detail_up = false
			},
			Tontent(){
				let that = this;
				that.text_num = that.dataForm.couponTitle.length
			}
		}
	}
</script>

<style lang="less" scoped>
.container {
	background: #33384B;
	margin: 0 56px 0 224px;
	padding-bottom:20px;
	.create_voucher{
		position: relative;
		left: 165px;
		.mark_cancel{
			width: 46px;
			height: 46px;
			position: absolute;
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
		.mark_scontent{
			width: 800px;
			background: #33384B;
			border-radius: 32px;
			position: absolute;
			top: 0px;
			z-index: 999;
			.title_name{
				color: #E5A518;
				font-size: 24px;
				display: flex;
				justify-content: center;
				padding-top: 40px;
				margin-bottom: 20px;
				font-family:'Quicksand-Bold';
			}
			.content_region{
				display: flex;
				flex-direction: column;
				align-items: center;
				
				.block_region{
					margin-bottom: 20px;
					.label{
						color: #727272;
						font-size: 20px;
						margin-bottom: 10px;
						font-family:'Roboto-Regular';
						span{
							color: red;
							font-family:'Roboto-Regular';
						}
					}
					.block_region_tip{
						width: 78%;
						// background-color: #F1FA8C;
						margin-bottom: 10px;
						color: #727272;
						text-align: left;
						.text{
							font-size: 18px;
						}
						.text_tip{
							font-size: 16px;
						}
					}
					input{
						width: 627px;
						height: 45px;
						border: 1px solid #2a2e3f;
						border-radius: 19px;
						color: #fff;
						background: #2a2e3f;
						padding-left: 20px;
						font-size: 16px;
						font-family:'Roboto-Regular';
					}
					.input_block{
						display: flex;
						align-items: center;
						width: 645px;
						height: 45px;
						background: #2a2e3f;
						border: 1px solid #2a2e3f;
						border-radius: 19px;
						.text{
							color: #727272;
							font-size: 20px;
							padding-right: 10px;
							font-family:'Roboto-Regular';
						}
						input{
							height: 44px;
							border: 1px solid #2a2e3f;
							border-radius: 19px;
							color: #fff;
							background: #2a2e3f;
							padding-left: 20px;
							font-size: 16px;
							font-family:'Roboto-Regular';
							
						}
					}
					.img_area{
						display: flex;
						align-items: center;
						.img{
							width: 245px;
							height: 245px;
							background: #2a2e3f;
							border-radius: 17px;
							display: flex;
							align-items: center;
							justify-content: center;
							img{
								width: 149px;
								height: 154px;
								border-radius: 72.5px 77px;
							}
						}
						.text{
							color: #ffffff;
							font-size: 20px;
							margin-left: 70px;
							font-family:'Roboto-Regular';
						}
					}
					.input-left{
						width: 627px;
						height: 45px;
						// height: 227px;
						border: 1px solid #2a2e3f;
						border-radius: 19px;
						color: #fff;
						background: #2a2e3f;
						font-family:'Roboto-Regular';
						padding: 20px 0 20px 20px;
						font-size: 20px;
						overflow-y: scroll;
					}
					.input-left::-webkit-scrollbar {
						/*滚动条整体样式*/
						width : 15px;  /*高宽分别对应横竖滚动条的尺寸*/
						height: 1px;
						background-color: #33384B;
					}
					.input-left::-webkit-scrollbar-thumb {
						/*滚动条里面小方块*/
						border-radius   : 10px;
						background-color: #595959;
					}
					.input-left::-webkit-scrollbar-track {
						/*滚动条里面轨道*/
						background   : #7C7C7C;
						border-radius: 10px;
					}
					/deep/.el-date-editor.el-input, .el-date-editor.el-input__inner{
						width: 647px;
						color: #fff;
						background: #2a2e3f;
						font-size: 16px;
						border-radius: 19px;
					}
					/deep/.el-input__inner{
						height: 45px;
						background: #2a2e3f;
						border: 1px solid #2a2e3f;
						border-radius: 19px;
						color: #fff;
						font-family:'Roboto-Regular';
					}
				}
				.block_region_type{
					width: 645px;
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 20px;
					.block_left{
						.label{
							color: #727272;
							font-size: 20px;
							margin-bottom: 10px;
							font-family:'Roboto-Regular';
							span{
								color: red;
							}
						}
						.sort_by{
							font-family:'Roboto-Regular';
							.options_select{
								/deep/ .el-select .el-input .el-input__inner {
									border: 0px;
									width: 291px;
									height: 45px;
									padding: 0 20px;
									font-size: 16px;
									font-family:'Roboto-Regular';
									color: #fff;
									border-radius: 20px;
									background-color: #2a2e3f;
									// border: 1px solid #fff;
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
					}
					.block_right{
						.label{
							color: #727272;
							font-family:'Roboto-Regular';
							font-size: 20px;
							margin-bottom: 10px;
							span{
								color: red;
							}
						}
						input{
							width: 291px;
							height: 45px;
							border: 1px solid #2a2e3f;
							border-radius: 19px;
							color: #fff;
							font-family:'Roboto-Regular';
							background: #2a2e3f;
							padding-left: 20px;
							font-size: 16px;
						}
					}
				}
			}
			.save_btn{
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 20px 0 50px 0;
				.btn{
					cursor: pointer;
					width: 163px;
					height: 50px;
					background: #E5A518;
					border-radius: 25px;
					color: #0E0F11;
					font-size: 20px;
					display: flex;
					font-family:'Roboto-Regular';
					align-items: center;
					justify-content: center;
				}
			}
		}
	}
	.view_detail{
		position: relative;
		left: 160px;
		top: 70px;
		
		.mark_cancel{
			width: 50px;
			height: 50px;
			position: absolute;
			right: 180px;
			top: -70px;
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
			height: 674px;
			background: #33384B;
			border-radius: 25px;
			position: absolute;
			z-index: 999;
			.content_top{
				display: flex;
				align-items: center;
				justify-content: space-between;
				// padding-left: 86px;
				// padding-right: 50px;
				// margin-top: 40px;
				border-bottom: 1px solid #7C7C7C;
				// margin-left: 86px;
				margin: 40px 50px 10px 86px;
				padding-bottom: 10px;
				.top_left{
					.title{
						color: #ffffff;
						font-size: 22px;
					}
					.exp_date{
						color: #7C7C7C;
						font-size: 18px;
						margin-top: 5px;
					}
				}
				.delete{
					img{
						width: 28px;
						height: 30px;
						cursor: pointer;
					}
				}
			}
			.content_block{
				padding-left: 86px;
				padding-right: 50px;
				margin-top: 40px;
				#text_area{
					width: 670px;
					height: 450px;
					border: 1px solid black;
					overflow-y:scroll;
					// line-height:1;
					color: #7C7C7C;
					font-size: 18px;
					border: none;
					padding-right: 20px;
					.text{
						margin-bottom: 25px;
					}
					
				}
				#text_area::-webkit-scrollbar {
					/*滚动条整体样式*/
					width : 15px;  /*高宽分别对应横竖滚动条的尺寸*/
					height: 1px;
					background-color: #33384B;
				}
				#text_area::-webkit-scrollbar-thumb {
					/*滚动条里面小方块*/
					border-radius   : 10px;
					background-color: #595959;
				}
				#text_area::-webkit-scrollbar-track {
					/*滚动条里面轨道*/
					background   : #7C7C7C;
					border-radius: 10px;
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
			.nav_left{
				display: flex;
				align-items: center;
				.header_nav{
					color: #ffffff;
					font-size: 21px;
					text-align: left;
					margin-right: 62px;
					font-family:'Quicksand-Bold';
					cursor: pointer;
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
				margin-top: 40px;
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
							font-family:'Roboto-Regular';
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
						cursor: pointer;
						font-family:'Roboto-Regular';
						img{
							width: 22px;
							height: auto;
							margin-right: 20px;
						}
					}
				}
			}
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
						width: 11%;
					}
					.header_2{
						width: 21%;
					}
					.header_3{
						width: 15%;
					}
					
					.header_last{
						width: 10%;
						
					}
					
				}
				.table_body{
					font-family:'Roboto-Regular';
					.body_row{
						display: flex;
						align-items: center;
						color: #ffffff;
						font-size: 18px;
						font-family:'Roboto-Regular';
						padding: 5px 0;
						border-bottom: 1px solid #595959;
						height: 60px;
						.col_1{
							width: 11%;
							.text_color{
								color: #FF3131;
							}
								color: #ffffff;
							.text{
							}
						}
						.col_num{
							width: 11%;
							text-align: center;
						}
						.col_2{
							width: 21%;
							.text{
								width: 90%;
							}
						}
						.col_3{
							width: 15%;
						}
						.col_rule{
							width: 11%;
							img{
								width: 28px;
								height: 19px;
								cursor: pointer;
							}
						}
						.col_last{
							text-align: right;
							width: 10%;
							img{
								width: 28px;
								height: 30px;
								text-align: center;
								margin-right: 20px;
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
