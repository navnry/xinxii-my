<template>
	<view>
		<u-navbar title="身份认证">
			<view class="u-p-r-24 u-type-warning" slot="right" @click="next"> 下一步 </view>
		</u-navbar>

		<u-steps :current="1"></u-steps>


		<view class="u-m-24 u-p-b-24">
			<u-form ref="uForm" :model="form" :errorType="['toast']">


				<u-cell-group title="身份认证" :border="false" :titleStyle="{color:'#333'}">
					<u-form-item labelWidth="140" class="u-p-t-12 u-p-b-12 u-p-l-24 u-p-r-24" label="姓名" prop="name">
						<u-input class="u-font-28" v-model="form.name" placeholder="请输入您的姓名" :clearable="false" inputAlign="right" />
					</u-form-item>
					<u-form-item labelWidth="140" class="u-p-t-12 u-p-b-12 u-p-l-24 u-p-r-24" label="证件号码"
						prop="idCardNo">
						<u-input v-model="form.idCardNo" placeholder="请输入身份证号码" :clearable="false" inputAlign="right" />
					</u-form-item>
				</u-cell-group>

				<u-cell-group class="u-m-t-24" title="上传身份证照片" :border="false" :titleStyle="{color:'#333'}">
					<u-row class="u-p-l-24 u-p-r-24" justify="between">
						<u-col class="u-p-0" span="6">
							<u-form-item>
								<u-upload customBtn max-count="1" width='316' height='196'>
									<view slot="addBtn" class="idCard positive"></view>
								</u-upload>
							</u-form-item>
						</u-col>
						<u-col class="u-p-0" span="6">
							<u-form-item>
								<u-upload customBtn max-count="1" width='316' height='196'>
									<view slot="addBtn" class="idCard verso"></view>
								</u-upload>
							</u-form-item>
						</u-col>
					</u-row>


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
			</u-form>
		</view>
	</view>
</template>

<script>
	import rules from '../../common/utils/formValidate.js'
	export default {
		data() {
			return {
				rules: rules.validateStep2,
				form: {
					name: '道道全',
					idCardNo: '431222199811194963'
				}

			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules)
		},
		onLoad() {
			console.log(this.$u.test.idCard(this.form.idCardNo))
		},
		methods: {
			next() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						// this.$u.route({
						// 	url: 'pages/identify/step3'
						// })
					} else {
						// this.$u.toast("校验失败")
					}
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

	.example-1 {
		background: url(@/static/identify/join_item_01.png) center/cover no-repeat;
	}

	.example-2 {
		background: url(@/static/identify/join_item_02.png) center/cover no-repeat;
	}

	.example-3 {
		background: url(@/static/identify/join_item_03.png) center/cover no-repeat;
	}

	.example-4 {
		background: url(@/static/identify/join_item_04.png) center/cover no-repeat;
	}

	.icons {
		position: absolute;
		top: 84rpx;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
