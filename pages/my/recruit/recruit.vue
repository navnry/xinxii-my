<template>
	<view>
		<u-navbar title="增员认证">
			<view class="u-m-r-24" slot="right">
				<u-icon name="more-dot-fill" size="42" color="#666" @click="handlerClick" />
			</view>
		</u-navbar>
		<view class="" v-if="list.length > 0">

		</view>
		<view class="u-p-48" v-else>
			<u-empty text="暂无数据"></u-empty>
		</view>
		<u-action-sheet :list="sheetList" v-model="popupShow" @click="toHistory"></u-action-sheet>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				popupShow: false,
				sheetList: [{
					text: '查看全部记录'
				}],
				list:[]
			}
		},
		methods: {
			handlerClick() {
				this.popupShow = true
			},
			toHistory(index){
				uni.navigateTo({url:'./history'})
			}
		}
	}
</script>

<style lang="scss">

</style>
