<template>
	<view class="textarea u-border">
		<textarea :maxlength="len" placeholder-style="color:rgba(153,153,153,1);" v-model="content" :placeholder="placeholder" />
		<view class="tips">
		 	<view></view>
			<view> {{contentLength}}/{{len}}</view>
		 </view>
	</view>
</template>

<script>
	export default {
		computed:{
			contentLength(){
				return this.content.length;
			}
		},
		props:{
			placeholder:{
				type: String,
				default: "请输入"
			},
			len:{
				type: Number,
				default: 50
			}
		},
		data() {
			return {
				content:''
			}
		},
	}
</script>

<style>
.textarea{
	height: 204rpx;
	padding: 16rpx 24rpx;
	background: #fff;
	border-radius: 6rpx;
	/* border: 2rpx solid #EBEDF0; */
	position: relative;
}
textarea{
	font-size: 28rpx;
	line-height: 40rpx;
	height: 100%;
}
.tips{
	position: absolute;
	padding:  8rpx 16rpx;
	width: 100%;
	left: 0;
	bottom: 0;
	display: flex;
	justify-content: space-between;
	font-family:PingFang SC;
	font-size: 30rpx;
	line-height:42rpx;
	color:#999;
	opacity:1;
}
</style>
