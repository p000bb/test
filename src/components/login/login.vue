<template>
	<div class="d0">
		<el-container :style="dheight">
			<el-header class="header">
				<div class="dheader">
					<a href="javascript:void(0)" style="float: left" class="a1" @click="goIndex">返回首页</a><a href="javascript:void(0)"
					 style="float: right" class="a1" @click="goRegister">没有账号？去注册</a>
				</div>
			</el-header>
			<el-main class="main">
				<div id="two">
					<img src="../../assets/images/logo.jpg" alt="" style="width: 100px;">
					<el-form ref="form" :model="form" label-width="60px" class="form1" label-position="right">
						<el-form-item label="账号:" prop="username" :rules="UserRules">
							<el-input placeholder="输入账号" class="elinput" v-model="form.username"></el-input>
						</el-form-item>
						<el-form-item label="密码:" prop="password" :rules="PassRules">
							<el-input placeholder="输入密码" class="elinput" v-model="form.password" type="password"></el-input>
						</el-form-item>
						<div class='mid'>
							<span class="rspan" @click="Fpassword">忘记密码</span>
							<span class="rspan margin-right-10" @click="Cpassword">修改密码</span>
						</div>
						<el-button type="primary" @click="login" class="mid1" v-loading.fullscreen.lock="fullscreenLoading">登录</el-button>
					</el-form>
					<div class="mid2">登录即同意<a href="javascript:void(0)" class="a2" @click="goAgree">《小熊电影资讯使用协议》</a>&amp;<a href="javascript:void(0)"
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
			return {
				fullscreenLoading: false,
				form: {
					username: "",
					password: "",
				},
				admin:"",
			}
		},
		computed: {

		},
		created() {},
		methods: {
			login() {
				this.$refs.form.validate((valid) => {
					if (valid) {
						this.fullscreenLoading = true;
						this.$utils.http.call(this, {
							url: '/?s=App.User.Login',
							parameter: {
								username: this.form.username,
								password: this.$md5(this.form.password),
							},
							success: resp => {
								const Data = resp.data.data.err_code,
									Message = resp.data.data.err_msg,
									Token = resp.data.data.token,
									Uuid = resp.data.data.uuid,
									Admin = resp.data.data.role,
									session = window.sessionStorage,
									Username = this.form.username;
									this.admin = resp.data.data.role
								if (Data == 0) {
									this.fullscreenLoading = false;
									session.setItem('token', Token)
									session.setItem('username', Username)
									session.setItem('uuid', Uuid)
									session.setItem('img', Username)
									session.setItem('role', Admin)
									this.loginInformation()
								} else {
									this.fullscreenLoading = false;
									return this.$message.error(Message);
								}
							},
						})
					} else {
						return false;
					}
				});
			},
			loginInformation() {
				this.$utils.http.call(this, {
					url: '/?s=App.User.Profile' ,
					parameter: {
						uuid:sessionStorage.getItem('uuid'),
						token:sessionStorage.getItem('token')
					},
					success: resp => {
						sessionStorage.setItem('info', JSON.stringify(resp.data.data.info.ext_info))
						if(this.admin == "admin"){
							this.$router.push('/admin')
						}else if(this.admin == "user"){
							this.$router.push('/index')
						}
					},
				})
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
		height: 400px;
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
