<template>
	<div class="index" id="wangeditor">
		<div class="container">
			<div class="match_container">
				<div class="match_head">
					<div class="match_screen">
						<div class="screen_left">
							<div class="screen_text">创建比赛</div>
						</div>
						<div class="screen_right">
							<div class="screen_btn" @click="returns">返回</div>
							<div class="once_bton" v-if="active == 4" @click="handleAuthentication(3)">保存草稿</div>
						</div>
					</div>
				</div>
				<!-- 内容 -->
				<div class="match_content">
					<!-- 步骤条 -->
					<div :class="edit == 'edit' || active!= 4 || active!= 5?'match_step_center':'match_step'">
						<div :class="active == 1 || active == 2 || active == 3 || active == 4?'step_block':'step_ash' " 
							@click="active == 1 || active == 2 || active == 3 || active == 4? handleActive(1) :''">
						<!-- <div :class="active == 1 || active == 2 || active == 3 || active == 4?'step_block':'step_ash' " @click="handleActive(1)"> -->
							<div class="step_num">1</div>
							<div class="step_name">比赛信息</div>
							<div class="step_border"></div>
						</div>
						<div :class="active == 2 || active == 3 || active == 4?'step_block':'step_ash' "
							@click=" active == 2 || active == 3 || active == 4? handleActive(2) :''">
						<!-- <div :class="active == 2 || active == 3 || active == 4?'step_block':'step_ash' " @click="handleActive(2)"> -->
							<div class="step_num">2</div>
							<div class="step_name">赛事规则及奖励</div>
							<div class="step_border"></div>
						</div>
						<div :class="active == 3 || active == 4?'step_block':'step_ash' "
							@click="active == 3 || active == 4? handleActive(3) :''">
							<div class="step_num">3</div>
							<div class="step_name">比赛模式</div>
							<div class="step_border" v-if="edit != 'edit'"></div>
						</div>
						<div :class="active == 4 ?'step_block':'step_ash' " v-if="basis_status" @click=" active == 4 ? handleActive(4) : ''">
							<div class="step_num">4</div>
							<div class="step_name">奖状认证</div>
							<div class="step_border"></div>
						</div>
						<div :class="active == 5 ?'step_block':'step_ash' " v-if="basis_status" @click=" active == 5 ? handleActive(5) :''">
							<div class="step_num">5</div>
							<div class="step_name">提交</div>
							<!-- <div class="step_border"></div> -->
						</div>
					</div>
					<!-- 步骤内容 -->
					<div class="step_content">
						<div class="step_active1" v-if="active == 1">
							<el-form ref="dataForm" :model="dataForm" label-width="130px">
								<el-form-item label="竞赛名称：">
									<el-input v-model="dataForm.tournamentName"@blur="edit=='edit' ? '' : getTourList()" maxlength="30" show-word-limit></el-input>
								</el-form-item>
								<el-form-item label="副标题：">
									<el-input v-model="dataForm.subtitle"></el-input>
								</el-form-item>
								<el-form-item label="竞赛封面：">
									<el-upload class="avatar-uploader" :action="HOST +'/img/upload'" :show-file-list="false"
									 :on-success="res => {return handleAvatarSuccess(res,'tournamentCover', 0);}" :before-upload="beforeAvatarUpload">
										<img class="active1_img" v-if="dataForm.tournamentCover" :src="HOST + dataForm.tournamentCover">
										<!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
										<div class="active1_text" v-else>
											<div class="">Please upload a poster</div>
											<div class="">Size recommend: 680 x 680 px</div>
										</div>
									</el-upload>
								</el-form-item>
								<el-form-item label="游戏类型：">
									<el-select v-model="dataForm.gameId" placeholder="请选择" :popper-append-to-body="false">
										<el-option :label="item.gameName" :value="item.gameId" v-for="item in gameLists" :key="item.gameId"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="参赛人数/队伍数：">
									<el-input v-model="dataForm.participantsSize" maxlength="4"></el-input>
								</el-form-item>
								<el-form-item label="游戏Mode：">
									<el-select v-model="dataForm.mode" :popper-append-to-body="false" placeholder="请选择" @change="modeNum">
										<el-option label="1 vs 1" :value="1" v-if="dataForm.tournamentType == 0"></el-option> 
										<el-option label="2 vs 2" :value="2" v-if="dataForm.tournamentType != 0"></el-option>
										<el-option label="3 vs 3" :value="3" v-if="dataForm.tournamentType != 0"></el-option> 
										<el-option label="4 vs 4" :value="4" v-if="dataForm.tournamentType != 0"></el-option> 
										<el-option label="5 vs 5" :value="5" v-if="dataForm.tournamentType != 0"></el-option> 
										<el-option label="6 vs 6" :value="6" v-if="dataForm.tournamentType != 0"></el-option> 
										<el-option label="7 vs 7" :value="7" v-if="dataForm.tournamentType != 0"></el-option> 
										<el-option label="8 vs 8" :value="8" v-if="dataForm.tournamentType != 0"></el-option> 
										<el-option label="9 vs 9" :value="9" v-if="dataForm.tournamentType != 0"></el-option> 
										<el-option label="10 vs 10" :value="10" v-if="dataForm.tournamentType != 0"></el-option> 
										<el-option label="11 vs 11" :value="11" v-if="dataForm.tournamentType != 0"></el-option> 
										<el-option label="12 vs 12" :value="12" v-if="dataForm.tournamentType != 0"></el-option> 
										<el-option label="13 vs 13" :value="13" v-if="dataForm.tournamentType != 0"></el-option> 
										<el-option label="14 vs 14" :value="14" v-if="dataForm.tournamentType != 0"></el-option> 
										<el-option label="15 vs 15" :value="15" v-if="dataForm.tournamentType != 0"></el-option> 
									</el-select>
								</el-form-item>
								<el-form-item label="Substitute：">
									<div class="substitute_block" >
										<el-input v-model="dataForm.substitute" maxlength="4" class="input_sub"></el-input>
										<div class="" style="display: flex;align-items: center;">
											<div class="label">Compulsory?</div>
											<div style="display: flex;align-items: center;height: 40px;margin-left: 40px;">
												<el-radio v-model="dataForm.compulsory" :label="true" @change="changeCompulsory">
													Yes</el-radio>
												<div class="people_container">
													<el-radio v-model="dataForm.compulsory" :label="false" @change="changeCompulsory">
														No</el-radio>
												</div>
											</div>
										</div>
									</div>
								</el-form-item>
								<!-- <el-form-item label="参赛类型：" v-if="id=='' || id == undefined"> -->
								<el-form-item label="参赛类型：">
									<div style="display: flex;align-items: center;height: 40px;">
										<el-radio v-model="dataForm.tournamentType" :label="0" @change="changetype">个人赛</el-radio>
										<div class="people_container">
											<el-radio v-model="dataForm.tournamentType" :label="1" @change="changetype">团队赛</el-radio>
											<!-- <el-input v-model="tournamentType" v-if="dataForm.tournamentType > 0"></el-input>
                      <div class="people_text" v-if="dataForm.tournamentType > 0">人</div> -->
										</div>
									</div>
								</el-form-item>
								<el-form-item label="报名时间：">
									<el-col :span="11">
										<el-date-picker type="datetime"  placeholder="选择时间" @change="handleTime" v-model="dataForm.registrationTimeStart" style="width: 100%;"
										 :picker-options="pickerOptions0"></el-date-picker>
										 
									</el-col>
									<el-col class="line" :span="2" style="color: #FFFFFF;text-align: center;">至</el-col>
									<el-col :span="11">
										<el-date-picker type="datetime" placeholder="选择时间" @change="handleEndTime" v-model="dataForm.registrationTimeEnd" style="width: 100%;"
										 :picker-options="pickerOptions1"></el-date-picker>
									</el-col>
								</el-form-item>
								<el-form-item label="报名费：">
									<el-radio-group v-model="dataForm.registeryFeeType" style="display: flex;align-items: center;height: 40px;">
										<el-radio label="point">不需要</el-radio>
										<div class="people_container">
											<el-radio label="coin">需要</el-radio>
											<el-input v-model="dataForm.registeryFee" v-if="dataForm.registeryFeeType == 'coin'"></el-input>
											<div class="people_text" v-if="dataForm.registeryFeeType == 'coin'">Coins</div>
										</div>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="赛事参与条件：" style="width:500px">
									<div>
										<el-radio v-model="dataForm.eastWest" label="east" @click.native.prevent="onRadioChange('east')"></el-radio>
										<el-radio v-model="dataForm.eastWest" label="west" @click.native.prevent="onRadioChange('west')"></el-radio>
										<el-checkbox v-model="dataForm.oku">残疾人参加</el-checkbox>
										<el-checkbox v-model="dataForm.student">学生参加</el-checkbox>
										<el-checkbox v-model="states">州</el-checkbox>
									</div>
									<el-select v-model="dataForm.state" v-if="states" placeholder="请选择受限城市" style="width: 189px;" :popper-append-to-body="false">
										<el-option :label="item" :value="item" v-for="item in state" :key="item"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="Facebook：">
									<el-input v-model="dataForm.faceBook" placeholder="非必填字段"></el-input>
								</el-form-item>
								<el-form-item label="Instagram：">
									<el-input v-model="dataForm.instagram" placeholder="非必填字段"></el-input>
								</el-form-item>
								<el-form-item label="Discord：">
									<el-input v-model="dataForm.discord" placeholder="非必填字段"></el-input>
								</el-form-item>
								<el-form-item label="live链接：">
									<el-input v-model="dataForm.liveUrl" @blur="checkUrl" placeholder="非必填字段"></el-input>
								</el-form-item>
								<el-form-item label="比赛场地：">
									<el-radio-group v-model="siteline" @change="changeSite" style="display: flex;align-items: center;height: 40px;">
										<el-radio label="online">线上</el-radio>
										<div class="people_container">
											<el-radio label="outline">线下</el-radio>
											<div class="field_input" v-if="siteline != 'online'">
												<el-input v-model="site" placeholder="请输入比赛详细地址"></el-input>
											</div>
										</div>
									</el-radio-group>
								</el-form-item>
								<!-- <el-form-item label="比赛时间开始时间：">
									<el-date-picker type="datetime" placeholder="选择时间" value-format="yyyy-MM-dd HH:mm:ss" v-model="dataForm.tournamentTime"
									 style="width:100%" :picker-options="pickerOptions3" @change="changStartTime"></el-date-picker>
								</el-form-item> -->
								<el-form-item label="比赛时间开始时间：">
									<el-date-picker type="datetime" placeholder="选择时间" @change="handleTourTime" v-model="dataForm.tournamentTime"
									 style="width:100%" :picker-options="pickerOptions3"></el-date-picker>
								</el-form-item>
								<el-form-item label="竞赛介绍：">
									<Tinymce ref="editor" :height="160" v-model="dataForm.introduction" style="width: 591px;zoom: 0.9;" />
								</el-form-item>
								<el-form-item label="赞助方：" v-if="basis_status">
									<div class="sponsor_container" style="margin-bottom:20px" v-for="(item,index) in dataForm.sponsor" :key="index">
										<div class="sponsor_top">
											<el-input v-model="item.sponsorName" placeholder="赞助方名称"></el-input>
										</div>
										<div class="sponsor_in">
											<el-select v-model="item.sponsorType" placeholder="赞助类型" :popper-append-to-body="false">
												<el-option label="Organise" value="Organise"></el-option>
												<el-option label="Co-organise" value="Co-organise"></el-option>
											</el-select>
										</div>
										<div class="sponsor_in">
											<el-select v-model="item.companyType" placeholder="公司类型" :popper-append-to-body="false">
												<el-option label="个人" value="个人"></el-option>
												<el-option label="私人有限公司" value="私人有限公司"></el-option>
											</el-select>
										</div>
										<div class="sponsor_btom">
											<el-upload class="avatar-uploader" :action="HOST +'/img/upload'" :show-file-list="false"
											 :on-success="res => {return handleAvatarSuccess(res,'sponsor', index);}" :before-upload="beforeAvatarUpload">
												<img class="active1_img" v-if="item.sponsorLogo" :src="HOST + item.sponsorLogo">
												<i v-else class="el-icon-plus avatar-uploader-icon"></i>
											</el-upload>
											<div class="spon_pos" @click="handleDelImg('sponsor',index)">删除</div>
										</div>
										<div class="spon_cz">
											<img src="../../assets/images/Frame2.png" class="spon_i2" @click="handleJian(index)">
											<img src="../../assets/images/def02.png" class="spon_i" @click="handleAdd" v-if="(index+1) == dataForm.sponsor.length">
										</div>
									</div>
								</el-form-item>
								<el-form-item>
									<div class="nex_step" @click="next_step(2)">下一步</div>
								</el-form-item>
							</el-form>
						</div>
						<!-- 步骤2 赛事规则及奖励 -->
						<div class="step_active2" v-if="active == 2">
							<div class="rule_container">
								<el-form ref="dataForm" :model="dataForm" label-width="130px">
									<el-form-item label="奖项介绍：">
										<div class="step_active4">
											<div class="attestation_container" style="display:inline-block">
												<div class="attes_in" style="margin:0">
													<div class="attes_in_table" style="margin:0">
														<div class="in_table_top">
															<div class="in_td_block">名次</div>
															<div class="in_td_block">奖品类型</div>
															<div class="in_td_block">奖品</div>
															<div class="in_td_block">奖品数量</div>
															<div class="in_td_block">奖品图</div>
															<div class="in_td_block">奖品价值</div>
														</div>
														<div class="in_table_btom" v-for="(item,index) in dataForm.reward" :key="index">
															<div class="in_td_block">
																<el-select v-model="item.rank" placeholder="请选择" style="width:90%" :popper-append-to-body="false">
																	<el-option label="冠军" :value="1"></el-option>
																	<el-option label="亚军" :value="2"></el-option>
																	<el-option label="季军" :value="3"></el-option>
																	<el-option label="优秀奖" :value="4"></el-option>
																	<el-option label="安慰奖" :value="5"></el-option>
																</el-select>
															</div>
															<div class="in_td_block">
																<el-select v-model="item.rewardType" placeholder="请选择" style="width:90%" :popper-append-to-body="false">
																	<el-option label="物品" value="1"></el-option>
																	<el-option label="现金" value="2"></el-option>
																</el-select>
															</div>
															<div class="in_td_block">
																<el-input v-model="item.rewardName" placeholder="奖品名称" style="width:90%"></el-input>
															</div>
															<div class="in_td_block">
																<el-input v-model="item.quantity" placeholder="奖品数量" style="width:90%"></el-input>
															</div>
															<div class="in_td_block">
																<el-upload class="avatar-uploader" :action="HOST +'/img/upload'" :show-file-list="false"
																 :on-success="res => {return handleAvatarSuccess(res,'reward', index);}" :before-upload="beforeAvatarUpload">
																	<img class="in_td_img" v-if="item.rewardPicture" :src="HOST + item.rewardPicture">
																	<!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
																	<div class="in_td_text" v-else>
																		<div class="">Please upload a poster</div>
																		<div class="">Size recommend: 256 x 170 px</div>
																	</div>
																</el-upload>
															</div>
															<div class="in_td_block">
																<el-input v-model="item.rewardPrice" style="width:50%;margin-right:10px"></el-input> RM
															</div>
															<div class="rulel_position">
																<img src="../../assets/images/Frame2.png" alt="" @click="handleJianReward(index)">
															</div>
														</div>
													</div>
												</div>
												<div class="add_turn" @click="handleAddReward">
													<img src="../../assets/images/add.png" alt="">
													增加奖项
												</div>
											</div>
										</div>
									</el-form-item>
									<el-form-item label="规则介绍：">
										<Tinymce ref="editor" :height="160" v-model="dataForm.terms" style="width: 591px;zoom: 0.9;" />
									</el-form-item>
									<el-form-item>
										<div class="step_btn">
											<div class="last_step" @click="next_step(1)">上一步</div>
											<div class="nex_step" @click="next_step(3)">下一步</div>
										</div>
									</el-form-item>
								</el-form>
							</div>
						</div>
						<!-- 步骤3   比赛模式 -->
						<div class="step_active3" v-if="active == 3">
							<el-form ref="dataForm" :model="dataForm" label-width="130px">
								<el-form-item label="比赛场地：">
									<el-radio-group v-model="stage" style="display: flex;align-items: center;height: 33px;">
										<!-- <el-radio :label="1" @change="stage=1;dataForm.stage[0]['format']=1">单阶段比赛</el-radio> -->
										<!-- <el-radio :label="2" @change="stage=2;dataForm.stage[0]['format']=3">双阶段比赛</el-radio> -->
										<el-radio :label="1" @change="changeFormat(1)">单阶段比赛</el-radio>
										<el-radio :label="2" @change="changeFormat(2)">双阶段比赛</el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="赛制：">
									<div class="sponsor_container">
										<div class="sponsor_in">
											<el-select v-model="dataForm.stage[0]['format']" placeholder="请选择" v-if="stage==1" :popper-append-to-body="false">
												<el-option label="Single Elimination" :value="1"></el-option>
												<el-option label="Double Elimination" :value="2" ></el-option>
												<el-option label="Free For All" :value="4"></el-option>
											</el-select>
											<el-select v-model="dataForm.stage[0]['format']" placeholder="请选择" v-if="stage==2" :popper-append-to-body="false">
												<el-option label="Round Robin" :value="3"></el-option>
											</el-select>
										</div>
										<div class="sponsor_top2" v-if="stage == 2">
											<el-input v-model="dataForm.stage[0].groupSize"></el-input>
											<div class="people_text">参赛人/队伍一组竞赛</div>
										</div>
										<div class="sponsor_top2" v-if="stage == 2">
											<el-input v-model="dataForm.stage[0].promotionSize"></el-input>
											<div class="people_text">参赛人/队伍晋级</div>
										</div>
										<div class="sponsor_top2" v-if="stage == 2">
											<el-input v-model="dataForm.stage[0].round"></el-input>
											<div class="people_text">队伍互相对打的次数</div>
										</div>
									</div>
								</el-form-item>
								<el-form-item label="决赛阶段：" v-if="stage == 2">
									<el-select v-model="format" placeholder="请选择" :popper-append-to-body="false">
										<el-option label="Single Elimination" :value="1"></el-option>
										<el-option label="Double Elimination" :value="2"></el-option>
									</el-select>
								</el-form-item>

								<el-form-item>
									<div class="step_btn">
										<div class="last_step" @click="next_step(2)">上一步</div>
										<div class="nex_step" v-if="basis_status == true" @click="next_step(4)">下一步</div>
										<div class="nex_step" v-else @click="handleAuthentication(2)">保存</div>
									</div>
								</el-form-item>
							</el-form>
						</div>

						<!-- 步骤4   奖项认证 -->
						<div class="step_active4" v-if="active === 4">
							<!-- 认证弹窗 -->
							<div class="mark_bac" v-if="deposit_status == true"></div>
							<div class="deposit_window" v-show="deposit_status">
								<div class="deposit_head">
									<div class="deposit_tit">押金认证</div>
									<div class="chargini_qr" @click="deposit_status = ! deposit_status">X</div>
								</div>
								<div class="deposit_content">
									<div class="section_block">
										<div class="setion_tit">第一步骤：</div>
										<div class="setion_text_container">
											<div class="setion_text">请汇款到</div>
											<div class="setion_text">
												银行名字: <span>UOB Bank</span>
											</div>
											<div class="setion_text">
												账户名字: <span>Bountee Sdn Bhd</span>
											</div>
											<div class="setion_text">
												银行号码: <span>12345678321</span>
											</div>
										</div>
									</div>
									<div class="section_block">
										<div class="setion_tit">第二步骤：</div>
										<div class="setion_text_container">
											<div class="setion_text">
												请把你的汇款收据邮件到 <span>admin@bountee.com.my</span>
											</div>
										</div>
									</div>
								</div>
								<div class="deposit_btom">
									<div class="charg_bton" @click="handleAuthentication(2)">确认</div>
								</div>
							</div>
							<!-- end -->
							<div class="attestation_container">
								<div class="attes_in">
									<div class="attes_in_table">
										<div class="in_table_top">
											<div class="in_td_block">名次</div>
											<div class="in_td_block">奖品类型</div>
											<div class="in_td_block">奖品</div>
											<div class="in_td_block">奖品图</div>
											<div class="in_td_block">奖品价值</div>
										</div>
										<div class="in_table_btom" v-for="item in dataForm.reward" :key="item">
											<div class="in_td_block">{{item.rank == 1?'冠军':'亚军'}}</div>
											<div class="in_td_block">{{item.rewardType == 1?'物品':'现金'}}</div>
											<div class="in_td_block">{{item.rewardName}}</div>
											<div class="in_td_block">
												<el-image :src="HOST + item.rewardPicture" class="in_td_img">
													<div slot="error" class="image-slot">
														<img src="../../assets/images/default_pic.png" class="in_td_img" />
													</div>
												</el-image>
												<!-- <img src="../../assets/images/default_pic.png" v-if="item.rewardPicture == '' || item.rewardPicture == null || item.rewardPicture == undefined" class="in_td_img"/> -->
												<!-- <img :src="HOST + item.rewardPicture" v-else class="in_td_img" > -->
											</div>
											<div class="in_td_block">{{item.rewardPrice}} RM</div>
										</div>
									</div>
									<div class="attes_tit">奖项认证押金</div>
									<div class="attes_describe">进行平台赛事认证，您的赛事将获得专属平台奖项认证徽章</div>
								</div>
								<div class="attes_bton">
									<div class="skip_bton" @click="handleAuthentication(1)">跳过认证</div>
									<div class="once_bton" @click="deposit_status = ! deposit_status">立即认证</div>
								</div>
							</div>
						</div>
						<div class="step_active5" v-if="active === 5&&dataForm.status == 1">
							<img src="../../assets/images/success.png" alt="">
							<p>提交成功</p>
							<p class="step_texts">您创建的赛事已提交审核，预计72小时完成审核，请留意系统或邮件通知</p>
							<el-button type="primary" class="primary" @click="returns">返回赛事管理中心</el-button>
						</div>
						<div class="step_active5" v-if="active === 5&&dataForm.status == 5">
							<img src="../../assets/images/error.png" alt="">
							<p>审核未通过</p>
							<p class="step_texts">您创建的赛事未通过平台审核，定金将原路返回至您的支付账户，请留意到账通知</p>
							<el-button type="primary" class="primary" @click="returns">重新创建赛事</el-button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import LeftView from '@/components/center/left.vue';
	import Tinymce from '@/components/Tinymce';
	import {
		gameList,
		tournamentAdd,
		eventDetail,tournamentList
	} from '@/api/macth'
	export default {
		name: "information",
		components: {
			LeftView,
			Tinymce
		},
		data() {
			return {
				form:[],
				active: 1, //步骤条切换
				deposit_status: false, //认证弹窗
				stage: 1,
				state: ['柔佛州', '吉打州', '吉兰丹州', '马六甲州', '森美兰州', '彭亨州', '槟城州', '霹雳州', '玻璃市', '雪兰莪州', '登嘉楼州', '沙巴州', '砂拉越州'],
				east: false,
				west: false,
				states: false,
				site: '',
				tournamentType: 0,
				format: 1,
				pickerOptions0: {
					//报名开始时间
					disabledDate: (time) => {
						let registrationTimeEnd = this.dataForm.registrationTimeEnd
						if (registrationTimeEnd!= "") {
							//报名结束时间不为空
							return time.getTime() < Date.now() - 8.64e7 || time.getTime() >  new Date(registrationTimeEnd).getTime();
						} else {
							return time.getTime() < Date.now() - 8.64e7;//不能选择当前时间之前的时间
						}
					}
				},
				pickerOptions1: {
					//报名结束时间
					disabledDate: (time) => {
						let registrationTimeStart = this.dataForm.registrationTimeStart
						let registrationTimeEnd = this.dataForm.registrationTimeEnd
						let tournamentTime = this.dataForm.tournamentTime
						if (registrationTimeStart != "") {
							//开始时间不为空
							return time.getTime() < Date.now() - 8.64e7 || time.getTime() < new Date(registrationTimeStart).getTime();
						}else if(tournamentTime != ''){
							//开赛时间不为空
							return time.getTime() < Date.now() - 8.64e7 || time.getTime() > new Date(tournamentTime).getTime();
						}else{
							//报名开始、开赛时间皆为空
							return time.getTime() < Date.now() - 8.64e7;
						}
					}
				},
				pickerOptions3: {
					//开赛时间
					disabledDate: (time) => {
						let registrationTimeEnd = this.dataForm.registrationTimeEnd
						if (registrationTimeEnd != "") {
							//报名结束时间不为空
							return time.getTime() < Date.now() - 8.64e7 || time.getTime() < new Date(registrationTimeEnd).getTime();
						}else{
							//报名开始、开赛时间皆为空
							return time.getTime() < Date.now() - 8.64e7;
						}
					}
				},
				dataForm: {
					tournamentName: "",
					subtitle: "",
					tournamentCover: "",
					gameId: "",
					participantsSize: "",
					tournamentType: 0,
					mode: 1, // 1V1 or 5v5,
					registrationTimeStart: "",
					registrationTimeEnd: "",
					registeryFee: "",
					registeryFeeType: "point",
					liveUrl: "",
					site: "online",
					tournamentTime: "",
					introduction: "",
					eastWest: "",
					oku: false,
					student: false,
					tournamentCategory: "officially",
					state: "",
					draft: false,
					authentication: false,
					substitute:'',//替补人员
					compulsory:false,//是否必须替补
					faceBook:'',//
					instagram:'',					
					discord:'',
					sponsor: [{
						sponsorName: "",
						sponsorLogo: "",
						sponsorType: "Organise",
						companyType: "",
					}],
					reward: [{
						rewardType: "",
						rewardName: "",
						quantity: "",
						rewardPicture: "",
						rewardPrice: "",
						rank: 1,
						grantConfirm: "",
						rewardConfirm: "",
						rewardId: "",
						tournamentId: "",
					}],
					terms: "",
					stage: [{
						format: 1,
						groupSize: "",
						promotionSize: "",
						round: "",
						stageType: ""
					}],
				},
				gameLists: [],
				today_date: '',
				basis_status: true, //true 是空  false 编辑    
				edit:'',
				id:'',
				check_link:true,//检查链接是否合法，false不合法，true合法
				siteline:"online",//比赛场地 online为线上，outline为线下
				tournament_list:[],//赛事列表，
				isName:false,//输入的赛事名称与已有的赛事名称是否相同,false不相同，true相同
				checkrank_status:false,//检验赛事奖励是否有没填选的,false不通过(有未填选的），true通过(符合要求)
				

			};
		},
		mounted() {
			this.gameList();
			this.id = this.$route.query.id
			this.edit = this.$route.query.edit
			if (this.$route.query.id != null && this.$route.query.id != '' && this.$route.query.id != undefined) {
				this.handleInfo(this.$route.query.id);
			}
			var date = new Date();
			this.today_date = date.toLocaleDateString(); //获取当前日期
			// 未审核 只停留在最后一步
			if (this.$route.query.type == 1) {
				this.active = 5;
				this.edit = 'edit'
			}
			// 判断赛事id是否有值，有id编辑时隐藏部分操作
			if (this.$route.query.id != undefined && this.$route.query.id != null && this.$route.query.id != '') {
				this.basis_status = false
			} else {
				this.basis_status = true
			}
		},
		methods: {
			//是否必须替补
			changeCompulsory(val){
				console.log(val)
				console.log(this.dataForm.compulsory)
				// if (val == true) {
				// 	console.log("这里是1")
				// 	console.log(this.dataForm.compulsory)
				// 	// this.dataForm.mode = 1
				// } else if (val != true) {
				// 	console.log("这里是2")
				// 	console.log(this.dataForm.compulsory)
				// 	// this.dataForm.mode = 2
				// }
			},
			//报名开始时间改变时的处理
			handleTime() {
				var startAt = new Date(this.dataForm.registrationTimeStart) * 1000 / 1000
				var endAt = new Date(this.dataForm.registrationTimeEnd) * 1000 / 1000
				//当开始时间比现在的时间早时
				if (startAt < Date.now()) {
					// 开始时间=现在的时间
					this.dataForm.registrationTimeStart = new Date()
					//当结束时间不为空时
					if (this.dataForm.registrationTimeEnd != '' && this.dataForm.registrationTimeEnd != null && this
						.dataForm.registrationTimeEnd != undefined) {
						//当结束时间比开始时间早时
						if (this.dataForm.registrationTimeEnd < this.dataForm.registrationTimeStart) {
							// 开始时间比现在的时间早时,将结束时间内设置为现在的时间
							if (startAt < Date.now()) {
								setTimeout(() => {
									this.dataForm.registrationTimeEnd = new Date()
								}, 1000)
								if(this.dataForm.tournamentTime != '' && this.dataForm.tournamentTime != null && this.dataForm.tournamentTime != undefined){
									setTimeout(() => {
										this.dataForm.tournamentTime = new Date()
									}, 2000)
								}
							} else {
								// 开始时间大于现在的时间时,结束时间 = 开始时间
								this.dataForm.registrationTimeEnd = this.dataForm.registrationTimeStart
							}
						}
					}
				} else {
					//开始时间大于现在的时间
					//结束时间小于开始时间
					if (endAt < startAt) {
						// 开始时间比现在的时间早时,1秒之后将结束时间内设置为现在的时间
						if (startAt < Date.now()) {
							setTimeout(() => {
								this.dataForm.registrationTimeEnd = new Date()
							}, 1000)
						} else {
							this.dataForm.registrationTimeEnd = this.dataForm.registrationTimeStart
						}
					}
				}
			},
			//报名结束时间改变时的处理
			handleEndTime(){
				var startAt = new Date(this.dataForm.registrationTimeStart) * 1000 / 1000
				var endAt = new Date(this.dataForm.registrationTimeEnd) * 1000 / 1000
				if(this.dataForm.registrationTimeStart != '' && this.dataForm.registrationTimeStart != null && this.dataForm.registrationTimeStart != undefined){
					//开始时间不为空时，结束时间的额处理
					if(endAt < startAt){
					// 开始时间比现在的时间早时,将结束设置为现在的时间
						if(startAt < Date.now()){
							setTimeout(() => {
								this.dataForm.registrationTimeEnd = new Date()
							},1000)
						}else{
							this.dataForm.registrationTimeEnd = this.dataForm.registrationTimeStart
						}
					}
				}else{
					//开始时间为空时，结束时间=现在的时间
					// this.dataForm.endTime = new Date()
					//当开始时间比现在的时间早时
					if(endAt < Date.now()){
						// 结束时间=现在的时间
						this.dataForm.registrationTimeEnd = new Date()
					}
				}
				if(this.dataForm.tournamentTime != '' && this.dataForm.tournamentTime != null && this.dataForm.tournamentTime != undefined){
					if(this.dataForm.tournamentTime < this.dataForm.registrationTimeEnd){
						if(endAt < Date.now()){
							setTimeout(() => {
								this.dataForm.tournamentTime = new Date()
							},1000)
						}else{
							this.dataForm.tournamentTime = this.dataForm.registrationTimeEnd
						}
					}
				}else{
					// if(this.dataForm.tournamentTime < Date.now()){
					// 	// 结束时间=现在的时间
					// 	this.dataForm.tournamentTime = new Date()
					// }
				}
			},
			//赛事开始时间处理
			handleTourTime(){
				var startAt = new Date(this.dataForm.registrationTimeStart) * 1000 / 1000
				var endAt = new Date(this.dataForm.registrationTimeEnd) * 1000 / 1000
				var tourTime = new Date(this.dataForm.tournamentTime) * 1000 / 1000
				if(this.dataForm.registrationTimeEnd != '' && this.dataForm.registrationTimeEnd != null && this.dataForm.registrationTimeEnd != undefined){
					if(tourTime < endAt){
						if(endAt < Date.now()){
							setTimeout(() => {
								this.dataForm.tournamentTime = new Date()
							},1000)
						}else{
							this.dataForm.tournamentTime = this.dataForm.registrationTimeEnd
						}
					}
				}else{
					if(this.dataForm.tournamentTime < Date.now()){
						// 结束时间=现在的时间
						this.dataForm.tournamentTime = new Date()
					}
				}
			},
			getTourList() {
				tournamentList({size:0}).then(res => {
					this.tournament_list = res.data.list;
					this.isName = false
					var tmp = 0;
					for(let t = 0; t < this.tournament_list.length;t++){
						if(this.dataForm.tournamentName == this.tournament_list[t].tournamentName){
							tmp = tmp+1
							this.$message({
								type:'warning',
								message:'您输入的赛事名称已存在，请重新输入！'
							})
						}
					}
					if (tmp > 0){
						this.isName = true
					}
					console.log("赛事名称重复"+this.isName)
					
						
				})
			},
			changeSite(){
				console.log(this.siteline)
			},
			//切换单双阶段比赛
			changeFormat(index){
				console.log(index)
				if(index == 1){
					this.stage = 1
					this.dataForm.stage[0]['format'] = 1
					console.log(this.dataForm.stage[0]['format'])
					console.log(this.dataForm.stage)
				}else if(index == 2){
					this.stage = 2
					this.dataForm.stage[0]['format'] = 3
					console.log(this.dataForm.stage[0]['format'])
					console.log(this.dataForm.stage)
				}
			},
			//取消限制东西的选中
			onRadioChange(e){
				if(this.dataForm.eastWest === e){
					this.dataForm.eastWest = ''
					return
				}
				this.dataForm.eastWest = e
			},
			//检验link输入是否合法
			checkUrl(){
				// console.log("链接")
				let match2 = /^((http|https):\/\/)?(([A-Za-z0-9]+-[A-Za-z0-9]+|[A-Za-z0-9]+)\.)+([A-Za-z]+)[/\?\:]?.*$/;
				let text2 = match2.test(this.dataForm.liveUrl)
				if(!text2){
					if(this.dataForm.liveUrl == ''){
						this.check_link = true
						console.log(this.check_link)
					}else{
						this.$message({
							type:'warning',
							message:'您输入的链接不合法，请重新输入！'
						})
						this.check_link = false
						console.log(this.check_link)
					}
				}else{
					this.check_link = true
					console.log(this.check_link)
				}
			},
			// 选中个人赛是切换mode
			changetype(val){
				if(val == 0){
					// console.log("是你了")
					this.dataForm.mode = 1
				}else if(val != 0){
					this.dataForm.mode = 2
				}
			},
			modeNum(){
				console.log(this.dataForm.mode)
			},
			handleActive(active) {
				if (this.$route.query.type != 1) {
					this.active = active;
				}
			},
			handleInfo(tournamentId) {
				let params = {
					tournamentId
				}
				eventDetail(params).then(res => {
					for(let i = 0 ; i < res.data.rewards.length; i++){
						res.data.rewards[i].rank = res.data.rewards[i].ranking
					}
					res.data.reward = []
					this.dataForm = res.data
					// console.log(res.data.reward)
					this.dataForm.reward = res.data.rewards
					this.dataForm.sponsor = res.data.sponsors
					this.dataForm.stage = res.data.stages
					this.dataForm.registrationTimeEnd = this.initDete(this.dataForm.registrationTimeEnd)
					this.dataForm.registrationTimeStart = this.initDete(this.dataForm.registrationTimeStart)
					this.dataForm.tournamentTime = this.initDete(this.dataForm.tournamentTime)
					this.site = res.data.site;
					this.stage = res.data.stages[0].format == 3 ? 2 : 1
					
					// if (res.data.site != '') {
					// 	this.dataForm.site = ''
					// }
					if (res.data.site == 'online') {
						this.siteline = "online"
					}else{
						this.siteline = "outline"
						this.site = res.data.site;
					}
					if(this.stage == 2){
						this.format = res.data.stages[1].format 
					}
					this.tournamentType = res.data.tournamentType
				})
			}, 
			handleAuthentication(type) {
				let { ...params
				} = this.dataForm;
				if (params.id != '') {
					params.tournamentId = params.id
				}
				// if (params.site == '') {
				// 	params.site = this.site
				// }
				if (this.siteline == 'online') {
					params.site = 'online'
				}else{
					params.site = this.site
				}
				if (params.tournamentType > 0) {
					params.tournamentType = params.tournamentType
				}
				if (this.stage == 2) {
					if(this.$route.query.id != null && this.$route.query.id != '' && this.$route.query.id != undefined){
						// params.stage[0]['format'] = this.format
						if(params.stage[0]['format'] == 3){
							if(params.stage.length == 1){
								params.stage.push({
									format: this.format,
									groupSize: null,
									promotionSize: null,
									round: null,
									stageType: null
								})
							}else{
								params.stage[1]['format'] = this.format
							}
						}else{
							params.stage[1]['format'] = this.format
						}
					}else{
						params.stage.push({
							format: this.format,
							groupSize: null,
							promotionSize: null,
							round: null,
							stageType: null
						})
					}
				}
				if (params.registeryFeeType == "point") {
					params.registeryFee = 0
				}
				params.registrationTimeEnd = Date.parse(params.registrationTimeEnd)
				params.registrationTimeStart = Date.parse(params.registrationTimeStart)
				params.tournamentTime = Date.parse(params.tournamentTime)
				var today_dates = Date.parse(this.today_date)
				if (type == 1) {
					this.$confirm('如若你没认证，所有的奖项都需你自己处理完成。如有人投诉，我们有可能会取消你身为主持人的权限。', '确认跳过认证？', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.dataForm.authentication = false;
						tournamentAdd(params).then(res => {
							this.$message({
								message: '已提交，等待审核！',
								type: 'success'
							});
							this.handleInfo(res.data)
							this.next_step(5);
						})
					}).catch(() => {});
				} else if (type == 2) {
					this.deposit_status = !this.deposit_status
					params.authentication = true;
					params['draft'] = false
					console.log(params.stage)
					console.log(params)
					tournamentAdd(params).then(res => {
						this.$message({
							message: '发布成功',
							type: 'success'
						});
						this.handleInfo(res.data)
						this.next_step(5);
					})
				} else {
					params['draft'] = true;
					tournamentAdd(params).then(res => {
						this.$message({
							message: '保存成功',
							type: 'success'
						});
						this.returns();
					})
				}

			},
			handleJian(index) {
				if (this.dataForm.sponsor.length > 1) {
					this.dataForm.sponsor.splice(index, 1)
				}
			},
			handleJianReward(index) {
				this.dataForm.reward.splice(index, 1)
				console.log(this.dataForm.reward)
			},
			handleAdd() {
				this.dataForm.sponsor.push({
					sponsorName: "",
					sponsorLogo: "",
					sponsorType: "Organise",
				})
			},
			handleAddReward() {
				this.dataForm.reward.push({
					rewardType: "",
					rewardName: "",
					quantity: "",
					rewardPicture: "",
					rewardPrice: "",
					rank: ''
				})
				// let arr = JSON.parse(JSON.stringify(this.dataForm))
				// this.dataForm = {}
				// this.dataForm = JSON.parse(JSON.stringify(arr))
				// console.log("点到了这里")
				// console.log(this.dataForm.reward)
			},
			// 游戏列表
			gameList() {
				gameList({size:0}).then(res => {
					const {
						list
					} = res.data
					this.gameLists = list;
				})
			},
			handleDelImg(attr, index) {
				this.dataForm[attr][index]['sponsorLogo'] = ''
			},
			handleAvatarSuccess(res, attr, index) {
				console.log(index)
				this.$loading({
					customClass: "animated fadeOut"
				}).close();
				if(res.code == 200){
					this.$message({
						type: 'success',
						message: res.message
					});
					if (attr === 'tournamentCover') {
						this.dataForm.tournamentCover = res.data
					} else {
						if (attr == "sponsor") {
							this.dataForm[attr][index]['sponsorLogo'] = res.data
						} else {
							this.dataForm[attr][index]['rewardPicture'] = res.data
						}
					}
				}else{
					this.$message({
						type: 'error',
						message: res.message
					});
				}
				
			},
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
			next_step(index) {
				// this.active = index
				let that = this
				if(index == 2){
					if(that.dataForm.tournamentName == ''){
						that.$message({
							type:'warning',
							message:'竞赛名称不能为空！'
						})
					}else if(that.isName == true){
						that.$message({
							type:'warning',
							message:'您输入的赛事名称已存在，请重新输入！'
						})
					}else if(that.dataForm.tournamentCover == '' || that.dataForm.tournamentCover == null || that.dataForm.tournamentCover == undefined){
						that.$message({
							type:'warning',
							message:'请上传竞赛海报！'
						})
					}else if(that.dataForm.gameId == ''){
						that.$message({
							type:'warning',
							message:'请选择游戏类型！'
						})
					}else if(that.dataForm.participantsSize == ''){
						that.$message({
							type:'warning',
							message:'参赛人数/队伍数不能为空！'
						})
					}else if(that.dataForm.mode == ''){
						that.$message({
							type:'warning',
							message:'请选择游戏mode！'
						})
					}else if(that.dataForm.registrationTimeStart == '' || that.dataForm.registrationTimeEnd == ''){
						that.$message({
							type:'warning',
							message:'请选择报名时间！'
						})
					}else if(that.dataForm.registeryFeeType == 'coin' && that.dataForm.registeryFee == ''){
						that.$message({
							type:'warning',
							message:'报名费不能为空！'
						})
					}else if(that.dataForm.tournamentTime == ''){
						that.$message({
							type:'warning',
							message:'请选择比赛开始时间！'
						})
					}else if(that.check_link == false){
						that.$message({
							type:'warning',
							message:'您输入的链接不合法，请重新输入！'
						})
					}else{
						that.active = index
					}
				}else if(index == 3){
					this.checkRank()
					if(that.checkrank_status == false){
						that.$message({
							type:'warning',
							message:'奖项介绍不能为空！'
						})
					}else{
						that.active = index
					}
				}else{
					that.active = index
				}
			},
			checkRank(){
				let that = this
				// let go = false
				for(let r = 0; r < that.dataForm.reward.length;r++){
					if((that.dataForm.reward[r].rank == '' || that.dataForm.reward[r].rank == null || that.dataForm.reward[r].rank == undefined)
					|| (that.dataForm.reward[r].rewardType == '' || that.dataForm.reward[r].rewardType == null || that.dataForm.reward[r].rewardType == undefined)
					|| (that.dataForm.reward[r].rewardName == '' || that.dataForm.reward[r].rewardName == null || that.dataForm.reward[r].rewardName == undefined) 
					|| (that.dataForm.reward[r].quantity == '' || that.dataForm.reward[r].quantity == null || that.dataForm.reward[r].quantity == undefined)
					|| (that.dataForm.reward[r].rewardPrice == '' || that.dataForm.reward[r].rewardPrice == null || that.dataForm.reward[r].rewardPrice == undefined)){
						that.checkrank_status = false
					}else{
						that.checkrank_status = true
					}
				}
				
			},
			onSubmit() {
				console.log('submit!');
			}
		}
	};
