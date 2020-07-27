export default {
	http(options) {
		/*
			1.	封装axios请求函数，实现加载配置url和不同的url
			2.	接受参数为一个对象
			3.	必传字段：url（接口地址后缀地址）
			4.	可选字段：success(成功后的回调)
			5.	可选字段：catch(失败或则接口返回错误后的回调)
			6.	可选字段：loding(生成loading加载动画，loding为需要生成loading的节点)
			7.	可选字段：serviceType(接口地址中间地址)，目前有sys和file，默认为sys
			8.	可选字段：method(请求的类型)，默认为post请求
			9.	可选字段：callback 不管成功还是失败都会回调此方法
		*/
		//获取配置的url
		let serviceUrl = 'http://hn216.api.yesapi.cn',
		obj = {app_key:'96B4B5059E3DB099C78FFA6E90182B33'};
		//获取请求
		const ServiceType = options.ServiceType;
		if (ServiceType) {
			switch (ServiceType) {
				case 'douban': 
					serviceUrl = 'https://douban.uieee.com'
					// serviceUrl = 'https://douban-api.now.sh'
					// serviceUrl = 'https://douban-api-git-master.zce.now.sh'
					// serviceUrl = 'https://douban-api.uieee.com'
					// serviceUrl = 'https://douban-api.zce.now.sh'
					// serviceUrl = 'https://api.douban.com'
					// apikey:'0df993c66c0c636e29ecbb5344252a4a'
					obj = {apikey:'0df993c66c0c636e29ecbb5344252a4a'}
			}
		}
		//获取loading
			//获取请求类型,默认为post
		const Method = options.method || "post";
		//拼接调用axios
		this.axios[Method](serviceUrl + options.url, {...options.parameter,...obj}).then(r => {
			//加载完成后判断是否有loding,有就关闭loding
			//判断接口返回是否正确,如果不正确,调用传过来的catch方法
			if (!r) {
				options.callback && options.callback()
				return options.catch && options.catch();
			}
			//一切正常调用传过来的success函数并返回数据
			options.success && options.success(r)
			options.callback && options.callback()
		}).catch(() => {
			//发生错误时关闭loading和调用catch方法
			options.catch && options.catch();
			options.callback && options.callback()
		})
	},
}


