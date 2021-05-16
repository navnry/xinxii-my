<template>
	<view>
		<u-navbar title="推荐关系">
			<view class="u-p-r-24 u-type-warning" slot="right" @click="next">下一步</view>
		</u-navbar>

		<u-steps :current="0"></u-steps>

		<!-- <u-alert-tips :show="relationInfo.isDefaut" type="warning" description="您未填选邀请人，故系统将为你推荐指定邀请人生成邀请关系。您也可通过扫码或邀请链接更换邀请人。"></u-alert-tips> -->
		<view class="cont-tip u-p-24" v-show="relationInfo.isDefault">
			<text class="u-type-warning u-font-24">您未填选邀请人，故系统将为你推荐指定邀请人生成邀请关系。您也可通过扫码或邀请链接更换邀请人。</text>
		</view>

		<view class="u-m-24 u-p-b-24" v-if="relationInfo.jobNumber">
			<u-cell-group title="确认推荐关系" :border="false" :titleStyle="{color:'#333'}">
				<u-cell-item class="u-p-l-24 u-p-r-24 u-p-t-12 u-p-b-12" title="推荐人工号" :arrow="false">
					<u-input v-model="relationInfo.jobNumber" class="u-m-l-24" disabled inputAlign="right"
						placeholder="请输入推荐人工号"></u-input>
				</u-cell-item>
				<u-cell-item class="u-p-l-24 u-p-r-24 u-p-t-12 u-p-b-12" title="推荐人姓名" :arrow="false">
					<u-input v-model="relationInfo.realName" class="u-m-l-24" disabled inputAlign="right"
						placeholder="请输入推荐人姓名"> </u-input>
				</u-cell-item>
				<u-cell-item class="u-p-l-24 u-p-r-24 u-p-t-12 u-p-b-12" title="所属分公司" :arrow="false">
					<u-input v-model="relationInfo.companyName" class="u-m-l-24" disabled inputAlign="right"
						placeholder="请输入所属分公司"></u-input>
				</u-cell-item>
			</u-cell-group>
		</view>

		<u-modal v-model="modalShow" title="本人声明不存在以下情形:" @confirm="sure" maskCloseAble confirmColor="#FF6510">
			<view class="slot-content u-p-24 u-font-26 u-tips-color">
				<view class="u-m-b-8">1. 因贪污、受贿、侵占财产、挪用财产或者破坏社会主义市场经济秩序,被判处刑罚，执行期满末逾5年;</view>
				<view class="u-m-b-8">2. 被金融监管机构决定在一定期限内禁止进入金融行业，期限未满;</view>
				<view class="u-m-b-8">3. 因严重失信行为被国家有关单位确定为失信联合惩戒对象且应当在保险领域受到相应惩戒，或者最近5年内具有其他严重失信不良记录;</view>
				<view>4. 法律、行政法规和国务院保险监督管理机构规定的其他情形。</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				relationInfo: {},
				modalShow:false
			}
		},
		async onLoad() {
			this.relationInfo = await this.getRelationInfo()
		},
		methods: {
			getRelationInfo() {
				return new Promise((resolve, reject) => {
					this.$http.get('/member/qualification/getReferrer.do').then(res => {
						if (res.success) {
							resolve({
								jobNumber: res.data.jobNumber,
								realName: res.data.realName,
								companyName: res.data.companyName,
								isDefault: res.data.isDefault
							})
						} else {
							reject({})
						}
					})
				})
			},
			
			next() {
				this.modalShow = true
			},
			sure(){
				this.$u.route({url: 'pages/identify/step2'})
			}
		},
	}
</script>

<style lang="scss">
	.cont-tip {
		background-color: #ffddc9;
	}
	.slot-content{text-indent: 2em;}
</style>
