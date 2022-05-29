<template>
	<div class="index">
		<div class="container">
			<div v-if="showArea == 1" id="AreaChart_1" :style="{ height: '100px'}"></div>
			<div v-if="showArea == 2" id="AreaChart_2" :style="{ height: '100px'}"></div>
			<div v-if="showArea == 3" id="AreaChart_3" :style="{ height: '100px'}"></div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"area_chart",
		props: ['index'],
		data() {
		  return {
		      showArea:this.index
		  };
		},
		mounted() {
			this.drawLine_1(),
			this.drawLine_2(),
			this.drawLine_3()
		},
		methods: {
			drawLine_1() {
				let AreaChart_1 = this.$echarts.init(document.getElementById("AreaChart_1"));
				var option;
				var color = [ "#228BE1","#45F277","#FF6161"];
				option = {
				   
					color : [ "#228BE1"],
				    legend: {
				        data: ['邮件营销']
				    },
				   
				    grid: {
				        left: '3%',
				        right: '4%',
				        bottom: '3%',
				        containLabel: true
				    },
				    xAxis: [
				        {
				            type: 'category',
				            // boundaryGap: false,
				            data: ['', '', '', '', '', '', '']
				        }
				    ],
				    yAxis: [
				        {
				            type: 'value'
				        }
				    ],
				    series: [
				        {
				            name: '待审核',
				            type: 'line',
				            areaStyle: {},
				            emphasis: {
				                focus: 'series'
				            },
				            data: [120, 132, 101, 134, 90, 230, 210]
				        },
				        
				    ]
				};
				option && AreaChart_1.setOption(option);
			},
			drawLine_2() {
				let AreaChart_2 = this.$echarts.init(document.getElementById("AreaChart_2"));
				var option;
				var color = [ "#228BE1","#45F277","#FF6161"];
				option = {
				    tooltip: {
				        trigger: 'axis',
				        axisPointer: {
				            type: 'cross',
				            label: {
				                backgroundColor: '#6a7985'
				            }
				        }
				    },
					color : [ "#45F277"],
				    legend: {
				        data: ['邮件营销']
				    },
				   
				    grid: {
				        left: '3%',
				        right: '4%',
				        bottom: '3%',
				        containLabel: true
				    },
				    xAxis: [
				        {
				            type: 'category',
				            // boundaryGap: false,
				            data: ['', '', '', '', '', '', '']
				        }
				    ],
				    yAxis: [
				        {
				            type: 'value'
				        }
				    ],
				    series: [
				        {
				            name: '待审核',
				            type: 'line',
				            areaStyle: {},
				            emphasis: {
				                focus: 'series'
				            },
				            data: [120, 132, 101, 134, 90, 230, 210]
				        },
				        
				    ]
				};
				option && AreaChart_2.setOption(option);
			},
			drawLine_3() {
				let AreaChart_3 = this.$echarts.init(document.getElementById("AreaChart_3"));
				var option;
				var color = [ "#228BE1","#45F277","#FF6161"];
				option = {
				    tooltip: {
				        trigger: 'axis',
				        axisPointer: {
				            type: 'cross',
				            label: {
				                backgroundColor: '#6a7985'
				            }
				        }
				    },
					color : [ "#FF6161"],
				    legend: {
				        data: ['邮件营销']
				    },
				    
				    grid: {
				        left: '3%',
				        right: '4%',
				        bottom: '3%',
				        containLabel: true
				    },
				    xAxis: [
				        {
				            type: 'category',
				            // boundaryGap: false,
				            data: ['', '', '', '', '', '', '']
				        }
				    ],
				    yAxis: [
				        {
				            type: 'value'
				        }
				    ],
				    series: [
				        {
				            name: '待审核',
				            type: 'line',
				            areaStyle: {},
				            emphasis: {
				                focus: 'series'
				            },
				            data: [120, 132, 101, 134, 90, 230, 210]
				        },
				        
				    ]
				};
				option && AreaChart_3.setOption(option);
			}
		}
	}
</script>

<style lang="less" scoped>

.container {
	width: 93%;
	// background: #33384B;
	// margin: 0 auto 20px;
	// padding-bottom: 20px;
	// #AreaChart_1{
	// 	color: #fff;
	// 	padding-bottom: 50px;
	// }
	// #AreaChart_2{
	// 	color: #fff;
	// 	padding-bottom: 50px;
	// }
	// #AreaChart_3{
	// 	color: #fff;
	// 	padding-bottom: 50px;
	// }
}
</style>
