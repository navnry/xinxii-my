<template>
	<view>
		<u-navbar title="合同签订">
			<view class="u-p-r-24 u-type-warning" slot="right" @click="next"> 下一步 </view>
		</u-navbar>

		<u-steps :current="3"></u-steps>
		<view class="u-m-24">
			<u-cell-group title="阅读合同" :border="false" :titleStyle="{color:'#333'}">
				<u-cell-item title="经纪人合规承诺书" :arrow="false">
					<u-tag text="阅读并接受" size="mini" type="warning" mode="dark" slot="right-icon" />
				</u-cell-item>
				<u-cell-item title="经纪人服务协议" :arrow="false">
					<u-tag text="阅读并接受" size="mini" type="warning" mode="dark" slot="right-icon" />
				</u-cell-item>
				<u-cell-item title="代理费账户授权委托书" :arrow="false">
					<u-tag text="阅读并接受" size="mini" type="warning" mode="dark" slot="right-icon" />
				</u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			next() {
				this.$u.route({
					url: 'pages/identify/affirm',
					params: {
						type: 'affirm'
					}
				})
			}
		}
	}
</script>

<style>

</style>
