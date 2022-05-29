<template>
	<div class="index">
		<div class="container">
			<!-- 添加/编辑 赞助商 -->
			<div class="mark_bac" v-if="regchare_status == true"></div>
			<div class="sponsorsing_window" v-show="regchare_status">
				<div class="sponsorsing_head">
					<div class="sponsorsing_tit">{{spon_title}}</div>
					<div class="sponsorsini_qr" @click="regchare_status = ! regchare_status">X</div>
				</div>
				<div class="sponsorsing_content">
					<div class="pay_input">
						<div class="pay_rm">赞助商类型</div>
						<div class="pay_input_left">
							<el-select v-model="dataForm.sponsorType" placeholder="赞助类型" :popper-append-to-body="false">
								<el-option label="Organise" value="Organise"></el-option>
								<el-option label="Co-organise" value="Co-organise"></el-option>
							</el-select>
						</div>
					</div>
					<div class="pay_input">
						<div class="pay_rm">赞助商名称</div>
						<div class="pay_input_left">
							<input type="text" v-model="dataForm.sponsorName" placeholder="请输入">
						</div>
					</div>
					<div class="pay_input">
						<div class="pay_rm">公司类型</div>
						<div class="pay_input_left">
							<el-select v-model="dataForm.companyType" placeholder="公司类型" :popper-append-to-body="false">
								<el-option label="个人" value="个人"></el-option>
								<el-option label="私人有限公司" value="私人有限公司"></el-option>
							</el-select>
						</div>
					</div>
					<div class="pay_input">
						<div class="pay_rm">公司LOGO</div>
						<div class="pay_update_left">
							<el-upload
								class="avatar-uploader"
								:action="HOST +'/img/upload'"
								:show-file-list="false"
								:on-success="res => {return handleAvatarSuccess(res,'sponsorLogo',0);}"
								:before-upload="beforeAvatarUpload">
								<img  class="active1_img" v-if="dataForm.sponsorLogo" style="width: 100px;height: 100px;object-fit: fill;" :src="HOST + dataForm.sponsorLogo">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								<div class="update_text" v-if="spon_title == '编辑' && dataForm.sponsorLogo">更换照片</div>
							</el-upload>
						</div>
					</div>
				</div>
				<div class="sponsorsing_btom">
					<div class="sponsors_btom_left"></div>
					<div class="sponsors_bton" v-if="spon_title == '添加'" @click="sponsorAdd">添加</div>
					<div class="sponsors_bton" v-if="spon_title == '编辑'" @click="sponsorUpdate">保存</div>
				</div>
			</div>
			<!-- end -->
			<!-- 设置胜制 -->
			<div class="mark_bac" v-if="victory_status == true"></div>
			<div class="victory_window" v-show="victory_status">
				<div class="victory_head">
					<div class="victory_tit">{{bestForm.name}}</div>
					<div class="victory_qr" @click="victory_status = ! victory_status">X</div>
				</div>
				<div class="victory_content">
					<div class="victory_input">
						<div class="victory_rm">BO</div>
						<div class="victory_input_left">
							<el-select v-model="bestForm.best" placeholder="请选择" style="margin-right: 24px;" :popper-append-to-body="false">
							  <el-option label="1" value="1"></el-option>
							  <el-option label="2" value="2"></el-option>
							  <el-option label="3" value="3"></el-option>
							</el-select>
						</div>
					</div>
				</div>
				<div class="victory_btom">
					<div class="victory_btom_left"></div>
					<div class="victory_bton" @click="handleBestSub">保存</div>
				</div>
			</div>
			<!-- end -->
			<!-- 设置胜利 -->
			<div class="mark_bac" v-if="triumph_status == true"></div>
			<div class="triumph_window" v-show="triumph_status">
				<div class="triumph_head">
					<div class="triumph_tit">报告分数</div>
					<div class="triumph_qr" @click="triumph_status = ! triumph_status">X</div>
				</div>
				<div class="triumph_content">
					<div class="triumph_table">
						<div class="triumph_top">
							<div class="trium_td_block">团队</div>
							<div class="trium_td_block2">游戏角色</div>
							<div class="trium_td_block">分数</div>
						</div>
						<div class="triumph_in" >
							<el-tooltip class="item" effect="dark" :content="dataRanks.teamNameA" placement="bottom">
							  <div class="trium_td_block">
							  	{{dataRanks.teamNameA}}
							  </div>
							</el-tooltip>
							<div class="trium_td_block2">
								<div class="trium_img_list" v-if="dataRanks.aImages!=''">
									<img :src="HOST + item1" v-for="(item1,index) in dataRanks.aImages" @click="haneleAddImgDel(item1,1)" :key="index" class="game_avatar" alt="">
								</div>
								<div class="trium_text" @click="handleUploads(1)">上传图片</div>
							</div>
							<div class="trium_td_block"><input type="text" v-model="dataRanks.aScore" @input="handleScore()" style="width:50%" class="free_input" maxlength="2"></div>
						</div>
						<div class="triumph_in">
							<el-tooltip class="item" effect="dark" :content="dataRanks.teamNameB" placement="bottom">
							  <div class="trium_td_block">{{dataRanks.teamNameB}}</div>
							</el-tooltip>
							<div class="trium_td_block2">
								<div class="trium_img_list" v-if="dataRanks.bImages!=''">
									<img :src="HOST + item1" v-for="(item1,index) in dataRanks.bImages" @click="haneleAddImgDel(item1,2)" :key="index" class="game_avatar" alt="">
								</div>
								<div class="trium_text" @click="handleUploads(2)">上传图片</div>
							</div>
							
							<div class="trium_td_block"><input type="text" v-model="dataRanks.bScore" @input="handleScore()" style="width:50%" class="free_input" maxlength="2"></div>
						</div>
					</div>
					<div class="triumph_confirm">
						<div class="conifrm_text">确认胜者</div>
						<el-tooltip class="item" effect="dark" :content="dataRanks.teamNameA" placement="bottom">
						  <div :class="dataRanks.win==dataRanks.tournamentUserIdA?'conifrm_two':'conifrm_one'" @click="handleRanks(dataRanks.tournamentUserIdA)">
						  	{{dataRanks.teamNameA}}
						  </div>
						</el-tooltip>
						<el-tooltip class="item" effect="dark" :content="dataRanks.teamNameB" placement="bottom">
						 <div :class="dataRanks.win==dataRanks.tournamentUserIdB?'conifrm_two':'conifrm_one'" style="margin-left:10px" @click="handleRanks(dataRanks.tournamentUserIdB)">
						 	{{dataRanks.teamNameB}}
						 </div>
						</el-tooltip>
						<!-- <div :class="dataRanks.win==dataRanks.tournamentUserIdA?'conifrm_two':'conifrm_one'" @click="handleRanks(dataRanks.tournamentUserIdA)">
							{{dataRanks.teamNameA}}
						</div>
						<div :class="dataRanks.win==dataRanks.tournamentUserIdB?'conifrm_two':'conifrm_one'" style="margin-left:10px" @click="handleRanks(dataRanks.tournamentUserIdB)">
							{{dataRanks.teamNameB}}
						</div> -->
					</div>
				</div>
				<div class="triumph_btom">
					<div class="triumph_btom_left"></div>
					<div class="triumph_bton" @click="tournamentRank">保存</div>
				</div>
			</div>
			<!-- end -->
			<!-- 循环输入成绩弹窗 -->
			<div class="mark_bac" v-if="loop_status == true"></div>
			<div class="loop_window" v-show="loop_status">
				<div class="loop_head">
					<div class="triumph_tit">报告分数</div>
					<div class="triumph_qr" @click="loop_status = ! loop_status">X</div>
				</div>
				<div class="loop_content">
					<div class="triumph_table">
						<div class="triumph_top">
							<div class="trium_td_block">团队</div>
							<div class="trium_td_block2">游戏角色</div>
							<div class="trium_td_block">分数</div>
						</div>
						<div class="triumph_in">
							<div class="trium_td_block">1</div>
							<div class="trium_td_block2">
								<div class="trium_text">上传图片</div>
							</div>
							<div class="trium_td_block">0</div>
						</div>
						<div class="triumph_in">
							<div class="trium_td_block">2</div>
							<div class="trium_td_block2">
								<div class="trium_img_list">
									<img src="../../assets/images/friend_03.png" class="game_avatar" alt="">
									<img src="../../assets/images/friend_03.png" class="game_avatar" alt="">
									<img src="../../assets/images/friend_03.png" class="game_avatar" alt="">
									<img src="../../assets/images/friend_03.png" class="game_avatar" alt="">
									<img src="../../assets/images/friend_03.png" class="game_avatar" alt="">
								</div>
							</div>
							<div class="trium_td_block">1</div>
						</div>
					</div>
					<div class="triumph_confirm">
						<div class="conifrm_text">确认胜者</div>
						<div class="conifrm_one">1</div>
						<div class="conifrm_one">平</div>
						<div class="conifrm_two">2</div>
					</div>
				</div>
				<div class="loop_btom">
					<div class="triumph_btom_left"></div>
					<div class="triumph_bton">保存</div>
				</div>
			</div>
			<!-- end -->
			<!-- 自由输入成绩弹窗 -->
			<div class="mark_bac" v-if="free_status == true"></div>
			<div class="free_window"  v-show="free_status" >
				<div class="free_head">
					<div class="free_tit">报告分数</div>
					<div class="free_qr" @click="free_status = ! free_status">X</div>
				</div>
				<div class="free_content" v-if="detail_list.stages[0].format == 4">
					<div class="free_table">
						<div class="free_top">
							<div class="free_td_block">团队</div>
							<div class="free_td_block2">游戏角色</div>
							<div class="free_td_block">分数</div>
							<div class="free_td_block">排名</div>
						</div>
						<div class="free_in" v-for="(item,index) in details" :key="index">
							<div class="free_td_block">{{item.teamName?0:0}}</div>
							<div class="free_td_block2">
								<div class="free_img_list" v-if="item.images!=''">
									<img :src="HOST + item1" v-for="(item1,index) in item.images" @click="haneleAddImgDel(item1)" :key="index" class="game_avatar" alt="">
								</div>
								<div class="free_text" @click="uploadImg(item)">上传图片</div>
							</div>
							<div class="free_td_block">
								<input type="text" v-model="item.integral" class="free_input">
							</div>
							<div class="free_td_block">
								<input type="text" v-model="item.rank" class="free_input">
							</div>
						</div>
					</div>
				</div>
				<div class="free_btom">
					<div class="free_btom_left"></div>
					<div class="free_bton" @click="handleFree">提交得分</div>
				</div>
			</div>
			<!-- end -->
			<!--已上传图片/上传图片弹窗-->
			<div class="mark_bac" v-if="upload_status == true"></div>
			<div class="cease_window" v-show="upload_status">
				<div class="cease_win_left">
					<div :class="cease_index == 1 ?'cease_left_text cease_av':'cease_left_text'" @click="switch_cease(1)">我的电脑</div>
					<div :class="cease_index == 2 ?'cease_left_text cease_av':'cease_left_text'" @click="switch_cease(2)">我上传过</div>
				</div>
				<div class="cease_win_right">
					<div class="win_right_block" v-if="cease_index == 1">
						<div class="cease_head">
							<div class="cease_tit">上传照片</div>
							<div class="cease_qr" @click="upload_status = ! upload_status">X</div>
						</div>
						<div class="cease_upat_container">
							<el-upload
							  class="upload-demo"
							  drag
							  :action="HOST + '/user/image/add'"
							  :on-success="res => {return handleAvatarSuccesss(res,'images');}"
							  :on-remove="handleAvatarRemoves"
							  :before-upload="beforeAvatarUploads"
							  :file-list="upload_type == 2?fileList1:fileList"
							  :limit="upload_type == 1?imgLimitA:imgLimitB"
							  :headers="headers"
							  multiple>
							  <!-- :on-exceed="handleExceed" -->
							  <!-- <i class="el-icon-upload"></i> -->
							  <div class="el-upload__text" style="font-weight: bold;">将多个图片拖动到这里，</div>
							  <div class="el-upload__text" style="margin: 15px 0;">或</div>
							  <div class="el-upload__text"><em>选择多张照片</em></div>
							  <div class="el-upload__tip" slot="tip">*照片最大为1MB  <span style="margin-left: 20px;"> *最大上限为五张</span></div>
							</el-upload>
						</div>
						<div class="cease_btom">
							<div class="cease_bton" @click="upload_status = ! upload_status">确 认</div>
						</div>
					</div>
					<div class="win_right_block2" v-else>
						<div class="cease_head">
							<div class="cease_tit">上传照片</div>
							<div class="cease_qr" @click="upload_status = ! upload_status">X</div>
						</div>
						<div class="cease_content">
							<div class="cease_photo_list">
								<div  v-for="(item,index) in imgList" :key="index" :class=" item.check == true ?'photo_block photo_border':'photo_block'" @click="cease_check(item.image_id)">
									<img :src="HOST + item.url" alt="">
								</div>
							</div>
						</div>
						<div class="cease_btom">
							<div class="cease_btom_left">已选择{{imgNum}}张照片</div>
							<div class="cease_bton" @click="handleConfimImg">确认</div>
						</div>
					</div>
				</div>
			
			</div>
			<!-- end -->
			<div class="event_container">
				<div class="event_head">
					<div class="screen_title">
						<div class="screen_text">赛事详情</div><!-- 赛事基本信息 -->
						<div class="screen_return" @click="back">返 回</div>
						<div class="step_right_bton" @click="endRegistration" v-if="detail_list.status == 2">结束报名</div>
					</div>
					<div class="event_tabs_container">
						<div :class="activeName == 1 ? 'tabs_block tabs_av' :'tabs_block'" @click="tab_tabs(1)">赛事基本信息</div>
						<div :class="activeName == 2 ? 'tabs_block tabs_av' :'tabs_block'" @click="tab_tabs(2)">参赛者列表</div>
						<div :class="activeName == 3 ? 'tabs_block tabs_av' :'tabs_block'" @click="tab_tabs(3)" v-if="detail_list.status >= 3&&detail_list.stages[0].format==3">对阵·小组赛</div>
						<div :class="activeName == 4 ? 'tabs_block tabs_av' :'tabs_block'" @click="tab_tabs(4)" v-if="detail_list.status >= 3&&detail_list.stages[0].format==3">对阵·决赛</div>
						<div :class="activeName == 5 ? 'tabs_block tabs_av' :'tabs_block'" @click="tab_tabs(5)" v-if="detail_list.status >= 3&&detail_list.stages[0].format==1">对阵</div>
						<div :class="activeName == 6 ? 'tabs_block tabs_av' :'tabs_block'" @click="tab_tabs(6)" v-if="detail_list.status >= 3&&detail_list.stages[0].format==2">对阵</div>
						<div :class="activeName == 7 ? 'tabs_block tabs_av' :'tabs_block'" @click="tab_tabs(7)" v-if="detail_list.status >= 3&&detail_list.stages[0].format==4">对阵</div>
					</div>
				</div>
				<!-- tabs 内容 -->
				<!-- 赛事基本信息 -->
				<div class="event_content_tabs" v-if="activeName == 1">
					<div class="event_tabs_list">
						<div :class="activeEvent == 1 ? 'event_block envent_av' :'event_block'" @click="tab_event(1)">赛事介绍</div>
						<div :class="activeEvent == 2 ? 'event_block envent_av' :'event_block'" @click="tab_event(2)">奖金池</div>
						<div :class="activeEvent == 3 ? 'event_block envent_av' :'event_block'" @click="tab_event(3)">赞助商列表</div>
						<div :class="activeEvent == 4 ? 'event_block envent_av' :'event_block'" @click="tab_event(4)">赛事规则</div>
					</div>
					<!-- event_tabs_内容 -->
					<div :class="activeEvent == 3 ?'event_step_container event_three':'event_step_container'">
						<!-- 赛事介绍 -->
						<div class="event_step_one" v-if="activeEvent == 1">
							<div class="step_one_block">
								<div class="step_one_left">
									<div class="step_one_text">竞赛海报</div>
									<div class="step_one_cover">
										<img :src="HOST + detail_list.tournamentCover"  alt="">
									</div>
								</div>
								<div class="step_one_right">
									<div class="step_right_form">
										<div class="form_list">
											<div class="form_name">竞赛标题</div>
											<div class="form_value">{{detail_list.tournamentName}}</div>
										</div>
										<div class="form_list">
											<div class="form_name">游戏类型</div>
											<div class="form_value">{{detail_list.gameName}}</div>
										</div>
										<div class="form_list">
											<div class="form_name">游戏mode</div>
											<div class="form_value">{{detail_list.mode}} vs {{detail_list.mode}}</div>
										</div>
										<div class="form_list">
											<div class="form_name">赛事format</div>
											<div class="form_value">
												{{detail_list.stages[0].format==1?'Single Elimination':detail_list.stages[0].format==2?'Double Elimination':detail_list.stages[0].format==3?'Round Robin':'Free For All'}}
											</div>
										</div>
										<div class="form_list">
											<div class="form_name">赛事类型</div>
											<div class="form_value">
												{{detail_list.tournamentType ==0 ? '个人赛' : '团队赛' }}
											</div>
										</div>
										<div class="form_list">
											<div class="form_name">官方/私人举办</div>
											<div class="form_value">{{detail_list.tournamentCategory}}</div>
										</div>
										<div class="form_list">
											<div class="form_name">报名条件</div>
											<div class="form_value">限:</div>
											<div class="conditions_block">
												<div class="">{{detail_list.eastWest}}</div>
												<div class="" v-if="detail_list.oku == true">残疾人</div>
												<div class="" v-if="detail_list.student == true">学生</div>
												<div class="">{{detail_list.state}}</div>
											</div>
										</div>
									</div>
									<div class="step_right_bton" @click="information" v-if="detail_list.status != 3 && detail_list.status != 4">编辑</div>
								</div>
							</div>
							<div class="step_two_block">
								<div class="step_two_left">
									<div class="form_list">
										<div class="form_name">报名费用</div>
										<div class="form_value">{{detail_list.registeryFee}} {{detail_list.registeryFeeType}}</div>
									</div>
									<div class="form_list">
										<div class="form_name">赛事状态</div>
										<div class="form_value">{{detail_list.status==1?'待审核':detail_list.status==2?'报名中':detail_list.status==3?'进行中':detail_list.status==4?'已结束':'未通过' }}</div>
									</div>
									<div class="form_list">
										<div class="form_name">报名时间</div>
										<div class="registration_time">
											<div class="start_time">{{initDete(detail_list.registrationTimeStart)}}</div>
											<div class="text">至</div>
											<div class="end_time">{{initDete(detail_list.registrationTimeEnd)}}</div>
										</div>
										<!-- <div class="form_value">2020/12/16 09:00 至 2020/12/30 16:00</div> -->
									</div>
								</div>
								<div class="step_two_right">
									<div class="form_list">
										<div class="form_name">Live URL</div>
										<el-tooltip class="item" effect="dark" :content="detail_list.liveUrl" placement="bottom">
											<div class="form_value form_url">{{detail_list.liveUrl}}</div>
										</el-tooltip>
									</div>
									<div class="form_list">
										<div class="form_name">参与人数/队伍数</div> 
										<div class="form_value">{{player_list_len}}/{{detail_list.participantsSize}}</div>
									</div>
									<div class="form_list">
										<div class="form_name">比赛时间</div>
										<!-- <div class="form_value">2021/01/16 09:00 至 2021/01/30 16:00</div> -->
										<div class="tournament_time">{{initDete(detail_list.tournamentTime)}}</div>
									</div>
								</div>
							
							</div>
							<div class="step_three_block">
								<div class="step_three_left">
									<div class="form_list">
										<div class="form_name">介绍</div>
										<div class="form_paragraph" >
											<div class="four_paragraph" v-html="detail_list.introduction"></div>
											<!-- <pre class="four_paragraph" v-html="detail_list.introduction"></pre> -->
										</div>
									</div>
								</div>
							</div>
						</div>
						<!--奖金池 -->
						<div class="event_step_two" v-if="activeEvent == 2">
							<div class="step_two_head">
								<div class="one_head_text">
									赛事状态 <span>{{detail_list.status==1?'待审核':detail_list.status==2?'报名中':detail_list.status==3?'进行中':detail_list.status==4?'已结束':'未通过' }}</span>
								</div>
								<div class="one_head_text">
									奖金类型 <span>{{detail_list.rewards[0].rewardType==1?'物品':'现金'}}</span>
								</div>
								<div class="one_head_text">
									奖金保护 <span :class="detail_list.authentication == true?'span_color':'span_color_red'">{{detail_list.authentication == true?'已开启':'未开启'}}</span>
								</div>
							</div>
							<div class="step_two_table">
								<div class="one_table_block">排名</div>
								<div class="two_table_block">奖品图片</div>
								<div class="three_table_block">奖品名称</div>
								<div class="three_table_block">奖品价值</div>
								<div class="three_table_block">奖品数量</div>
							</div>
							<div class="step_two_td" v-for="(item,index) in detail_list.rewards" :key="index">
								<div class="one_td_block">{{item.ranking}}</div>
								<div class="two_td_block">
									<el-image :src="HOST + item.rewardPicture">
										<div slot="error" class="image-slot">
											<img src="../../assets/images/default_pic.png"/>
										</div>
									</el-image>
									<!-- <img v-if="item.rewardPicture == '' || item.rewardPicture == null || item.rewardPicture == undefined" src="../../assets/images/default_pic.png" alt="" /> -->
									<!-- <img v-else :src="HOST + item.rewardPicture" alt=""> -->
								</div>
								<div class="three_td_block">{{item.rewardName}}</div>
								<div class="three_td_block">{{item.rewardPrice}}</div>
								<div class="three_td_block">{{item.quantity}}</div>
							</div>
						</div>
						<!-- 赞助商列表 -->
						<div class="event_step_three" v-if="activeEvent == 3">
							<div class="step_three_table">
								<div class="one_table_block">赞助商类型</div>
								<div class="two_table_block">公司LOGO</div>
								<div class="three_table_block">公司名称</div>
								<div class="three_table_block">公司类型</div>
								<div class="three_table_block"></div>
							</div>
							<div class="step_three_td" v-for="(stem,spondex) in detail_list.sponsors" :key="spondex">
								<div class="one_td_block">{{stem.sponsorType}}</div>
								<div class="two_td_block">
									<img class="two_img" :src="HOST + stem.sponsorLogo" alt="">
									<!-- 图片为空或者空白用这个显示
									<div class="two_nothing"></div> -->
								</div>
								<div class="three_td_block">{{stem.sponsorName}}</div>
								<div class="three_td_block">{{stem.companyType}}</div>
								<div class="three_td_block">
									<div class="operation_edit" @click="spon_status(2,stem)">编辑</div>
									<div class="operation_del" @click="handleSopnsDel(stem.sponsorId)">删除</div>
								</div>
							</div>
							<!-- 添加赞助商 -->
							<div class="step_three_add" @click="spon_status(1,'')">+ 添加更多赞助商</div>
						</div>
						<!-- 赛事规则 -->
						<div class="event_step_four" v-if="activeEvent == 4">
							<Tinymce ref="editor" :height="160" v-if="edit" v-model="detail_list.terms" style="width: 591px;zoom: 0.9;" />
							<div class="step_four_left" v-if="!edit" v-html="detail_list.terms" style=""></div>
							<!-- <pre class="step_four_left" v-if="!edit" v-html="detail_list.terms" style="white-space: pre-wrap;"></pre> -->
							<div class="step_four_right">
								<div class="four_edit" @click="handleEdit">{{edit?'保存':'编辑'}}</div>
							</div>
						</div>
					</div>
				</div>
				<!-- 参赛者列表 -->
				<div class="basic_content_tabs" v-if="activeName == 2">
					<div class="player_table_area">
						<div class="player_table">
							<div class="player_table_header">
								<div class="table_header_col player_no">UID</div>
								<div class="table_header_col">Date</div>
								<div class="table_header_col">Logo</div>
								<div class="table_header_col player_name">Name</div>
								<div class="table_header_col">Status</div>
								<div class="table_header_col">-</div>
							</div>
							<div class="player_table_body">
								<div class="table_body_row" v-for="(item,index) in detail_list.contestant">
									<div class="table_body_row_col player_no">{{item.teamId}}</div>
									<div class="table_body_row_col">{{initDete(item.signupTime)}}</div>
									<div class="table_body_row_col player_img">
										<el-image :src="HOST + item.teamLogo" class="team_img">
											<div slot="error" class="image-slot"> 
												<img src="../../assets/images/default.png"  class="team_img"/>
											</div>
										</el-image>
										<!-- <img :src="HOST + item.teamLogo" class="team_img" v-if="item.teamLogo"> -->
										<!-- <img src="../../assets/images/default.png" class="team_img" v-else> -->
									</div>
									<el-tooltip class="item" effect="dark" :content="item.teamName" placement="bottom">
										<!-- <div class="team_name">{{item.teamName}}</div> -->
										<div :class="detail_list.tournamentType !=0 ? 'table_body_row_col player_name btn_cursor':'table_body_row_col player_name'" @click="showMemeber(item.teamId)">
											{{item.teamName}}
										</div>
									</el-tooltip>
									<div class="table_body_row_col">{{item.checkIn == true ? 'Checked in' : 'Absent'}}</div>
									<div class="table_body_row_col">
										<div :class="(item.checkIn == false || item.checkIn == null)  && detail_list.tournamentType ==0? 'pre_btn btn_cursor': 'pre_btn '"@click="(item.checkIn == false || item.checkIn == null) && detail_list.tournamentType ==0 ? adminCkeckIn(item.teamId) : ''">{{item.checkIn == true ? '' : 'Present'}}</div>
										<!-- <div class="pre_btn">Absent</div> -->
									</div>
									<!-- 团队赛事个成员的签到情况 -->
									<div class="team_member_list" v-if="item.show_status == true && detail_list.tournamentType !=0">
										<div class="member_table">
											<div class="member_table_header">
												<div class="header_col">Name</div>
												<div class="header_col">Status</div>
											</div>
											<div class="member_table_body">
												<div class="member_table_body_row" v-for="(mtem,mndex) in item.users" :key="mndex">
													<div class="member_table_body_row_col">{{mtem.fullName}}</div>
													<div class="member_table_body_row_col">
														<div :class="mtem.checkIn == false  || mtem.checkIn == null? 'pre_btn btn_cursor': 'pre_btn'"@click="mtem.checkIn == false || mtem.checkIn == null ? adminUserCkeckIn(mtem.userId) : ''">{{mtem.checkIn == true ? 'Checked in' : 'Absent'}}</div>
													</div>
												</div>
											</div>
										</div>
										
									</div>
									<!-- 团队赛事个成员的签到情况end -->
								</div>
							</div>
						</div>
					</div>
					<!-- <div class="tabs_num_block">
						<div class="tabs_title">总报名（{{detail_list.contestant.length}}个）：</div>
						<div class="tabs_team_list">
							<div class="team_block" v-for="(item,index) in detail_list.contestant" @mouseenter="showMemeber(item.teamId)" @mouseleave="closeMember(item.teamId)">
								<img :src="HOST + item.teamLogo" class="team_img">
								<el-tooltip class="item" effect="dark" :content="item.teamName" placement="bottom">
									<div class="team_name">{{item.teamName}}</div>
								</el-tooltip>
								<div class="team_member_list" v-if="item.show_status == true && detail_list.tournamentType !=0">
									<div class="team_member">
										<div class="member_block" v-for="(mtem,mndex) in member_list" :key="mndex">
											<img :src="HOST + mtem.avatar" class="member_avatar" />
											<el-tooltip class="item" effect="dark" :content="mtem.fullName" placement="bottom">
												<div class="member_name">{{mtem.fullName}}</div>
											</el-tooltip>
										</div>
									</div>
								</div>
							</div>
							
						</div>
					</div>
					<div class="tabs_num_block">
						<div class="tabs_title">出席（{{detail_list.contestant.length}}个）：</div>
						<div class="tabs_team_list">
							<div class="team_block" v-for="(item,index) in detail_list.contestant" @mouseenter="showMemeberOn(item.teamId)" @mouseleave="closeMemberOn(item.teamId)">
								<img :src="HOST + item.teamLogo" class="team_img">
								<el-tooltip class="item" effect="dark" :content="item.teamName" placement="bottom">
									<div class="team_name">{{item.teamName}}</div>
								</el-tooltip>
								<div class="team_member_list" v-if="item.show_status1 == true && detail_list.tournamentType !=0">
									<div class="team_member">
										<div class="member_block" v-for="(mtem,mndex) in member_list" :key="mndex">
											<img :src="HOST + mtem.avatar" class="member_avatar" />
											<el-tooltip class="item" effect="dark" :content="mtem.fullName" placement="bottom">
												<div class="member_name">{{mtem.fullName}}</div>
											</el-tooltip>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div> -->
					
				</div>
				<!-- 对阵 -->
				<div class="event_against_tabs" v-if="activeName == 5 || activeName == 6  || activeName == 7 ">
					<div class="ag_btn_list">
						<div class="a_btn_left">
							<!-- <div class="ag_rank">默认排位</div> -->
							<div class="ag_ranking" @click="resetEvent" v-if=" activeName != 7">打乱种子选手排位</div>
						</div>
						<div class="a_btn_right">
							<div class="start_btn" style="float:right" @click="stageStart" v-if="detail_list.stages[0]['end']==null">比赛开始</div>
							<div class="start_btn" style="float:right" @click="stageStop" v-if="detail_list.stages[0]['end']==false">结束比赛</div>
						</div>
					</div>
					<!-- 自由模式没有Bo -->
					<div class="against_tabs_list" v-if="win_type == 1 &&  defalut_status != true">
						<div :class="activeAgain == 1 ? 'against_block against_av' :'against_block'" @click="tab_against(1)">Round 1</div>
						<div :class="activeAgain == 2 ? 'against_block against_av' :'against_block'" @click="tab_against(2)">Round 2</div>
						<div :class="activeAgain == 3 ? 'against_block against_av' :'against_block'" @click="tab_against(3)">Semi Final</div>
						<div :class="activeAgain == 4 ? 'against_block against_av' :'against_block'" @click="tab_against(4)">Final</div>
					</div>
					<!-- 单败/双败/循环 -->
					<!-- activeName == 5 单败  == 6 双败 == 7自由模式 == 3、4 循环模式 -->
					<div class="win_tabs_list" v-if="win_type == 2 && activeName == 5"  id="rounds_bo" ref="leftBoCont" @scroll="leftBoScroll()" @mouseover="changeFlag(false)">
						<div :class="activeWin == index+1 ? 'win_block win_av' :'win_block'"  v-for="(item,index) in details.rounds" :key="item.roundId">
							<div class="win_block_top">{{item.roundName}}</div>
							<div class="win_block_btom" @click="handleBest(item.roundName,item.roundId)">Bo {{item.best}}</div>
						</div>
					</div>
					<!-- 单败 -->
					<div class="layout_arrange_container" v-if="activeName == 5" id="down_bo" ref="rightBoCont" @scroll="rightBoScroll()" @mouseover="changeFlag(true)">
						<div class="arrange_top" >
							<!-- 多线 -->
							<div v-for="(item1,index1) in details.rounds" :key="item1.roundId" >
								<draggable v-model="item1.roundLogVos" :disabled="index1==0&&detail_list.stages[0]['end']==null?false:true" chosenClass="chosen"  forceFallback="true" group="people" animation="1000" @start="onStart" @end="onEnd">
									<transition-group>
										<div   class="arrange_list_one " :data-roundLogId="item.roundLogId" :data-tournamentUserIdA="item.tournamentUserIdA" :data-tournamentUserIdB="item.tournamentUserIdB" :data-stageId="item.stageId"  v-for="(item,index) in item1.roundLogVos" :key="item.roundId">
										<div class="heightX" v-if="item.roundLogId == 999900"></div>                           
											<div class="arrage_round_one" v-else>
												<div class="round_block_one" :style="'padding-top:calc('+item.padding_top+'vw);'">
													<div class="team_bac" :ref="index1 + 'refs' + index" :key="index"  >
														<div class="team_top ">
															<div class="team_left">
																<div class="team_radius">
																	<el-image :src="HOST + item.teamLogoA" style="width:100%;height:100%;">
																		<div slot="error" class="image-slot"> 
																			<img src="../../assets/images/default.png"  class="default_img"/>
																		</div>
																	</el-image>
																	<!-- <img v-if="item.teamLogoA" :src="HOST + item.teamLogoA" style="width:100%;height:100%;"/> -->
																	<!-- <img v-else src="../../assets/images/default.png" class="default_img"/> -->
																</div>
																<el-tooltip class="item" effect="dark" :content="item.teamNameA" placement="bottom">
																	<div class="team_name">{{item.teamNameA}}</div>
																</el-tooltip>
																<!-- <div class="team_name">{{item.teamNameA}}</div> -->
															</div>
															<div class="team_right">
																<div class="team_num" @click="triumphStatus(item,index1)">{{item.aScore}} </div>
															</div>
														</div>
														<div class="team_btom ">
															<div class="team_left">
																<div class="team_radius">
																	<el-image :src="HOST + item.teamLogoB" style="width:100%;height:100%;">
																		<div slot="error" class="image-slot"> 
																			<img src="../../assets/images/default.png"  class="default_img"/>
																		</div>
																	</el-image>
																</div>
																<el-tooltip class="item" effect="dark" :content="item.teamNameB" placement="bottom">
																	<div class="team_name">{{item.teamNameB}}</div>
																</el-tooltip>
															</div>
															<div class="team_right">
																<div class="team_num" @click="triumphStatus(item,index1)">{{item.bScore}}</div>
															</div>
														</div>
													</div>
													<div class="team_border" v-if="index1!=0&&(item['luckyAId']!=null&&item['luckyBId']==null)" :style="'top:50%'"></div>
													<div class="round_multiline" v-if="index1!=0&&(item['luckyAId']==null&&item['luckyBId']==null)"  :style="'top:calc('+item.top+'vw);height:calc('+item.height+'vw);'">
														<div class="multiline_border" :style="'top:calc(50% )'"></div>
													</div>
												</div>
											</div>
										</div>
									</transition-group>
								</draggable> 
							</div>
						</div>
					</div>
					<!-- 双败 -->
					<div class="double_defeat_container" v-if="activeName == 6">
						<!-- 胜利组 -->
						<div class="defeat_block">
							<div class="defeat_tit">Upper Bracket</div>
							<div class="defea_tabs_list" id="rounds_bo" ref="leftDoubleBoCont" @scroll="leftBoCont()" @mouseover="changeFlag(false)">
								<div :class="activeWin == index+1 ? 'win_defea_block win_defea_av' :'win_defea_block'"  v-for="(item,index) in details.rounds" :key="item.roundId">
									<div class="win_block_top">{{item.roundName}}</div>
									<div class="win_block_btom" @click="handleBest(item.roundName,item.roundId)">Bo {{item.best}}</div>
								</div>
							</div>
							<div class="layout_arrange_container" id="down_bo" ref="rightBoCont" @scroll="rightBoScroll()" @mouseover="changeFlag(true)">
								<div class="arrange_top" >
									<!-- 多线 -->
									<div v-for="(item1,index1) in details.rounds" :key="item1.roundId">
										<draggable v-model="item1.roundLogVos" :disabled="index1==0&&detail_list.stages[0]['end']==null?false:true" chosenClass="chosen"  forceFallback="true" group="people" animation="1000" @start="onStart" @end="onEnd">
											<transition-group>
												<div   class="arrange_list_one " :data-roundLogId="item.roundLogId" :data-tournamentUserIdA="item.tournamentUserIdA" :data-tournamentUserIdB="item.tournamentUserIdB" :data-stageId="item.stageId"  v-for="(item,index) in item1.roundLogVos" :key="item.roundId" v-if="item.roundId == item1.roundId">
													<div class="heightX" v-if="item.roundLogId == undefined"></div>
													<div class="arrage_round_one">
														<div class="round_block_one" :style="'padding-top:calc('+item.padding_top+'vw);'">
															<div class="team_bac"  :ref="index1 + 'refs' + index" :key="index" >
																<div class="team_top ">
																	<div class="team_left">
																		<div class="team_radius">
																			<el-image :src="HOST + item.teamLogoA" style="width:100%;height:100%;">
																				<div slot="error" class="image-slot"> 
																					<img src="../../assets/images/default.png"  class="default_img"/>
																				</div>
																			</el-image>
																			<!-- <img v-if="item.teamLogoA" :src="HOST + item.teamLogoA" style="width:100%;height:100%;"/> -->
																		
																		</div>
																		<el-tooltip class="item" effect="dark" :content="item.teamNameA" placement="bottom">
																			<div class="team_name">{{item.teamNameA}}</div>
																		</el-tooltip>
																	</div>
																	<div class="team_right">
																		<div class="team_num" @click="triumphStatus(item,index1)" v-if="detail_list.stages[0].format == 2">{{item.aScore}} </div>
																	</div>
																</div>
																<div class="team_btom ">
																	<div class="team_left">
																		<div class="team_radius">
																			<el-image :src="HOST + item.teamLogoB" style="width:100%;height:100%;">
																				<div slot="error" class="image-slot"> 
																					<img src="../../assets/images/default.png"  class="default_img"/>
																				</div>
																			</el-image>
																			<!-- <img v-if="item.teamLogoB" :src="HOST + item.teamLogoB" style="width:100%;height:100%;"/> -->
																		</div>
																		<el-tooltip class="item" effect="dark" :content="item.teamNameB" placement="bottom">
																			<div class="team_name">{{item.teamNameB}}</div>
																		</el-tooltip>
																	</div>
																	<div class="team_right">
																		<div class="team_num" @click="triumphStatus(item,index1)">{{item.bScore}}</div>
																	</div>
																</div>
																<div class="team_border" v-if="index1!=0&&(item['luckyAId']!=null&&item['luckyBId']==null)||(index1+1)==details.rounds.length" :style="'top:calc('+((item.padding_top > 0 ? item.padding_top:0) +4.583)+'vw);'"></div>
																<div class="round_multiline" v-if="index1!=0&&(item['luckyAId']==null&&item['luckyBId']==null)&&(index1+1)!=details.rounds.length"  :style="'top:calc('+item.top+'vw);height:calc('+item.height+'vw);'">
																	<div class="multiline_border" :style="'top:calc(50% )'"></div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</transition-group>
										</draggable> 
									</div>
								</div>
							</div>
						</div>
						<!-- 失败组 -->
						<div class="defeat_Two_block">
							<div class="defeat_tit">Lower Bracket</div>
							<div class="lower_tabs_list" id="loserounds_bo" ref="leftLoserBoCont" @scroll="leftLoserBoCont()" @mouseover="changeFlag(false)">
								<div class="lower_margin" v-for="(item,index) in details.rounds" :key="item.roundId" @click="tab_against(index)">
									<!-- <div :class="activeAgain == index ? 'lower_block lower_av' :'lower_block'" >{{item.roundName}}</div> -->
									<div :class="activeWin == index+1 ? 'lower_block lower_av' :'lower_block'" >{{item.roundName}}</div>
								</div>
							</div>
							<div class="layout_arrange_container" id="loserdown_bo" ref="rightLoserBoCont" @scroll="rightLoserBoCont()" @mouseover="changeFlag(true)">
								<div class="arrange_top" >
									<!-- 多线 -->
									<div v-for="(item1,index1) in details.loserRounds" :key="item1.roundId">
										<draggable v-model="item1.roundLogVos" :disabled="index1==0&&detail_list.stages[0]['end']==null?false:true" chosenClass="chosen"  forceFallback="true" group="people" animation="1000" @start="onStart" @end="onEnd">
											<transition-group>
												<div   class="arrange_list_one " :data-roundLogId="item.roundLogId" :data-tournamentUserIdA="item.tournamentUserIdA" :data-tournamentUserIdB="item.tournamentUserIdB" :data-stageId="item.stageId"  v-for="(item,index) in item1.roundLogVos" :key="item.roundId" v-if="item.roundId == item1.roundId">
													<div class="heightX" v-if="item.roundLogId == undefined"></div>
													<div class="arrage_round_one">
														<div class="round_block_one" :style="'padding-top:calc('+item.padding_top+'vw);'">
															<div class="team_bac"  :ref="index1 + 'refs' + index" :key="index" >
																<div class="team_top ">
																	<div class="team_left">
																		<div class="team_radius">
																			<el-image :src="HOST + item.teamLogoA" style="width:100%;height:100%;">
																				<div slot="error" class="image-slot"> 
																					<img src="../../assets/images/default.png"  class="default_img"/>
																				</div>
																			</el-image>
																			<!-- <img v-if="item.teamLogoA" :src="HOST + item.teamLogoA" style="width:100%;height:100%;"/> -->
																		</div>
																		<el-tooltip class="item" effect="dark" :content="item.teamNameA" placement="bottom">
																			<div class="team_name">{{item.teamNameA}}</div>
																		</el-tooltip>
																	</div>
																	<div class="team_right">
																		<div class="team_num" @click="triumphStatus(item,index1)" v-if="detail_list.stages[0].format == 2">{{item.aScore}} </div>
																	</div>
																</div>
																<div class="team_btom ">
																	<div class="team_left">
																		<div class="team_radius">
																			<el-image :src="HOST + item.teamLogoB" style="width:100%;height:100%;">
																				<div slot="error" class="image-slot"> 
																					<img src="../../assets/images/default.png"  class="default_img"/>
																				</div>
																			</el-image>
																			<!-- <img v-if="item.teamLogoB" :src="HOST + item.teamLogoB" style="width:100%;height:100%;"/> -->
																		</div>
																		<el-tooltip class="item" effect="dark" :content="item.teamNameB" placement="bottom">
																			<div class="team_name">{{item.teamNameB}}</div>
																		</el-tooltip>
																		<!-- <div class="team_name">{{item.teamNameB}}</div> -->
																	</div>
																	<div class="team_right">
																		<div class="team_num" @click="triumphStatus(item,index1)">{{item.bScore}}</div>
																	</div>
																</div>
																<div class="team_border" v-if="index1!=0&&(item['luckyAId']!=null&&item['luckyBId']==null)||(index1+1)==details.loserRounds.length" :style="'top:calc('+((item.padding_top > 0 ? item.padding_top:0) +4.583)+'vw);'"></div>
																<div class="round_multiline" v-if="index1!=0&&(item['luckyAId']!=null&&item['luckyBId']!=null)&&(index1+1)!=details.loserRounds.length"  :style="'top:calc('+item.top+'vw);height:calc('+item.height+'vw);'">
																	<div class="multiline_border" :style="'top:calc(50% )'"></div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</transition-group>
										</draggable> 
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- 自由模式 -->
					<div class="default_rank" v-if="(detail_list.stages[0]['end']==null||detail_list.stages[0]['end']==false) && activeName == 7 ">
						<div class="default_top">
							<div class="default_list_one">
								<!-- 两个一组 -->
								<div class="default_round_two">
									<div class="round_block_two">
										<div class="team_top" v-for="(item,index) in details" :key="index" @click="handleFreeStatus">
											<div class="team_left">
												<div class="team_radius">
													<el-image :src="HOST + item.teamLogo" style="width:100%;height:100%;">
														<div slot="error" class="image-slot"> 
															<img src="../../assets/images/default.png"  class="default_img"/>
														</div>
													</el-image>
													<!-- <img v-if="item.teamLogo" :src="HOST + item.teamLogo" style="width:100%;height:100%;"/> -->
												</div>
												<el-tooltip class="item" effect="dark" :content="item.teamName" placement="bottom">
													<div class="team_name">{{item.teamName}}</div>
												</el-tooltip>
												<!-- <div class="team_name">{{item.teamName}}</div> -->
											</div>
											<div class="team_right">
												<div class="team_num">{{item.rank}}</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- 自由模式成绩展示-->
					<div class="spread_rank" v-if="detail_list.stages[0]['end']==true && activeName == 7 ">
						<div class="spread_top">
							<div class="spread_list_one">								
								<div class="spread_round_two">
									<div class="spread_block_two">
										<div class="team_top" v-for="(item,index) in details" :key="index">
											<div class="team_left">
												<div class="team_radius">
													<el-image :src="HOST + item.teamLogo" style="width:100%;height:100%;">
														<div slot="error" class="image-slot"> 
															<img src="../../assets/images/default.png"  class="default_img"/>
														</div>
													</el-image>
													<!-- <img v-if="item.teamLogo" :src="HOST + item.teamLogo" style="width:100%;height:100%;"/> -->
												</div>
												<el-tooltip class="item" effect="dark" :content="item.teamName" placement="bottom">
													<div class="team_name">{{item.teamName}}</div>
												</el-tooltip>
											</div>
											<div class="team_right">
												<div class="team_num " :class="index==0?'spread_color':''">{{item.rank}}</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- 对阵小组赛 -->
				<div class="event_group_tabs" v-if="activeName == 3">
					<div class="ag_btn_list">
						<!-- <div class="a_btn_left">
							<div class="ag_rank">默认排位</div>
							<div class="ag_ranking">打乱种子选手排位</div>
						</div> -->
						<div class="a_btn_right">
							<div class="start_btn" style="float:right" @click="stageStart" v-if="detail_list.stages[0]['end']==null">比赛开始</div>
							<div class="start_btn" style="float:right" @click="stageStop" v-if="detail_list.stages[0]['end']==false">结束比赛</div>
						</div>
					</div>
					<div class="group_table_block" v-if="group_tit_index == 1" v-for="(item,index) in detail_list.stages[0]['group']" :key="index">
						<div class="group_tabs_title">
							<div class="group_text">{{index}} 组</div>
							<div :class="group_tit_index == 1 ?'group_btn group_btn2':'group_btn' " @click="groupIndex(1)">排行榜</div>
							<div :class="group_tit_index == 2 ?'group_btn group_btn2':'group_btn' " @click="groupIndex(2)">对阵详情</div>
						</div>
						<div class="group_tabs_table">
							<div class="group_table_top">
								<div class="group_top_block">排名</div>
								<div class="group_top_block2">参赛者</div>
								<div class="group_top_block3">赛事 (赢-平-输)</div>
								<div class="group_top_block3">盘获胜数</div>
								<div class="group_top_block3">盘平局数</div>
								<div class="group_top_block3">分数</div>
								<div class="group_top_block2">比赛历史</div>
							</div>
							<div class="group_table_content">
								<div class="group_list" v-for="(gtem,gdex) in item" :key="gdex">
									<div class="group_btom_block">{{gtem.rank}}</div>
									<div class="group_btom_block2">
										<div class="group_radius">
											<el-image :src="HOST + gtem.logo" style="width:100%;height:100%;">
												<div slot="error" class="image-slot"> 
													<img src="../../assets/images/default.png"/>
												</div>
											</el-image>
											<!-- <img style="width:100%;height:100%;" v-if="gtem.logo" :src="HOST + gtem.logo"/> -->
										</div>
										<el-tooltip class="item" effect="dark" :content="gtem.name" placement="bottom">
											<div class="group_name">{{gtem.name}}</div>
										</el-tooltip>
									</div>
									<!-- <div class="group_btom_block3">{{gtem.win}}  - {{gtem.draw}} - {{gtem.lose}}</div> -->
									<div class="group_btom_block3">
										<div class="draw_num">{{gtem.win}} </div>
										<span>-</span>
										<div class="win_num">{{gtem.draw}}</div>
										<span>-</span>
										<div class="lose_num">{{gtem.lose}}</div>
									</div>
									<div class="group_btom_block3 draw">{{gtem.win}}</div>
									<div class="group_btom_block3 win">{{gtem.draw}}</div>
									<div class="group_btom_block3">{{gtem.score}}</div>
									<div class="group_btom_block2">
										<div class="group_status" v-if="gtem.history!=null" @mouseenter="showHistory(gtem.stageRankId)" @mouseleave="closeHistory(gtem.stageRankId)">
											<!-- <div :class="index1==0?'group_color':index1==1?'group_color2':'group_color3'" v-for="(item,index1) in gtem.history" :key="index1" >{{item}}</div> -->
											<!-- <div :class="gtem.history[index1]=='D'?'group_color':gtem.history[index1] == 'W'?'group_color2':'group_color3'" v-for="(item,index1) in gtem.history" :key="index1" >{{item}}</div> -->
											<div :class="gtem.history[0]=='T'?'group_color2':gtem.history[0] == 'W'?'group_color':'group_color3'" >{{gtem.history[0]}}</div>
											<div :class="gtem.history[1]=='T'?'group_color2':gtem.history[1] == 'W'?'group_color':'group_color3'" v-if="gtem.history.length>=2">{{gtem.history[1]}}</div>
											<div :class="gtem.history[2]=='T'?'group_color2':gtem.history[2] == 'W'?'group_color':'group_color3'" v-if="gtem.history.length>=3">{{gtem.history[2]}}</div>
											<div v-if="gtem.history.length>=4">……</div>
											<div class="group_status_area" v-if="gtem.group_status == true">
												<div :class="gtem.history[index1]=='T'?'group_color2':gtem.history[index1] == 'W'?'group_color':'group_color3'" v-for="(item,index1) in gtem.history" :key="index1" >{{item}}</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="grou_tabs_information"  v-if="group_tit_index == 2" v-for="(item,index) in details.rounds" :key="index">
						<div class="group_tabs_title">
							<div class="group_text">{{index}} 组</div>
							<div :class="group_tit_index == 1 ?'group_btn group_btn2':'group_btn' " @click="groupIndex(1)">排行榜</div>
							<div :class="group_tit_index == 2 ?'group_btn group_btn2':'group_btn' " @click="groupIndex(2)">对阵详情</div>
						</div>
						<div class="group_details">
							<div class="group_tabs_container" :id="appoint(index)"ref="leftCont" @scroll="leftScroll(index)" @mouseover="changeFlag(false)">
								<div class="group_tabs_list" ><!-- @click="tab_group(item1.roundId)" -->
									<div :class="activegroup == item1.roundId ? 'group_block group_av' :'group_block'" :id="'group_block'+index1" @click="tab_group(item1.roundId,index,index1)"  v-for="(item1,index1) in item" :key="item1.roundId">{{item1.roundName}}</div>
								</div>
							</div>
							<div class="group_round_container" :id="appoint2(index)" ref="rightCont" @scroll="rightScroll(index)" @mouseover="changeFlag(true)">
								<div class="arrange_top">
									<!-- top 排列第一组 -->
									<div class="arrange_list_one" style="display: flex;align-items: center;overflow-y: hidden;flex-wrap: nowrap;">
										<!-- 两个一组 -->
										<div class="arrage_round_two" style="margin-right:20px" v-for="(item1,index1) in item" :key="index1" v-if="item1.log_status == false">
											<div class="round_block_two" v-for="(item2,index2) in item1.roundLogVos" :key="index2">
												<div class="team_top">
													<div class="team_left">
														<div class="team_radius">
															<el-image :src="HOST +item2.teamLogoA" style="width:100%;height:100%;">
																<div slot="error" class="image-slot"> 
																	<img src="../../assets/images/default.png"  class="default_img"/>
																</div>
															</el-image>
															<!-- <img :src="HOST + item2.teamLogoA" style="width:100%;height:100%;"/> -->
															<!-- <img v-if="item2.teamLogoA" :src="HOST + item2.teamLogoA" style="width:100%;height:100%;"/> -->
														</div>														
														<el-tooltip class="item" effect="dark" :content="item2.teamNameA" placement="bottom">
															<div class="team_name">{{item2.teamNameA}}</div>
														</el-tooltip>
													</div>
													<div class="team_right">
														<div class="team_num" @click="triumphStatus(item2,index2)">{{item2.aScore}}</div>
													</div>
												</div>
												<div class="team_btom">
													<div class="team_left">
														<div class="team_radius">
															<el-image :src="HOST +item2.teamLogoB" style="width:100%;height:100%;">
																<div slot="error" class="image-slot"> 
																	<img src="../../assets/images/default.png"  class="default_img"/>
																</div>
															</el-image>
															<!-- <img v-if="item2.teamLogoB" :src="HOST + item2.teamLogoB" style="width:100%;height:100%;"/> -->
														</div>
														<el-tooltip class="item" effect="dark" :content="item2.teamNameB" placement="bottom">
															<div class="team_name">{{item2.teamNameB}}</div>
														</el-tooltip>
													</div>
													<div class="team_right">
														<div class="team_num" @click="triumphStatus(item2,index2)">{{item2.bScore}}</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- 决赛 -->
				<div class="event_against_tabs" v-if="activeName == 4 ">
					<div class="ag_btn_list">
						<div class="a_btn_right">
							<div class="start_btn" style="float:right" @click="stageStart" v-if="detail_list.stages[1]['end']==null">比赛开始</div>
							<div class="start_btn" style="float:right" @click="stageStop" v-if="detail_list.stages[1]['end']==false">结束比赛</div>
						</div>
					</div>
					<!-- 单败/双败/循环 -->
					<!-- activeName == 5 单败  == 6 双败 == 7自由模式 == 3、4 循环模式 -->
					<div class="win_tabs_list" v-if="win_type == 2 && activeName == 4 && detail_list.stages[1].format==1" id="rounds_bo" ref="leftBoCont" @scroll="leftBoScroll()" @mouseover="changeFlag(false)">
						<div :class="activeWin == index+1 ? 'win_block win_av' :'win_block'"  v-for="(item,index) in details.rounds" :key="item.roundId">
							<div class="win_block_top">{{item.roundName}}</div>
							<div class="win_block_btom" @click="handleBest(item.roundName,item.roundId)">Bo {{item.best}}</div>
						</div>
					</div>
					<!-- 单败 -->
					<div class="layout_arrange_container" v-if="detail_list.stages[1].format==1" id="down_bo" ref="rightBoCont" @scroll="rightBoScroll()" @mouseover="changeFlag(true)">
						<div class="arrange_top" >
							<div v-for="(item1,index1) in details.rounds" :key="item1.roundId" >
								<draggable v-model="item1.roundLogVos" :disabled="index1==0&&detail_list.stages[0]['end']==null?false:true" chosenClass="chosen"  forceFallback="true" group="people" animation="1000" @start="onStart" @end="onEnd">
									<transition-group>
										<div   class="arrange_list_one " :data-roundLogId="item.roundLogId" :data-tournamentUserIdA="item.tournamentUserIdA" :data-tournamentUserIdB="item.tournamentUserIdB" :data-stageId="item.stageId"  v-for="(item,index) in item1.roundLogVos" :key="item.roundId" v-if="item.roundId == item1.roundId">
											<div class="arrage_round_one">
												<div class="round_block_one" :style="'padding-top:calc('+item.padding_top+'vw);'">

													<div class="team_bac" :ref="index1 + 'refs' + index" :key="index"  >
														<div class="team_top ">
															<div class="team_left">
																<div class="team_radius">
																	<el-image :src="HOST + item.teamLogoA" style="width:100%;height:100%;">
																		<div slot="error" class="image-slot"> 
																			<img src="../../assets/images/default.png"  class="default_img"/>
																		</div>
																	</el-image>
																	<!-- <img v-if="item.teamLogoA" :src="HOST + item.teamLogoA" style="width:100%;height:100%;"/> -->
																</div>
																<el-tooltip class="item" effect="dark" :content="item.teamNameA" placement="bottom">
																	<div class="team_name">{{item.teamNameA}}</div>
																</el-tooltip>
															</div>
															<div class="team_right">
																<div class="team_num" @click="triumphStatus(item,index1)">{{item.aScore}} </div>
															</div>
														</div>
														<div class="team_btom ">
															<div class="team_left">
																<div class="team_radius">
																	<el-image :src="HOST + item.teamLogoB" style="width:100%;height:100%;">
																		<div slot="error" class="image-slot"> 
																			<img src="../../assets/images/default.png"  class="default_img"/>
																		</div>
																	</el-image>
																	<!-- <img v-if="item.teamLogoB" :src="HOST + item.teamLogoB" style="width:100%;height:100%;"/> -->
																</div>
																<el-tooltip class="item" effect="dark" :content="item.teamNameB" placement="bottom">
																	<div class="team_name">{{item.teamNameB}}</div>
																</el-tooltip>
																<!-- <div class="team_name">{{item.teamNameB}}</div> -->
															</div>
															<div class="team_right">
																<div class="team_num" @click="triumphStatus(item,index1)">{{item.bScore}}</div>
															</div>
														</div>
													</div>
													<div class="team_border" v-if="index1!=0&&(item['luckyAId']!=null&&item['luckyBId']==null)" :style="'top:50%'"></div>
													<div class="round_multiline" v-if="index1!=0&&(item['luckyAId']==null&&item['luckyBId']==null)"  :style="'top:calc('+item.top+'vw);height:calc('+item.height+'vw);'">
														<div class="multiline_border" :style="'top:calc(50% )'"></div>
													</div>
												</div>
											</div>
										</div>
									</transition-group>
								</draggable> 
							</div>
						</div>
					</div>
					<!-- 双败 -->
					<div class="double_defeat_container" v-if="detail_list.stages[1].format==2">
						<!-- 胜利组 -->
						<div class="defeat_block">
							<div class="defeat_tit">Upper Bracket</div>
							<div class="defea_tabs_list" id="rounds_bo" ref="leftBoCont" @scroll="leftBoScroll()" @mouseover="changeFlag(false)">
								<div :class="activeWin == index+1 ? 'win_defea_block win_defea_av' :'win_defea_block'"  v-for="(item,index) in details.rounds" :key="item.roundId">
									<div class="win_block_top">{{item.roundName}}</div>
									<div class="win_block_btom" @click="handleBest(item.roundName,item.roundId)">Bo {{item.best}}</div>
								</div>
							</div>
							<div class="layout_arrange_container" id="down_bo" ref="rightBoCont" @scroll="rightBoScroll()" @mouseover="changeFlag(true)">
								<div class="arrange_top" >
									<!-- 多线 -->
									<div v-for="(item1,index1) in details.rounds" :key="item1.roundId">
										<draggable v-model="item1.roundLogVos" :disabled="index1==0&&detail_list.stages[0]['end']==null?false:true" chosenClass="chosen"  forceFallback="true" group="people" animation="1000" @start="onStart" @end="onEnd">
											<transition-group>
												<div   class="arrange_list_one " :data-roundLogId="item.roundLogId" :data-tournamentUserIdA="item.tournamentUserIdA" :data-tournamentUserIdB="item.tournamentUserIdB" :data-stageId="item.stageId" 
													v-for="(item,index) in item1.roundLogVos" :key="item.roundId" v-if="item.roundId == item1.roundId">
													<div class="heightX" v-if="item.roundLogId == undefined"></div>
													<div class="arrage_round_one">
														<div class="round_block_one" :style="'padding-top:calc('+item.padding_top+'vw);'">
															<div class="team_bac"  :ref="index1 + 'refs' + index" :key="index" >
																<div class="team_top ">
																	<div class="team_left">
																		<div class="team_radius">
																			<el-image :src="HOST + item.teamLogoA" style="width:100%;height:100%;">
																				<div slot="error" class="image-slot"> 
																					<img src="../../assets/images/default.png"  class="default_img"/>
																				</div>
																			</el-image>
																			<!-- <img v-if="item.teamLogoA" :src="HOST + item.teamLogoA" style="width:100%;height:100%;"/> -->
																			<!-- <img v-else src="../../assets/images/default.png" class="default_img"/> -->
																		</div>
																		<el-tooltip class="item" effect="dark" :content="item.teamNameA" placement="bottom">
																			<div class="team_name">{{item.teamNameA}}</div>
																		</el-tooltip>
																	</div>
																	<div class="team_right">
																		<div class="team_num" @click="triumphStatus(item,index1)" >{{item.aScore}} </div>
																	</div>
																</div>
																<div class="team_btom ">
																	<div class="team_left">
																		<div class="team_radius">
																			<el-image :src="HOST + item.teamLogoB" style="width:100%;height:100%;">
																				<div slot="error" class="image-slot"> 
																					<img src="../../assets/images/default.png"  class="default_img"/>
																				</div>
																			</el-image>
																			<!-- <img v-if="item.teamLogoB" :src="HOST + item.teamLogoB" style="width:100%;height:100%;"/> -->
																		</div>
																		<el-tooltip class="item" effect="dark" :content="item.teamNameB" placement="bottom">
																			<div class="team_name">{{item.teamNameB}}</div>
																		</el-tooltip>
																	</div>
																	<div class="team_right">
																		<div class="team_num" @click="triumphStatus(item,index1)">{{item.bScore}}</div>
																	</div>
																</div>
																<div class="team_border" v-if="index1!=0&&(item['luckyAId']!=null&&item['luckyBId']==null)||(index1+1)==details.rounds.length" :style="'top:calc('+((item.padding_top > 0 ? item.padding_top:0) +4.583)+'vw);'"></div>
																<div class="round_multiline" v-if="index1!=0&&(item['luckyAId']==null&&item['luckyBId']==null)&&(index1+1)!=details.rounds.length"  :style="'top:calc('+item.top+'vw);height:calc('+item.height+'vw);'">
																	<div class="multiline_border" :style="'top:calc(50% )'"></div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</transition-group>
										</draggable> 
									</div>
								</div>
							</div>
						</div>
						<!-- 失败组 -->
						<div class="defeat_Two_block">
							<div class="defeat_tit">Lower Bracket</div>
							<div class="lower_tabs_list" id="loserounds_bo" ref="leftLoserBoCont" @scroll="leftLoserBoCont()" @mouseover="changeFlag(false)">
								<div class="lower_margin" v-for="(item,index) in details.rounds" :key="item.roundId" @click="tab_against(index)">
									<!-- <div :class="activeAgain == index ? 'lower_block lower_av' :'lower_block'" >{{item.roundName}}</div> -->
									<div :class="activeWin == index+1 ? 'lower_block lower_av' :'lower_block'" >{{item.roundName}}</div>
								</div>
							</div>
							<div class="layout_arrange_container" id="loserdown_bo" ref="rightLoserBoCont" @scroll="rightLoserBoCont()" @mouseover="changeFlag(true)">
								<div class="arrange_top" >
									<!-- 多线 -->
									<div v-for="(item1,index1) in details.loserRounds" :key="item1.roundId">
										<draggable v-model="item1.roundLogVos" :disabled="index1==0&&detail_list.stages[0]['end']==null?false:true" chosenClass="chosen"  forceFallback="true" group="people" animation="1000" @start="onStart" @end="onEnd">
											<transition-group>
												<div   class="arrange_list_one " :data-roundLogId="item.roundLogId" :data-tournamentUserIdA="item.tournamentUserIdA" :data-tournamentUserIdB="item.tournamentUserIdB" :data-stageId="item.stageId"  v-for="(item,index) in item1.roundLogVos" :key="item.roundId" v-if="item.roundId == item1.roundId">
													<div class="heightX" v-if="item.roundLogId == undefined"></div>
													<div class="arrage_round_one">
														<div class="round_block_one" :style="'padding-top:calc('+item.padding_top+'vw);'">
															<div class="team_bac"  :ref="index1 + 'refs' + index" :key="index" >
																<div class="team_top ">
																	<div class="team_left">
																		<div class="team_radius">
																			<el-image :src="HOST + item.teamLogoA" style="width:100%;height:100%;">
																				<div slot="error" class="image-slot"> 
																					<img src="../../assets/images/default.png"  class="default_img"/>
																				</div>
																			</el-image>
																			<!-- <img v-if="item.teamLogoA" :src="HOST + item.teamLogoA" style="width:100%;height:100%;"/> -->
																		</div>
																		<el-tooltip class="item" effect="dark" :content="item.teamNameA" placement="bottom">
																			<div class="team_name">{{item.teamNameA}}</div>
																		</el-tooltip>
																	</div>
																	<div class="team_right">
																		<div class="team_num" @click="triumphStatus(item,index1)" v-if="detail_list.stages[0].format == 2">{{item.aScore}} </div>
																	</div>
																</div>
																<div class="team_btom ">
																	<div class="team_left">
																		<div class="team_radius">
																			<el-image :src="HOST + item.teamLogoB" style="width:100%;height:100%;">
																				<div slot="error" class="image-slot"> 
																					<img src="../../assets/images/default.png"  class="default_img"/>
																				</div>
																			</el-image>
																			<!-- <img v-if="item.teamLogoB" :src="HOST + item.teamLogoB" style="width:100%;height:100%;"/> -->
																		</div>
																		<el-tooltip class="item" effect="dark" :content="item.teamNameB" placement="bottom">
																			<div class="team_name">{{item.teamNameB}}</div>
																		</el-tooltip>
																	</div>
																	<div class="team_right">
																		<div class="team_num" @click="triumphStatus(item,index1)">{{item.bScore}}</div>
																	</div>
																</div>
																<div class="team_border" v-if="index1!=0&&(item['luckyAId']!=null&&item['luckyBId']==null)||(index1+1)==details.loserRounds.length" :style="'top:calc('+((item.padding_top > 0 ? item.padding_top:0) +4.583)+'vw);'"></div>
																<div class="round_multiline" v-if="index1!=0&&(item['luckyAId']!=null&&item['luckyBId']!=null)&&(index1+1)!=details.loserRounds.length"  :style="'top:calc('+item.top+'vw);height:calc('+item.height+'vw);'">
																	<div class="multiline_border" :style="'top:calc(50% )'"></div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</transition-group>
										</draggable> 
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import Tinymce from '@/components/Tinymce';
	import LeftView from '@/components/center/left.vue'
	import vuedraggable from 'vuedraggable';
	import draggable from 'vuedraggable'
	import {eventDetail,sponsorAdd,sponsorDel,sponsorUpdate,tournamentAdd,
	endRegistration,roundLog,roundBest,stageStart,stageStop,listUserImg,
	tournamentFreeRank,tournamentRank,logSwap,adminCheckIn,tournamentReset} from '@/api/macth.js'
	import {teamUsers} from '@/api/play.js'
	export default {
		name: "event_details",
		inject:['reload'],
		components: {
			LeftView,
			Tinymce,
			draggable,
			vuedraggable
		},
		data() {
			return {
				member_list:[],//参赛者列表战队成员
				cease_index: 1,
				photo_list: [
				],
				upload_status:false,
				regchare_status: false,
				victory_status:false,
				triumph_status:false,
				loop_status:false,
				free_status:false,
				activeName:1,
				activeEvent:1,
				activeAgain:0,
				activeWin:0,
				activegroup:0,
				list:[
				],
				sponsor_list:[
				],
				spon_title:'',
				spon_type:'',
				victoroy_type:'',
				triumph_type:'',
				defalut_status:true, //名次管理自由显示
				spread_status:false,  //名次管理自由成绩展示
				win_type:2, //1单败 2单败胜制
				match_type:0, //1 单败/双败/自由 布局   2.循环排行/循环对阵
				group_tit_index:1,
				group_list:[
				],
				// 参赛者列表
				list2:[
				],
				detail_list: {},
				spon_title:'',
				spon_type:'',
				dataForm:{
					tournamentId:"",
					sponsorName:"",
					sponsorLogo:"",
					sponsorType:"",
					companyType:"",
					sponsorId:""
				},
				player_list_len:'',
				details:[],
				bestForm:{
					roundId:"",
					best:"",
					name:""	
				},
				//自由模式
				dataRank:{
					tournamentTeamId:"",
					rank:"",
					images:[],
					integral:""
				} ,
				// 非自由模式
				dataRanks:{
					roundLogId:"",
					aScore:"",
					bScore:"",
					win:"",
					aImages:"",
					bImages:""
				},
				imgList:[],
				tournamentUserId:"",
				fileList:[],
				imgNum:0,
				upload_type:1,
				drag:false,
				swap:{
					roundLogA:{
						roundLogId:"",
						tournamentUserIdA:"",
						tournamentUserIdB:"",
						stageId:"",
					},
					roundLogB:{
						roundLogId:"",
						tournamentUserIdA:"",
						tournamentUserIdB:"",
						stageId:"",
					}
				},
				imgLimitA:0,
				imgLimitB:0,
				tournamentUserId1:"",
				tournamentUserId2:"",
				flag: false, // 滚动标识，防止改变scrollLeft时重复触发scroll事件
				proportionW: 1 ,// 设置默认比例为1

			};
		},
		computed: {
			headers() {
				return{
					"Authorization": "Bearer " + sessionStorage.getItem("token")
				}
			}
		},

		mounted() {
			this.showDetails()
			this.listUserImg();
		},
		methods: {
			changeFlag(flag) {
				this.flag = flag
			},
			
			appoint(index){
				return "appoint"+index;
			},
			appoint2(index){
				return "appoint2"+index;
			},
			//双败模式上下同步滚动-轮数滚动控制内容区滚动
			leftLoserBoCont(){
				if (!this.flag) {
					// 滚动到指定位置
					this.$nextTick(() => {
						//轮数滚动条
						let loserounds_bo = document.querySelector('#loserounds_bo')
						//对阵内容区滚动条
						let loserdown_bo = document.querySelector('#loserdown_bo')
						//获取轮数滚动条滚动的距离
						let sLeft = loserounds_bo.scrollLeft
						//实现同步滚动，将轮数滚动条的滚动距离赋值给对阵内容区
						loserdown_bo.scrollLeft = sLeft
					 })
				}
			},
			//双败模式上下同步滚动-内容滚动控制轮数滚动
			rightLoserBoCont(){
				if (this.flag) {
					this.$nextTick(() => {
						let loserounds_bo = document.querySelector('#loserounds_bo')
						let loserdown_bo = document.querySelector('#loserdown_bo')
						let sLeft = loserdown_bo.scrollLeft
						loserounds_bo.scrollLeft = sLeft
					 })
				}
			},
			//单败模式上下同步滚动-轮数滚动控制内容区滚动
			leftBoScroll(){
				if (!this.flag) {
					// 滚动到指定位置
					this.$nextTick(() => {
						//轮数滚动条
						let rounds_bo = document.querySelector('#rounds_bo')
						//对阵内容区滚动条
						let down_bo = document.querySelector('#down_bo')
						//获取轮数滚动条滚动的距离
						let sLeft = rounds_bo.scrollLeft
						//实现同步滚动，将轮数滚动条的滚动距离赋值给对阵内容区
						down_bo.scrollLeft = sLeft
					 })
				}
			},
			// 单败模式上下同步滚动-内容区滚动控制轮数滚动
			rightBoScroll(){
				if (this.flag) {
					this.$nextTick(() => {
						let rounds_bo = document.querySelector('#rounds_bo')
						let down_bo = document.querySelector('#down_bo')
						let sLeft = down_bo.scrollLeft
						rounds_bo.scrollLeft = sLeft
					 })
				}
			},
			// 循环模式对阵详情上下滚动条滚动同步
			leftScroll(index) {
				if (!this.flag) {
					// 滚动到指定位置
					this.$nextTick(() => {
						//轮数滚动条
						let appoint = document.querySelector('#appoint'+index)
						//对阵内容区滚动条
						let appoint2 = document.querySelector('#appoint2'+index)
						//获取轮数滚动条滚动的距离
						let sLeft = appoint.scrollLeft
						//实现同步滚动，将轮数滚动条的滚动距离赋值给对阵内容区
						appoint2.scrollLeft = sLeft
					
					 })
			    }
			},
			// 循环模式对阵详情上下滚动条滚动同步
			rightScroll (index) {
			    if (this.flag) {
					this.$nextTick(() => {
						let appoint = document.querySelector('#appoint'+index)
						let appoint2 = document.querySelector('#appoint2'+index)
						let sLeft = appoint2.scrollLeft
						appoint.scrollLeft = sLeft
					 })
				}
			},
			//循环模式/对阵情况
			tab_group(roundId,index,index1){
				this.activegroup = roundId
				this.$nextTick(() => {
					// 轮数
					let block = document.querySelector('#group_block'+index1)
					let appoint = document.querySelector('#appoint'+index)
					//对阵内容区
					let appoint2 = document.querySelector('#appoint2'+index)
					//获取第几轮的块离最左边的距离，第一块轮数距离最左边107
					let blockLeft = block.offsetLeft
					appoint.scrollLeft = blockLeft - 200
					// 点击第几轮对阵内容区就定位到哪里
					appoint2.scrollLeft = blockLeft - 200
				 })
				// this.details.rounds[h][g]['log_status'] = true
				// this.activegroup = roundId
				// for(let h in this.details.rounds){
				// 	for(let g=0; g < this.details.rounds[h].length;g++){
				// 		if(this.details.rounds[h][g].roundId == roundId){
				// 			// 点击哪一轮就显示哪一轮
				// 			this.details.rounds[h][g]['log_status'] = false
				// 		}else{
				// 			this.details.rounds[h][g]['log_status'] = true
				// 		}
				// 	}
				// }
			},
			//循环模式切换排行榜/对阵详情
			groupIndex(index){
				this.group_tit_index = index
				// for(let h in this.details.rounds){
				// 	for(let g=0; g < this.details.rounds[h].length;g++){
				// 		this.details.rounds[h][g]['log_status'] = false
				// 	}
				// }
			},
			//打乱顺序重新生成对阵
			resetEvent(){
				this.$confirm('是否确定打乱对阵顺序重新生成对阵？', '信息', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				})
				.then(() => {
					tournamentReset({tournamentId:this.detail_list.id}).then(res => {
						this.$message({
							type:'success',
							message:res.message
						})
						this.showDetails()
					})					
				})
				
			},
			//管理端签到
			adminCkeckIn(teamId){
				let params = {
					tournamentId:this.detail_list.id,
					userId:teamId
				}
				this.$confirm('是否确定为该参赛者签到？', '信息', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				})
				.then(() => {
					adminCheckIn(params).then(res => {
						this.$message({
							type:'success',
							message:res.message
						})
						this.showDetails()
						this.activeName = 2
					})
					
				})
			},
			//赛事为团队赛事时，参赛队伍的成员签到
			adminUserCkeckIn(userId){
				let params = {
					tournamentId:this.detail_list.id,
					userId:userId
				}
				this.$confirm('是否确定为该参赛者签到？', '信息', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				})
				.then(() => {
					adminCheckIn(params).then(res => {
						this.$message({
							type:'success',
							message:res.message
						})
						this.reload()
						this.activeName = 2
					})
					
				})
			},
			//打开自由模式排行榜显示
			showHistory(stageRankId){
				// console.log("有反应")
				// console.log(stageRankId)
				let that = this
				for(let b in that.detail_list.stages[0]['group']){
					for(let c = 0; c < that.detail_list.stages[0]['group'][b].length;c++){
						if(that.detail_list.stages[0]['group'][b][c].stageRankId == stageRankId){
							that.detail_list.stages[0]['group'][b][c]['group_status'] = true
						}else{
							// console.log("有问题")
						}
					}
				}
				
			},
			//关闭自由模式排行榜显示
			closeHistory(stageRankId){
				let that = this
				for(let b in that.detail_list.stages[0]['group']){
					for(let c = 0; c < that.detail_list.stages[0]['group'][b].length;c++){
						if(that.detail_list.stages[0]['group'][b][c].stageRankId == stageRankId){
							that.detail_list.stages[0]['group'][b][c]['group_status'] = false
						}else{
							
						}
					}
				}
			},
			//显示总报名战队成员
			showMemeber(teamId){
				for(let a = 0; a< this.detail_list.contestant.length; a++){
					if(this.detail_list.contestant[a].teamId == teamId){
						this.detail_list.contestant[a].show_status = ! this.detail_list.contestant[a].show_status
					}else{
						this.detail_list.contestant[a].show_status = false
					}
				}
			},
			//关闭总报名战队成员的显示
			closeMember(teamId){
				for(let a = 0; a< this.detail_list.contestant.length; a++){
					if(this.detail_list.contestant[a].teamId == teamId){
						this.detail_list.contestant[a].show_status = false
					}
				}
			},
			selectChange(value){
				let that = this;
			},
			// 自动选择胜利组
			handleScore(){
				if(parseFloat(this.dataRanks.aScore) > parseFloat(this.dataRanks.bScore)){
					this.dataRanks.win = this.dataRanks.tournamentUserIdA
				}else{
					this.dataRanks.win = this.dataRanks.tournamentUserIdB
				}
			},
			// 拖拽开始事件
			onStart(e,originalEvent){
				let roundLogId = e.item.dataset.roundlogid
				let tournamentUserIdA = e.item.dataset.tournamentuserida
				let tournamentUserIdB = e.item.dataset.tournamentuseridb
				let stageId = e.item.dataset.stageid
				this.swap.roundLogA = {
					roundLogId,
					tournamentUserIdA,
					tournamentUserIdB,
					stageId
				}
				this.drag=true;
			},
			//拖拽结束事件
			onEnd(e) {
				let that = this;
				let roundLogId = e.item.dataset.roundlogid
				let tournamentUserIdA = e.item.dataset.tournamentuserida
				let tournamentUserIdB = e.item.dataset.tournamentuseridb
				let stageId = e.item.dataset.stageid
				this.swap.roundLogB = {
					roundLogId,
					tournamentUserIdA,
					tournamentUserIdB,
					stageId
				}
				let {...swap} = this.swap;
				let {roundLogB,roundLogA} = swap
				this.tournamentUserId1 = roundLogB['tournamentUserIdA']
				this.tournamentUserId2 = roundLogA['tournamentUserIdA']
				this.swap['roundLogA']['tournamentUserIdA'] = this.tournamentUserId1
				this.swap['roundLogB']['tournamentUserIdA'] = this.tournamentUserId2
				this.drag=false;
				logSwap(this.swap).then(function(res){
					that.$message({
						type: 'success',
						message: '交换成功!'
					});
					that.showDetails();
				})
			},
			handleUploads(type){
				this.upload_status = !this.upload_status
				this.upload_type = type;
				this.fileList = this.dataRanks.fileList
				this.fileList1 = this.dataRanks.fileList1
				if(type == 1){
					this.tournamentUserId = this.dataRanks.tournamentUserIdA
					this.imgLimitA = 5 - this.dataRanks.aImages.length
				}else{
					this.tournamentUserId = this.dataRanks.tournamentUserIdB
					this.imgLimitB = 5 - this.dataRanks.bImages.length
				}
				this.upload_status = true
				for(let i = 0; i < this.imgList.length; i++){
					this.imgList[i]['check'] = false;
				}
			},
			handleRanks(id){
				this.dataRanks.win = ''
				this.dataRanks.win = id
				
			},
			// 非自由模式
			triumphStatus(item,index1){
				if(this.detail_list.stages[0]['format'] ==3){
					if(this.detail_list.stages[0]['end'] == true){
						var end = this.detail_list.stages[1]['end']
					}else{
						var end = this.detail_list.stages[0]['end']
					}
					
				}else{
					var end = this.detail_list.stages[0]['end']
				}

				
				if(item.teamNameA != null || item.teamNameA!= ''){
					if(end==false){
						item.win = item.tournamentUserIdA
						this.dataRanks = item;
						this.triumph_status = !this.triumph_status
					}
				}
			},
			// 自由模式设置分数
			handleFree(){
				let arr = []
				let that = this;
				for(let i = 0; i < this.details.length; i++){
					let {images,integral,rank,tournamentUserId} = this.details[i]
					arr.push({
						images:images.join(","),
						integral,
						rank,
						tournamentTeamId:tournamentUserId
					})
				}
				tournamentFreeRank(arr).then(function(res){
					that.$message({
						type: 'success',
						message: '设置成功!'
					});
					that.free_status = false
					that.upload_status = false
					that.showDetails();
					
					
				})
				
			},

			// tournamentRank(){
			// 	let that = this;
			// 	let {roundLogId,aScore,bScore,win,aImages,bImages} = this.dataRanks
			// 	tournamentRank({
			// 		roundLogId,
			// 		aScore,
			// 		bScore,
			// 		win,
			// 		aImages:aImages.join(","),
			// 		bImages:bImages.join(","),
			// 	}).then(function(res){
			// 		that.$message({
			// 			type: 'success',
			// 			message: '设置成功!'
			// 		});
			// 		that.showDetails();
			// 		that.triumph_status = false
			// 		that.upload_status = false
			// 	})
			// },
			tournamentRank(){
				let that = this;
				let {roundLogId,aScore,bScore,win,aImages,bImages} = this.dataRanks
				let params = {
					roundLogId,
					aScore,
					bScore,
					win,
					aImages:aImages.join(","),
					bImages:bImages.join(","),
				}
				tournamentRank(params).then(function(res){
					that.$message({
						type: 'success',
						message: '设置成功!'
					});
					that.showDetails();
					that.triumph_status = false
					that.upload_status = false
				})
			},
			// 确认使用上传过的图片
			handleConfimImg(){
				this.upload_status = false
				for(let i = 0 ; i < this.imgList.length; i++){
					if(this.imgList[i]['check']){
						if(this.detail_list.stages[0]['format'] == 4){
							for(let i = 0; i < this.details.length; i++){
								if(this.tournamentUserId == this.details[i]['tournamentUserId']){
									this.details[i]['images'].push(this.imgList[i]['url'])
								}
							}
						}else if(this.detail_list.stages[0]['format'] == 1 || this.detail_list.stages[0]['format'] == 2 || this.detail_list.stages[0]['format'] == 3){
							if(this.upload_type == 1){
								this.dataRanks['aImages'].push(this.imgList[i]['url'])
							}else{
								this.dataRanks['bImages'].push(this.imgList[i]['url'])
							}
						}
					}
				}
			},
			// 删除图片
			haneleAddImgDel(item,type=''){
				this.$confirm('确定删除图片?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
				}).then(() => {
					if(this.detail_list.stages[0]['format'] == 4){
						for(let i = 0 ; i < this.details.length ; i++){
							if(this.tournamentUserId == this.details[i]['tournamentUserId']){
								for(let j = 0; j < this.details[i]['images'].length; j++){
									if(this.details[i]['images'][j] == item){
										this.details[i]['images'].splice(j,1)
										this.details[i]['fileList'].splice(j,1)
									}
								}
							}
						}
					}else if(this.detail_list.stages[0]['format'] == 1 || this.detail_list.stages[0]['format'] == 2 || this.detail_list.stages[0]['format'] == 3){
						if(type == 1){
							for(let j = 0; j < this.dataRanks['aImages'].length; j++){
								if(this.dataRanks['aImages'][j] == item){
									this.dataRanks['aImages'].splice(j,1)
									this.dataRanks['fileList'].splice(j,1)
								}
							}
						}else{
							for(let j = 0; j < this.dataRanks['bImages'].length; j++){
								if(this.dataRanks['bImages'][j] == item){
									this.dataRanks['bImages'].splice(j,1)
									this.dataRanks['fileList1'].splice(j,1)
								}
							}
						}
					}
				}).catch(() => {
				});
			},
			// 图片超过限制
			handleExceed(files,fileList){
				console.log(files)
				console.log(fileList)
			},
			// 上传成功
			handleAvatarSuccesss(res,attr) {
				this.$loading({
				customClass: "animated fadeOut"
				}).close();
				if(res.code == 200){
					this.$message({
						type: 'success',
						message: res.message
					});
					if(attr == "images"){
						if(this.detail_list.stages[0]['format'] == 4){
							for(let i = 0 ; i < this.details.length ; i++){
								if(this.tournamentUserId == this.details[i]['tournamentUserId']){
									this.details[i]['images'].push(res.data)
									this.details[i]['fileList'].push({
										name:res.data,
										url:this.HOST + res.data
									})
									this.listUserImg();
								}
							}
						}else if(this.detail_list.stages[0]['format'] == 1||this.detail_list.stages[0]['format'] == 2||  this.detail_list.stages[0]['format'] == 3){ 
							if(this.upload_type == 1){
								this.dataRanks['aImages'].push(res.data)
								for(let i = 0 ; i < this.details.rounds.length ; i++){
									for(let j = 0 ; j < this.details.rounds[i]['roundLogVos'].length; j++){
										this.details.rounds[i]['roundLogVos'][j]['fileList'].push({
											name:res.data,
											url:this.HOST + res.data
										})
									}
								}
								// this.details[i]['fileList'].push({
								// 	name:res.data,
								// 	url:this.HOST + res.data
								// })
							}else{
								this.dataRanks['bImages'].push(res.data)
								for(let i = 0 ; i < this.details.rounds.length ; i++){
									for(let j = 0 ; j < this.details.rounds[i]['loserLogVos'].length; j++){
										this.details.rounds[i]['loserLogVos'][j]['fileList1'].push({
											name:res.data,
											url:this.HOST + res.data
										})
									}
								}
								// this.details[i]['fileList1'].push({
								// 	name:res.data,
								// 	url:this.HOST + res.data
								// })
							}
						}
					}else if(attr === 'sponsor'){
						this.dataForm.sponsorLogo = res.data
					}
				}else{
					this.$message({
						type: 'error',
						message: res.message
					});
				}
				
			},
			// 删除上传图片
			handleAvatarRemoves(file,fileList){
				if(this.detail_list.stages[0]['format'] == 4){
					for(let i = 0 ; i < this.details.length ; i++){
						if(this.tournamentUserId == this.details[i]['tournamentUserId']){
							for(let j = 0; j < this.details[i]['images'].length; j++){
								if(this.details[i]['images'][j] == file.response.data){
									this.details[i]['images'].splice(j,1)
									this.details[i]['fileList'].splice(j,1)
								}
							}
						}
					}
				}else if(this.detail_list.stages[0]['format'] == 1||this.detail_list.stages[0]['format'] == 2||  this.detail_list.stages[0]['format'] == 3){
					if(type == 1){
						for(let j = 0; j < this.dataRanks['aImages'].length; j++){
							if(this.dataRanks['aImages'][j] == file.response.data){
								this.dataRanks['aImages'].splice(j,1)
								this.dataRanks['fileList'].splice(j,1)
							}
						}
					}else{
						for(let j = 0; j < this.dataRanks['bImages'].length; j++){
							if(this.dataRanks['bImages'][j] == file.response.data){
								this.dataRanks['bImages'].splice(j,1)
								this.dataRanks['fileList1'].splice(j,1)
							}
						}
					}
				}
				
			},
			// 上传图片
			beforeAvatarUploads(file) {
				const isJPG = file.type;
				const isLt2M = file.size / 1024 / 1024 < 2;
				this.$loading({
				background: "rgba(255, 255, 255, 0.7)",
				customClass: "animated fadeIn",
				text: "上传中"
				});
				return isJPG && isLt2M;
			},
			// 已上传图片列表
			listUserImg(){
				let that = this;
				listUserImg({}).then(function(res){
					for(let i = 0 ; i < res.data.length; i++){
						res.data[i]['check'] = false;
					}
					that.imgList = res.data
				})
			},
			// 打开成绩上传
			handleFreeStatus(){
				if(this.detail_list.stages[0]['end']==false){
					this.free_status = ! this.free_status
				}
			},
			// 打开上传组件
			uploadImg(item){
				
					this.fileList = item.fileList
					this.tournamentUserId = item.tournamentUserId
					this.upload_status = true
					for(let i = 0; i < this.imgList.length; i++){
						this.imgList[i]['check'] = false;
					}
				
			},
			// 开始比赛
			stageStart(){
				let that = this;
				this.$confirm('是否开始比赛?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
				}).then(() => {
					if(this.detail_list.stages[0]['end'] != true){
						var stageId = this.detail_list.stages[0]['id']
					}else{
						var stageId = this.detail_list.stages[0]['format'] ==3?this.detail_list.stages[1]['id']:this.detail_list.stages[0]['id']
					}
					stageStart({stageId}).then(function(res){
						that.$message({
							type: 'success',
							message: '已开始!'
						});
						that.showDetails();

					})
				
				}).catch(() => {     
				});
				
			},
			// 结束比赛
			stageStop(){
				let that = this;
				this.$confirm('是否结束比赛?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
				}).then(() => {
					if(this.detail_list.stages[0]['end'] != true){
						var stageId = this.detail_list.stages[0]['id']
					}else{
						var stageId = this.detail_list.stages[0]['format'] ==3?this.detail_list.stages[1]['id']:this.detail_list.stages[0]['id']
					}
					
					stageStop({stageId}).then(function(res){
						that.$message({
							type: 'success',
							message: '已结束!'
						});
						that.showDetails();
						
					})
				
				}).catch(() => {     
				});
			},
			// 修改Bo
			handleBest(name,roundId){
				if(this.detail_list.stages[0]['format'] ==3){
					if(this.detail_list.stages[1]['end'] == null){
						this.bestForm.roundId = roundId;
						this.bestForm.name = name;
						this.victory_status = true
					}
				}else{
					if(this.detail_list.stages[0]['end'] == null){
						this.bestForm.roundId = roundId;
						this.bestForm.name = name;
						this.victory_status = true
					}
				}
				
			},
			// 修改Bo
			handleBestSub(){
				let self = this;
				let {name,...params} = this.bestForm;
				roundBest(params).then(res => {
					this.$message({
						type: 'success',
						message: '修改成功!'
					});
					if(this.detail_list.status == 3){
						let stageId = this.detail_list.stages[0]['format'] ==3?this.detail_list.stages[1]['id']:this.detail_list.stages[0]['id']
						roundLog({stageId}).then(function(res){
							self.details = res.data
						})
					}
					this.victory_status = false;
				})
				
			},
			// 结束报名
			endRegistration(tournamentId){
				this.$confirm('确定结束报名?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
				}).then(() => {
					endRegistration({tournamentId:this.$route.query.id}).then(res => {
						this.$message({
							type: 'success',
							message: '已结束!'
						});
						this.showDetails()
					})
				}).catch(() => {      
				});
				
				
			},
			switch_cease(index) {
				this.cease_index = index
			},
			cease_check(image_id){
				this.imgNum = 0
				for (let i = 0; i < this.imgList.length; i++) {
					if(image_id == this.imgList[i].image_id){
						this.imgList[i].check = ! this.imgList[i].check
					}
					if(this.imgList[i]['check']){
						this.imgNum++
					}
				}
			},
			information(){
				// this.$router.push('/match/information?id=' + this.$route.query.id)
				let edit = 'edit'
				this.$router.push({path:'/match/information',query:{id:this.$route.query.id,edit:edit}})
			},
			handleEdit(){
				let edit = 'edit'
				// this.$router.push('/match/information?id=' + this.$route.query.id)
				this.$router.push({path:'/match/information',query:{id:this.$route.query.id,edit:edit}})
			},
			// 上传成功赞助商图片
			handleAvatarSuccess(res, attr, index) {
				let that = this
				that.$loading({
				customClass: "animated fadeOut"
				}).close();
				if(res.code == 200){
					this.$message({
						type: 'success',
						message: res.message
					});
					if (attr === 'sponsorLogo') {
						that.dataForm.sponsorLogo = res.data
					}
				}else{
					this.$message({
						type: 'error',
						message: res.message
					});
				}
				
			},
			// 上传赞助商图片
			beforeAvatarUpload(file) {
				const isJPG = file.type;
				const isLt2M = file.size / 1024 / 1024 < 2;
				this.$loading({
					background: "rgba(255, 255, 255, 0.7)",
					customClass: "animated fadeIn",
					text: "上传中"
				});
			
				return isJPG && isLt2M;
			},
			// 添加赞助商
			sponsorAdd(){
				this.dataForm.tournamentId = this.$route.query.id
				// let ajaxTitle = this.dataForm.sponsorId==''?sponsorAdd:sponsorUpdate
				if((this.dataForm.sponsorType == '' || this.dataForm.sponsorType == null) || this.dataForm.sponsorName == '' 
				|| (this.dataForm.companyType == null || this.dataForm.companyType == '') || (this.dataForm.sponsorLogo == null || this.dataForm.sponsorLogo == '')){
					this.$message({
						type:'warning',
						message:'请完善赞助商信息！'
					})
				}else{
					sponsorAdd(this.dataForm).then(res => {
						this.$message({
							type: 'success',
							message:'添加成功!'
						});
						this.showDetails()
						this.regchare_status = false;
					})
				}
				
			},
			// 编辑赞助商
			sponsorUpdate(){
				this.dataForm.tournamentId = this.$route.query.id
				// let ajaxTitle = this.dataForm.sponsorId==''?sponsorAdd:sponsorUpdate
				sponsorUpdate(this.dataForm).then(res => {
					this.$message({
						type: 'success',
						message:'修改成功!' 
					});
					this.showDetails()
					this.regchare_status = false;
				})
			},
			// 删除赞助商
			handleSopnsDel(id){
				this.$confirm('是否继续删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					sponsorDel({id}).then(res => {
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.showDetails()
					})
				}).catch(() => {       
				});
			},
			back(){
				this.$router.go(-1);//返回上一层
			},
			spon_status(key,stem) {
				if(key == 1){
					this.spon_title = '添加'
					this.dataForm = {
						tournamentId:"",
						sponsorName:"",
						sponsorLogo:"",
						sponsorType:"",
						companyType:"",
						sponsorId:""
					};
				}else{
					this.spon_title = '编辑'
					this.dataForm = stem;
				}
				this.regchare_status = ! this.regchare_status
			},
			tab_tabs(index) {
				this.activeName = index
				if(index == 4){
					let {id,format,group} = this.detail_list.stages[1]
					this.roundList(id,format,group)
				}else if(index == 3){
					let {id,format,group} = this.detail_list.stages[0]
					this.roundList(id,format,group)
				}
			},
			tab_event(index) {
				this.activeEvent = index
			},
			handleClick(tab, event) {
				console.log(tab, event);
			},
			tab_against(index){
				this.activeAgain = index
			},
			tab_win(index){
				this.activeWin = index
				
			},
			// 赛事详情
			showDetails(){
				let self = this;
				let params = {
					tournamentId : self.$route.query.id 
				}
				eventDetail(params).then(function(res){
					console.log(res.data.contestant)
					for(let i = 0; i < res.data.contestant.length;i++){
						res.data.contestant[i]['show_status'] = false
					}
					for(let k in res.data.stages[0]['group']){
						for(let m = 0; m < res.data.stages[0]['group'][k].length;m++){
							res.data.stages[0]['group'][k][m]['group_status'] = false
						}
					}
					self.detail_list = res.data;
					// console.log(self.detail_list.stages[0].format,"format")
					self.player_list_len = (res.data.contestant).length;
					if(res.data.status >= 3){
						let {id,format,group} = res.data.stages[0]
						self.roundList(id,format,group)
					}
				})
			},
			// 对阵信息
			roundList(stageId,format,group){
				let self = this;
				roundLog({stageId}).then(function(res1){
					// 单败
					if(format == 1){
						for(let i = 0 ; i < res1.data.rounds.length ; i++){
							for(let j = 0 ; j < res1.data.rounds[i]['roundLogVos'].length; j++){
								let {aImages,bImages,win} = res1.data.rounds[i]['roundLogVos'][j];
								res1.data.rounds[i]['roundLogVos'][j]['win'] = ''
								if(aImages!=null&&aImages!=''){
									aImages = aImages.split(",")
								}
								if(bImages!=null&&bImages!=''){
									bImages = bImages.split(",")
								}
								if(aImages==null||aImages==''){
									aImages = []
								}
								if(bImages==null||bImages==''){
									bImages = []
								}
								res1.data.rounds[i]['roundLogVos'][j]['aImages'] = aImages
								res1.data.rounds[i]['roundLogVos'][j]['bImages'] = bImages
								res1.data.rounds[i]['roundLogVos'][j]['fileList'] = []
								res1.data.rounds[i]['roundLogVos'][j]['fileList1'] = []
							}
						}
					}
					// 双败模式
					if(format == 2){
						for(let i = 0 ; i < res1.data.rounds.length ; i++){
							for(let j = 0 ; j < res1.data.rounds[i]['roundLogVos'].length; j++){
								let {aImages,bImages,win} = res1.data.rounds[i]['roundLogVos'][j];
								res1.data.rounds[i]['roundLogVos'][j]['win'] = ''
								if(aImages!=null&&aImages!=''){
									aImages = aImages.split(",")
								}
								if(bImages!=null&&bImages!=''){
									bImages = bImages.split(",")
								}
								if(aImages==null||aImages==''){
									aImages = []
								}
								if(bImages==null||bImages==''){
									bImages = []
								}
								res1.data.rounds[i]['roundLogVos'][j]['aImages'] = aImages
								res1.data.rounds[i]['roundLogVos'][j]['bImages'] = bImages
								res1.data.rounds[i]['roundLogVos'][j]['fileList'] = []
								res1.data.rounds[i]['roundLogVos'][j]['fileList1'] = []
							}
						}
						for(let i = 0 ; i < res1.data.loserRounds.length ; i++){
							for(let j = 0 ; j < res1.data.loserRounds[i]['roundLogVos'].length; j++){
								let {aImages,bImages,win} = res1.data.loserRounds[i]['roundLogVos'][j];
								res1.data.loserRounds[i]['roundLogVos'][j]['win'] = ''
								if(aImages!=null&&aImages!=''){
									aImages = aImages.split(",")
								}
								if(bImages!=null&&bImages!=''){
									bImages = bImages.split(",")
								}
								if(aImages==null||aImages==''){
									aImages = []
								}
								if(bImages==null||bImages==''){
									bImages = []
								}
								res1.data.loserRounds[i]['roundLogVos'][j]['aImages'] = aImages
								res1.data.loserRounds[i]['roundLogVos'][j]['bImages'] = bImages
								res1.data.loserRounds[i]['roundLogVos'][j]['fileList'] = []
								res1.data.loserRounds[i]['roundLogVos'][j]['fileList1'] = []
							}
						}
						// for(let i = 0 ; i < res1.data.rounds.length ; i++){
						// 	for(let j = 0 ; j < res1.data.rounds[i]['loserLogVos'].length; j++){
						// 		let {aImages,bImages,win} = res1.data.rounds[i]['loserLogVos'][j];
						// 		res1.data.rounds[i]['loserLogVos'][j]['win'] = ''
						// 		if(aImages!=null&&aImages!=''){
						// 			aImages = aImages.split(",")
						// 		}
						// 		if(bImages!=null&&bImages!=''){
						// 			bImages = bImages.split(",")
						// 		}
						// 		if(aImages==null||aImages==''){
						// 			aImages = []
						// 		}
						// 		if(bImages==null||bImages==''){
						// 			bImages = []
						// 		}
						// 		res1.data.rounds[i]['loserLogVos'][j]['aImages'] = aImages
						// 		res1.data.rounds[i]['loserLogVos'][j]['bImages'] = bImages
						// 		res1.data.rounds[i]['loserLogVos'][j]['fileList'] = []
						// 		res1.data.rounds[i]['loserLogVos'][j]['fileList1'] = []
						// 		console.log(res1.data.rounds[i]['loserLogVos'][j]['aImages'],"loserLogVos-aImages")
						// 		console.log(typeof(res1.data.rounds[i]['loserLogVos'][j]['aImages']),"loserLogVos-aImages")
						// 	}
						// }
					}
					// 自由模式
					if(format == 4){
						for(let i = 0 ; i < res1.data.length; i++){
							res1.data[i]['images'] = []
							res1.data[i]['fileList'] = []
						}
						self.details = res1.data;
						return false;
					}
					// 循环模式
					if(format == 3){
						for(var item in group){
							for(let i = 0 ; i < group[item].length; i++){
								if(item.history!=null){
									let arr = []
									arr.push(group[item][i].history.charAt(0),group[item][i].history.charAt(1),group[item][i].history.charAt(2))
									group[item][i].history = arr
								}
							}

						}
						for(var item in res1.data.rounds){
							for(let i = 0 ; i < res1.data.rounds[item].length; i++){
								for(let j = 0 ; j < res1.data.rounds[item][i]['roundLogVos'].length; j++){
									let {aImages,bImages,win} = res1.data.rounds[item][i]['roundLogVos'][j];
									res1.data.rounds[item][i]['roundLogVos'][j]['win'] = ''
									if(aImages!=null&&aImages!=''){
										aImages = aImages.split(",")
									}
									if(bImages!=null&&bImages!=''){
										bImages = bImages.split(",")
									}
									if(aImages==null||aImages==''){
										aImages = []
									}
									if(bImages==null||bImages==''){
										bImages = []
									}
									res1.data.rounds[item][i]['roundLogVos'][j]['aImages'] = aImages
									res1.data.rounds[item][i]['roundLogVos'][j]['bImages'] = bImages
									res1.data.rounds[item][i]['roundLogVos'][j]['fileList'] = []
									res1.data.rounds[item][i]['roundLogVos'][j]['fileList1'] = []
								}
							}
						}
					}
					if(format!=4){
						// 连线处理
						let { rounds,loserRounds } = res1.data;
						
						// 判断luckyAB都有值得情况下上一个不连线
						for(let i = rounds.length-1 ; i >= 0; i--){
							let he = 0;
							for(let j = 0 ; j < rounds[i]['roundLogVos'].length; j++){
								if(i == 0){
									he += 1;
									rounds[i]['roundLogVos'][j]['max_he'] = he
								}else if(rounds[i]['roundLogVos'][j]['luckyAId'] != null && rounds[i]['roundLogVos'][j]['luckyBId'] != null){
									let {...params} = rounds[i]['roundLogVos'][j]
									params['roundLogId']  = 999900
									rounds[i-1]['roundLogVos'].splice(he,0,params);
									
									he += 1;
								}else if(rounds[i]['roundLogVos'][j]['luckyAId'] != null || rounds[i]['roundLogVos'][j]['luckyBId'] != null){
									he += 1;
								}else if(i == rounds.length-1){
									if(format == 1){
										he += 2;
									}else if(format == 2){
										he += 1;
									}
								}else{
									he += 2;
								}
								rounds[i]['roundLogVos'][j]['he'] = he
							}
						}
						
						for(let i = 1 ; i < rounds.length; i++){
							for(let j = 0 ; j < rounds[i]['roundLogVos'].length; j++){
								let he = rounds[i]['roundLogVos'][j]['he'];
								let top = 0;
								let max_he = 0;
								let height = 10.7;
						
								if(rounds[i]['roundLogVos'][j]['luckyAId'] != null && rounds[i]['roundLogVos'][j]['luckyBId'] != null){
									max_he = rounds[i-1]['roundLogVos'][he-1]['max_he']
								}
								else if(rounds[i]['roundLogVos'][j]['luckyAId'] != null || rounds[i]['roundLogVos'][j]['luckyBId'] != null){
									max_he = rounds[i-1]['roundLogVos'][he-1]['max_he']
								}else if(i == rounds.length-1){
									if(format == 1){
										if(rounds[i-1]['roundLogVos'].length == 1){
											max_he = 0
										}else{
											max_he = ((rounds[i-1]['roundLogVos'][he-1]['max_he'] + rounds[i-1]['roundLogVos'][he-2]['max_he']) / 2)
										}
									}else if(format == 2){
										max_he = rounds[i-1]['roundLogVos'][he-1]['max_he']
									}
								}else{
									max_he = ((rounds[i-1]['roundLogVos'][he-1]['max_he'] + rounds[i-1]['roundLogVos'][he-2]['max_he']) / 2)
								}
								let zz_he = max_he;
								if(j == 0 && max_he == 1){
									zz_he -= 1;
								}else if(j!=0){
									zz_he -= rounds[i]['roundLogVos'][j-1]['max_he']
									if(zz_he<=1)
										zz_he = 0;
								}
								let padding_top = zz_he * 10.7 - 10.7;
								if(rounds[i]['roundLogVos'][j]['luckyAId'] != null && rounds[i]['roundLogVos'][j]['luckyBId'] != null){
						
								}else if(rounds[i]['roundLogVos'][j]['luckyAId'] != null || rounds[i]['roundLogVos'][j]['luckyBId'] != null){
						
								}else if(i == rounds.length-1){
									if(format == 1){
										if(rounds[i-1]['roundLogVos'].length == 1){
											top = 10.7;
											height = 10.7;
										}else{
											top = padding_top - ((max_he - rounds[i-1]['roundLogVos'][he-2]['max_he']) * 10.7) + 4.583;
											height = rounds[i-1]['roundLogVos'][he-1]['zz_he'] == 0 ? 10.7 : rounds[i-1]['roundLogVos'][he-1]['zz_he'] * 10.7;
										}
									}
								}else{
									top = padding_top - ((max_he - rounds[i-1]['roundLogVos'][he-2]['max_he']) * 10.7) + 4.583;
									height = rounds[i-1]['roundLogVos'][he-1]['zz_he'] == 0 ? 10.7 : rounds[i-1]['roundLogVos'][he-1]['zz_he'] * 10.7;
								}
								rounds[i]['roundLogVos'][j]['top'] = top
								rounds[i]['roundLogVos'][j]['padding_top'] = padding_top
								rounds[i]['roundLogVos'][j]['zz_he'] = zz_he
								rounds[i]['roundLogVos'][j]['max_he'] = max_he
								rounds[i]['roundLogVos'][j]['height'] = height
							}
						}
										
						for(let i = 0 ; i < rounds.length; i++){
							rounds[i]['roundLogVos'] = JSON.parse(JSON.stringify(rounds[i]['roundLogVos']))
							// console.log(rounds[i]['roundLogVos'],"rounds")
						}
										
						res1.data.rounds = rounds;
						
						if(format == 2){
							for(let i = loserRounds.length-1 ; i >= 0; i--){
								let he = 0;
								for(let j = 0 ; j < loserRounds[i]['roundLogVos'].length; j++){
									if(i == 0){
										he += 1;
										loserRounds[i]['roundLogVos'][j]['max_he'] = he
									}else if(loserRounds[i]['roundLogVos'][j]['luckyAId'] == null && loserRounds[i]['roundLogVos'][j]['luckyBId'] == null){
										loserRounds[i-1]['roundLogVos'].splice(he,0, {});
										// console.log(loserRounds[i-1]['roundLogVos'])
										he += 1;
									}else if(loserRounds[i]['roundLogVos'][j]['luckyAId'] == null || loserRounds[i]['roundLogVos'][j]['luckyBId'] == null){
										he += 1;
									}else if(i == loserRounds.length-1){
										he += 1;
									}else{
										he += 2;
									}
									loserRounds[i]['roundLogVos'][j]['he'] = he
								}
							}
							for(let i = 1 ; i < loserRounds.length; i++){
								for(let j = 0 ; j < loserRounds[i]['roundLogVos'].length; j++){
									let he = loserRounds[i]['roundLogVos'][j]['he'];
									let top = 0;
									let max_he = 0;
									let height = 10.7;
						
									if(loserRounds[i]['roundLogVos'][j]['luckyAId'] == null && loserRounds[i]['roundLogVos'][j]['luckyBId'] == null){
										max_he = loserRounds[i-1]['roundLogVos'][he-1]['max_he']
									}
									else if(loserRounds[i]['roundLogVos'][j]['luckyAId'] == null || loserRounds[i]['roundLogVos'][j]['luckyBId'] == null){
										max_he = loserRounds[i-1]['roundLogVos'][he-1]['max_he']
									}else if(i == loserRounds.length-1){
										max_he = loserRounds[i-1]['roundLogVos'][he-1]['max_he']
									}else{
										max_he = ((loserRounds[i-1]['roundLogVos'][he-1]['max_he'] + loserRounds[i-1]['roundLogVos'][he-2]['max_he']) / 2)
									}
									let zz_he = max_he;
									if(j == 0 && max_he == 1){
										zz_he -= 1;
									}else if(j!=0){
										zz_he -= loserRounds[i]['roundLogVos'][j-1]['max_he']
										if(zz_he<=1)
											zz_he = 0;
									}
									let padding_top = zz_he * 10.7 - 10.7;
									if(loserRounds[i]['roundLogVos'][j]['luckyAId'] == null && loserRounds[i]['roundLogVos'][j]['luckyBId'] == null){
						
									}else if(loserRounds[i]['roundLogVos'][j]['luckyAId'] == null || loserRounds[i]['roundLogVos'][j]['luckyBId'] == null){
						
									}else if(i == loserRounds.length-1){
										
									}else{
										top = padding_top - ((max_he - loserRounds[i-1]['roundLogVos'][he-2]['max_he']) * 10.7) + 4.583;
										height = loserRounds[i-1]['roundLogVos'][he-1]['zz_he'] == 0 ? 10.7 : loserRounds[i-1]['roundLogVos'][he-1]['zz_he'] * 10.7;
									}
									loserRounds[i]['roundLogVos'][j]['top'] = top
									loserRounds[i]['roundLogVos'][j]['padding_top'] = padding_top
									loserRounds[i]['roundLogVos'][j]['zz_he'] = zz_he
									loserRounds[i]['roundLogVos'][j]['max_he'] = max_he
									loserRounds[i]['roundLogVos'][j]['height'] = height
								}
							}
						}
						res1.data.loserRounds = loserRounds;
						for(let h in res1.data.rounds){
							for(let g=0; g < res1.data.rounds[h].length;g++){
								res1.data.rounds[h][g]['log_status'] = false
							}
						}
						self.details = res1.data
						// console.log(self.details.rounds)
						self.activeWin = self.details.rounds.length
					}
					
					// console.log(self.activeWin)
					// for(let a = 0, a < self.details.rounds.length;a++){
						
					// }
				})
			}
		}
	};
