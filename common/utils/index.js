/**
 * getUrlParam 获取页面路径对应参数
 * @param  name 字段名
 * @return 目标值 
 */

export function getUrlParam(name) {
	let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)") //构造一个含有目标参数的正则表达式对象
	let r = window.location.search.substr(1).match(reg) //匹配目标参数
	if (r != null) return unescape(r[2])
	return null //返回参数值
}


/**
 * [formatTime 格式化时间戳]
 * @param  {[type]} time [时间戳]
 * @param  {[type]} fmt  [显示的模板,eg. 'YYYY/MM/DD/HH:mm:ss']
 * @return {[type]}      [description]
 */
export function formatTime(time, fmt = 'yyyy-MM-dd hh:mm') {
	if (!time) return ''
	time = new Date(time)
	let o = {
		'M+': time.getMonth() + 1, // 月份
		'd+': time.getDate(), // 日
		'h+': time.getHours(), // 小时
		'm+': time.getMinutes(), // 分
		's+': time.getSeconds(), // 秒
		'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
		'S': time.getMilliseconds() // 毫秒
	}
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
	for (let k in o) {
		if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((
			'00' + o[
				k]).substr(('' + o[k]).length)))
	}
	return fmt
}
//身份证验证
export function IdentityCodeValid(code) {
	let city = {11: '北京',12: '天津',13: '河北',14: '山西',15: '内蒙古',21: '辽宁',22: '吉林',23: '黑龙江',31: '上海',32: '江苏',33: '浙江',34: '安徽',35: '福建',36: '江西',37: '山东',41: '河南',42: '湖北',43: '湖南',44: '广东',45: '广西',46: '海南',50: '重庆',51: '四川',52: '贵州',53: '云南',54: '西藏',61: '陕西',62: '甘肃',63: '青海',64: '宁夏',65: '新疆',71: '台湾',81: '香港',82: '澳门',91: '国外'}
	let tip = ''
	let pass = true
	if (!code || !
		/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/i
		.test(code)) {
		tip = '身份证号格式错误'
		pass = false
	} else if (!city[code.substr(0, 2)]) {
		tip = '地址编码错误'
		pass = false
	} else {
		//18位身份证需要验证最后一位校验位
		if (code.length === 18) {
			code = code.split('')
			//∑(ai×Wi)(mod 11)
			//加权因子
			let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
			//校验位
			let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
			let sum = 0
			let ai = 0
			let wi = 0
			for (let i = 0; i < 17; i++) {
				ai = code[i]
				wi = factor[i]
				sum += ai * wi
			}
			let last = parity[sum % 11]
			if (parity[sum % 11] != code[17]) {
				tip = '校验位错误'
				pass = false
			}
		}
	}
	return pass
}
/**
 * [lastDateTime 格式化时间为和当前比较时间]
 * @param  {[type]} time [时间戳]
 * @return {[type]}      [description]
 */
export function lastDateTime(time) {
	if (!time) return ''
	let newDate = new Date()
	const cd = newDate.getTime() - time
	let ret = ''
	if (cd < 60000) {
		ret = '刚刚'
	} else if (cd < 3600000) {
		ret = Math.ceil(cd / 60000) + '分钟前'
	} else if (cd < 86400000) {
		ret = Math.round(cd / 3600000) + '小时前'
	} else if (cd < 259200000) {
		ret = Math.round(cd / 86400000) + '天前'
	} else {
		ret = formatTime(time)
	}
	return ret
}
// 截取字符串长度
export function subString(str, length) {
	let returnStr = ''
	if (typeof str !== 'string') {
		return ''
	}
	if (str.length > length) {
		returnStr = str.slice(0, length) + '...'
	} else {
		returnStr = str
	}
	return returnStr
}
// 隐藏手机号中间4位
export function formatPhone(phone) {
	if (phone && phone.length >= 11) {
		return phone.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
	} else {
		return ''
	}
}
export function login() {
	return new Promise((resolve, reject) => {
		uni.login({
			provider: 'weixin',
			success(res) {
				console.log(res)
				if (res.code) {
					resolve(res.code)
				} else {
					resolve('')
				}
			}
		})
	})
}

export function checkLogin(store) {
	return new Promise((resolve, reject) => {
		uni.checkSession({
			success() {
				resolve(true)
			},
			fail() {
				store.commit('LOGOFF')
				resolve(false)
			}
		})
	})
}
// 验证手机号
export function checkPhone(phone) {
	if (!phone) return false
	if (/^1\d{10}$/.test(phone)) {
		return true
	} else {
		return false
	}
}


