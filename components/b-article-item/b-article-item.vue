<template>
	<view class="article-item u-border-bottom u-padding-bottom-24 u-padding-top-24 " @click="onClick(data.id)">
		<view class="u-flex">
			<view class="info u-flex-1 u-m-r-12">
				<view class="tit u-line-2">{{data.title}}</view>
				<view class="time u-m-t-12">
					<u-tag class="u-m-r-12" v-if="data.btnName" :text="data.btnName" type="primary" size="mini" /> 
					<text class="u-font-22 u-tips-color">阅读量·{{data.readNum|million}} 转发量·{{data.shareNum|million}}</text>
				</view>
			</view>
			<u-image width="202rpx" height="146rpx" border-radius="6rpx" :src="data.pic+'?imageMogr2/crop/216x148'"></u-image>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			data: {
				type: Object,
				default:()=>{}
			},
		},
		filters: {
			million(value) {
				if (!value) {
					value = 0
				}
				let num;
				if (value > 9999) {
					num = (Math.floor(value / 1000) / 10) + 'W'
				} else if (value < 9999) {
					num = value
				}
				return num
			}
		},
		methods: {
			onClick(id) {
				this.$emit('click', id)
			}
		},
		onShow() {
			console.log('切换了')
		},
	}
</script>

<style lang="scss">
	.article-item{
		&:last-child{
			&::after{
				display: none;
			}
		}
	}
	.tit{
		height: 3em;
	}
</style>
