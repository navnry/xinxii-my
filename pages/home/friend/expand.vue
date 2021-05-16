<template>
	<view>
		<u-navbar title="全部海报"></u-navbar>

		<view class="">
			<view class="tab">
				<u-sticky :enable="enable">
					<u-tabs :list="tabList" :current="tabCurrent" @change="changeTab" height="88" />
				</u-sticky>
			</view>
			<view class="u-p-24">
				<b-waterfall ref="waterfall" single :list="list"> </b-waterfall>
				<u-loadmore class="u-p-t-24 u-p-b-24" :status="status" @loadmore="loadMore" />
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				enable: true,
				tabList: [],
				tabCurrent: 0,
				page: { // 拓业海报
					typeId: '',
					pageNo: 1,
					pageSize: 6
				},
				list: [],
				status: 'loadmore',
			}
		},
		onShow() {
			this.enable = true
		},
		onHide() {
			this.enable = false
		},
		onLoad() {
			this.getTypeList()
			this.getList()
		},
		methods: {

			getTypeList() {
				let tabListCache = this.$storage.get("expandTabList")
				if (!tabListCache) {
					this.$http.get('/file/poster/type.do').then(res => {
						if (res.success && res.data) {
							this.tabList = res.data.types
							this.tabList.unshift({
								id: '',
								name: '全部'
							})
							this.$storage.set("expandTabList", this.tabList)
						}
					})
				} else {
					this.tabList = tabListCache
				}
			},
			getList() {
				this.status = 'loading'
				this.$http.get('/file/poster/findPosterResourceByTypeId.do', {
					params: this.page
				}).then(res => {
					if (res.success) {
						let custormData = res.data.map(item => {
							return {
								src: item
							}
						})
						if (this.page.pageNo == 1) {
							this.list = custormData
							if (!res.page.hasNextPage) {
								this.status = 'nomore'
							}
						} else {
							this.list = this.list.concat(custormData)
							if (!res.page.hasNextPage) {
								this.status = 'nomore'
							}
						}

						let newArr = this.list.map(item => {
							return this.getImgInfo(item.src)
						})
						Promise.all(newArr).then(array => {
							let y = 360
							let width, height
							for (let index in this.list) {
								let obj = array[index] // 图片宽高信息
								let x = obj.width / obj.height // X 为图片的宽高比
								width = y * x
								height = y
								this.$set(this.list[index], 'width', width)
								this.$set(this.list[index], 'height', height)
							}
						})
						console.log(this.list)
						// this.status = 'loadmore'
					}
				})
			},
			changeTab(index) {
				// this.typeCurrent = index
				this.page.typeId = this.tabList[index].id
				this.page.pageNo = 1
				this.tabCurrent = index
				this.$refs.waterfall.refresh()
				this.list = []
				this.getList()
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

<style>

</style>
