<template>
	<view class="friend-item u-p-24 u-border-bottom">
		<view class="u-flex u-col-top">
			<view class="avatar">
				<u-avatar :src="data.logo" mode="square"></u-avatar>
			</view>
			<view class="right u-m-l-24 u-flex-1">
				<view class="username u-font-28 u-type-warning u-font-bold">
					<text>{{data.realName}}</text>
				</view>
				<view class="content u-font-28 u-m-t-12">
					<u-parse :html="data.content"></u-parse>
				</view>
				<view class="pic u-flex u-flex-wrap u-m-t-32"
					:class="data.picList.length == 1 ? 'one' : (data.picList.length == 3 ? 'three' : (data.picList.length == 4 ? 'four' :'two' ))">
					<view class="pic-item" v-for="(item,index) in data.picList" :key="index">
						<u-image borderRadius="6" :src="item" :width="data.width" :height="data.height" @click="doPreviewImage(item, index)" />
					</view>
				</view>
				<view class="u-flex u-m-t-24 u-row-between u-p-r-24">
					<view class="u-tips-color u-font-22">
						{{$u.timeFrom(time)}}
					</view>
					<view class="" @click="share">
						<u-icon name="more-dot-fill"></u-icon>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			data: {
				type: Object,
				default: () => {}
			},
			imgStyle: {
				type: Object,
				default: () => {}
			},
			// 是否在点击预览图后展示全屏图片预览
			previewFullImage: {
				type: Boolean,
				default: true
			},
		},
		data() {
			return {}
		},
		computed: {
			time() {
				return this.formatDate(this.data.createDate)
			}
		},
		onLoad() {},
		methods: {

			/*处理部分移动端invalid date的问题*/
			formatDate(str) {
				var time = str.replace(/-/g, ':').replace(' ', ':').split(':')
				return new Date(time[0], (time[1] - 1), time[2], time[3], time[4], time[5]).getTime()
			},
			share() {
				this.$emit('share')
			},
			doPreviewImage(url, index) {
				const images = JSON.stringify(this.data.picList)
				console.log(images)
				this.$u.route({
					url: 'pages/base/preview',
					animationType: 'zoom-fade-out',
					params: {
						images: images,
						index: index
					}
				})
			},
			/*
			doPreviewImage(url, index) {
				if (!this.previewFullImage) return;
				const images = this.data.picList.map(item => item)
				uni.previewImage({
					urls: images,
					current: index,
					success: () => {
						this.$emit('on-preview', url, this.lists, this.index);
					},
					fail: () => {
						uni.showToast({
							title: '预览图片失败',
							icon: 'none'
						});
					}
				});
			},
			*/
		}
	}
</script>

<style lang="scss">
	.friend-item {
		.right {
			.pic {
				.pic-item {position: relative;margin-top: 2%;margin-right: 2%;
					&:nth-child(-n+3) {margin-top: 0;}
				}
				&.two {
					.pic-item {&:nth-child(3n) {margin-right: 0;}}
				}
				&.three {
					.pic-item {width: 32%;height: 0;padding-bottom: 32%;margin-right: 2%;
						&:nth-child(3n) {margin-right: 0;}
					}
				}
				&.four {
					.pic-item {
						&:nth-child(-n+2) {margin-top: 0;}
						&:nth-child(3) {margin-top: 2%;}
					}
				}
			}
		}
	}
</style>
