<template>
	<div>
		<PublicTitle>
			<div class="d4" slot="header">使用协议</div>
			<div class="d2" slot="footer">
				<span style="padding-right: 15px;border-right:1px solid #ccc" @click="goLogin" class="click-span">登录</span>
				<span style="padding-left: 15px;" @click="goRegister" class="click-span">注册</span>
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
			return {}
		},
		computed: {

		},
		methods: {
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
		width: 100%;
	}
</style>
