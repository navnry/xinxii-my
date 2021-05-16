// 全局配置
// mescroll-body 和 mescroll-uni 通用
const GlobalOption = {
	down: {
		auto: false,//是否在初始化完毕之后自动执行下拉回调callback; 默认false
		textInOffset: '下拉刷新', // 下拉的距离在offset范围内的提示文本
		textOutOffset: '释放更新', // 下拉的距离大于offset范围的提示文本
		textLoading: '正在刷新', // 加载中的提示文本
		textSuccess: '刷新成功', // 加载成功的文本
		textErr: '刷新失败', // 加载失败的文本
		beforeEndDelay: 200, // 延时结束的时长 (此处设置为200ms)
		offset: 60, // 在列表顶部,下拉大于60px,松手即可触发下拉刷新的回调
		native: false ,// 是否使用系统自带的下拉刷新; 默认false; 仅在mescroll-body生效 (值为true时,还需在pages配置enablePullDownRefresh:true;详请参考mescroll-native的案例)
		outOffsetRate: 0.2, // 在列表顶部,下拉的距离大于offset时,改变下拉区域高度比例;值小于1且越接近0,高度变化越小,表现为越往下越难拉
	},
	up: {
		use:false,
	}
}

export default GlobalOption
