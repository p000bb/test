<template>
	<div>
		<div style="display: flex;">
			<el-input v-model="movieName" placeholder="请输入电影名称" class="input_search" clearable></el-input>
			<el-input v-model="username" placeholder="请输入评论人" class="input_search" clearable></el-input>
			<el-button style="margin:15px 0 15px 20px" icon="el-icon-search" type="primary" @click="getUser">查询</el-button>
				<el-button @click="look" style="margin:15px 0 15px 20px;" type="danger">删除评论</el-button>
		</div>
		<el-table :data="Tabledata" :height="tableHeight" v-loading="loading" @row-click="handleClickRow" @selection-change="handleSelectionChange" ref="table">
			<el-table-column  type="selection" width="50"></el-table-column>
			<el-table-column prop="movieName" label="电影名称"></el-table-column>
			<el-table-column prop="username" label="评论人"></el-table-column>
			<el-table-column prop="comments" label="评论内容"></el-table-column>
			<el-table-column prop="rank" label="评分"></el-table-column>
			<el-table-column prop="add_time" label="评论时间"></el-table-column>
			<el-table-column label="用户头像" prop="cover">
				<template slot-scope="scope">
					<el-popover placement="right" title="" trigger="hover">
						<el-image slot="reference" :src="scope.row.cover">
							<div slot="error" class="image-slot">
							        <h5>该用户无头像</h5>
							      </div>
						</el-image>
						<img :src="scope.row.cover" style="max-width: 500px">
					</el-popover>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination style="display: flex;margin:20px 0 0 20px" layout="total,prev, pager, next,jumper" :total="Tabletotal"
		 @current-change="currentChange" :current-page="currentPage"></el-pagination>
		 
		<el-dialog title="提示" :visible.sync="dialogVisible2" width="30%">
			<span>确定删除吗</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible2 = false">取 消</el-button>
				<el-button type="primary" @click="confirm">确 定</el-button>
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
				Tabledata:[],
				Tabletotal:1,
				currentPage:1,
				dialogVisible: false,
				dialogVisible2:false,
				loading:false,
				movieName:"",
				username:"",
				// form:{
				// 	nickname:"",
				// 	avatar:"",
				// 	email:"",
				// 	points:"",
				// }
			}
		},
		computed: {},
		created() {
			this.getUser()
		},
		methods: {
			currentChange(val){
				this.currentPage = val
				this.getUser(val)
			},
			getUser(obj){
				this.loading = true;
				this.$utils.http.call(this, {
					url: '/?s=App.Table.FreeQuery' ,
					parameter: {
						page:obj || 1,
						perpage:10,
						model_name:"yesapi_douban_movies",
						order:["id DESC"],	// id降序
						where:`[["id", ">", "2250"],["movieName", "LIKE", "${this.movieName}"],["username", "LIKE", "${this.username}"]]`,
					},
					success: resp => {
						this.loading = false
						this.Tabledata = resp.data.data.list;
						this.Tabletotal = resp.data.data.total;
					},
				})
			},
			look(){
				if(this.multipleSelection == undefined) return this.$message.warning("至少选择一条数据");
				this.dialogVisible2 = true;
				console.log(this.multipleSelection)
			},
			confirm(){
				const Data = this.multipleSelection;
				let Ary = [];
				for(let i = 0,len = Data.length;i<len;i++){
					Ary.push(Data[i].id)
				}
				this.$utils.http.call(this, {
					url: '/?s=App.Table.MultiDelete',
					parameter: {
						model_name:"yesapi_douban_movies",
						ids:Ary.join(',')
					},
					success: resp => {
						this.dialogVisible2 = false
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUser(this.currentPage)
					},
				})
			},
		},
	}
</script>

<style>
</style>
