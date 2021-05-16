import Vue from 'vue'
import App from './App'

/*阻止启动生产消息*/
Vue.config.productionTip = false

/*全局使用laugh request*/
import {http} from '@/common/api/server.js'
Vue.prototype.$http = http

/*自定义$showmodal*/
import customModal from './common/utils/modal.js'
Vue.use(customModal)

/*api集中管理*/
import * as api from '@/common/api'
Vue.prototype.$api = api

/*uViewUI组件*/
import uView from 'uview-ui';
Vue.use(uView);


/*vuex状态管理器*/
import Vuex from 'vuex'
import store from './store'
Vue.prototype.$store = store

/*缓存工具*/
import '@/common/utils/storage'

/*H5对齐Api*/
import '@/common/js_sdk/ican-H5Api/ican-H5Api'

import mixin from "@/common/mixins/index.js"

Vue.use(mixin)

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
