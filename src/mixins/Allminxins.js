export default {
	data() {
		const checkYzm = (rule, value, callback) => {
			if (!value) {
				callback(new Error('验证码不能为空'));
			} else {
				callback();
			}
			callback();
		};
		const checkEmail = (rule, value, callback) => {
			var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
			if (!reg.test(value)) {
				callback(new Error('邮箱输入有误'));
			} else {
				callback();
			}
			callback();
		};
		const checkPass = (rule, value, callback) => {
			var reg = /^(\w|[~!@#$%^&*()_+`\-={}:";'<>?,.\/]){6,16}$/;
			if (value === '') {
				callback(new Error('请输入密码'));
			} else if (!reg.test(value)) {
				callback("密码长度在6到16位");
			}
			callback();
		};
		const checkUser = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入账号'));
			} else if (value.length < 6 || value.length > 24) {
				callback("账号长度在6到24位");
			}
			callback()
		};
		const checkEmpty = (rule, value, callback) => {
			if ((!value || value.length < 1) && value !== 0) {
				callback(new Error('请填写此字段'));
			} else {
				callback();
			}
		}
		let maxTime	= ""
		let minTime	= ""
		return {
			multipleSelection: "",
			dialogVisible: false,
			dialogTitle: "",
			pickerOptions: {
				shortcuts: [{
					text: '最近一周',
					onClick(picker) {
						const end = new Date();
						const start = new Date();
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
						picker.$emit('pick', [start, end]);
					}
				}, {
					text: '最近一个月',
					onClick(picker) {
						const end = new Date();
						const start = new Date();
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
						picker.$emit('pick', [start, end]);
					}
				}],
				onPick(obj) {
					if(!obj.maxDate){
						minTime = obj.minDate.getTime();
						maxTime = obj.minDate.getTime() + 3600 * 1000 * 24 * 6
					}else{
						minTime = "";
						maxTime = ""
					}
				},
				disabledDate(time) {
					if(minTime && maxTime){
						return time<minTime || time>maxTime
					}
				},
			},
			YzmRules: [{
				validator: checkYzm,
				trigger: 'blur',
			}],
			EmailRules: [{
				validator: checkEmail,
				trigger: 'blur',
			}],
			PassRules: [{
				validator: checkPass,
				trigger: 'blur',
			}],
			UserRules: [{
				validator: checkUser,
				trigger: 'blur',
			}],
			FormRules: [{
				validator: checkEmpty,
				trigger: 'blur',
			}],
		}
	},
	created() {},
	computed: {
		dheight() {
			return {
				height: document.documentElement.clientHeight + "px"
			}
		},
		tableHeight() {
			return document.body.clientHeight - 190
		}
	},
	methods: {
		//	时间戳转换成日期格式
		formatDate(now) {
			let year = now.getFullYear(); //取得4位数的年份
			let month = now.getMonth() + 1; //取得日期中的月份，其中0表示1月，11表示12月
			let date = now.getDate(); //返回日期月份中的天数（1到31）
			let hour = now.getHours(); //返回日期中的小时数（0到23）
			let minute = now.getMinutes(); //返回日期中的分钟数（0到59）
			let second = now.getSeconds(); //返回日期中的秒数（0到59）
			return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
		},
		handlePickerDate(e) {
		},
		handleClickRow(row) {
			this.$refs.table.toggleRowSelection(row)
		},
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		limit(Data, callback) {
			if (Data == undefined || Data.length == 0) return this.$message.warning("请选择一条数据")
			if (Data.length > 1) return this.$message.warning("同时只能操作一条数据")
			callback && callback();
		},
		setData(Data, formName, callback) {
			if (this[formName]) {
				const Ary = Object.keys(this[formName]);
				for (let i = 0, len = Ary.length; i < len; ++i) this[formName][Ary[i]] = Data[0][Ary[i]] || "";
				this.$refs[formName] && this.$refs[formName].clearValidate();
			}
			callback && callback();
		},
		// 个人信息页面跳转
		userinfo() {
			this.$router.push('/userinfo')
			// let routeUrl = this.$router.resolve({
			// 	path: "/userinfo",
			// });
			// window.open(routeUrl.href, '_blank');
		},
		goRegister() {
			this.$router.push('/register')
		},
		goLogin() {
			this.$router.replace('/login')
		},
		goIndex() {
			sessionStorage.getItem('role') == "admin" ? this.$router.push('/admin') : this.$router.push('/index')
		},
		goAgree() {
			this.$router.push('/agreement')
		},
		goPrivacy() {
			this.$router.push('/privacy')
		},
		Fpassword() {
			this.$router.push('/fpassword')
		},
		Cpassword() {
			this.$router.push('/cpassword')
		},
	},
}
