<template>
	<view class="wrap">
		<scroll-view scroll-y>
			<view v-for="(item,index) in resource" :key="index" :id="item.key">
				<view class="anchor">{{item.key}}</view>
				<view v-for="(oItem,oIndex) in item.data" class="info" :key="oIndex" @click="clickFn(oItem)">
					<view class="item">
						<view class="left">
							<text class="name">{{oItem.userName}}</text>
							<text class="post">{{oItem.jobNumber}}</text>
						</view>
						<view class="right">
							<text class="work">{{oItem.jobLevel}}</text>
							<x-icon type="arrow-right" size="32" color="#999"></x-icon>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	const pinyin = new(require('./pinyin'))({
		charCase: 0
	})
	export default {
		props: {
			datas: {
				type: Array,
				default () {
					return [];
				}
			},
		},
		data() {
			return {
				resource: [],
				chars: [],
				cache: []
			};
		},
		watch: {
			datas: {
				handler(newVal, oldVal) {
					if(this.getType(newVal) !== "array") return
					this.parseData(newVal)
				},
				deep: true
			}
		},
		methods: {
			parseData(arr) { //处理姓名分组、排序
				let data = []
				this.chars = []
				for (let i = 65; i <= 90; i++) { //创建A-Z的对象数组
					let key = String.fromCharCode(i)
					data.push({"key": key,data: []})
					this.chars.push(key)
				}
				data.push({"key": "#",data: []})
				this.chars.push("#")
				if (this.getType(arr) === "array") { // 填充数据
					arr.forEach(item => { // 找到char的位置
						data.forEach((oItem, oIndex) => {
							let initialsKey = this.parseChar(item.userName)
							if (initialsKey.charCodeAt() < 65 || initialsKey.charCodeAt() > 90) {
								initialsKey = "#"
							}
							if (oItem.key === initialsKey) {
								data[oIndex].data.push(item)
							}
						})
					})
				}
				// 组合最后数据并踢出没有匹配到A-Z中的任意数据
				let finalData = []
				for (let i in data) {
					if (data[i].data.length > 0) {
						finalData.push(data[i])
					}
				}
				this.resource = finalData
				this.cache = finalData
				finalData = null
			},

			parseChar(str) { //获取首字母
				if (this.getType(str) !== 'string') {
					return "#"
				}
				let chars = pinyin.getFullChars(str)
				return chars[0].toUpperCase()
			},

			search(str) { //搜索
				if (!str) {
					this.resource = this.cache
					return
				}
				let temp = []
				this.cache.forEach(item => {
					item.data.forEach(oItem => {
						if (oItem.userName.indexOf(str) > -1) { // 匹配到
							// 确定当前这个元素的key是谁
							let key = item.key
							// 找到temp中的key
							let index = 0 //下标
							let find = false // 数据是否存在
							for (let i in temp) {
								if (temp[i].key === item.key) {
									index = i
									find = true
								}
							}
							if (find) { // 如果key已经存在，直接插入数据
								temp[index].data.push(oItem)
							} else { // 不存在初始化一个并存入
								temp.push({key: item.key,data: [oItem]})
							}
						}
					})
				})
				this.resource = temp
			},
			
			clickFn(item) {
				this.$emit("click", item)
			},

			getType(val) {
				return Object.prototype.toString.call(val).slice(8, -1).toLowerCase()
			},
		},
		mounted() {
			this.parseData(this.datas)
		}
	};
</script>
<style lang="scss">
	page {background: #F6F7F8;}
	scroll-view {width: 100%;height: 100%;}
	.wrap {position: absolute;left: 0;right: 0;bottom: 0;top: calc(188rpx + 44px + var(--status-bar-height));}
	.anchor {position: sticky;line-height: 48rpx;top: 0;left: 0;background: #F6F7F8;z-index: 99998;font-size: 26rpx;color: #999;padding: 0 24rpx;}
	.info {display: flex;justify-content: flex-start;align-items: center;padding: 0 24rpx;background: #fff;
		&:last-of-type {.item {&::after {display: none;}}}
		.item {flex: 1;display: flex;justify-content: space-between;align-items: center;position: relative;padding: 24rpx 0;
			&::after {content: '';position: absolute;width: 100%;height: 1px;background-color: #F0F0F0;left: 0;bottom: 0;transform: scaleY(0.5);}
			.left {display: flex;flex-direction: column;justify-content: space-around;}
			.name {font-size: 34rpx;line-height: 48rpx;color: #333;}
			.work {font-size: 30rpx;color: #333333;line-height: 42rpx;margin-right: 8rpx;}
			.post {font-size: 30rpx;line-height: 42rpx;color: #999;}
		}
	}
</style>