<template>
	<div>
		<h3 style="display: flex;margin: 20px;">共  {{total}}  条</h3>
		<el-table :data="Tabledata" v-loading="loading" ref="table" :height="tableHeight">
			<el-table-column type="index" width="50" label="序号"></el-table-column>
			<el-table-column prop="username" label="账号"></el-table-column>
			<el-table-column prop="uuid" label="ID"></el-table-column>
			<el-table-column prop="login_time" label="登陆时间"></el-table-column>
			<el-table-column prop="ip" label="ip地址"></el-table-column>
			<el-table-column prop="role" label="角色"></el-table-column>
		</el-table>
	</div>
</template>

<script>
	import Allminxins from '@/mixins/Allminxins.js';
	export default {
		mixins: [Allminxins],
		data() {
			return {
				Tabledata:[],
				loading:false,
				total:0,
			}
		},
		computed: {},
		created() {
			this.getUser()
		},
		methods: {
			currentChange(val){
				this.getUser(val)
			},
			getUser(obj){
				this.loading = true;
				this.$utils.http.call(this, {
					url: '?s=App.User.GetLastestLoginList' ,
					parameter: {
						perpage:20,
					},
					success: resp => {
						this.loading = false
						this.total = resp.data.data.members.length
						resp.data.data.members.forEach((val,index,arr)=>{
							let time = new Date(val.login_time*1000)
							val.login_time = this.formatDate(time)
						})
						this.Tabledata = resp.data.data.members;
					},
				})
			},
		},
	}
</script>

<style>
</style>
