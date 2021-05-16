import Vue from "vue"
import Storage from "uni-local-storage"
Vue.use(Storage, {
	name: "storage",
})
const options = {
	version: '1.0.0',
	namespace: "__xinxii__"
}

export default new Storage(options)
