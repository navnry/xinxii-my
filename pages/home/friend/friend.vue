<template>
	<view>
		<u-navbar title="朋友圈"></u-navbar>
		<view class="search-bar">
			<view class="search-wrap u-p-l-24 u-p-r-24 u-p-t-12 u-p-b-12" @click="toSearch">
				<u-search height="72" disabled></u-search>
			</view>
		</view>

		<b-refresh ref="mescrollRef" @down="pullDown">

			<view class="expand u-p-b-24">
				<view class="top u-p-24 u-flex u-row-between u-p-b-24 u-border-bottom">
					<view class="name u-font-32 u-font-bolder">拓业海报</view>
					<view class="btn u-skeleton-rect" @click="toExpand">
						<text class="u-m-r-8 u-font-sm u-tips-color">查看全部</text>
						<u-icon class="u-tips-color" name="more-circle" />
					</view>
				</view>
				<view class="list">
					<scroll-view scroll-x>
						<view class="wrap u-flex u-flex-nowrap">
							<view class="item u-m-r-12" v-for="(item,index) in expandList" :key="index">
								<u-image :src="item" width="160" height="240"></u-image>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
			<view class="" style="height: 24rpx;"></view>
			<view class="friend">
				<view class="top u-p-24 u-flex u-row-between u-p-b-24 u-border-bottom">
					<view class="name u-font-32 u-font-bolder">朋友圈</view>
				</view>
				<view class="">
					<u-sticky :enable="enable">
						<u-tabs :list="typeList" :current="typeCurrent" @change="changeTab" height="88" />
					</u-sticky>
				</view>
				<view class="list">
					<view class="wrap">
						<b-friend-item v-for="(item,index) in list" :key="item.id" :data="item"
							@share="handlerSheet(item)" />
					</view>
					<u-loadmore class="u-p-t-24 u-p-b-24" :status="status" @loadmore="loadMore" />
				</view>
			</view>
		</b-refresh>

		<u-action-sheet :list="sheetList" v-model="popupShow" @click="handlerShare"></u-action-sheet>

	</view>
</template>

