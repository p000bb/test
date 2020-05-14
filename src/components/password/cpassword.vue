<template>
	<div>
		<PublicTitle>
			<div class="d4" slot="header">修改密码</div>
			<div class="d2" slot="footer">
				<span style="padding-right: 15px;border-right:1px solid #ccc" @click="goLogin" class="click-span">登录</span>
				<span style="padding-left: 15px;" @click="goRegister" class="click-span">注册</span>
			</div>
			<div slot="main" class="main">
				<el-steps align-center :active="active" finish-status="success" class="steps">
					<el-step title="确认账号"></el-step>
					<el-step title="修改密码"></el-step>
					<el-step title="修改成功"></el-step>
				</el-steps>
				<div class="d5">
					<el-form ref="form" v-if="stepName" :model="form" label-width="60px" class="form1" label-position="right">
						<el-form-item label="账号:" prop="username" :rules="UserRules">
							<el-input placeholder="输入账号" class="elinput" v-model="form.username"></el-input>
						</el-form-item>
						<el-form-item label="验证码:" prop="yzm" :rules="YzmRules">
							<el-input placeholder="输入邮箱" class="elinput" v-model="form.yzm">
								<el-button slot="append" style="width:130px;" @click="emailYzm" v-if="show">获取验证码</el-button>
								<el-button slot="append" style="width:130px;" v-if="!show">{{count}}后重新获取</el-button>
							</el-input>
						</el-form-item>
						<el-button type="primary" class="mid1" @click="step1">下一步</el-button>
					</el-form>
					<el-form ref="form2" v-if="stepName2" :model="form2" label-width="100px" class="form1" label-position="right">
						<el-form-item label="账号:">
							<span class="s2">
								{{this.form2.username}}
							</span>
						</el-form-item>
						<el-form-item label="旧密码:" prop="oldPassword" :rules="PassRules">
							<el-input placeholder="输入旧密码" class="elinput" type="password" v-model="form2.oldPassword"></el-input>
						</el-form-item>
						<el-form-item label="新密码:" prop="newPassword" :rules="PassRules">
							<el-input placeholder="输入新密码" class="elinput" type="password" v-model="form2.newPassword"></el-input>
						</el-form-item>
						<el-form-item label="确认密码:" prop="newPassword2" :rules="Pass2Rules">
							<el-input placeholder="确认新密码" class="elinput" type="password" v-model="form2.newPassword2"></el-input>
						</el-form-item>
						<el-button type="primary" class="mid1" @click="step2" v-loading.fullscreen.lock="fullscreenLoading">确认修改</el-button>
					</el-form>
					<div v-if="stepName3">
						<div style="font-size:30px;margin-bottom:50px">密码修改成功</div>
						<el-button type="primary" class="mid1" @click="goLogin">返回登录页面</el-button>
					</div>
				</div>
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
			const checkPass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.form2.newPassword) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				fullscreenLoading: false,
				active: 0,
				count: "",
				timer: null,
				show: true,
				form: {
					username: "",
					yzm: "",
				},
				form2: {
					oldPassword: "",
					newPassword: "",
					newPassword2: "",
				},
				Pass2Rules: [{
					validator: checkPass2,
					trigger: 'blur',
				}],
			}
		},
		computed: {
			dheight() {
				return {
					height: document.documentElement.clientHeight + "px"
				}
			},
			stepName() {
				return this.active == 0
			},
			stepName2() {
				return this.active == 1
			},
			stepName3() {
				return this.active == 2
			}
		},
		methods: {
			step1() {
				this.form2.username = this.form.username
				this.$refs.form.validate((valid) => {
					if (valid) {
						this.$utils.http.call(this, {
							url: '/?s=App.Email.VerifyCaptcha',
							parameter: {
								address: this.form.username,
								captcha: this.form.yzm,
							},
							success: resp => {
								const Data = resp.data.data.err_code,
									Message = resp.data.data.err_msg
								if (Data == 0) {
									this.active++;
									this.form2.username = this.form.username
								} else {
									this.$message.error(Message);
								}
							},
						})
					} else {
						return false;
					}
				});
			},
			//	修改密码
			step2() {
				this.$refs.form2.validate((valid) => {
					if (valid) {
						this.fullscreenLoading = true;
						this.$utils.http.call(this, {
							url: '/?s=App.User.Login',
							parameter: {
								username: this.form2.username,
								password: this.$md5(this.form2.oldPassword),
							},
							success: resp => {
								const Data = resp.data.data.err_code,
									Message = resp.data.data.err_msg
								if (Data == 0) {
									this.changePassword()
								} else {
									return this.$message.error(Message);
								}
							},
						})
					} else {
						return false;
					}
				});

			},
			changePassword() {
				this.$utils.http.call(this, {
					url: '/?s=App.User.AlterPassword',
					parameter: {
						username: this.form.username,
						old_password: this.$md5(this.form2.oldPassword),
						new_password: this.$md5(this.form2.newPassword),
					},
					success: resp => {
						const Data = resp.data.data.err_code,
							Message = resp.data.data.err_msg
						if (Data != 0) {
							this.fullscreenLoading = false;
							return this.$message.error(Message);
						} else {
							this.fullscreenLoading = false;
							this.active++;
						
						}
					},
				})
			},
			emailYzm() {
				const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
				if (!reg.test(this.form.username)) return this.$refs.form.validateField("username")
				this.$utils.http.call(this, {
					url: '/?s=App.Email.SendCaptcha',
					parameter: {
						address: this.form.username,
					},
					success: resp => {
						
					},
				})
				const TIME_COUNT = 60;
				if (!this.timer) {
					this.count = TIME_COUNT;
					this.show = false;
					this.timer = setInterval(() => {
						if (this.count > 0 && this.count <= TIME_COUNT) {
							this.count--;
						} else {
							this.show = true;
							clearInterval(this.timer);
							this.timer = null;
						}
					}, 1000)
				}
			},

		},
	}
</script>

<style scoped>
	.main {
		width: 80%;
		margin: auto
	}

	.steps {
		width: 80%;
		margin: auto;
		margin-top: 30px
	}

	.d2 {
		line-height: 100px
	}

	.d4 {
		font-size: 25px;
		line-height: 100px;
		color: #999;
		font-family: HiraginoSansGB-W3;
		display: inline-block;
		position: relative;
	}

	.d5 {
		width: 450px;
		background-color: white;
		margin: 40px auto;
	}

	.s2 {
		display: inline-block;
		width: 100%;
	}

	.elinput1 {
		width: 150px !important;
	}
</style>
