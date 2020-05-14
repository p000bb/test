<template>
	<div v-loading="loading">
		<el-container :style="dheight">
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
			<el-main>
				<div style="width:90%;margin: auto;">
					<div class="main-d1">
						<el-row>
							<el-col :span="6">
								<img src="../../assets/images/logo.jpg" alt="" style="width: 180px;margin-top:20px">
							</el-col>
							<el-col :span="18">
								<el-input style="line-height: 200px;width: 50%;float: left;" placeholder="请输入电影id进行搜索" v-model="movieId"
								 @keyup.enter.native="search(movieId)">
								</el-input>
							</el-col>
						</el-row>
					</div>
					<div class='mian-d2'>
						<div>
							<el-row>
								<el-col :span="16">
									<h1 style="margin:0px;text-align:left;">{{searchForm.title}} {{searchForm.original_title}} ({{searchForm.year}})</h1>
									<div style="display: flex; margin-top:10px;">
										<el-popover placement="right" title="" trigger="hover">
											<el-image slot="reference" :src="mImg" style="width: 135px"></el-image>
											<img :src="mImg" width="270px">
										</el-popover>
										<div>
											<span class="search_span" style="margin: 0 0 0 10px;">导演:<span class="search_span2">{{directors}}</span></span>
											<span class="search_span">编剧:<span class="search_span2">{{writers}}</span></span>
											<span class="search_span">主演:<span class="search_span2">{{actor}}</span></span>
											<span class="search_span">类型:<span class="search_span2">{{genres}}</span></span>
											<span class="search_span">制片国家/地区:<span class="search_span2">{{countries}}</span></span>
											<span class="search_span">语言:<span class="search_span2">{{languages}}</span></span>
											<span class="search_span">上映日期:<span class="search_span2">{{pubdates}}</span></span>
											<span class="search_span">片长:<span class="search_span2">{{durations}}</span></span>
											<span class="search_span">电影id:<span class="search_span2">{{searchForm.id}}</span></span>
										</div>
									</div>
									<div class="main-div">
										<h3 style="text-align: left;">{{searchForm.title}}的剧情简介</h3>
										<div style="text-align: left;font-size: 15px;">{{searchForm.summary}}</div>
									</div>
									<div class="main-div">
										<h3 style="text-align: left;">{{searchForm.title}}的演职员</h3>
										<div style="text-align: left;font-size: 15px;">
											<div class="item_a" v-for="(item1, index1) in actorName.length" :key="item1">
												<el-card :body-style="{ padding: '0px' }">
													<el-popover placement="right" title="" trigger="hover">
														<el-image slot="reference" :src="actorsImg[index1]||defaultImg" style="max-width: 115px;" alt="找不到图片"></el-image>
														<img :src="actorsImg[index1]||defaultImg" alt="找不到图片">
													</el-popover>
													<span style="font-size: 12px;padding: 10px;" class="hidden_span" :title="actorName[index1]">{{actorName[index1] || "暂无"}}</span>
												</el-card>
											</div>
										</div>
									</div>
									<div class="main-div">
										<h3 style="text-align: left;">
											{{searchForm.title}}的热门影评
											<el-button style="float: right;" type="primary" @click="writerComment">我要写影评</el-button>
										</h3>
										<el-tabs v-model="activeName1" @tab-click="handleClick2">
											<el-tab-pane label="豆瓣影评" name="douban">
												<div v-for="(item,index) in comment.length">
													<div :class="divNum(index)">
														<h4 class="h4">
															<img :src="comment[index].author.avatar||defaultImg" alt="找不到图片" class="comment_img">
															<span style="line-height: 48px;margin:0 10px 0 10px">{{comment[index].author.name}}</span>
															<span style="line-height: 48px;">
																<span style="color: #aaa;">评价</span>
																<el-rate v-model="comment[index].rating.value" disabled text-color="#ff9900" disabled-void-color="#88888C"></el-rate>
																<span style="color: #aaa;margin-left: 15px;">{{comment[index].created_at}}</span>
															</span>
														</h4>
														<p class="comment_p">
															{{comment[index].content}}
														</p>
													</div>
												</div>
											</el-tab-pane>
											<el-tab-pane label="小熊影评" name="xiaoxiong">
												<div v-if="xxComment.length==0">
													<h3>暂无评论</h3>
												</div>
												<div v-for="(item,index) in xxComment.length" v-if="xxComment.length!=0">
													<div :class="divNum(index)">
														<h4 class="h4">
															<img :src="xxComment[index].cover||defaultImg" alt="找不到图片" class="comment_img">
															<span style="line-height: 48px;margin:0 10px 0 10px">{{xxComment[index].username}}</span>
															<span style="line-height: 48px;">
																<span style="color: #aaa;">评价</span>
																<el-rate v-model="xxComment[index].rank" disabled text-color="#ff9900" disabled-void-color="#88888C"></el-rate>
																<span style="color: #aaa;margin-left: 15px;">{{xxComment[index].add_time}}</span>
															</span>
														</h4>
														<p class="comment_p">
															{{xxComment[index].comments}}
														</p>
													</div>
												</div>
											</el-tab-pane>
										</el-tabs>
									</div>
								</el-col>
								<el-col :span="8">
									<div style="margin-left:60px;margin-bottom:100px">
										<div style="display: flex;">豆瓣评分</div>
										<div style="margin: 15px 10px 0 0;">
											<span class="rank_span">
												{{average}}
											</span>
											<span>
												<el-rate v-model="rank" disabled text-color="#ff9900" disabled-void-color="#88888C">
												</el-rate>
											</span>
										</div>
									</div>
									<div style="margin-left:60px;margin-bottom:100px">
										<div style="display: flex;">小熊评分</div>
										<div style="margin: 15px 10px 0 0;">
											<span class="rank_span">
												{{xxRank*2}}
											</span>
											<span>
												<el-rate v-model="xxRank" disabled text-color="#ff9900" disabled-void-color="#88888C">
												</el-rate>
											</span>
										</div>
									</div>
									<div style="margin-left:60px">
										<div style="display: flex;" v-if="mVideo.length>0">在哪能看</div>
										<div style="margin: 15px 10px 0 0;">
											<h5 v-for="(item,index) in mVideo.length" style="margin-top:0px;height:30px;display: flex;">
												<img :src="mVideo[index].source.pic" width="30px">
												<a class="a_img" :href="mVideo[index].sample_link" target="_blank">{{mVideo[index].source.name}}</a>
												</h5>
										</div>
									</div>
								</el-col>
							</el-row>
						</div>
					</div>
				</div>
			</el-main>
		</el-container>
		<!-- 弹出框部分 :before-close="handleClose" -->
		<el-dialog title="我要评论" :visible.sync="dialogVisible" width="60%">
			<div>
				<div style="margin-bottom:15px">
					<span>给个评分吧!</span>
					<el-rate v-model="dialog.rank"></el-rate>
				</div>
				<el-input type="textarea" :rows="5" placeholder="请输入内容" :maxlength="300" v-model="dialog.textarea" show-word-limit></el-input>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="submitComment">确 定</el-button>
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
				loading:false,
				activeName1: "douban",
				taburl: '/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a',
				loginName: "", // 登录用户名
				movieId: "",  // 电影数据id
				commentId: "",// 评论电影id
				searchForm: [],
				durations: "", // 片长
				genres: "", // 类型
				languages: "", // 语言
				countries: "", // 国家
				pubdates: "", // 上映日期
				// directors: "",
				average: 0,  // 豆瓣评分
				xxComment: "", // 小熊评论
				dialogVisible: false,
				xxRank: 0, // 小熊评分
				username: "",
				dialog: {
					rank: 0,
					textarea: "",
				},
				apikey: "?apikey=0df993c66c0c636e29ecbb5344252a4a",
				douban: "https://api.douban.com",
				defaultImg:"https://img1.doubanio.com/icon/user_normal.jpg",
			}
		},
		computed: {
			dheight() {
				return {
					height: document.documentElement.clientHeight + "px"
				}
			},
			isLogin() {
				if (sessionStorage.getItem('username') && sessionStorage.getItem('token')) {
					return true
				} else {
					return false
				}
			},
			rank() {
				return this.average?this.average/2:0
			},
			mImg(){
				let Ary = "";
				if (this.searchForm == "") return Ary
				 return this.searchForm.images.small
			},
			actorsImg() {
				let Ary = [];
				if (this.searchForm == "") return Ary
				this.searchForm.casts.forEach((val, index, arr) => {
					Ary.push(val.avatars.small)
				});
				return this.searchForm.casts ? Ary.join('/') : "";
			},
			directors() {
				let Ary = [];
				if (this.searchForm == "") return Ary
				this.searchForm.directors.forEach((val, index, arr) => {
					Ary.push(val.name)
				});
				return this.searchForm.directors ? Ary.join('/') : "";
			},
			actor() {
				let Ary = [];
				if (this.searchForm == "") return Ary
				this.searchForm.casts.forEach((val, index, arr) => {
					Ary.push(val.name)
				});
				return this.searchForm.casts ? Ary.join('/') : "";
			},

			writers() {
				let Ary = [];
				if (this.searchForm == "") return Ary
				this.searchForm.writers.forEach((val, index, arr) => {
					Ary.push(val.name)
				});
				return this.searchForm.writers ? Ary.join('/') : "";
			},
			actorsImg() {
				let Ary = [];
				if (this.searchForm == "") return Ary
				this.searchForm.casts.forEach((val, index, arr) => {
					Ary.push(val.avatars ? val.avatars.small : "")
				});
				return this.searchForm.casts ? Ary : "";
			},
			actorName() {
				let Ary = [];
				if (this.searchForm == "") return Ary
				this.searchForm.casts.forEach((val, index, arr) => {
					Ary.push(val.name)
				});
				return this.searchForm.casts ? Ary : "";
			},
			comment() {
				let Ary = [];
				if (this.searchForm == "") return Ary
				this.searchForm.popular_comments.forEach((val, index, arr) => {
					Ary.push(val)
				});
				return this.searchForm.popular_comments ? Ary : "";
			},
			mVideo(){
				let Ary = [];
				if (this.searchForm == "") return Ary
				this.searchForm.videos.forEach((val, index, arr) => {
					Ary.push(val)
				});
				return this.searchForm.videos ? Ary : "";
			},
			// mPhotos(){
			// 	let Ary = [];
			// 	this.searchForm.photos.forEach((val, index, arr) => {
			// 		Ary.push(val.thumb ? val.thumb : "")
			// 	});
			// 	return this.searchForm.photos ? Ary : "";
			// }
		},
		created() {
			this.movieId = this.$route.query.id
			this.loginName = sessionStorage.getItem('username')
			this.username = sessionStorage.getItem('info')?JSON.parse(sessionStorage.getItem('info')).yesapi_nickname:""
			this.search(this.$route.query.id)
			this.getRank();
		},
		methods: {
			divNum(index) {
				if (index != 0) {
					return "comment_div"
				} else {
					return "comment_div1"
				}
			},
			//电影id查询
			search(obj) {
				this.loading = true;
				this.$http.jsonp(this.douban + '/v2/movie/subject/' + obj + this.apikey)
					.then(resp => {
						this.searchForm = resp.data;
						this.durations = this.searchForm.durations.join('/');
						this.genres = this.searchForm.genres.join('/');
						this.languages = this.searchForm.languages.join('/');
						this.countries = this.searchForm.countries.join('/');
						this.pubdates = this.searchForm.pubdates.join('/');
						this.average = this.searchForm.rating.average;
						this.commentId = this.searchForm.id;
						this.loading = false;
					})
					.catch(resp => {
						this.$message.error("对不起该电影id不存在")
						this.$router.push('/index')
					})



				// this.$utils.http.call(this, {
				// 	url: '/v2/movie/subject/' + obj + this.apikey,
				// 	method: "get",
				// 	ServiceType: 'douban',
				// 	parameter: {},
				// 	success: resp => {
				// 		this.searchNum = 0;
				// 		this.searchForm = resp.data;
				// 		this.durations = this.searchForm.durations.join('/');
				// 		this.genres = this.searchForm.genres.join('/');
				// 		this.languages = this.searchForm.languages.join('/');
				// 		this.countries = this.searchForm.countries.join('/');
				// 		this.pubdates = this.searchForm.pubdates.join('/');
				// 		this.average = this.searchForm.rating.average;
				// 		this.commentId = this.searchForm.id
				// 		this.$router.push({
				// 			path: '/index/subject',
				// 			query: {
				// 				id: obj
				// 			}
				// 		})
				// 		this.getxxComment();
				// 	},
				// 	error: resp => {
				// 		this.$message.error("对不起该电影id不存在")
				// 	}
				// })
			},
			//切换个人信息或者退出登录
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
				this.$router.replace('/index')
				window.location.reload();
			},
			// 切换豆瓣评分和小熊评分
			handleClick2(tab, event) {
				if (tab.name === "douban") {

				} else if (tab.name === "xiaoxiong") {
					this.getxxComment();
				}
			},
			// 获取小熊电影评论
			getxxComment() {
				this.$utils.http.call(this, {
					url: '/?s=App.Table.GetMoreDataByMoreField',
					parameter: {
						model_name: "yesapi_douban_movies",
						field_name_list: "douban_id",
						field_value_list: this.commentId || this.movieId,
					},
					success: resp => {
						let rank = 0,
							num = 0;
						this.xxComment = resp.data.data.items;
						this.getRank()
						// if (this.xxComment == 0) return
						// this.xxComment.forEach((val, index, arr) => {
						// 	rank = rank - (-val.rank)
						// 	num++
						// });
						// this.xxRank = (rank / num).toFixed(1) - 0
					},
				})
			},
			getRank(){
				this.$utils.http.call(this, {
					url: '/?s=App.Table.FreeAggregation',
					parameter: {
						model_name: "yesapi_douban_movies",
						op_funs:"AVG",
						op_fields:"rank",
						where:	`[["douban_id", "=", "${this.commentId || this.movieId}"]]`
					},
					success: resp => {
						const Data = resp.data.data.report.AVG_rank
						if(Data.substring(2,3) == 0){
							this.xxRank = resp.data.data.report.AVG_rank.substring(0,1)-0
						}else{
							this.xxRank = resp.data.data.report.AVG_rank.substring(0,3)-0
						}
					},
				})
			},
			// 点击我要写影评事件
			writerComment() {
				this.dialog.rank = 0;
				this.dialog.textarea = "";
				if (sessionStorage.getItem('token')) {
					this.dialogVisible = true
				} else {
					this.$message.error("对不起请先登录")
					this.$router.replace('/login')
				}
			},
			// 提交影评按钮
			submitComment() {
				if (this.dialog.textarea == "" || this.dialog.rank == 0) return this.$message.error('请填写评分和内容')
				let list = {
					movieName: this.searchForm.title,
					cover: JSON.parse(sessionStorage.getItem('info')).yesapi_avatar,
					douban_id: this.commentId,
					rank: this.dialog.rank,
					comments: this.dialog.textarea,
					username: this.username,
					creatTime: new Date(),
				};
				this.$utils.http.call(this, {
					url: '/?s=App.Table.Create',
					parameter: {
						model_name: "yesapi_douban_movies",
						data: JSON.stringify(list),
					},
					success: resp => {
						this.getxxComment()
						this.dialogVisible = false;
						this.dialog.rank = 0,
							this.dialog.textarea = ""
					},
				})
			},
		}
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
		line-height: 30px
	}

	.d3 {}

	.click-span:hover {
		cursor: pointer;
	}

	.click-span {
		color: white;
	}

	.main-d1 {
		height: 200px;
		padding: 0
	}

	.main-d2 {
		width: 90%;
		margin: auto;
		height: 1000px;
		text-align: left;
	}

	.item_a {
		width: 16%;
		height: 45%;
		display: inline-block;
		margin: 0 25px 10px 0;
		cursor: pointer;
	}

	.hidden_span {
		display: inline-block;
		overflow: hidden;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
		white-space: nowrap;
		max-width: 100px;
	}

	.search_span {
		display: flex;
		margin: 4px 0px 0px 10px;
		font-size: 13px;
		color: #666666;
	}

	.search_span2 {
		color: #111;
		line-height: 18px;
		margin-left: 5px;
	}

	.rank_span {
		font-size: 28px;
		color: #494949;
	}

	.main-div {
		/* display: flex; */
		margin-top: 80px;
		border-bottom: 2px solid #E4E7ED;
	}

	.comment_div {
		border-top: 1px solid black;
		padding: 15px 0 15px 0;
		display: block;
	}

	.comment_div1 {
		padding: 15px 0 15px 0;
		display: block;
	}

	.h4 {
		background: none;
		font-size: 13px;
		height: auto;
		padding: 0;
		color: #494949;
		margin: 0 0 10px 0;
		text-align: left;
		height: 48px;
		width: 100%;
		display: flex;
	}

	.comment_img {
		width: 48px;
		height: 48px;
		border-radius: 50%;
	}

	.comment_p {
		width: 100%;
		margin: 0;
		display: flex;
		font-size: 12px;
		text-align: left;
		color: #696969;
	}
	.a_img{
		font-size: 14px;
		color: black;
		line-height: 30px;
		text-decoration: none;
		margin-left:10px
	}
	.a_img:hover {
		cursor: pointer;
		color: #FF6633;
	}
</style>
