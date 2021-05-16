<template>
	<view>
		<u-navbar title="我的订单"></u-navbar>
		<view class="list u-p-24">
			<view class="list-wrap" v-if="list.length>0">
				<view class="list-item u-p-24" v-for="item in list" :key="item.id">
					<view class="list-top u-p-b-24 u-border-bottom u-flex u-row-between">
						<view class="time u-tips-color">投保时间：{{item.insureTime}}</view>
						<view class="guarantee u-type-warning u-font-bold">{{formatStatus(item.status)}}</view>
					</view>
					<view class="list-bottom u-p-t-24 u-flex">
						<view class="left u-flex-1 u-tips-color">
							<view class="u-p-b-24 u-main-color u-font-xl u-font-bold">{{item.name}}</view>
							<view>投保人：{{item.insuredName}}</view>
							<view class="u-m-t-8">投保单号：{{item.orderId}}</view>
							<view class="u-m-t-8">保费：¥{{item.totalPremium}}</view>
						</view>
						<u-button class="right u-type-warning" size="medium" type="wraning" @click="toDetail(item.id)">查看详情</u-button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				page:{
					pageNo:1,
					pageSize:5
				},
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
			toDetail(id) {
				uni.navigateTo({
					url: './detail?id=' + id
				})
			},
			getList(){
				this.$api.orderList(this.page).then(res=>{
					if(res.success){
						console.log(res)
						this.list = res.data
					}
				})
			},
			formatStatus(status) {
				switch (status) {
					case '0':
						return '等待付款'
						break;
					case '1':
						return '已付款待生效'
						break;
					case '2':
						return '照会'
						break;
					case '3':
						return '拒保'
						break;
					case '4':
						return '退保待审核'
						break;
					case '5':
						return '已退保'
						break;
					case '6':
						return '犹退件'
						break;
					case '7':
						return '保单生效'
						break;
					case '8':
						return '保全'
						break;
					case '9':
						return '保全照会件'
						break;
					case '10':
						return '理赔件'
						break;
					case '11':
						return '理赔照会件'
						break;
					case '12':
						return '失效'
						break;
					case '13':
						return '解约'
						break;
					case '14':
						return '终止'
						break;
					default:
						return ''
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list {


		.list-item {
			background-color: #fff;
			border-radius: 12rpx;
			margin-bottom: 24rpx;
			&:last-child{
				margin-bottom: 0;
			}
			.right {
				width: 144rpx;
				height: 56rpx;
				padding: 0;
				line-height: 56rpx;
			}
		}
	}
</style>