</script>
<style lang="less" scoped>
	.heightX{
		height:10.729vw
	}
	// 单横线
	.team_border{
		width: 90px;
		height: 1px;
		position: absolute;
		left: -95px;
		top: 50%;
		background-color: #555F6C;
	}
	// 多边框
	.round_multiline{
		width: 65px;
		height: 210px;
		position: absolute;
		left: -95px;
		top: 2.083vw;									
		border-right: 1px solid #555F6C;
		border-top: 1px solid #555F6C;
		border-bottom: 1px solid #555F6C;
		border-left: 0;
		.multiline_border{
			position: absolute;
			right: -30px;
			top: 97px;	
			width: 30px;
			height: 1px;
			background-color:#555F6C;
		}
	}
	.container {
		// width: 93%;
		background: #33384B;
		margin: 0 50px;
		padding-bottom: 100px;
		// 弹窗 start
		.mark_bac {
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.5);
			position: fixed;
			left: 0;
			top: 0;
			z-index: 8;
		}
		.sponsorsing_window {
			position: fixed;
			left: 0;
			right: 0;
			top: 250px;
			margin: 0 auto;
			width: 646px;
			background-color: #33384b;
			color: #fff;
			border-radius: 16px;
			z-index: 9;
			padding: 25px 52px 59px 52px;
			.sponsorsing_head {
				margin-bottom: 63px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.sponsorsing_tit {
					font-size: 20px;
					font-weight: 500;
					// color: #3A3A3A;
					color: #fff;
					// font-family: PingFangSC-Medium, PingFang SC;
					font-family:'Roboto-Bold';
				}
				.sponsorsini_qr {
					// color: #5E5E5E;
					color: #fff;
					cursor: pointer;
					font-size: 20px;
				}
			}
			.sponsorsing_content {
				.pay_input {
					display: flex;
					align-items: center;
					margin-bottom: 24px;
					// font-family: PingFangSC-Medium, PingFang SC;
					font-family:'Roboto-Regular';
					.pay_rm {
						width: 80px;
						text-align: right;
						margin-right: 27px;
						font-size: 16px;
						font-weight: 500;
						// color: #3A3A3A;
						color: #fff;
					}
					.pay_input_left {
						width: 404px;
						height: 51px;
						display: flex;
						align-items: center;
						border-radius: 2px;
						// border: 1px solid #3D3D3D;
						border: 1px solid #ffffff;
						border-radius: 10px;
						input {
							width: 80%;
							border: none;
							height: 48px;
							outline: none;
							margin: 0 12px;
							background-color: #33384B;
							color: #fff;
							font-size: 16px;
						}
						/deep/ .el-select .el-input .el-input__inner{
						    border-radius:10px;
							// background-color: #33384B;
							height: 48px;
							width: 404px;
							background-color: #33384B;
							color: #fff;
							border: none;
							font-family:'Roboto-Regular';
							// border: 1px solid #ffffff;
						}
						/deep/ .el-select-dropdown{
						    background-color: #33384B;
							border: 1px solid rgba(255,255,255,0.2);
						}
						
						  //修改单个的选项的样式
						/deep/ .el-select-dropdown__item{
						    background-color: transparent;
						    color:#3D3D3D;
							text-align: center;
						}
						/deep/ .el-select-dropdown__item.hover{
							background-color: #545873;
						}
						/deep/ .el-select-dropdown__item.selected{
							background-color: #545873;
						}
					}
					.pay_update_left{
						display: flex;
						align-items: center;
						position: relative;
						font-family:'Roboto-Regular';
						.update_block{
							width: 163px;
							height: 163px;
							background: #212121;
							display: flex;
							align-items: center;
							justify-content: center;
							img{
								width: 104px;
							}
						}
						.update_text{
							color: #1F75DB;
							font-size: 16px;
							position: absolute;
							right: -90px;
							top: 25px;
							// margin-left: 60px;
							// position: relative;
							// left: 120px;
							// bottom: 70px;
							cursor: pointer;
						}
					}
					
				}
			}
			.sponsorsing_btom {
				display: flex;
				align-items: center;
				justify-content: space-between;
				.sponsors_btom_left {}
				.sponsors_bton {
					width: 120px;
					height: 49px;
					display: flex;
					align-items: center;
					justify-content: center;
					background: #1F75DB;
					border-radius: 5px;
					font-size: 16px;
					font-weight: 400;
					color: #FFFFFF;
					font-family:'Roboto-Bold';
					cursor: pointer;
				}
			}
		}
		//弹窗 end
		// 设置胜制
		.victory_window {
			position: fixed;
			left: 0;
			right: 0;
			top: 250px;
			margin: 0 auto;
			width: 646px;
			background: #252a3b;
			color:#fff;
			border-radius: 16px;
			z-index: 9;
			padding: 25px 52px 59px 52px;
			.victory_head {
				margin-bottom: 63px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.victory_tit {
					font-size: 20px;
					font-weight: bold;
					// color: #3A3A3A;
				}
				.victory_qr {
					// color: #5E5E5E;
					cursor: pointer;
					font-size: 20px;
				}
			}
			.victory_content {
				.victory_input {
					display: flex;
					align-items: center;
					margin-bottom: 24px;
					// font-family: PingFangSC-Medium, PingFang SC;
					font-family:'Roboto-Bold';
					.victory_rm {
						width: 80px;
						text-align: right;
						margin-right: 27px;
						font-size: 16px;
						font-weight: 500;
						// color: #3A3A3A;
					}
					.victory_input_left {
						width: 404px;
						height: 51px;
						display: flex;
						align-items: center;
						border-radius: 2px;
						border: 1px solid #fff;
						font-family:'Roboto-Regular';
						input {
							width: 80%;
							border: none;
							height: 48px;
							outline: none;
							margin: 0 12px;
						}
						/deep/ .el-select .el-input .el-input__inner{
						    border:0px;
							background-color: #33384B;
							height: 48px;
							width: 404px;
							color: #FFFFFF;
							// border: 1px solid #ffffff;
							font-family:'Roboto-Regular';
						}
						/deep/ .el-select-dropdown{
						    background-color: #33384B;
						}
						
						  //修改单个的选项的样式
						/deep/ .el-select-dropdown__item{
						    background-color: transparent;
							color: #FFFFFF;
						    // color:#3D3D3D;
							text-align: center;
							font-family:'Roboto-Regular';
						}
					}
				}
			}
			.victory_btom {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 61px;
				.victory_btom_left {}
				.victory_bton {
					width: 120px;
					height: 49px;
					display: flex;
					align-items: center;
					justify-content: center;
					background: #1F75DB;
					border-radius: 5px;
					font-size: 16px;
					font-weight: 400;
					color: #FFFFFF;
					cursor: pointer;
					font-family:'Roboto-Bold';
				}
			}
		}
		// end
		// 设置胜利 
		.triumph_window {
			position: fixed;
			left: 0;
			right: 0;
			top: 250px;
			margin: 0 auto;
			width: 646px;
			background: #252a3b;
			border-radius: 16px;
			color:#fff;
			z-index: 9;
			padding: 25px 0px 59px 0px;
			.triumph_head {
				padding: 0 52px;
				margin-bottom: 63px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.triumph_tit {
					font-size: 20px;
					font-weight: bold;
					// color: #3A3A3A;
					font-family:'Roboto-Bold';
				}
				.triumph_qr {
					// color: #5E5E5E;
					cursor: pointer;
					font-size: 20px;
					font-family:'Roboto-Regular';
				}
			}
			.triumph_content {
				.triumph_table{
					.triumph_top{
						padding: 0 10px;
						display: flex;
						height: 70px;
						background-color: #E0E9F3;
						font-size: 18px;
						// font-family: Noto Sans S Chinese;
						font-family:'Roboto-Bold';
						font-weight: 400;
						color: #2D2D2D;
						.trium_td_block{
							width: 20%;
							display: flex;
							align-items: center;
							justify-content: center;
						}
						.trium_td_block2{
							width: 60%;
							display: flex;
							align-items: center;
							justify-content: center;
						}
					}
					.triumph_in{
						padding: 0 10px;
						display: flex;
						height: 80px;
						font-size: 18px;
						// font-family: Noto Sans S Chinese;
						font-family:'Roboto-Bold';
						font-weight: 400;
						// color: #2D2D2D;
						.trium_td_block{
							// width: 20%;
							width: 110px;
							display: flex;
							align-items: center;
							// justify-content: center;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							margin-left: 20px;
						}
						.trium_td_block2{
							width: 60%;
							display: flex;
							align-items: center;
							justify-content: center;
							font-family:'Roboto-Regular';
							.trium_text{
								font-weight: bold;
								color: #1F75DB;
								cursor:pointer;
							}
							.trium_img_list{
								display: flex;
								align-items: center;
								.game_avatar{
									width: 50px;
									height: 60px;
									object-fit: cover;
									margin-right: 15px;
								}
								.game_avatar:last-child{
									margin-right: 0;
								}
							}
						}
					}
				}
				.triumph_confirm{
					display: flex;
					align-items: center;
					margin-top: 40px;
					.conifrm_text{
						font-size: 21px;
						// font-family: Noto Sans S Chinese;
						font-family:'Roboto-Bold';
						font-weight: bold;
						// color: #3A3A3A;
						margin: 0 40px 0 50px;
					}
					.conifrm_one{
						max-width: 100px;
						min-width: 55px;
						height: 55px;
						display: flex;
						align-items: center;
						justify-content: center;
						border:1px solid  #fff;
						border-radius: 12px;
						font-size: 16px;
						font-weight: 400;
						// color: #3A3A3A;
						font-family:'Roboto-Regular';
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						// margin-right: 20px;
						padding: 0 10px;
					}
					.conifrm_two{
						max-width: 100px;
						min-width: 55px;
						height: 55px;
						display: flex;
						align-items: center;
						justify-content: center;
						background-color: #0075E2;
						border:1px solid  #0075E2;
						border-radius: 12px;
						font-size: 16px;
						font-weight: 400;
						color: #FFFFFF;
						font-family:'Roboto-Regular';
						padding: 0 10px;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}
			.triumph_btom {
				padding: 0 52px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 61px;
				.triumph_btom_left {}
				.triumph_bton {
					width: 120px;
					height: 49px;
					display: flex;
					align-items: center;
					justify-content: center;
					background: #1F75DB;
					border-radius: 5px;
					font-size: 16px;
					font-weight: 400;
					color: #FFFFFF;
					cursor: pointer;
					font-family:'Roboto-Bold';
				}
			}
		}
		// end
		// 循环输入成绩弹窗
		.loop_window {
			position: fixed;
			left: 0;
			right: 0;
			top: 250px;
			margin: 0 auto;
			width: 646px;
			background: #FFFFFF;
			border-radius: 16px;
			z-index: 9;
			padding: 25px 0px 59px 0px;
			.loop_head {
				padding: 0 52px;
				margin-bottom: 63px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-family:'Roboto-Regular';
				.triumph_tit {
					font-size: 20px;
					font-weight: bold;
					color: #3A3A3A;
				}
				.triumph_qr {
					color: #5E5E5E;
					cursor: pointer;
					font-size: 20px;
				}
			}
			.loop_content {
				.triumph_table{
					.triumph_top{
						padding: 0 10px;
						display: flex;
						height: 70px;
						background-color: #E0E9F3;
						font-size: 18px;
						// font-family: Noto Sans S Chinese;
						font-family:'Roboto-Bold';
						font-weight: 400;
						color: #2D2D2D;
						.trium_td_block{
							width: 20%;
							display: flex;
							align-items: center;
							justify-content: center;
						}
						.trium_td_block2{
							width: 60%;
							display: flex;
							align-items: center;
							justify-content: center;
						}
					}
					.triumph_in{
						padding: 0 10px;
						display: flex;
						height: 80px;
						font-size: 18px;
						// font-family: Noto Sans S Chinese;
						font-family:'Roboto-Bold';
						font-weight: 400;
						color: #2D2D2D;
						.trium_td_block{
							width: 20%;
							display: flex;
							align-items: center;
							justify-content: center;
						}
						.trium_td_block2{
							width: 60%;
							display: flex;
							align-items: center;
							justify-content: center;
							font-family:'Roboto-Regular';
							.trium_text{
								font-weight: bold;
								color: #1F75DB;
								cursor: pointer;
							}
							.trium_img_list{
								display: flex;
								align-items: center;
								.game_avatar{
									width: 50px;
									height: 60px;
									object-fit: cover;
									margin-right: 15px;
								}
								.game_avatar:last-child{
									margin-right: 0;
								}
							}
						}
					}
				}
				.triumph_confirm{
					display: flex;
					align-items: center;
					margin-top: 40px;
					.conifrm_text{
						font-size: 21px;
						// font-family: Noto Sans S Chinese;
						font-family:'Roboto-Bold';
						font-weight: bold;
						color: #3A3A3A;
						margin: 0 40px 0 50px;
					}
					.conifrm_one{
						width: 55px;
						height: 55px;
						display: flex;
						align-items: center;
						justify-content: center;
						border:1px solid  #3A3A3A;
						border-radius: 12px;
						font-size: 16px;
						font-weight: 400;
						color: #3A3A3A;
						margin-right: 20px;
						font-family:'Roboto-Regular';
					}
					.conifrm_two{
						width: 55px;
						height: 55px;
						display: flex;
						align-items: center;
						justify-content: center;
						background-color: #0075E2;
						border:1px solid  #0075E2;
						border-radius: 12px;
						font-size: 16px;
						font-weight: 400;
						color: #FFFFFF;
						font-family:'Roboto-Regular';
					}
				}
			}
			.loop_btom {
				padding: 0 52px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 61px;
				.triumph_btom_left {}
				.triumph_bton {
					width: 120px;
					height: 49px;
					display: flex;
					align-items: center;
					justify-content: center;
					background: #1F75DB;
					border-radius: 5px;
					font-size: 16px;
					font-weight: 400;
					color: #FFFFFF;
					cursor: pointer;
					font-family:'Roboto-Bold';
				}
			}
		}
		// end
		// 自由输入成绩弹窗
		.free_window {
			position: fixed;
			left: 0;
			right: 0;
			top: 150px;
			margin: 0 auto;
			width: 1000px;
			background: #FFFFFF;
			border-radius: 16px;
			z-index: 9;
			padding: 25px 0px 59px 0px;
			.free_head {
				padding: 0 52px;
				margin-bottom: 63px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.free_tit {
					font-size: 20px;
					font-weight: bold;
					color: #3A3A3A;
					font-family:'Roboto-Bold';
				}
				.free_qr {
					color: #5E5E5E;
					cursor: pointer;
					font-size: 20px;
					font-family:'Roboto-Regular';
				}
			}
			.free_content {
				max-height: 450px;
				overflow-y: scroll;
				.free_table{
					.free_top{
						padding: 0 10px;
						display: flex;
						height: 70px;
						background-color: #E0E9F3;
						font-size: 18px;
						// font-family: Noto Sans S Chinese;
						font-family:'Roboto-Bold';
						font-weight: 400;
						color: #2D2D2D;
						.free_td_block{
							width: 20%;
							display: flex;
							align-items: center;
							justify-content: center;
						}
						.free_td_block2{
							width: 60%;
							display: flex;
							align-items: center;
							justify-content: center;
						}
					}
					.free_in{
						padding: 0 10px;
						display: flex;
						height: 80px;
						font-size: 18px;
						// font-family: Noto Sans S Chinese;
						font-family:'Roboto-Bold';
						font-weight: 400;
						color: #2D2D2D;
						.free_td_block{
							width: 20%;
							display: flex;
							align-items: center;
							justify-content: center;
							.free_input{
								width: 45px;
								height: 45px;
								font-size: 18px;
								// font-family: Noto Sans S Chinese;
								font-family:'Roboto-Bold';
								font-weight: 400;
								color: #2D2D2D;
								display: flex;
								align-items: center;
								text-align: center;
								border: 1px solid #2D2D2D;
							}
						}
						.free_td_block2{
							width: 60%;
							display: flex;
							align-items: center;
							justify-content: center;
							.free_text{
								font-weight: bold;
								color: #1F75DB;
								font-family:'Roboto-Bold';
							}
							.free_img_list{
								display: flex;
								align-items: center;
								font-family:'Roboto-Regular';
								.game_avatar{
									width: 50px;
									height: 60px;
									object-fit: cover;
									margin-right: 15px;
								}
								.game_avatar:last-child{
									margin-right: 0;
								}
							}
						}
					}
				}
				
			}
			.free_btom {
				padding: 0 52px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 61px;
				.free_btom_left {}
				.free_bton {
					width: 120px;
					height: 49px;
					display: flex;
					align-items: center;
					justify-content: center;
					background: #1F75DB;
					border-radius: 5px;
					font-size: 16px;
					font-weight: 400;
					color: #FFFFFF;
					cursor: pointer;
					font-family:'Roboto-Bold';
				}
			}
		}
		// end
		// 已上传图片/上传图片弹窗
		.cease_window {
			position: fixed;
			left: 0;
			right: 0;
			top: 250px;
			margin: 0 auto;
			width: 1000px;
			height: 600px;
			background: #FFFFFF;
			border-radius: 16px;
			overflow: hidden;
			z-index: 9;
			// padding: 25px 0px 59px 0px;
			display: flex;
			justify-content: space-between;
			.cease_win_left {
				width: 17%;
				padding: 100px 0 0 3%;
				background-color: #E0E9F3;
				.cease_left_text {
					color: #849FB1;
					font-size: 20px;
					font-weight: bold;
					margin-bottom: 40px;
					cursor: pointer;
					font-family:'Roboto-Bold';
				}
				.cease_av {
					color: #0075E2;
					font-size: 20px;
					font-weight: bold;
					cursor: pointer;
					font-family:'Roboto-Bold';
				}
			}
			.cease_win_right {
				width: 80%;
				.win_right_block{
					padding: 25px 2.5% 0px 2.5%;
					.cease_head {
						margin-bottom: 63px;
						display: flex;
						align-items: center;
						justify-content: space-between;
						font-family:'Roboto-Regular';
						.cease_tit {
							font-size: 20px;
							font-weight: bold;
							color: #3A3A3A;
						}
						.cease_qr {
							color: #5E5E5E;
							cursor: pointer;
							font-size: 20px;
						}
					}
					.cease_upat_container{
						height: 340px;
						.upload-demo{
							text-align: center;
						}
						/deep/.el-upload-dragger{
							padding: 30px 0 0 0 ;
							width: 400px;
							border: 2px dashed #3A3A3A;
						}
						/deep/.el-upload__tip{
							color: #90A4B8;
							width: 400px;
							margin:  0 auto;
							padding: 10px 0;
							text-align: left;
						}
						/deep/.el-upload-dragger .el-upload__text{
							font-size: 17px;
						}
						/deep/.el-upload-dragger .el-upload__text em{
							width: 120px;
							height: 39px;
							display: flex;
							align-items: center;
							justify-content: center;
							background: #FF6F00;
							border-radius: 5px;
							font-size: 15px;
							font-weight: 400;
							color: #FFFFFF;
							cursor: pointer;
							margin: 0 auto;
							font-family:'Roboto-Regular';
						}
					}
					.cease_btom {
						display: flex;
						align-items: center;
						justify-content: flex-end;
						margin-top: 61px;
						.cease_bton {
							width: 120px;
							height: 49px;
							display: flex;
							align-items: center;
							justify-content: center;
							background: #1F75DB;
							border-radius: 5px;
							font-size: 16px;
							font-weight: 400;
							color: #FFFFFF;
							cursor: pointer;
							font-family:'Roboto-Bold';
						}
					}
				}
				.win_right_block2{
					padding: 25px 2.5% 0px 2.5%;
					.cease_head {
						margin-bottom: 63px;
						display: flex;
						align-items: center;
						justify-content: space-between;
						.cease_tit {
							font-size: 20px;
							font-weight: bold;
							color: #3A3A3A;
							font-family:'Roboto-Bold';
						}
						.cease_qr {
							color: #5E5E5E;
							cursor: pointer;
							font-size: 20px;
							font-family:'Roboto-Regular';
						}
					}
					.cease_content {
						height: 340px;
						max-height: 340px;
						overflow-y: scroll;
						.cease_photo_list{
							display: flex;
							flex-wrap: wrap;
							.photo_block{
								width: 110px;
								height: 130px;
								margin-right:29px;
								margin-bottom: 29px;
								border:4px solid #fff;
								img{
									width: 110px;
									height: 130px;
									object-fit: cover;
								}
							}
							.photo_block:nth-child(5n){
								margin-right: 0px;
							}
							.photo_border{
								border:4px solid #0676E6;
							}
						}
						&::-webkit-scrollbar {
							width:12px;
							background-color: #e0e9f3;
						}
						/* 滚动槽 */
						&::-webkit-scrollbar-track {
							-webkit-box-shadow:inset006pxrgba(0,0,0,0.3);
							border-radius:10px;
							background-color: #e0e9f3;
						}
						/* 滚动条滑块 */
						&::-webkit-scrollbar-thumb {
							border-radius:10px;
							-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
								background-color: #2B2B2B;
						}
					}
					.cease_btom {
						display: flex;
						align-items: center;
						justify-content: space-between;
						margin-top: 61px;
					
						.cease_btom_left {
							font-size: 16px;
							color: #8EA3B7;
							font-family:'Roboto-Regular';
						}
					
						.cease_bton {
							width: 120px;
							height: 49px;
							display: flex;
							align-items: center;
							justify-content: center;
							background: #1F75DB;
							border-radius: 5px;
							font-size: 16px;
							font-weight: 400;
							color: #FFFFFF;
							cursor: pointer;
							font-family:'Roboto-Bold';
						}
					}
				}
			}
		
		}
		// end
		.event_container {
			.event_head {
				padding: 30px 30px 20px 30px;
				border-bottom: 1px solid #545873;
				.screen_title {
					// align-items: center;
					// justify-content: space-between;
					margin-bottom: 24px;
					.screen_text {
						font-size: 18px;
						// font-family: PingFangSC-Medium, PingFang SC;
						font-family:'Roboto-Bold';
						font-weight: 500;
						color: #FFFFFF;
					}
					.screen_return{
						
						width: 69px;
						height: 40px;
						float:right;
						font-size: 14px;
						font-weight: 400;
						color: #595959;
						line-height: 40px;
						text-align: center;
						background: #FFFFFF;
						border-radius: 2px;
						border: 1px solid #D9D9D9;
						// font-family: PingFangSC-Regular, PingFang SC;
						font-family:'Roboto-Regular';
						margin-right:20px;
						cursor:pointer;
					}
					.step_right_bton{
						width: 80px;
						height: 40px;
						float:right;
						font-size: 14px;
						font-weight: 400;
						color: #FFFFFF;
						line-height: 40px;
						text-align: center;
						border-radius: 2px;
						border: 1px solid #1F75DB;
						background:#1F75DB;
						// font-family: PingFangSC-Regular, PingFang SC;
						font-family:'Roboto-Regular';
						margin-right:20px;
						cursor:pointer;
					}
					
				}
				.event_tabs_container{
					display: flex;
					.tabs_block{
						font-size: 16px;
						// font-family: PingFangSC-Medium, PingFang SC;
						font-family:'Roboto-Bold';
						font-weight: 500;
						color: #ACACAC;
						line-height: 22px;
						cursor: pointer;
						margin-right: 32px;
					}
					.tabs_av{
						color: #1890FF;
						position: relative;
					}
					.tabs_av:before {
					    content: '';
					    position: absolute;
					    left: 0px;
						right: 0px;
						margin: 0 auto;
					    bottom: -21px;
						width: 60px;
					    border-top: 2px solid #1890FF;
					}

				}
			}
			// tabs 内容/ 赛事基本信息
			.event_content_tabs{
				margin: 41px 30px 0 30px;
				.event_tabs_list{
					display: flex;
					.event_block{
						width: 220px;
						height: 46px;
						font-size: 16px;
						font-weight: 500;
						color: #B7B7B7;
						border-radius: 5px;
						cursor: pointer;
						margin-right: 22px;
						display: flex;
						align-items: center;
						justify-content: center;
						border: 1px solid #67717A;
						// font-family: PingFangSC-Medium, PingFang SC;
						font-family:'Roboto-Regular';
					}
					.envent_av{
						color: #fff;
						border: 1px solid #1F75DB;
						background-color: #1F75DB;
						position: relative;
						font-family:'Roboto-Bold';
					}
				}
				//  event_tabs_内容
				.event_three{
					width: 100%;
					margin-top: 30px;
					background-color: #33384b !important;
					padding-bottom: 30px;
				}
				.event_step_container{
					width: 100%;
					margin-top: 30px;
					padding-bottom: 30px;
					border-radius: 15px;
					background-color: #252A3B;
					// 赛事介绍
					.event_step_one{
						.step_one_block{
							padding: 47px 53px 41px 51px;
							border-bottom: 1px solid #4D5A63;
							display: flex;
							justify-content: space-between;
							.step_one_left{
								display: flex;
								.step_one_text{
									color: #C4C4C4;
									font-size: 16px;
									margin-right: 46px;
								}
								.step_one_cover{
									width: 330px;
									height: 332px;
									img{
										width: 330px;
										height: 332px;
										object-fit: cover;
									}
								}
							}
							.step_one_right{
								width: 60%;
								display: flex;
								justify-content: space-between;
								.step_right_form{
									padding-top: 13px;
									.form_list{
										display: flex;
										align-items: center;
										margin-bottom: 44px;
										font-family:'Roboto-Regular';
										.form_name{
											width: 110px;
											text-align: right;
											color: #C4C4C4;
											font-size: 16px;
											margin-right: 43px;
										}
										.form_value{
											color: #FFFFFF;
											font-size: 16px;
										}
										.conditions_block{
											display: flex;
											align-items: center;
											color: #FFFFFF;
											font-size: 16px;
											margin-left: 10px;
											div{
												margin-right: 10px;
											}
										}
									}
								}
								.step_right_bton{
									width: 104px;
									height: 49px;
									text-align: center;
									line-height: 49px;
									color: #FFFFFF;
									cursor: pointer;
									background: #1F75DB;
									border-radius: 5px;
									font-family:'Roboto-Regular';
								}
							}
						}
						.step_two_block{
							padding: 30px 34px 10px 51px;
							border-bottom: 1px solid #4D5A63;
							display: flex;
							justify-content: space-between;
							.step_two_left{
								// margin-right: 210px;
								.form_list{
									display: flex;
									align-items: center;
									margin-bottom: 32px;
									font-family:'Roboto-Regular';
									.form_name{
										width: 110px;
										text-align: right;
										color: #C4C4C4;
										font-size: 16px;
										margin-right: 35px;
									}
									.form_value{
										color: #FFFFFF;
										font-size: 16px;
									}
									.registration_time{
										color: #FFFFFF;
										font-size: 16px;
										display: flex;
										align-items: center;
										div{
											// margin-right: 5px;
											height: 40px;
											line-height: 40px;
										}
										.start_time{
											width: 150px;
											height: 40px;
											// background-color: #000fff;
											line-height: 40px;
										}
										.end_time{
											width: 150px;
											height: 40px;
											// background-color: #000fff;
											line-height: 40px;
											margin-left: 10px;
										}
									}
								}
							}
							.step_two_right{
								width: 62%;
								.form_list{
									display: flex;
									align-items: center;
									margin-bottom: 32px;
									font-family:'Roboto-Regular';
									.form_name{
										width: 130px;
										text-align: right;
										color: #C4C4C4;
										font-size: 16px;
										margin-right: 35px;
									}
									.form_value{
										color: #FFFFFF;
										font-size: 16px;
									}
									.form_url{
										text-decoration: underline;
										color: #12B0FF;
										width: 60%;
										overflow: hidden;
										text-overflow: ellipsis;
										white-space: nowrap;
									}
									.tournament_time{
										width: 150px;
										height: 40px;
										// background-color: #000fff;
										line-height: 40px;
										color: #FFFFFF;
										font-size: 16px;
									}
								}
							}
						}
						.step_three_block{
							padding: 46px 34px 240px 51px;							
							display: flex;
							justify-content: space-between;
							font-family:'Roboto-Regular';
							.step_three_left{
								// margin-right: 210px;
								width: 100%;
								.form_list{
									display: flex;
									.form_name{
										width: 110px;
										text-align: right;
										color: #C4C4C4;
										font-size: 16px;
										margin-right: 35px;
									}
									.form_paragraph{
										width: 80%;
										.four_paragraph{
											width: 100%;
											color: #FFFFFF;
											font-size: 16px;
											line-height: 25px;
											margin-bottom: 20px;
											word-wrap: break-word;
											white-space: pre-wrap;
										}
										::v-deep{
											img{
												width: 100%;
												height: 100%;
											} 
										}
										.four_cover{
											width: 353px;
											height: 177px;
											background: #999999;
											margin: 30px 0;
										}
									}
								}
							}
						}
					}
					// 奖金池
					.event_step_two{
						.step_two_head{
							display: flex;
							align-items: center;
							padding: 43px 0;
							margin-bottom: 56px;
							border-bottom: 1px solid #626f79;
							.one_head_text{
								width: 31.3%;
								color: #C4C4C4;
								font-size: 16px;
								padding-left: 2%;
								font-family:'Roboto-Bold';
								span{
									margin-left: 44px;
									color: #FFFFFF;
									font-family:'Roboto-Regular';
								}
								.span_color{
									color: #00FF00;
								}
								.span_color_red{
									color: #ff0000;
								}
							}
						}
						.step_two_table{
							display: flex;
							align-items: center;
							height: 63px;
							color: #FFFFFF;
							font-size: 18px;
							background: #5C5E70;
							font-family:'Roboto-Bold';
							.one_table_block{
								width: 15%;
								height: 63px;
								display: flex;
								align-items: center;
								justify-content: center;
							}
							.two_table_block{
								width: 15%;
								height: 63px;
								display: flex;
								align-items: center;
								justify-content: center;
							}
							.three_table_block{
								width: 23.3%;
								height: 63px;
								display: flex;
								align-items: center;
								justify-content: center;
							}
						}
						.step_two_td{
							display: flex;
							align-items: center;
							height: 95px;
							color: #FFFFFF;
							font-size: 18px;
							border-bottom: 1px solid #67717A;
							font-family:'Roboto-Regular';
							.one_td_block{
								width: 15%;
								height: 95px;
								display: flex;
								align-items: center;
								justify-content: center;
							}
							.two_td_block{
								width: 15%;
								height: 95px;
								display: flex;
								align-items: center;
								justify-content: center;
								img{
									width: 106px;
									height: 71px;
								}
							}
							.three_td_block{
								width: 23.3%;
								height: 95px;
								display: flex;
								align-items: center;
								justify-content: center;
							}
						}
						.step_two_td:last-child{
							border-bottom: 0;
						}
					}
					// 赞助商列表
					.event_step_three{
						.step_three_table{
							display: flex;
							align-items: center;
							height: 63px;
							color: #FFFFFF;
							font-size: 18px;
							background: #5C5E70;
							font-family:'Roboto-Bold';
							.one_table_block{
								width: 15%;
								height: 63px;
								display: flex;
								align-items: center;
								justify-content: center;
							}
							.two_table_block{
								width: 15%;
								height: 63px;
								display: flex;
								align-items: center;
								justify-content: center;
							}
							.three_table_block{
								width: 23.3%;
								height: 63px;
								display: flex;
								align-items: center;
								justify-content: center;
							}
						}
						.step_three_td{
							display: flex;
							align-items: center;
							height: 95px;
							color: #FFFFFF;
							font-size: 18px;
							border-bottom: 1px solid #67717A;
							font-family:'Roboto-Regular';
							.one_td_block{
								width: 15%;
								height: 95px;
								display: flex;
								align-items: center;
								justify-content: center;
							}
							.two_td_block{
								width: 15%;
								height: 95px;
								display: flex;
								align-items: center;
								justify-content: center;
								.two_img{
									width: 76px;
									height: 73px;
									object-fit: fill;
								}
								.two_nothing{
									width: 64px;
									height: 64px;
									background: #5C5E70;
								}
							}
							.three_td_block{
								width: 23.3%;
								height: 95px;
								display: flex;
								align-items: center;
								justify-content: center;
								.operation_edit{
									color: #FF9810;
									margin-right: 54px;
									cursor: pointer;
									font-family:'Roboto-Bold';
								}
								.operation_del{
									color: #FF2D0B;
									cursor: pointer;
									font-family:'Roboto-Bold';
								}
							}
						}
						.step_three_add{
							color: #7E8296;
							font-size: 18px;
							padding: 25px 100px;
							cursor: pointer;
							font-family:'Roboto-Regular';
						}
					}
					// 赛事规则
					.event_step_four{
						padding: 38px 34px 0 48px;
						display: flex;
						justify-content: space-between;
						.step_four_left{
							width: 84%;
							color: #FFFFFF;
							font-family:'Roboto-Regular';
							word-wrap: break-word;
							white-space: pre-wrap;
							.four_paragraph{
								font-size: 16px;
								line-height: 25px;
								margin-bottom: 20px;
							}
							.four_cover{
								width: 353px;
								height: 177px;
								background: #999999;
								margin: 30px 0;
							}
						}
						::v-deep{
							img{
								max-width: 100%;
								max-height: 100%;
							} 
						}
						
						.step_four_right{
							padding-left: 155px;
							.four_edit{
								width: 104px;
								height: 49px;
								color: #FFFFFF;
								font-size: 16px;
								line-height: 49px;
								text-align: center;
								background: #1F75DB 0% 0% no-repeat padding-box;
								border-radius: 5px;
								font-family:'Roboto-Bold';
								cursor: pointer;
							}
						}
					}
				}
			}
			// 参赛者列表
			.basic_content_tabs{
				margin: 41px 30px 0 30px;
				.player_table_area{
					.player_table{
						border: 1px solid #727272;
						.player_table_header{
							display: flex;
							align-items: center;
							border-bottom: 1px solid #727272;
							height: 60px;
							color: #FFFFFF;
							font-size: 20px;
							text-align: center;
							background-color: #2A2E3F;
							.table_header_col{
								width: 16.7%;
								height: 60px;
								line-height: 60px;
								border-right: 1px solid #727272;
								&:last-child{
									border: none;
								}
							}
							.player_name{
								width: 24.7%;
							}
							.player_no{
								width: 8.7%;
							}
						}
						.player_table_body{
							.table_body_row{
								display: flex;
								align-items: center;
								border-bottom: 1px solid #727272;
								height: 100px;
								color: #FFFFFF;
								font-size: 20px;
								text-align: center;
								&:last-child{
									border: none;
								}
								.table_body_row_col{
									width: 16.7%;
									height: 100px;
									line-height: 100px;
									border-right: 1px solid #727272;
									&:last-child{
										border: none;
									}
									.team_img{
										width: 70px;
										height: 70px;
										border-radius: 50%;
									}
									.pre_btn{
										color: #1f75db;
										
									}
									.btn_cursor{
										cursor: pointer;
									}
								}
								.btn_cursor{
									cursor: pointer;
								}
								.player_img{
									display: flex;
									align-items: center;
									justify-content: center;
								}
								.player_name{
									width: 24.7%;
									overflow: hidden;
									text-overflow: ellipsis;
									white-space: nowrap;
									position: relative;
									// cursor: pointer;
								}
								.player_no{
									width: 8.7%;
								}
								.team_member_list{
									position: absolute;
									z-index: 9999;
									right: 250px;
									width: 400px;
									background-color: #2A2E3F;
									padding: 20px;
									border-radius: 15px;
									.member_table{
										width: 100%;
										border: 1px solid #727272;
										.member_table_header{
											display: flex;
											align-items: center;
											border-bottom: 1px solid #727272;
											height: 60px;
											// color: #FFFFFF;
											color: rgba(255,255,255,0.7);
											font-size: 20px;
											text-align: center;
											background-color: #33384B;
											.header_col{
												width:50%;
												height: 60px;
												line-height: 60px;
												border-right: 1px solid #727272;
												&:last-child{
													border: none;
												}
											}
										}
										.member_table_body{
											.member_table_body_row{
												display: flex;
												align-items: center;
												border-bottom: 1px solid #727272;
												height:80px;
												color: #FFFFFF;
												font-size: 20px;
												text-align: center;
												&:last-child{
													border: none;
												}
												.member_table_body_row_col{
													width:50%;
													height: 80px;
													line-height: 80px;
													border-right: 1px solid #727272;
													&:last-child{
														border: none;
													}
													.pre_btn{
														color: #1f75db;
														
													}
													.btn_cursor{
														cursor: pointer;
													}
												}
											}
										}
									}
									
								}
							}
						}
					}
				}
				.tabs_num_block{
					// font-family: PingFangSC-Regular, PingFang SC;
					font-family:'Roboto-Regular';
					.tabs_title{
						font-size: 20px;
						font-weight: 400;
						color: #FFFFFF;
						margin-bottom: 24px;
					}
					.tabs_team_list{
						display: flex;
						flex-wrap: wrap;
						margin: 0 52px;
						.team_block{
							text-align: center;
							// margin: 0 63px 32px 0;
							// margin: 0 52px 32px;
							margin: 0 0 32px 63px;
							position: relative;
							// background-color: #FFF0B7;
							.team_img{
								width: 140px;
								height: 140px;
								border-radius: 50%;
							}
							.team_name{
								font-size: 14px;
								font-weight: 400;
								color: #FFFFFF;
								margin-top: 12px;
								font-family:'Roboto-Regular';
								width: 200px;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}
						}
						.team_block:nth-child(7n){
							margin-right: 0;
						}
						.team_member_list{
							position: absolute;
							z-index: 9999;
							// width: 100%;
							max-width: 700px;
							background-color: #2A2E3F;
							padding: 20px;
							border-radius: 15px;
							.team_member{
								display: flex;
								align-items: center;
								flex-wrap: wrap;
								// justify-content: space-between;
								.member_block{
									display: flex;
									align-items: center;
									margin-right: 20px;
									margin-bottom: 20px;
									.member_avatar{
										width: 40px;
										height: 40px;
										border-radius: 50%;
										margin-right: 10px;
									}
									.member_name{
										max-width:100px;
										color: #FFFFFF;
										font-size: 16px;
										font-family:'Roboto-Regular';
										overflow: hidden;
										text-overflow: ellipsis;
										white-space: nowrap;
										// background-color: #FFF0B7;
										text-align: left;
									}
								}
							}
						}
						
					}
				}
			}
			// 对阵
			.event_against_tabs{
				margin: 41px 30px 0 30px;
				.ag_btn_list{
					// display: flex;
					margin-bottom: 21px;
					display: inline-block;
					width:100%;
					// justify-content: space-between;
					font-family:'Roboto-Regular';
					.a_btn_left{
						display: flex;
						.ag_rank{
							width: 143px;
							height: 55px;
							color: #fff;
							font-size: 16px;
							border: 1px solid #C6C8CD;
							border-radius: 5px;
							cursor: pointer;
							display: flex;
							align-items: center;
							justify-content: center;
							margin-right: 20px;
						}
						.ag_ranking{
							width: 203px;
							height: 55px;
							color: #fff;
							font-size: 16px;
							cursor: pointer;
							border: 1px solid #C6C8CD;
							border-radius: 5px;
							display: flex;
							align-items: center;
							justify-content: center;
						}
					}
					.a_btn_right{
						.start_btn{
							width: 142px;
							height: 55px;
							color: #fff;
							font-size: 16px;
							cursor: pointer;
							background-color:#0075E2;
							border: 1px solid #0075E2;
							border-radius: 5px;
							display: flex;
							align-items: center;
							justify-content: center;
						}
					}
				}
				// 名次管理/自由
				.default_rank{
					margin-top: 50px;
					.default_top{
						display: flex;
						// top 第一列
						.default_list_one{
							.default_round_two{
								position: relative;
								.round_block_two{
									width: 280px;
									padding: 0 15px;
									background-color: #252A3B;
									.team_top{
										display: flex;
										justify-content: space-between;
										border-bottom: 1px solid #464A4E;
										padding: 20px 0;
										.team_left{
											display: flex;
											align-items: center;
											.team_radius{
												width: 45px;
												height: 45px;
												background-color: #57617C;
												border-radius: 50%;
												margin-right: 20px;
												.default_img{
													width: 50px;
													height: 50px;
												}
											}
											.team_name{
												font-size: 16px;
												font-family: Roboto;
												font-weight: 400;
												color: #FFFFFF;
												width: 120px;
												overflow: hidden;
												text-overflow: ellipsis;
												white-space: nowrap;
											}
										}
										.team_right{
											.team_num{
												width: 45px;
												height: 45px;
												line-height: 45px;
												text-align: center;
												font-size: 16px;
												border: 1px solid #5F6C76;
												font-family: Roboto;
												font-weight: 400;
												color: #FFFFFF;
											}
										}
									}
									.team_btom{
										display: flex;
										justify-content: space-between;
										padding: 20px 0;
										.team_left{
											display: flex;
											align-items: center;
											.team_radius{
												width: 45px;
												height: 45px;
												background-color: #57617C;
												border-radius: 50%;
												margin-right: 20px;
												.default_img{
													width: 50px;
													height: 50px;
												}
											}
											.team_name{
												font-size: 16px;
												font-family: Roboto;
												font-weight: 400;
												color: #FFFFFF;
												width: 120px;
												overflow: hidden;
												text-overflow: ellipsis;
												white-space: nowrap;
											}
										}
										.team_right{
											.team_num{
												width: 45px;
												height: 45px;
												line-height: 45px;
												text-align: center;
												font-size: 16px;
												border: 1px solid #5F6C76;
												font-family: Roboto;
												font-weight: 400;
												color: #FFFFFF;
											}
										}
									}
								}
							}
						}
					}
				}
				// 名次管理/自由成绩展示
				.spread_rank{
					margin-top: 50px;
					.spread_top{
						display: flex;
						// top 第一列
						.spread_list_one{
							.spread_round_two{
								position: relative;
								.spread_block_two{
									width: 280px;
									padding: 0 15px;
									background-color: #252A3B;
									.team_top{
										display: flex;
										justify-content: space-between;
										border-bottom: 1px solid #464A4E;
										padding: 20px 0;
										.team_left{
											display: flex;
											align-items: center;
											.team_radius{
												width: 45px;
												height: 45px;
												background-color: #57617C;
												border-radius: 50%;
												margin-right: 20px;
												.default_img{
													width: 50px;
													height: 50px;
												}
											}
											.team_name{
												font-size: 16px;
												font-family: Roboto;
												font-weight: 400;
												color: #FFFFFF;
												width: 120px;
												overflow: hidden;
												text-overflow: ellipsis;
												white-space: nowrap;
											}
										}
										.team_right{
											.team_num{
												width: 45px;
												height: 45px;
												line-height: 45px;
												text-align: center;
												font-size: 16px;
												border: 1px solid #5F6C76;
												font-family: Roboto;
												font-weight: 400;
												color: #FFFFFF;
											}
											.spread_color{
												color:#232323;
												background-color:#F59B23;
												border: 1px solid #F59B23;
											}
										}
									}
									.team_btom{
										display: flex;
										justify-content: space-between;
										padding: 20px 0;
										.team_left{
											display: flex;
											align-items: center;
											.team_radius{
												width: 45px;
												height: 45px;
												background-color: #57617C;
												border-radius: 50%;
												margin-right: 20px;
												.default_img{
													width: 50px;
													height: 50px;
												}
											}
											.team_name{
												font-size: 16px;
												font-family: Roboto;
												font-weight: 400;
												color: #FFFFFF;
												width: 120px;
												overflow: hidden;
												text-overflow: ellipsis;
												white-space: nowrap;
											}
										}
										.team_right{
											.team_num{
												width: 45px;
												height: 45px;
												line-height: 45px;
												text-align: center;
												font-size: 16px;
												border: 1px solid #5F6C76;
												font-family: Roboto;
												font-weight: 400;
												color: #FFFFFF;
											}
										}
									}
								}
							}
						}
					}
				}
				.against_tabs_list{
					display: flex;
					// justify-content: space-between;
					.against_block{
						width: 280px;
						padding: 0 15px;
						height: 48px;
						font-size: 16px;
						font-weight: 500;
						color: #B7B7B7;
						border-radius: 5px;
						cursor: pointer;
						margin-right: 22px;
						display: flex;
						align-items: center;
						justify-content: center;
						border: 1px solid #67717A;
						margin-right: 100px;
						font-family: PingFangSC-Medium, PingFang SC;
					}
					.against_block:last-child{
						margin-right: 0;
					}
					.against_av{
						color: #fff;
						border: 1px solid #1F75DB;
						background-color: #1F75DB;
						position: relative;
					}
				}
				// 单败胜制
				.win_tabs_list{
					display: flex;
					overflow-x: scroll;
					padding-bottom: 20px;
					// justify-content: space-between;
					.win_block{
						font-size: 16px;
						font-weight: 500;
						color: #B7B7B7;
						border-radius: 12px;
						cursor: pointer;
						margin-right: 22px;
						border: 1px solid #67717A;
						margin-right: 100px;
						font-family: PingFangSC-Medium, PingFang SC;
						.win_block_top{
							width: 280px;
							height: 48px;
							padding: 0 15px;
							display: flex;
							align-items: center;
							justify-content: center;
							border-bottom: 1px solid #67717A;
						}
						.win_block_btom{
							width: 280px;
							padding: 0 15px;
							height: 48px;
							display: flex;
							align-items: center;
							justify-content: center;
						}
					}
					.win_block:last-child{
						// margin-right: 0;
					}
					.win_av{
						color: #fff;
						border: 1px solid #1F75DB;
						background-color: #1F75DB;
						position: relative;
						.win_block_top{
							border-bottom: 1px solid #003866;
						}
					}
				}
				// 名次管理/双败
				.double_defeat_container{
					.defeat_block{
						// overflow-x: scroll;
						padding-bottom: 20px;
						&::-webkit-scrollbar {
							width:12px;
							background-color: #F5F5F5;
						}
						/* 滚动槽 */
						&::-webkit-scrollbar-track {
							-webkit-box-shadow:inset006pxrgba(0,0,0,0.3);
							border-radius:10px;
							background-color: #F5F5F5;
						}
						/* 滚动条滑块 */
						&::-webkit-scrollbar-thumb {
							border-radius:10px;
							-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
								background-color: #33384b;
						}
						// &::-webkit-scrollbar-thumb:window-inactive {
						// background:rgba(255,0,0,0.4);
						// }
						.defeat_tit{
							font-size: 25px;
							font-family: Roboto;
							font-weight: bold;
							color: #FFFFFF;
							margin: 40px 0 40px 0 ;
						}
						.defea_tabs_list{
							display: flex;
							overflow-x: scroll;
							padding-bottom: 20px;
							// justify-content: space-between;
							.win_defea_block{
								font-size: 16px;
								font-weight: 500;
								color: #B7B7B7;
								border-radius: 12px;
								cursor: pointer;
								margin-right: 22px;
								border: 1px solid #67717A;
								margin-right: 100px;
								font-family: PingFangSC-Medium, PingFang SC;
								.win_block_top{
									width: 280px;
									height: 48px;
									padding: 0 15px;
									display: flex;
									align-items: center;
									justify-content: center;
									border-bottom: 1px solid #67717A;
								}
								.win_block_btom{
									width: 280px;
									padding: 0 15px;
									height: 48px;
									display: flex;
									align-items: center;
									justify-content: center;
								}
							}
							.win_defea_block:last-child{
								margin-right: 0;
							}
							.win_defea_av{
								color: #fff;
								border: 1px solid #1F75DB;
								background-color: #1F75DB;
								position: relative;
								.win_block_top{
									border-bottom: 1px solid #003866;
								}
							}
						}
						.layout_defea_container{
							margin-top: 30px;
							overflow-x: scroll;
							padding-bottom: 20px;
							.arrange_top{
								display: flex;
								
								// top 第一列
								.arrange_list_one{
									.arrage_round_one{
										.round_block_one{
											position: relative;
											.team_bac{
											width: 280px;
											padding: 0 15px;
											background-color: #252A3B;
											margin-bottom: 30px;
											}
											.team_top{
												display: flex;
												justify-content: space-between;
												border-bottom: 1px solid #464A4E;
												padding: 20px 0;
												.team_left{
													display: flex;
													align-items: center;
													.team_radius{
														width: 45px;
														height: 45px;
														background-color: #57617C;
														border-radius: 50%;
														margin-right: 20px;
														.default_img{
															width: 50px;
															height: 50px;
														}
													}
													.team_name{
														font-size: 16px;
														font-family: Roboto;
														font-weight: 400;
														color: #FFFFFF;
														width: 120px;
														overflow: hidden;
														text-overflow: ellipsis;
														white-space: nowrap;
													}
												}
												.team_right{
													.team_num{
														width: 45px;
														height: 45px;
														line-height: 45px;
														text-align: center;
														font-size: 16px;
														border: 1px solid #5F6C76;
														font-family: Roboto;
														font-weight: 400;
														color: #FFFFFF;
													}
												}
											}
											.team_btom{
												display: flex;
												justify-content: space-between;
												padding: 20px 0;
												.team_left{
													display: flex;
													align-items: center;
													.team_radius{
														width: 45px;
														height: 45px;
														background-color: #57617C;
														border-radius: 50%;
														margin-right: 20px;
														.default_img{
															width: 50px;
															height: 50px;
														}
													}
													.team_name{
														font-size: 16px;
														font-family: Roboto;
														font-weight: 400;
														color: #FFFFFF;
														width: 120px;
														overflow: hidden;
														text-overflow: ellipsis;
														white-space: nowrap;
													}
												}
												.team_right{
													.team_num{
														width: 45px;
														height: 45px;
														line-height: 45px;
														text-align: center;
														font-size: 16px;
														border: 1px solid #5F6C76;
														font-family: Roboto;
														font-weight: 400;
														color: #FFFFFF;
													}
												}
											}
											

										}
									}
									.arrage_round_two{
										position: relative;
										.round_block_two{
											width: 280px;
											padding: 0 15px;
											margin-bottom: 35px;
											background-color: #252A3B;
											.team_top{
												display: flex;
												justify-content: space-between;
												border-bottom: 1px solid #464A4E;
												padding: 20px 0;
												.team_left{
													display: flex;
													align-items: center;
													.team_radius{
														width: 45px;
														height: 45px;
														background-color: #57617C;
														border-radius: 50%;
														margin-right: 20px;
														.default_img{
															width: 50px;
															height: 50px;
														}
													}
													.team_name{
														font-size: 16px;
														font-family: Roboto;
														font-weight: 400;
														color: #FFFFFF;
														width: 120px;
														overflow: hidden;
														text-overflow: ellipsis;
														white-space: nowrap;
													}
												}
												.team_right{
													.team_num{
														width: 45px;
														height: 45px;
														line-height: 45px;
														text-align: center;
														font-size: 16px;
														border: 1px solid #5F6C76;
														font-family: Roboto;
														font-weight: 400;
														color: #FFFFFF;
													}
												}
											}
											.team_btom{
												display: flex;
												justify-content: space-between;
												padding: 20px 0;
												.team_left{
													display: flex;
													align-items: center;
													.team_radius{
														width: 45px;
														height: 45px;
														background-color: #57617C;
														border-radius: 50%;
														margin-right: 20px;
														.default_img{
															width: 50px;
															height: 50px;
														}
													}
													.team_name{
														font-size: 16px;
														font-family: Roboto;
														font-weight: 400;
														color: #FFFFFF;
														width: 120px;
														overflow: hidden;
														text-overflow: ellipsis;
														white-space: nowrap;
													}
												}
												.team_right{
													.team_num{
														width: 45px;
														height: 45px;
														line-height: 45px;
														text-align: center;
														font-size: 16px;
														border: 1px solid #5F6C76;
														font-family: Roboto;
														font-weight: 400;
														color: #FFFFFF;
													}
												}
											}
										}
									}
								}
								
								// top 第四列
								.arrange_list_four{
									margin-left: 100px;
									position: relative;
									.arrage_round_two{
										padding-top: 430px;
										.round_block_two{
											width: 280px;
											padding: 0 15px;
											margin-bottom: 35px;
											background-color: #252A3B;
											.team_top{
												display: flex;
												justify-content: space-between;
												border-bottom: 1px solid #464A4E;
												padding: 20px 0;
												.team_left{
													display: flex;
													align-items: center;
													.team_radius{
														width: 45px;
														height: 45px;
														background-color: #57617C;
														border-radius: 50%;
														margin-right: 20px;
														.default_img{
															width: 50px;
															height: 50px;
														}
													}
													.team_name{
														font-size: 16px;
														font-family: Roboto;
														font-weight: 400;
														color: #FFFFFF;
														width: 120px;
														overflow: hidden;
														text-overflow: ellipsis;
														white-space: nowrap;
													}
												}
												.team_right{
													.team_num{
														width: 45px;
														height: 45px;
														line-height: 45px;
														text-align: center;
														font-size: 16px;
														border: 1px solid #5F6C76;
														font-family: Roboto;
														font-weight: 400;
														color: #FFFFFF;
													}
												}
											}
											.team_btom{
												display: flex;
												justify-content: space-between;
												padding: 20px 0;
												.team_left{
													display: flex;
													align-items: center;
													.team_radius{
														width: 45px;
														height: 45px;
														background-color: #57617C;
														border-radius: 50%;
														margin-right: 20px;
														.default_img{
															width: 50px;
															height: 50px;
														}
													}
													.team_name{
														font-size: 16px;
														font-family: Roboto;
														font-weight: 400;
														color: #FFFFFF;
														width: 120px;
														overflow: hidden;
														text-overflow: ellipsis;
														white-space: nowrap;
													}
												}
												.team_right{
													.team_num{
														width: 45px;
														height: 45px;
														line-height: 45px;
														text-align: center;
														font-size: 16px;
														border: 1px solid #5F6C76;
														font-family: Roboto;
														font-weight: 400;
														color: #FFFFFF;
													}
												}
											}
										}
									}
								}
								// top 第五列
								.arrange_list_five{
									margin-left: 100px;
									position: relative;
									.arrage_round_two{
										padding-top: 430px;
										.round_block_two{
											width: 280px;
											padding: 0 15px;
											margin-bottom: 35px;
											background-color: #252A3B;
											.team_top{
												display: flex;
												justify-content: space-between;
												border-bottom: 1px solid #464A4E;
												padding: 20px 0;
												.team_left{
													display: flex;
													align-items: center;
													.team_radius{
														width: 45px;
														height: 45px;
														background-color: #57617C;
														border-radius: 50%;
														margin-right: 20px;
														.default_img{
															width: 50px;
															height: 50px;
														}
													}
													.team_name{
														font-size: 16px;
														font-family: Roboto;
														font-weight: 400;
														color: #FFFFFF;
														width: 120px;
														overflow: hidden;
														text-overflow: ellipsis;
														white-space: nowrap;
													}
												}
												.team_right{
													.team_num{
														width: 45px;
														height: 45px;
														line-height: 45px;
														text-align: center;
														font-size: 16px;
														border: 1px solid #5F6C76;
														font-family: Roboto;
														font-weight: 400;
														color: #FFFFFF;
													}
												}
											}
											.team_btom{
												display: flex;
												justify-content: space-between;
												padding: 20px 0;
												.team_left{
													display: flex;
													align-items: center;
													.team_radius{
														width: 45px;
														height: 45px;
														background-color: #57617C;
														border-radius: 50%;
														margin-right: 20px;
														.default_img{
															width: 50px;
															height: 50px;
														}
													}
													.team_name{
														font-size: 16px;
														font-family: Roboto;
														font-weight: 400;
														color: #FFFFFF;
														width: 120px;
														overflow: hidden;
														text-overflow: ellipsis;
														white-space: nowrap;
													}
												}
												.team_right{
													.team_num{
														width: 45px;
														height: 45px;
														line-height: 45px;
														text-align: center;
														font-size: 16px;
														border: 1px solid #5F6C76;
														font-family: Roboto;
														font-weight: 400;
														color: #FFFFFF;
													}
												}
											}
										}
									}
								}
							}
							.arrange_btom{
								display: flex;
								// btom 第一列
								.arrange_list_one{
									.arrage_round_one{
										.round_block_one{
											width: 280px;
											padding: 0 15px;
											margin-bottom: 30px;
											position: relative;
											background-color: #252A3B;
											.team_top{
												display: flex;
												justify-content: space-between;
												border-bottom: 1px solid #464A4E;
												padding: 20px 0;
												.team_left{
													display: flex;
													align-items: center;
													.team_radius{
														width: 45px;
														height: 45px;
														background-color: #57617C;
														border-radius: 50%;
														margin-right: 20px;
														.default_img{
															width: 50px;
															height: 50px;
														}
													}
													.team_name{
														font-size: 16px;
														font-family: Roboto;
														font-weight: 400;
														color: #FFFFFF;
														width: 120px;
														overflow: hidden;
														text-overflow: ellipsis;
														white-space: nowrap;
													}
												}
												.team_right{
													.team_num{
														width: 45px;
														height: 45px;
														line-height: 45px;
														text-align: center;
														font-size: 16px;
														border: 1px solid #5F6C76;
														font-family: Roboto;
														font-weight: 400;
														color: #FFFFFF;
													}
												}
											}
											.team_btom{
												display: flex;
												justify-content: space-between;
												padding: 20px 0;
												.team_left{
													display: flex;
													align-items: center;
													.team_radius{
														width: 45px;
														height: 45px;
														background-color: #57617C;
														border-radius: 50%;
														margin-right: 20px;
														.default_img{
															width: 50px;
															height: 50px;
														}
													}
													.team_name{
														font-size: 16px;
														font-family: Roboto;
														font-weight: 400;
														color: #FFFFFF;
														width: 120px;
														overflow: hidden;
														text-overflow: ellipsis;
														white-space: nowrap;
													}
												}
												.team_right{
													.team_num{
														width: 45px;
														height: 45px;
														line-height: 45px;
														text-align: center;
														font-size: 16px;
														border: 1px solid #5F6C76;
														font-family: Roboto;
														font-weight: 400;
														color: #FFFFFF;
													}
												}
											}
										}
										.round_block_one:last-child{
											margin-bottom: 0;
										}
									}
								}
							}
						}
					}
					.defeat_Two_block{
						// overflow-x: scroll;
						padding-bottom: 20px;
						&::-webkit-scrollbar {
							width:12px;
							background-color: #F5F5F5;
						}
						/* 滚动槽 */
						&::-webkit-scrollbar-track {
							-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.3);
							border-radius:10px;
							background-color: #F5F5F5;
						}
						/* 滚动条滑块 */
						&::-webkit-scrollbar-thumb {
							border-radius:10px;
							-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
								background-color: #33384b;
						}
						// &::-webkit-scrollbar-thumb:window-inactive {
						// background:rgba(255,0,0,0.4);
						// }
						.defeat_tit{
							font-size: 25px;
							font-family: Roboto;
							font-weight: bold;
							color: #FFFFFF;
							margin: 40px 0 40px 0 ;
						}
						.lower_tabs_list{
							display: flex;
							overflow-x: scroll;
							padding-bottom: 20px;
							// justify-content: space-between;
							.lower_margin{
								margin-right: 100px;
								.lower_block{
									width: 280px;
									height: 48px;
									padding: 0 15px;
									font-size: 16px;
									font-weight: 500;
									color: #B7B7B7;
									border-radius: 5px;
									cursor: pointer;
									margin-right: 22px;
									display: flex;
									align-items: center;
									justify-content: center;
									border: 1px solid #67717A;
									
									font-family: PingFangSC-Medium, PingFang SC;
								}
								.lower_block:last-child{
									margin-right: 0;
								}
								.lower_av{
									color: #fff;
									border: 1px solid #1F75DB;
									background-color: #1F75DB;
									position: relative;
								}
							}
						}
						.layout_defea_container{
							overflow-x: scroll;
							padding-bottom: 20px;
							margin-top: 30px;
							.arrange_top{
								display: flex;
								.arrange_list_zero{
									.arrage_round_one{
										.round_block_one{
											width: 280px;
											padding: 0 15px;
											margin-bottom: 30px;
											margin-top: 270px;
											position: relative;
											background-color: #252A3B;
											.team_top{
												display: flex;
												justify-content: space-between;
												border-bottom: 1px solid #464A4E;
												padding: 20px 0;
												.team_left{
													display: flex;
													align-items: center;
													.team_radius{
														width: 45px;
														height: 45px;
														background-color: #57617C;
														border-radius: 50%;
														margin-right: 20px;
														.default_img{
															width: 50px;
															height: 50px;
														}
													}
													.team_name{
														font-size: 16px;
														font-family: Roboto;
														font-weight: 400;
														color: #FFFFFF;
														width: 120px;
														overflow: hidden;
														text-overflow: ellipsis;
														white-space: nowrap;
													}
												}
												.team_right{
													.team_num{
														width: 45px;
														height: 45px;
														line-height: 45px;
														text-align: center;
														font-size: 16px;
														border: 1px solid #5F6C76;
														font-family: Roboto;
														font-weight: 400;
														color: #FFFFFF;
													}
												}
											}
											.team_btom{
												display: flex;
												justify-content: space-between;
												padding: 20px 0;
												.team_left{
													display: flex;
													align-items: center;
													.team_radius{
														width: 45px;
														height: 45px;
														background-color: #57617C;
														border-radius: 50%;
														margin-right: 20px;
														.default_img{
															width: 50px;
															height: 50px;
														}
													}
													.team_name{
														font-size: 16px;
														font-family: Roboto;
														font-weight: 400;
														color: #FFFFFF;
														width: 120px;
														overflow: hidden;
														text-overflow: ellipsis;
														white-space: nowrap;
													}
												}
												.team_right{
													.team_num{
														width: 45px;
														height: 45px;
														line-height: 45px;
														text-align: center;
														font-size: 16px;
														border: 1px solid #5F6C76;
														font-family: Roboto;
														font-weight: 400;
														color: #FFFFFF;
													}
												}
											}
										}
										.round_block_one:last-child{
											margin-bottom: 0;
										}
									}
								}
								// top 第一列
								.arrange_list_one{
									margin-left: 100px;
									.arrage_round_two{
										position: relative;
										margin-top: 60px;
										.round_block_two{
											width: 280px;
											padding: 0 15px;
											margin-bottom: 35px;
											background-color: #252A3B;
											.team_top{
												display: flex;
												justify-content: space-between;
												border-bottom: 1px solid #464A4E;
												padding: 20px 0;
												.team_left{
													display: flex;
													align-items: center;
													.team_radius{
														width: 45px;
														height: 45px;
														background-color: #57617C;
														border-radius: 50%;
														margin-right: 20px;
														.default_img{
															width: 50px;
															height: 50px;
														}
													}
													.team_name{
														font-size: 16px;
														font-family: Roboto;
														font-weight: 400;
														color: #FFFFFF;
														width: 120px;
														overflow: hidden;
														text-overflow: ellipsis;
														white-space: nowrap;
													}
												}
												.team_right{
													.team_num{
														width: 45px;
														height: 45px;
														line-height: 45px;
														text-align: center;
														font-size: 16px;
														border: 1px solid #5F6C76;
														font-family: Roboto;
														font-weight: 400;
														color: #FFFFFF;
													}
												}
											}
											.team_btom{
												display: flex;
												justify-content: space-between;
												padding: 20px 0;
												.team_left{
													display: flex;
													align-items: center;
													.team_radius{
														width: 45px;
														height: 45px;
														background-color: #57617C;
														border-radius: 50%;
														margin-right: 20px;
														.default_img{
															width: 50px;
															height: 50px;
														}
													}
													.team_name{
														font-size: 16px;
														font-family: Roboto;
														font-weight: 400;
														color: #FFFFFF;
														width: 120px;
														overflow: hidden;
														text-overflow: ellipsis;
														white-space: nowrap;
													}
												}
												.team_right{
													.team_num{
														width: 45px;
														height: 45px;
														line-height: 45px;
														text-align: center;
														font-size: 16px;
														border: 1px solid #5F6C76;
														font-family: Roboto;
														font-weight: 400;
														color: #FFFFFF;
													}
												}
											}
										}
									}
								}
								
								
								
								
								
								// top 第四列
								.arrange_list_four{
									margin-left: 100px;
									position: relative;
									.arrage_round_two{
										padding-top: 430px;
										.round_block_two{
											width: 280px;
											padding: 0 15px;
											margin-bottom: 35px;
											position: relative;
											background-color: #252A3B;
											.team_top{
												display: flex;
												justify-content: space-between;
												border-bottom: 1px solid #464A4E;
												padding: 20px 0;
												.team_left{
													display: flex;
													align-items: center;
													.team_radius{
														width: 45px;
														height: 45px;
														background-color: #57617C;
														border-radius: 50%;
														margin-right: 20px;
														.default_img{
															width: 50px;
															height: 50px;
														}
													}
													.team_name{
														font-size: 16px;
														font-family: Roboto;
														font-weight: 400;
														color: #FFFFFF;
														width: 120px;
														overflow: hidden;
														text-overflow: ellipsis;
														white-space: nowrap;
													}
												}
												.team_right{
													.team_num{
														width: 45px;
														height: 45px;
														line-height: 45px;
														text-align: center;
														font-size: 16px;
														border: 1px solid #5F6C76;
														font-family: Roboto;
														font-weight: 400;
														color: #FFFFFF;
													}
												}
											}
											.team_btom{
												display: flex;
												justify-content: space-between;
												padding: 20px 0;
												.team_left{
													display: flex;
													align-items: center;
													.team_radius{
														width: 45px;
														height: 45px;
														background-color: #57617C;
														border-radius: 50%;
														margin-right: 20px;
														.default_img{
															width: 50px;
															height: 50px;
														}
													}
													.team_name{
														font-size: 16px;
														font-family: Roboto;
														font-weight: 400;
														color: #FFFFFF;
														width: 120px;
														overflow: hidden;
														text-overflow: ellipsis;
														white-space: nowrap;
													}
												}
												.team_right{
													.team_num{
														width: 45px;
														height: 45px;
														line-height: 45px;
														text-align: center;
														font-size: 16px;
														border: 1px solid #5F6C76;
														font-family: Roboto;
														font-weight: 400;
														color: #FFFFFF;
													}
												}
											}
										}
									}
								}
								// top 第五列
								.arrange_list_five{
									margin-left: 100px;
									position: relative;
									.arrage_round_two{
										padding-top: 430px;
										.round_block_two{
											width: 280px;
											padding: 0 15px;
											margin-bottom: 35px;
											background-color: #252A3B;
											.team_top{
												display: flex;
												justify-content: space-between;
												border-bottom: 1px solid #464A4E;
												padding: 20px 0;
												.team_left{
													display: flex;
													align-items: center;
													.team_radius{
														width: 45px;
														height: 45px;
														background-color: #57617C;
														border-radius: 50%;
														margin-right: 20px;
														.default_img{
															width: 50px;
															height: 50px;
														}
													}
													.team_name{
														font-size: 16px;
														font-family: Roboto;
														font-weight: 400;
														color: #FFFFFF;
														width: 120px;
														overflow: hidden;
														text-overflow: ellipsis;
														white-space: nowrap;
													}
												}
												.team_right{
													.team_num{
														width: 45px;
														height: 45px;
														line-height: 45px;
														text-align: center;
														font-size: 16px;
														border: 1px solid #5F6C76;
														font-family: Roboto;
														font-weight: 400;
														color: #FFFFFF;
													}
												}
											}
											.team_btom{
												display: flex;
												justify-content: space-between;
												padding: 20px 0;
												.team_left{
													display: flex;
													align-items: center;
													.team_radius{
														width: 45px;
														height: 45px;
														background-color: #57617C;
														border-radius: 50%;
														margin-right: 20px;
														.default_img{
															width: 50px;
															height: 50px;
														}
													}
													.team_name{
														font-size: 16px;
														font-family: Roboto;
														font-weight: 400;
														color: #FFFFFF;
														width: 120px;
														overflow: hidden;
														text-overflow: ellipsis;
														white-space: nowrap;
													}
												}
												.team_right{
													.team_num{
														width: 45px;
														height: 45px;
														line-height: 45px;
														text-align: center;
														font-size: 16px;
														border: 1px solid #5F6C76;
														font-family: Roboto;
														font-weight: 400;
														color: #FFFFFF;
													}
												}
											}
										}
									}
								}
							}
							.arrange_btom{
								display: flex;
								// btom 第一列
								.arrange_list_one{
									width: 280px;
									padding: 0 15px;
									
								}
							}
						}
					}  
				}
				// 布局排列
				.layout_arrange_container{
					overflow-x: scroll;
					padding-bottom: 20px;
					margin-top: 30px;
					.arrange_top{
						display: flex;
						
						// top 第一列
						.arrange_list_one{
							margin-right: 100px;
							.arrage_round_one{
								.round_block_one{
									position: relative;
									.team_bac{
										width: 310px;
									// padding: 0 15px;
									background-color: #252A3B;
									margin-bottom: 30px;

									}
									.team_top{
										display: flex;
										justify-content: space-between;
										border-bottom: 1px solid #464A4E;
										padding: 20px 15px;
										.team_left{
											display: flex;
											align-items: center;
											.team_radius{
												width: 45px;
												height: 45px;
												background-color: #57617C;
												border-radius: 50%;
												margin-right: 20px;
												.default_img{
													width: 50px;
													height: 50px;
												}
											}
											.team_name{
												font-size: 16px;
												font-family: Roboto;
												font-weight: 400;
												color: #FFFFFF;
												width: 120px;
												overflow: hidden;
												text-overflow: ellipsis;
												white-space: nowrap;
											}
										}
										.team_right{
											.team_num{
												width: 45px;
												height: 45px;
												line-height: 45px;
												text-align: center;
												font-size: 16px;
												border: 1px solid #5F6C76;
												font-family: Roboto;
												font-weight: 400;
												color: #FFFFFF;
											}
										}
									}
									.team_btom{
										display: flex;
										justify-content: space-between;
										padding: 20px 15px;
										.team_left{
											display: flex;
											align-items: center;
											.team_radius{
												width: 45px;
												height: 45px;
												background-color: #57617C;
												border-radius: 50%;
												margin-right: 20px;
												.default_img{
													width: 50px;
													height: 50px;
												}
											}
											.team_name{
												font-size: 16px;
												font-family: Roboto;
												font-weight: 400;
												color: #FFFFFF;
												width: 120px;
												overflow: hidden;
												text-overflow: ellipsis;
												white-space: nowrap;
											}
										}
										.team_right{
											.team_num{
												width: 45px;
												height: 45px;
												line-height: 45px;
												text-align: center;
												font-size: 16px;
												border: 1px solid #5F6C76;
												font-family: Roboto;
												font-weight: 400;
												color: #FFFFFF;
											}
										}
									}
								}
								// 单边框 长直线
								.border_longer{
									position: relative;
									&:before {
										position: absolute;
										content: "";
										width: 90px;
										height: 1px;
										top: 50%;
										right: -98px;
										background-color: #464a4e;
									}
								}
								// 双边框 右上直线
								.border_top_right{
									position: relative;
									&:before {
										position: absolute;
										content: "";
										width: 2px;
										height: 59%;
										top: 50%;
										right: -49px;
										background-color: #464a4e;
									}
									&:after {
										position: absolute;
										content: "";
										width: 45px;
										height: 2px;
										top: 50%;
										right: -47px;
										background-color: #464a4e;
									}
								}
								// 双边框 右下直线
								.border_lower_right{
									position: relative;
									&:before {
										position: absolute;
										content: "";
										width: 2px;
										height: 59%;
										top: -8%;
										right: -49px;
										background-color: #464a4e;
									}
									&:after {
										position: absolute;
										content: "";
										width: 45px;
										height: 2px;
										top: 50%;
										right: -47px;
										background-color: #464a4e;
									}
								}
								
							}
							
						}
						// 单边框  短直线
						.border_short{
							position: relative;
							&:before {
								position: absolute;
								content: "";
								width: 45px;
								height: 3px;
								top: -10%;
								right: -92px;
								background-color: #464A4E;
							}
						}
					}
					
				}
			}
			// 对阵·小组赛
			.event_group_tabs{
				margin: 41px 30px 0 30px;
				.ag_btn_list{
					display: flex;
					margin-bottom: 41px;
					justify-content: space-between;
					.a_btn_left{
						display: flex;
						.ag_rank{
							width: 143px;
							height: 55px;
							color: #fff;
							font-size: 16px;
							border: 1px solid #C6C8CD;
							border-radius: 5px;
							cursor: pointer;
							display: flex;
							align-items: center;
							justify-content: center;
							margin-right: 20px;
						}
						.ag_ranking{
							width: 203px;
							height: 55px;
							color: #fff;
							font-size: 16px;
							cursor: pointer;
							border: 1px solid #C6C8CD;
							border-radius: 5px;
							display: flex;
							align-items: center;
							justify-content: center;
						}
					}
					.a_btn_right{
						.start_btn{
							width: 142px;
							height: 55px;
							color: #fff;
							font-size: 16px;
							cursor: pointer;
							background-color:#0075E2;
							border: 1px solid #0075E2;
							border-radius: 5px;
							display: flex;
							align-items: center;
							justify-content: center;
							font-family:'Roboto-Bold';
						}
					}
				}
				// 排行榜
				.group_table_block{
					margin-bottom: 142px;
					.group_tabs_title{
						display: flex;
						align-items: center;
						margin-bottom: 50px;
						.group_text{
							font-size: 20px;
							// font-family: Noto Sans S Chinese;
							font-family:'Roboto-Bold';
							font-weight: 900;
							color: #FFFFFF;
							margin-right: 20px;
						}
						.group_btn{
							width: 220px;
							height: 46px;
							font-size: 16px;
							font-weight: 500;
							color: #B7B7B7;
							border-radius: 5px;
							cursor: pointer;
							margin-right: 22px;
							display: flex;
							align-items: center;
							justify-content: center;
							border: 1px solid #67717A;
							// font-family: PingFangSC-Medium, PingFang SC;
							font-family:'Roboto-Regular';
						}
						.group_btn2{
							color: #fff;
							border: 1px solid #1F75DB;
							background-color: #1F75DB;
							position: relative;
							font-family:'Roboto-Bold';
						}
					}
					.group_tabs_table{
						.group_table_top{
							display: flex;
							align-items: center;
							height: 65px;
							font-size: 18px;
							font-weight: 400;
							color: #FFFFFF;
							font-family: Noto Sans S Chinese;
							background-color: #5B5E72;
							font-family:'Roboto-Bold';
							.group_top_block{
								width: 10%;
								height: 65px;
								display: flex;
								align-items: center;
								justify-content: center;
							}
							.group_top_block2{
								width: 20%;
								height: 65px;
								display: flex;
								align-items: center;
								justify-content: center;
							}
							.group_top_block3{
								width: 12.5%;
								height: 65px;
								display: flex;
								align-items: center;
								justify-content: center;
							}
						}
						.group_table_content{
							.group_list{
								display: flex;
								align-items: center;
								font-size: 18px;
								font-weight: 400;
								color: #FFFFFF;
								font-family: Noto Sans S Chinese;
								border-bottom: 1px solid #44525E;
								font-family:'Roboto-Regular';
								.group_btom_block{
									width: 10%;
									height: 100px;
									display: flex;
									align-items: center;
									justify-content: center;
								}
								.group_btom_block2{
									width: 20%;
									height: 100px;
									display: flex;
									align-items: center;
									justify-content: center;
									.group_name{
										width: 120px;
										overflow: hidden;
										text-overflow: ellipsis;
										white-space: nowrap;
									}
									.group_radius{
										width: 25px;
										height: 25px;
										border-radius: 50%;
										// background-color: #57617C;
										margin-right: 10px;
										img{
											width: 100%;
											height: 100%;
										}
									}
									.group_status{
										display: flex;
										font-size: 18px;
										font-weight: 400;
										color: #FFFFFF;
										position: relative;
										// width: 200px;
										// overflow: hidden;
										// text-overflow: ellipsis;
										.group_color{
											width: 32px;
											height: 32px;
											line-height: 32px;
											text-align: center;
											border-radius: 6px;
											margin-right: 10px;
											background-color: #00E000;
										}
										.group_color2{
											width: 32px;
											height: 32px;
											line-height: 32px;
											text-align: center;
											border-radius: 6px;
											margin-right: 10px;
											background-color: #0075E2;
										}
										.group_color3{
											width: 32px;
											height: 32px;
											line-height: 32px;
											text-align: center;
											border-radius: 6px;
											background-color: #FF0000;
											margin-right: 10px;
										}
										.group_status_area{
											display: flex;
											font-size: 18px;
											font-weight: 400;
											color: #FFFFFF;
											background-color: #57617C;
											border-radius: 10px;
											padding: 20px;
											position: absolute;
											z-index: 9999;
											right: 0px;
											top: 50px;
											.group_color{
												width: 32px;
												height: 32px;
												line-height: 32px;
												text-align: center;
												border-radius: 6px;
												margin-right: 10px;
												background-color: #00E000;
											}
											.group_color2{
												width: 32px;
												height: 32px;
												line-height: 32px;
												text-align: center;
												border-radius: 6px;
												margin-right: 10px;
												background-color: #0075E2;
											}
											.group_color3{
												width: 32px;
												height: 32px;
												line-height: 32px;
												text-align: center;
												border-radius: 6px;
												background-color: #FF0000;
												margin-right: 10px;
											}
										}
									
									}
								}
								.group_btom_block3{
									width: 12.5%;
									height: 100px;
									display: flex;
									align-items: center;
									justify-content: center;
									.win_num{
										color: #0000ff;
										
									}
									.draw_num{
										color: #00FF00;
										
									}
									span{
										margin: 0 5px;
									}
									.lose_num{
										color: #FF0000;
									}
								}
								.win{
									color: #0000ff;
								}
								.draw{
									color: #00FF00;
								}
							}
						}
					}
				}
				.group_table_block:last-child{
					margin-bottom: 0;
				}
				// 对阵详情
				.grou_tabs_information{
					margin-bottom: 142px;
					.group_tabs_title{
						display: flex;
						align-items: center;
						margin-bottom: 50px;
						.group_text{
							font-size: 20px;
							// font-family: Noto Sans S Chinese;
							font-family:'Roboto-Bold';
							font-weight: 900;
							color: #FFFFFF;
							margin-right: 20px;
						}
						.group_btn{
							width: 220px;
							height: 46px;
							font-size: 16px;
							font-weight: 500;
							color: #B7B7B7;
							border-radius: 5px;
							cursor: pointer;
							margin-right: 22px;
							display: flex;
							align-items: center;
							justify-content: center;
							border: 1px solid #67717A;
							// font-family: PingFangSC-Medium, PingFang SC;
							font-family:'Roboto-Regular';
						}
						.group_btn2{
							color: #fff;
							border: 1px solid #1F75DB;
							background-color: #1F75DB;
							position: relative;
							font-family:'Roboto-Bold';
						}
					}
					.group_details{
						.group_tabs_container{
							display: flex;
							overflow-x: scroll;
							padding-bottom: 20px;
							.group_tabs_list{
								display: flex;
								.group_block{
									width: 280px;
									padding: 0 15px;
									height: 48px;
									font-size: 16px;
									font-weight: 500;
									color: #B7B7B7;
									border-radius: 5px;
									cursor: pointer;
									display: flex;
									align-items: center;
									justify-content: center;
									border: 1px solid #67717A;
									margin-right: 20px;
									// font-family: PingFangSC-Medium, PingFang SC;
									font-family:'Roboto-Regular';
								}
								.group_block:last-child{
									margin-right: 0;
								}
								.group_av{
									color: #fff;
									border: 1px solid #1F75DB;
									background-color: #1F75DB;
									position: relative;
								}
							}
						}
						
						.group_round_container{
							display: flex;
							overflow-x: scroll;
							margin-top: 50px;
							.arrange_top{
								display: flex;
								// overflow-x: scroll;
								// padding-bottom: 20px;
								// top 第一列
								.arrange_list_one{
									.arrage_round_two{
										position: relative;
										.round_block_two{
											width: 280px;
											padding: 0 15px;
											margin-bottom: 35px;
											background-color: #252A3B;
											.team_top{
												display: flex;
												justify-content: space-between;
												border-bottom: 1px solid #464A4E;
												padding: 20px 0;
												.team_left{
													display: flex;
													align-items: center;
													.team_radius{
														width: 45px;
														height: 45px;
														background-color: #57617C;
														border-radius: 50%;
														margin-right: 20px;
														.default_img{
															width: 50px;
															height: 50px;
														}
													}
													.team_name{
														font-size: 16px;
														font-family: Roboto;
														font-weight: 400;
														color: #FFFFFF;
														font-family:'Roboto-Regular';
														width: 120px;
														overflow: hidden;
														text-overflow: ellipsis;
														white-space: nowrap;
													}
												}
												.team_right{
													.team_num{
														width: 45px;
														height: 45px;
														line-height: 45px;
														text-align: center;
														font-size: 16px;
														border: 1px solid #5F6C76;
														// font-family: Roboto;
														font-family:'Roboto-Regular';
														font-weight: 400;
														color: #FFFFFF;
													}
												}
											}
											.team_btom{
												display: flex;
												justify-content: space-between;
												padding: 20px 0;
												font-family:'Roboto-Regular';
												.team_left{
													display: flex;
													align-items: center;
													.team_radius{
														width: 45px;
														height: 45px;
														background-color: #57617C;
														border-radius: 50%;
														margin-right: 20px;
														.default_img{
															width: 50px;
															height: 50px;
														}
													}
													.team_name{
														font-size: 16px;
														font-family: Roboto;
														font-weight: 400;
														color: #FFFFFF;
														width: 120px;
														overflow: hidden;
														text-overflow: ellipsis;
														white-space: nowrap;
													}
												}
												.team_right{
													.team_num{
														width: 45px;
														height: 45px;
														line-height: 45px;
														text-align: center;
														font-size: 16px;
														border: 1px solid #5F6C76;
														font-family: Roboto;
														font-weight: 400;
														color: #FFFFFF;
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
				.grou_tabs_information:last-child{
					margin-bottom: 0;
				}
			}
		}
	}
</style>
