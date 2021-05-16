<template>
	<view>
		<u-navbar title="确认信息" :isBack="false">
			<view class="u-p-l-24 u-type-warning" @click="amend">返回修改</view>
			<view class="u-p-r-24 u-type-warning" slot="right" @click="next">提交</view>
		</u-navbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			amend() {
				this.$u.route({
					url: 'pages/identify/step1',
					type:'reLaunch'
				})
			},
			next(){
				
			}
		}
	}
</script>

<style>

</style>
