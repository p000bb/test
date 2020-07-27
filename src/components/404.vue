<template>
	<div>
		<PublicTitle>
			<div class="d4" slot="header">404页面</div>
			<div class="d2" slot="footer">
				<span style="padding-right: 15px;border-right:1px solid #ccc" @click="goLogin" class="click-span">登录</span>
				<span style="padding-left: 15px;" @click="goRegister" class="click-span">注册</span>
			</div>
			<h1 slot="main">
				页面不存在
				<BaiduMap></BaiduMap>
			</h1>
		</PublicTitle>
	</div>
</template>

<script>
	import Allminxins from '@/mixins/Allminxins.js';
	import PublicTitle from '@/components/public/publicVue.vue'
	import BaiduMap from '@/components/public/baiduMap.vue'
	export default {
		mixins: [Allminxins],
		components: {
			PublicTitle,
			BaiduMap
		},
		data() {
			return {}
		},
		computed: {

		},
		methods: {},
	}
</script>

<style>
</style>
