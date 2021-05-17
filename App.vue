<script>
	import { mapState } from 'vuex'
	import {
		getConigInfo,
		getAllNewMsg
	} from '@/common/api/utils'
	export default {
		onLaunch: function() {

			
			/* 存储用户信息 */
			let userInfo = this.$storage.get('userInfo')
			if (userInfo) {
				this.$store.state.isLogin = true
				this.$store.state.userInfo = userInfo
			}

			let configinfo = this.$storage.get('configinfo')
			this.$store.commit('SET_CONFIGINFO', configinfo)
			let configSuccess = false
			getConigInfo(this, null, () => {
				configSuccess = true
			})
			uni.onNetworkStatusChange((res) => {
				if (res.isConnected && !configSuccess) {
					getConigInfo(this)
				}
			})
			if(!this.$u.test.isEmpty(this.userInfo)){
				//存储用户消息
				getAllNewMsg(this)
			}
		},
		computed:{
			 ...mapState(['userInfo']),
		},
		onShow: function() {},
		onHide: function() {},

	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	@import "uview-ui/custom-icon.css";
	page {
		background-color: #F7F8F9;
	}
</style>
