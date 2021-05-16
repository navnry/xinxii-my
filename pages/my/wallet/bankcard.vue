<template>
	<view class="u-m-24">
		<u-cell-group>
			<u-cell-item title="请输入银行卡号" :arrow="false" >
				<view class="u-m-l-12">
					<u-input v-model="inputs" type="number" @input="handlerInput" inputAlign="right"	></u-input>
				</view>
			</u-cell-item>
		</u-cell-group>
		<view class="u-font-36 u-font-bold u-type-warning">
			{{formatCardNo('621725650000143158')}}
		</view>
	</view>
</template>

<script>
	import {bankCardAttribution} from '@/common/utils/checkCard.js'
	export default {
		data() {
			return {
				inputs:''
			}
		},
		methods: {
			handlerInput(){
				// console.log("hhh")
				this.inputs = this.inputs.replace(/[^\d]/g,'')
				console.log(bankCardAttribution(Number(this.inputs)))
				// console.log(Number(this.inputs))
				// this.inputs = this.formatCardNo(this.inputs)
				
			},
			formatCardNo(cardNo) {
				let str1 = cardNo.substring(0,16)
				let str2 = cardNo.substring(16,cardNo.length)
				return str1.replace(/(\d{4})(?=\d)/g, '$1 ') + str2
			},
		}
	}
</script>

<style lang="scss" scoped>
page{
	background-color: #fff;
}
.u-cell{
	padding: 12rpx 0;
}
</style>
