<template>
	<div class="index" id="wangeditor">
		<!-- Web 1920 – 76 -->
		<!-- 选择战队 -->
		<div class="view_detail">
			<div class="mark_bac" v-if="add_status == true"></div>
			<div class="mark_cancel"  v-if="add_status == true" @click.stop="add_status = false">
				<img src="../../assets/images/close.png" />
			</div>
			<div class="mark_content" v-if="add_status == true">
				<div class="content_top">
					<div class="top_left">
						<div class="title">Choose Predict Team</div>
					</div>
					<div class="delete">
						<div class="search_block">
							<div class="search">
								<input placeholder="Seacrh Team name" v-model="teamQuery.teamName"/>
								<button class="btn" @click="getTeam">
									<img src="../../assets/images/2search.png" />
								</button>
							</div>
						</div>
					</div>
				</div>
				<div class="content_block">
					<div id="text_area" >
						<div class="team_list" v-for="(item,index) in team_popup" :key="index" >
							<div class="list_left">
								<!-- <img :src="item.teamLogo != null && item.teamLogo != ''? HOST + item.teamLogo : default_avatar" class="team_logo" /> -->
								<el-image
								style="width: 88px;height: 88px; border-radius: 50%;"
								:src="HOST + item.teamLogo" 
								fit="cover" class="team_logo" ></el-image>
								<div class="team_info">
									<el-tooltip class="item" effect="dark" :content="item.teamName" placement="bottom">
										<div class="team_name">{{item.teamName}}</div>
									</el-tooltip>
									<!-- <div class="team_name">{{item.teamName}}</div> -->
									<div class="game_type">{{item.gameName}}</div>
								</div>
							</div>
							<div class="list_right" >
								<img v-if="item.choose_status == true" src="../../assets/images/xzs.png" alt="" @click="check_choose(item.teamId)">
								<img v-else src="../../assets/images/xz.png"  @click="check_choose(item.teamId)">
							</div>
						</div>
					</div>
				</div>
				<div class="btn_area">
					<div class="save_btn" @click.stop="save_choose">Choose</div>
					<div class="cancel_btn" @click.stop="add_status = false">Cancel</div>
				</div>
			</div>
		</div>
		<!-- end -->
		<!-- 新增竞猜队伍 -->
		<div class="create_team_play" v-if="add_team_status == true">
			<div class="mark_check" @click.stop="cancelAddTeam">
				<img src="@/assets/images/cancel.png" >
			</div>
			<div class="mark_bac"></div>
			<div class="mark_check_container">
				<div class="mark_my_content ">
					<div class="mark_text_one">Create team</div>
					<div class="mark_product_container">
						<div class="mark_product">
							<div class="create_right_form">
								<p class="form_teamname">Logo</p>
								<div class="create_form_logo">
									<div class="logo_upadte">
										<el-upload
											class="avatar-uploader"
											:action="HOST+'img/upload'"
											:show-file-list="false"
											:on-success="res => {return handleAvatarSuccess(res,'teamLogo', 0);}"
											:before-upload="beforeAvatarUpload">
											<img v-if="team_form.teamLogo" :src="HOST + team_form.teamLogo"  class="avatar_y">
											<img v-else class="avatar_w" src="../../assets/images/add_fff.png" alt="" >
										</el-upload>
									</div>
									<!-- <div class="logo_info">Upload team logo ( 1:1 )</div> -->
								</div>
								<div class="form_team">
									<p class="form_teamname">Team Name</p>
									<div class="form_input_block">
										<input type="text" class="input-left" v-model="team_form.teamName"/>
									</div>
								</div>
								<div class="form_team">
									<p class="form_teamname">Team Description</p>
									<div class="area_input_block">
										<!-- <textarea rows="12" cols="" class="input_left" maxlength="1000"></textarea> -->
										<textarea rows="10" class="input-left" v-model="team_form.teamDescription" maxlength="1000"></textarea>
										<!-- <div class="limit_num">({{text_num}}/1000)</div> -->
									</div>
								</div>
							</div>
										
						</div>
					</div>
				</div>
				<div class="mark_my_foot">
					<div class="confirm_btn" @click="addTeam_list(1,'')" v-if="atem_btn == false">Create</div>
					<div class="confirm_btn" @click="addTeam_list(2,andex_num)" v-if="atem_btn == true">Save</div>
					<div class="cancel_btn"@click.stop="cancelAddTeam">Cancel</div>
				</div>
			</div>
		</div>
		<!-- end -->
		<div class="container">
			<div class="predict_container">
				<!-- 内容 -->
				<div class="predict_content">
					<div class="predict_head">
						<div class="predict_back" @click="go_back">
							<span><<</span> Create Predict
						</div> 
						<div class="predict_step_center"><!-- v-if="edit_status == false" -->
							<div :class="active == 1 || active == 2 ?'step_block':'step_ash' " @click="handleActive(1)">
								<div class="step_num">1</div>
								<div class="step_name">Predict Information</div>
								<div class="step_border"></div>
							</div>
							<div :class="active == 2 ?'step_block':'step_ash' " @click="handleActive(2)">
								<div class="step_num">2</div>
								<div class="step_name">Team List</div>
							</div>
						</div>
					</div>
					<!-- 步骤内容 Predict Information -->
					<div class="step_content">
						<div class="step_active1" v-if="active == 1">
							<el-form ref="dataForm" :model="dataForm" :label-position="labelPosition">
								<el-form-item label="Poster" :required="true">
									<!-- <span style="color: red;">*</span> -->
									<div class="poster_flex">
										<div v-if="dataForm.poster==''" style="border:1px solid #fff" class="poster_img">
											<div class="img_tip">Please upload a poster</div>
											<div class="img_size">Size recommend: 466 x 224 px</div>
										</div>
										<img class="poster_img" v-else :src="HOST + dataForm.poster" alt="">
										<el-upload class="avatar-uploader" :action="HOST+'img/upload'" :show-file-list="false" :on-success="res => {return handleAvatarSuccess(res,'Poster', 0);}"
										 :before-upload="beforeAvatarUpload">
											<img class="recycle_Img" src="../../assets/images/recycle.png" alt="">
										</el-upload>
									</div>
								</el-form-item>
								<el-form-item >
									<div class="price_check">
										<div class="check_text">Carousel</div>
										<div class="check_block">
											<img v-if="carousel_check == false"  src="../../assets/images/xz.png" alt="" @click="carousel_check = true">
											<img v-else src="../../assets/images/xzs.png"  @click.stop="carousel_check = false">
										</div>
									</div>
								</el-form-item>
								<el-form-item >
									<div class="poster_flex">
										<div v-if="dataForm.carousel==''" style="border:1px solid #fff" class="poster2_img">
											<div class="img_tip">Please upload a poster if you tick the box carousel.</div>
											<div class="img_size">Size recommend: 1500 x 326 px</div>
										</div>
										<img class="poster2_img" v-else :src="HOST + dataForm.carousel" alt="">
										<img src="../../assets/images/close.png" v-if="dataForm.carousel!=''" @click="handleDelImg('carousel',0)"  class="del_img"/>
										<el-upload class="avatar-uploader" :action="HOST+'img/upload'" :show-file-list="false" :on-success="res => {return handleAvatarSuccess(res,'carousel', 0);}"
										 :before-upload="beforeAvatarUpload">
											<img class="recycle_Img" src="../../assets/images/recycle.png" alt="">
										</el-upload>
										<!-- <div class="spon_pos" @click="handleDelImg('sponsor',index)">删除</div> -->
									</div>
								</el-form-item>
								<el-form-item label="Title" :required="true">
									<el-input v-model="dataForm.title" maxlength="100" show-word-limit></el-input>
								</el-form-item>
								<el-form-item label="Game Type" :required="true">
									<el-select v-model="dataForm.gameId" placeholder="请选择" style="width: 100%;" :popper-append-to-body="false">
										<el-option :label="item.gameName" :value="item.gameId" v-for="item in category_list" :key="item.gameId" ></el-option>
									</el-select>
								</el-form-item>
								<div class="time_flex">
									<el-form-item label="Start Time" :required="true"><!-- prop="startTime" --> 
										<el-date-picker v-model="dataForm.startTime" @change="handleTime" :picker-options="pickerOptions0" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"  type="datetime" placeholder="选择日期" style="width: 360px;"></el-date-picker>
									</el-form-item>
									<el-form-item label="End Time" :required="true"> 
										<el-date-picker v-model="dataForm.endTime" @change="handleEndTime" :picker-options="pickerOptions1"  format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期" style="width: 360px;">
										</el-date-picker>
									</el-form-item>
								</div>
								<div class="time_flex">
									<el-form-item label="Registery Fee  (The coins going to collect from user per predict, its minimum value is 200 coins) " :required="true" > 
										<el-input v-model="dataForm.registrationFee"  min="200"  type="number" style="width: 360px;"></el-input>
									</el-form-item>
								</div>
								<div class="time_flex">
									<el-form-item label="Rate  (Please set the percentage you would like to earn from registration fee) " :required="true"> 
										<el-input v-model="percentage"  min="10" max="60" type="number" style="width: 360px;"></el-input>
									</el-form-item>
								</div>
								<el-form-item >
									<div class="price_check">
										<div class="check_text">Prize</div>
										<div class="check_block">
											<img  v-if="prizeAmount_check == false" src="../../assets/images/xz.png" alt="" @click="prizeAmount_check = true">
											<img  v-else src="../../assets/images/xzs.png" alt="" @click="prizeAmount_check = false">
										</div>
									</div>
								</el-form-item> 
								<div class="time_flex" v-if="prizeAmount_check">
									<el-form-item label="Prize Amount" > 
										<el-input v-model="dataForm.prizeAmount" type="number" min="0" style="width: 360px;"></el-input>
									</el-form-item>
								</div>
								<el-form-item label="Link">
									<el-input v-model="dataForm.videoLink" ></el-input>
								</el-form-item>
								<el-form-item label="Terms and Condition " :required="true">
									<Tinymce ref="editor" :height="160" v-model="dataForm.termsAndCondition" style="width: 591px;zoom: 0.9;" />
								</el-form-item>
								<el-form-item >
									<div class="step_btn">
										<!-- <div class="last_step" @click="saveUpdate">Save</div> -->
										<div class="last_step"@click="next_step(2)">Next</div>
										<div class="nex_step" @click="jump_predict">Cancel</div>
									</div>
								</el-form-item>
							</el-form>
						</div>
						<!-- 步骤2 Team List -->
						<div class="step_active2" v-if="active == 2">
							<div class="rule_container">
								<el-form ref="form" :model="dataForm"  :label-position="labelPosition">
									<el-form-item label="How many teams to predict?" >
										<el-input v-model="dataForm.predictTeamCount" v-on:blur="checkNum" placeholder=" Please key in the number of team you wish user to predict" min="0" style="width: 960px;"></el-input>
									</el-form-item>
									<el-form-item label="Team List" >
										<div class="team_container">
											<div class="team_add" @click="add_status = ! add_status">
												<img src="../../assets/images/add_fff.png" alt="">
											</div>
											<div class="team_list">
												<div class="team_block"  v-for="(item,index) in show_team_list" :key="index" >
													<div class="team_left">
														<div class="team_logo">
															<el-image
															style="width: 100px; height: 100px; border-radius: 50%;"
															:src="HOST + item.teamLogo" 
															fit="fill"></el-image>
															<!-- <img alt=""> -->
														</div>
														<div class="team_txt_block">
															<div class="team_title">{{item.teamName}}</div>
															<div class="team_subtit">{{item.gameName}}</div>
														</div>
														
													</div>
													<div class="team_right">
														<div class="team_info" v-if="item.aboutTeam != '' && item.aboutTeam != null && item.aboutTeam != undefined">{{item.aboutTeam}}</div>
														<div class="team_info" v-if="item.teamDescription != '' && item.teamDescription != null && item.teamDescription != undefined">{{item.teamDescription}}</div>
														<div class="team_del" @click="del_team(index,item)">
															<img src="../../assets/images/cancel.png" alt="">
														</div>
													</div>
												</div>
											</div>
										</div>
									</el-form-item>
									<el-form-item label="Add Team list">
										<div class="add_team_block">
											<div class="add_team_text">This team added only available for this predict and win,it will not store into our team list database.</div>
											<div class="add_team_table">
												<div class="table_block">
													<div class="table_header">
														<div class="header_col">Logo</div>
														<div class="header_col_name">Team Name</div>
														<div class="header_col">Team Description</div>
														<div class="header_col_action">Action</div>
													</div>
													<div class="table_body">
														<div class="body_row" v-for="(atem,andex) in show_add_team" :key="andex">
															<div class="row_col">
																<img :src="HOST + atem.teamLogo"  class="team_logo"/>
															</div>
															<el-tooltip class="item" effect="dark" :content="atem.teamName" placement="bottom">
																<div class="row_col_name">{{atem.teamName}} </div>
															</el-tooltip>
															<el-tooltip class="item" effect="dark" :content="atem.teamDescription" placement="bottom">
																<div class="row_col">{{atem.teamDescription}}</div>
															</el-tooltip>
															<div class="row_col_1">
																<div class="text" @click="edit_addTeam(andex,atem)">Edit</div>
																<div class="line">|</div>
																<div class="text" @click="del_addTeam(andex,atem)"> Delete</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div class="team_add" @click="add_team_status = ! add_team_status">
												<img src="../../assets/images/add_fff.png" alt="">
											</div>
										</div>
									</el-form-item>
									<el-form-item>
										<div class="step_btn">
											<div class="last_step" v-if="edit_status == true" @click="saveUpdate">Save</div>
											<div class="last_step" v-if="edit_status == false" @click="next_step(3)">Save</div>
											<div class="nex_step" @click="next_step(1)">Back</div>
										</div>
									</el-form-item>
								</el-form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {
		predictCreate,
		predictCarousel,
		listTeam,predictListPage,predictTeams,predictUpdate
	} from '@/api/league'
	import {categoryList,gamdList} from '@/api/game';
	import LeftView from '@/components/center/left.vue';
	import Tinymce from '@/components/Tinymce';
	export default {
		name: "create_predict",
		components: {
			LeftView,
			Tinymce
		},
		data() {
			return {
				pickerOptions0: {
					// selectableRange:(()=>{
					// 　　let data=new Date();
					// 		let hour=data.getHours();
					// 		let minute=data.getMinutes();
					// 		let second=data.getSeconds();
					// 		return [`${hour}:${minute}:${second} - 23:59:59`]
					// })(),
					disabledDate(time) {
						// return time.getTime() < Date.now()-1 * 24 * 3600 * 1000
						var date=new Date();
						date.setFullYear(date.getFullYear()+2);
						date.setDate(date.getDate()-1);
							// return (time.getTime() < Date.now() - 8.64e7);
							return (time.getTime() < Date.now() - 8.64e7)||(time.getTime()>date.getTime());
					}
				},
				pickerOptions1: {
					disabledDate: (time) => {
						return time.getTime() < this.dataForm.startTime || time.getTime() < Date.now();

					}
				}, 
				add_status:false,
				active:1, //步骤条切换
				dataForm: {
					id:'',//竞猜ID，传就是修改，没传就是创建
					poster:'', //竞猜海报
					carousel:'', //置顶海报（轮播图），有值时需要置顶展示
					title:'', //竞猜标题
					gameId:'', //游戏ID
					startTime:'', //开始时间
					endTime:'', //结束时间
					prizeAmount:'', //保底奖金额度，若没有保底奖金则传0
					registrationFee:200, //参与竞猜的费用（每注）
					videoLink:'', //赛事视频链接
					termsAndCondition:'', //竞猜规则（富文本）
					commissionRate:'', //平台抽成百分比（0-1的数）
					predictTeamCount:'', //参与竞猜时需要选择的队伍数量
					teamIds:[], //竞猜可选战队列表
					predictTeams:[],//竞猜队伍
				},
				percentage:10,//输入的rate百分比
				carousel_check:false, // ture 上传置顶海报  false  不上传
				prizeAmount_check:false, // ture 设置保底奖金额度  false  不设置
				labelPosition:'top',
				category_list:[], //游戏类型列表
				teamQuery:{//选择队伍
					gameId:'',
					teamName:'',
					size:0
				},
				team_popup:[], //弹窗的战队列表
				team_list:[], //选择战队的数据
				show_team_list:[],//页面显示选择的队伍
				teamidy:[],
				default_avatar:require("@/assets/images/default.png"), //默认头像
				predictId:'',
				predictInfo:{},
				edit_status:false,//是否是编辑
				listQuery: {
					order: 'NEW_TO_OLD',   // NEW_TO_OLD表示从新到旧，OLD_TO_NEW表示从旧到新
					keyword: '', // 搜索关键字
					top: '',   // 是否置顶，true表示置顶，false表示不置顶
					page: 1,
					size:0
				},
				add_team_status:false,//新增参与该竞猜的队伍
				team_form:{	//新增的竞猜队伍
					teamLogo:'',
					teamName:'',
					teamDescription:''
				},
				show_add_team:[],//显示新增的竞猜队伍，临时队伍
				andex_num:'',//临时缓存要编辑的竞猜队伍下标
				atem_btn:false,//判断要新增还是编辑，false为新增，true为编辑
				predict_team_lin:[],//临时的该竞猜的战队（修改状态时）
			};
		},
		computed:{
			pickerOptions0(){
				//选择的日期
				let curDate = this.$moment(this.dataForm.startTime).format("YYYY-MM-DD");
				//最小日期
				let minDate = this.$moment(this.dataForm.startTime).format("YYYY-MM-DD");
				//前推一天，防止当天日期无法选择
				let preTime = this.minTime-24*3600000;
				// 如果选择的日期为最小日期，则设置为最小日期的时分秒
				let str = "";
				if(curDate == minDate){
				str = this.$moment(this.minTime).format("HH:mm:ss");
				}else{
				str = "00:00:00"
				}
				return {
				disabledDate: (time) => {
					return time.getTime() < preTime || time.getTime() > this.maxTime;
				},
				selectableRange: str + " - 23:59:59"
				}
			},
		},
		mounted() {
			this.gameList();
			this.getTeam(); 
			if (this.$route.query.predictId != null && this.$route.query.predictId != '' && this.$route.query.predictId != undefined) {
				// this.handleInfo(this.$route.query.id);
				this.predictId = this.$route.query.predictId
				console.log("修改页面")
				console.log(this.predictId)
				this.getTeam();
				this.getList()
				setTimeout(() => {
					this.getTeams()
				},1000)
				this.edit_status = true
			}else{
				this.edit_status = false
			}
		},
		methods: {
			//修改新增的竞猜队伍
			edit_addTeam(andex,atem){
				this.atem_btn = true
				let { teamLogo,teamName,teamDescription} = atem
				this.add_team_status = true
				this.team_form = {
					teamLogo,
					teamName,
					teamDescription
				}
				this.andex_num = andex
			},
			//删除新增的竞猜队伍
			del_addTeam(andex,atem){
				let arr = []
				arr = this.show_add_team
				
				arr.splice(andex,1)
				this.show_add_team = arr				
			},
			//新增竞猜队伍
			addTeam_list(index,andex_num){
				let arrTeamList = []
				let arrEditTeam = []
				if(index == 1){
					this.atem_btn = false
					if((this.team_form.teamLogo == '' || this.team_form.teamLogo == null || this.team_form.teamLogo == undefined) || this.team_form.teamName == '' || this.team_form.teamDescription =='' ){
						this.$message({
							type:'warning',
							message:'请完善好队伍信息！'
						})
					}else{
						let obj = {
							teamLogo: this.team_form.teamLogo,
							teamName: this.team_form.teamName,
							teamDescription: this.team_form.teamDescription
						}
						this.show_add_team.push(obj)
						this.add_team_status = false
						setTimeout(() => {
							this.team_form = {
								teamLogo:'',
								teamName:'',
								teamDescription:''
							}
						},1000)
						console.log(this.show_add_team,"show_add_team")
					}
				}else{
					this.atem_btn = true
					// arrEditTeam = this.show_add_team
					for(let t=0;t < this.show_add_team.length;t++){
						if(t == andex_num){
							this.show_add_team[t] = {
								teamLogo:this.team_form.teamLogo,
								teamName:this.team_form.teamName,
								teamDescription:this.team_form.teamDescription
							}
						}
					}
					this.add_team_status = false
					setTimeout(() => {
						this.team_form = {
							teamLogo:'',
							teamName:'',
							teamDescription:''
						}
					},1000)
					// console.log(andex_num,"andex_num")
				}
				// arrTeamList.push(obj)
			},
			//取消新增竞猜队伍
			cancelAddTeam(){
				this.add_team_status = false
				this.team_form = {
					teamLogo:'',
					teamName:'',
					teamDescription:''
				}
			},
			//开始时间改变时的处理
			handleTime(){
				var startAt = new Date(this.dataForm.startTime) * 1000 / 1000
				var endAt = new Date(this.dataForm.endTime) * 1000 / 1000
				//当开始时间比现在的时间早时
				if(startAt < Date.now()){
					// 开始时间=现在的时间
					this.dataForm.startTime = new Date()
					//当结束时间不为空时
					if(this.dataForm.endTime != '' && this.dataForm.endTime != null && this.dataForm.endTime != undefined){
						//当结束时间比开始时间早时
						if(this.dataForm.endTime < this.dataForm.startTime){
							// 开始时间比现在的时间早时,将结束时间内设置为现在的时间
							if(startAt < Date.now()){
								setTimeout(() => {
									this.dataForm.endTime = new Date()
								},1000)
							}else{
								// 开始时间大于现在的时间时,结束时间 = 开始时间
								this.dataForm.endTime = this.dataForm.startTime
							}
						}
					}
				}else{
					//开始时间大于现在的时间
					//结束时间小于开始时间
					if(endAt < startAt){
						// 开始时间比现在的时间早时,1秒之后将结束时间内设置为现在的时间
						if(startAt < Date.now()){
							setTimeout(() => {
								this.dataForm.endTime = new Date()
							},1000)
						}else{
							this.dataForm.endTime = this.dataForm.startTime
						}
					}
				}
			},
			//结束时间改变时的处理
			handleEndTime(){
				var startAt = new Date(this.dataForm.startTime) * 1000 / 1000
				var endAt = new Date(this.dataForm.endTime) * 1000 / 1000
				if(this.dataForm.startTime != '' && this.dataForm.startTime != null && this.dataForm.startTime != undefined){
					//开始时间不为空时，结束时间的额处理
					if(endAt < startAt){
					// 开始时间比现在的时间早时,将结束设置为现在的时间
						if(startAt < Date.now()){
							setTimeout(() => {
								this.dataForm.endTime = new Date()
							},1000)
						}else{
							this.dataForm.endTime = this.dataForm.startTime
						}
					}
				}else{
					//开始时间为空时，结束时间=现在的时间
					// this.dataForm.endTime = new Date()
					//当开始时间比现在的时间早时
					if(endAt < Date.now()){
						// 结束时间=现在的时间
						this.dataForm.endTime = new Date()
						
					}

				}
			},
			// 列表-竞猜的information
			getList() {
				// let that = this;
				predictListPage(this.listQuery).then(res => {
					for(let p = 0; p < res.data.list.length;p++){
						if(res.data.list[p].id == this.predictId){
							this.predictInfo = res.data.list[p]
							// console.log(this.predictInfo)
							this.dataForm.poster = res.data.list[p].poster
							this.dataForm.carousel = res.data.list[p].carousel
							this.dataForm.title = res.data.list[p].title
							this.dataForm.gameId = res.data.list[p].game.id
							this.dataForm.startTime = res.data.list[p].startTime
							this.dataForm.endTime = res.data.list[p].endTime
							this.dataForm.prizeAmount = res.data.list[p].prizeAmount
							this.dataForm.registrationFee = res.data.list[p].registrationFee
							this.dataForm.videoLink = res.data.list[p].videoLink
							this.dataForm.termsAndCondition = res.data.list[p].termsAndCondition
							// this.dataForm.commissionRate = res.data.list[p].commissionRate
							this.dataForm.predictTeamCount = res.data.list[p].predictTeamCount
							// console.log(this.dataForm.title)
							// console.log(res.data.list[p].title)
							this.percentage = res.data.list[p].commissionRate * 100
							// this.dataForm.videoLink = this.predictInfo.videoLink
							if(res.data.list[p].prizeAmount !=0 && res.data.list[p].prizeAmount >0){
								this.prizeAmount_check = true
							}else{
								this.prizeAmount_check = false
							}
						}
					}
				})
			},
			//战队列表
			getTeam() {
				listTeam(this.teamQuery).then(res => {
					const {
						list,total
					} = res.data
					for (let i in list) {
						list[i]['choose_status'] = false
					}
					this.team_popup = list;
					// console.log(this.team_popup,"team_popup1")
				})
			},
			// 获取竞猜战队列表
			getTeams() {
				// let that = this;
				let predictam = []
				let arr = []
				let params = {
					predictId:this.predictId,
					size:0
				}
				predictTeams(params).then(res => {
					predictam = res.data
					for (let i = 0; i < predictam.length; i++) {
						arr.push(predictam[i])
						// predictam[i].team.choose_status = false
					}
					this.show_team_list = arr
					this.predict_team_lin = arr
					this.dataForm.predictTeams = arr
					this.team_list = this.show_team_list
					console.log(this.predict_team_lin,"竞猜战队")
					for(let s = 0; s < this.show_team_list.length;s++){
						for(let p = 0; p < this.team_popup.length;p++){
							// if(that.show_team_list[s].teamId == that.team_popup[p].teamId){
							// 	that.team_popup[p].choose_status = true
							// }
							if(this.show_team_list[s].teamName == this.team_popup[p].teamName && this.show_team_list[s].teamLogo == this.team_popup[p].teamLogo && this.show_team_list[s].teamDescription == this.team_popup[p].aboutTeam){
								this.team_popup[p].choose_status = true
								
							}
						}
					}
				})
			},
			jump_predict(){
				this.$router.push({ path: '/league/predict_and_win'})
			},
			// 选择、取消战队
			check_choose(teamId){
				let that  = this;
				for (let i = 0; i < that.team_popup.length;i++) {
					if(that.team_popup[i].teamId == teamId){
						if(that.team_popup[i].choose_status == false){
							that.team_popup[i].choose_status = true
							that.show_team_list = []
							// console.log(that.team_list)
							// console.log("黄金白银分割线")
						}else{
							that.team_popup[i].choose_status = false
							that.show_team_list = []
							// console.log(that.team_list)
							// console.log("是分割线")
						}
					}
				}
				// console.log(that.team_list)
			},
			// 选择 战队
			save_choose(){
				// let that = this;
				let arr = []
				let arr1 = []
				let arr2 = [] //修改竞猜队伍，临时添加的竞猜队伍
				let arr3 = []
				let obj = {}
				//弹窗内被选中的战队
				for (let i in this.team_popup) {
					if (this.team_popup[i].choose_status == true) {
						arr.push(this.team_popup[i])
						obj = {
							teamName: this.team_popup[i].teamName,
							teamLogo: this.team_popup[i].teamLogo,
							teamDescription: this.team_popup[i].aboutTeam
						}
						arr1.push(obj)
					}
				}
				console.log(arr,'arr')
				console.log(arr1, 'arr1')
				//竞猜队伍里面临时添加的队伍（该竞猜特有的队伍）
				for (let p = 0; p < this.predict_team_lin.length; p++) {
					// if(arr1.indexOf(this.predict_team_lin[p]) === -1){
					// 	console.log(arr1.indexOf(this.predict_team_lin[p]))
					// 	arr2.push(this.predict_team_lin[p])
					// 	console.log(arr2,"index")
					// }
					// arr1.includes(this.predict_team_lin[p])
					// if(arr1.includes(this.predict_team_lin[p])){
					// 	console.log(arr1,"arr1-arr2")
					// }else{
					// 	arr3 = this.predict_team_lin[p]
					// }
					console.log(arr3,"arr3")
					for (let a in arr1) {
						if (this.predict_team_lin[p].teamLogo == arr1[a].teamLogo && this.predict_team_lin[p].teamName ==
							arr1[a].teamName && this.predict_team_lin[p].teamDescription == arr1[a].teamDescription) {
							arr.splice(arr.indexOf(arr1[a]),1)
							console.log(arr.indexOf(arr1[a]))
						}else{
							arr2.push(this.predict_team_lin[p])
						}
					}
				}
				// arr1 = arr
				// console.log(arr1,"arr1-1")
				// console.log(arr2,"arr2")
				const res = new Map();
				// arr2 = arr2.filter((arr2) => !res.has(arr2.id) && res.set(arr2.id, 1))
				arr2 = arr2.filter((arr2) => !res.has(arr2.teamName) && res.set(arr2.teamName, 1))
				// console.log(arr2,"arr2-1")
				// arr2去重
				arr1 = arr1.concat(arr2)
				// console.log(arr1,"arr1-2")
				const res1 = new Map();
				arr1 = arr1.filter((arr1) => !res1.has(arr1.teamName) && res1.set(arr1.teamName, 1))
				// console.log(arr1,"arr1-3")
				this.show_team_list = arr1 //显示在页面的队伍数组
				this.dataForm.predictTeams = this.show_team_list //要传的精彩队伍
				this.team_list = arr
				this.add_status = false

			},
			// 删除选中的战队 
			del_team(index,item){
				let that = this;
				let {
					teamName,
					teamLogo,
					teamDescription
				} = item
				let teamArr = []
				// arr1.includes(this.predict_team_lin[p])
				that.show_team_list.splice(index, 1)
				for (let i = 0; i < that.team_popup.length; i++) {
					if (that.team_popup[i].teamName == teamName && that.team_popup[i].teamLogo == teamLogo && that
						.team_popup[i].aboutTeam == teamDescription) {
						that.team_popup[i].choose_status = false
						// that.show_team_list.splice(index, 1)
					}
				}
				// that.show_team_list.splice(index, 1)
				that.team_list = that.show_team_list
				console.log(that.team_list,"team_list")
				for (let t in that.team_list) {
					let obj1 = {
						teamName: that.team_list[t].teamName,
						teamLogo: that.team_list[t].teamLogo,
						// teamDescription: that.team_list[t].aboutTeam,
						teamDescription: that.team_list[t].teamDescription
					}
					teamArr.push(obj1)
					console.log(teamArr,"删除战队")
				}
				that.dataForm.predictTeams = teamArr

			},
			// 上传成功
			handleAvatarSuccess(res, attr, index) {
				let that = this;
				that.$loading({
					customClass: "animated fadeOut"
				}).close();
				if(res.code == 200){
					this.$message({
						type: 'success',
						message: res.message
					});
					if (attr === 'Poster') {
						that.dataForm.poster = res.data
					}else if(attr === 'carousel'){
						that.dataForm.carousel = res.data
					}else if(attr === 'teamLogo'){
						that.team_form.teamLogo = res.data
					}
				}else{
					this.$message({
						type: 'error',
						message: res.message
					});
				}
				
			},
			// 上传中
			beforeAvatarUpload(file) {
				const isJPG = file.type;
				const isLt2M = file.size / 1024 / 1024 < 3;
				this.$loading({
					background: "rgba(255, 255, 255, 0.7)",
					customClass: "animated fadeIn",
					text: "上传中"
				});
			
				return isJPG && isLt2M;
			},
			// 游戏列表
			gameList() {
				gamdList({size:0}).then(res => {
					this.category_list = res.data.list
				})
			},
			//输入的百分比转成小数
			decimalChange(){
				console.log(this.percentage)
				this.dataForm.commissionRate = this.percentage / 100
			},
			//修改竞猜
			saveUpdate(){
				let that = this
				that.dataForm.id = that.predictId
				that.dataForm.commissionRate = that.percentage / 100
				if(that.show_team_list.length == 0){
					that.dataForm.predictTeams = that.show_add_team
				}else if(that.show_add_team.length == 0){
					that.dataForm.predictTeams = that.show_team_list
				}else{
					that.dataForm.predictTeams = that.dataForm.predictTeams.concat(that.show_add_team)
				}
				// that.dataForm.predictTeams = that.dataForm.predictTeams.concat(that.show_add_team)
				// console.log(that.show_add_team ,"show_add_team ，更新")
				// console.log(that.dataForm.predictTeams ,"dataForm.predictTeams ，更新")
				// console.log(that.dataForm.predictTeams.length,"竞猜队伍长度，更新")
				// console.log(that.dataForm.predictTeamCount,"输入的长度，更新")
				if(that.dataForm.poster == ''){
					that.$message({
					  message: '请上传竞猜海报！',
					  type: 'warning'
					})
				}else if(that.dataForm.title == ''){
					that.$message({
					  message: '竞猜标题不能为空！',
					  type: 'warning'
					})
				}else if(that.dataForm.gameId == '' || that.dataForm.gameId == null){
					that.$message({
					  message: '请选择游戏类型！',
					  type: 'warning'
					})
				}else if(that.dataForm.startTime == '' || that.dataForm.startTime == null){
					that.$message({
					  message: '请选择竞猜开始时间！',
					  type: 'warning'
					})
				}else if(that.dataForm.endTime == '' || that.dataForm.endTime == null){
					that.$message({
					  message: '请选择竞猜结束时间！',
					  type: 'warning'
					})
				}else if(that.dataForm.termsAndCondition == '' || that.dataForm.termsAndCondition == null){
					that.$message({
					  message: '竞猜规则不能为空！',
					  type: 'warning'
					})
				}else if(that.dataForm.registrationFee < 200){
					that.$message({
					  message: '参与竞猜的费用不得低于200！',
					  type: 'warning'
					})
				}else if(that.percentage < 10 || that.percentage > 60){
					that.$message({
					  message: 'Rate只能在10与60之间！',
					  type: 'warning'
					})
				}else if(that.show_team_list.length < 1 && that.show_add_team.length < 1){
					that.$message({
					  message: '请选择战队或者请添加临时队伍',
					  type: 'warning'
					})
					// return false
				}else if(that.dataForm.predictTeamCount >= that.dataForm.predictTeams.length){
					that.$message({
					  message: '可选择的战队数不得少于要预测的战队数',
					  type: 'warning'
					})
					// return false
				}else if(!(/^[1-9]\d*$/.test(this.dataForm.predictTeamCount))) {
					this.$message({
						type: 'warning',
						message: '您输入的不是数字，请输入数字！'
					});
					// return false
				}else{
					for (let i = 0; i < that.team_list.length; i++) {
						that.teamidy.push(that.team_list[i].teamId)
					}
					// that.dataForm.teamIds = that.teamidy;
					// that.dataForm.predictTeams = that.dataForm.predictTeams.concat(that.show_add_team)
					console.log(that.dataForm,"更新")
					predictUpdate(that.dataForm).then(res => {
						that.$message({
							type: 'success',
							message: "更新成功！"
						});
						that.$router.go(-1)
					})
				}
				
			},
			// index 3 保存  0取消
			next_step(index){
				let that = this;
				that.dataForm.commissionRate = that.percentage / 100
				if(that.show_team_list.length == 0){
					that.dataForm.predictTeams = that.show_add_team
				}else if(that.show_add_team.length == 0){
					that.dataForm.predictTeams = that.show_add_team
				}else{
					that.dataForm.predictTeams = that.dataForm.predictTeams.concat(that.show_add_team)
				}
				console.log(that.dataForm.predictTeams,'that.dataForm.predictTeams')
				console.log(that.dataForm.predictTeams.length,"竞猜长度")
				if(index == 2){
					if(that.dataForm.poster == ''){
						that.$message({
						  message: '请上传竞猜海报！',
						  type: 'warning'
						})
						return 
					}
					if(that.dataForm.title == ''){
						that.$message({
						  message: '竞猜标题不能为空！',
						  type: 'warning'
						})
						return 
					}
					if(that.dataForm.gameId == '' || that.dataForm.gameId == null){
						that.$message({
						  message: '请选择游戏类型！',
						  type: 'warning'
						})
						return 
					}
					if(that.dataForm.startTime == '' || that.dataForm.startTime == null){
						that.$message({
						  message: '请选择竞猜开始时间！',
						  type: 'warning'
						})
						return 
					}
					if(that.dataForm.endTime == '' || that.dataForm.endTime == null){
						that.$message({
						  message: '请选择竞猜结束时间！',
						  type: 'warning'
						})
						return 
					}
					if(that.dataForm.termsAndCondition == '' || that.dataForm.termsAndCondition == null){
						that.$message({
						  message: '竞猜规则不能为空！',
						  type: 'warning'
						})
						return 
					}
					if(that.dataForm.registrationFee < 200){
						that.$message({
						  message: '参与竞猜的费用不得低于200！',
						  type: 'warning'
						})
						return 
					}
					if(that.percentage < 10 || that.percentage > 60){
						that.$message({
						  message: 'Rate只能在10与60之间！',
						  type: 'warning'
						})
						return false
					}
					if(that.carousel_check == true && carousel == '' ){
						that.$message({
						  message: '请上传置顶海报 ！！！',
						  type: 'warning'
						})
						return false
					}
					if(that.prizeAmount_check == true && that.dataForm.prizeAmount === ''){
						that.$message({
						  message: '请设置保底奖金额度 ！！！',
						  type: 'warning'
						})
						return false
					}else if(that.prizeAmount_check == false){
						that.dataForm.prizeAmount = 0
						// return false
					}
				}else if(index == 3){
					let { poster,carousel,title,gameId,startTime,endTime, prizeAmount, registrationFee,videoLink, termsAndCondition, commissionRate,predictTeamCount,teamIds} = that.dataForm;
					// if(poster == '' && title == '' && gameId == '' && startTime == '' && endTime == '' && registrationFee == ''  && termsAndCondition == '' && commissionRate == '' && predictTeamCount == '' ){
					// 	that.$message({
					// 	  message: '请填写完整信息！！！',
					// 	  type: 'warning'
					// 	})
					// 	// return false
					// }else if(that.carousel_check == true && carousel == '' ){
					// 	that.$message({
					// 	  message: '请上传置顶海报 ！！！',
					// 	  type: 'warning'
					// 	})
					// 	// return false
					// }else if(that.prizeAmount_check == true && prizeAmount === ''){
					// 	that.$message({
					// 	  message: '请设置保底奖金额度 ！！！',
					// 	  type: 'warning'
					// 	})
					// 	// return false
					// }
					// if(that.prizeAmount_check == false){
					// 	that.dataForm.prizeAmount = 0
					// 	return false
					// }
					if(that.dataForm.predictTeamCount == '' || that.dataForm.predictTeamCount == null){
						that.$message({
						  message: '竞猜数量不能为空',
						  type: 'warning'
						})
					}else if(that.show_team_list.length < 1 && that.show_add_team.length < 1){
						that.$message({
						  message: '请选择战队或者请添加临时队伍',
						  type: 'warning'
						})
						// return false
					}else if(that.dataForm.predictTeamCount >= that.dataForm.predictTeams.length){
						that.$message({
						  message: '可选择的战队数不得少于要预测的战队数',
						  type: 'warning'
						})
						// return false
					}else if(!(/^[1-9]\d*$/.test(that.dataForm.predictTeamCount))) {
						that.$message({
							type: 'warning',
							message: '您输入的不是数字，请输入数字！'
						});
						// return false
					}else{
						for (let i = 0; i < that.team_list.length; i++) {
							that.teamidy.push(that.team_list[i].teamId)
						}
						// that.dataForm.teamIds = that.teamidy;
						
						predictCreate(that.dataForm).then(res => {
							that.$message({
								type: 'success',
								message: res.message
							});
							that.$router.go(-1)
						})
					}
					
					
				}
				if(index != 3){
					that.active = index
				}
			},
			go_back(){
				this.$router.go(-1);
			},
			//失去焦点是检验How many teams to predict?输入框输入的是否是数字
			checkNum(){
				if(!(/^[1-9]\d*$/.test(this.dataForm.predictTeamCount))) {
					this.$message({
						type: 'warning',
						message: '您输入的不是数字，请输入数字！'
					});
				}
			},
			handleDelImg(attr) {
				this.dataForm[attr] = ''
			},
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
	}
	/deep/ .el-select-dropdown__item.hover{
		background-color: #545873;
	}
	/deep/ .el-select-dropdown__item.selected{
		background-color: #545873;
	}
</style>
<style lang="less" scoped>
	//选择队伍
	.view_detail{
		position: relative;
		left: 160px;
		top: 0px;
		.mark_cancel{
			width: 50px;
			height: 50px;
			position: absolute;
			right: 240px;
			top: 0px;
			z-index: 999;
			img{
				width: 46px;
				height: 46px;
				cursor: pointer;
			}
		}
		.mark_bac{
			width: 100%;
			height: 100vh;
			background:#000000b3;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 88;
		}
		.mark_content{
			width: 1260px;
			background: #33384B;
			border-radius: 25px;
			position: absolute;
			z-index: 999;
			.content_top{
				display: flex;
				padding-top: 63px;
				align-items: center;
				justify-content: space-between;
				padding-bottom: 10px;
				.top_left{
					margin-left: 60px;
					.title{
						color: #DBA83F;
						font-size: 22px;
					}
				}
				.delete{
					display: flex;
					margin-right:60px;
					.sort_by{
						margin-right: 26px;
						.sort_by_text{
							font-size: 18px;
							text-align: left;
							letter-spacing: 0px;
							color: #727272;
							opacity: 1;
							margin-bottom: 11px;
						}
						.options_select{
							/deep/ .el-select .el-input .el-input__inner {
								border: 0px;
								width: 230px;
								height: 59px;
								padding: 0 20px;
								font-size: 18px;
								color: #fff;
								border-radius: 20px;
								background-color: #2a2e3f;
								// border: 1px solid #fff;
							}
							/deep/ .el-select-dropdown {
								background-color: #2a2e3f;
								border: 1px solid rgba(255,255,255,0.2);
							}
							/deep/ .el-icon-arrow-up:before { content: ""; }
							/deep/ .el-icon-arrow-down:before { content: ""; }
							//修改单个的选项的样式
							/deep/ .el-select-dropdown__item {
								background-color: transparent;
								color: #fff;
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
					.search_block{
						display: flex;
						flex-direction: column;
						justify-content: flex-end;
						.search{
							background: #2a2e3f;
							border-radius: 23px;
							input{
								width: 215px;
								height: 60px;
								background: #2a2e3f;
								border-radius: 23px;
								font-size: 18px;
								border: none;
								padding-left: 35px;
								color: #fff;
								
							}
							.btn{
								width: 60px;
								height: 60px;
								background: #D3AA53;
								border: none;
								border-radius: 22px;
								opacity: 1;
								cursor: pointer;
								img{
									width: 22px;
									height: 22px;
								}
							}
						}
					}
					
				}
			}
			.content_block{
				padding-left: 86px;
				margin-top: 40px;
				#text_area{
					width: 1036px;
					height: 450px;
					border: 1px solid black;
					overflow-y:scroll;
					color: #7C7C7C;
					font-size: 18px;
					border: none;
					padding-right: 20px;
					.team_list{
						display: flex;
						align-items: center;
						justify-content: space-between;
						border-bottom: 1px solid #727272;
						padding: 20px 20px 20px 0;
						.list_left{
							display: flex;
							align-items: center;
							width: 80%;
							// background-color: #FF5500;
							.team_logo{
								width: 88px;
								height: 88px;
								// border-radius: 44px;
								border-radius: 50%;
								
							}
							.team_info{
								margin-left: 20px;
								width: 100%;
								// background-color: #FFF000;
								.team_name{
									width: 70%;
									color: #FFFFFF;
									font-size: 24px;
									overflow: hidden;
									text-overflow: ellipsis;
									white-space: nowrap;
								}
								.game_type{
									color: #727272;
									font-size: 18px;
									margin-top: 5px;
								}
							}
						}
						.list_right{
							img{
								width: 30px;
							}
						}
					}
					
				}
				#text_area::-webkit-scrollbar {
					/*滚动条整体样式*/
					width : 15px;  /*高宽分别对应横竖滚动条的尺寸*/
					height: 1px;
					background-color: #33384B;
				}
				#text_area::-webkit-scrollbar-thumb {
					/*滚动条里面小方块*/
					border-radius   : 10px;
					background-color: #595959;
				}
				#text_area::-webkit-scrollbar-track {
					/*滚动条里面轨道*/
					background   : #7C7C7C;
					border-radius: 10px;
				}
			}
			.btn_area{
				padding: 50px 0;
				display: flex;
				align-items: center;
				justify-content: center;
				.save_btn{
					width: 163px;
					height: 58px;
					background: #DBA83F;
					border-radius: 25px;
					color: #0E0F11;
					font-size: 20px;
					text-align: center;
					line-height: 58px;
					margin-right: 20px;
					cursor: pointer;
				}
				.cancel_btn{
					width: 163px;
					height: 58px;
					border: 1px solid #777777;
					border-radius: 25px;
					color: #ffffff;
					font-size: 20px;
					text-align: center;
					line-height: 58px;
					cursor: pointer;
				}
			}
		}
	}
	//选择队伍end
	//新增竞猜队伍
	.create_team_play{
		// Check out 01弹窗 start
		position: relative;
		left: 160px;
		top: 0px;
		.mark_check{
			width: 50px;
			height: 50px;
			// position: absolute;
			position: fixed;
			// right: 240px;
			// top: 0px;
			right: 100px;
			top: 100px;
			z-index: 999;
			img{
				width: 46px;
				height: 46px;
				cursor: pointer;
			}
		}
		.mark_bac{
			width: 100%;
			height: 100vh;
			background:#000000b3;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 88;
			
		}
		.mark_check_container{
			// position: absolute;
			position: fixed;
			// left: 80px;
			// top: 100px;
			z-index: 999;
			// width: 753px;
			width: 1200px;
			padding: 48px 20px 20px 28px;
			// background: #0E0F11;
			background: #33384B;
			border-radius: 27px;
			overflow: hidden;
			display: flex;
			flex-flow: column;
			align-items: center;
			.mark_my_content{
				width: 100%;
				// margin-bottom: 55px;
				margin: 0 50px 30px;
				.mark_text_one{
					text-align: center;
					font-family:'Quicksand-Bold';
					color: #DBA83F;
					font-size: 22px;
				}
				.mark_product_container{
					width: 100%;
					// height: 496px;
					// overflow-y: scroll;
					margin-bottom: 20px;
					.mark_product{
						margin-top: 30px;
						width: 98%;
						// border: 1px solid #313538;
						.create_right_form {
							width: 1140px;
							margin-left: 60px;
							margin-top: 33px;
							.form_teamname {
								color: #727272;
								font-size: 20px;
								// margin: 10px 0 10px 0;
								text-align: left;
								margin-bottom: 20px;
							}
							.create_form_logo {
								display: flex;
								align-items: center;
								margin-bottom: 31px;
						
								.logo_upadte {
									width: 146px;
									height: 146px;
									// border-radius: 50%;
									background-color: #2a2e3f;
									display: flex;
									align-items: center;
									justify-content: center;
									margin-right: 18px;
									font-family:'Roboto-Regular';
									
									.avatar_w{
										width: 31px;
										height: auto;
									}
									.avatar_y{
										width: 146px;
										height: 146px;
										object-fit: cover;
										// border-radius: 50%;
									}
								}
						
								.logo_info {
									color: #727272;
									font-size: 20px;
									font-family:'Roboto-Regular';
								}
							}
							.form_team {
								width: 90%;
								margin-bottom: 39px;
								font-family:'Roboto-Regular';
								.form_teamname {
									color: #727272;
									font-size: 20px;
									margin: 10px 0 10px 0;
									text-align: left;
								}
						
								.form_input_block {
									width: 98%;
									height: 59px;
									display: flex;
									padding: 0 30px;
									background-color: #2a2e3f;
									align-items: center;
									border-radius: 19px;
									color: #fff;
									.input-left {
										width: 90%;
										height: 56px;
										color: #fff;
										border: none;
										background-color: #2a2e3f;
										// background-color: #dd0;
										// background: inherit;
										font-size: 20px;
										font-family:'Roboto-Regular';
									}
								}
						
								.team_input_block {
									width: 98%;
									height: 59px;
									display: flex;
									padding: 0 30px;
									background-color: #33384B;
									align-items: center;
									border-radius: 19px;
									position: relative;
									color: #fff;
									font-family:'Roboto-Regular';
									.input-left {
										width: 90%;
										height: 56px;
										color: #fff;
										border: none;
										background-color: #33384B;
										background: inherit;
										font-size: 20px;
										font-family:'Roboto-Regular';
									}
						
									.limit_num {
										position: absolute;
										right: 30px;
										color: #606060;
										font-size: 20px;
										font-family:'Roboto-Regular';
									}
								}
						
								.area_input_block {
									width: 98%;
									display: flex;
									padding: 20px 30px;
									background-color: #2a2e3f;
									align-items: center;
									border-radius: 19px;
									position: relative;
									color: #fff;
									font-family:'Roboto-Regular';
									.input-left {
										width: 98%;
										color: #fff;
										// height: 207px;
										// height: 185px;
										height: 100px;
										border: none;
										background-color: #2a2e3f;
										background: inherit;
										font-size: 20px;
										resize: none;
										font-family:'Roboto-Regular';
									}
						
									.limit_num {
										position: absolute;
										right: 30px;
										bottom: 20px;
										color: #606060;
										font-size: 20px;
										font-family:'Roboto-Regular';
									}
								}
						
							}
						
							.creat_team_btom {
								margin-top: 179px;
								margin: 90px 0 97px 0;
								display: flex;
								align-items: center;
						
								.invite_button {
									width: 163px;
									height: 58px;
									color: #0E0F11;
									font-size: 20px;
									cursor: pointer;
									line-height: 58px;
									text-align: center;
									margin-right: 20px;
									background: #D3AA53;
									border-radius: 25px;
									font-family:'Roboto-Regular';
								}
						
								.skip_button {
									width: 163px;
									height: 56px;
									color: #FFFFFF;
									font-size: 20px;
									cursor: pointer;
									line-height: 58px;
									text-align: center;
									border-radius: 25px;
									border: 1px solid #777777;
									font-family:'Roboto-Regular';
								}
							}
						}
								
						
					}
				}
				
			}
			.mark_my_foot{
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				.confirm_btn{
					cursor: pointer;
					background-color: #D3AA53;
					color: #000;
					border-radius: 25px;
					width: 100px;
					height: 40px;
					text-align: center;
					line-height: 40px;
					font-size: 16px;
					margin-right: 30px;
					font-family:'Roboto-Regular';
				}
				.cancel_btn{
					cursor: pointer;
					// background-color: #D3AA53;
					border: 1px solid #666666;
					border-radius: 25px;
					width: 100px;
					height: 40px;
					text-align: center;
					line-height: 40px;
					font-size: 16px;
					color: #fff;
					font-family:'Roboto-Regular';
				}
			}
		}
	}
	//新增竞猜队伍  end
	.container {
		width: 93%;
		margin: 0 84px 0 45px;
		padding: 0 0 40px 0;
		color: #fff;
		/deep/.el-input__inner {
			background-color: #33384b;
			color: #fff
		}
		/deep/.el-form-item__label {
			color: #919191;
			position: relative;
			span{
				position: absolute;
				right: 0;
			}
		}
		/deep/.el-form-item {
			margin-bottom: 20px;
			
		}
		
		.predict_container {
			.predict_content {
				.predict_head {
					display: flex;
					align-items: center;
					margin-bottom: 26px;
					font-family:'Quicksand-Regular';
					.predict_back {
						color: #FFFFFF;
						font-size: 21px;
						margin-right: 246px;
						cursor: pointer;
						span {
							margin-right: 26px;
						}
					}
					// 步骤条
					.predict_step_center {
						display: flex;
						justify-content: center;
						.step_block {
							display: flex;
							align-items: center;
							margin-right: 16px;
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
								font-family:'Roboto-Regular';
							}

							.step_name {
								font-size: 16px;
								// font-family: PingFangSC-Medium, PingFang SC;
								font-family:'Roboto-Regular';
								font-weight: 500;
								color: #FFFFFF;
								margin-right: 16px;
							}

							.step_border {
								width: 101px;
								height: 1px;
								background-color: #8D8D8D;
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
				}
				// 步骤内容
				.step_content {
					padding: 62px 0 62px 0 ;
					border-radius: 24px;
					background-color: #33384b;
					margin-left: 30px;
					// 步骤1
					.step_active1 {
						width: 960px;
						margin-left: 80px;
						font-family:'Roboto-Regular';
						/deep/.el-input .el-input__count .el-input__count-inner{
							background-color: #33384b;
						}
						.el-form-item__label {
							padding-right: 0px;
						}

						.active1_img {
							width: 334px;
							height: 180px;
							border-radius: 2px;
							border: 1px solid #FFFFFF;
						}
						
						.poster_flex{
							display: flex;
							align-items: center;
							.poster_img{
								// 466 x 224
								// width: 466px;
								// height: 224px;
								width: 321px;
								height: 154px;
								margin-right: 44px;
								display: flex;
								flex-flow: column;
								justify-content: center;
								text-align: center;
								.img_tip{
									color: #919191;
									font-size: 14px;
								}
								.img_size{
									color: #919191;
									font-size: 14px;
								}
							}
							
							.poster2_img{
								// 1500 x 326
								// width: 1500px;
								// height: 326px;
								width: 757px;
								height: 165px;
								margin-right: 44px;
								object-fit: fill;
								display: flex;
								flex-flow: column;
								justify-content: center;
								text-align: center;
								position: relative;
								// background-color: #FFF0B7;
								.img_tip{
									color: #919191;
									font-size: 14px;
								}
								.img_size{
									color: #919191;
									font-size: 14px;
								}
							}
							.del_img{
								position: absolute;
								right: 210px;
								top: 5px;
								// left: 0;
								width: 20px;
							}
							.recycle_Img{
								width: 28px;
							}
							
						}
						.time_flex {
							display: flex;
							align-items: center;
							justify-content: space-between;
						}
						.price_check{
							display: flex;
							align-items: center;
							.check_text{
								color: #919191;
								font-size: 16px;
								font-size: 600;
								margin-right: 22px;
								font-family:'Roboto-Regular';
							}
							.check_block{
								width: 31px;
								height: 31px;
								display: flex;
								align-items: center;
								justify-content: center;
								img{
									width: 31px;
									height: 31px;
								}
							}
						}
						.step_btn {
							display: flex;
							font-size: 20px;
							// font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							margin: 15px 0;
							.last_step {
								width: 163px;
								height: 58px;
								color: #0E0F11;
								background: #D3AA53;
								border-radius: 25px;
								border: 1px solid #D3AA53;
								cursor: pointer;
								display: flex;
								align-items: center;
								justify-content: center;
								margin-right: 20px;
								font-family:'Roboto-Regular';
							}
							.nex_step {
								width: 163px;
								height: 58px;
								color: #FFFFFF;
								background-color: #33384b;
								border: 1px solid #777777;
								border-radius: 25px;
								cursor: pointer;
								display: flex;
								align-items: center;
								justify-content: center;
								font-family:'Roboto-Regular';
							}
						}
					}
					// 步骤2 
					.step_active2 {
						margin-left: 80px;
						font-family:'Roboto-Regular';
						.rule_container {
							.team_container{
								.team_add{
									width: 35px;
									margin-bottom: 30px;
									img{
										width: 35px;
										cursor: pointer;
									}
								}
								.team_list{
									.team_block{
										width: 1368px;
										// height: 184px;
										background: #1C2023;
										border-radius: 4px;
										margin-bottom: 26px;
										display: flex;
										align-items: center;
										justify-content: space-between;
										padding: 30px 0;
										position: relative;
										.team_left{
											width: 50%;
											display: flex;
											align-items: center;
											// height: 184px;
											margin-left: 72px;
											.team_logo{
												width: 116px;
												height: 116px;
												margin-right: 55px;
												img{
													width: 116px;
													height: 116px;
													border-radius: 50%;
												}
											}
											.team_txt_block{
												.team_title{
													color: #FFFFFF;
													font-size: 30px;
													font-size: 600;
													font-family:'Roboto-Bold';
													margin-right: 10px;
												}
												.team_subtit{
													color:#727272;
													font-size: 18px;
													font-size: 600;
												}
											}
										}
										.team_right{
											width: 50%;
											// height: 184px;
											display: flex;
											justify-content: space-between;
											.team_info{
												display: flex;
												align-items: center;
												// width: 361px;
												color:#727272;
												font-size: 20px;
												line-height: 26px;
												font-family:'Roboto-Regular';
												margin-right: 100px;
												// background-color: #FFF000;
											}
											.team_del{
												width: 21px;
												// padding-right: 30px;
												// margin-top: 20px;
												position: absolute;
												top: 20px;
												right: 30px;
												img{
													width: 21px;
													cursor: pointer;
												}
											}
										}
									}
									.team_block:last-child{
										margin-bottom: 0;
									}
								}
							}
							.add_team_block{
								.add_team_text{
									color: #ACACAC;
									margin-top: -15px;
									margin-bottom: 25px;
								}
								.add_team_table{
									.table_block{
										width: 80%;
										border: 1px solid #727272;
										.table_header{
											width: 100%;
											display: flex;
											align-items: center;
											text-align: center;
											border-bottom: 1px solid #727272;
											height: 60px;
											line-height: 60px;
											.header_col{
												width: 25%;
												border-right: 1px solid #727272;
											}
											.header_col_name{
												width: 30%;
												border-right: 1px solid #727272;
											}
											.header_col_action{
												width: 20%;
											}
										}
										.table_body{
											// width: 80%;
											.body_row{
												width: 100%;
												border-bottom: 1px solid #727272;
												display: flex;
												align-items: center;
												text-align: center;
												height: 100px;
												// line-height: 88px;
												// height: 60px;
												// line-height: 60px;
												// padding: 10px 0;
												&:last-child{
													border: none;
												}
												.row_col{
													width: 25%;
													height: 100px;
													line-height: 100px;
													border-right: 1px solid #727272;
													display: flex;
													align-items: center;
													justify-content: center;
													// background-color: #ff0;
													.team_logo{
														width: 88px;
														height: 88px;
														border-radius: 50%;
													}
													overflow: hidden;
													text-overflow: ellipsis;
													white-space: nowrap;
												}
												.row_col_name{
													height: 100px;
													line-height: 100px;
													width: 30%;
													border-right: 1px solid #727272;
													overflow: hidden;
													text-overflow: ellipsis;
													white-space: nowrap;
												}
												.row_col_1{
													width: 20%;
													height: 100px;
													line-height: 100px;
													border-right: 1px solid #727272;
													color: #fff;
													display: flex;
													align-items: center;
													justify-content: center;
													.text{
														color:#0080FF;
														cursor: pointer;
													}
													.line{
														margin: 0 10px;
													}
													&:last-child{
														border: none;
													}
												}
											}
										}
									}
								}
								.team_add{
									width: 35px;
									margin-top: 30px;
									img{
										width: 35px;
										cursor: pointer;
									}
								}
							}
							.step_btn {
								display: flex;
								font-size: 20px;
								margin: 141px 0 15px 0;
								// font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								.last_step {
									width: 163px;
									height: 58px;
									color: #0E0F11;
									background: #D3AA53;
									border-radius: 25px;
									border: 1px solid #D3AA53;
									cursor: pointer;
									display: flex;
									align-items: center;
									justify-content: center;
									margin-right: 20px;
									font-family:'Roboto-Regular';
								}
								.nex_step {
									width: 163px;
									height: 58px;
									color: #FFFFFF;
									background-color: #33384b;
									border: 1px solid #777777;
									border-radius: 25px;
									cursor: pointer;
									display: flex;
									align-items: center;
									justify-content: center;
									font-family:'Roboto-Regular';
								}
							}

						}
					}
				}
			}
		}
	}
</style>
