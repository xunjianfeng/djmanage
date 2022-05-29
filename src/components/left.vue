<template>
<div class="index">
    <div id="left">
        <div class="left_logo">
            <img src="@/assets/images/list.png" alt="">
            <div class="left_logo_text">BOUNTEE</div>
        </div>
        <div class="left_content" @click="reset">
			<div class="left_user">
				<img src="../assets/images/friend_03.png" alt="">
				<div class="left_user_text">admin</div>
			</div>
            <div :class="left_index == 1 ?'left_content_col av':' left_content_col'" @click="left_tab(1)">
                <div class="left_content_col_img">
                    <img src="@/assets/images/book.png" alt="">
                </div>
                <div class="left_content_col_p">首页</div>
            </div>
            <div :class="left_index == 2 ?'left_content_col av':' left_content_col'" @click="left_tab(2)">
                <div class="left_content_col_img">
                    <img src="@/assets/images/book.png" alt="">
                </div>
                <div class="left_content_col_p">用户管理</div>
            </div>
            <div :class="left_index == 3 ?'left_content_col av':' left_content_col'" @click="left_tab(3)">
                <div class="left_content_col_img">
                    <img src="@/assets/images/book.png" alt="">
                </div>
                <div class="left_content_col_p">赛事管理</div>
            </div>
			<div :class="left_index == 4 ?'left_content_col av':' left_content_col'" @click="left_tab(4)">
			    <div class="left_content_col_img">
			        <img src="@/assets/images/book.png" alt="">
			    </div>
			    <div class="left_content_col_p">联赛管理</div>
			</div>
			<div :class="left_index == 5 ?'left_content_col av':' left_content_col'" @click="left_tab(5)">
			    <div class="left_content_col_img">
			        <img src="@/assets/images/book.png" alt="">
			    </div>
			    <div class="left_content_col_p">竞猜管理</div>
			</div>
			<div :class="left_index == 6 ?'left_content_col av':' left_content_col'" @click="left_tab(6)">
			    <div class="left_content_col_img">
			        <img src="@/assets/images/book.png" alt="">
			    </div>
			    <div class="left_content_col_p">对打管理</div>
			</div>
            <div :class="left_index == 7 ?'left_content_col av':' left_content_col'" @click="left_tab(7)">
                <div class="left_content_col_img">
                    <img src="@/assets/images/book.png" alt="">
                </div>
                <div class="left_content_col_p">积分管理</div>
            </div>
			<div :class="left_index == 8 ?'left_content_col av':' left_content_col'" @click="left_tab(8)">
			    <div class="left_content_col_img">
			        <img src="@/assets/images/book.png" alt="">
			    </div>
			    <div class="left_content_col_p">商城管理</div>
			</div>
			<div :class="left_index == 9 ?'left_content_col av':' left_content_col'" @click="left_tab(9)">
			    <div class="left_content_col_img">
			        <img src="@/assets/images/book.png" alt="">
			    </div>
			    <div class="left_content_col_p">订单管理</div>
			</div>
			<div :class="left_index == 10 ?'left_content_col av':' left_content_col'" @click="left_tab(10)">
			    <div class="left_content_col_img">
			        <img src="@/assets/images/book.png" alt="">
			    </div>
			    <div class="left_content_col_p">消息中心</div>
			</div>
			<div :class="left_index == 11 ?'left_content_col av':' left_content_col'" @click="left_tab(11)">
			    <div class="left_content_col_img">
			        <img src="@/assets/images/book.png" alt="">
			    </div>
			    <div class="left_content_col_p">任务管理</div>
			</div>
			<div :class="left_index == 12?'left_content_col av':' left_content_col'" @click="left_tab(12)">
			    <div class="left_content_col_img">
			        <img src="@/assets/images/book.png" alt="">
			    </div>
			    <div class="left_content_col_p">系统设置</div>
			</div>
			<div :class="left_index == 13 ?'left_content_col av':' left_content_col'" @click="left_tab(13)">
			    <div class="left_content_col_img">
			        <img src="@/assets/images/book.png" alt="">
			    </div>
			    <div class="left_content_col_p">服务管理</div>
			</div>
			<!-- <div :class="left_index == 14 ?'left_content_col av':' left_content_col'" @click="left_tab(14)">
			    <div class="left_content_col_img">
			        <img src="@/assets/images/book.png" alt="">
			    </div>
			    <div class="left_content_col_p">轮播管理</div>
			</div> -->
			<!-- <div :class="left_index == 11 ?'left_content_col av':' left_content_col'" @click="left_tab(11)">
			    <div class="left_content_col_img">
			        <img src="@/assets/images/book.png" alt="">
			    </div>
			    <div class="left_content_col_p">其他管理</div>
			</div> -->
        </div>
    </div>
    <div id="top">
        <div class="top">
            <div class="lorem">
                <!-- <img src="@/assets/images/lorem.png" class="lorem_img" alt="">
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tinci</p> -->
            </div>
            <div class="user">
                <img class="user_icon_col" src="@/assets/images/q.png" alt="">
				<div class="language_text"  @click.stop="hover_up">简体中文</div>
                <img src="@/assets/images/s.png" class="set_img" alt="" @click.stop="hover_up">
				<div class="set_hover" v-if="hover_status">
					<!-- 正式服 -->
					<div class="corner_out" @click="skip('https://system.bountee.com.my/#/')">English</div>
					<!-- 测试服 -->
					<!-- <div class="corner_out" @click="skip('http://gamesadmin-en.web.gdtuode.com/#/')">English</div> -->
					<div class="corner_out" @click.stop="hover_up">简体中文</div>
				</div>
				<div class="language_text" @click="out_login">退出</div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "index",
    components: {
    },
    data() {
        return {
          left_index:1,
		  hover_status:false,
        };
    },
    mounted() {
		if(sessionStorage.getItem("left_key") != '' && sessionStorage.getItem("left_key") != null && sessionStorage.getItem("left_key") != undefined){
			this.left_index = sessionStorage.getItem("left_key")
			this.left_tab(this.left_index)
		}
    },
    methods: {
		reset(){
			this.PageNumber.page_number = 1; //当跳转其他页面时重置页数
			this.PageNumber.judge = 0
			this.PageNumber.search_status = ""  
			this.PageNumber.search_class = ""  
			this.PageNumber.search_name = ""   
			this.PageNumber.search_type = ""   
		},
		out_login(){
			sessionStorage.setItem("token", '')
			sessionStorage.setItem("userId", '')
			this.$router.push({ path: '/login/index'})
		},
		left_tab(index){
			console.log(index)
			if(index == 1){
                this.$router.push({ path: '/'})
            }else if(index == 2){
                this.$router.push({ path: '/user/user_index'})
            }else if(index == 3){
                this.$router.push({ path: '/match/index'})
            }else if(index == 4){
                this.$router.push({ path: '/league/league'})
            }else if(index == 5){
                this.$router.push({ path: '/league/predict_and_win'})
            }else if(index == 6){
                this.$router.push({ path: '/league/rapid_challenge'})
            }else if(index == 7){
                this.$router.push({ path: '/user/integral'})
            }else if(index == 8){
                this.$router.push({ path: '/goodsManagement/goods_manage'})
            }else if(index == 9){
                this.$router.push({ path: '/order/commodity'})
            }else if(index == 10){
                this.$router.push({ path: '/message/msg_push'})
            }else if(index == 11){
                this.$router.push({ path: '/task/task_index'})
            }else if(index == 12){
                this.$router.push({ path: '/setting/account'})
            }else if(index == 13){
                this.$router.push({ path: '/recharge/coupon'})
            }
			// else if(index == 14){
   //              this.$router.push({ path: '/carousel/index'})
   //          }
			// else if(index == 11){
   //              this.$router.push({ path: '/legue/legue'})
   //          }
			
			
			this.left_index = index
			sessionStorage.setItem("left_key", index)
			console.log('.....left_key.......')
			console.log(sessionStorage.getItem("left_key"))
		},
		hover_up() {
			let that = this;
			that.hover_status = !that.hover_status
		},
		skip(url){
			location.href = url
		},
		jump_chinese(){
			
		}
    }
};

