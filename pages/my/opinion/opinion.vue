<template>
	<view class="content">
		<u-navbar title="反馈与建议" />
		<view class="classify">
			<u-cell-group title="所属分类" :border="false">
				<view class="list">
					<view class="wrap u-flex u-flex-wrap">
						<view class="item u-border" v-for="(item,index) in list" :key="index" :class="{active : current == index}" @click="selTab(index)">{{item}}</view>
					</view>
				</view>
			</u-cell-group>

			<u-cell-group title="输入留言" :border="false">
				<view class="u-p-l-24 u-p-r-24">
					<x-textarea placeholder="请写下你的反馈和建议，非常感谢…"></x-textarea>
				</view>
			</u-cell-group>

			<u-cell-group title="上传图片" :border="false">
				<view class="img">
					<u-upload 
						:action="action" 
						:before-upload="beforeUpload"
						max-count="3"
						@on-change="uploadEnd" 
						:header="uploadHeader" 
						:show-progress="showProgress"
						:file-list="fileList"
						 />
				</view>
			</u-cell-group>
			<view class="btn">
				<u-button @click="next" type="warning" >提交</u-button>
			</view>

		</view>
	</view>
</template>

<script>
	// import { mapState } from 'vuex'
	//    import {uploadImage} from '@/common/utils'
	//    import constVal from '@/common/utils/constval'
	//  import { bigImg } from '@/common/api'
	export default {
		data() {
			return {
				list: ['体验问题', '订单问题', '交易问题', '提现问题', '产品问题', '活动问题', '新功能建议', '其他'],
				fromData: {
					type: 1,
					content: '',
					imageUrl: ''
				},
				current: 0,
				picList: [],
				addShow: true,
				action: '/api/file/img/upload2.do',
				fileList: [],
				uploadHeader:{},
				showProgress:true
			}
		},
		onLoad() {
			let userinfo = this.$storage.get('userInfo')
			if(userinfo.token){
				this.uploadHeader.Authorization = userinfo.token
			}
			
			// #ifdef APP-PLUS
			this.action = 'https://dev.xinxiichina.com/mobile/file/img/upload2.do'
			// #endif
		},
		// computed: { ...mapState(['userinfo']) },
		
		methods: {
			selTab(val) {
				if (this.current == val) return
				this.current = val
			},
			feedBackSubmit() {
				this.$api.post('system/feedBack/submitFeedBack.do', this.fromData).then(res => {
					if (res.success) {
						this.showToast('提交成功')
						setTimeout(() => {
							this.backPage()
						}, 1000)
					}
				})
			},
			next() {
				if (!this.fromData.content) {
					return;
				}
				if (this.picList.length > 0) {
					this.fromData.imageUrl = this.picList.join(",")
				}
				this.fromData.type = this.current
				this.feedBackSubmit()
			},
			removeImage(index) {
				this.picList.pop(index)
				if (this.picList.length < 3) {
					this.addShow = true
				}
			},
			input() {
				if (this.fromData.content.length >= 500) {}
			},
			chooseImage(key) {
				let count
				this.picList.length == 0 ? count = 3 : (this.picList.length == 1 ? count = 2 : count = 1)
				//多选3张图片
				let url = constVal.UPLOAD_IMG_URL + 'mobile/file/img/upload2.do'
				uploadImage(url, key, count, this.userinfo.token, (res) => {
					this.picList.push(res.data.path)
					if (this.picList.length >= 3) {
						this.addShow = false
					}
				})
			},
			openImg(urls, i) {
				bigImg(urls, i)
			},
			uploadEnd(res) {
				if(JSON.parse(res.data).success){
					// this.showProgress = false
					console.log("上传完成")
				}
			},
			beforeUpload(){
				// this.showProgress = true
				console.log("上传前触发")
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #fff;
	}

	.content {
		background-color: #fff;
	}

	.list {
		padding: 0 24rpx;

		.item {
			width: 218rpx;
			height: 80rpx;
			margin-top: 24rpx;
			margin-right: 24rpx;
			text-align: center;
			line-height: 80rpx;

			&:nth-of-type(-n+3) {
				margin-top: 0;
			}

			&:nth-of-type(3n) {
				margin-right: 0;
			}

			&.active {
				color: #FF6510;
			}

			&.active::after {
				border-color: #FF6510;

			}
		}
	}

	.img {
		padding: 0 24rpx;
	}

	.btn {
		padding: 0 24rpx;
		margin-top: 48rpx;
	}
</style>
