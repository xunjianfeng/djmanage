<template>
<div class="index">
    <div id="left">
        <div class="left_logo">
            <img src="@/assets/images/Group9.png" alt="">
            <div class="left_logo_text">BOUNTEE</div>
        </div>
		<div class="user_info">
			<div class="user_img">
				<img src="../assets/images/avatar.png" />
			</div>
			<div class="user_name">admin</div>
		</div>
        <div class="left_content">
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
                <div class="left_content_col_p">积分管理</div>
            </div>
			<div :class="left_index == 5 ?'left_content_col av':' left_content_col'" @click="left_tab(5)">
			    <div class="left_content_col_img">
			        <img src="@/assets/images/book.png" alt="">
			    </div>
			    <div class="left_content_col_p">商城管理</div>
			</div>
			<div :class="left_index == 6 ?'left_content_col av':' left_content_col'" @click="left_tab(6)">
			    <div class="left_content_col_img">
			        <img src="@/assets/images/book.png" alt="">
			    </div>
			    <div class="left_content_col_p">订单管理</div>
			</div>
			<div :class="left_index == 7 ?'left_content_col av':' left_content_col'" @click="left_tab(7)">
			    <div class="left_content_col_img">
			        <img src="@/assets/images/book.png" alt="">
			    </div>
			    <div class="left_content_col_p">消息中心</div>
			</div>
			<div :class="left_index == 8 ?'left_content_col av':' left_content_col'" @click="left_tab(8)">
			    <div class="left_content_col_img">
			        <img src="@/assets/images/book.png" alt="">
			    </div>
			    <div class="left_content_col_p">任务管理</div>
			</div>
			<div :class="left_index == 9 ?'left_content_col av':' left_content_col'" @click="left_tab(9)">
			    <div class="left_content_col_img">
			        <img src="@/assets/images/book.png" alt="">
			    </div>
			    <div class="left_content_col_p">系统设置</div>
			</div>
			
        </div>
    </div>
    <div id="top">
        <div class="top">
            <el-select v-model="value" placeholder="请选择" :popper-append-to-body="false">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
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
		  value:'',
		  options:[
		    {
		      value:'1',
		      label:'中文'
		    },
		    {
		      value:'2',
		      label:'English'
		    },
		    
		  ],
        };
    },
    mounted() {
    },
    methods: {
		left_tab(index){
			this.left_index = index
			if(index == 1){
				this.$router.push({ path: '/'})
			}else if(index == 3){
				this.$router.push({ path: '/match/rank_management_free'})
			}else if(index == 5){
				this.$router.push({ path: '/goodsManagement/goods_manage'})
			}else if(index == 6){
				this.$router.push({ path: '/order/commodity'})
			}
			
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
        margin:16px 23px 52px 23px;
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
	.user_info{
		text-align: center;
		margin-bottom: 40px;
		.user_img{
			img{
				width: 84px;
				height: 84px;
				border-radius: 42px;
			}
		}
		.user_name{
			
		}
	}
    .left_content{
        width: 100%;
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
                font-size: 16px;
            }
        }
        .av{
          background: #383F51;
          color: #FFFFFF;
        }
    }
}

#top{
    width: calc(100% - 208px);
    height: 80px;
    position: fixed;
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
        justify-content: flex-end; /* 横向中间自动空间 */
        align-items: center;
        flex-wrap: wrap; /* 换行 */
        box-shadow: 0px 1px 4px 0px rgba(0, 21, 41, 0.12);
		/deep/ .el-select .el-input .el-input__inner{
			width: 130px;
		    border:0px;
			background-color: #2D3342;
			color:#fff;
			// border: 1px solid #ffffff;
		}
		/deep/ .el-select .el-input .el-input__inner:focus{
			color: #FFFFFF;
		}
		/deep/ .el-select-dropdown{
		    background-color: #2D3342;
			border: 1px solid rgba(255,255,255,0.2);
			color:#fff;
			position: absolute;
			z-index: 999;
		}
		
		  //修改单个的选项的样式
		/deep/ .el-select-dropdown__item{
		    background-color: transparent;
		    color:#fff;
			text-align: center;
		}
		/deep/ .el-select-dropdown__item.hover{
			background-color: #545873;
		}
		/deep/ .el-select-dropdown__item.selected{
			background-color: #545873;
		}
    }
   
}
 /* 大于1080px小于1920px的时候执行下面的CSS。 */
@media screen and (min-width:1080px) and (max-width:1919px){
  #top,#left{
    height: 100%;
    zoom: 0.85;
  }
}
</style>
