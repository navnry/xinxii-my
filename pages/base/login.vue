<template>
	<view class="content">
		<u-navbar title="登录" :border-bottom="false" />
		<view class="main">
			<view class="logo u-flex u-row-center u-m-t-48">
				<u-image width="222rpx" height="72rpx" src="@/static/my/login_logo.png" :fade="false" />
			</view>
			<view class="u-p-t-64">
				<view class="u-m-l-64 u-m-r-64 u-m-t-48">
					<view class="u-flex u-border-bottom">
						<u-input 
							v-model="loginParams.username" 
							height="100" 
							type="number" 
							maxlength="11" 
							placeholder="请输入手机号" />
					</view>
					<view class="u-flex u-border-bottom">
						<u-input
							v-model="loginParams.password"
							height="100"
							:maxlength="isCodeLogin ? '6' : '18'"
							:type="isCodeLogin ? 'number' : 'password'"
							:placeholder="isCodeLogin ? '请输入验证码' : '请输入密码'"
						/>
						<view class="u-m-l-24" v-show="isCodeLogin">
							<u-verification-code ref="uCode" @change="codeChange" />
							<u-button size="mini" hover-class="none" shape="circle" @click="getCode">{{ tips }}</u-button>
						</view>
					</view>
					<view class="u-flex u-row-right u-m-t-24 u-m-b-48">
						<text class="u-font-sm u-content-color" @click="switchType">{{ isCodeLogin ? '使用密码登录' : '使用验证码登录' }}</text>
					</view>
					<u-button type="warning" :loading="logining" ripple @click="handleLogin">{{ isCodeLogin ? '手机号登录' : '登录' }}</u-button>
					<view class="u-flex u-font-sm u-tips-color u-tips-color">
						<text class="u-p-t-24 u-p-b-24" v-show="isCodeLogin">未注册的手机号验证后自动创建新禧账号</text>
						<text class="u-p-t-24 u-p-b-24" v-show="!isCodeLogin" @click="forget">忘记密码</text>
					</view>
				</view>
			</view>
		</view>
		<u-divider class="u-m-t-48 u-p-t-64" bg-color="#fff">其他方式登录</u-divider>
		<view class="u-flex u-m-t-48 u-row-center u-m-l-64 u-m-r-64">
			<view class="u-flex" style="flex-direction:column" @click="toOauth">
				<u-icon name="weixin-fill" size="64" color="#00C800" />
				<text class="u-font-xs u-content-color">微信</text>
			</view>
		</view>
		<view class="tips u-m-l-24 u-m-r-24 u-m-t-48 u-font-sm u-content-color">
			<text>登录即代表已同意</text>
			<text class="u-type-warning" @click.stop="openUrl('../ebook/register')">用户注册及使用协议、</text>
			<text class="u-type-warning" @click.stop="openUrl('../ebook/privacypolicy')">隐私政策</text>
			<text>及</text>
			<text class="u-type-warning" @click.stop="openUrl('../ebook/personal')">个人信息使用授权书</text>
		</view>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { getUrlParam } from '@/common/utils';
import validate from '@/common/utils/validate';
export default {
	data() {
		return {
			isCodeLogin: true,
			appId: '',
			loginParams: {
				username: '',
				password: ''
			},
			userinfo: {
				openId: '',
				unionId: '',
				logo: '',
				realname: '',
				type: 3
			},
			type: '',
			isMy: false,
			tips: '',
			logining: false
		};
	},
	computed: mapState(['isLogin', 'configInfo']),
	onLoad(option) {
		if (option) {
			if (option.type == 1) {
				this.isMy = true;
			}
		}
	},
	methods: {
		...mapMutations(['LOGIN', 'SET_TEMP_USERINFO']),
		codeChange(text) {
			this.tips = text;
		},

		switchType() {
			this.loginParams.username = '';
			this.loginParams.password = '';
			this.isCodeLogin = !this.isCodeLogin;
		},

		getCode() {
			if (this.loginParams.username == '') {
				this.$u.toast('请输入手机号码');
				return;
			}
			if (!this.$u.test.mobile(this.loginParams.username)) {
				this.$u.toast('请输入正确的手机号');
				return;
			}
			if (this.$refs.uCode.canGetCode) {
				uni.showLoading({
					title: '正在获取验证码'
				});
				this.$api.getCode(this.loginParams.username).then(res => {
					console.log(res);
					uni.hideLoading();
					if (res.success) {
						this.$u.toast('验证码已发送');
						this.$refs.uCode.start();
					} else {
						this.$u.toast('请稍后重试');
						this.$refs.uCode.end();
					}
				});
			} else {
				this.$u.toast('倒计时结束后再发送');
			}
		},

		handleLogin() {
			if (!this.$u.test.mobile(this.loginParams.username)) {
				this.$u.toast('请输入正确的手机号');
				return;
			}
			if (this.isCodeLogin) {
				//使用验证码登录
				if (!this.$u.test.code(this.loginParams.password, 6)) {
					this.$u.toast('验证码是6位数');
					return;
				}
				let loginInfo = {
					phone: this.loginParams.username,
					verifyCode: this.loginParams.password
				};
				this.logining = true;
				this.toLogin()
			} else {
				//使用密码登录
				if (this.loginParams.password == '') {
					this.$u.toast('密码不能为空');
					return;
				}
				this.toLogin()
			}
		},

		/**
		 * 忘记密码
		 */
		forget() {
			this.$u.toast('点击了忘记密码');
		},
		toOauth() {},
		
		toLogin(){
			uni.showLoading({
				mask:true,
				title:"登录中",
			})
			if(this.isCodeLogin){
				setTimeout(()=>{
					this.$api.codeLogin(loginInfo).then(res => {
						uni.hideLoading()
						this.logining = false;
						if (res.success) {
							this.logining = false;
							this.$store.commit('LOGIN', res.data);
							this.$u.toast('登录成功');
							setTimeout(() => {
								this.$store.dispatch('afterLogin');
							}, 1500);
						} else {
							this.$u.toast(res.description);
						}
					});
				},2000)
			}else{
				setTimeout(()=>{
					this.$api.passwordLogin(this.loginParams).then(res => {
						// console.log(res);
						uni.hideLoading()
						if (res.success) {
							this.logining = false;
							this.$store.commit('LOGIN', res.data);
							this.$u.toast('登录成功');
							setTimeout(() => {
								this.$store.dispatch('afterLogin');
							}, 1500);
						} else {
							this.$u.toast(res.description);
						}
					});
				},2000)
			}
		},
		
		oauth() {
			uni.login({
				provider: 'weixin',
				success: res => {
					uni.showLoading({
						title: '授权登录中'
					});
					uni.getUserInfo({
						provider: 'weixin',
						success: infoRes => {
							this.userinfo.openId = infoRes.userInfo.openId;
							this.userinfo.unionId = infoRes.userInfo.unionId;
							this.userinfo.logo = infoRes.userInfo.avatarUrl;
							this.userinfo.realname = infoRes.userInfo.nickName;
							this.userinfo.type = 0;
							this.$api.post('member/login/tp_login2.do', this.userinfo).then(resUser => {
								console.log(resUser);
								if (resUser.success) {
									this.showToast('微信授权成功');
									this.LOGIN({
										userinfo: resUser.data
									});
									setTimeout(() => {
										this.$store.dispatch('afterLogin');
									}, 1500);
								}
							});
						}
					});
				},
				fail: err => {
					console.error('授权登录失败：' + JSON.stringify(err));
				}
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #fff;
}
</style>
