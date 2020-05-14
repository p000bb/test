//	管理员页面内容区

const Load = [{
	title: "用户列表",
	name: '用户信息',
	content: resolve => require(['./admin/user.vue'], resolve)
},
{
	title: "注册统计",
	name: '统计信息',
	content: resolve => require(['./admin/registerSum.vue'], resolve)
},
{
	title: "登录统计",
	name: '统计信息',
	content: resolve => require(['./admin/loginSum.vue'], resolve)
},
{
	title: "最近登陆",
	name: '统计信息',
	content: resolve => require(['./admin/newLogin.vue'], resolve)
},{
	title: "用户评论",
	name: '电影信息',
	content: resolve => require(['./admin/userComment.vue'], resolve)
},{
	title: "小熊电影",
	name: '电影信息',
	content: resolve => require(['./admin/movieInfo.vue'], resolve)
},{
	title: "接口流量",
	name: '统计信息',
	content: resolve => require(['./admin/sum.vue'], resolve)
}]

export default Load
