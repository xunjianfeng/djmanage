<template>
	<div class="index">
		<integView :index="2"></integView>
		<div class="container">
			<div class="top_tabs">
				<div class="tabs_block" @click="jump_rules(1)">积分管理  /</div>
				<div class="tabs_block">积分规则</div>
			</div>
			<div class="rules_container">
				<div class="rules_head">
					<div class="screen_title">
						<div class="screen_text">积分规则</div>
					</div>
				</div>
				<div class="rules_content">
					<div class="rules_form_block">
						<div class="rules_left">充值赠送</div>
						<div class="rules_right">
							<div class="rulse_table">
								<div class="table_line">
									<div class="table_left">充值每满</div>
									<div class="table_right">
										<div class="table_input">
											<input type="number" maxlength="3" class="rechage_input">
											<div class="input_text2">RM</div>
										</div>
									</div>
								</div>
								<div class="table_line">
									<div class="table_left">赠送积分</div>
									<div class="table_right">
										<div class="table_input">
											<input type="number" maxlength="3" class="rechage_input"> 
											<div class="input_text">积分</div>
										</div>
									</div>
								</div>
								<div class="table_line">
									<div class="table_left">状态</div>
									<div class="table_right">
										<div class="table_raido">
											 <el-radio v-model="radio1" label="1">启用</el-radio>
											  <el-radio v-model="radio1" label="2">禁用</el-radio>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="rules_form_block">
						<div class="rules_left">赛事赠送</div>
						<div class="rules_right">
							<div class="rulse_table">
								<div class="table_line">
									<div class="line_title">成功报名赛事</div>
								</div>
								<div class="table_line">
									<div class="table_left">赠送积分</div>
									<div class="table_right">
										<div class="table_input">
											<input type="number" maxlength="3" class="rechage_input"> 
											<div class="input_text">积分</div>
										</div>
									</div>
								</div>
								<div class="table_line">
									<div class="table_left">状态</div>
									<div class="table_right">
										<div class="table_raido">
											 <el-radio v-model="radio2" label="1">启用</el-radio>
											  <el-radio v-model="radio2" label="2">禁用</el-radio>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="rules_form_block">
						<div class="rules_left">积分抵扣</div>
						<div class="rules_right">
							<div class="rulse_table">
								<div class="table_line">
									<div class="line_title">商品/陪玩下单抵扣</div>
								</div>
								<div class="table_line">
									<div class="table_left">
										<div class="table_input" >
											<div class="input_text">每使用</div>
											<input type="number" maxlength="3" class="rechage_input2"> 
											<div class="input_text">积分</div>
										</div>
									</div>
									<div class="table_right">
										<div class="table_input" style="margin-left: -31px;">
											<div class="input_text">可抵扣</div>
											<input type="number" maxlength="3" class="rechage_input2"> 
											<div class="input_text">积分</div>
										</div>
									</div>
								</div>
								<div class="table_line">
									<div class="table_left">状态</div>
									<div class="table_right">
										<div class="table_raido">
											 <el-radio v-model="radio3" label="1">启用</el-radio>
											  <el-radio v-model="radio3" label="2">禁用</el-radio>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import integView from '@/components/integral/left.vue';
	export default {
		name: "rule",
		components: {
		    integView
		},
		data() {
			return {
				radio1: '1',
				radio2: '1',
				radio3: '1'
			}
		},
		methods: {
			jump_rules(index){
				if(index == 1){
					this.$router.push({ path: '/user/integral'})
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
						font-family:'Roboto-Bold';
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
						font-size: 16px;
						font-family:'Roboto-Bold';
						color: #FFFFFF;
						margin-right: 16px;
						margin-left: 56px;
					}
					.rules_right{
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
									color: #FFFFFF;
									border-radius: 3px 3px 0px 0px;
									margin-right: 1px;
									.table_input{
										display: flex;
										align-items: center;
										.rechage_input{
											width: 168px;
											height: 32px;
											padding: 0 20px;
											border-radius: 2px;
											color: #fff;
											background: #474C5D;
											border: 1px solid #FFFFFF;
											margin: 0 12px;
											font-family:'Roboto-Regular';
										}
										.rechage_input2{
											width: 158px;
											height: 32px;
											padding: 0 20px;
											border-radius: 2px;
											color: #fff;
											background: #474C5D;
											font-family:'Roboto-Regular';
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
										.rechage_input{
											width: 168px;
											height: 32px;
											color: #fff;
											font-family:'Roboto-Regular';
											padding: 0 20px;
											border-radius: 2px;
											background: #474C5D;
											border: 1px solid #FFFFFF;
											margin: 0 12px;
										}
										.rechage_input2{
											width: 168px;
											height: 32px;
											color: #fff;
											padding: 0 20px;
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
