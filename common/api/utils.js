// 获取配置信息
export function getConigInfo(vue, cb) {
	vue.$http.post('/system/config/findByCode.do', {code: 'findByCode'}).then(res => {
		if (res.success) {
			vue.$store.commit('SET_CONFIGINFO', res.data)
			cb && cb(res.data)
		}
	})
}

//获取消息
export function getAllNewMsg(vue, cb) {
	vue.$http.post('/member/message/getAllNewMsg.do').then(res => {
		if (res.success) {
			vue.$set(res.data,'unread',res.data.marketingMsgNum + res.data.orderMsgNum + res.data.productMsgNum + res.data.sysMsgNum)
			vue.$store.commit('SET_MESSAGE', res.data)
			cb && cb(res.data)
		}
	})
}
