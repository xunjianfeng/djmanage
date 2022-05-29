<template>
	<div id="app">
		<LeftView v-if="route_status == true"></LeftView>
		<router-view :class="route_status == true ?{route:true, route_close: style_close, route_open: style_open } :'zroute'"  v-if="isRouterAlive"  @changeStyle="changeStyle" @closeStyle="closeStyle" />

	</div>
</template>

<script>
	import LeftView from '@/components/left.vue'
	export default {
		name: 'App',
		components: {
			LeftView
		},
		provide(){
			 return{
				  reload: this.reload
			 }
		},
		data() {
			return {
				style_close:true,	//弹窗关闭显示
				style_open:false,	//弹窗打开显示
				res: {},
				route_status: true,
				isRouterAlive:true,
				scroll_value:"scroll", //滚动的值
				fixed_value:"fixed" //定位的值
				
			}
		},
		methods:{
			changeStyle(){ //当打开时改变样式
				this.style_open = true
				this.style_close = false
			},
			closeStyle(){ //当关闭时恢复样式
				this.style_open = false
				this.style_close = true
				},
			reload(){
				this.isRouterAlive = false
				this.$nextTick(function(){
					this.isRouterAlive = true
				})
			}  
		},
		watch: {
			// 监听路由变化 登录相关页面不需要头部和底部组件 去除  开始
			$route(to, from) {
				let that = this;
				console.log('watch....')
				console.log(to.path)
				if (to.path == '/login/index') {
					that.route_status = false
				} else {
					that.route_status = true
					if ( !sessionStorage.getItem("token") ) {
						this.$message({
							showClose: true,
							message: '请先登录',
							type: 'error'
						});
						this.$router.push({ path: '/login/index'})
					}
				}
			}
		},
		mounted() {
			 let that = this;
			 console.log('App.vue')
			 console.log(that.$route.path)
			// 判断路由为login/index  页面去掉全局组件
			if(that.$route.path == '/login/index'){
				that.route_status = false
			}else{
				that.route_status = true
				if ( !sessionStorage.getItem("token") ) {
					this.$message({
						showClose: true,
						message: '请先登录',
						type: 'error'
					});
					this.$router.push({ path: '/login/index'})
				}
			}
		},
		needSerialize: true,
		async created() {
		  // this.res = await fetch()
			console.log('.....Created.....')
			this.$router.beforeEach((to, from, next) => {
			    console.log(to);
				console.log(from);
				console.log(next);
			    next();
			});
			
		},
	}
</script>
<style>
	@import url("common/font/font.css");
	/* 轮播图引用样式 */
	body,
	html {
		margin: 0 0 !important;
		background: #2A2E3F;
	}
	input,textarea,select,button{
		outline:none;
	}
	audio{
		outline:none;
	}
	/* 谷歌 */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
	    -webkit-appearance: none;
	    appearance: none; 
	    margin: 0; 
	}
	/* 火狐 */
	input{
	    -moz-appearance:textfield;
	}
	.el-form-item__label {
		padding: 0 0px 0 0;
	}
	/deep/ input::-webkit-outer-spin-button,
	/deep/ input::-webkit-inner-spin-button {
	  -webkit-appearance: none !important;
	}
	/deep/ input[type='number'] {
	  -moz-appearance: textfield !important;
	}
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	.route_close{	/* 关闭弹窗的样式 */
		overflow: scroll;
		position: fixed;
	}
	.route_open{	/* 打开弹窗的样式 */
		position: absolute;
	}
	.route {
		top: 137px;
		left: 208px;
		height: calc(100vh - 120px);
		width: calc(100% - 202px);
	}
	.zroute{
		
	}
	/* 大于1080px小于1920px的时候执行下面的CSS。 */
	/* @media screen and (min-width:1080px) and (max-width:1919px) {
    .route {
      height: 100vh;
      zoom: 0.9;
    }
  } */

	.route::-webkit-scrollbar {
		display: none;
		/* Chrome Safari */
	}

	input,
	textarea {
		outline: none;
	}
</style>
