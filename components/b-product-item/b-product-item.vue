<template>
	<view class="product-item u-flex u-p-t-24 u-p-b-24 u-border-bottom">
		<view class="pic u-m-r-24 u-skeleton-rect">
			<u-image width="150rpx" height="150rpx" border-radius="6rpx" :src="data.pictures+'?imageMogr2/crop/216x148'"></u-image>
		</view>
		<view class="info">
			<view class="tit u-skeleton-rect u-font-lg u-line-1 u-font-bold u-m-b-8">{{data.name}}</view>
			<view class="tag u-skeleton-rect u-m-b-8">
				<u-tag class="u-m-r-12" v-for="(item,oIndex) in data.tags" :key="item.id" size="mini" :text="item.name" />
			</view>
			<view class="price u-skeleton-rect u-font-xl u-type-warning u-font-bold">{{data.inPrice.toFixed(2)}} <text class="txt">元/起</text></view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			data: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.product-item {
		&:last-of-type{padding-bottom: 0 !important;
			&::after{display: none;}
		}
		.info {overflow: hidden;}
	}
</style>
