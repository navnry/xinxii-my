<template>
	<view>
		<u-navbar title="近期焦点"></u-navbar>
		<view class="list">
			<view class="item-wrap u-flex u-flex-wrap u-row-center u-m-24 u-p-24" v-for="(item,index) in focusList" :key="index">
				<u-tag class="u-m-b-24" :text="$u.timeFormat(item.dailyFocus.updateDate, 'yyyy年mm月dd日')" mode="light" type="info" shape="circle" />
				<b-focus-item :data="item.articleList" @click="toDetail"></b-focus-item>
			</view>
		</view>
		<u-divider v-if="dividerShow" class="u-p-24" fontSize="32" bg-color="transparent" color="#FF5500">仅展示近七期内容</u-divider>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				focusList:[],
				dividerShow:false
			}
		},
		onLoad(){
			this.getFocusList()
		},
		methods: {
			getFocusList(){
				this.$api.focusList().then(res=>{
					console.log(res)
					if(res.success){
						this.focusList = res.data
						this.dividerShow = true
					}
				})
			},
			toDetail(e) {
				console.log(e)
				this.$u.route({
					url: '/pages/news/detail',
					params: {
						id: e
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list{
		.item-wrap{
			background-color: #fff;
			border-radius: 12rpx;
		}
	}
</style>
