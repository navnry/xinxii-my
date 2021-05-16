<template>
	<view>
		<u-navbar title="文章详情" title-width="500" :border-bottom="false">
			<view class="u-m-r-24" slot="right">
				<u-icon name="more-dot-fill" size="42" color="#666" @click="click" />
			</view>
		</u-navbar>
		<view class="u-p-24">
			<text class="u-font-xl ">{{title}}</text>
		</view>
		<view class="u-p-24" v-if="loadEnd">
			<text class="u-content-color u-font-sm">{{$u.timeFormat(detail.createDate, 'yyyy年mm月dd日')}}</text>
		</view>
		<view class="u-p-24">
			<u-parse :html="content" @load="loadEnd = true"></u-parse>
		</view>
		
		<u-popup v-model="popupShow" mode="bottom" border-radius="24">
			<view class="u-font-32 u-text-center u-p-t-24 u-p-b-24 u-border-bottom">分享到</view>
			<view class="">
				<u-grid :col="6" :border="false">
						<u-grid-item @click="shareClick(0)">
							<u-icon name="weixin-circle-fill" :size="54" color="#04BE02"></u-icon>
							<view class="u-font-22 u-content-color">微信</view>
						</u-grid-item>
						<u-grid-item @click="shareClick(1)">
							<u-icon name="moments-circel-fill" :size="54" color="#04BE02"></u-icon>
							<view class="u-font-22 u-content-color">朋友圈</view>
						</u-grid-item>
					</u-grid>
			</view>
			<u-gap height="12" bg-color="#F6F7F8"></u-gap>
			<view class="u-p-24 u-text-center u-tips-color" @click="popupHide">取消</view>
		</u-popup>	
		</view>
</template>

<script>
	export default {
		data() {
			return {
				popupShow:false,
				title: '',
				content: '',
				detail: {},
				time: null,
				loadEnd:false
			}
		},
		onLoad(option) {
			if(!option) return 
			this.getDetail(option.id)
		},
		methods: {
			getDetail(id) {

				this.$api.newsDetail(id).then(res => {
					console.log(res)
					if (res.success) {
						this.content = res.data.content
						this.title = res.data.title
						this.detail = res.data
					}
				})
			},
			click(){
				// this.$u.toast("点击了分享")
				this.popupShow = true
			},
			shareClick(index){
				console.log(index)
			},
			popupHide(){
				this.popupShow = false
			}
		}
	}
</script>

<style>

</style>
