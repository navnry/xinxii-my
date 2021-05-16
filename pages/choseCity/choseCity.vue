<template>
	<view class="content">
		<button @click="uploadImage">上传图片</button>
		<view v-if="fileName" class="result">
			<view>{{ fileName }}</view>
			<view>{{ fileUrl }}</view>
			<image :src="fileUrl" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	import chooseAndUploadImage from '@/common/js_sdk/tencentcloud-plugin-cos/choose-and-upload-image';
	import getFileAccessUrl from '@/common/js_sdk/tencentcloud-plugin-cos/get-file-access-url';

	export default {
		data() {
			return {
				fileName: null,
				fileUrl: null
			};
		},
		methods: {

			async uploadImage() { // 选择并上传图片
				this.fileName = null
				this.fileUrl = null;
				const key = await chooseAndUploadImage()
				const url = await getFileAccessUrl(key)
				this.fileName = key
				this.fileUrl = url.split('?')[0]
				console.log(this.fileUrl)
			},
		}
	};
</script>

<style>
	.content {
		margin: 40rpx;
	}
	.content button {
		margin-top: 20rpx;
	}
	.result {
		margin-top: 20rpx;
		padding: 10rpx;
		border: 1px dashed #81b8ff;
		border-radius: 8rpx;
		font-size: 0.75rem;
		word-break: break-all;
		user-select: text;
	}
</style>
