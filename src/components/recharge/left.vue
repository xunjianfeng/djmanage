<template>
	<div class="msg_left_index">
		<div class="container">
			<div class="msg_left" @click="reset">
				<div :class="msg_index == 1 ?'msg_left_block msg_left_item':'msg_left_block'" @click="tab_msg(1)">优惠券管理</div>
				<div :class="msg_index == 2 ?'msg_left_block msg_left_item':'msg_left_block'" @click="tab_msg(2)">充值管理</div>
				<div :class="msg_index == 3 ?'msg_left_block msg_left_item':'msg_left_block'" @click="tab_msg(3)">Abuse</div>
				<div :class="msg_index == 4 ?'msg_left_block msg_left_item':'msg_left_block'" @click="tab_msg(4)">轮播管理</div>
				<div :class="msg_index == 5 ?'msg_left_block msg_left_item':'msg_left_block'" @click="tab_msg(5)">FAQ Category</div>
				<div :class="msg_index == 6 ?'msg_left_block msg_left_item':'msg_left_block'" @click="tab_msg(6)">FAQ Question</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"MsgView",
		props: ['index'],
		data(){
			return{
				msg_index:this.index
			}
		},
		mounted() {
			
		},
		methods:{
			reset(){
				this.PageNumber.page_number = 1; //当跳转其他页面时重置页数
			},
			tab_msg(index){
				if(index == 1){
					this.$router.push({ path: '/recharge/coupon'})
				}else if(index == 2){
					this.$router.push({ path: '/recharge/recharge_index'})
				}else if(index == 3){
					this.$router.push({ path: '/recharge/report'})
				}else if(index == 4){
					this.$router.push({ path: '/carousel/index'})
				}else if(index == 5){
					this.$router.push({ path: '/recharge/faq_category'})
				}else if(index == 6){
					this.$router.push({ path: '/recharge/faq_question'})
				}
				this.msg_index = index
			}
		}
	}
</script>

<style lang="less" scoped>
.msg_left_index{
	position:fixed;
	left: 208px;
	top: 100px;
	.container {
		.msg_left {
			width: 200px;
			height: 100vh;
			background-color: #33384B;
			color: #acacac;
			text-align: center;
			font-size: 18px;
			padding-top: 35px;
			.msg_left_block{
				height: 70px;
				color: #949494;
				line-height: 70px;
				cursor: pointer;
			}
			.msg_left_item {
				cursor: pointer;
				color: #FFFFFF;
				background-color: #2A2D41;
			}
		} 
	}
}

</style>
