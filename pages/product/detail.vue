<template>
	<scroll-view scroll-y class="" @scroll="pageScroll" style="height: 100vh;" :scroll-top="scrollTop">
		<u-navbar title="产品详情"></u-navbar>
		<view class="banner">
			<view class="pic">
				<u-image :src="detail.picture" width="100%" height="346rpx"></u-image>
			</view>

			<view class="desc u-p-24">
				<view class="u-font-32">{{detail.name}}</view>
				<view class="u-font-26 u-content-color">该产品由{{detail.producerName}}承保</view>
			</view>
		</view>

		<view class="">
			<u-sticky :enable="enable">
				<u-tabs :list="tabbar" :current="current" @change="swichMenu" height="88" :is-scroll="false" />
			</u-sticky>
		</view>

		<view class="u-menu-wrap">
			<view class="page-view">
				<view id="item0" class="class-item">
					<u-cell-group title="保障权益">
						<view v-for="(item,index) in detail.planList" :key="item.id" v-show="planCurrent == index">
							<view class="" v-for="(oItem,oIndex) in item.planDetailList" :key="oIndex">
								<u-cell-item :title="oItem.ensureName" :value="oItem.ensureDetail" :arrow="false" title-width="540" />
							</view>
						</view>
					</u-cell-group>
				</view>
				<view id="item1" class="class-item">
					<u-cell-group title="投保条件">
						<view class="" v-if="detail.productInsureOutput">
							<u-cell-item title="保障期限" :value="detail.productInsureOutput.ensureTime" :arrow="false" title-width="140" />
							<u-cell-item title="投保年龄" :value="detail.productInsureOutput.ageStr" :arrow="false" title-width="140" />
							<u-cell-item title="职业类别" :value="detail.productInsureOutput.jobType" :arrow="false" title-width="140" />
							<u-cell-item title="缴费方式" :value="detail.productInsureOutput.payType" :arrow="false" title-width="140" />
							<u-cell-item title="犹豫期" :value="detail.productInsureOutput.hesitPeriod" :arrow="false" title-width="140" v-if="detail.productInsureOutput.hesitPeriod && detail.productInsureOutput.hesitPeriod !==''" />
							<u-cell-item title="等待期" :value="detail.productInsureOutput.ensureTime" :arrow="false" title-width="140" v-if="detail.productInsureOutput.waitPeriod && detail.productInsureOutput.waitPeriod !==''" />
							<u-cell-item title="等待期说明" :value="detail.productInsureOutput.ensureTime" :arrow="false" title-width="140" v-if="detail.productInsureOutput.waitDetail && detail.productInsureOutput.waitDetail !==''" />
						</view>
					</u-cell-group>
				</view>
				<view id="item2" class="class-item">
					<u-cell-group title="产品特色">
						<u-parse class="u-p-24" :html="detail.detail" @ready="readyEnd"></u-parse>
					</u-cell-group>
				</view>
				<view id="item3" class="class-item">
					<u-cell-group title="产品条款">
						<view v-for="(item,index) in detail.productInfomationFileOutputList" :key="index">
							<u-cell-item :title="item.name.split('.')[0]" />
						</view>
					</u-cell-group>
				</view>
			</view>
		</view>

		<view class="u-m-t-32 u-p-24">
			<u-divider fontSize="24" bgColor="transparent">新禧保险经纪保险公司为您提供销售服务</u-divider>
		</view>
		<view class="u-p-b-126">

		</view>
		<view class="">
			<u-button></u-button>
		</view>
	</scroll-view>
