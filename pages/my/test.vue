<template>
	<view class="u-p-24">
		<view class="u-p-24" style="background-color: #fff;border-radius: 12rpx;">
			<u-time-line >
				<u-time-line-item nodeTop="2">
					<template v-slot:time>
						<view class="u-font-30 u-text-center" style="line-height: 1.2;">04-22</view>
						<view class="u-font-24 u-text-center u-tips-color" style="line-height: 1.2;">14:00</view>
					</template>
					<template v-slot:node>
						<view class="u-node" style="background: #19be6b;">
							<u-icon name="pushpin-fill" color="#fff" :size="24"></u-icon>
						</view>
					</template>
					<template v-slot:content>
						<view>
							<view class="u-order-title">待取件</view>
							<view class="u-order-desc">[自提柜]您的快件已放在楼下侧门，直走前方53.6米，左拐约10步，再右拐直走，见一红灯笼停下，叩门三下，喊“芝麻开门”即可。</view>
						</view>
					</template>
				</u-time-line-item>
				<u-time-line-item>
					<template v-slot:time>
						<view class="u-font-30 u-text-center" style="line-height: 1.2;">04-22</view>
						<view class="u-font-24 u-text-center u-tips-color" style="line-height: 1.2;">11:00</view>
					</template>
					<template v-slot:content>
						<view>
							<view class="u-order-desc">【深圳市】日照香炉生紫烟，遥看瀑布挂前川，飞流直下三千尺，疑是银河落九天。</view>
						</view>
					</template>
				</u-time-line-item>
			</u-time-line>
		</view>
		
	</view>
</template>

<style lang="scss" scoped>
	.u-node {
		width: 44rpx;
		height: 44rpx;
		border-radius: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #d0d0d0;
	}
	
	.u-order-title {
		color: #333333;
		font-weight: bold;
		font-size: 32rpx;
	}
	
	.u-order-desc {
		color: rgb(150, 150, 150);
		font-size: 28rpx;
		margin-bottom: 6rpx;
	}
	
	.u-order-time {
		color: rgb(200, 200, 200);
		font-size: 26rpx;
	}
</style>