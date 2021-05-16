<template>
	<view>
		<u-navbar title="填写资料">
			<view class="u-p-r-24 u-type-warning" slot="right" @click="next"> 下一步 </view>
		</u-navbar>

		<u-steps :current="2"></u-steps>

		<view class="u-m-24 u-p-b-24">
			<u-cell-group title="基础信息" :border="false" :titleStyle="{color:'#333'}">
				<u-cell-item class="u-p-l-24 u-p-r-24 u-p-t-12 u-p-b-12" title="性别" :arrow="false">
					<u-input class="u-m-l-24" type="select" inputAlign="right" disabled placeholder="请选择"
						v-model="sex" />
				</u-cell-item>
				<u-cell-item class="u-p-l-24 u-p-r-24 u-p-t-12 u-p-b-12" title="出生日期" :arrow="false">
					<u-input class="u-m-l-24" type="select" inputAlign="right" disabled placeholder="请选择"
						v-model="birthday" />
				</u-cell-item>
				<u-cell-item class="u-p-l-24 u-p-r-24 u-p-t-12 u-p-b-12" title="民族" :arrow="false">
					<u-input class="u-m-l-24" type="select" inputAlign="right" placeholder="请选择" v-model="nation"
						@click="nationPicker = true" />
				</u-cell-item>
				<u-cell-item class="u-p-l-24 u-p-r-24 u-p-t-12 u-p-b-12" title="政治面貌" :arrow="false">
					<u-input class="u-m-l-24" type="select" inputAlign="right" placeholder="请选择" v-model="political"
						@click="politicalPicker = true" />
				</u-cell-item>
				<u-cell-item class="u-p-l-24 u-p-r-24 u-p-t-12 u-p-b-12" title="文化程度" :arrow="false">
					<u-input class="u-m-l-24" type="select" inputAlign="right" placeholder="请选择" v-model="education"
						@click="educationPicker = true" />
				</u-cell-item>
			</u-cell-group>

			<u-cell-group title="银行卡信息" :border="false" :titleStyle="{color:'#333'}" label="请填写本人银行卡账户">
				<u-cell-item class="u-p-l-24 u-p-r-24 u-p-t-12 u-p-b-12" title="银行卡账号" :arrow="false">
					<u-input class="u-m-l-24" inputAlign="right" placeholder="请输入银行卡账号" />
				</u-cell-item>
				<u-cell-item class="u-p-l-24 u-p-r-24 u-p-t-12 u-p-b-12" title="开户行" :arrow="false">
					<u-input class="u-m-l-24" type="select" inputAlign="right" placeholder="请选择" v-model="bank"
						@click="bankPicker = true" />
				</u-cell-item>
				<u-cell-item class="u-p-l-24 u-p-r-24 u-p-t-12 u-p-b-12" title="开户网点" :arrow="false">
					<u-input class="u-m-l-24" inputAlign="right" placeholder="请输入开户网点" />
				</u-cell-item>
			</u-cell-group>

		</view>

		<!--民族picker-->
		<u-picker mode="selector" v-model="nationPicker" :range="nationList" range-key="label"
			@confirm="nationChange" />

		<!--政治面貌picker-->
		<u-picker mode="selector" v-model="politicalPicker" :range="politicalList" range-key="label"
			@confirm="politicalChange" />

		<!--文化程度picker-->
		<u-picker mode="selector" v-model="educationPicker" :range="educationList" range-key="label"
			@confirm="educationChange" />

		<!--开户行picker-->
		<u-picker mode="selector" v-model="bankPicker" :range="bankList" range-key="label" @confirm="bankChange" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nationPicker: false,
				politicalPicker: false,
				educationPicker: false,
				bankPicker: false,
				nationList: [],
				politicalList: [],
				educationList: [],
				bankList: [],
				sex: '',
				birthday: '',
				nation: '',
				political: '',
				education: '',
				bank: '',
			}
		},
		onLoad(option) {
			// if (this.$u.test.isEmpty(option)) return
			this.getDictData()
			this.getBankList()
			// console.log(option)
		},
		methods: {
			getDictData() { //获取picker数据
				this.$http.get('/member/qualification/dictData.do').then(res => {
					if (res.success) {
						this.nationList = res.data.Nation //民族
						this.politicalList = res.data.PoliticalStatus //政治面貌
						this.educationList = res.data.Education //文化程度
					}
				})
			},
			getBankList() {
				this.$http.get('/system/dict/getDictByType.do?type=BankType').then(res => {
					if (res.success) {
						this.bankList = res.data
					}
				})
			},
			nationChange(e) { //选择民族
				this.nation = this.nationList[e[0]].label
			},
			politicalChange(e) { //选择政治面貌
				this.political = this.politicalList[e[0]].label
			},
			educationChange(e) { //选择文化程度
				this.education = this.educationList[e[0]].label
			},
			bankChange(e) { //选择银行
				this.bank = this.bankList[e[0]].label
			},
			next() { //进行下一步
				this.$u.route({
					url: 'pages/identify/step4'
				})
			}
		}
	}
</script>

<style>

</style>