// 参数转成get方式
export function concatParams(params) {
	let paramsStr = ''
	for (let k in params) {
		paramsStr += k + '=' + params[k] + '&'
	}
	paramsStr = '?' + paramsStr.substr(0, paramsStr.length - 1)
	return paramsStr
}

export function formatStorage(arr, name, key) { // 处理搜索历史记录
	let flag = true
	let list = [...arr]
	if (list) {
		list.forEach((val, index) => {
			if (val == name) {
				flag = false
				list.splice(index, 1)
				list.unshift(val)
			}
		})
	}
	if (flag) list.unshift(name)
	uni.setStorage({
		key: key,
		data: JSON.stringify(list),
	});
}

export function startWgt(vue, data) {
	//注意：服务器的热更新版本号必需大于本地wgt版本号
	//http://192.168.50.201/update.wgt,
	let topIconPath = plus.io.convertLocalFileSystemURL(vue.iconRootPath) + "/pages/static/upload_bg.png";
	//第一步要获取本地的wgt版本号；
	const upDater = uni.requireNativePlugin("CL-UpDater");
	let options = {
		title: "更新提示",
		con: data.remarks,
		downUrl: data.file,
		hidCancelbtn: false,
		btnBgColor: "#ff5000",
		topImgBg: topIconPath //除非需要自定义头部logo，否则不需要传;
	}

	//第一步创建文件下载路径，并创建文件;
	plus.io.requestFileSystem(plus.io.PUBLIC_DOWNLOADS, function(fobject) {
		//设置文件下载根路径;	
		let rootPath = fobject.root.fullPath;
		upDater.wgtUpdate(options, rootPath, result => {
			if (result) {
				var pathNew = plus.io.convertAbsoluteFileSystem(result);
				plus.runtime.install(pathNew, {
					force: false
				}, function() {
					//进行重新启动;
					plus.runtime.restart()
				}, (e) => {
					vue.showToast('安装升级包失败' + JSON.stringify(e))
				})
			}
		}, () => {
			console.log("弹框关闭了");
		})
	})
}
export function checkUpdateApp(vue, isClick = false, type) {
	let version = null
	plus.runtime.getProperty(plus.runtime.appid, function(wgtinfo) {
		version = wgtinfo.version
	})
	let appSource = 'Android'
	if (uni.getSystemInfoSync().platform === 'ios') {
		appSource = 'ios'
	}
	console.log(appSource);
	vue.$api.get('member/login/getNewVersion.do?type=' + appSource).then(res => {
		console.log(res);
		// const upDater=uni.requireNativePlugin("CL-UpDater")
		if (res.success) {
			if (compareVersion(res.data.versionNumber, version) <= 0) {
				if (!isClick) return
				vue.showToast('已是最新版本')
				return
			}
			if (res.data.rangeType == 1) {
				uni.showModal({
					title: '更新提示',
					content: res.data.remarks.replace(/<br>/g, "\n"),
					success: (ee) => {
						if (ee.confirm) {
							// let url = res.data.file
							let url =
								'https://sj.qq.com/myapp/detail.htm?apkName=com.xinxii.broker&info=A550F3239B0B2DCB97C45AF5ACDFADC7'
							if (appSource == 'ios') {
								url =
									'https://apps.apple.com/cn/app/%E7%A6%A7%E5%B0%8F%E4%BF%9D/id1531454953'
							}
							plus.runtime.openURL(url)
						}
					}
				})
			} else if (res.data.rangeType == 2) {
				startWgt(vue, res.data)
			}
		}
	})
}
// 判断两个版本号谁大
// compareVersion('1.2.4', '1.1.5') // 1
// compareVersion('1.2', '1.10.5') // -1
// compareVersion('1.00.03', '1.0.03') // 0
export function compareVersion(version1, version2) {
	const arr1 = version1.split('.')
	const arr2 = version2.split('.')
	const length1 = arr1.length
	const length2 = arr2.length
	const minlength = Math.min(length1, length2)
	let i = 0
	for (i; i < minlength; i++) {
		let a = parseInt(arr1[i])
		let b = parseInt(arr2[i])
		if (a > b) {
			return 1
		} else if (a < b) {
			return -1
		}
	}
	if (length1 > length2) {
		for (let j = i; j < length1; j++) {
			if (parseInt(arr1[j]) != 0) {
				return 1
			}
		}
		return 0
	} else if (length1 < length2) {
		for (let j = i; j < length2; j++) {
			if (parseInt(arr2[j]) != 0) {
				return -1
			}
		}
		return 0
	}
	return 0
}

