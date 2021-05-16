<template>
	<view class="">

		<u-navbar title="保费试算"></u-navbar>
		
		<view class="container u-p-24">
			<view class="wrap u-p-24">
				<view class="item u-border-bottom" v-for="item in list" :key="item.id" :class="item.type == 'date' ? 'picker' : 'radio'">

					<!-- 投保人出生日期 -->
					<u-cell-item v-if="item.type == 'date' && item.factorKey == 'policyholderAge'" :title-style="{'font-size':'32rpx'}"
					 :border-bottom="false" :title="item.name" :label="item.tip" @click="showPicker('insure')">
						<view slot="right-icon">{{insureBirth}}</view>
					</u-cell-item>

					<!-- 被保人出生日期 -->
					<u-cell-item v-if="item.type == 'date' && item.factorKey == 'age'" :title-style="{'font-size':'32rpx'}"
					 :border-bottom="false" :title="item.name" :label="item.tip" @click="showPicker('insured')">
						<view slot="right-icon">{{insuredBirth}}</view>
					</u-cell-item>

					<!-- 单选框 -->
					<x-check-box v-if="item.type=='radio'" :title="item.name" :name="item.factorKey" :list="item.dictionaryList" :col="item.dictionaryList.length == 3 ? 3 : item.dictionaryList.length >=8 ? 4 : 2"
					 @change="radioChange(item.factorKey,$event.detail.value)" />

					<!-- 不可选的展示框 -->
					<x-check-box v-if="item.type=='text'" :title="item.name" :name="item.factorKey" :list="item.dictionaryList"
					 @change="radioChange(item.factorKey,$event.detail.value)" />

				</view>
			</view>
		</view>
		<!-- <view class="reckon">
			<view class="reckon-wrap">
				<view class="price">
					<text>{{premium}}</text>
					<text class="sec-text">元/年</text>
				</view>
				<view class="btn">
					<button type="default">立即投保</button>
				</view>
			</view>
		</view> -->


		<x-date-picker ref="insurePicker" @onConfirm="bindInsureDateChange" :defaultValue="insureEndDate" :startDate="insureStartDate"
		 :endDate="insureEndDate" />

		<x-date-picker ref="insuredPicker" @onConfirm="bindInsuredDateChange" :defaultValue="insuredEndDate" :startDate="insuredStartDate"
		 :endDate="insuredEndDate" />
	</view>
</template>

