<template>
	<view class="content">
		<u-navbar :is-back="false" z-index="1001">
			<view class="slot-wrap">
				<view class="drawer" @click="popShow = !popShow" :class="{show:popShow}">
					<text class="u-font-26">{{producerName}}</text>
					<u-icon name="arrow-down" size="24" color="#333"></u-icon>
				</view>
				<view class="search-wrap" @click="toSearch">
					<u-search height="56" disabled></u-search>
				</view>
				<view class="navbar-right">
					<view class="message-box right-item">
						<u-icon name="chat" size="42" color="#888"></u-icon>
						<u-badge size="mini" isDot :count="message.unread" :offset="[-6, -6]"></u-badge>
					</view>
				</view>
			</view>
		</u-navbar>

		<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop">
			<view v-for="(item,index) in tabList" :key="index" class="u-tab-item" :class="[tabCurrent==index ? 'u-tab-item-active' : '']"
			 :data-current="index" @tap.stop="swichMenu(index)">
				<text class="u-line-1">{{item.name}}</text>
			</view>
		</scroll-view>

		<b-refresh ref="mescrollRef" class="right-box u-p-l-172" @down="pullDown" height="-1">
			<view class="container">
				<view class="wrap ">
					<view class="">
						
					</view>
					<view class="item u-p-t-24 u-p-b-24 u-border-bottom" v-for="(item, index) in productList" :key="item.id" @click="todetail(item.id)">
						<view class="item-menu-name u-font-lg u-font-bold u-m-b-12">{{item.name}}</view>
						<view class="u-font-sm u-tips-color" v-html="item.specialInfo"></view>
						<view class="price">
							<text class="u-font-xl u-font-bolder u-type-warning">{{item.inPrice}}</text>
							<text class="u-font-md u-font-bolder u-type-warning"> /元起</text>
						</view>
					</view>
				</view>
			</view>
			<u-loadmore class="u-p-b-24" :status="status" />
		</b-refresh>
		<view class="">
			<u-popup v-model="popShow" mode="top" z-index="1000" :custom-style="popStyle">
				<view class="pop-wrap">
					<view class="pop-item u-border" v-for="(item,index) in producerList" :key="index" @click="hidePop(index,item.name)"
					 :class="{current:current == index}">{{item.name}}</view>
				</view>
			</u-popup>
		</view>
	</view>

</template>

<script>
	import mescrollMixin from '@/common/libs/mescroll-uni/mescroll-mixins.js'
	import { mapState } from 'vuex'
	export default {
		mixins:[mescrollMixin],
		data() {
			return {
				popShow: false,
				// producerName: '',
				producerList: [],
				current: 0,
				producerName: '全部公司',
				popStyle: {
					top: "calc(44px + var(--status-bar-height))"
				},
				tabList: [],
				productParams: {
					producerId: '',
					tagIds: [],
					pageSize: 6,
					pageNo: 1,
					coveredIds: ''
				},
				productList: [],




				scrollTop: 0, //tab标题的滚动条位置
				tabCurrent: 0, // 预设当前项的值
				menuHeight: 0, // 左边菜单的高度
				menuItemHeight: 0, // 左边菜单item的高度
				status: 'loadmore',
			}
		},
		computed:{
			 ...mapState(['message']),
		},
		onLoad() {
			this.getProducerList()
			this.getProductTagList()
			this.getProductList()
		},
		methods: {
			refresh() {
				// this.$nextTick(() => {
				// 	this.$refs.pullScroll.refresh();
				// 	console.log(this.$refs.pullScroll.page)
				// 	this.productParams.pageNo = 1
				// 	this.getProductList()
				// });
				this.productParams.pageNo = 1
				this.mescroll.scrollTo(0, 0)
				// this.mescroll.triggerDownScroll()
			},
			pullDown(mescroll) {
				setTimeout(() => {
					mescroll.endSuccess();
				}, 2000)
			},
			hidePop(index, name) {
				this.current = index
				this.popShow = false
				this.producerName = name
				// console.log(this.producerList[index].id)
				// this.getProductTagList(this.producerList[index].id)
			},
			toSearch(){
				this.$u.route({
					url: 'pages/base/search',
					params: {
						type:'product'
					}
				})
			},
			getProducerList() {
				try {
					let list = this.$storage.get("producerList")
					if (!list) {
						this.$api.producerList().then(res => {
							if (res.success) {
								this.producerList = res.data
								this.producerList.unshift({
									id: '',
									name: '全部公司'
								})
								this.$storage.set("producerList", this.producerList)
							}
						})
					}else{
						this.producerList = list
					}
					
				} catch (error) {
					console.log(error)
				}
			},
			getProductTagList(id='') {
				try {
					let list = this.$storage.get("productTabList")
					if (!list || !id) {
						this.$api.productTagList(id).then(res => {
							if (res.success) {
								console.log(res)
								this.tabList = res.data
								this.tabList.unshift({
									id: '',
									name: '全部'
								})
								this.$storage.set("productTabList", this.tabList)
							}
						})
					}else{
						this.tabList = list
					}
					
				} catch (error) {
					console.log(error)
				}
			},
			getProductList() {
				this.status = 'loading';
				this.$api.productList(this.productParams).then(res => {
					if (res.success) {
						// console.log(res.data)
						if (this.productParams.pageNo == 1) {

							this.productList = res.data
							if (!res.page.hasNextPage) {
								this.status = 'nomore';
								return
							}
						} else {
							this.productList = this.productList.concat(res.data)
							if (!res.page.hasNextPage) {
								this.status = 'nomore';
								return
							}
						}
						this.status = 'loadmore';
						// console.log(this.productList.length)
						this.mescroll.endSuccess(this.productList.length, res.page.hasNextPage);
						// if (res.page.lastPage) {
						// 	this.mescroll.endSuccess(6, false);
						// }
					}
				}).catch(err=>{
					this.status = 'loadmore';
				})
			},
			getImg() {
				return Math.floor(Math.random() * 35);
			},
			todetail(id){
				uni.navigateTo({
					url:'./detail?id=' + id
				})
			},
			// 点击左边的栏目切换
			async swichMenu(index) {
				if (index == this.tabCurrent) return;
				this.tabCurrent = index;

				// 如果为0，意味着尚未初始化
				if (this.menuHeight == 0 || this.menuItemHeight == 0) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
					await this.getElRect('u-tab-item', 'menuItemHeight');
				}
				this.productParams.tagIds = this.tabList[index].id
				this.productList = []
				this.refresh()
				this.getProductList()
				// 将菜单菜单活动item垂直居中
				this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
			},
			// 获取一个目标元素的高度
			getElRect(elClass, dataVal) {
				new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.' + elClass).fields({
						size: true
					}, res => {
						// 如果节点尚未生成，res值为null，循环调用执行
						if (!res) {
							setTimeout(() => {
								this.getElRect(elClass);
							}, 10);
							return;
						}
						this[dataVal] = res.height;
					}).exec();
				})
			},
			onReachBottom() {
				this.productParams.pageNo = this.productParams.pageNo += 1
				if (this.status == 'nomore') return
				this.getProductList()
			}
			// onReachBottom() {
			// 	this.productParams.pageNo += 1
			// 	// if (this.status == 'nomore') return
			// 	this.getProductList()
			// },
		}
	}
