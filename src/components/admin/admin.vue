<template>
	<div>
		<el-container :style="dheight">
			<el-header height="60px">
				<div class="d1">
					<el-row>
						<el-col :span="20">
							<div class="d2">
								<div style="color:white;display: flex;margin-left: 50px;">
									小熊电影管理员
								</div>

							</div>
						</el-col>
						<el-col :span="4">
							<div class="d2">
								<div>
									<el-dropdown @command="handleCommand" :hide-timeout="300">
										<span>欢迎:{{username||loginName}}<i class="el-icon-arrow-down el-icon--right"></i></span>
										<el-dropdown-menu slot="dropdown">
											<el-dropdown-item command="userinfo">个人信息</el-dropdown-item>
											<el-dropdown-item command="outLogin">退出登录</el-dropdown-item>
										</el-dropdown-menu>
									</el-dropdown>
								</div>
							</div>
						</el-col>
					</el-row>
				</div>
			</el-header>
			<el-main>
				<el-col :span="4">
					<el-menu style="height: 100%;max-width: 200px;" :unique-opened="true" :default-active="active" class="el-menu-vertical-demo"
					 @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
						<el-submenu index="1">
							<template slot="title">
								<i class="el-icon-user-solid"></i>
								<span>用户信息</span>
							</template>
							<el-menu-item-group>
								<el-menu-item index="1-1">用户列表</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
						<el-submenu index="2">
							<template slot="title">
								<i class="el-icon-location"></i>
								<span>统计信息</span>
							</template>
							<el-menu-item-group>
								<el-menu-item index="2-1">注册统计</el-menu-item>
								<el-menu-item index="2-2">登录统计</el-menu-item>
								<el-menu-item index="2-3">接口流量</el-menu-item>
								<el-menu-item index="2-4">最近登陆</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
						<el-submenu index="3">
							<template slot="title">
								<i class="el-icon-info"></i>
								<span>电影信息</span>
							</template>
							<el-menu-item-group>
								<el-menu-item index="3-1">用户评论</el-menu-item>
								<el-menu-item index="3-2">小熊电影</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
					</el-menu>
				</el-col>
				<el-col :span="20">
					<component :is="activeName"></component>
				</el-col>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import Allminxins from '@/mixins/Allminxins.js';
	import Load from '@/components/loadVue.js'
	export default {
		mixins: [Allminxins],
		components: {

		},
		data() {
			return {
				active: "1-1",
				activeName: "",
				loginName: "", // 登录用户名
				username: "",
			}
		},
		computed: {
			mainHeight() {
				return {
					height: (document.documentElement.clientHeight - 200) + "px",
				}
			},
		},
		created() {
			Load.forEach((val, index, arr) => {
				if (val.title == "用户列表") {
					this.activeName = val.content
				}
			})
			this.username = sessionStorage.getItem('info') ? JSON.parse(sessionStorage.getItem('info')).yesapi_nickname : "";
			this.loginName = sessionStorage.getItem('username');
			// this.username = JSON.parse(sessionStorage.getItem('info')).yesapi_nickname;
		},
		methods: {
			handleSelect(key, keyPath) {
				const Data = event.target.innerText
				Load.forEach((val, index, arr) => {
					if (val.title == Data) {
						this.activeName = val.content
					}
				})
			},
			handleCommand(command) {
				if (command == "userinfo") {
					this.userinfo()
				} else if (command == "outLogin") {
					this.outLogin()
				}
			},
			//	退出登录
			outLogin() {
				window.sessionStorage.removeItem('token');
				window.sessionStorage.removeItem('username');
				window.sessionStorage.removeItem('role');
				this.$router.replace('/login')
				// window.location.reload();
			},
		},
	}
</script>

<style scoped>
	.d1 {
		height: 100%;
		width: 100%;
		background-color: rgb(84, 93, 100);
		border-bottom: 0px;
	}

	.d2 {
		line-height: 60px
	}
</style>