<script>
	import {
		formatTime,
		getAge,
		setLimitTime,
		setEndDayTime
	} from '@/common/utils/index.js'
	export default {
		data() {
			return {
				detail: {},
				navTitle: '',
				productId: '352c46f61cd24e669c8247b290e99272', //试算产品id
				insureBirth: '请选择',
				insuredBirth: '请选择',
				insureStartDate: '2000-01-01',
				insuredStartDate: '2030-12-31',
				insureEndDate: '2000-01-01',
				insuredEndDate: '2030-12-31',
				list: [], //试算表单内容
				sendData: { //请求参数
					companyCode: "",
					productCode: "",
					trialType: 2,
					rateType: 1
				},

				selected: {}, //用来存放选中的项

				premium: '— — —'
			}
		},
		onLoad(option) {
			this.getInitData(this.productId)
			if (!option.data) return
			let data = JSON.parse(decodeURIComponent(option.data))
			console.log(data)
			this.detail = data
			this.sendData.companyCode = data.producerCode
			this.sendData.productCode = data.serialNumber
			// this.sendData.trialType = data.trialType
			this.sendData.rateType = data.rateType
			this.productId = data.producerId
			this.navTitle = data.name
		},
		onReady() {

		},
		computed: {
			// handleCheck(){
			// 	return this.sendData
			// }
		},
		methods: {
			showPicker(value) {
				if (value == 'insure') {
					this.$refs.insurePicker.show()
				} else if (value == 'insured') {
					this.$refs.insuredPicker.show()
				} else {
					return
				}
			},
			getInitData(id) {
				this.$api.reckonData(id).then(res => {
					if (res.success) {
						this.list = res.data.map(item => { //自定义添加属性
							for (var i = 0; i < item.dictionaryList.length; i++) {
								item.dictionaryList[i].checked = false
								item.dictionaryList[i].show = true
								item.dictionaryList[i].disabled = false
								item.dictionaryList[i].factorKey = item.factorKey
							}
							item.dictionaryList = this.handlerDatas(item.dictionaryList) //组合pids去重
							return item
						})
						this.initPicker(this.list)
					}
				})
			},

			initPicker(arr) {
				let insure, insured
				arr.forEach(item => { //获取到投保人，被保人数据
					if (item.type == 'date' && item.factorKey == 'policyholderAge') {
						insure = item.dictionaryList[0]
					}
					if (item.type == 'date' && item.factorKey == 'age') {
						insured = item.dictionaryList[0]
					}
					if (item.type == 'text') {
						item.dictionaryList[0].checked = true
						item.dictionaryList[0].disabled = true
					}
				})

				if (insure) {

					let insureMax = this.formatPickerDate(insure.valueMax) //投保人最大年龄
					let insureMin = this.formatPickerDate(insure.valueMin) //投保人最小年龄
					this.insureStartDate = insure.valueMax.indexOf('d') !== -1 ?
						setLimitTime(insureMax, 'start') : setLimitTime(insureMax, 'start')
					this.insureEndDate = insure.valueMin.indexOf('d') !== -1 ?
						setEndDayTime(insureMin) : setLimitTime(insureMin, 'end')
				}
				if (insured) {
					// console.log(insured.valueMax)
					// console.log(insured.valueMin)
					let insuredMax = this.formatPickerDate(insured.valueMax) //被保人最大年龄
					let insuredMin = this.formatPickerDate(insured.valueMin) //被保人最小年龄
					this.insuredStartDate = insured.valueMax.indexOf('d') !== -1 ?
						setLimitTime(insuredMax, 'start') : setLimitTime(insuredMax, 'start')
					this.insuredEndDate = insured.valueMin.indexOf('d') !== -1 ?
						setEndDayTime(insuredMin) : setLimitTime(insuredMin, 'end')
				}
			},

			radioChange(key, id) {
				let _this = this
				let checkedId = ''
				_this.list.forEach(i => {
					if (i.factorKey !== key) return
					i.dictionaryList.forEach(j => {
						if (j.id !== id) return
						checkedId = j.id
						// console.log(i.factorKey, j.valueMax)
						// eval("_this.sendData." + i.factorKey + "='" + j.valueMax + "'")
						_this.$set(_this.sendData,i.factorKey,j.valueMax)
						// console.log(_this.sendData)
						_this.getAmount()
					})

					if (!i.parentNode) return
					let tempData = _this.list.filter(item => {
						return item.factorKey == i.childNode
					})[0]

					// console.log(tempData)
					for (let index in tempData.dictionaryList) {
						// tempData[index].show = tempData[index].pid == checkedId ? true : false
						if (tempData.dictionaryList[index].pids.indexOf(checkedId) !== -1) {
							tempData.dictionaryList[index].disabled = false
							tempData.dictionaryList[index].checked = false
							// eval("_this.sendData." + tempData.factorKey + "=''")
							_this.$set(_this.sendData,tempData.factorKey,'')
						} else {
							tempData.dictionaryList[index].disabled = true
						}
						// tempData[index].disabled = tempData[index].pids.indexOf(checkedId) !== -1 ? false : true //组合pids去重
					}
					_this.getAmount()
				})
				// this.handleForm(key, id)
			},
			bindInsureDateChange(e) {
				let insureAge = getAge(e.dateValue)
				this.insureBirth = e.dateValue
				this.$set(this.sendData,'policyholderAge',insureAge)
				this.getAmount()
			},
			bindInsuredDateChange(e) {
				let insuredAge = getAge(e.dateValue)
				this.insuredBirth = e.dateValue
				this.sendData.age = insuredAge
				this.getAmount()
			},

			getAmount() { /*从后台获取匹配结果*/
				this.premium = '— — —'
				this.$api.reckonChangeData(this.sendData).then(res => {
					console.log(res)
					if (res.success) {
						this.premium = res.data
					} else {
						// this.showToast('试算出错')
					}
				}).catch(err => {
					console.log(err)
				})
			},

			/**
			 * 整合重复选项
			 * @param {Object} arr 
			 */
			handlerDatas(arr) {
				let obj = {};
				arr.forEach((item, index) => {
					let {
						text
					} = item;
					if (!obj[text]) {
						obj[text] = {
							text,
							pids: [],
							checked: item.type == 'text' ? true : false,
							disabled: item.type == 'text' ? true : false,
							show: true,
							id: item.id,
							factorKey: item.factorKey,
							valueMax: item.valueMax,
							valueMin: item.valueMin
						}
					}
					obj[text].pids.push(item.pid);
				});
				return Object.values(obj)
			},
			/**
			 * @param {Object} str 年龄限制的单位，d为天数
			 */
			formatPickerDate(str) {
				return str.indexOf('d') !== -1 ? Number(str.replace("d", "")) : Number(str)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.wrap {
			background-color: #fff;
			border-radius: 12rpx;

			.item {
				padding-top: 24rpx;
				padding-bottom: 24rpx;

				&.picker {
					padding-top: 0;
					padding-bottom: 0;

					.u-cell {
						padding-left: 0;
						padding-right: 0;
					}
				}

				&:last-of-type {
					padding-bottom: 0;

					&::after {
						display: none;
					}
				}
			}
		}
	}
</style>