</script>

<style lang="scss" scoped>
	// page {
	// 	height: 100%;
	// 	background-color: #fff;
	// }
	page{
		background-color: #fff;
	}
	.drawer {
		margin-right: 24rpx;

		text {
			margin-right: 6rpx;
		}

		.u-icon {
			transition-duration: .25s;
		}

		&.show {
			.u-icon {
				transform: rotate(180deg);
			}
		}
	}

	.content {
		height: 100%;
	}

	.navbar-right {
		// margin-right: 24rpx;
		display: flex;
	}

	.search-wrap {
		// margin: 0 20rpx;
		flex: 1;
		margin-right: 24rpx;
	}

	.right-item {
		// margin: 0 12rpx;
		position: relative;
		color: #ffffff;
		display: flex;
	}

	.slot-wrap {
		display: flex;
		align-items: center;
		flex: 1;
		padding: 0 24rpx;
	}

	.map-wrap {
		display: flex;
		align-items: center;
		padding: 4px 6px;
		background-color: rgba(240, 240, 240, 0.35);
		color: #fff;
		font-size: 22rpx;
		border-radius: 100rpx;
		// margin-left: 30rpx;
	}

	.map-wrap-text {
		padding: 0 6rpx;
	}

	.u-wrap {
		/* #ifdef H5 */
		height: calc(100% - 44px);
		/* #endif */
		/* #ifndef H5 */
		height: calc(100vh - 44px - var(--status-bar-height));
		/* #endif */
		display: flex;
		flex-direction: column;
	}

	.u-search-box {
		padding: 18rpx 30rpx;
	}

	.u-menu-wrap {
		// flex: 1;
		display: flex;
		overflow: hidden;
	}


	.u-search-inner {
		background-color: rgb(234, 234, 234);
		border-radius: 100rpx;
		display: flex;
		align-items: center;
		padding: 10rpx 16rpx;
	}

	.u-search-text {
		font-size: 26rpx;
		color: $u-tips-color;
		margin-left: 10rpx;
	}

	.u-tab-view {
		z-index: 100;
		position: fixed;
		top: var(--status-bar-height);
		left: 0;
		bottom: var(--window-bottom);
		width: 172rpx;
		padding-top: 44px;
		background-color: #F7F8F9;
	}

	.u-tab-item {
		height: 110rpx;
		background: #F6F7F8;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		color: #444;
		font-weight: 400;
		line-height: 1;
	}

	.u-tab-item-active {
		position: relative;
		color: $u-type-warning;
		font-size: 32rpx;
		font-weight: 600;
		background: #fff;
	}

	.u-tab-item-active::before {
		content: "";
		position: absolute;
		border-left: 4px solid $u-type-warning;
		height: 32rpx;
		left: 0;
		top: 39rpx;
	}


	.right-box {
		// padding-left: 172rpx;
		// background-color: #fff;

		.container {
			.wrap {
				display: flex;
				flex-wrap: wrap;
				background-color: #fff;
				padding: 24rpx;

				.item {
					width: 100%;
					display: flex;
					flex-direction: column;

					&:last-of-type {
						padding-bottom: 0 !important;

						&::after {
							display: none;
						}
					}
				}
			}
		}
	}


	.pop-wrap {
		display: flex;
		flex-wrap: wrap;
		padding: 24rpx;
		margin-right: -38rpx;
		margin-top: -18rpx;

		.pop-item {
			width: 208rpx;
			padding: 0 16rpx;
			height: 72rpx;
			line-height: 72rpx;
			margin-right: 38rpx;
			margin-top: 18rpx;
			font-size: 28rpx;
			border-radius: 100rpx;
			text-align: center;
			color: #999;

			&.current {
				color: #007AFF;

				&::after {
					border-color: #007AFF;
				}
			}
		}
	}
</style>
