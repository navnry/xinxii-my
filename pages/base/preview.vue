<template>
	<view>
		<u-navbar title="查看大图" :background="background" titleColor="#f7F8F9" :borderBottom="false" back-icon-color="#f7F8F9">
			<view class="u-m-r-24" slot="right">
				<u-icon name="more-dot-fill" size="42" color="#f7F8F9" @click="handlerClick" />
			</view>
		</u-navbar>
		<view class="container">
			<swiper class="swiper-container" :current="index">
				<swiper-item class="swiper-item" v-for="(item,index) in list" :key="index">
					<!-- <img class="images" :src="item"></img> -->
					<image :src="item" mode="widthFix"></image>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#333',
				},
				index: 0,
				list: []
			}
		},
		onLoad(option) {
			if (!option) return
			this.index = +option.index
			this.list = JSON.parse(option.images)
		},
		methods: {
			handlerClick() {

			}
		}
	}
</script>

<style lang="scss">
	.container {
		width: 100%;
		/* #ifdef APP-PLUS */
		height: calc(100vh - 44px - var(--status-bar-height));
		/* #endif */

		/* #ifndef APP-PLUS */
		height: calc(100vh - 44px);
		/* #endif */
		background-color: #333;
	}

	.swiper-container {
		width: 100%;
		height: 100%;
	}

	.swiper-item {
		/* #ifdef APP-PLUS */
		line-height: calc(100vh - 44px var(--status-bar-height));
		/* #endif */

		/* #ifndef APP-PLUS */
		line-height: calc(100vh - 44px);
		/* #endif */
		overflow-y: scroll;
	}
	image,
	.images {
		width: 100%;
		height: auto;
		vertical-align: middle;
	}
</style>
