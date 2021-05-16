<template>
	<view>
		<u-navbar :is-back="false" :border-bottom="false">
			<view class="u-flex u-row-right" style="width: 100%;">
				<view class="camera u-flex u-row-center">
					<u-icon name="traffic" custom-prefix="custom-icon" color="#666" size="56"></u-icon>
				</view>
			</view>
		</u-navbar>
		<view class="u-flex user-box u-p-l-30 u-p-r-20 " @click="userClick">
			<view class="u-m-r-10">

				<!-- 头像 -->
				<u-avatar :src="userInfo ? userInfo.logo : ''" size="120"
					:show-level="userInfo.reviewResultCode ? (userInfo.reviewResultCode.code == '5' ? true : false) : false"
					:show-sex="!!userInfo.sex" :sex-icon="userInfo.sex == '0' ? 'woman':'man'" />
			</view>
			<view class="u-flex-1 u-m-l-12">

				<!-- 昵称 -->
				<view class="u-font-18 ">
					<text>{{userInfo.realname ? userInfo.realname : '未登录'}}</text>
				</view>

				<!-- 标签 -->
				<u-tag v-if="userInfo.reviewResultCode" :text="userInfo.reviewResultCode.jobLevel" type="warning"
					shape="circle" size="mini" />

			</view>
			<view class="u-m-l-12 u-p-12">
				<u-icon name="arrow-right" color="#969799" size="32"></u-icon>
			</view>
		</view>
		<view class="user-bar">
			<view class="user-bar-wrap">
				<view class="left">{{userInfo.reviewResultCode ? userInfo.reviewResultCode.jobLevel : '游客'}}</view>
				<view class="right">认证职业认证获取推广资格</view>
			</view>
		</view>
		
		<view>
			<u-cell-group>
				<u-cell-item title="钱包" @click="toWallet" >
					<view class="u-m-r-12" slot="icon">
						<u-icon size="32" name="red-packet" color="#1077FF" />
					</view>
				</u-cell-item>
			</u-cell-group>
		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item title="订单列表" @click="toOrder">
					<view class="u-m-r-12" slot="icon">
						<u-icon size="32" name="order" color="#1077FF" />
					</view>
				</u-cell-item>
				<u-cell-item title="增员认证" value="您有新的增员认证待处理" @click="toRecruit">
					<view class="u-m-r-12" slot="icon">
						<u-icon size="32" name="man-add" color="#FFBA00" />
					</view>
				</u-cell-item>
				<u-cell-item title="我的邀请">
					<view class="u-m-r-12" slot="icon">
						<u-icon size="32" name="share" color="#EF4034" />
					</view>
				</u-cell-item>
				<u-cell-item title="我的团队" @click="toTeam" >
					<view class="u-m-r-12" slot="icon">
						<u-icon size="32" name="account" color="#EF4034" />
					</view>
				</u-cell-item>
				<u-cell-item title="客户管理" @click="toCustom">
					<view class="u-m-r-12" slot="icon">
						<u-icon size="32" name="grid" color="#FFBA00" />
					</view>
				</u-cell-item>
			</u-cell-group>
		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item title="平台资质" >
					<view class="u-m-r-12" slot="icon">
						<u-icon size="32" name="grid" color="#1077FF" />
					</view>
				</u-cell-item>
				<u-cell-item title="意见反馈" @click="toOpinion" >
					<view class="u-m-r-12" slot="icon">
						<u-icon size="32" name="email" color="#EF4034" />
					</view>
				</u-cell-item>
			</u-cell-group>
		</view>

		<view class="u-m-t-20 u-m-b-20">
			<u-cell-group>
				<u-cell-item title="设置" @click="toSet" >
					<view class="u-m-r-12" slot="icon">
						<u-icon size="32" name="setting" color="#FF5000" />
					</view>
				</u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	import {
		Debounce
	} from '@/common/utils/index'
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				pic: '',
				userName: '',
				show: true,
				flag: false,
				// userInfo:{

				// },
				modalShow: false
			}
		},
		onLoad() {
			console.log(this.userInfo)
		},
		computed: {
			...mapState(['isLogin', 'userInfo']),
		},
		methods: {
			userClick() {
				this.myRoute('./userinfo/userinfo')
			},
			toWallet() {
				this.myRoute('./wallet/wallet')
			},

			toOrder() {
				this.myRoute('./order/list')
			},
			toRecruit() {
				this.myRoute('./recruit/recruit')
			},
			toOpinion() {
				this.myRoute('./opinion/opinion')
			},
			toCustom(){
				this.myRoute('../customer/customer')
			},
			toSet() {
				uni.navigateTo({
					url: './set/set'
				})
			},
			toTeam() {
				this.myRoute('./team/team')
			},
			myRoute(router) {
				if (!router) return
				if (!this.isLogin) {
					this.$showModal({
						title: "提示",
						content: "您还未登录，现在去登录吗？",
						success: (res) => {
							console.log(res)
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/base/login'
								})
							} else {
								return
							}
						}
					});
					return
				}
				uni.navigateTo({
					url: router
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.camera {
		width: 54px;
		height: 44px;
		&:active {
			background-color: #ededed;
		}
	}
	.user-box {
		background-color: #f6f7f8;
		position: relative;
		z-index: 1;
		overflow: hidden;
		padding-bottom: 96rpx;
		margin-bottom: -24rpx;
		&::after {
			content: '';
			width: 150%;
			height: 200rpx;
			position: absolute;
			left: 50%;
			top: 0;
			transform: scale(2) translateX(-50%);
			z-index: -1;
			border-radius: 0 0 50% 50%;
			background: #fff;
		}
	}
	.user-bar {
		margin: 0 24rpx;
		position: relative;
		top: -24rpx;
		z-index: 2;
		.user-bar-wrap {
			height: 88rpx;
			background-color: #333;
			border-radius: 12rpx 12rpx 0 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 24rpx;
			font-size: 26rpx;
			color: #FEA748;
		}
	}

</style>