</template>
<script>
	export default {
		data() {
			return {
				scrollTop: 0, //tab标题的滚动条位置
				oldScrollTop: 0,
				current: 0, // 预设当前项的值
				menuHeight: 0, // 左边菜单的高度
				menuItemHeight: 0, // 左边菜单item的高度
				tabbar: [{
					name: '保障权益'
				}, {
					name: '投保条件'
				}, {
					name: '产品特色'
				}, {
					name: '产品条款'
				}],
				menuItemPos: [],
				arr: [],
				scrollRightTop: 0, // 右边栏目scroll-view的滚动条高度
				timer: null, // 定时器



				detail: {},
				planList: [],
				planCurrent: 0,
				enable: false,
				topHeght: 0,
			}
		},
		onHide() {
			this.enable = false
		},
		onShow() {
			this.enable = true
		},
		onLoad(options) {
			if (options) {
				this.getDetail(options.id)
			}
			
		},
		onReady() {
			this.getElRect('banner', 'topHeght')
		},
		mounted() {

		},
		methods: {
			readyEnd() {
				// this.$showModal({
				// 	title:"提示",
				// 	content:"渲染完成",
				// 	showCancel:false
				// })
				this.$nextTick(() => {
					this.getMenuItemTop()
				})
			},
			//获取产品详情
			getDetail(id) {
				this.$api.productDetail(id).then(res => {
					if (res.success) {
						this.detail = res.data
						this.planList = res.data.planList
					}
				})
			},


			// 获取一个目标元素的高度
			getElRect(elClass, dataVal) {
				new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this)
					query.select('.' + elClass).fields({
						size: true
					}, res => {
						// 如果节点尚未生成，res值为null，循环调用执行
						if (!res) {
							setTimeout(() => {
								this.getElRect(elClass)
							}, 10)
							return
						}
						this[dataVal] = res.height
						resolve()
					}).exec()
				})
			},

			// 点击跳转锚点
			async swichMenu(index) {
				if (this.arr.length == 0) {
					await this.getMenuItemTop()
				}
				if (index == this.current) return
				this.scrollTop = this.oldScrollTop
				this.$nextTick(function() {
					this.scrollTop = this.arr[index]
					this.current = index
					this.menuStatus(index)
				})
			},

			// 观测元素相交状态
			async observer() {
				this.tabbar.map((val, index) => {
					let observer = uni.createIntersectionObserver(this)
					// 检测右边scroll-view的id为itemxx的元素与right-box的相交状态
					// 如果跟.right-box底部相交，就动态设置左边栏目的活动状态
					observer.relativeTo('.right-box', {
						top: 0
					}).observe('#item' + index, res => {
						if (res.intersectionRatio > 0) {
							let id = res.id.substring(4)
							this.menuStatus(id)
						}
					})
				})
			},
			// 设置tab的滚动状态
			async menuStatus(index) {
				this.current = index
				// 如果为0，意味着尚未初始化
				if (this.menuHeight == 0 || this.menuItemHeight == 0) {
					await this.getElRect('menu-scroll-view', 'menuHeight')
					await this.getElRect('u-tab-item', 'menuItemHeight')
				}
				// 将菜单活动item垂直居中
			},
			// 获取右边菜单每个item到顶部的距离
			getMenuItemTop() {
				new Promise(resolve => {
					let selectorQuery = uni.createSelectorQuery()
					selectorQuery.selectAll('.class-item').boundingClientRect((rects) => {
						// 如果节点尚未生成，rects值为[](因为用selectAll，所以返回的是数组)，循环调用执行
						if (!rects.length) {
							setTimeout(() => {
								this.getMenuItemTop()
							}, 10)
							return
						}
						rects.forEach((rect) => {
							// 这里减去rects[0].top，是因为第一项顶部可能不是贴到导航栏(比如有个搜索框的情况)
							this.arr.push(rect.top - 88)
							// console.log(this.arr)
							resolve()
						})
					}).exec()
				})
			},

			// 页面滚动
			async pageScroll(e) {
				this.oldScrollTop = e.detail.scrollTop
				if (this.arr.length == 0) {
					await this.getMenuItemTop()
				}
				if (this.timer) return
				if (!this.menuHeight) {
					await this.getElRect('menu-scroll-view', 'menuHeight')
				}
				setTimeout(() => { // 节流
					this.timer = null
					// scrollHeight为右边菜单垂直中点位置
					let scrollHeight = e.detail.scrollTop + this.menuHeight / 2
					for (let i = 0; i < this.arr.length; i++) {
						let height1 = this.arr[i]
						let height2 = this.arr[i + 1]
						console.log(height2)
						// 如果不存在height2，意味着数据循环已经到了最后一个，设置左边菜单为最后一项即可
						if (scrollHeight >= height1 && scrollHeight < height2) {
							this.menuStatus(i)
							return
						}
					}
				}, 10)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-wrap {
		height: calc(100vh);
		/* #ifdef H5 */
		height: calc(100vh - var(--window-top));
		/* #endif */

	}
</style>
