<template>
	<div>
		<div style="display: flex;">
			<!-- <el-input v-model="username" placeholder="请输入用户名称" class="input_search" clearable @keyup.enter.native="search"></el-input> -->
			<!-- <el-button style="margin:15px 0 15px 20px" icon="el-icon-search" type="primary" @click="search(1)">查询</el-button> -->
			<el-button @click="look" style="display: flex;margin:15px 0 15px 20px" type="primary">查看详情</el-button>
		</div>
		<el-table :data="Tabledata" :height="tableHeight" v-loading="loading" @row-click="handleClickRow" @selection-change="handleSelectionChange"
		 ref="table">
			<el-table-column type="selection" width="50"></el-table-column>
			<el-table-column prop="username" label="账号"></el-table-column>
			<el-table-column prop="reg_time" label="注册时间"></el-table-column>
			<el-table-column prop="role_desc" label="角色"></el-table-column>
			<el-table-column prop="status_desc" label="状态"></el-table-column>
			<el-table-column prop="" label="操作">
				<template slot-scope="scope">
					<el-button v-if="scope.row.status==1" type="primary" @click="open(scope.row)">解封</el-button>
					<el-button v-if="scope.row.status==0" type="danger" @click="open(scope.row)">封号</el-button>
					</template>
			</el-table-column>
		</el-table>
		<el-pagination style="display: flex;margin:20px 0 0 20px" layout="total,prev, pager, next,jumper" :total="Tabletotal"
		 :page-size="20" @current-change="currentChange" :current-page="currentPage"></el-pagination>

		<el-dialog :visible.sync="dialogVisible" width="60%">
			<div style="display:flex;font-size: 16px;">
				<h3>详细信息</h3>
			</div>
			<div>
				<el-form ref="form" :model="form" label-width="120px" class="form1" label-position="right" disabled>
					<el-form-item label="用户昵称:" prop="nickname">
						<el-input class="elinput" v-model="form.nickname"></el-input>
					</el-form-item>
					<el-form-item label="用户头像:" prop="avatar">
						<el-input placeholder="头像URL" class="elinput" v-model="form.avatar"></el-input>
					</el-form-item>
					<el-form-item label="用户邮箱:" prop="email" :rules="EmailRules">
						<el-input class="elinput" v-model="form.email"></el-input>
					</el-form-item>
					<el-form-item label="用户积分:" prop="points">
						<el-input class="elinput" v-model="form.points"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" style="text-align: right;">
					<el-button @click="dialogVisible = false" type="primary">关 闭</el-button>
				</div>
			</div>
		</el-dialog>
		
		<el-dialog title="提示" :visible.sync="dialogVisible2" width="30%">
			<span>确定操作吗?</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible2 = false">取 消</el-button>
				<el-button type="primary" @click="confirm2">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import Allminxins from '@/mixins/Allminxins.js';
	export default {
		mixins: [Allminxins],
		data() {
			return {
				Tabledata: [],
				Tabletotal: 1,
				currentPage: 1,
				dialogVisible: false,
				dialogVisible2:false,
				loading: false,
				uuid: "",
				token: "",
				multipleSelection: "",
				username: "",
				form: {
					nickname: "",
					avatar: "",
					email: "",
					points: "",
				}
			}
		},
		computed: {},
		created() {
			console.log(sessionStorage.getItem('token'))
			console.log(sessionStorage.getItem('uuid'))
			this.uuid = sessionStorage.getItem('uuid')
			this.token = sessionStorage.getItem('token')
			this.getUser()
		},
		methods: {
			currentChange(val) {
				this.getUser(val)
			},
			getUser(obj) {
				this.loading = true;
				this.$utils.http.call(this, {
					url: '/?s=App.User.GetList',
					parameter: {
						page: obj || 1,
						perpage: 20,
						role: "all"
					},
					success: resp => {
						this.loading = false
						this.Tabledata = resp.data.data.users;
						this.Tabletotal = resp.data.data.total;
					},
				})
			},
			open(obj){
				this.multipleSelection = obj
				this.dialogVisible2 = true
			},
			confirm2(){
				this.$utils.http.call(this, {
					url: '/?s=App.User.BanUserForAdmin',
					parameter: {
						user_status:this.multipleSelection[0].status,
						other_uuid:this.multipleSelection[0].uuid,
						admin_uuid:this.uuid,
						admin_token:this.token
					},
					success: resp => {
						this.getUser(1)
						this.dialogVisible2 = false;
					},
				})
			},
			look() {
				const val = this.multipleSelection
				this.limit(val, () => {
					this.form.nickname = val[0].ext_info.yesapi_nickname
					this.form.avatar = val[0].ext_info.yesapi_avatar
					this.form.email = val[0].ext_info.yesapi_email
					this.form.points = val[0].ext_info.yesapi_points
					this.dialogVisible = true
				})
			},
		},
	}
</script>

<style>
</style>
