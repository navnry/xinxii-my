<template>
	<view>
		<u-navbar title="钱包"></u-navbar>
		<view class="wallet u-m-t-24 u-p-24 ">
			<view class="tit u-flex u-p-b-24">
				<text class="u-m-r-12 u-font-32 u-font-bolder ">可提现 (元)</text>
				<u-icon size="32" name="eye-fill" color="#666"/>
			</view>
			<view class="money u-flex u-p-b-24">
				<text class="u-flex-1 u-font-64 u-font-bolder">0.00</text>
				<u-button class="withdrawal u-row-right" type="warning" plain>提现</u-button>
			</view>
			<view class="total u-tips-color u-font-30 u-flex">
				<text class="u-m-r-12">总收入(元)</text>
				<text>0.00</text>
			</view>
		</view>
		<view class="u-m-t-24">
			<u-cell-group>
				<u-cell-item title="资产明细" @click='toDetail'/>
				<u-cell-item title="银行卡" />
				<u-cell-item title="提现记录" />
			</u-cell-group>
		</view>
		<view class="tip u-text-center u-font-24 u-p-24">
			<u-divider bgColor="transparent">常见问题</u-divider>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[
					{"name": "John", "Average": 15, "High": 10, "DtmStamp": 1358226000000},
					{"name": "Jane", "Average": 16, "High": 92, "DtmStamp": 1358226000000},
					{"name": "Jane", "Average": 17, "High": 45, "DtmStamp": 1358226000000},
					{"name": "John", "Average": 18, "High": 87, "DtmStamp": 1358226000000},
					{"name": "Jane", "Average": 15, "High": 10, "DtmStamp": 1358226060000},
					{"name": "John", "Average": 16, "High": 87, "DtmStamp": 1358226060000},
					{"name": "John", "Average": 17, "High": 45, "DtmStamp": 1358226060000},
					{"name": "Jane", "Average": 18, "High": 92, "DtmStamp": 1358226060000},
				]
			}
		},
		onLoad() {
			var sorted = this.groupBy(this.list, item => {
				return [item.name]
			})
			console.log(sorted)
		},
		methods: {
			toDetail(){
				this.$u.route({
					url: 'pages/my/wallet/detail',
				})
			},
			groupBy(array, fn) {
				var groups = {}
				array.forEach((o) => {
					var group = JSON.stringify(fn(o))
					groups[group] = groups[group] || []
					groups[group].push(o)
				});
				return Object.keys(groups).map(group => {
					return {
						name: group,
						list: groups[group]
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wallet{
		background-color: #fff;
		border-radius: 12rpx;
		.withdrawal{
			width: 156rpx;
			height: 64rpx;
			font-size: 32rpx;
		}
	}
</style>
