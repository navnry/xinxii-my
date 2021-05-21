import Vue from 'vue'
import {http} from '@/common/api/server.js'
let _this = new Vue()

export default {
	validateStep2: {
		name: [{
			required: true,
			message: '请输入姓名',
			trigger: 'blur,change'
		}, {
			validator: (rule, value, callback) => {
				return _this.$u.test.chinese(value)
			},
			message: '仅支持中文姓名'
		}, {
			min: 2,
			message: '姓名至少两个字'
		}],
		
		idCardNo: [{
			required: true,
			message: '请输入证件号码',
			trigger: 'blur,change'
		}, {
			validator: (rule, value, callback) => {
				console.log(value)
				return _this.$u.test.idCard(value)
			},
			message: '请输入正确的证件号码'
		},{
			asyncValidator: (rule, value, callback) => {
				http.post('/member/qualification/verifyIdentity.do', {licenseNumber: value}).then(res => {
					if (!res.success) {
						callback(new Error(res.description))
					} else {
						callback()
					}
				})
			},
		}]
	}
}
