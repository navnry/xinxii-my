import Vue from 'vue'
import {
	http
} from '@/common/api/server.js'


export const getConigInfo = (code) => {
	return http.post('/system/config/findByCode.do', {
		code: 'findByCode'
	})
}

//获取验证码
export const getCode = (phone, type = '1') => {
	return http.post('/verifyCode/verifyCode/encrypt/getCode.do', {
		phone: phone,
		type: type
	})
}


//手机验证码登陆
export const codeLogin = (params) => {
	return http.post('/member/login/mobileLogin.do', params)
}

//账号密码登陆
export const passwordLogin = (params) => {
	return http.post('/member/login/login.do', params)
}


export const homeBanner = () => {
	return http.get('/ad/ad/list.do', {
		params: {
			adPos: 6
		}
	})
}


/**
 * 朋友圈tab
 */
export const friendTypeList = () => {
	return http.get('/dynamic/dynamic/typeList.do')
}


/**
 * 朋友圈
 * @param {Object} params - 查询参数  
 */
export const friendPoster = (params) => {
	return http.get('/dynamic/dynamic/list.do', {
		params
	})
}

//朋友圈列表
export const friendList = (params) => {
	return http.get('/dynamic/dynamic/list.do', {
		params
	})
}

//拓业海报
export const expandList = (params) => {
	return http.get('/file/poster/list.do', {
		params
	})
}

/**
 * 文章tab
 * 频道类型:news新闻，knowledge知识课堂，start今日之星
 */
export const newsTab = (type = 'knowledge') => {
	return http.get('/channel/channel/listAll.do', {
		params: {
			type
		}
	})
}

//文章列表
export const newsList = (params) => {
	return http.get('/article/article/list.do', {
		params
	})
}

//文章详情
export const newsDetail = (id) => {
	return http.get('/article/article/getDetails.do?id=' + id)
}

//获取供应商列表
export const producerList = (params) => {
	return http.get('/ptr/producer/list.do', {
		params
	})
}

//分页查询轮播文字信息列表
export const noticeList = (params) => {
	return http.get('/ad/ad/text/list.do', {
		params
	})
}

//获取首页推荐6款产品
export const recProductList = (params) => {
	return http.get('/pdc/product/recommendList.do', {
		params
	})
}

//获取产品左侧标签
export const productTagList = (params) => {
	return http.get('/pdc/product/tagList.do', {
		params
	})
}

//获取产品覆盖人群列表

export const productCoverList = (params) => {
	return http.get('/pdc/product/coveredList.do', {
		params
	})
}

/**
 * 获取产品列表
 * producerId	供应商编号
 * tagIds		标签编号 ， 多个标签用“,”隔开
 * name			产品名称
 * pageSize		页面大小
 * pageNo		页号
 * coveredIds	覆盖人群编号，多个用“,”隔开
 * isRecommend	首页传“1”
 */
export const productList = (params) => {
	return http.get('/pdc/product/list.do', {
		params
	})
}

//获取产品详情
export const productDetail = (id) => {
	return http.get('/pdc/product/detailNew.do?productId=' + id)
}


//保费试算表单数据
export const reckonData = (id) => {
	return http.get('/pdc/product/toFrom.do?productId=' + id)
}

//动态获取试算内容
export const reckonChangeData = (params) => {
	return http.post('pdc/product/premium.do', params)
}




//每日焦点-获取最近的一组
export const focusData = () => {
	return http.get('/daily/focus/getFocusLately.do')
}

// 每日焦点-获取近七期
export const focusList = () => {
	return http.get('/daily/focus/getFocusSeven.do')
}


// 增员认证历史记录
export const recruitHistory = (params) => {
	return http.get('/member/certification/verified.do', {
		params
	})
}

// insure/order/myOrderList.do

//获取订单
export const orderList = (params) => {
	return http.post('/insure/order/myOrderList.do', {
		params
	})
}

//获取订单详情
export const orderDetail = (id) => {
	return http.post('/insure/order/myOrderDetail.do?id=' + id)
}



// 获取热门搜索关键词
export const hotSearchWords = (type = 'hotSearch') => {
	return http.get('/system/dict/getDictByType.do?type=' + type)
}

// // 获取搜索结果
// export const searchResult = (type = 'hotSearch') => {
// 	return http.get('/system/dict/getDictByType.do?type' + type)
// }

//文章搜索
export const articleSearch = (params) => {
	return http.get('/article/article/search.do', {
		params
	})
}

// 搜索产品
export const productSearch = (params) => {
	return http.get('/pdc/product/search.do', {
		params
	})
}
