<template>
	<view>
		<u-navbar title="设置"></u-navbar>
		<view class="u-m-t-24">
			<u-cell-group>
				<u-cell-item title="公司信息" />
				<u-cell-item title="规则与协议" />
				<!-- #ifdef APP-PLUS -->
				<u-cell-item title="清除缓存" value="520kb" />
				<u-cell-item title="版本信息" value="1.0.3" />
				<!-- #endif -->
				<u-cell-item title="分享APP" />
				<u-cell-item title="新禧公众号" />
			</u-cell-group>
		</view>
		<view v-if="isLogin" class="u-m-t-24 u-border-top u-border-bottom">
			<view class="btn" @click="logout">
				<text>退出登录</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				modalShow: false,
				modalOption: {
					title: '提示',
					content: '内容',
					cancel: '',
					confirm: ''
				}
			}
		},
		computed: {
			...mapState(['isLogin']),
		},
		onLoad() {
			console.log(this.isLogin)
		},
		methods: {
			...mapMutations(['LOGOUT']),
			logout() {
				this.$showModal({
					title:"提示",
					content:"您要退出登录吗？",
					success:res=>{
						if(res.confirm){
							this.LOGOUT()
							this.$u.toast('退出成功');
							setTimeout(() => {
								uni.switchTab({
									url: '/pages/my/index'
								})
							}, 1500)
						}
					}
				})
			},
			confirm(type) {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.btn {
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		background-color: #FFFFFF;
		font-size: 28rpx;
		color: #666;
	}
</style>
