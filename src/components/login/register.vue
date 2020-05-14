<template>
	<div class="d0">
		<el-container :style="dheight">
			<el-header class="header">
				<div class="dheader">
					<a href="javascript:void(0)" style="float: left" class="a1" @click="goIndex">返回首页</a><a href="javascript:void(0)"
					 style="float: right" class="a1" @click="goLogin">已有账号？去登录</a>
				</div>
			</el-header>
			<el-main class="main">
				<div id="two">
					<img src="../../assets/images/logo.jpg" alt="" style="width: 100px;">
					<el-form ref="form" :model="form" label-width="60px" class="form1" label-position="right">
						<el-form-item label="邮箱:" prop="email" :rules="EmailRules">
							<el-input placeholder="输入邮箱" class="elinput" v-model="form.email">
								<el-button slot="append" style="width:130px;" @click="emailYzm" v-if="show">获取验证码</el-button>
								<el-button slot="append" style="width:130px;" v-if="!show">{{count}}后重新获取</el-button>
							</el-input>
						</el-form-item>
						<el-form-item label="密码:" prop="password" :rules="PassRules">
							<el-input placeholder="输入密码" class="elinput" v-model="form.password" type="password"></el-input>
						</el-form-item>
						<el-form-item label="密码:" prop="password2" :rules="Pass2Rules">
							<el-input placeholder="确认密码" class="elinput" v-model="form.password2" type="password"></el-input>
						</el-form-item>
						<el-form-item label="验证码:" prop="yzm" :rules="YzmRules">
							<el-input placeholder="输入验证码" class="elinput" v-model="form.yzm" type="password"></el-input>
						</el-form-item>
						<el-button type="primary" @click="login" class="mid1" v-loading.fullscreen.lock="fullscreenLoading">注册</el-button>
					</el-form>
					<div class="mid2">注册即同意<a href="javascript:void(0)" class="a2" @click="goAgree">《小熊电影资讯使用协议》</a>&amp;<a href="javascript:void(0)"
						 class="a2" @click="goPrivacy">《隐私政策》</a></div>
				</div>
			</el-main>
			<el-footer class="footer">
				<div style="color:white">@小熊电影资讯</div>
			</el-footer>
		</el-container>
	</div>
</template>

<script>
	import md5 from '../../assets/js/md5.js';
	import Allminxins from '@/mixins/Allminxins.js';
	export default {
		mixins: [Allminxins],
		data() {
			const checkPass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.form.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				fullscreenLoading:false,
				active: 0,
				count: "",
				timer: null,
				show: true,
				form: {
					username: "",
					password: "",
					password2: "",
					email: "",
				},
				Pass2Rules: [{
					validator: checkPass2,
					trigger: 'blur',
				}],
			}
		},
		computed: {},
		methods: {
			login() {
				this.$refs.form.validate((valid) => {
					if (valid) {
						this.fullscreenLoading = true;
						this.$utils.http.call(this, {
							url: '/?s=App.Email.VerifyCaptcha',
							parameter: {
								address: this.form.email,
								captcha: this.form.yzm,
							},
							success: resp => {
								const Data = resp.data.data.err_code,
											Message = resp.data.data.err_msg
										if (Data == 0) {
											this.login2();
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
			login2() {
				this.$utils.http.call(this, {
					url: '/?s=App.User.Register',
					parameter: {
						username: this.form.email,
						password: this.$md5(this.form.password),
						ext_info: {
							"yesapi_email": this.form.email,
							 "yesapi_nickname":this.form.email
						},
					},
					success: resp => {
						const Data = resp.data.data.err_code,
									Message = resp.data.data.err_msg
								if (Data == 0) {
									this.fullscreenLoading = false;
									this.$router.push('/login')
								} else {
									this.fullscreenLoading = false;
									return this.$message.error(Message);
								}
					},
				})
			},
			emailYzm() {
				const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
				if (!reg.test(this.form.email)) return this.$refs.form.validateField("email")
				this.$utils.http.call(this, {
					url: '/?s=App.Email.SendCaptcha',
					parameter: {
						address: this.form.email,
					},
					success: resp => {
						const Data = resp.data.data.err_code,
							Message = resp.data.data.err_msg
						if (Data == 0) {
						
						} else {
							return this.$message.error(Message);
						}
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
	/* .el-container {
		height: 100%;
	} */
	.d0 {
		margin: 0;
		background-image: url('../../assets/images/58同城背景图.png');
		background-size: 100%;
		/* background-attachment:fixed; */
	}

	.a2 {
		font-size: 16px;
		color: #FF6633;
		text-decoration: none;
	}

	.header {
		height: 40px;
	}

	.dheader {
		width: 600px;
		height: 50px;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
	}

	#two {
		width: 450px;
		height: 470px;
		background-color: white;
		margin: 0px auto;
	}


	.rspan {
		float: right;
		font-size: 12px
	}

	.rspan:hover {
		cursor: pointer;
		color: #FF6633;
	}

	.mid {
		width: 100%;
		/* margin:auto; */
		height: 20px;
		margin: 10px 0 10px 0
	}

	.mid1 {
		width: 100%;
		/* margin:auto; */
		mairgin-top: 20px;
		height: 40px;
	}

	.mid2 {
		margin-top: 30px
	}
</style>
