<template>
	<div class="index">
		<div class="container" :style="nav==1?'height:100vh':'height:100%'">
			<div class="login_container">
				<div class="login_logo">
					<img src="@/assets/images/resgiter.png" alt="">
				</div>
				<div>
					<div class="tab_email">
						<div class="tab_order"></div>
						<div class="tab_text1">Or Email Login</div>
						<div class="tab_order"></div>
					</div>
					<div class="input_block">
						<div class="input_tit">Email</div>
						<div class="input_input">
							<input type="text" v-model="login_form.username.u">
						</div>
					</div>
					<div class="input_block" style="margin-bottom: 13px;">
						<div class="input_tit">Password</div>
						<div class="input_input">
							<input type="password" v-model="login_form.password">
						</div>
					</div>
					<!-- <div class="password_block">
						<div class="pass_left">
							<div class="pass_check"></div>
							<div class="pass_text">forgot password?</div>
						</div>
						<div class="pass_right">forgot password?</div>
					</div> -->
					<div class="foot">
						<div class="foot_button" @click="hand_login">Login</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {
		userRegister,
		userLogin,
		thirdLogin
	} from '@/api/login';
	export default {
		name: "login",
		components: {

		},
		data() {
			return {
				nav: 1,
				ima: 1,
				imgs: require("../../assets/images/Path.svg"),
				login_form: {
					username: {
						u: '',
						t: 1
					},
					password: ''
				}, //登录
			};
		},
		created() { //监听键盘事件，当点击enter时调用登录方法
			let that = this;
			document.onkeydown = function(e) {
				//enter的ASCII码是13
				if (e.key == "Enter") {
					that.hand_login(); //登录方法
					document.onkeydown = '' //登录成功销毁键盘监听事件
				}
				console.log(e.key)
			}
		},
		mounted() {},
		methods: {
			// 邮箱账号登录
			hand_login() {
				let that = this;
				let {
					username,
					password
				} = that.login_form;
				if (username != '' && password != '') {
					let parms = that.login_form
					userLogin(parms).then(res => {
						// 登录成功  缓存用户token
						sessionStorage.setItem("token", res.data.token)
						sessionStorage.setItem("userId", res.data.info.userId)
						that.$message({
							message: res.message,
							type: 'success'
						})
						setTimeout(function() {
							that.$router.push({
								path: '/',
							})
						}, 1000);
					})
				} else {
					if (username == '') {
						this.$message({
							message: '请输入Email！！！',
							type: 'warning'
						});
						return false
					} else if (password == '') {
						this.$message({
							message: '请输入Password！！！',
							type: 'warning'
						});
						return false
					}
				}
			},
		}
	};
</script>
<style lang="less" scoped>
	html,
	body,
	#app {
		height: 100%;
		margin: 0;
	}

	.container {
		width: 100%;
		background-image: url(../../assets/images/background.png);
		background-size: 100% 100%;

		.login_container {
			width: 511px;
			// background-color: #fff;
			margin: 0 auto;
			padding-top: 60px;

			.login_logo {
				// width: 222px;
				// height: 247px;
				width: 226px;
				height: 248px;
				margin: 0 auto;
				margin-bottom: 39px;
			}

			.login_logo img {
				width: 222px;
				height: 247px;
			}
			.tab_email {
				height: 19px;
				margin: 0 auto;
				margin-bottom: 22px;
				display: flex;
				align-items: center;
				justify-content: space-around;

				.tab_order {
					width: 185px;
					height: 1px;
					background-color: #606060;
				}

				.tab_text1 {
					font-weight: bold;
					font-size: 16px;
					color: #EDEDED;
					font-family: 'Roboto-Bold';
				}
			}



			.input_block {
				margin-bottom: 37px;

				.input_tit {
					color: #878787;
					font-size: 18px;
					font-weight: 500;
					margin-bottom: 17px;
					font-family: 'Roboto-Regular';
				}

				.input_input {
					width: 100%;

					input {
						width: 94%;
						padding: 0 3%;
						color: #fff;
						height: 61px;
						border-radius: 23px;
						border: none;
						font-size: 22px;
						background: rgba(232, 234, 239, 0.12) 0% 0% no-repeat padding-box;
						font-family: 'Roboto-Regular';
					}
				}
			}

			.input_blocks {
				margin-bottom: 37px;

				.input_input {
					height: 61px;
					font-size: 22px;
					border-radius: 23px;
					background: rgba(232, 234, 239, 0.12) 0% 0% no-repeat padding-box;
					display: flex;
					align-items: center;
					color: #fff;

					img {
						width: 50px;
						margin-left: 20px;
					}

					span {
						margin: 0 10px;
					}

					input {
						width: 45%;
						background: initial;
						border: none;
						height: 60px;
						font-size: 22px;
						color: #fff;
						font-family: 'Roboto-Regular';
					}

					button {
						background: #ED1C24;
						border: none;
						color: #fff;
						height: 45px;
						border-radius: 30px;
						width: 100px;
						font-size: 16px;
						font-family: 'Roboto-Regular';
					}
				}

				.input_input_email {
					padding: 0 3%;
					height: 61px;
					font-size: 22px;
					border-radius: 23px;
					background: rgba(232, 234, 239, 0.12) 0% 0% no-repeat padding-box;
					display: flex;
					align-items: center;
					justify-content: space-between;
					color: #fff;

					input {
						width: 45%;
						background: initial;
						border: none;
						height: 60px;
						font-size: 22px;
						color: #fff;
						font-family: 'Roboto-Regular';
					}

					button {
						background: #ED1C24;
						border: none;
						color: #fff;
						height: 45px;
						border-radius: 30px;
						width: 100px;
						font-size: 16px;
						font-family: 'Roboto-Regular';
					}
				}

				.input_tit {
					color: #878787;
					font-size: 18px;
					font-weight: 500;
					margin-bottom: 17px;
					font-family: 'Roboto-Regular';
				}

			}

			.password_block {
				height: 25px;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.pass_left {
					display: flex;
					align-items: center;

					.pass_check {
						width: 23px;
						height: 23px;
						border: 1px solid #878787;
						border-radius: 5px;
						margin-right: 13px;
					}

					.pass_text {
						color: #878787;
						font-size: 18px;
						font-weight: 500;
						font-family: 'Roboto-Regular';
					}
				}

				.pass_right {
					color: #878787;
					font-size: 18px;
					font-weight: 500;
				}
			}

			.foot {
				width: 100%;
				margin-top: 58px;

				.foot_button {
					width: 208px;
					height: 60px;
					color: #fff;
					font-size: 22px;
					font-weight: bold;
					line-height: 60px;
					text-align: center;
					background: #ED1C24;
					border-radius: 25px;
					margin: 0 auto;
					cursor: pointer;
					font-family: 'Roboto-Regular';
				}
			}
		}
	}
</style>
