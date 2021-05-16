import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let _this = new Vue()
import '@/common/utils/storage'

const store = new Vuex.Store({
	state: {
		userInfo: {},
		isLogin: false,
		configInfo: {},
		message:{}
	},
	mutations: {
		//登录
		LOGIN: (state, data) => {
			state.isLogin = true
			state.userInfo = data
			_this.$storage.set("userInfo", data)
			// uni.setStorageSync("userInfo", data)
		},
		//退出登录
		LOGOUT: (state) => {
			state.isLogin = false
			state.userInfo = {}
			_this.$storage.remove("userInfo")
			// uni.removeStorageSync('userInfo')
		},
		//登录成功后跳转
		LOGIN_BACK_ROUTE: (state, data) => {
			state.loginBackRoute = data
		},
		//保存配置信息
		SET_CONFIGINFO: (state, data) => {
			state.configInfo = data
			_this.$storage.set("configInfo", data)
		},
		SET_MESSAGE:(state,data)=>{
			state.message = data
			_this.$storage.set("message", data)
		}
	},
	actions: {
		afterLogin: ({
			state
		}) => {
			console.log(state.loginBackRoute + '_______loginBackRoute')
			if (state.loginBackRoute) {
				if (['pages/home/index', 'pages/product/index', 'pages/train/index', 'pages/my/index'].indexOf(state.loginBackRoute
						.split('?')[0]) < 0) {
					let pages = getCurrentPages()
					console.log(pages)
					let hasRoute = false
					for (let i = pages.length - 1; i >= 0; i--) {
						if (pages[i].route === state.loginBackRoute) {
							uni.navigateBack({
								delta: pages.length - i - 1
							})
							hasRoute = true
							break
						}
					}
					if (!hasRoute) {
						uni.redirectTo({
							url: '/' + state.loginBackRoute
						})
					}
				} else {
					uni.switchTab({
						url: '/' + state.loginBackRoute
					})
				}
			} else {
				uni.switchTab({
					url: '/pages/my/index'
				})
			}
		},
		messageRead:({state},item)=>{
			
		}
	}
})

export default store
