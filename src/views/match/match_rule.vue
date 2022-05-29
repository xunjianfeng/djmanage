<template>
	<div class="index">
		<MatchView :index="6"></MatchView>
		<div class="container">
			<div class="top_tabs">
				<div class="tabs_block" @click="jump_rules(1)">赛事管理  /</div>
				<div class="tabs_block">报名费规则</div>
			</div>
			<div class="rules_container">
				<div class="rules_head">
					<div class="screen_title">
						<div class="screen_text">报名费规则</div>
					</div>
				</div>
				<div class="rules_content">
					<div class="rules_form_block">
						<div class="rules_left">报名费规则配置</div>
						<div class="rules_right">
							<div class="rulse_table">
								<div class="table_line">
									<div class="line_title">手续费收取</div>
								</div>
								<div class="table_line">
									<div class="table_left2">
										<div class="table_input">
											<el-radio v-model="listQuery.serviceChargeModel" :disabled="listQuery.serviceChargeModel == 'value' && rule_status == 1"  label="ratio" >按比例</el-radio>
											<input type="number" :disabled="rule_status == 1" maxlength="3" class="rechage_input" v-model="listQuery.serviceChargeRatio"> 
											
										</div>
									</div>
									<div class="table_right">
										<div class="table_input">
											<el-radio v-model="listQuery.serviceChargeModel" :disabled="listQuery.serviceChargeModel == 'ratio' && rule_status == 1"  label="value">固定值</el-radio>
											<input type="number" :disabled="rule_status == 1" maxlength="3" class="rechage_input" v-model="listQuery.serviceChargeValue"> 
											<div class="input_text">Coins</div>
										</div>
									</div>
								</div>
								<div class="table_line">
									<div class="table_left">状态</div>
									<div class="table_right">
										<div class="table_raido">
											 <el-radio v-model="listQuery.enable" :label="true">启用</el-radio>
											  <el-radio v-model="listQuery.enable" :label="false">禁用</el-radio>
										</div>
									</div>
								</div>
							</div>
							 <el-button type="primary" style="margin: 15px 0 ;"  @click="rule_status = 2" v-if="rule_status == 1">编辑</el-button>
							 <el-button type="primary" style="margin: 15px 0 ;"  @click="save_deploy" v-else>保存</el-button>
						</div>
					</div>
					<!-- <div class="rules_form_block">
						<div class="rules_left">赛事认证押金规则配置</div>
						<div class="rules_right">
							<div class="rulse_table">
								<div class="table_line">
									<div class="table_left">
										<div class="table_input" >
											<div class="input_text">低于</div>
											<input type="text" maxlength="3" class="rechage_input2"> 
											<div class="input_text">RM</div>
										</div>
									</div>
									<div class="table_right">
										<div class="table_input" style="margin-left: -31px;">
											<el-select v-model="form.region" placeholder=""></el-select>
										</div>
									</div>
								</div>
								<div class="table_line">
									<div class="table_left">
										<div class="table_input" >
											<div class="input_text">超出</div>
											<input type="text" maxlength="3" class="rechage_input2"> 
											<div class="input_text">积分</div>
										</div>
									</div>
									<div class="table_right">
										<div class="table_input" style="margin-left: -31px;">
											<el-select v-model="form.region2" placeholder=""></el-select>
										</div>
									</div>
								</div>
								<div class="table_line">
									<div class="table_left">状态</div>
									<div class="table_right">
										<div class="table_raido">
											 <el-radio v-model="radio" label="1">启用</el-radio>
											  <el-radio v-model="radio" label="2">禁用</el-radio>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div> -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import MatchView from '@/components/match/left.vue';
	import {
		tournamentProfile,
		ProfileAdd 
	} from '@/api/macth'
	export default {
		name: "match_rule",
		components: {
		    MatchView
		},
		data() {
			return {
				radio: '1',
				listQuery:{
					id:'',
					serviceChargeRatio:'',
					serviceChargeValue:'',
					serviceChargeModel:'', //ratio/value 比率/值
					depositMin:'',
					depositMax:'',
					enable:''
				},
				rule_status:1, // 1查看  2编辑
			}
		},
		mounted() {
			this.get_deploy();
		},
		methods: {
			// 设置配置
			save_deploy(){
				let that = this;
				if(that.listQuery.serviceChargeModel == 'ratio'){
					that.listQuery.serviceChargeValue = ''
				}else{
					that.listQuery.serviceChargeRatio = ''
				}
				if(that.listQuery.serviceChargeRatio > 1){
					this.$message({
					  message: '警告哦，这是一条警告消息',
					  type: 'warning'
					});
					return false
				}
				ProfileAdd(that.listQuery).then(res => {
					this.$message({
					  message: res.message,
					  type: 'success'
					});
					that.get_deploy();
					that.rule_status = 1;
				})
			},
			// 获取配置
			get_deploy(){
				let that = this;
				tournamentProfile().then(res => {
					that.listQuery = res.data
					console.log(that.listQuery.serviceChargeModel)
				})
			},
			jump_rules(index){
				if(index == 1){
					this.$router.push({ path: '/match/index'})
				}else if(index == 2){
					// this.$router.push({ path: '/ruleswith/rules_details'})
				}
			},
		}
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
				cursor: pointer;
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
		.rules_container {
			.rules_head {
				padding: 30px 30px 0px 30px;
				.screen_title {
					disrules: flex;
					align-items: center;
					margin-bottom: 27px;
					.screen_text {
						font-size: 18px;
						font-family:'Quicksand-Bold';
						color: #FFFFFF;
					}
				}
			}
			.rules_content {
				margin: 24px 24px 0px 24px;
				.rules_form_block{
					display: flex;
					margin-bottom: 56px;
					.rules_left{
						width: 13%;
						text-align: right;
						font-size: 16px;
						font-family:'Roboto-Regular';
						font-weight: 500;
						color: #FFFFFF;
						margin-right: 16px;
					}
					.rules_right{
						width: 87%;
						.rulse_table{
							.table_line{
								display: flex;
								margin-bottom: 1px;
								.line_title{
									width: 100%;
									display: flex;
									align-items: center;
									justify-content: center;
									height: 54px;
									background: #474C5D;
									font-size: 16px;
									font-family:'Roboto-Regular';
									font-weight: 500;
									color: #FFFFFF;
								}
								.table_left{
									width: 397px;
									height: 54px;
									padding-left: 235px;
									background: #474C5D;
									display: flex;
									align-items: center;
									font-size: 14px;
									font-family:'Roboto-Regular';
									font-weight: 400;
									color: #FFFFFF;
									border-radius: 3px 3px 0px 0px;
									margin-right: 1px;
									.table_input{
										display: flex;
										align-items: center;
										/deep/ .el-input__inner{
											background-color: #474C5D;
										}
										/deep/ .el-radio{
											color: #fff;
										}
										.rechage_input{
											width: 168px;
											height: 32px;
											padding: 0 20px;
											border-radius: 2px;
											background: #474C5D;
											color: #fff;
											border: 1px solid #FFFFFF;
											margin: 0 12px;
										}
										.rechage_input2{
											width: 158px;
											height: 32px;
											padding: 0 20px;
											border-radius: 2px;
											color: #fff;
											background: #474C5D;
											border: 1px solid #FFFFFF;
											margin: 0 12px 0 12px;
										}
										.input_text{
											font-size: 16px;
											font-family:'Roboto-Regular';
											font-weight: 400;
											color: #FFFFFF;
										}
										.input_text2{
											font-size: 16px;
											font-family:'Roboto-Regular';
											font-weight: 400;
											color: #FFFFFF;
											margin-left: 5px;
										}
									}
								}
								.table_left2{
									width: 640px;
									height: 54px;
									// padding-left: 235px;
									background: #474C5D;
									display: flex;
									align-items: center;
									justify-content: center;
									font-size: 14px;
									font-family:'Roboto-Regular';
									font-weight: 400;
									color: #FFFFFF;
									border-radius: 3px 3px 0px 0px;
									.table_input{
										display: flex;
										align-items: center;
										/deep/ .el-input__inner{
											background-color: #474C5D;
										}
										/deep/ .el-radio{
											color: #fff;
										}
										.rechage_input{
											width: 168px;
											height: 32px;
											padding: 0 20px;
											color: #fff;
											border-radius: 2px;
											background: #474C5D;
											border: 1px solid #FFFFFF;
											margin: 0 12px;
										}
										.rechage_input2{
											width: 158px;
											height: 32px;
											padding: 0 20px;
											color: #fff;
											border-radius: 2px;
											background: #474C5D;
											border: 1px solid #FFFFFF;
											margin: 0 12px 0 12px;
										}
										.input_text{
											font-size: 16px;
											font-family:'Roboto-Regular';
											font-weight: 400;
											color: #FFFFFF;
										}
										.input_text2{
											font-size: 16px;
											font-family:'Roboto-Regular';
											font-weight: 400;
											color: #FFFFFF;
											margin-left: 5px;
										}
									}
								}
								.table_right{
									width: 620px;
									height: 54px;
									background: #474C5D;
									display: flex;
									align-items: center;
									justify-content: center;
									font-size: 14px;
									font-family:'Roboto-Regular';
									font-weight: 400;
									color: #FFFFFF;
									border-radius: 3px 3px 0px 0px;
									.table_input{
										display: flex;
										align-items: center;
										/deep/ .el-input__inner{
											background-color: #474C5D;
										}
										/deep/ .el-radio{
											color: #fff;
										}
										.rechage_input{
											width: 168px;
											height: 32px;
											padding: 0 20px;
											color: #fff;
											border-radius: 2px;
											background: #474C5D;
											border: 1px solid #FFFFFF;
											margin: 0 12px;
										}
										.rechage_input2{
											width: 168px;
											height: 32px;
											padding: 0 20px;
											color: #fff;
											border-radius: 2px;
											background: #474C5D;
											border: 1px solid #FFFFFF;
											margin: 0 12px 0 12px;
										}
										.input_text{
											font-size: 16px;
											font-family:'Roboto-Regular';
											font-weight: 400;
											color: #FFFFFF;
										}
										.input_text2{
											font-size: 16px;
											font-family:'Roboto-Regular';
											font-weight: 400;
											color: #FFFFFF;
											margin-left: 5px;
										}
									}
								}
							}
							.table_line:last-child{
								margin-bottom: 0;
							}
						}
					}
				}

				
			}
		}
	}
</style>
