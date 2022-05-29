<template>
	<div class="index">
		<div class="container">
			<div class="back_up_container">
				<div class="back_up_block">
					<img src="../../assets/images/back-up.png" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"back-up",
		data(){
			return{
				
			}
		}
	}
</script>

<style lang="less" scoped>
.container {
	width: 93%;
	// background: #33384B;
	margin: 0 56px;
	padding-bottom: 100px;
	.back_up_container{
		display: flex;
		justify-content: center;
		margin-top: 100px;
		.back_up_block{
			width: 443px;
			height: 464px;
			border: 1px dashed #7A8493;
			display: flex;
			align-items: flex-end;
			justify-content: center;
			img{
				width: 400px;
				height: 400px;
			}
		}
	}
}
</style>
