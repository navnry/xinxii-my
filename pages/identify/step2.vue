<template>
	<view>
		<u-navbar title="身份认证">
			<view class="u-p-r-24 u-type-warning" slot="right" @click="next"> 下一步 </view>
		</u-navbar>

		<u-steps :current="1"></u-steps>


		<view class="u-m-24 u-p-b-24">
			<u-cell-group title="身份认证" :border="false" :titleStyle="{color:'#333'}">
				<u-cell-item class="u-p-l-24 u-p-r-24 u-p-t-12 u-p-b-12" title="姓名" :arrow="false">
					<u-input class="u-m-l-24" inputAlign="right" placeholder="请输入姓名"></u-input>
				</u-cell-item>
				<u-cell-item class="u-p-l-24 u-p-r-24 u-p-t-12 u-p-b-12" title="证件号码" :arrow="false">
					<u-input class="u-m-l-24" inputAlign="right" placeholder="请输入身份证号码"></u-input>
				</u-cell-item>
			</u-cell-group>

			<u-cell-group class="u-m-t-24" title="上传身份证照片" :border="false" :titleStyle="{color:'#333'}">
				<view class="u-flex u-row-between u-p-14">
					<u-upload customBtn max-count="1" width='316' height='196'>
						<view slot="addBtn" class="idCard positive"></view>
					</u-upload>
					<u-upload customBtn max-count="1" width='316' height='196'>
						<view slot="addBtn" class="idCard verso"></view>
					</u-upload>
				</view>
				
				<view class="u-p-l-24 u-p-r-24 u-p-b-24">
					<view class="u-tips-color u-font-28 u-m-b-8">如下图示范：</view>
					<view class="u-tips-color u-font-24">*请确保身份证照片信息真实有效，清晰可读</view>
						
					<view class="u-flex u-row-between u-m-t-24">
						<view class="u-relative">
							<view class="example example-1"></view>
							<u-icon class="icons" name="checkmark-circle-fill" color="#19be6b"></u-icon>
							<view class="u-text-center u-m-t-28 u-font-24 u-tips-color">标准</view>
						</view>
						<view class="u-relative">
							<view class="example example-2"></view>
							<u-icon class="icons" name="close-circle-fill" color="#FF6510"></u-icon>
							<view class="u-text-center u-m-t-28 u-font-24 u-tips-color">缺损</view>
						</view>
						<view class="u-relative">
							<view class="example example-3"></view>
							<u-icon class="icons" name="close-circle-fill" color="#FF6510"></u-icon>
							<view class="u-text-center u-m-t-28 u-font-24 u-tips-color">模糊</view>
						</view>
						<view class="u-relative">
							<view class="example example-4"></view>
							<u-icon class="icons" name="close-circle-fill" color="#FF6510"></u-icon>
							<view class="u-text-center u-m-t-28 u-font-24 u-tips-color">强光</view>
						</view>
					</view>
				</view>
			</u-cell-group>


			<u-cell-group class="u-m-t-24" title="上传一寸人脸照片" :border="false" :titleStyle="{color:'#333'}">
				<view class="u-flex u-row-between u-p-14">
					<u-upload customBtn max-count="1" width='316' height='196'>
						<view slot="addBtn" class="photo positive"> </view>
					</u-upload>
				</view>
				<view class="u-p-l-24 u-p-r-24 u-p-b-24">
					<view class="u-tips-color u-font-28 u-m-b-8">注意事项：</view>
					<view class="u-tips-color u-font-24">*请确保照片是<text class="u-type-warning">一寸免冠白底照片</text></view>
				</view>
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
		onLoad() {},
		methods: {
			test(){	//校验表单
				
			},
			next() {
				this.$u.route({
					url: 'pages/identify/step3'
				})
			}
		}
	}
</script>

<style lang="scss">
	.idCard {
		width: 316rpx;
		height: 196rpx;
		margin: 10rpx;
	}

	.positive {
		background: url(@/static/identify/join_code_front.png) center/cover no-repeat;
	}

	.verso {
		background: url(@/static/identify/join_code_reverse.png) center/cover no-repeat;
	}

	.photo {
		width: 172rpx;
		height: 206rpx;
		background: url(@/static/identify/join_photo.png) center/cover no-repeat;
		margin: 10rpx;
	}

	.example {
		width: 126rpx;
		height: 100rpx;
	}

	.example-1 {background: url(@/static/identify/join_item_01.png) center/cover no-repeat;}
	.example-2 {background: url(@/static/identify/join_item_02.png) center/cover no-repeat;}
	.example-3 {background: url(@/static/identify/join_item_03.png) center/cover no-repeat;}
	.example-4 {background: url(@/static/identify/join_item_04.png) center/cover no-repeat;}

	.icons {
		position: absolute;
		top: 84rpx;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
