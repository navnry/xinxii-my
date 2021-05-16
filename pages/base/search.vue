<template>
	<view>
		<u-navbar>
			<view class="slot-wrap u-flex-1 u-p-r-24">
				<view class="search-wrap ">
					<u-search 
						height="56" 
						v-model="words" 
						show-action action-text="搜索"
						placeholder="请输入关键词"
						@change="handlerInput"
						@search="handlerSearch" 
						@custom="handlerSearch"
					/>
				</view>
			</view>
		</u-navbar>

		<view class="" v-show="!isResult">
			<view class="hot-search u-p-24" v-if="type == 'product'">
				<view class="title u-m-b-24 u-font-30 u-font-bold u-flex u-row-between">
					<text>热门搜索</text>
					<view class="">
						<u-icon :name="showHot ? 'eye-fill' : 'eye-off'" color="#888" @click="showHot = !showHot"></u-icon>
					</view>
				</view>
				<view class="u-text-center u-font-24 u-tips-color" v-show="!showHot">
					<text>热门搜索已隐藏</text>
				</view>
				<view class="wrap u-flex u-flex-wrap" v-show="showHot">
					<view class="item" v-for="(item,index) in hotWords" :key="item.id">
						<u-tag :text="item.value" type="info" shape="circle" border-color="transparent" @click="handlerClick(item.value)" />
					</view>
				</view>
			</view>
			<view class="history-search u-p-24" v-if="historyWords.length > 0 && type == 'product'" >
				<view class="title u-m-b-24 u-font-30 u-font-bold u-flex u-row-between">
					<text>历史搜索</text>
					<view class="" v-show="!closeable">
						<u-icon name="trash-fill" color="#888" @click="clearHistory"></u-icon>
					</view>
					<view class="btns u-font-22 u-tips-color" v-show="closeable">
						<text class="u-border-right u-p-l-12 u-p-r-12" @click="clearAll">全部删除</text>
						<text class="u-p-l-12 u-p-r-12" @click="clearDone">完成</text>
					</view>
				</view>
				<view class="wrap u-flex u-flex-wrap">
					<view class="item" v-for="(item,index) in historyWords" :key="item.id">
						<u-tag @close="tagClick(item)" :closeable="closeable" :text="item" type="info" shape="circle" border-color="transparent"
						 @click="handlerClick(item)" />
					</view>
				</view>
			</view>

		</view>
		<view class="" v-show="isResult">
			<view class="title u-p-24 u-border-bottom">
				<text class="u-font-30 u-font-bold">搜索结果 {{totalCount}}条</text>
			</view>
			<view class="list" v-if="totalCount > 0">
				<view class="wrap" v-if="type == 'friend'">
					<b-friend-item v-for="(item,index) in list" :key="item.id" :data="item" ></b-friend-item>
				</view>
				<view class="wrap u-p-24" v-else-if="type == 'article'">
					<b-article-item v-for="(item,index) in list" :key="item.id" :data="item"  />
				</view>
				<view class="wrap u-p-l-24 u-p-r-24" v-else>
					<b-product-item v-for="(item,index) in list" :key="item.id" :data="item" />
				</view>
				<u-loadmore class="u-p-t-24 u-p-b-24" :status="status" @loadmore="loadMore" />
			</view>
			<view class="u-p-48" v-else-if="totalCount == 0 && noData">
				<u-empty  text="没有搜索结果" mode="search"></u-empty>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 'product', //搜索类型默认产品
				isResult: false, //是否是搜索结果
				words: '', //搜索关键词
				showHot: true, //是否显示热门搜索
				closeable: false, //历史搜索tag删除按钮
				hotWords: [], //热门搜索
				historyWords: [], //历史搜索
				page: { //分页数据
					pageNo: 1,
					pageSize: 6
				},
				list: [], //搜索结果
				totalCount: null, //搜索结果
				status: 'loadmore', //底部加载状态
				noData:false,//没有数据
			}
		},
		watch:{
			words:{
				handler(newVal,oldVal){
					newVal = this.$u.trim(newVal, 'all')
					if(newVal == ''){
						this.isResult = false
					}
					return newVal
				}
			}
		},
		onLoad(option) {
			if (!option) return
			this.type = option.type
			this.getHotWords()
			this.getHistoryWords()
		},
		methods: {

			/**
			 * 获取搜索结果 
			 * @param {Object} type 搜索类型
			 * @param {Object} value 关键词
			 */
			getSearchResult(type = this.type, value = this.words) {
				this.isResult = true
				this.status = 'loading'
				
				if (type == 'friend') { /*搜索朋友圈*/
					this.$set(this.page, 'content', value)
					this.$api.friendList(this.page).then(res => {
						this.noData = true
						if (res.success) {
							if (res.page) {
								this.totalCount = res.page.totalCount
							}
							if (this.page.pageNo == 1) {
								this.list = res.data.list
								if (!res.page.hasNextPage) {
									this.status = 'nomore'
									return
								}
							} else {
								this.list = this.list.concat(res.data.list)
								if (!res.page.hasNextPage) {
									this.status = 'nomore'
									return
								}
							}
							this.status = 'loadmore'
						}
					})
				} else if (type == 'article') { /*搜索文章*/
					this.$set(this.page, 'name', value)
					this.$api.articleSearch(this.page).then(res => {
						this.noData = true
						if (res.success) {
							if (res.page) {
								this.totalCount = res.page.totalCount
							}
							if (this.page.pageNo == 1) {
								this.list = res.data
								if (!res.page.hasNextPage) {
									this.status = 'nomore';
									return
								}
							} else {
								this.list = this.list.concat(res.data)
								if (!res.page.hasNextPage) {
									this.status = 'nomore';
									return
								}
							}
							this.status = 'loadmore';
						}
					})
				} else { /*默认搜索产品*/
					this.$set(this.page, 'name', value)
					this.$api.productSearch(this.page).then(res => {
						this.noData = true
						if (res.success) {
							if (res.page) {
								this.totalCount = res.page.totalCount
							}
							if (this.page.pageNo == 1) {
								this.list = res.data
								if (!res.page.hasNextPage) {
									this.status = 'nomore';
									return
								}
							} else {
								this.list = this.list.concat(res.data)
								if (!res.page.hasNextPage) {
									this.status = 'nomore';
									return
								}
							}
							this.status = 'loadmore';
						}
					})
				}
			},
			loadMore() {
				this.page.pageNo += 1
				if (this.status == 'nomore') return
				this.getSearchResult()
			},
			onReachBottom() {
				this.loadMore()
			},
			handlerSearch() { /*发起搜索*/
				// this.words = this.$u.trim(this.words, 'all')
				if (!this.words) {
					this.$showModal({
						title: '提示',
						content: '请输入搜索内容',
						showCancel: false,
					})
					return
				}
				this.unshiftHistory(this.words)
				this.getSearchResult()
			},
			
			handlerClick(value){/*点击热门搜索或者历史记录tag*/
				this.words = value
				this.unshiftHistory(value)
				this.handlerSearch()
			},
			handlerInput(value) { 
				this.words = this.$u.trim(value, 'all')
			},
			async getHotWords() { /*获取热门搜索*/
				try {
					let hotWordsStorge = this.$storage.get('hotWords')
					if (!hotWordsStorge) {
						this.$api.hotSearchWords().then(res => {
							console.log(res)
							if (res.success) {
								this.hotWords = res.data
								this.$storage.set('hotWords', res.data)
							}
						})
					}else{
						this.hotWords = hotWordsStorge
					}
					
				} catch (error) {
					console.log(error)
				}
			},
			async getHistoryWords() { /*获取搜索历史*/
				try {
					let historyWordsStorage = this.$storage.get('historyWords')
					if (!historyWordsStorage) {
						this.historyWords = []
					} else {
						this.historyWords = historyWordsStorage
					}
				} catch (error) {
					console.log(error)
				}
			},
			unshiftHistory(value) { /*加入搜索历史*/
				if (value == '') return
				if (this.type !== 'product') return
				let flag = true
				if (this.historyWords) {
					this.historyWords.forEach((item, index) => {
						if (item == value) {
							flag = false
							this.historyWords.splice(index, 1)
							this.historyWords.unshift(item)
						}
					})
				}
				if (flag) {
					this.historyWords.unshift(value)
				}
				this.$storage.set('historyWords', this.historyWords)
			},
			clearAll() {
				this.$showModal({
					title: '提示',
					content: '确认清空全部搜索历史吗？',
					success: (res => {
						if (res.confirm) {
							this.$storage.remove('historyWords')
							this.historyWords = []
						} else {}
					})
				})
			},
			clearDone() {
				this.closeable = false
			},
			tagClick(value) {
				this.historyWords.forEach((item, index) => {
					if (item == value) {
						this.historyWords.splice(index, 1)
						this.clearDone()
					}
				})
				this.$storage.set('historyWords', this.historyWords)
			},
			clearHistory() { /*清空搜索历史*/
				this.closeable = true
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #fff;
	}

	.history-search,
	.hot-search {
		.wrap {
			margin-top: -24rpx;
			margin-right: -24rpx;

			.item {
				margin-right: 24rpx;
				margin-top: 24rpx;
			}
		}

		.btns {
			text {
				&::after {
					border-color: #909399;
					transform: none;
					width: 1px;
					height: 100%;
					left: auto;
					right: 0;
				}
			}
		}
	}
</style>
