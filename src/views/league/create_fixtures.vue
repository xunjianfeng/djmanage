<template>
	<div class="index" id="wangeditor">
		<div class="container">
			<div class="predict_container">
				<!-- 内容 -->
				<div class="predict_content">
					<div class="predict_head">
						<div class="predict_back" @click="go_back">
							<span><<</span> Fixtures
						</div> 
					</div>
					<!-- 添加比赛日 -->
					<div class="add_fixuter" @click="add_matchDays">
						<img src="../../assets/images/add_fff.png" alt="">
					</div>
					<div class="fixture_content"  v-for="(ftem,fndex) in dataForm" :key="fndex">
						<div class="fixture_active2">
							<div class="rule_container">
								<el-form ref="dataForm"   :label-position="labelPosition" >
									<div >
										<el-form-item label="Matchday" >
											<div class="fix_block">
												<el-input v-model="ftem.no"  style="width: 872px;"></el-input>
												<div class="fix_remove" @click="del_matchDays(fndex)">Remove</div>
											</div>
										</el-form-item>
										<el-form-item >
											<div class="team_container">
												<div class="team_list" v-for="(items,indexs) in ftem.fixtures" :key="indexs">
													<div class="team_block">
														<div class="team_del">
															<img src="../../assets/images/cancel.png"  @click="del_mode(fndex,indexs)" alt="">
														</div>
														<div class="info_container">
															<div class="info_top">
																<div class="info_block">
																	<div class="info_text">Date</div>
																	<div class="info_select">
																		<el-date-picker
																		  v-model="items.date"
																		  type="date"
																		  value-format="yyyy-MM-dd"
																		  style="width: 340px;"
																		  placeholder="选择日期"
																		  :picker-options="pickerOptions0"
																		  >
																		</el-date-picker>
																	</div>
																</div>
																<div class="info_block">
																	<div class="info_text">Time</div>
																	<div class="info_select">
																		<el-time-select
																		  v-model="items.time"
																		  style="width: 340px;"
																		  placeholder="选择时间"
																		  :picker-options="{
																		      start: '00:00',
																		      step: '00:15',
																		      end: '23:59'
																		    }"
																		  >
																		</el-time-select>
																	</div>
																</div>
																
															</div>
															<div class="info_down">
																<div class="info_block">
																	<div class="info_text">Team</div>
																	<div class="info_team">
																		<img class="info_radio" src="../../assets/images/radiu2.png" alt="" >
																		<el-select v-model="items.team1Id" placeholder="请选择" style="width: 340px;" :popper-append-to-body="false">
																			<el-option :label="item1.teamName" :value="item1.teamId" v-for="item1 in team_list"  ></el-option>
																		</el-select>
																	</div>
																</div>
																<div class="info_block">
																	<div class="info_text">Team</div>
																	<div class="info_team">
																		<img class="info_radio" src="../../assets/images/radiu2.png" alt="" >
																		<el-select v-model="items.team2Id" placeholder="请选择" style="width: 340px;" :popper-append-to-body="false">
																			<el-option :label="item1.teamName" :value="item1.teamId" v-for="item1 in team_list"  ></el-option>
																		</el-select>
																	</div>
																</div>
																														
															</div>
															
														</div>
													</div>
												</div>
												
												<div class="team_add" @click="add_mode(fndex)">
													<img src="../../assets/images/add_fff.png" alt="">
												</div>
											</div>
										</el-form-item>
									</div>
								
								</el-form>
							</div>
						</div>
						
					</div>
					<div class="fixture_btn">
						<div class="last_step" @click="onSubmit()">Save</div>
						<div class="nex_step" @click="go_back()">Back</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import Tinymce from '@/components/Tinymce';
	import { addFixtureBatch,delmMatchDay,delFixture,leagueTeamList } from '@/api/league.js';
	// import {listTeam} from '@/api/play.js';
	export default {
		name: "create_fixtures",
		components: {
			Tinymce
		},
		data() {
			return {
				dataForm: [
					{
						no: '',
						fixtures: [
							{playTime: '',team1Id: '',team2Id: ''},
						]
					}
				],
				edit: '',
				labelPosition:'top',
				team_list: '',
				pickerOptions0: {
					//报名开始时间
					disabledDate: (time) => {
						return time.getTime() < Date.now() - 8.64e7;//不能选择当前时间之前的时间
					}
				},
			};
		},
		mounted() {
			// 战队列表
			this.listTeam()
		},
		methods: {
			//新增比赛日
			add_matchDays(){
				// 添加时 移除time 和date 字段
				this.dataForm.push({no: '',fixtures: [{playTime: '',team1Id: '',team2Id: '' ,time: '' ,date: ''},]})
			},
			//新增对局
			add_mode(index){
				this.dataForm[index]['fixtures'].push({playTime: '',team1Id: '',team2Id: '' ,time: '' ,date: ''})
			},
			//删除比赛日
			del_matchDays(fndex){
				// this.$message({
				//   message: '您已删除比赛日',
				//   type: 'success'
				// });
				this.dataForm.splice(fndex,1)
				
				// 后面有修改为用接口恢复注释
				// console.log(fndex)
				// let params = {
				// 	matchDayId:fndex
				// }
				// delmMatchDay(params).then(res => {
				// })
				// console.log(params)
				
			},
			//删除对局
			del_mode(index,indexs){
				// this.$message({
				//   message: '您已删除对局',
				//   type: 'success'
				// });
				this.dataForm[index]['fixtures'].splice(indexs,1)
				// 后面有修改为用接口恢复注释
				// let params = {
				// 	fixtureId:indexs
				// }
				// console.log(params)
				// delFixture(params).then(res => {
				// 	// console.log(res)
				// })
			},
			go_back(){
				this.$router.go(-1) 
			},
			// 批量添加比赛日和对局
			onSubmit () {
				let match_form = this.dataForm
				for ( let i in match_form ) {
					for ( let j in match_form[i]['fixtures'] ) {
						let tdate = match_form[i]['fixtures'][j]['date']
						let ttime = match_form[i]['fixtures'][j]['time']
						if ( !match_form[i]['fixtures'][j]['date'] ) {
							this.$message({
							  message: '请选择对局日期',
							  type: 'warning'
							});
							return false
						}
						match_form[i]['fixtures'][j]['playTime'] = tdate + ' ' + (ttime?ttime+':00':'00:00:00')
						let {date,time,...parmays} = match_form[i]['fixtures'][j];
						match_form[i]['fixtures'][j] = parmays
					}
				}
				let params = {
					leagueId: this.$route.query.id||'',
					matchDays: this.dataForm
				}
				addFixtureBatch(params).then(res => {
					if(res.code == 200){
						this.$message({
						  message: res.message,
						  type: 'success'
						});
						// this.$router.go(-1) 
						this.$router.push({
							path: '/league/fixtures',
							query:{id:this.$route.query.id}
						})
					}else{
						this.$message({
						  message: res.message,
						  type: 'error'
						});
					}
					
				})
			},
			// 战队列表
			listTeam() {
				let params = {
					leagueId:this.$route.query.id
				}
				console.log(params)
				leagueTeamList(params).then(res => {
					this.team_list = res.data
					// console.log(this.team_list)
				})
			},
		}
	};
