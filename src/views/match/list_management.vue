<template>
	<div class="index">
		<LeftView :index="3"></LeftView>
		<div class="container">
			<div class="withdraw_container">
				<div class="container_header">
					<div class="nav_left">
						<!-- <div :class="nav_index == 1 ? 'header_nav av':'header_nav'" @click="tab_nav(1)">
							<div class="nav_name">Waiting to Paid(122)</div>
							<div class="nav_line"></div>
						</div> -->
						<div :class="listQuery.state == 1 ? 'header_nav av':'header_nav'" @click="tab_nav(1)">
							<div class="nav_name">Preparing</div>
							<div class="nav_line"></div>
						</div>
						<div :class="listQuery.state == 2 ? 'header_nav av':'header_nav'" @click="tab_nav(2)">
							<div class="nav_name">History</div>
							<div class="nav_line"></div>
						</div>
					</div>
				</div>
				<div class="content_block">
					<div class="content_top">
						<div class="sort_by">
							<div class="sort_by_text">Date of Application</div>
							<div class="options_select">
								<el-select v-model="listQuery.order.create_time" @change="handleFilter" :popper-append-to-body="false">
									<el-option label="Old to New" value="asc"></el-option>
									<el-option label="New to Old" value="desc"></el-option>
								</el-select>							
							</div>
						</div>
						<div class="search_block">
							<div class="search">
								<input placeholder="Seacrh host name" v-model="listQuery.hostName"/>
								<button class="btn" @click="handleFilter">
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
							<div class="header_2">Poster</div>
							<div class="header_3">Tournament Title</div>
							<div class="header_4">Organizer</div>
							<div class="header_5">Tournament Time</div>
							<div class="header_6">Total Prize</div>
							<div class="header_7">Status</div>
						</div>
						<div class="table_body">
							<div class="body_row" v-for="(item,index) in list" :key="index">
								<div class="col_1" @click="jump_prize(item)">{{item.id}}.</div>
								<div class="col_2" @click="jump_prize(item)">
									<img :src="HOST+item.tournamentCover" />
								</div>
								<div class="col_3" @click="jump_prize(item)">
									<div class="text">{{item.tournamentName}}</div>
								</div>
								<div class="col_4" @click="jump_prize(item)">
									<el-image :src="HOST + item.avatar" class="avatar_img">
										<div slot="error" class="image-slot">
											<img src="../../assets/images/default.png" class="avatar_img" />
										</div>
									</el-image>
									<!-- <img :src="HOST+item.avatar" v-if="item.avatar != null && item.avatar != ''"/> -->
									<!-- <img src="../../assets/images/default.png" v-else/> -->
									<div class="text">{{item.fullName}}</div>
								</div>
								<div class="col_5" @click="jump_prize(item)">
									<div class="time_end">END</div>
									<div class="text">{{initDete(item.registrationTimeStart)}}to</div>
									<div class="text">{{initDete(item.registrationTimeEnd)}}</div>
								</div>
								<div class="col_6" @click="jump_prize(item)">
									<div class="text">MYR{{item.bonus}}</div>
								</div>
								<div class="col_7">
									<div class="text">{{item.authenticationStatus==1?'preparing':item.authenticationStatus==2?'history':''}}</div>
									<img src="../../assets/images/up_down.png" />
								</div>
							</div>
						</div>
					</div><!-- content_table -->
					<!-- 分页 -->
					<div class="rank_pagination">
						<pagination v-show="total_count>0" :total="total_count" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="handlePageChange" @page_change="pageChange" />
					</div>
				</div>
			</div><!-- withdraw_container -->
		</div>
	</div>
</template>

<script>
	import {tournamentReward } from '@/api/macth'
	import LeftView from '@/components/match/left.vue'
	import Listing from '@/mixin/Listing';
	import Pagination from '@/components/Pagination'; 
	export default{
		name:"list_management",
		mixins: [Listing],
		components:{
			LeftView,
			Pagination
		},
		data(){
			return{
				nav_index:1,
				value:'1',
				listQuery: {
					state: 1,
					hostName: '',
					order: { create_time: 'desc' },
					page: 1,
					size: 10
				},
				total_count:0,
				list: [],
				options2: [{
						value: '1',
						label: 'New to Old'
					},
					{
						value: '2',
						label: 'Old to New'
					},
				],
				
			}
		},
		mounted() {
			setTimeout(()=>{
				this.listQuery.page = this.PageNumber.page_number;
				this.getList()
			},180)	//当组件跳转时获取全局变量页数进行跳转
		},
		methods:{
			pageChange(value){
				this.PageNumber.page_number = value.page
			},
			getList() {
				tournamentReward(this.listQuery).then(res => {
					const {
						list,
						total
					} = res.data
					this.list = list;
					this.total_count = total;
				})
			},
			handleFilter() {
				this.listQuery.page_index = 1;
				this.getList()
			},
			tab_nav(index){
				this.listQuery.state = index
				this.listQuery.page = 1
				this.getList()
			},
			jump_prize(info){
				this.$router.push({path:'/match/prize_list', query: {info: JSON.stringify(info)}})
			}
		}
	}
</script>

<style lang="less" scoped>
.container {
	background: #33384B;
	margin: 0 56px 0 224px;
	padding-bottom:20px;
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
					cursor: pointer;
					.nav_name{
						height: 35px;
						font-family:'Quicksand-Bold';
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
						cursor: pointer;
						font-family:'Roboto-Bold';
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
					div{
						width: 10%;
					}
					.header_1, .header_2,.header_7{
						width: 10%;
						// background-color: #2A2E3F;
					}
					.header_2{
						// margin-left: 5px;
						// text-align: center;
					}
					.header_5,.header_6{
						width: 15%;
						// background-color: #2A2E3F;
					}
					.header_3{
						width: 23%;
					}
					.header_4{
						width: 17%;
						// background-color: #2A2E3F;
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
						.col_1,.col_2,.col_7{
							width: 10%;
						}
						.col_5,.col_6{
							width: 15%;
							cursor: pointer;
						}
						.col_1{
							text-align: center;
							cursor: pointer;
						}
						.col_3{
							width: 23%;
							font-size: 18px;
							color: #FFFFFF;
							text-decoration: underline;
							cursor: pointer;
						}
						.col_2{
							cursor: pointer;
							img{
								width: 78px;
								height: 78px;
							}
						}
						.col_4{
							width: 17%;
							display: flex;
							align-items: center;
							cursor: pointer;
							.avatar_img{
								width: 35px;
								height: 35px;
								margin-right: 10px;
								object-fit: cover;
							}
							.text{
								text-decoration: underline;
							}
						}
						.col_5{
							.time_end{
								color: #D3AA53;
							}
						}
						.col_7{
							display: flex;
							align-items: center;
							color: #23B709;
							img{
								width: 12px;
								height: 12px;
								margin-left: 5px;
							}
						}
					}
				}
			}//content_table
			.rank_pagination {
				margin: 32px 0 0px 0px;
				display: flex;
				justify-content: flex-end;
			}
		}//content_block
	}
}
</style>
