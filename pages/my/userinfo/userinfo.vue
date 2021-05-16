<template>
	<view>
		<u-navbar title="个人中心"></u-navbar>
		<view class="" v-show="userInfo">
			<u-cell-group class="u-m-t-12">
				<u-cell-item title="头像" label="请上传证件照或职业照" :arrow="false">
					<view class="" slot="right-icon">
						<u-image :src="userInfo.logo" width="84" height="84" shape="circle" :fade="false" @click="doPreviewImage(userInfo.logo)"></u-image>
					</view>
				</u-cell-item>
				<u-cell-item title="昵称">
					<view class="" slot="right-icon">
						<view class="u-font-12 u-tips-color">
							<text>{{userInfo.realname}}</text>
						</view>
					</view>
				</u-cell-item>
				<u-cell-item title="性别" :value="userInfo.sex ? userInfo.sex == 0 ? '女' : '男' : ''" ></u-cell-item>
				<u-cell-item title="所属公司" :value="userInfo.company"></u-cell-item>
			</u-cell-group>
			
			<u-cell-group class="u-m-t-12">
				<u-cell-item title="手机号" :value="userInfo.mobile" ></u-cell-item>
				<u-cell-item title="推广资格证">
					<view class="u-font-12 u-type-warning" slot="right-icon">
						<text>{{userInfo.reviewResultCode ? userInfo.reviewResultCode.code == 5 ? '已认证' : '未认证' : ''}}</text>
					</view>
				</u-cell-item>
			</u-cell-group>
			
			<u-cell-group class="u-m-t-12">
				<u-cell-item title="绑定微信" ></u-cell-item>
				<u-cell-item title="更改登录密码" ></u-cell-item>
				<u-cell-item title="注销账号" ></u-cell-item>
			</u-cell-group>
			
			<view class="u-m-24">
				<u-divider bg-color="transparent">常见问题</u-divider>
			</view>
			
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {}
		},
		computed: {
			...mapState(['userInfo']),
		},
		onLoad() {
			console.log(this.userInfo)
		},
		methods: {
			doPreviewImage(url) {
				let urls = []
				const images = urls.concat(url)
				uni.previewImage({
					urls: images,
					success: () => {
						this.$emit('on-preview', url, this.lists, this.index);
					},
					fail: () => {
						uni.showToast({
							title: '预览图片失败',
							icon: 'none'
						});
					}
				});
			},
		}
	}
</script>

<style>

</style>