</script>
<style lang="less">

#left{
    width: 208px;
    height: 100vh;
    background: #2D3343;
    position: fixed;
    left: 0;
    top:0;
    color: #fff;
    box-shadow: 2px 0px 6px 0px rgba(0, 21, 41, 0.35);
    .left_logo{
        margin:11px 23px 44px 23px;
        display: flex;
        align-items: center;
        img{
            width: 42px;
            height: 48px;
            margin-right: 8px;
        }
        .left_logo_text{
          font-size: 20px;
          font-family: Helvetica;
          color: #90CA48;
          line-height: 22px;
          letter-spacing: 2px;
          background: linear-gradient(90deg, #90CA48 0%, #F7CA29 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
    }
    .left_content{
        width: 100%;
		height: 845px;
		overflow-y:scroll;
		.left_user{
			display: flex;
			flex-direction: column;
			text-align: center;
			margin-bottom: 16px;
			img{
				width: 69px;
				height: 69px;
				margin: 0 auto;
				border-radius: 50%;
				object-fit: cover;
				margin-bottom: 10px;
			}
			.left_user_text{
				font-size: 14px;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: rgba(255, 255, 255, 0.85);
			}
		}
        .left_content_col{
            width: 100%;
            height: 60px;
            display: flex;
            cursor: pointer;
            align-items: center;
            color: #545873;
            .left_content_col_img{
               width: 24px;
               margin: 0 14px 0 41px;
               img{
                 width: 24px;
               }
            }
            .left_content_col_p{
                font-size: 18px;
            }
        }
        .av{
          background: #383F51;
          color: #FFFFFF;
        }
    }
	.left_content::-webkit-scrollbar {
		display: none;
	}
}

#top{
    width: calc(100% - 208px);
    height: 80px;
    position: absolute;
    top: 0;
    left: 208px;
    color: #fff;
    .top{
        width: 92%;
        padding: 0 4%;
        height: 80px;
        // border-bottom: 2px solid #15181a;
        background-color: #2D3342;
        display: flex;
        justify-content: space-between; /* 横向中间自动空间 */
        align-items: center;
        flex-wrap: wrap; /* 换行 */
        box-shadow: 0px 1px 4px 0px rgba(0, 21, 41, 0.12);
    }
    .lorem{
        float: left;
        img{
            padding: 10px;
            border-radius: 35%;
            background: #0e0f11;
            float:left;
            width:25px
        }
        p{
            color:#7C7C7C;
            font-size: 14px;
            float: left;
            margin-left: 10px;
        }
    }
    .user{
        display: flex;
        align-items: center;
		position: relative;
		.user_icon_col{
		   width: 21px;
		}
		.set_hover {
			position: absolute;
			right: 30px;
			top: 32px;
			width: 150px;
			// padding: 0 17px;
			text-align: center;
			background: #2d3342;
			border-radius: 6px;
			z-index: 999;
		}
		.corner_out {
			color: #fff;
			// font-size: 18px;
			font-size: 14px;
			padding: 15px 17px;
			cursor: pointer;
		}
		.corner_out:hover{
			background-color: #5B5E72;
		}
		.language_text{
			font-size: 14px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			margin: 0 8px;
			cursor: pointer;
		}
        .set_img{
            width: 20px;
        }
    }
}
</style>
