<template>
	<div class="index">
		<div class="container">
			<div id="lineChart" :style="{ height: '440px'}"></div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"line_chart",
		data(){
			return{
				
			}
		},
		mounted() {
			this.drawLine()
		},
		methods: {
			drawLine() {
				let lineChart = this.$echarts.init(document.getElementById("lineChart"));
				var option;
				var color = [ "#228BE1","#45F277","#FF6161"];
				option = {
					tooltip: {
					        trigger: 'axis'
					    },
					    legend: {
					        data: ['邮件营销', '联盟广告'],
							textStyle:{color:"#ffffff"}
					    },
						color : [ "#228BE1","#45F277"],
					    grid: {
					        left: '3%',
					        right: '4%',
					        bottom: '3%',
					        containLabel: true
					    },
					    
				    xAxis: {
				        type: 'category',
				        data: ['10:00', '12:00', '13:00', '14:00', '15:00', '16.00']
				    },
				    yAxis: {
				        type: 'value'
				    },
				    series: [{
						name: '客流量',
				        data: [150, 230, 254, 218, 135, 147],
				        type: 'line'
				    },
				    {
						name: '支付笔数',
				        data: [230, 120, 334, 378, 335,107],
				        type: 'line'
				    }]
				};
				
				option && lineChart.setOption(option);
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
	#lineChart{
		color: #fff;
	}
}
</style>