</script>

<style lang="less" scoped>
	/deep/ .el-select .el-input .el-input__inner {
		border: 0px;
		background-color: #33384B;
		border: 1px solid #ffffff;
		color: #FFFFFF;
	}
	
	/deep/ .el-select .el-input .el-input__inner:focus {
		color: #FFFFFF;
	}
	
	/deep/ .el-select-dropdown {
		background-color: #33384B;
		border: 1px solid rgba(255,255,255,0.2);
		color: #FFFFFF;
	}
	
	//修改单个的选项的样式
	/deep/ .el-select-dropdown__item {
		background-color: transparent;
		color: #FFFFFF;
		text-align: center;
	}
	/deep/ .el-select-dropdown__item.hover{
		background-color: #545873;
	}
	/deep/ .el-select-dropdown__item.selected{
		background-color: #545873;
	}
</style>
<style lang="less" scoped>
	.container {
		width: 93%;
		margin: 0 84px 0 45px;
		padding: 0 0 40px 0;
		color: #fff;
		/deep/.el-input__inner {
			color: #fff;
			height: 51px;
			background-color: #0E0F11;
		}
		/deep/.el-form-item__label {
			color: #919191;
		}
		/deep/.el-form-item {
			margin-bottom: 20px;
		}
		.predict_container {
			.predict_content {
				.predict_head {
					display: flex;
					align-items: center;
					margin-bottom: 26px;
					.predict_back {
						color: #FFFFFF;
						font-size: 21px;
						margin-right: 246px;
						cursor: pointer;
						font-family:'Quicksand-Regular';
						span {
							margin-right: 26px;
						}
					}
				}
				.add_fixuter{
					height: 106px;
					background: #0E0F11;
					border-radius: 7px;
					display: flex;
					align-items: center;
					justify-content: center;
					margin: 0 0 40px 30px;
					img{
						width: 35px;
						cursor: pointer;
					}
				}
				.fixture_content {
					padding: 36px 0 62px 0 ;
					border-radius: 19px;
					background-color: #0E0F11;
					margin-bottom:50px;
					margin-left: 30px;
					.fixture_active2 {
						margin-left: 80px;
						margin-bottom:50px;
						// background-color: #0E0F11;
						.rule_container {
							.fix_block{
								display: flex;
								justify-content: space-between;
								.fix_remove{
									color: #FF2F06;
									font-size: 18px;
									font-weight: bold;
									margin-right: 43px;
									cursor: pointer;
									font-family:'Roboto-Bold';
								}
							}
							
							.team_container{
								.team_add{
									width: 982px;
									height: 61px;
									background: #1B2023;
									border-radius: 6px;
									display: flex;
									align-items: center;
									justify-content: center;
									cursor: pointer;
									img{
										width: 21px;
									}
								}
								.team_list{
									.team_block{
										width: 982px;
										// height: 316px;+
										
										background: #1C2023;
										border-radius: 4px;
										margin-bottom: 26px;
										.team_del{
											padding-right: 30px;
											text-align: right;
											img{
												margin-top: 16px;
												width: 21px;
												cursor: pointer;
											}
										}
										.info_container{
											padding: 0 60px 0 50px;											
											.info_top{
												display: flex;
												/deep/.el-input__inner {
													background-color:#1B2023 ;
													font-family:'Roboto-Regular';
												}
												.info_block{
													margin-right: 50px;
													margin-bottom: 30px;
													.info_text{
														color: #909090;
														font-size: 16px;
														font-family:'Roboto-Regular';
													}
													.info_team{
														position: relative;
														.info_radio{
															width: 26px;
															height: 26px;
															border-radius: 50%;
															position: absolute;
															left: 8px;
															top: 14px;
															z-index: 99;
														}
														/deep/.el-input__inner {
															padding: 0 35px  0 40px;
															font-family:'Roboto-Regular';
														}
														
													}
												}
											}
											.info_down{
												display: flex;
												/deep/.el-input__inner {
													background-color:#1B2023 ;
													font-family:'Roboto-Regular';
												}
												.info_block{
													margin-right: 50px;
													margin-bottom: 30px;
													.info_text{
														color: #909090;
														font-size: 16px;
														font-family:'Roboto-Regular';
													}
													.info_team{
														position: relative;
														.info_radio{
															width: 26px;
															height: 26px;
															border-radius: 50%;
															position: absolute;
															left: 8px;
															top: 14px;
															z-index: 99;
														}
														/deep/.el-input__inner {
															padding: 0 35px  0 40px;
															font-family:'Roboto-Regular';
														}
														
													}
												}
											}
											
											// .info_block{
											// 	margin-right: 50px;
											// 	margin-bottom: 30px;
											// 	.info_text{
											// 		color: #909090;
											// 		font-size: 16px;
											// 		font-family:'Roboto-Regular';
											// 	}
											// 	.info_team{
											// 		position: relative;
											// 		.info_radio{
											// 			width: 26px;
											// 			height: 26px;
											// 			border-radius: 50%;
											// 			position: absolute;
											// 			left: 8px;
											// 			top: 14px;
											// 			z-index: 99;
											// 		}
											// 		/deep/.el-input__inner {
											// 			padding: 0 35px  0 40px;
											// 			font-family:'Roboto-Regular';
											// 		}
													
											// 	}
											// }
											.info_block:nth-child(2n){
												margin-right: 0px;
											}
										}
									}
								}
							}
						
						}
					}
											
				}
				.fixture_btn {
					display: flex;
					font-size: 20px;
					margin: 91px 0 15px 110px;
					// font-family: PingFangSC-Regular, PingFang SC;
					font-family:'Roboto-Regular';
					font-weight: 400;
					.last_step {
						width: 163px;
						height: 58px;
						color: #0E0F11;
						background: #D3AA53;
						border-radius: 25px;
						border: 1px solid #D3AA53;
						cursor: pointer;
						display: flex;
						align-items: center;
						justify-content: center;
						margin-right: 20px;
					}
					.nex_step {
						width: 163px;
						height: 58px;
						color: #FFFFFF;
						background-color: #0E0F11;
						border: 1px solid #777777;
						border-radius: 25px;
						cursor: pointer;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
				
			}
		}
	}
</style>
