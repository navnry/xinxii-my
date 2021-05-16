<template>
	<view class="content">
		<u-navbar :is-back="false" :border-bottom="false">
			<view class="slot-wrap">
				<view class="search-wrap">
					<u-search height="56" disabled @click="toSearch"></u-search>
				</view>
				<view class="navbar-right">
					<view class="message-box right-item">
						<u-icon name="chat" size="42" color="#888"></u-icon>
						<u-badge size="mini" isDot :count="message.unread" :offset="[-6, -6]"></u-badge>
					</view>
				</view>
			</view>
		</u-navbar>

		<b-refresh ref="mescrollRef" @down="pullDown">
			<view class="">
				<view class="focus u-m-24 u-p-24">
					<view class="title u-m-b-24 u-flex u-row-between">
						<view class="left u-font-32 u-font-bold">每日焦点</view>
						<view class="right" @click="toFocusList">
							<text class="u-m-r-8 u-font-sm u-tips-color">近期回顾</text>
							<u-icon class="u-tips-color" name="more-circle" />
						</view>
					</view>
					<b-focus-item :data="focusData" @click="toDetail"></b-focus-item>
				</view>
				<view class="tab">
					<u-sticky :enable="enable">
						<u-tabs :list="tabList" :current="tabCurrent" @change="changeTab" height="88" />
					</u-sticky>
				</view>
				<view class="news-list u-m-24">
					<view class="news-wrap u-p-l-24 u-p-r-24">
						<block v-for="(item,index) in newsList" :key="item.id">
							<b-article-item :data="item" @click="toDetail" />
						</block>
					</view>
				</view>
				<u-loadmore :status="status" style="padding-bottom: 24rpx;" />
			</view>
		</b-refresh>

	</view>
</template>

<script>
	import mescrollMixin from '@/common/libs/mescroll-uni/mescroll-mixins.js'
	import {
		mapState
	} from 'vuex'
	export default {
		mixins: [mescrollMixin],
		data() {
			return {
				tabList: [],
				tabCurrent: 0,
				newsList: [],
				focusData: [],
				status: 'loadmore',
				params: {
					pageNo: 1,
					pageSize: 10,
					channelid: null
				},
				enable: true,
				randomIndex: 1
			};
		},
		onShow() {
			this.enable = true
			this.getRandomIndex()
		},
		onHide() {
			this.enable = false
		},
		onLoad() {
			this.getFocusData()
			this.getTabList()
			this.getNewsList()
		},
		computed: {
			...mapState(['message']),
		},
		methods: {
			scroll(e) {
				console.log(e)
			},
			toSearch() {
				this.$u.route({
					url: 'pages/base/search',
					params: {
						type: 'article'
					}
				})
			},
			getRandomIndex() {
				this.randomIndex = this.$u.random(1, 3)
			},
			getFocusData() {
				this.$api.focusData().then(res => {
					if (res.success) {
						console.log(res.data)
						this.focusData = res.data.articleList
					}
				})
			},
			toFocusList() {
				uni.navigateTo({
					url: './focus'
				})
			},
			getTabList() {
				this.$api.newsTab().then(res => {
					console.log(res)
					this.tabList = res.data
					this.tabList.unshift({
						id: '',
						name: '推荐'
					})
				})
			},
			changeTab(index) {
				this.params.channelid = this.tabList[index].id
				this.params.pageNo = 1
				this.tabCurrent = index;
				this.newsList = []
				this.getRandomIndex()
				this.getNewsList()
			},
			getNewsList() {
				this.status = 'loading';
				this.$api.newsList(this.params).then(res => {
					if (this.params.pageNo == 1) {
						this.newsList = res.data
						if (!res.page.hasNextPage) {
							this.status = 'nomore';
							return
						}
					} else {
						this.newsList = this.newsList.concat(res.data)
						if (!res.page.hasNextPage) {
							this.status = 'nomore';
							return
						}
					}
					this.status = 'loadmore';
				}).catch(err=>{
					this.status = 'loadmore';
				})
			},
			onReachBottom() {
				this.params.pageNo += 1
				if (this.status == 'nomore') return
				this.getNewsList()
			},
			toDetail(e) {
				console.log(e)
				this.$u.route({
					url: '/pages/news/detail',
					params: {
						id: e
					}
				})
			},
			pullDown(mescroll) {
				setTimeout(() => {
					mescroll.endSuccess();
				}, 3000)
			},
		}
	};
</script>

<style lang="scss" scoped>
	.container {
		background-color: #F6F7F8;
	}
	.banner {
		padding: 24rpx 0;
	}
	image {
		width: 216rpx;
		height: 384rpx;
	}
	.img-box {
		display: flex;
		flex-wrap: wrap;
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
	.message-box {}
	.slot-wrap {
		display: flex;
		align-items: center;
		flex: 1;
		padding: 0 24rpx;
	}
	.focus {
		background-color: #fff;
		border-radius: 12rpx;
	}
	.tab {
		height: 100rpx;
		// padding: 0 24rpx;
	}
	.news-list {
		.news-wrap {
			background-color: #fff;
			border-radius: 12rpx;
		}
	}
</style>
