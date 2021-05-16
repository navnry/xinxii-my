<template>
	<view class="item">
		<view class="item-wrap" v-for="(item,index) in data" :key="item.id" @click="toDetail(item.id)">
			<view class="u-m-b-12 u-relative" v-if="index == 0">
				<u-image :src="item.pic" height="320rpx" border-radius="12"></u-image>
				<view class="mask u-absolute u-flex u-col-bottom">
					<view class="txt u-flex-1 u-line-2 u-m-l-12 u-font-bold u-p-12">{{item.title}}</view>
				</view>
			</view>
			<view class="u-flex u-p-l-18 u-p-r-18 u-p-t-12 u-p-b-12" :class="index % 2 == 1 ? 'one' : 'two'" v-else>
				<view class="tag">
					<u-tag text="焦点" mode="plain" type="warning" size="mini" />
				</view>
				<view class="txt u-flex-1 u-line-1 u-m-l-12 u-font-bold">{{item.title}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			data: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {

			};
		},
		methods:{
			toDetail(id){
				this.$emit('click',id)
			}
		}
	}
</script>

<style lang="scss">
	.item {
		width: 100%;
		.item-wrap {
			.mask{
				width: 100%;
				height: 100%;
				background-color: rgba($color: #000000, $alpha: 0.4);
				top: 0;
				border-radius: 12rpx;
				
				.txt{
					color: #fff;
				}
			}
			.one {
				background-color: #F6F7FF;
				color: #3296FA;
			}

			.two {
				background: #FEF8F2;
				color: #FF6510;
			}
		}
	}
</style>
