<template>
	<div>
		<div style="display: flex;">
			<el-input v-model="xxName" placeholder="请输入电影名称" class="input_search" clearable @keyup.enter.native="getUser"></el-input>
			<el-input v-model="xxType" placeholder="请输入电影标识" class="input_search" clearable @keyup.enter.native="getUser"></el-input>
			<el-button style="margin:15px 0 15px 20px" icon="el-icon-search" type="primary" @click="getUser(1)">查询</el-button>
			<el-button @click="add" style="display: flex;margin:15px 0 15px 20px" type="success">添加电影</el-button>
			<el-button @click="edit" style="display: flex;margin:15px 0 15px 20px" type="primary">修改电影</el-button>
			<el-button @click="deletes" style="display: flex;margin:15px 0 15px 20px" type="danger">删除电影</el-button>
		</div>
		<el-table :data="Tabledata" :height="tableHeight" v-loading="loading" @row-click="handleClickRow" @selection-change="handleSelectionChange"
		 ref="table">
			<el-table-column type="selection" width="50"></el-table-column>
			<el-table-column prop="xxId" label="电影id"></el-table-column>
			<el-table-column prop="xxName" label="电影名称"></el-table-column>
			<el-table-column prop="xxType" label="电影标识"></el-table-column>
			<el-table-column label="电影海报" prop="xxImg">
				<template slot-scope="scope">
					<el-popover placement="right" title="" trigger="hover">
						<el-image slot="reference" :src="scope.row.xxImg" :alt="scope.row.xxImg" style="max-height: 100px;max-width: 100px"></el-image>
						<img :src="scope.row.xxImg">
					</el-popover>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination style="display: flex;margin:20px 0 0 20px" layout="total,prev, pager, next,jumper" :total="Tabletotal"
		 :page-size="20" @current-change="currentChange" :current-page="currentPage"></el-pagination>

		<el-dialog :visible.sync="dialogVisible" width="60%" :title="dialogTitle">
			<div style="display:flex;font-size: 16px;">
				<h3>详细信息</h3>
			</div>
			<div>
				<el-form ref="form" :model="form" label-width="120px" class="form1" label-position="right">
					<el-form-item label="电影名称:" prop="xxName" :rules="FormRules">
						<el-input placeholder="请输入电影名称" class="elinput" v-model="form.xxName"></el-input>
					</el-form-item>
					<el-form-item label="电影id:" prop="xxId" :rules="FormRules">
						<el-input-number :step="1" :controls="false" placeholder="请输入电影id" class="elinput" v-model="form.xxId"></el-input-number>
					</el-form-item>
					<el-form-item label="电影海报:" prop="xxImg" :rules="FormRules">
						<el-input placeholder="请输入电影海报URL" class="elinput" v-model="form.xxImg"></el-input>
					</el-form-item>
					<el-form-item label="电影种类:" prop="xxType" :rules="FormRules">
						<el-input placeholder="请输入电影种类" class="elinput" v-model="form.xxType"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" style="text-align: right;">
					<el-button @click="dialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="confirm">确 定</el-button>
				</div>
			</div>
		</el-dialog>

		<el-dialog title="提示" :visible.sync="dialogVisible2" width="30%">
			<span>确定删除吗</span>
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
				loading: false,
				// multipleSelection:"",
				xxName: "",
				xxType: "",
				dialogTitle: "",
				dialogVisible: false,
				dialogVisible2: false,
				form: {
					xxName: "",
					xxId: "",
					xxImg: "",
					xxType: "",
				}
			}
		},
		computed: {},
		created() {
			this.getUser()
		},
		methods: {
			currentChange(val) {
				this.currentPage = val
				this.getUser(val)
			},
			getUser(obj) {
				console.log(obj)
				this.loading = true;
				this.$utils.http.call(this, {
					url: '/?s=App.Table.FreeQuery',
					parameter: {
						page: obj || 1,
						perpage: 20,
						model_name: "xxMovie",
						where: `[["id", ">", "0"],["xxName", "LIKE", "${this.xxName}"],["xxType", "LIKE", "${this.xxType}"]]`
					},
					success: resp => {
						this.loading = false
						obj == 1 ? this.currentPage = 1 : "";
						this.Tabledata = resp.data.data.list;
						this.Tabletotal = resp.data.data.total;
					},
				})
			},
			add() {
				this.form.xxName =  "",
				this.form.xxId =  "",
				this.form.xxImg =  "",
				this.form.xxType =  "",
				this.dialogVisible = true;
				this.dialogTitle = "添加电影"
			},
			edit() {
				const Data = this.multipleSelection;
				this.limit(Data, () => {
					this.setData(Data, "form", () => {
						console.log(Data)
						this.dialogVisible = true;
						this.dialogTitle = "修改电影"
					})
				})
			},
			deletes() {
				const Data = this.multipleSelection;
				if (Data.length == 0) return this.$message.warning("至少选择一条数据")
				this.dialogVisible2 = true
			},
			confirm2() {
				const Data = this.multipleSelection;
				let Ary = [];
				Data.forEach((val, index, arr) => {
					Ary.push(val.id)
				})
				this.$utils.http.call(this, {
					url: '/?s=App.Table.MultiDelete',
					parameter: {
						model_name: "xxMovie",
						ids: Ary.join(',')
					},
					success: resp => {
						this.$message.success("操作成功");
						this.dialogVisible2 = false
						this.getUser(this.currentPage)
					},
				})
			},
			confirm() {
				let Ary = {
					xxName: this.form.xxName,
					xxId: this.form.xxId,
					xxImg: this.form.xxImg,
					xxType: this.form.xxType,
				}
				let Url = "",
					parameter = {};
				this.dialogTitle == "添加电影" ? Url = "/?s=App.Table.Create" : Url = "/?s=App.Table.Update",
					this.dialogTitle == "添加电影" ? parameter = {
						model_name: "xxMovie",
						data: JSON.stringify(Ary)
					} : parameter = {
						model_name: "xxMovie",
						id: this.multipleSelection[0].id,
						data: JSON.stringify(Ary)
					}
				this.$utils.http.call(this, {
					url: Url,
					parameter: {
						...parameter
					},
					success: resp => {
						this.$message.success("操作成功");
						this.dialogVisible = false
						this.getUser(this.currentPage)
						this.$refs.form.resetFields()
					},
				})
			},
		},
	}
</script>

<style>
</style>