<script>
	import mescrollMixin from '@/common/libs/mescroll-uni/mescroll-mixins.js'
	import permision from "@/common/js_sdk/wa-permission/permission.js"
	export default {
		mixins:[mescrollMixin],
		data() {
			return {
				expandList: [],
				typeList: [],
				typeCurrent: 0,
				list: [],
				enable: true,
				page: { // 朋友圈
					type: '',
					pageNo: 1,
					pageSize: 6
				},
				status: 'loadmore',
				popupShow: false,
				sheetList: [{
					text: '保存图片到本地'
				}, {
					text: '发送给朋友'
				}, {
					text: '分享到朋友圈'
				}],
				shareContent: {},
			}
		},
		onLoad() {
			this.getList()
			this.getTypeList()
			this.getExpandList()
		},
		computed: {

		},
		onShow() {
			this.enable = true
		},
		onHide() {
			this.enable = false
		},
		methods: {
			toSearch() {
				this.$u.route({
					url: 'pages/base/search',
					params: {
						type: 'friend'
					}
				})
			},
			toExpand() {
				this.$u.route({
					url: 'pages/home/friend/expand'
				})
			},
			pullDown(mescroll) {
				setTimeout(() => {
					mescroll.endSuccess()
				}, 1000)
			},
			changeTab(index) {
				// this.typeCurrent = index
				this.page.type = this.typeList[index].id
				this.page.pageNo = 1
				this.typeCurrent = index
				this.list = []
				this.getList()
			},
			handlerSheet(data) {
				this.popupShow = true
				this.shareContent = data
				console.log(this.shareContent)
			},

			/*复制文本*/
			copyContent(str) {
				return new Promise((resovle, reject) => {
					uni.setClipboardData({
						data: str,
						success: function(data) {
							resovle(data)
						},
						fail: function(err) {
							reject(err)
						},
						complete: function() {
							uni.hideToast()
						}
					})
				})
			},

			/*保存图片*/
			saveImg(list, showTip = true) {
				return new Promise((resovle, reject) => {
					for (let url of list) {
						if (showTip) {
							uni.showLoading({
								title: "正在保存",
								mask: true
							})
						}
						uni.downloadFile({
							url,
							success: (res) => {
								if (res.statusCode === 200) {
									uni.saveImageToPhotosAlbum({
										filePath: res.tempFilePath,
										success: (data) => {
											resovle()
											console.log(data)
										},
										fail: (err) => {
											console.log(err)
											reject()
										},
										complete: () => {
											uni.hideLoading()
										}
									})
								}
							}
						})
					}
				})
			},
			handlerShare(index) {
				switch (index) {
					case 0:
						this.saveImg(this.shareContent.picList).then(res => {
							uni.showToast({
								icon: 'none',
								title: "图片保存成功"
							})
						}).catch(err => {
							uni.showToast({
								icon: 'none',
								title: "图片保存失败，请检查系统权限"
							})
						})
						break;
					case 1:
						this.copyContent(this.shareContent.content).then(res => {
							if (res.data !== '') {
								this.$showModal({
									title: "提示",
									content: "文字复制成功，去微信粘贴给好友吧"
								})
							} else {
								uni.showToast({
									icon: 'none',
									title: "文字复制失败"
								})
							}
						})
						break;
				}
			},
			getTypeList() {
				let list = this.$storage.get("friendTypeList")
				if (!list) {
					this.$api.friendTypeList().then(res => {
						if (res.success) {
							res.data.forEach(item => {
								item.name = item.value
								item.id = item.key
								this.$delete(item, 'value')
								this.$delete(item, 'key')
							})
							this.typeList = res.data
							this.typeList.unshift({
								id: '',
								name: '全部'
							})
							this.$storage.set("friendTypeList", this.typeList)
						}
					})
				} else {
					this.typeList = list
				}
			},

			/*获取图片宽高*/
			getImgInfo(src) {
				return new Promise((resolve, reject) => {
					uni.getImageInfo({
						src: src,
						success: (res) => {
							resolve({
								width: res.width,
								height: res.height
							})
						},
						fail: (err) => {
							reject(err)
						}
					})
				})
			},

			getList() {
				this.status = 'loading'
				this.$api.friendList(this.page).then(res => {
					if (res.success) {
						if (this.page.pageNo == 1) {
							this.list = res.data.list
							if (!res.page.hasNextPage) {
								this.status = 'nomore'
							}
						} else {
							this.list = this.list.concat(res.data.list)
							if (!res.page.hasNextPage) {
								this.status = 'nomore'
							}
						}
						let newArr = this.list.map(item => {
							return this.getImgInfo(item.picList[0])
						})
						Promise.all(newArr).then(array => {
							// X 为图片的宽高比 L为多图图片间距  Y为图片高度 360  W为展示区域总宽 W: 500  L: 12
							let y = 360
							let w = 588
							let l = 12
							let width, height
							for (let index in this.list) {
								if (this.list[index].picList.length == 1) {
									let obj = array[index] // 图片宽高信息
									let x = obj.width / obj.height // X 为图片的宽高比
									if (x < 1 / 3) { // 当X<1/3时，图片尺寸（Y/3）*Y，图片信息显示不完整；
										width = y / 3
										height = y
									} else if (1 / 3 <= x && x <=
										1) { // 当1/3<=X<=1时，图片尺寸为（Y/X）*Y,图片信息显示完整；
										width = y * x
										height = y
									} else if (1 <= x && x <= 3) { // 当1<=X<=3时，图片尺寸为Y*（Y/X），图片显示完整；
										width = y
										height = y / x
									} else if (3 < x) { // 当3<X时，图片尺寸为W*[(W-2L)/3],图片显示不完整；
										width = w
										height = (w - 2 * l) / 3
									}
									this.$set(this.list[index], 'width', width)
									this.$set(this.list[index], 'height', height)
								} else {
									// 当上传2-9张图片时，图片的尺寸[(W-2L)/3]*[(W-2L)/3]*
									width = (w - 2 * l) / 3
									height = (w - 2 * l) / 3
									this.$set(this.list[index], 'width', width)
									this.$set(this.list[index], 'height', height)
								}
							}
						})
						console.log(this.list)
						this.status = 'loadmore'
					}
				})
			},
			getExpandList() {
				this.$api.expandList().then(res => {
					if (res.success) {
						console.log(res.data)
						this.expandList = res.data
					}
				})
			},
			loadMore() {
				this.page.pageNo += 1
				if (this.status == 'nomore') return
				this.getList()
			},
			onReachBottom() {
				this.loadMore()
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		// background-color: #fff;
	}

	.search-bar {
		background-color: #fff;
		position: relative;
		z-index: 1;
	}

	.friend {
		background-color: #fff;
	}

	.expand {
		background-color: #fff;

		.list {
			.wrap {
				padding: 0 24rpx;
				overflow-x: scroll;
			}

			.item {
				margin-right: 12rpx;

				&:last-of-type {
					// margin-right: 0;
				}
			}
		}
	}
</style>
