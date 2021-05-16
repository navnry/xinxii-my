<template>
	<view>
		<u-navbar title="全部记录"></u-navbar>
		<view class="" v-if="list.length > 0">
		
		</view>
		<view class="u-p-48" v-else>
			<u-empty text="暂无数据"></u-empty>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				page: {
					pageNo: 1,
					pageSize: 6
				}
			}
		},
		onLoad() {
			// this.getData()
		},
		methods: {
			getData() {
				this.$api.recruitHistory(this.page).then(res => {
					if (res.success) {
						this.list = res.data
					}
				})
			}
		}
	}
</script>

<style lang="scss">
</style>
