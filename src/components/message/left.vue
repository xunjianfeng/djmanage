<template>
	<div class="msg_left_index">
		<div class="container">
			<div class="msg_left" @click="reset">
				<div :class="msg_index == 1 ?'msg_left_block msg_left_item':'msg_left_block'" @click="tab_msg(1)">消息推送</div>
				<div :class="msg_index == 2 ?'msg_left_block msg_left_item':'msg_left_block'" @click="tab_msg(2)">历史消息</div>
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
					this.$router.push({ path: '/message/msg_push'})
				}else if(index == 2){
					this.$router.push({ path: '/message/past_times'})
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
