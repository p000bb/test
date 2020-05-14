<template>
	<div>
		<PublicTitle>
			<div class="d4" slot="header">找回密码</div>
			<div class="d2" slot="footer">
				<span style="padding-right: 15px;border-right:1px solid #ccc" @click="goLogin" class="click-span">登录</span>
				<span style="padding-left: 15px;" @click="goRegister" class="click-span">注册</span>
			</div>
			<div slot="main" class="main">
				<el-steps align-center :active="active" finish-status="success" class="steps">
					<el-step title="确认账号"></el-step>
					<el-step title="验证账号"></el-step>
					<el-step title="重置密码"></el-step>
				</el-steps>
				<div class="d5">
					<el-form ref="form" v-if="stepName" :model="form" label-width="100px" class="form1" label-position="right">
						<el-form-item label="账号:" prop="username" :rules="UserRules">
							<el-input placeholder="输入账号" class="elinput" v-model="form.username"></el-input>
						</el-form-item>
						<el-button type="primary" class="mid1" @click="step1">下一步</el-button>
					</el-form>
					<el-form ref="form2" v-if="stepName2" :model="form2" label-width="100px" class="form1" label-position="right">
						<el-form-item label="账号:">
							<span class="s2">
								{{this.form2.username}}
							</span>
							<el-button @click="emailYzm" v-if="show">获取验证码</el-button>
							<el-button style="width:130px;" v-if="!show">{{count}}后重新获取</el-button>
						</el-form-item>
						<el-form-item label="验证码:" prop="yzm" :rules="YzmRules">
							<el-input placeholder="输入验证码" class="elinput" v-model="form2.yzm"></el-input>
						</el-form-item>
						<el-button type="primary" class="mid1" @click="step2">下一步</el-button>
					</el-form>
					<el-form ref="form3" v-if="stepName3" :model="form3" label-width="100px" class="form1" label-position="right">
						<el-form-item label="输入密码:" prop="password" :rules="PassRules">
							<el-input placeholder="输入密码" class="elinput" v-model="form3.password" type="password"></el-input>
						</el-form-item>
						<el-form-item label="确认密码:" prop="password1" :rules="Pass2Rules">
							<el-input placeholder="再次输入密码" class="elinput" v-model="form3.password1" type="password"></el-input>
						</el-form-item>
						<el-button type="primary" class="mid1" @click="step3">确认重置</el-button>
					</el-form>
					<div v-if="stepName4">
						<div style="font-size:30px;margin-bottom:50px">密码重置成功</div>
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
				} else if (value !== this.form3.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				active: 0,
				count: "",
				timer: null,
				show: true,
				form: {
					username: "",
					password: "",
				},
				form2: {
					username: "",
					yzm: ""
				},
				form3: {
					password: "",
					password1: "",
				},
				uuid: "",
				token: "",
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
			},
			stepName4() {
				return this.active == 3
			},
		},
		created() {
			this.login();
		},
		methods: {
			step1() {
				this.$refs.form.validate((valid) => {
					console.log(valid)
					if (valid) {
						this.active++;
						this.form2.username = this.form.username
					} else {
						return false;
					}
				});
			},
			step2() {
				this.active++;
				this.$refs.form2.validate((valid) => {
					if (valid) {
						this.getYzm()
					} else {
						return false;
					}
				});
			},
			step3() {
				this.$refs.form3.validate((valid) => {
					if (valid) {
						this.resetPass()
					} else {
						return false;
					}
				});
			},
			emailYzm() {
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
			getYzm() {
				this.$utils.http.call(this, {
					url: '/?s=App.Email.VerifyCaptcha',
					parameter: {
						address: this.form2.username,
						captcha: this.form2.yzm,
					},
					success: resp => {
						const Data = resp.data.data.err_code,
							Message = resp.data.data.err_msg
						if (Data == 0) {
							// this.active++;
						} else {
							this.$message.error(Message);
						}
					},
				})
			},
			resetPass() {
				this.$utils.http.call(this, {
					url: '/?s=App.User.ResetPasswordForAdmin' ,
					parameter: {
						username: this.form2.username,
						new_password: this.$md5(this.form3.password),
						admin_uuid: this.uuid,
						admin_token: this.token,
					},
					success: resp => {
						const Data = resp.data.data.err_code,
							Message = resp.data.data.err_msg
						if (Data == 0) {
							// this.$router.push('/register')
							this.active++
						} else {
							this.$message.error(Message);
						}
					},
				})
			},
			login() {
				this.$utils.http.call(this, {
					url: '/?s=App.User.Login' ,
					parameter: {
						username: "934371212",
						password: this.$md5("za3569959"),
					},
					success: resp => {
						const Data = resp.data.data.err_code,
							Message = resp.data.data.err_msg,
							UUid = resp.data.data.uuid,
							Token = resp.data.data.token
						if (Data == 0) {
							this.uuid = UUid,
								this.token = Token
						} else {
						
						}
					},
				})
			},
		},
	}
</script>

<style scoped>
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
		width: 150px;
	}

	.elinput1 {
		width: 150px !important;
	}
</style>
