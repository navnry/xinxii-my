<template>
	<view class="">
		<u-navbar title="身份认证">
			<view class="u-p-r-24 u-type-warning" slot="right" @click="next"> 下一步 </view>
		</u-navbar>

		<u-steps :current="1"></u-steps>
		<view class="u-m-24 u-p-b-24">
			<u-form :model="form" ref="uForm" :errorType="errorType">
				<u-cell-group title="身份认证" :border="false" :titleStyle="{color:'#333'}">
					<view class="u-p-l-24 u-p-r-24">
						<u-form-item label="姓名" prop="name" labelWidth="180">
							<u-input inputAlign="right" v-model="form.name" placeholder="请输入姓名" :clearable="false" />
						</u-form-item>
						<u-form-item label="证件号码" prop="idCard" labelWidth="180">
							<u-input inputAlign="right" v-model="form.idCard" placeholder="请输入证件号码"
								:clearable="false" />
						</u-form-item>
					</view>
				</u-cell-group>

				<u-cell-group class="u-m-t-24" title="上传身份证照片" :border="false" :titleStyle="{color:'#333'}">
					<view class="u-flex u-row-between u-p-14">
						<u-form-item prop="idFront">
							<u-upload customBtn max-count="1" width='316' height='196' :action="action" @on-progress="onProgess" :header="uploadHeader"  @on-success="onSuccess">
								<view slot="addBtn" class="idCard positive"></view>
							</u-upload>
						</u-form-item>
						<u-form-item prop="idBack">
							<u-upload customBtn max-count="1" width='316' height='196'>
								<view slot="addBtn" class="idCard verso"></view>
							</u-upload>
						</u-form-item>
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

				<u-cell-group class="u-m-t-24 " title="上传一寸人脸照片" :border="false" :titleStyle="{color:'#333'}">
					<view class="u-p-14">
						<u-form-item prop="photo">
							<u-upload customBtn max-count="1" width='172' height='206'>
								<view slot="addBtn" class="photo positive"> </view>
							</u-upload>
						</u-form-item>
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
	export default {
		data() {
			return {
				errorType: ['toast'],
				action: '/api/file/img/upload2.do',
				uploadHeader:{},
				form: {
					name: '张尧冬',
					idCard: '522325199704103613',
					idFront: '',
					idBack: '',
					photo: '',
				},
				rules: {
					name: [{
							required: true,
							message: '请输入姓名',
							trigger: ['change', 'blur'],
						},
						{
							min: 2,
							message: '姓名不能少于2个字',
							trigger: ['change', 'blur'],
						},
						{
							message: '姓名仅支持中文',
							validator: (rule, value, callback) => {
								return this.$u.test.chinese(value)
							},
						}
					],
					idCard: [{
							required: true,
							message: '请输入证件号码',
							trigger: ['change', 'blur'],
						},
						{
							message: '请输入正确的身份证号码',
							trigger: ['change', 'blur'],
							validator: (rule, value, callback) => {
								return this.$u.test.idCard(value)
							},
						},
						{
							trigger: ['change', 'blur'],
							asyncValidator: (rule, value, callback) => {
								this.$http.get('/member/qualification/verifyIdentity.do?licenseNumber=' + value)
									.then(res => {
										if (!res.success) { // 如果验证不通过，需要在callback()抛出new Error('错误提示信息')
											callback(new Error(res.description));
										} else { // 如果校验通过，也要执行callback()回调
											callback();
										}
									})
							},
						}
					],
					idFront: [{
						required: true,
						message: '请上传身份证正面',
						trigger: ['change', 'blur'],
					}],
					idBack: [{
						required: true,
						message: '请上传身份证背面',
						trigger: ['change', 'blur'],
					}],
					photo: [{
						required: true,
						message: '请上传证件照',
						trigger: ['change', 'blur'],
					}]
				}
			};
		},
		onLoad() {
			let userinfo = this.$storage.get('userInfo')
			if(userinfo && userinfo.token){
				this.$set(this.uploadHeader,'Authorization',userinfo.token)
			}
		},
		methods: {
			onSuccess(data, index, lists, name){
				
			},
			onProgess(data, index, lists, name){
				console.log(data)
				console.log(index)
				console.log(lists)
				console.log(name)
			},
			next() {
				this.$refs.uForm.validate(valid => {
					console.log(this.$refs.uForm.model)
					if (valid) {
						console.log('验证通过');
						console.log(this.$refs.uForm.model)
						this.$u.route({
							url: 'pages/identify/step3',
							params: this.$refs.uForm.model
						})
					} else {
						console.log('验证失败');
					}
				});
			}
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	};
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
