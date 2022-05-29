<template>
	<div class="match_left_index">
		<div class="container">
			<div class="match_left" @click="reset">
				<div :class="match_index == 1 ?'match_left_block match_left_item':'match_left_block'" @click="tab_match(1)">赛事列表</div>
				<div :class="match_index == 2 ?'match_left_block match_left_item':'match_left_block'" @click="tab_match(2)">添加游戏</div>
				<div :class="match_index == 5 ?'match_left_block match_left_item':'match_left_block'" @click="tab_match(5)">战队列表</div>
				<div :class="match_index == 3 ?'match_left_block match_left_item':'match_left_block'" @click="tab_match(3)">认证奖品列表</div>
				<div :class="match_index == 6 ?'match_left_block match_left_item':'match_left_block'" @click="tab_match(6)">赛事财务规划</div>
				<div :class="match_index == 4 ?'match_left_block match_left_item':'match_left_block'" @click="tab_match(4)">主持人报名费列表</div>
				
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"MatchView",
		props: ['index'],
		data(){
			return{
				match_index:this.index
			}
		},
		mounted() {
			
		},
		methods:{
			reset(){
				this.PageNumber.page_number = 1; //当跳转其他页面时重置页数
				this.PageNumber.page_type = "";
				this.PageNumber.page_status = ""; 
				this.PageNumber.page_class = ""; 
				this.PageNumber.page_name = ""; 
				this.PageNumber.judge = 0; 
			},
			tab_match(index){
				if(index == 1){
					this.$router.push({ path: '/match/index'})
				}else if(index == 2){
					this.$router.push({ path: '/match/game_management'})
				}else if(index == 3){
					this.$router.push({ path: '/match/list_management'})
				}else if(index == 4){
					this.$router.push({ path: '/match/withdraw_management'})
				}else if(index == 5){
					this.$router.push({ path: '/match/team_list'})
				}else if(index == 6){
					this.$router.push({ path: '/match/match_rule'})
				}
				this.match_index = index
			}
		}
	}
</script>

<style lang="less" scoped>
.match_left_index{
	position:fixed;
	left: 208px;
	top: 100px;
	.container {
		.match_left {
			width: 200px;
			height: 100vh;
			background-color: #33384B;
			color: #acacac;
			text-align: center;
			font-size: 18px;
			padding-top: 35px;
			.match_left_block{
				height: 70px;
				color: #949494;
				line-height: 70px;
				cursor: pointer;
			}
			.match_left_item {
				cursor: pointer;
				color: #FFFFFF;
				background-color: #2A2D41;
			}
		} 
	}
}

</style>
