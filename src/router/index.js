import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login/login.vue'
import Register from '../components/login/register.vue'

Vue.use(VueRouter)


const router = new VueRouter({
	mode: 'history',
	routes: [{
			path: '/register',
			name: 'Register',
			component: Register,
		},
		{
			path: '/login',
			name: 'Login',
			component: Login,
		},
		{
			path: '/',
			name: 'Login',
			component: Login,
		},
		{
			path: '/index',
			name: 'index',
			component: () => import('../components/index/index.vue')
		},
		{
			path: '/admin',
			name: 'admin',
			component: () => import('../components/admin/admin.vue')
		},
		{
			path: '/subject',
			name: 'searchMovie',
			component: () => import('../components/index/searchMovie.vue')
		},
		{
			path: '/agreement',
			component: () => import('../components/login/agreement.vue')
		},
		{
			path: '/privacy',
			component: () => import('../components/login/privacy.vue')
		},
		{
			path: '/fpassword',
			component: () => import('../components/password/fpassword.vue')
		},
		{
			path: '/cpassword',
			component: () => import('../components/password/cpassword.vue')
		},
		{
			path: '/userinfo',
			component: () => import('../components/index/userinfo.vue')
		},
		{
		    path: '*', // 页面不存在的情况下会跳到404页面
			component:() => import('../components/404.vue')
		  }
	]
})

router.beforeEach((to, from, next) => {
	if (to.path == '/userinfo') {
		let token = sessionStorage.getItem('token')
		token ? next() : next('/login')
	} else if (to.path == '/admin') {
		let role = sessionStorage.getItem('role')
		role ? next() : next('/login')
	} else {
		next()
	}
})

export default router
