<template>
	<div class="upload-container">
		<el-button :style="{background:color,borderColor:color}" icon="el-icon-upload" size="mini" type="primary" @click=" dialogVisible=true">
			上传图片
		</el-button>
		<el-dialog :visible.sync="dialogVisible" :append-to-body="true">
			<el-upload class="avatar-uploader" :action="HOST +'/img/upload'" list-type="picture-card"
			 :file-list="fileList" :on-exceed="handleExceed" :on-remove="handleRemove" :on-success="handleSuccess"
			 :before-upload="beforeUpload">
				<i class="el-icon-plus"></i>
			</el-upload>
			<br>
			<el-button @click="dialogVisible = false">
				取消
			</el-button>
			<el-button type="primary" @click="handleSubmit">
				确定
			</el-button>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'EditorSlideUpload',
		props: {
			color: {
				type: String,
				default: '#1890ff'
			}
		},
		data() {
			return {
				dialogVisible: false,
				listObj: {},
				fileList: [],
				BASE_URL: '',
				handleExceed:''
			}
		},
		created() {
			// this.BASE_URL = 'https://wanghuiwen.com/game/api/img/upload';
			// this.BASE_URL = 'http://13.212.212.253/game/api/img/upload';	//测试服
			this.BASE_URL = 'https://api.bountee.com.my/api/img/upload';	//正式服
		},
		methods: {
			checkAllSuccess() {
				return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
			},
			handleSubmit() {
				const arr = Object.keys(this.listObj).map(v => this.listObj[v])
				if (!this.checkAllSuccess()) {
					this.$message('请等待所有图像成功上载。如果有网络问题，请刷新页面并重新上传！')
					return
				}
				this.$emit('successCBK', arr)
				this.listObj = {}
				this.fileList = []
				this.dialogVisible = false
			},
			handleSuccess(response, file) {
				const uid = file.uid
				const objKeyArr = Object.keys(this.listObj)
				for (let i = 0, len = objKeyArr.length; i < len; i++) {
					if (this.listObj[objKeyArr[i]].uid === uid) {
						this.listObj[objKeyArr[i]].url = this.HOST + response.data
						this.listObj[objKeyArr[i]].hasSuccess = true
						return
					}
				}
			},
			handleRemove(file) {
				const uid = file.uid
				const objKeyArr = Object.keys(this.listObj)
				for (let i = 0, len = objKeyArr.length; i < len; i++) {
					if (this.listObj[objKeyArr[i]].uid === uid) {
						delete this.listObj[objKeyArr[i]]
						return
					}
				}
			},
			beforeUpload(file) {
				const _self = this
				const _URL = window.URL || window.webkitURL
				const fileName = file.uid
				this.listObj[fileName] = {}
				return new Promise((resolve, reject) => {
					const img = new Image()
					img.src = _URL.createObjectURL(file)
					img.onload = function() {
						_self.listObj[fileName] = {
							hasSuccess: false,
							uid: file.uid,
							width: this.width,
							height: this.height
						}
					}
					resolve(true)
				})
			}
		}
	}
</script>

<style scoped>
	.editor-slide-upload {
		margin-bottom: 20px;

	}

	.el-upload--picture-card {
		width: 100%;
	}
</style>
