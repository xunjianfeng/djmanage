<template>
  <div class="index">
    <div class="container">
      <div class="content_left">
        <div class="content_left_avatar">
          <img src="@/assets/images/img8.png" class="avatar" alt="">
          <div class="content_left_text">
            <p>Jack Lim</p>
            <img src="@/assets/images/yg.png" alt="">
          </div>
          <p class="text_uid">UID 2312456</p>
        </div>
        <div class="content_left_col">
          <p :class="nav==1?'av':''" @click="navs(1)">Personal Information</p>
          <p :class="nav==2?'av':''" @click="navs(2)">My Following</p>
          <p :class="nav==3?'av':''" @click="navs(3)">Play Store</p>
          <p :class="nav==4?'av':''" @click="navs(4)">Order</p>
          <p :class="nav==5?'av':''" @click="navs(5)">My Tournament</p>
          <p :class="nav==6?'av':''" @click="navs(6)">Billing</p>
          <p :class="nav==7?'av':''" @click="navs(7)">Badge</p>
          <p :class="nav==8?'av':''" @click="navs(8)">Setting</p>
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
  props: ['index'],
  data() {
    return {
        nav:this.index
    };
  },
  mounted() {
  },
  methods: {
      navs(index){
          if(index == 1){
              this.$router.push({path:'/center/personal'})
          }else if(index == 2){
              this.$router.push({path:'/center/following'})
          }
      }
  }
};
</script>
<style lang="less" scoped>
.container{
  .content_left{
    width: 318px;
    height: 761px;
    background: #0E0F11;
    margin-top: 100px;
    border-radius: 50px;
    .content_left_avatar{
      width:90%;
      margin: 0 auto;
      text-align: center;
      border-bottom: 2px solid #2D2D2D;
      padding-bottom: 20px;
      .avatar{
        width: 140px;
        margin-top: -45px;
      }
      .content_left_text{
        width: 100%;
        text-align: center;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
        p{
          float: left;
        }
        img{
          width: 15px;
          float: left;
          margin-left: 10px;
        }
      }
      .text_uid{
        color: #727272;
        padding: 0 ;
        margin: 0;
      }
    }
    .content_left_col{
      width: 90%;
      margin: 0 auto;
      p{
          cursor: pointer;
        height: 50px;
        border-radius: 18px;
        color: #9B9B9B;
        line-height: 50px;
        padding-left: 20px;
        font-size: 16px;
      }
      .av{
        background: #1D2023;
        color: #D3AA53;
      }
    }
  }
}
</style>
