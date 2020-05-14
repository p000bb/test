<template>
	<div>
		<el-header height="30px">
			<div class="d1">
				<el-row>
					<el-col :span="20">
					</el-col>
					<el-col :span="4">
						<div class="d2">
							<div v-show="!isLogin">
								<span style="padding-right: 15px;border-right:1px solid #ccc" @click="goLogin" class="click-span">登录</span>
								<span style="padding-left: 15px;margin-right:15px" @click="goRegister" class="click-span">注册</span>
							</div>
							<div v-show="isLogin">
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
	</div>
</template>

<script>
</script>

<style scoped>
	.d1 {
		height: 100%;
		width: 100%;
		background-color: rgb(84, 93, 100);
		border-bottom: 0px;
	}
	.d2 {
		line-height: 30px
	}
</style>
