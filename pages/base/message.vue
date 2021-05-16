<template>
	<view class="content">
		<u-navbar title="消息中心">
			<view class="u-p-r-24" slot="right">
				<u-icon name="setting" size="36" color="#666" />
			</view>
		</u-navbar>
		<view class="">
			<u-cell-group>
				<u-cell-item title="系统通知">
					<view class="u-m-r-16" slot="icon">
						<view class="" style="background: url('../../static/message/msg_system.png') center /cover no-repeat;width: 84rpx;height: 84rpx;"> </view>
						<!-- <u-image lazy-load src="@/static/message/msg_system.png" mode="" width="84" height="84" /> -->
					</view>
					<u-badge slot="right-icon" :count="sysMsgNum" :absolute="false"></u-badge>
				</u-cell-item>
				<u-cell-item title="营销活动" :value="marketingMsg">
					<view class="u-m-r-16" slot="icon">
						<view class="" style="background: url('../../static/message/msg_active.png') center /cover no-repeat;width: 84rpx;height: 84rpx;"> </view>
						<!-- <u-image lazy-load src="@/static/message/msg_active.png" mode="" width="84" height="84" /> -->
					</view>
					<u-badge slot="right-icon" :count="marketingNum" :absolute="false"></u-badge>
				</u-cell-item>
				<u-cell-item title="产品动态" :value="productMsg">
					<view class="u-m-r-16" slot="icon">
						<view class="" style="background: url('../../static/message/msg_product.png') center /cover no-repeat;width: 84rpx;height: 84rpx;"> </view>
						<!-- <u-image lazy-load src="@/static/message/msg_product.png" mode="" width="84" height="84" /> -->
					</view>
					<u-badge slot="right-icon" :count="productNum" :absolute="false"></u-badge>
				</u-cell-item>
				<u-cell-item title="订单通知" :value="orderMsg">
					<view class="u-m-r-16" slot="icon">
						<view class="" style="background: url('../../static/message/msg_order.png') center /cover no-repeat;width: 84rpx;height: 84rpx;"> </view>
						<!-- <u-image lazy-load src="@/static/message/msg_order.png" mode="" width="84" height="84" /> -->
					</view>
					<u-badge slot="right-icon" :count="orderNum" :absolute="false"></u-badge>
				</u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				sysMsg: '',
				sysMsgNum: 0,
				marketingMsg: '',
				marketingNum: 0,
				productMsg: '',
				productNum: 0,
				orderMsg: '',
				orderNum: 0
			}
		},
		computed: {
			...mapState(['message', 'isLogin']),
		},
		onShow() {
			this.getMessageList()
		},
		onLoad() {
		},
		methods: {
			getMessageList() {
				this.$http.post('/member/message/getAllNewMsg.do').then(res => {
					if (res.success && null != res.data) {
						this.sysMsg = res.data.sysMsg.title
						this.sysMsgNum = res.data.sysMsgNum

						this.marketingMsg = res.data.marketingMsg.title
						this.marketingNum = res.data.marketingMsgNum

						this.productMsg = res.data.productMsg.title
						this.productNum = res.data.productMsgNum

						this.orderMsg = res.data.orderMsg.title
						this.orderNum = res.data.orderMsgNum
					}
				})
			}
		}
	}
</script>


<style lang="scss">
	page {
		background-color: #fff;
	}
</style>