/**
 * appSource 判断APP系统
 */
export function appSource() {
	if (uni.getSystemInfoSync().platform === 'ios') {
		return 'ios'
	} else {
		return 'android'
	}
}

export function formatMin(time) {
	if (time) {
		let m = Math.floor(time / 60)
		let s = time % 60
		console.log(m, s)
		if (m > 0 && s > 0) {
			return (m >= 10 ? m : '0' + m) + ':' + (s >= 10 ? s : '0' + s)
		} else if (m > 0) {
			return m >= 10 ? m : '0' + m
		} else {
			return s + '秒'
		}
	} else {
		return ''
	}
}

export function jPush(str) {
	if (str.type == 1) { // 内部
		// "subType","二级分类:4-系统通知，24-营销活动,25-产品动态,26-订单消息"
		if (str.subType == 4) {
			uni.navigateTo({
				url: '/pages/message/systemnotice?num=1'
			})
		} else if (str.subType == 24) {
			uni.navigateTo({
				url: '/pages/message/marketing?num=1'
			})
		} else if (str.subType == 25) {
			uni.navigateTo({
				url: '/pages/message/productstatus?num=1'
			})
		} else if (str.subType == 26) {
			uni.navigateTo({
				url: '/pages/order/orderdetail?id=' + str.id
			})
		}
	} else if (str.type == 2) { // 外部
		uni.navigateTo({
			url: '/pages/my/webview?url=' + str.url
		})
	}
}

/**
 * [chooseImage 上传图片]
 * @param  {[url]}  地址
 * @param  {[key]}  后台接口KEY
 * @param  {[token]}  token
 * @param  {[success]}  成功回调
 * @return {[type]}      [description]
 */
export function uploadImage(url, key, count = 1, token, success, fail) {
	let loadBusy = false
	if (loadBusy) return
	loadBusy = true
	setTimeout(() => {
		loadBusy = false
	}, 2000)
	uni.chooseImage({
		count: count, //默认9
		sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
		sourceType: ['camera', 'album'],
		success: res => {
			const tempFilePaths = res.tempFilePaths;
			uni.showLoading({
				title: '上传中',
				mask: true
			})
			for (var i = 0; i < tempFilePaths.length; i++) {
				let uploadTask = uni.uploadFile({
					url,
					filePath: res.tempFilePaths[i],
					name: 'file',
					header: {
						Authorization: token
					},
					formData: {
						key: key
					},
					success: res => {
						let data = JSON.parse(res.data)
						success && success(data)
						uni.hideLoading()
					},
					fail: error => {
						uni.hideLoading()
						fail && fail()
						console.log(error)
					}
				})
			}
		}
	})
}


/**
 * [downloadFile 打开文档]
 * @param  {[url]}  文件地址地址
 */
export function downloadFile(url) {
	uni.showLoading({
		title: '加载中'
	})
	const downloadTask = uni.downloadFile({
		url,
		success: (res) => {
			console.log(res);
			uni.hideLoading()
			if (res.statusCode == 200) {
				let filePath = res.tempFilePath
				uni.openDocument({
					filePath,
					success: (res) => {
						console.log(res);
						console.log('打开文档成功')
					},
					fail: (err) => {
						console.log(err);
					}
				})
				// uni.saveFile({
				//     tempFilePath,
				//     success:  (res) => {
				//         console.log(res);
				//         uni.openDocument({
				//             filePath: res.savedFilePath,
				//             success: (res) => {
				//                 console.log('打开文档成功')
				//             },
				//             fail: (err) => {
				//                 console.log(err);
				//             }
				//         })
				//     }
				// })
			}
		},
		fail: (err) => {
			console.log(err);
			uni.hideLoading()
			this.showToast('文件下载失败')
		}
	})
	// downloadTask.onProgressUpdate((res) => {
	//     this.percent = res.progress
	//     // console.log('下载进度' + res.progress);
	//     // console.log('已经下载的数据长度' + res.totalBytesWritten);
	//     // console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
	// })
}

