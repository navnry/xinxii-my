import Vue from 'vue'
import Request from '@/common/libs/luch-request/index.js'
const http = new Request()
let _this = new Vue()
import store from '@/store'

/* 设置全局配置 */
http.setConfig((config) => {
	
	//测式服务器
	config.baseURL = 'https://dev.xinxiichina.com/mobile/'
	
	//正式服务器
	// config.baseURL = 'https://www.xinxiichina.com/mobile/'

	config.header = {
		...config.header,
		'Content-Type': 'application/x-www-form-urlencoded; multipart/form-data; charset=utf-8'
	}

	return config
})

/* 请求之前拦截器。可以使用async await 做异步操作 */
http.interceptors.request.use((config) => {
	config.header = {
		...config.header,
	}
	let userInfo = _this.$storage.get('userInfo')
	
	if (userInfo && userInfo.token) {
		config.header.Authorization = userInfo.token
	}
	console.log(config)
	return config
}, (config) => {
	return Promise.reject(config)
})


/* 请求之后拦截器。可以使用async await 做异步操作  */
http.interceptors.response.use(async (response) => {
	return response.data
}, (response) => { // 请求错误做点什么。可以使用async await 做异步操作
	uni.hideLoading()
	if (response.statusCode == 401) {
		store.commit('LOGOUT')
		let pages = getCurrentPages()
		if (pages.length > 0) {
			store.commit('LOGIN_BACK_ROUTE', pages[pages.length - 1].route)
		}
		uni.showToast({
			title: '登录失效，请重新登录',
			icon: 'none'
		})
		return response
	}
	uni.showToast({
		title: '服务器开小差了，请稍后重试',
		icon: 'none'
	})
	return Promise.reject(response)
})

export {
	http
}
