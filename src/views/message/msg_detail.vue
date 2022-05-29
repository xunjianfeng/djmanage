<template>
	<div class="index">
		<MsgView :index="2"></MsgView>
		<div class="container">
			<div class="top_tabs">
				<div class="tabs_block">消息中心  /</div>
				<div class="tabs_block" @click="jump_pastTimes">历史消息 /</div>
				<div class="tabs_block">历史消息</div>
			</div>
			<div class="right_container">
				<div class="right_content">
					<div class="block_title">
						<div class="title_name">历史消息</div>
					</div>
					<div class="msg_content">
						<div class="title_area">
							<div class="msg_title">{{msgDetail.messageTitle}}</div>
							<div class="send_time">{{initDete(msgDetail.createTime)}}</div>
						</div>
						<div class="msg_area">
							<div class="text" v-html="msgDetail.messageContent">
								<!-- 多伦多--(美国商业资讯)--Conic Metals Corp.（简称“Conic”或“公司”）(TSXV:NKL)是一家从事基础金属流和特许权使用费业务的公司。公司董事长Anthony
								 Milewski先生向股东发布了以下最新信息。值此2020年即将结束以及Conic首次完成全年交易之际，我想向我们的股东和合作伙伴提供关于我们的最新信息。在
								很少有镍生产商在多伦多证券交易所上市的情况下，Conic作为一家特有的公司，可凭借我们所持有的在产Ramu镍矿的权益以及对加拿大优质硫化镍矿（Dumon
								t和Turnagain）的特许权使用费，为股东提供从镍和钴的价格中进行获利的机会。 -->

							</div>
							<!-- <div class="msg_img">
								<img src="../../assets/images/bac.png" />
							</div> -->
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import MsgView from '@/components/message/left.vue';
	import {messageList} from '@/api/message.js'
	export default {
		name: "msg_detail",
		components: {
		    MsgView
		},
		data() {
			return {
				messageId:'',
				msgDetail:{}
			}
		},
		mounted() {
			this.messageId = this.$route.query.id
			// console.log(this.messageId)
			this.getDetail()
		},
		methods: {
			//消息的详情
			getDetail(){
				messageList({size:0}).then(res => {
					console.log(res.data.list)
					let msg_list = res.data.list
					for(let i = 0; i < msg_list.length;i++){
						if(msg_list[i].messageId == this.messageId){
							console.log(msg_list[i].messageId)
							this.msgDetail = msg_list[i]
							console.log(this.msgDetail)
						}
					}
				})
			},
			jump_pastTimes(){
				this.$router.push({ path: '/message/past_times'})
			}
		}
	}
</script>

<style lang="less" scoped>
	.container {
		background: #33384B;
		margin: 0 56px 0 224px;
		padding-bottom:20px;
		.top_tabs{
			position: fixed;
			display: flex;
			top: 98px;
			.tabs_block{
				font-size: 14px;
				font-family:'Roboto-Regular';
				font-weight: 400;
				color: rgba(255, 255, 255, 0.65);
				line-height: 22px;
				margin-right: 8px;
				cursor: pointer;
			}
			.tabs_block:last-child{
				margin-right: 0;
			}
		}
		
		.right_container{
			.right_content{
				// height: 100vh;
				background: #33384B;
				margin-top: 10px;
				padding: 10px 20px 30px;
				.block_title{
					.title_name{
						color: #ffffff;
						font-size: 18px;
						font-family:'Quicksand-Bold';
					}
				}
				.msg_content{
					margin-top: 20px;
					.title_area{
						height: 60px;
						display: flex;
						align-items: center;
						justify-content: space-between;
						color: #fff;
						border-bottom: 1px solid #4A516A;
						
						.msg_title{
							margin-left: 20px;
							font-size: 20px;
							font-family:'Quicksand-Bold';
						}
						.send_time{
							font-size: 16px;
							font-family:'Roboto-Regular';
						}
					}
					.msg_area{
						color: #ffffff;
						padding-left: 20px;
						padding-right: 20px;
						margin-top: 30px;
						font-family:'Roboto-Regular';
						font-size: 20px;
						.text{
							font-size: 18px;
							word-wrap: break-word;
							white-space: pre-wrap;
						}
						::v-deep{
							img{
								max-width: 100%;
								max-height: 100%;
							}
							
						}
						.msg_img{
							width: 100%;
							height: 539px;
							margin-top: 30px;
							img{
								width: 100%;
								height: 539px;
							}
						}
					}
				}
			}
		}
	}
</style>
