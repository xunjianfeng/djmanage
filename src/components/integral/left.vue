<template>
	<div class="play_left_index">
		<div class="container">
			<div class="play_left" @click="reset">
				<div :class="play_index == 1 ?'play_left_block play_left_item':'play_left_block'" @click="tab_play(1)">用户积分</div>
				<div :class="play_index == 3 ?'play_left_block play_left_item':'play_left_block'" @click="tab_play(3)">用户Coin</div>
				<!-- <div :class="play_index == 2 ?'play_left_block play_left_item':'play_left_block'" @click="tab_play(2)">积分规则</div> -->
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"integView",
		props: ['index'],
		data(){
			return{
				play_index:this.index
			}
		},
		mounted() {
			
		},
		methods:{
			reset(){
				this.PageNumber.page_number = 1; //当跳转其他页面时重置页数
			},
			tab_play(index){
				if(index == 1){
					this.$router.push({ path: '/user/integral'})
				}else if(index == 2){
					this.$router.push({ path: '/user/rule'})
				}else if(index == 3){
					this.$router.push({ path: '/user/coin'})
				}
				this.play_index = index
			}
		}
	}
</script>

<style lang="less" scoped>
.play_left_index{
	position:fixed;
	left: 208px;
	top: 100px;
	.container {
		.play_left {
			width: 200px;
			height: 100vh;
			background-color: #33384B;
			color: #acacac;
			text-align: center;
			font-size: 18px;
			padding-top: 35px;
			.play_left_block{
				height: 70px;
				color: #949494;
				line-height: 70px;
				cursor: pointer;
			}
			.play_left_item {
				cursor: pointer;
				color: #FFFFFF;
				background-color: #2A2D41;
			}
		} 
	}
}

</style>
