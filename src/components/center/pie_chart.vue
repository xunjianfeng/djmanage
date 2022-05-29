<template>
	<div class="index">
		<div class="container">
			<div id="PieChart" :style="{ height: '440px'}"></div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"pie_chart",
		data(){
			return{
				
			}
		},
		mounted() {
			this.drawLine()
		},
		methods: {
			drawLine() {
				let PieChart = this.$echarts.init(document.getElementById("PieChart"));
				var option;
				var color = [ "#228BE1","#45F277","#FF6161"];
				option = {
				    tooltip: {
				        trigger: 'item'
				    },
					color : [ "#228BE1","#45F277","#FF6161"],
				    legend: {
						textStyle:{color:"#ffffff"},
						orient: 'vertical',
						right: 30,
						top: 20,
						bottom: 20,
				    },
				    series: [
				        {
				            type: 'pie',
				            radius: ['40%', '70%'],
				            avoidLabelOverlap: false,
				            label: {
				                show: false,
				                position: 'center'
				            },
				            emphasis: {
				                label: {
				                    show: true,
				                    fontSize: '40',
				                    fontWeight: 'bold'
				                }
				            },
							
				            labelLine: {
				                show: false
				            },
				            data: [
				                {value: 56, name: '赛事定金',formatter: '{b}\n{c}%'},
				                {value: 20, name: '商品下单'},
				                {value: 16, name: '陪玩下单'}
				            ],
							// itemStyle: {  
							// 	normal: {  
							// 		label: {  
							// 			// show: true,  
							// 			// position: 'top',  
							// 			formatter: '{b}\n{c}%'  
							// 		}  
							// 	}  
							// }, 
				        }
				    ]
				};
				option && PieChart.setOption(option);
			}
		}
	}
</script>

<style lang="less" scoped>
.container {
	// width: 93%;
	// background: #33384B;
	// margin: 0 56px;
	// padding-bottom: 100px;
	#myChart{
		color: #fff;
	}
}
</style>
