<template>
	<div>
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
				<div style="width:95%;margin: auto;">
					<div class="main-d1">
						<el-row>
							<el-col :span="6">
								<img src="../../assets/images/logo.jpg" alt="" style="width: 180px;margin-top:20px">
							</el-col>
							<el-col :span="18">
								<el-input style="line-height: 200px;width: 50%;float: left;" placeholder="请输入电影id进行搜索" v-model="movieId"
								 @keyup.enter.native="search(movieId)">
								</el-input>
								<h3>数据来源自豆瓣电影，仅用于学习</h3>
								<h4 class="a1">发现我了？点我提交bug</h4>
							</el-col>
						</el-row>
					</div>
					<div class="main-d2">
						<el-row>
							<el-col :span="16">
								<!-- 切换首页电影种类 -->
								<div class="div_movie">
									<h3>豆瓣推荐</h3>
									<el-tabs v-model="activeName" @tab-click="handleClick">
										<el-tab-pane :label="label[index].label" :name="label[index].name" v-for="(item, index) in 4" :key="index">
											<div v-loading="loading">
												<!-- 种类分页 -->
												<div class="item_a" v-for="(item1, index1) in images.length<10?images.length:10" :key="index1" @click="search(indexId[index1])">
													<el-card :body-style="{ padding: '0px'}">
														<el-popover placement="right" title="" trigger="hover">
															<el-image slot="reference" :src="images[index1]||defaultImg" style="max-width: 150px" alt="找不到图片" fit="cover">
																<div slot="error" class="image-slot">
																	<i class="el-icon-picture-outline"></i>
																</div>
															</el-image>
															<img :src="images[index1]||defaultImg" alt="找不到图片">
														</el-popover>
														<span style="font-size: 12px;padding: 10px;" class="hidden_span" :title="title[index1]">{{title[index1] || "暂无"}}</span>
													</el-card>
												</div>
											</div>
										</el-tab-pane>
									</el-tabs>
									<el-pagination layout="prev, pager, next" :total="mtotal" @current-change="mChange"></el-pagination>
								</div>
								<div class="div_movie" v-for="(item0, index0) in active" :key="index0">
									<h3>{{movieType[index0]}}</h3>
									<el-tabs v-model="$data[item0.name]" @tab-click="handleClick1(index0)">
										<el-tab-pane :label="movieLabel[index0][index].label" :name="movieLabel[index0][index].name" v-for="(item, index) in movieLabel[index0].length"
										 :key="item">
											<div v-loading="loading1" style="min-height: 450px;">
												<div class="item_a" v-for="(item1, index1) in (movieLabel[index0][index].img.length)<10?(movieLabel[index0][index].img.length):10"
												 :key="index1" @click="search(movieLabel[index0][index].id[index1+numberChange(index0)])">
													<el-card  :body-style="{ padding: '0px'}" v-if="movieLabel[index0][index].title[index1+numberChange(index0)] != undefined">
														<el-popover placement="right" title="" trigger="hover">
															<el-image slot="reference" :src="movieLabel[index0][index].img[index1+numberChange(index0)]||defaultImg"
															 style="max-width: 150px" alt="找不到图片"></el-image>
															<img style="vertical-align:text-top;" :src="movieLabel[index0][index].img[index1+numberChange(index0)]||defaultImg" alt="找不到图片">
														</el-popover>
														<span style="font-size: 12px;padding:10px;" class="hidden_span" :title="movieLabel[index0][index].title[index1+numberChange(index0)]|| '暂无'">{{movieLabel[index0][index].title[index1+numberChange(index0)] || "暂无"}}</span>
													</el-card>
												</div>
											</div>
											<el-pagination layout="total,prev, pager, next" :total="movieLabel[index0][index].total" @current-change="MarvelChange(index0)"></el-pagination>
										</el-tab-pane>
									</el-tabs>
								</div>
								<div class="foot_div">小熊电影咨询平台</div>
							</el-col>
							<el-col :span="8">
								<div v-for="(item,index) in list" style="margin-left:50px;margin-bottom: 120px;">
									<h3 style="text-align: center;">{{list[index*2+1]}}</h3>
									<ol>
										<li style="border-bottom: 1px solid #eaeaea;height: 40px;line-height: 40px;" v-for="(item1,index1) in list[index*2]">
											<a href="javascript:void(0)" class="list_a" @click="search(list[index*2][index1].xxId)">{{list[index*2][index1].xxName}}</a>
										</li>
									</ol>
								</div>
								<div style="width: 350px;margin-bottom: 50px;margin-left:50px;" v-if="list.length>0">
									<h3 style="text-align: center;">电影瞬间</h3>
									<el-carousel height="240px">
									      <el-carousel-item v-for="(index,item) in 4" :key="item">
									        <h3>
												<img :src="nximg[index]" alt="">
											</h3>
									      </el-carousel-item>
									    </el-carousel>
								</div>
							</el-col>
						</el-row>
					</div>
				</div>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import Allminxins from '@/mixins/Allminxins.js';
	export default {
		mixins: [Allminxins],
		data() {
			return {
				active: [{
						name: 'activeName1',
					},
					{
						name: 'activeName2',
					},
					{
						name: 'activeName3',
					},
					{
						name: 'activeName4',
					},
				],
				activeName: "one",
				activeName1: "one",
				activeName2: "one",
				activeName3: "one",
				activeName4: "one",
				loading: false,
				loading1: false,
				taburl: '/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a',
				// 
				movieType: [
					"漫威系列",
					"港片经典",
					"国产经典",
					"系列电影",
				],
				label: [{
					label: "正在热映",
					name: "one"
				}, {
					label: "即将上映",
					name: "two"
				}, {
					label: "新片榜",
					name: "three"
				}, {
					label: "top250",
					name: "four"
				}],
				movieLabel: [
					[{
						label: "第一阶段",
						name: "one",
						img: "",
						title: "",
						total: 1,
					}, {
						label: "第二阶段",
						name: "two",
						img: "",
						title: "",
						total: 1,
					}, {
						label: "第三阶段",
						name: "three",
						img: "",
						title: "",
						id: "",
						total: 1,
					}],
					[{
						label: "周润发",
						name: "one",
						img: "",
						title: "",
						id: "",
						total: 1,
					}, {
						label: "成龙",
						name: "two",
						img: "",
						title: "",
						id: "",
						total: 1,
					}, {
						label: "周星驰",
						name: "three",
						img: "",
						title: "",
						id: "",
						total: 1,
					}],
					[{
						label: "黄渤",
						name: "one",
						img: "",
						title: "",
						id: "",
						total: 1,
					}, {
						label: "沈腾",
						name: "two",
						img: "",
						title: "",
						id: "",
						total: 1,
					}, {
						label: "徐峥",
						name: "three",
						img: "",
						title: "",
						id: "",
						total: 1,
					}, ],
					[{
							label: "X战警",
							name: "one",
							img: "",
							title: "",
							id: "",
							total: 1,
						}, {
							label: "叶问",
							name: "two",
							img: "",
							title: "",
							id: "",
							total: 1,
						}, {
							label: "碟中谍",
							name: "three",
							img: "",
							title: "",
							id: "",
							total: 1,
						},
						{
							label: "速度与激情",
							name: "four",
							img: "",
							title: "",
							id: "",
							total: 1,
						}, {
							label: "电锯惊魂",
							name: "five",
							img: "",
							title: "",
							id: "",
							total: 1,
						},
					]
				],
				mtotal: 1, // 首页页面电影总条数
				loginName: "", // 登录用户名
				cardData: "", // 初始页面电影数据
				movieId: "", // 电影数据id
				commentId: "", // 评论电影id
				username: "", // 用户名
				apikey: "?apikey=0df993c66c0c636e29ecbb5344252a4a", // apikey值
				douban: "https://api.douban.com", //	请求api基路径
				defaultImg: "https://img1.doubanio.com/icon/user_normal.jpg", // 默认头像
				currentPage: 1, //	初始页面
				MarvelcurrentPage1: 0,
				MarvelcurrentPage2: 0,
				MarvelcurrentPage3: 0,
				MarvelcurrentPage4: 0,
				list:[],
				nximg:[
					"https://img1.doubanio.com/view/movie_gallery_frame_hot_rec/normal/public/fb0ee7857032ee7.jpg",
					"https://img1.doubanio.com/view/movie_gallery_frame_hot_rec/normal/public/d6549ffc78cd279.jpg",
					"https://img3.doubanio.com/view/movie_gallery_frame_hot_rec/normal/public/02c55e19b588a00.jpg",
					"https://img3.doubanio.com/view/photo/l/public/p2159540091.webp",
					"https://img1.doubanio.com/view/movie_gallery_frame_hot_rec/normal/public/fb0ee7857032ee7.jpg",
				]
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
			title() {
				let Ary = [];
				if (this.cardData == "") return Ary
				this.cardData.forEach((val, index, arr) => {
					Ary.push(val.title)
				});
				return this.cardData ? Ary : "";
			},
			images() {
				let Ary = [];
				if (this.cardData == "") return Ary
				this.cardData.forEach((val, index, arr) => {
					Ary.push(val.images.small)
				});
				return this.cardData ? Ary : "";
			},
			indexId() {
				let Ary = [];
				if (this.cardData == "") return Ary
				this.cardData.forEach((val, index, arr) => {
					Ary.push(val.id)
				});
				return this.cardData ? Ary : "";
			},
		},
		created() {
			this.card(this.taburl);
			this.Marvelmovie("第一阶段");
			this.Marvelmovie("周润发");
			this.Marvelmovie("黄渤");
			this.Marvelmovie("X战警");
			this.listMovie("悬疑片");
			this.listMovie("日本动漫");
			this.listMovie("DC系列");
			this.listMovie("喜剧片");
			this.loginName = sessionStorage.getItem('username');
			this.username = sessionStorage.getItem('info') ? JSON.parse(sessionStorage.getItem('info')).yesapi_nickname : "";
		},
		methods: {
			// 搜索
			search(id) {
				this.$router.push({
					 path: '/subject', query: {id: id}
				})
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
			// 初始页面分页切换
			mChange(val) {
				this.currentPage = val;
				let parameter = {
					start: 10 * (this.currentPage - 1),
					count: 10 * this.currentPage,
				}
				this.card(this.taburl, parameter)
			},
			numberChange(val) {
				return this['MarvelcurrentPage' + Number(val + 1)]
			},
			//	小熊电影页面分页切换
			MarvelChange(val) {
				this['MarvelcurrentPage' + Number(val + 1)] = (event.target.innerHTML - 1) * 10;
			},
			//	页面初始加载电影数据
			card(obj, parameter) {
				this.loading = true;
				this.$http.jsonp(this.douban + obj, {
						params: { ...parameter
						}
					})
					.then(resp => {
						this.loading = false;
						this.cardData = resp.data.subjects;
						this.mtotal = resp.data.total || 10
					})


				// this.$utils.http.call(this, {
				// 	url: obj,
				// 	method: "post",
				// 	ServiceType: 'douban',
				// 	parameter: {
				// 		start: 0,
				// 		count: 999,
				// 	},
				// 	success: resp => {
				// 		this.loading = false;
				// 		this.cardData = resp.data.subjects;
				// 	},
				// })
			},

			//	左侧电影
			Marvelmovie(obj) {
				// this.loading1 = true;
				this.$utils.http.call(this, {
					url: '/?s=App.Table.GetMoreDataByMoreField',
					parameter: {
						model_name: "xxMovie",
						field_name_list: "xxType",
						field_value_list: obj,
					},
					success: resp => {
						// this.loading1 = false;
						let Data = this.movieLabel;
						let Ary = [],
							Ary2 = [],
							Ary3 = [],
							total = 1;
						resp.data.data.items.forEach((val, index, arr) => {
							Ary.push(val.xxImg)
							Ary2.push(val.xxName)
							Ary3.push(val.xxId)
						});
						total = resp.data.data.items.length
						for (let i = 0, len = Data.length; i < len; i++) {
							for (let j = 0, len1 = Data[i].length; j < len1; j++) {
								if (obj == Data[i][j].label) {
									Data[i][j].img = Ary
									Data[i][j].title = Ary2
									Data[i][j].id = Ary3
									Data[i][j].total = total
								}
							}
						}
					},
				})
			},
			//	右侧电影
			listMovie(obj) {
				this.$utils.http.call(this, {
					url: '/?s=App.Table.GetMoreDataByMoreField',
					parameter: {
						model_name: "xxMovie",
						field_name_list: "xxType",
						field_value_list: obj,
					},
					success: resp => {
						this.list.push(resp.data.data.items,obj)
					},
				})
			},
			xxmovieType(index) {
				return this["label" + (index + 1)];
			},
			// 切换电影表单
			handleClick(tab, event) {
				if (tab.name === "one") {
					this.taburl = "/v2/movie/in_theaters" + this.apikey
				} else if (tab.name === "two") {
					this.taburl = "/v2/movie/coming_soon" + this.apikey
				} else if (tab.name === "three") {
					this.taburl = "/v2/movie/new_movies" + this.apikey
				} else if (tab.name === "four") {
					this.taburl = "/v2/movie/top250" + this.apikey
				}
				this.card(this.taburl)
			},
			handleClick1(val) {
				this['MarvelcurrentPage' + Number(val + 1)] = 0
				this.Marvelmovie(event.target.innerHTML)
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
		width: 17%;
		height: 50%;
		display: inline-block;
		margin: 0 15px 10px 0;
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

	.div_movie {
		min-height: 500px;
	}
	.foot_div{
		color: #999;
		font-size: 14px;
		margin-top:50px;
		height: 50px;
		line-height: 50px;
	}
</style>
