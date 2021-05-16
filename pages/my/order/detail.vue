<template>
	<view>
		<u-navbar title="保单详情"></u-navbar>
		<view class="">
			<view class="top u-p-24">
				<view class="top-wrap">
					<view class="u-flex u-p-b-12">
						<view class="u-font-xl u-m-r-12">{{detail.name}}</view>
						<u-tag :text="formatStatus(detail.status)" type="warning" mode="dark" size="mini"/>
					</view>
					<view class="u-tips-color">
						<view class="group-text">由{{detail.producerName}}公司承保</view>
						<view class="group-text">投保单号：{{detail.orderId}}</view>
						<view class="group-premium">首年保费：¥{{detail.totalPremium}}</view>
					</view>
				</view>
			</view>
			<view class="">
				<u-cell-group title="基本信息">
					<u-cell-item title="投保单号" :value="detail.orderId" :arrow="false"></u-cell-item>
					<u-cell-item title="保单号" :value="detail.serialNumber" :arrow="false"></u-cell-item>
					<u-cell-item title="投保日期" :value="detail.insureTime" :arrow="false"></u-cell-item>
					<u-cell-item title="承保日期" :value="detail.underwriteDate" :arrow="false"></u-cell-item>
					<u-cell-item title="生效日期" :value="detail.effectDate" :arrow="false"></u-cell-item>
					<u-cell-item v-if="detail.rescissionDate" title="契撤日期" :value="detail.rescissionDate" :arrow="false"></u-cell-item>
				</u-cell-group>

				<u-cell-group title="险种信息">
					<view class="" v-for="(item,index) in detail.typeOutputs" :key="index">
						<u-cell-item title="险种名称" :value="item.insuranceName" :leftIcon="item.mark == '0' ? 'main' : 'attach'" :arrow="false"  :leftIconColor="item.mark == '0' ? '#EF4034' : '#999'" leftIconSize="32px"></u-cell-item>
						<u-cell-item title="保额" :value="'￥' + item.insuredAmount" :arrow="false"></u-cell-item>
						<u-cell-item title="保险期间" :value="item.guaranPeriod" :arrow="false"></u-cell-item>
						<u-cell-item title="缴费方式" :value="item.payment" :arrow="false"></u-cell-item>
						<u-cell-item title="缴费期间" :value="item.paymentPeriod" :arrow="false" border="0"></u-cell-item>
					</view>
				</u-cell-group>

				<u-cell-group title="投保人信息">
					<u-cell-item title="姓名" :value="detail.applicantInfo ? detail.applicantInfo.name : ''" :arrow="false"></u-cell-item>
					<u-cell-item title="性别" :value="detail.applicantInfo ? detail.applicantInfo.sex == '0' ? '女' : '男' : ''" :arrow="false"></u-cell-item>
					<u-cell-item title="年龄" :value="detail.applicantInfo ? detail.applicantInfo.age : ''" :arrow="false"></u-cell-item>
					<u-cell-item title="证件类型" :value="detail.applicantInfo ? detail.applicantInfo.documentType : ''" :arrow="false"></u-cell-item>
					<u-cell-item title="证件号码" :value="detail.applicantInfo ? detail.applicantInfo.identity : ''" :arrow="false"></u-cell-item>
					<u-cell-item title="手机号码" :value="detail.applicantInfo ? detail.applicantInfo.mobile : ''" :arrow="false"></u-cell-item>
				</u-cell-group>

				<u-cell-group title="被保人信息">
					<u-cell-item title="姓名" :value="detail.insuredInfo ? detail.insuredInfo.name : ''" :arrow="false"></u-cell-item>
					<u-cell-item title="性别" :value="detail.insuredInfo ? detail.insuredInfo.sex == '0' ? '女' : '男' : ''" :arrow="false"></u-cell-item>
					<u-cell-item title="年龄" :value="detail.insuredInfo ? detail.insuredInfo.age : ''"  :arrow="false"></u-cell-item>
					<u-cell-item title="证件类型" :value="detail.insuredInfo ? detail.insuredInfo.documentType : ''" :arrow="false"></u-cell-item>
					<u-cell-item title="证件号码" :value="detail.insuredInfo ? detail.insuredInfo.identity : ''" :arrow="false"></u-cell-item>
					<u-cell-item title="手机号码" :value="detail.insuredInfo ? detail.insuredInfo.mobile : ''" :arrow="false"></u-cell-item>
				</u-cell-group>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail: {},
			}
		},
		onLoad(option) {
			if(!option) return
			this.getData(option.id)
		},
		methods: {
			getData(id){
				this.$api.orderDetail(id).then(res=>{
					if(res.success){
						console.log(res.data)
						this.detail = res.data
					}
				})
			},
			formatStatus(status) {
				switch (status) {
					case '0':
						return '等待付款'
						break;
					case '1':
						return '已付款待生效'
						break;
					case '2':
						return '照会'
						break;
					case '3':
						return '拒保'
						break;
					case '4':
						return '退保待审核'
						break;
					case '5':
						return '已退保'
						break;
					case '6':
						return '犹退件'
						break;
					case '7':
						return '保单生效'
						break;
					case '8':
						return '保全'
						break;
					case '9':
						return '保全照会件'
						break;
					case '10':
						return '理赔件'
						break;
					case '11':
						return '理赔照会件'
						break;
					case '12':
						return '失效'
						break;
					case '13':
						return '解约'
						break;
					case '14':
						return '终止'
						break;
					default:
						return ''
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.top{
	background-color: #fff;
}
</style>
