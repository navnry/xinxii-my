<template>
	<view class="content">
		<u-navbar :is-back="false" :border-bottom="false">
			<view class="slot-wrap u-flex u-flex-1 u-p-l-24 u-p-r-24">
				<view class="search-wrap u-flex-1 u-m-r-20" @click="toSearch">
					<u-search height="56" disabled></u-search>
				</view>
				<view class="navbar-right u-flex" @click="toMessage">
					<view class="message-box right-item u-flex u-relative">
						<u-icon name="chat" size="42" color="#888"></u-icon>
						<u-badge size="mini" isDot :count="message.unread" :offset="[-6, -6]"></u-badge>
					</view>
				</view>
			</view>
		</u-navbar>
		<b-refresh ref="mescrollRef" @down="pullDown">
			<view class="">
				<view class="banner u-m-t-24">
					<u-swiper spaceBetween="24" :list="homeBanner" mode="rect" height="266" border-radius="12" bgColor="transparent" />
				</view>
				<view class="notice u-m-t-24 u-m-l-24 u-m-r-24">
					<u-notice-bar mode="vertical" :list="noticeList" color="#FE582D" bg-color="#fff" border-radius="6" />
				</view>
				<view class="mint u-m-t-36 u-m-b-36">
					<view class="mint-wrap u-flex u-row-around">
						<view class="mint-item u-flex" v-for="(item,index) in mintList" :key="index"
							@click="toUrl(item.url)">
							<u-icon :name="item.img" width="64rpx" height="64rpx" :label="item.txt" label-pos="bottom" margin-top="18" labelSize="24"/>
							<!-- <u-image width="64rpx" height="64rpx" class="" :src="item.img" mode=""></u-image>
							<text class=" u-font-24 u-content-color u-m-t-12">{{item.txt}}</text> -->
						</view>
					</view>
				</view>

				<view class="star-product u-m-l-24 u-m-r-24 u-m-b-24 u-p-24">
					<view class="top u-flex u-row-between u-p-b-24">
						<view class="">
							<text class="u-font-30 u-font-bolder main-color u-m-r-12">明星产品专区</text>
							<text class="u-font-24 u-content-color">集合全网热门产品</text>
						</view>
						<view class="btn">
							<u-button size="mini" shape="circle">GO
								<u-icon name="arrow-right" />
							</u-button>
						</view>
					</view>
					<view class="wrap u-flex u-row-between">
						<view class="item" v-for="(item,index) in hotList" :key="index">
							<u-image width="202rpx" height="192rpx" :src="item.img"></u-image>
						</view>
					</view>
				</view>

				<view class="product u-m-l-24 u-m-r-20 u-p-b-24">
					<view class="product-wrap u-p-24">
						<view class="top u-flex u-row-between u-p-b-24 u-border-bottom">
							<view class="name u-font-32 u-type-error u-font-bold ">热销产品</view>
							<view class="btn " @click="toProduct">
								<text class="u-m-r-8 u-font-26 u-tips-color">查看全部</text>
								<u-icon class="u-tips-color" name="more-circle" />
							</view>
						</view>
						<b-product-item v-for="(item,index) in productList" :key="item.id" :data="item" />
					</view>
				</view>
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
				messageCount: 0,
				homeBanner: [],
				noticeList: [{
					title: ''
				}],
				mintList: [
					{
						img: require('@/static/home/index_group1.png'),
						txt: '加入新禧',
						url: '/pages/identify/step1'
					},
					{
						img: require('@/static/home/index_group2.png'),
						txt: '朋友圈',
						url: '/pages/home/friend/friend'
					},
					{
						img: require('@/static/home/index_group3.png'),
						txt: '客户管理',
						url: '/pages/customer/customer'
					},
					{
						img: require('@/static/home/index_group4.png'),
						txt: '今日之星',
						url: ''
					},
					{
						img: require('@/static/home/index_group5.png'),
						txt: '打卡签到',
						url: ''
					}
				],
				productList: [],
				hotList: [{
						img: require('@/static/home/home_start_item1.png'),
						url: ''
					},
					{
						img: require('@/static/home/home_start_item2.png'),
						url: ''
					},
					{
						img: require('@/static/home/home_start_item3.png'),
						url: ''
					},
				]
			};
		},
		computed: {
			...mapState(['message', 'isLogin']),
		},
		onLoad() {
			setTimeout(() => {
				this.skeletonLoading = false;
			}, 2000)
			this.getProductList()
			this.getHomeBanner()
			this.getAiringList()
			// console.log(this.message)

			const arr = [1000, 3000, 5000, 4000, 2000]
			for (let i of arr) {
				setTimeout(() => console.log(i), i)
			}
		},
		methods: {
			closeCity() {
				console.log("123")
				this.cityShow = false
			},
			toMessage() {
				/*
				if (!this.isLogin) {
					this.$showModal({
						title: "提示",
						content: "您还未登录",
						cancelText:"取消",
						confirmText:"去登录",
						success: (res) => {
							if(res.confirm){
								this.$u.route({
									url: 'pages/my/login'
								})
							}
						}
					})
				}else{
					this.$u.route({
						url: 'pages/base/message',
						intercept:true
					})
				}
				*/
				this.$u.route({
					url: '/pages/base/message',
					// intercept:true
				})
			},
			scroll: function(e) {
				console.log(e)
			},
			toUrl(url) {
				if (!url) return
				this.$u.route({
					url: url
				})
				// uni.navigateTo({url:url})
			},
			toSearch() {
				this.$u.route({
					url: 'pages/base/search',
					params: {
						type: 'product'
					}
				})
			},
			toProduct() {
				uni.switchTab({
					url: '/pages/product/index'
				})
			},
			getHomeBanner: function() {
				this.$api.homeBanner().then(res => {
					console.log(res)
					if (res.success) {
						this.homeBanner = res.data
					}
				})
			},
			getAiringList: function() {
				this.$api.noticeList().then(res => {
					console.log(res)
					if (res.success) {
						this.noticeList = res.data
					}
				})
			},
			async getProductList() {
				let result = await this.$api.recProductList()
				if (result.success) {
					this.productList = result.data
				}
				console.log(result)
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
	.mint-item {
		flex-direction: column;
	}
	.star-product,
	.product-wrap {
		background-color: #fff;
		border-radius: 12rpx;
	}
</style>
