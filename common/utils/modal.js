exports.install = function(Vue, options) {
	Vue.prototype.$showModal = function(param) {
		let title = typeof param.title === 'undefined' ? '' : param.title;
		let contentColor = param.contentColor || '';
		let showCancel = typeof param.showCancel != 'undefined' ? param.showCancel : true;
		let cancelText = param.cancelText || '取消';
		let cancelColor = param.cancelColor || '#3296FA';
		let confirmText = param.confirmText || '确定';
		let confirmColor = param.confirmColor || '#FF6510';
		if (showCancel) {
			var buttons = param.buttons || [{
					title: cancelText,
					titleColor: cancelColor
				},
				{
					title: confirmText,
					titleColor: confirmColor
				}
			];
		} else {
			// 没有取消按钮
			var buttons = param.buttons || [{
				title: confirmText,
				titleColor: confirmColor
			}];
		}

		//#ifdef APP-PLUS
		uni.$off('_systemShowModalMessage');
		uni.setStorageSync('_systemShowModalParam', {
			title: title,
			content: param.content,
			contentColor: contentColor,
			buttons: buttons
		});
		this.$jump('$modal');
		uni.$once('_systemShowModalMessage', (res) => {
			if (typeof param.success != 'undefined') {
				param.success(res);
			}
		});
		//#endif

		//#ifndef APP-PLUS
		uni.showModal({
			title: title,
			content: param.content,
			showCancel: showCancel,
			cancelText: cancelText,
			cancelColor: cancelColor,
			confirmText: confirmText,
			confirmColor: confirmColor,
			success: (res) => {
				if (typeof param.success != 'undefined') {
					param.success(res);
				}
			}
		});
		//#endif
	};

	/**
	 * 跳转页面
	 */
	Vue.prototype.$jump = function(page, redirect) {
		// 是否关闭当前页面
		redirect = typeof redirect != 'undefined' ? redirect : false;
		if (redirect) {
			uni.redirectTo({
				url: page
			});
		} else {
			if (page.indexOf('$modal') == 0) {
				// 模拟对话框弹出动画
				uni.navigateTo({
					url: '/pages/base/modal',
					animationType: "fade-in"
				});
			} else {
				uni.navigateTo({
					url: page,
					animationType: "zoom-fade-out"
				});
			}
		}
	};

};