</script>
<style lang="less" scoped>
	/deep/ .el-select .el-input .el-input__inner {
		border: 0px;
		background-color: #33384B;
		border: 1px solid #ffffff;
		color: #FFFFFF;
	}
	
	/deep/ .el-select .el-input .el-input__inner:focus {
		color: #FFFFFF;
	}
	
	/deep/ .el-select-dropdown {
		background-color: #33384B;
		border: 1px solid rgba(255,255,255,0.2);
		color: #FFFFFF;
	}
	
	//修改单个的选项的样式
	/deep/ .el-select-dropdown__item {
		background-color: transparent;
		color: #FFFFFF;
		text-align: center;
	}
	/deep/ .el-select-dropdown__item.hover{
		background-color: #545873;
	}
	/deep/ .el-select-dropdown__item.selected{
		background-color: #545873;
	}
</style>
<style lang="less" scoped>
	.el-checkbox {
		color: #fff
	}

	.el-radio {
		color: #fff
	}

	/deep/ .el-upload{
		width:100%
	}
	.container {
		width: 93%;
		background: #33384B;
		margin: 0 56px;
		padding: 0 0 40px 0;
		color: #fff;

		/deep/.el-input__inner {
			background-color: #33384B;
			color: #fff
		}
		.substitute_block{
			display: flex;
			align-items: center;
			justify-content: space-between;
			.input_sub{
				width: 140px;
				margin-right: 20px;
			}
		}

		/deep/.el-form-item__label {
			color: #fff;
		}

		/deep/.el-form-item {
			margin-bottom: 33px;
		}

		.match_container {
			padding: 24px 24px;

			.match_head {
				.match_screen {
					display: flex;
					justify-content: space-between;
					margin-bottom: 61px;

					.screen_left {
						display: flex;
						align-items: center;

						.screen_text {
							font-size: 18px;
							// font-family: PingFangSC-Medium, PingFang SC;
							font-family:'Roboto-Regular';
							font-weight: 500;
							color: #FFFFFF;
						}
					}

					.screen_right {
						.screen_btn {
							width: 69px;
							height: 40px;
							font-size: 14px;
							color: #595959;
							cursor: pointer;
							font-weight: 400;
							line-height: 40px;
							text-align: center;
							border-radius: 2px;
							background: #FFFFFF;
							border: 1px solid #D9D9D9;
							// font-family: PingFangSC-Regular, PingFang SC;
							font-family:'Roboto-Regular';
							float: left;
							margin-right: 10px;
						}

						.once_bton {
							width: 88px;
							height: 40px;
							background: #1890FF;
							border: 1px solid #1890FF;
							border-radius: 2px;
							color: #FCFCFC;
							cursor: pointer;
							line-height: 40px;
							display: flex;
							align-items: center;
							font-size: 14px;
							justify-content: center;
							font-family:'Roboto-Regular';
						}
					}
				}
			}

			.match_content {
				width: 1119px;
				// background-color: #F0C78A;
				margin: 0 auto;

				// 步骤条
				.match_step {
					display: flex;
					margin-bottom: 40px;

					// justify-content: space-between;
					// 选中样式
					.step_block {
						display: flex;
						align-items: center;
						.step_num {
							width: 32px;
							height: 32px;
							line-height: 32px;
							border-radius: 50%;
							background: #177DDC;
							font-size: 14px;
							font-weight: 400;
							color: #FFFFFF;
							margin-right: 8px;
							text-align: center;
							font-family:'Roboto-Bold';
							// font-family: PingFangSC-Regular, PingFang SC;
						}

						.step_name {
							font-size: 16px;
							// font-family: PingFangSC-Medium, PingFang SC;
							font-family:'Roboto-Bold';
							font-weight: 500;
							color: #FFFFFF;
							margin-right: 16px;
						}

						.step_border {
							width: 101px;
							height: 1px;
							background-color: #1890FF;
						}
					}

					.step_ash {
						display: flex;
						align-items: center;

						.step_num {
							width: 32px;
							height: 32px;
							line-height: 32px;
							border-radius: 50%;
							background: #ACACAC;
							font-size: 14px;
							font-weight: 400;
							color: #FFFFFF;
							margin-right: 8px;
							text-align: center;
							// font-family: PingFangSC-Regular, PingFang SC;
							font-family:'Roboto-Regular';
						}

						.step_name {
							font-size: 16px;
							// font-family: PingFangSC-Medium, PingFang SC;
							font-family:'Roboto-Regular';
							font-weight: 500;
							color: #ACACAC;
							margin-right: 16px;
						}

						.step_border {
							width: 101px;
							height: 1px;
							background-color: #ACACAC;
						}
					}
				}

				// 步骤条 编辑之后变中间
				.match_step_center {
					display: flex;
					margin-bottom: 40px;
					justify-content: center;

					// justify-content: space-between;
					// 选中样式
					.step_block {
						display: flex;
						align-items: center;
						
						.step_num {
							width: 32px;
							height: 32px;
							line-height: 32px;
							border-radius: 50%;
							background: #177DDC;
							font-size: 14px;
							font-weight: 400;
							color: #FFFFFF;
							margin-right: 8px;
							text-align: center;
							// font-family: PingFangSC-Regular, PingFang SC;
							font-family:'Roboto-Bold';
							cursor: pointer;
						}

						.step_name {
							font-size: 16px;
							// font-family: PingFangSC-Medium, PingFang SC;
							font-family:'Roboto-Bold';
							font-weight: 500;
							color: #FFFFFF;
							margin-right: 16px;
							cursor: pointer;
						}

						.step_border {
							width: 101px;
							height: 1px;
							background-color: #1890FF;
						}
					}

					.step_ash {
						display: flex;
						align-items: center;

						.step_num {
							width: 32px;
							height: 32px;
							line-height: 32px;
							border-radius: 50%;
							background: #ACACAC;
							font-size: 14px;
							font-weight: 400;
							color: #FFFFFF;
							margin-right: 8px;
							text-align: center;
							// font-family: PingFangSC-Regular, PingFang SC;
							font-family:'Roboto-Regular';
							// cursor: pointer;
						}

						.step_name {
							font-size: 16px;
							// font-family: PingFangSC-Medium, PingFang SC;
							font-family:'Roboto-Regular';
							font-weight: 500;
							color: #ACACAC;
							margin-right: 16px;
							// cursor: pointer;
						}

						.step_border {
							width: 101px;
							height: 1px;
							background-color: #ACACAC;
						}
					}
				}

				// 步骤内容
				.step_content {
					margin: 0 auto;

					// 步骤1
					.step_active1 {
						// width: 514px;
						width: 580px;
						margin: 0 auto;
						font-family:'Roboto-Regular';
						/deep/ .el-form-item__label {
							width: 140px !important;
							// padding-right: 0px;
							// margin-right:5px;
						}
						/deep/ .el-form-item__content{
							margin-left: 140px !important;
						}
						/deep/.el-input .el-input__count .el-input__count-inner{
							background-color: #33384b;
						}
						.active1_img {
							width: 334px;
							height: 180px;
							border-radius: 2px;
							border: 1px solid #FFFFFF;
						}
						.active1_text{
							width: 334px;
							height: 180px;
							border-radius: 2px;
							border: 1px solid #FFFFFF;
							display: flex;
							flex-flow: column;
							justify-content: center;
							text-align: center;
							color: #ACACAC;
						}
						.people_container {
							display: flex;
							align-items: center;

							/deep/.el-input__inner {
								width: 61px;
								height: 32px;
								border-radius: 1px;
								border: 1px solid #ACACAC;
								background-color: #33384B;
								font-family:'Roboto-Regular';
							}

							.field_input {
								/deep/.el-input__inner {
									width: 349px;
									height: 32px;
									border-radius: 1px;
									border: 1px solid #ACACAC;
									background-color: #33384B;
									font-family:'Roboto-Regular';
								}
							}

							.people_text {
								font-size: 14px;
								// font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #ACACAC;
								margin-left: 8px;
								font-family:'Roboto-Regular';
							}
						}

						.sponsor_container {
							.sponsor_top {
								position: relative;

								/deep/.el-input__inner {
									width: 190px;
									height: 32px;
									border-radius: 1px;
									border: 1px solid #ACACAC;
									background-color: #33384B;
									font-family:'Roboto-Regular';
								}


							}

							.spon_cz {
								position: relative;
								left: 200px;
								bottom: 170px;
								display: flex;
								align-items: center;
								font-family:'Roboto-Regular';
								.spon_i {	
									width: 24px;
								}

								.spon_i2 {
									width: 24px;
									margin-right: 24px;
								}
							}


							.sponsor_in {
								/deep/.el-input__inner {
									width: 190px;
									height: 32px;
									border-radius: 1px;
									border: 1px solid #ACACAC;
									background-color: #33384B;
									font-family:'Roboto-Regular';
								}
							}

							.sponsor_btom {
								width: 190px;
								height: 92px;
								margin-top: 6px;
								border-radius: 2px;
								position: relative;
								border: 1px solid #F2F2F2;

								img {
									width: 190px;
									height: 92px;
									object-fit: cover;
								}

								.spon_pos {
									width: 100%;
									height: 30px;
									color: #F2F2F2;
									font-weight: 400;
									line-height: 30px;
									text-align: center;
									font-size: 14px;
									position: absolute;
									bottom: 0;
									// font-family: PingFangSC-Regular, PingFang SC;
									font-family:'Roboto-Regular';

								}
							}
						}

						.nex_step {
							width: 88px;
							height: 40px;
							color: #FFFFFF;
							font-size: 14px;
							font-weight: 400;
							border-radius: 2px;
							background: #1890FF;
							margin-top: 30px;
							cursor: pointer;
							display: flex;
							align-items: center;
							justify-content: center;
							// font-family: PingFangSC-Regular, PingFang SC;
							font-family:'Roboto-Regular';
						}

					}

					// 步骤2 规则及奖励
					.step_active2 {
						.rule_container {
							margin-left: 39px;
							font-family:'Roboto-Regular';
							.rule_in_table {
								width: 506px;

								.rule_table_top {
									display: flex;
									font-size: 16px;
									font-weight: 500;
									color: #FFFFFF;
									margin-bottom: 1px;
									font-family:'Roboto-Bold';
									.rule_td_block {
										width: 168px;
										height: 56px;
										display: flex;
										align-items: center;
										justify-content: center;
										border-right: 1px solid #33384B;
										background: rgba(255, 255, 255, 0.2);
										border-radius: 1px;
									}

									.rule_td_block:last-child {
										border-right: 0px;
									}
								}

								.rule_table_top:last-child {
									margin-bottom: 0;
								}

								.rule_table_btom {
									font-size: 16px;
									font-weight: 500;
									color: #FFFFFF;
									// font-family: PingFangSC-Regular, PingFang SC;
									font-family:'Roboto-Regular';
									.rule_td_lisit {
										display: flex;
										margin-bottom: 2px;
										position: relative;

										.rule_td_block {
											width: 168px;
											height: 56px;
											display: flex;
											align-items: center;
											justify-content: center;
											border-right: 1px solid #33384B;
											background: rgba(255, 255, 255, 0.1);
											border-radius: 1px;

											/deep/.el-select {
												width: 132px;
											}

											.rule_group {
												display: flex;

												/deep/.el-select {
													width: 106px;
												}

												span {
													font-size: 14px;
													font-weight: 400;
													color: #ACACAC;
													margin-left: 12px;
													font-family:'Roboto-Regular';
												}
											}
										}

										.rule_td_block:last-child {
											border-right: 0px;
										}

										.rulel_position {
											position: absolute;
											right: -36px;
											top: 15px;
											
											img {
												width: 23px;
												height: 23px;
												cursor: pointer;
											}
										}
									}

									.rule_td_lisit:last-child {
										margin-bottom: 0;
									}
								}

								.add_turn {
									// width: 506px;
									height: 44px;
									color: #1890FF;
									font-size: 14px;
									font-weight: 400;
									border-radius: 2px;
									display: flex;
									align-items: center;
									justify-content: center;
									border: 1px solid #1890FF;
									// font-family: PingFangSC-Regular, PingFang SC;
									font-family:'Roboto-Regular';
									img {
										width: 35px;
									}
								}
							}

							.step_btn {
								display: flex;
								justify-content: center;
								font-size: 14px;
								// font-family: PingFangSC-Regular, PingFang SC;
								font-family:'Roboto-Regular';
								font-weight: 400;

								.last_step {
									width: 88px;
									height: 38px;
									color: #595959;
									background: #FFFFFF;
									border-radius: 2px;
									border: 1px solid #D9D9D9;
									cursor: pointer;
									display: flex;
									align-items: center;
									justify-content: center;
									margin-right: 8px;

								}

								.nex_step {
									width: 88px;
									height: 40px;
									color: #FFFFFF;
									border-radius: 2px;
									background: #1890FF;
									cursor: pointer;
									display: flex;
									align-items: center;
									justify-content: center;
									font-family:'Roboto-Regular';
								}
							}

						}
					}

					// 步骤3 比赛模式
					.step_active3 {
						width: 514px;
						margin: 0 auto;

						/deep/ .el-form-item {
							display: flex;
							align-items: center;
							font-family:'Roboto-Regular';
							&:nth-child(2) {
								display: flex;
								align-items: flex-start;
							}

							// &:last-child(2){
							// 	display:flex;
							// 	align-items: center;
							// 	justify-content: center;
							// }

							/deep/ .el-form-item__content {
								margin-left: 0px !important;
							}
						}

						.el-form-item__label {
							padding-right: 0px;
							margin-right: 0px;
							font-family:'Roboto-Regular';
						}

						.active1_img {
							width: 334px;
							height: 180px;
							border-radius: 2px;
							border: 1px solid #FFFFFF;
						}

						.sponsor_container {
							.sponsor_top2 {
								margin-top: 6px;
								display: flex;
								align-items: center;

								/deep/.el-input {
									width: 61px;
								}

								/deep/.el-input__inner {
									width: 61px;
									height: 32px;
									border-radius: 1px;
									border: 1px solid #ACACAC;
									background-color: #33384B;
									font-family:'Roboto-Regular';
								}

								.people_text2 {
									ont-size: 33px;
									font-family: Noto Sans S Chinese;
									font-weight: 400;
									color: #7E888E;
									margin-left: 13px;
									font-family:'Roboto-Regular';
								}

								.people_text {
									font-size: 13px;
									font-family: Noto Sans S Chinese;
									font-weight: 400;
									color: #FFFFFF;
									margin-left: 8px;
									font-family:'Roboto-Regular';
								}
							}

							.sponsor_in {
								/deep/.el-input__inner {
									width: 190px;
									border-radius: 1px;
									border: 1px solid #ACACAC;
									background-color: #33384B;
									font-family:'Roboto-Regular';
								}
							}
						}

						.step_btn {
							display: flex;
							justify-content: center;
							font-size: 14px;
							// font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							margin-top: 100px;
							margin-left: 130px;
							font-family:'Roboto-Regular';
							.last_step {
								width: 88px;
								height: 38px;
								color: #595959;
								background: #FFFFFF;
								border-radius: 2px;
								border: 1px solid #D9D9D9;
								cursor: pointer;
								display: flex;
								align-items: center;
								justify-content: center;
								margin-right: 8px;

							}

							.nex_step {
								width: 88px;
								height: 40px;
								color: #FFFFFF;
								border-radius: 2px;
								background: #1890FF;
								cursor: pointer;
								display: flex;
								align-items: center;
								justify-content: center;
							}
						}
					}

					// 步骤4   奖状认证
					.step_active4 {

						// 认证弹窗
						.mark_bac {
							width: 100%;
							height: 100%;
							background: rgba(0, 0, 0, 0.5);
							position: fixed;
							left: 0;
							top: 0;
							z-index: 8;
						}

						.deposit_window {
							position: fixed;
							left: 0;
							right: 0;
							top: 340px;
							margin: 0 auto;
							width: 412px;
							background: #FFFFFF;
							border-radius: 4px;
							z-index: 9;
							padding: 16px 24px;

							.deposit_head {
								margin-bottom: 9px;
								display: flex;
								align-items: center;
								justify-content: space-between;

								.deposit_tit {
									font-size: 16px;
									font-weight: 500;
									color: #000000;
									// font-family: PingFangSC-Medium, PingFang SC;
									font-family:'Roboto-Regular';
								}

								.chargini_qr {
									color: #ACACAC;
									cursor: pointer;
									font-size: 16px;
									font-family:'Roboto-Regular';
								}
							}

							.deposit_content {
								.section_block {
									font-size: 16px;
									// font-family: PingFangSC-Regular, PingFang SC;
									font-weight: 400;
									margin-bottom: 18px;
									line-height: 24px;
									font-family:'Roboto-Regular';
									.setion_tit {
										color: #1F2E4D;
									}

									.setion_text_container {
										.setion_text {
											color: #1F2E4D;
											font-family:'Roboto-Regular';
											span {
												color: #1F2E4D;
												font-weight: bold;
											}
										}
									}
								}
							}

							.deposit_btom {
								display: flex;
								align-items: center;
								justify-content: flex-end;
								// font-family: PingFangSC-Regular, PingFang SC;
								font-family:'Roboto-Regular';
								.charg_bton {
									width: 60px;
									height: 40px;
									display: flex;
									align-items: center;
									justify-content: center;
									background: #1890FF;
									border-radius: 2px;
									font-size: 14px;
									font-weight: 400;
									cursor: pointer;
									color: #FCFCFC;
								}
							}
						}

						//弹窗end
						.attestation_container {
							display: flex;
							flex-direction: column;
							align-items: center;

							.add_turn {
								cursor: pointer;
								// width: 506px;
								height: 44px;
								color: #1890FF;
								font-size: 14px;
								font-weight: 400;
								border-radius: 2px;
								display: flex;
								align-items: center;
								justify-content: center;
								border: 1px solid #1890FF;
								// font-family: PingFangSC-Regular, PingFang SC;
								font-family:'Roboto-Regular';

								img {
									width: 35px;
								}
							}

							.attes_in {
								margin: 0 0 80px 0;
								color: #ACACAC;
								font-weight: 500;
								text-align: center;
								// font-family: PingFangSC-Medium, PingFang SC;
								font-family:'Roboto-Regular';

								.attes_in_table {
									margin-bottom: 40px;

									.in_table_top {
										display: flex;
										font-size: 16px;
										font-weight: 500;
										color: #FFFFFF;
										margin-bottom: 1px;
										
										.in_td_block {
											width: 168px;
											height: 56px;
											display: flex;
											align-items: center;
											justify-content: center;
											border-right: 1px solid #33384B;
											background: rgba(255, 255, 255, 0.2);
											border-radius: 1px;
											font-family:'Roboto-Bold';
										}

										.in_td_block:last-child {
											border-right: 0px;
										}
									}

									.in_table_top:last-child {
										margin-bottom: 0;
									}

									.in_table_btom {
										font-size: 16px;
										font-weight: 500;
										color: #FFFFFF;
										margin-bottom: 2px;
										// font-family: PingFangSC-Regular, PingFang SC;
										font-family:'Roboto-Regular';
										display: flex;
										position: relative;

										.rulel_position {
											position: absolute;
											right: -36px;
											top: 30px;

											img {
												width: 23px;
												height: 23px;
												cursor: pointer;
											}
										}

										.in_td_block {
											width: 168px;
											padding: 10px 0;
											display: flex;
											align-items: center;
											justify-content: center;
											border-right: 1px solid #33384B;
											background: rgba(255, 255, 255, 0.1);
											border-radius: 1px;

											.in_td_img {
												width: 132px;
												height: 56px;
												object-fit: cover;
												border-radius: 2px;
												border: 1px solid #545873;
											}
											.in_td_text {
												width: 155px;
												height: 56px;
												border-radius: 2px;
												font-size: 11px;
												color: #ACACAC;
												border: 1px solid #545873;
												// display: flex;
												// flex-flow: column;
												// justify-content: center;
												// text-align: center;
											}
										}

										.in_td_block:last-child {
											border-right: 0px;
										}
									}

									.in_table_btom:last-child {
										margin-bottom: 0;
									}
								}

								.attes_tit {
									width: 400px;
									font-size: 18px;
									margin: 0 auto;
									padding-bottom: 30px;
									margin-bottom: 30px;
									border-bottom: 1px solid #545873;
								}

								.attes_describe {
									font-size: 14px;
								}
							}

							.attes_bton {
								font-size: 14px;
								// font-family: PingFangSC-Regular, PingFang SC;
								font-family:'Roboto-Regular';
								font-weight: 400;
								display: flex;
								align-items: center;
								justify-content: center;

								.skip_bton {
									color: #595959;
									width: 88px;
									height: 38px;
									background: #FFFFFF;
									border-radius: 2px;
									border: 1px solid #D9D9D9;
									cursor: pointer;
									display: flex;
									align-items: center;
									justify-content: center;
									margin-right: 8px;
								}

								.once_bton {
									width: 88px;
									height: 40px;
									background: #1890FF;
									border-radius: 2px;
									color: #FCFCFC;
									cursor: pointer;
									display: flex;
									align-items: center;
									justify-content: center;
									font-family:'Roboto-Regular';
								}
							}
						}
					}

					.step_active5 {
						text-align: center;

						.step_texts {
							font-size: 14px;
							color: #7E8295;
							margin-bottom: 40px;
							font-family:'Roboto-Regular';
						}
						.primary{
							font-family:'Roboto-Bold';
						}
					}
				}
			}
		}
	}
</style>