/**
 * 输入日期获取年龄
 * @param {Object} strBirthday 出生日期，格式为"1990-01-01"
 */
export function getAge(strBirthday) {
	if (!strBirthday) return ''
	var returnAge,
		strBirthdayArr = strBirthday.split("-"),
		birthYear = strBirthdayArr[0],
		birthMonth = strBirthdayArr[1],
		birthDay = strBirthdayArr[2],
		d = new Date(),
		nowYear = d.getFullYear(),
		nowMonth = d.getMonth() + 1,
		nowDay = d.getDate();
	if (nowYear == birthYear) {
		returnAge = 0; //同年 则为0周岁
	} else {
		var ageDiff = nowYear - birthYear; //年之差
		if (ageDiff > 0) {
			if (nowMonth == birthMonth) {
				var dayDiff = nowDay - birthDay; //日之差
				if (dayDiff < 0) {
					returnAge = ageDiff - 1;
				} else {
					returnAge = ageDiff;
				}
			} else {
				var monthDiff = nowMonth - birthMonth; //月之差
				if (monthDiff < 0) {
					returnAge = ageDiff - 1;
				} else {
					returnAge = ageDiff;
				}
			}
		} else {
			returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
		}
	}
	// console.log(returnAge)
	return returnAge; //返回周岁年龄
}

/**
 * 跟据当前时间计算是否在周岁范围
 * @param {Object} age 输入的是年
 */





/**
 * 计算限制日期
 * @param {year} year 周岁 
 * @param {state} state 'end'计算结束 'start'计算开始
 */
export function setLimitTime(year, state = 'end') {
	var time = new Date();
	time.setFullYear(time.getFullYear() - year);
	var y;
	state == 'start' ? y = time.getFullYear() - 1 : y = time.getFullYear()
	var m = time.getMonth() + 1;
	var d = time.getDate();
	m < 10 ? m = '0' + m : m = m
	d < 10 ? d = '0' + d : d = d
	var result = y + "/" + m + '/' + d
	return state == 'start' ? setEndDayTime(-1, new Date(result)) : result.replace(/\//g, '-')
}


/**
 * @param {Object} day  正数为day天之前 复数为day天之后 
 * @param {Object} when 何时，默认当前日期
 */
export function setEndDayTime(day, when = 'now') {
	var beforday
	when == 'now' ? beforday = new Date() : beforday = new Date(when)
	var beforMilliseconds = beforday.getTime() - 1000 * 3600 * 24 * day;
	beforday.setTime(beforMilliseconds);
	var strYear = beforday.getFullYear();
	var strDay = beforday.getDate();
	var strMonth = beforday.getMonth() + 1;
	strMonth < 10 ? strMonth = "0" + strMonth : strMonth = strMonth;
	strDay < 10 ? strDay = "0" + strDay : strDay = strDay;
	return strYear + "-" + strMonth + "-" + strDay;
}

/**
 * 获取二维数组最大值
 * @param {Object} arr
 */
export function getMaxNum(arr) {
	var newArray = arr.join(",").split(",");
	return Math.max.apply({}, newArray);
}

/**
 * 判断数字在不在最小值与最大值区间
 * @param {Object} num 输入的数字
 * @param {Object} min	最小值
 * @param {Object} max	最大值
 */
export function isRange(num, min, max) {
	var reg = /(\d+)/g;
	while (reg.exec(num)) {
		var int = parseInt(RegExp.$1);
		if (int < min || int > max) return false;
	}
	return true;
}


/**
 * 函数防抖 (只执行最后一次点击)
 * @param fn
 * @param delay
 * @returns {Function}
 * @constructor
 */
export const Debounce = (fn, t) => {
	let delay = t || 500;
	let timer;
	console.log(fn)
	console.log(typeof fn)
	return function() {
		let args = arguments;
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			timer = null;
			fn.apply(this, args);
		}, delay);
	}
};


/**
 * 函数节流
 * @param fn
 * @param interval
 * @returns {Function}
 * @constructor
 */
export const Throttle = (fn, t) => {
	let last;
	let timer;
	let interval = t || 500;
	return function() {
		let args = arguments;
		let now = +new Date();
		if (last && now - last < interval) {
			clearTimeout(timer);
			timer = setTimeout(() => {
				last = now;
				fn.apply(this, args);
			}, interval);
		} else {
			last = now;
			fn.apply(this, args);
		}
	}
}
