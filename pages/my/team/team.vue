<template>
	<view>
		<u-navbar title="我的团队"></u-navbar>
		<view class="">
			<view class="">
				<u-tabs height="84" fontSize="34" :list="tabList" :current="tabCurrent" @change="changeTab"
					:isScroll="false" />
			</view>
			<view class="u-p-t-16 u-p-b-16 u-p-r-24 u-p-l-24">
				<u-search @change="search" v-model="searchWords" height="72" bgColor="#EDEDEE"
					placeholder="姓名、手机号或工号查询" />
			</view>
		</view>
		<view class="">
			<b-team-list ref="teamList" :datas="teamData"></b-team-list>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabList: [{
						name: '直辖组',
						type: 'immediateSuperior'
					},
					{
						name: '直辖部',
						type: 'administeredGroup'
					},
					{
						name: '育成',
						type: 'getLeader'
					}
				],
				tabCurrent: 0,
				searchWords: '',
				teamType: 'immediateSuperior',
				teamData: []
			}
		},
		onLoad() {
			this.getTeamData()
		},
		methods: {
			changeTab(e) {
				this.tabCurrent = e
				this.teamType = this.tabList[e].type
				this.getTeamData()
			},
			search(e) {
				if (e == '') return
				this.$refs.teamList.search(e)
			},
			getTeamData() {
				this.$http.get(`member/proxy/${this.teamType}.do`).then(res => {
					if (res.success) {
						this.teamData = res.data
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #fff;
	}
</style>
