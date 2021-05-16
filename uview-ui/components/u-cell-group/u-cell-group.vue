<template>
	<view class="u-cell-box">
		<view class="u-cell-title" v-if="title" :style="[titleStyle]" :class="{'hasLabel':label}">
			{{title}}
		</view>
		<view class="u-cell-label" v-if="label" :style="[labelStyle]">
			{{label}}
		</view>
		<view class="u-cell-item-box" :class="{'u-border-bottom u-border-top': border}">
			<slot />
		</view>
	</view>
</template>

<script>
	/**
	 * cellGroup 单元格父组件Group
	 * @description cell单元格一般用于一组列表的情况，比如个人中心页，设置页等。搭配u-cell-item
	 * @tutorial https://www.uviewui.com/components/cell.html
	 * @property {String} title 分组标题
	 * @property {Boolean} border 是否显示外边框（默认true）
	 * @property {Object} title-style 分组标题的的样式，对象形式，如{'font-size': '24rpx'} 或 {'fontSize': '24rpx'}
	 * @example <u-cell-group title="设置喜好">
	 */
	export default {
		name: "u-cell-group",
		props: {
			// 分组标题
			title: {
				type: String,
				default: ''
			},
			label:{
				type: String,
				default: ''
			},
			// 是否显示分组list上下边框
			border: {
				type: Boolean,
				default: true
			},
			// 分组标题的样式，对象形式，注意驼峰属性写法
			// 类似 {'font-size': '24rpx'} 和 {'fontSize': '24rpx'}
			titleStyle: {
				type: Object,
				default () {
					return {};
				}
			},
			labelStyle: {
				type: Object,
				default () {
					return {};
				}
			}
		},
		data() {
			return {
				index: 0,
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import "../../libs/css/style.components.scss";
	
	.u-cell-box {
		width: 100%;
		background-color: #fff;
	}

	.u-cell-title {
		padding: 24rpx 24rpx 12rpx 24rpx;
		font-size: 30rpx;
		text-align: left;
		color: $u-tips-color;
		
		&.hasLabel{
			padding-bottom: 0;
		}
	}
	.u-cell-label{
		padding: 0 24rpx 0 24rpx;
		font-size: 24rpx;
		text-align: left;
		color: $u-type-warning;
	}
	.u-cell-item-box {
		background-color: #FFFFFF;
		flex-direction: row;
	}
</style>
