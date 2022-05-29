<template>
	<div class="goods_left_index">
		<div class="container">
			<div class="goods_left" @click="reset">
				<div :class="goods_index == 1 ?'goods_left_block goods_left_item':'goods_left_block'" @click="tab_goods(1)">商品管理</div>
				<div :class="goods_index == 2 ?'goods_left_block goods_left_item':'goods_left_block'" @click="tab_goods(2)">商品分类</div>
				<!-- <div :class="goods_index == 3 ?'goods_left_block goods_left_item':'goods_left_block'" @click="tab_goods(3)">运费模板</div> -->
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"GoodsView",
		props: ['index'],
		data(){
			return{
				goods_index:this.index
			}
		},
		mounted() {
			
		},
		methods:{
			reset(){
				this.PageNumber.page_number = 1; //当跳转其他页面时重置页数
			},
			tab_goods(index){
				if(index == 1){
					this.$router.push({ path: '/goodsManagement/goods_manage'})
				}else if(index == 2){
					this.$router.push({ path: '/goodsManagement/goods_class'})
				}else if(index == 3){
					this.$router.push({ path: '/goodsManagement/freight'})
				}
				this.goods_index = index
			}
		}
	}
</script>

<style lang="less" scoped>
.goods_left_index{
	position:fixed;
	left: 208px;
	top: 100px;
	.container {
		.goods_left {
			width: 200px;
			height: 100vh;
			background-color: #33384B;
			color: #acacac;
			text-align: center;
			font-size: 18px;
			padding-top: 35px;
			.goods_left_block{
				height: 70px;
				color: #949494;
				line-height: 70px;
				cursor: pointer;
				font-family:'Roboto-Regular';
			}
			.goods_left_item {
				cursor: pointer;
				color: #FFFFFF;
				background-color: #2A2D41;
				font-family:'Roboto-Bold';
			}
		} 
	}
}

</style>
