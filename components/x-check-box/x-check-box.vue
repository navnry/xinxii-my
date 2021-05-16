<template>
	<view class="m-radio-box" :class="{nowrap:nowrap}">
		<view class="title">{{title}}</view>
		<radio-group 
		:name="name" 
		@change="radioChange" 
		class="m-radio-group" 
		:class="'col-' + col">
			<label v-for="(item,index) in showList" 
			:key="index" 
			class="m-radio-label" 
			:class="{'m-radio-checked' : item.checked , 'm-radio-disabled' : item.disabled}">
				<view class="m-radio-wrap">
					<radio 
					:value="item.id" 
					:id="item.id" 
					:checked="item.checked" 
					:disabled="item.disabled"/>
					<text>{{item.text}}</text>
				</view>
			</label>
		</radio-group>
	</view>
</template>

<script>
	export default {

		props: {
			title: {
				type: String,
				default: ''
			},
			name: {
				type: String,
				default: ''
			},
			list: {
				type: Array,
				default:()=>[]
			},
			col: {
				type: Number,
				default: 2
			},
			nowrap:{
				type:Boolean,
				default:false
			}
		},
		computed: {
			showList: function() {
				return this.list.filter(item => {
					return item.show
				})
			}
		},
		onLoad() {},
		methods: {
			radioChange(e) {
				for (let i = 0, len = this.list.length; i < this.list.length; i++) {
					this.list[i].id == e.detail.value ? this.list[i].checked = true : this.list[i].checked = false;
				}
				this.$forceUpdate();
				this.$emit("change", e)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.m-radio-box{
		&.nowrap{display: flex;align-items: center;
			.title{flex: 1;margin-bottom: 0;}
			.m-radio-group{width: 280rpx;}
		}
	}
	.title {font-size: 34rpx;font-weight: 400;line-height: 48rpx;margin-bottom: 24rpx;}
	.m-radio-label,.m-chekcbox-label {width: 50%;box-sizing: border-box;padding-right: 24rpx;}
	.m-radio-label :nth-child(-n+2) .m-radio-wrap {margin-top: 0;}
	.m-radio-label .m-radio-wrap,.m-chekcbox-label .m-radio-wrap {text-align: center;background-color: #f4f5f6;border-radius: 6rpx;font-size: 32rpx;line-height: 64rpx;margin-top: 24rpx;position: relative;}
	.m-radio-group.col-3 .m-radio-label {width: 33.333333%;}
	.m-radio-group.col-4 .m-radio-label {width: 25%;}
	.m-radio-group .m-radio-label:nth-child(-n + 2) .m-radio-wrap {margin-top: 0;}
	.m-radio-group.col-3 .m-radio-label:nth-child(-n + 3) .m-radio-wrap {margin-top: 0;}
	.m-radio-group.col-4 .m-radio-label:nth-child(-n + 4) .m-radio-wrap {margin-top: 0;}
	.m-radio-checked .m-radio-wrap,.m-checkbox-checked .m-radio-wrap {background-color: #FFDCCC;color: #FF5000;}
	.m-radio-disabled .m-radio-wrap{background-color: #CCC;opacity: .5;}
	.m-radio-disabled .m-radio-wrap.m-checkbox-checked{background-color: #ccc;opacity: .5;}
	.m-radio-checked .m-radio-wrap::after,.m-checkbox-checked .m-radio-wrap::after {content: '';position: absolute;width: 38rpx;height: 38rpx;background: url(@/static/checked.png) center/cover no-repeat;right: 0;bottom: 0;}
	.m-radio-label .m-radio-item {margin-bottom: 24rpx;}
	.m-radio-group,.m-checkbox-group {display: flex;flex-wrap: wrap;margin-right: -24rpx;}
	.m-radio-group radio,.m-checkbox-group checkbox {display: none;}
</style>
