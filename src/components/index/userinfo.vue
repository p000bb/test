<template>
	<div>
		<PublicTitle>
			<div class="d4" slot="header">个人信息</div>
			<div class="d2" slot="footer">
				<span style="padding-left: 15px;" @click="goIndex" class="click-span">返回首页</span>
			</div>
			<div slot="main">
				<el-main class="main">
					<el-form ref="form" :model="form" label-width="80px" class="main_form">
						<el-form-item label="昵称:" class="formClass" prop="name" :rules="FormRules">
							<el-input v-model="form.name" class="elinput" :maxlength="30" show-word-limit></el-input>
						</el-form-item>
						<el-form-item label="邮箱:" class="formClass" :rules="EmailRules" prop="email">
							<el-input v-model="form.email" class="elinput"></el-input>
						</el-form-item>
						<el-form-item label="性别" class="formClass" prop="sex" :rules="FormRules">
							<el-radio-group v-model="form.sex">
								<el-radio label="male">男</el-radio>
								<el-radio label="female">女</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="头像" class="formClass" prop="imageUrl" :rules="FormRules">
							<el-upload class="avatar-uploader" ref="up" action="111" :show-file-list="false" :on-success="handleAvatarSuccess"
							 :before-upload="beforeAvatarUpload" :http-request="upLoad">
								<img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
						<el-button type="primary" @click="onSubmit" class="button">修改</el-button>
					</el-form>
				</el-main>
			</div>
		</PublicTitle>

	</div>
</template>

<script>
	import Allminxins from '@/mixins/Allminxins.js';
	import PublicTitle from '@/components/public/publicVue.vue'
	export default {
		mixins: [Allminxins],
		components: {
			PublicTitle
		},
		data() {
			return {
				form: {
					name: "",
					email: "",
					sex: "",
					imageUrl: "",
				},
				base64: "",
				imgName: "",
				imgType: "",
				Info: "",
			}
		},
		computed: {},
		created() {
			this.Info = JSON.parse(sessionStorage.getItem('info'))
			this.form.name = this.Info.yesapi_nickname
			this.form.email = this.Info.yesapi_email
			this.form.sex = this.Info.yesapi_sex
			this.form.imageUrl = this.Info.yesapi_avatar
		},
		methods: {
			upLoad(file) {
				let fileList = file.file;
				let reader = new FileReader(); //html5读文件
				this.imgName = fileList.name
				reader.readAsDataURL(fileList);
				reader.onload = (e) => {
					this.form.imageUrl = e.target.result
				}
			},
			handleAvatarSuccess(res, file) {
				console.log(file)
				console.log(URL.createObjectURL(file.raw))
				this.form.imageUrl = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload(file) {
				console.log(file)
				const isJPG = file.type === 'image/jpeg';
				const isGIF = file.type === 'image/gif';
				const isPNG = file.type === 'image/png';
				const isBMP = file.type === 'image/bmp';
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isJPG && !isGIF && !isPNG && !isBMP) {
					this.$message.error('上传图片必须是JPG/GIF/PNG/BMP 格式!');
					this.imgType = "file"
					return
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
					this.imgType = "file"
					return
				}
				return (isJPG || isBMP || isGIF || isPNG) && isLt2M;
			},
			Base64() {
				let list = {
					yesapi_nickname: this.form.name,
					yesapi_email: this.form.email,
					yesapi_sex: this.form.sex,
					yesapi_avatar: this.base64
				};
				this.$utils.http.call(this, {
					url: '/?s=App.User.UpdateExtInfo',
					parameter: {
						uuid: sessionStorage.getItem('uuid'),
						token: sessionStorage.getItem('token'),
						ext_info: JSON.stringify(list)
					},
					success: resp => {
						this.$message({
							message: '修改成功',
							type: 'success'
						});
						sessionStorage.setItem('info', JSON.stringify(resp.data.data.ext_info))
					},
				})
			},
			onSubmit() {
				if (this.imgType == "file") return this.$message.error("头像格式错误或超过2M")
				if (this.form.name == this.Info.yesapi_nickname && this.form.email == this.Info.yesapi_email && this.form.sex ==
					this.Info.yesapi_sex && this.form.imageUrl == this.Info.yesapi_avatar) return
				this.$refs.form.validate((valid) => {
					if (valid) {
						this.$utils.http.call(this, {
							url: '/?s=App.CDN.UploadImgByBase64',
							parameter: {
								file: this.form.imageUrl,
								file_name: this.imgName,
							},
							success: resp => {
								this.base64 = resp.data.data.url
								this.Base64()
							},
						})
					} else {
						return false;
					}
				})
			},
		},
	}
</script>

<style scoped>
	.main_form {
		margin-top: 100px;
	}

	.formClass {
		width: 40%;
		margin: 30px auto
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 300px;
		height: 250px;
		display: block;
	}

	.button {
		margin: 30px 0 100px 0
	}
</style>
