<template>
	<view>
		<u-navbar title="客户管理">
			<view class="u-flex u-row-right u-m-r-24" style="width: 100%;">
				<view class="camera u-flex u-row-center">
					<u-icon name="yaoqing" custom-prefix="custom-icon" color="#666" size="48"></u-icon>
				</view>
			</view>
		</u-navbar>
		<view>
			<u-index-list :scrollTop="scrollTop" :index-list="indexList" :showSidebar="false">
				<view v-for="(item, index) in customerList" :key="index">
					<u-index-anchor :index="item.letter" />
					<u-cell-item v-for="(oItem, oIndex) in item.list" :key="oIndex" :title="oItem.name" :arrow="false">
						<u-avatar class="u-m-r-12" :src="oItem.remake" slot="icon"></u-avatar>
					</u-cell-item>
				</view>
			</u-index-list>
		</view>
	</view>
</template>

<script>
	import query from '@/common/utils/PY.js'
	import pinyin from 'pinyin'
	export default {
		data() {
			return {
				scrollTop: 0,
				customerList: [],
				page: {
					pageNo: 1,
					pageSize: 1000
				}
			}
		},
		computed: {
			indexList() {
				return this.customerList.map(item => { //输出包含的字母列表
					return item.letter
				})
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onShow() {
			this.getCustomerList()
		},
		onLoad() {
			
		},
		methods: {
			async getCustomerList() {
				let tempData
				let customerListCache = this.$storage.get('customerList') //尝试读取storage
				if(customerListCache) this.customerList = customerListCache
				
				let res = await this.$http.get('member/customer/getCustomerByUserId.do', {
					params: this.page
				})
				if (res && res.success) tempData = res.data
				for (var i = 0; i < tempData.length; i++) { //自定义一个参数用于提取首字拼音
					tempData[i].type = query(tempData[i].name[0])
				}
				tempData = this.sortName(tempData) //按拼音排序
				tempData = this.groupArr(tempData, 'type') //整合相同拼音分组
				
				if(JSON.stringify(tempData) !== JSON.stringify(customerListCache)){
					this.customerList = tempData
				}
				
				this.$storage.set('customerList', this.customerList) //储存到storage
			},
			sortName(list) {
				let w_users = []; //字母开头
				let n_users = []; //数字 or 符号
				list.forEach(item => {
					let first_word = pinyin(item.name, {
						style: pinyin.STYLE_FIRST_LETTER
					});
					first_word = first_word[0][0];
					first_word = first_word.substr(0, 1);
					item.nick_name_sort = first_word + item.name; //增加一个临时排序属性, 不然排序后还要处理原属性
					let regx = /^[A-Za-z]*$/; //正则匹配出字母开头的
					let flag = regx.test(first_word);
					flag && w_users.push(item) || n_users.push(item); //根据类型决定存入哪个数组
				})
				//利用新增的nick_name_sort排序
				w_users.sort((a, b) => a.nick_name_sort.substr(0, 1).toLowerCase().charCodeAt(0) - b.nick_name_sort.substr(
					0, 1).toLowerCase().charCodeAt(0));
				n_users.sort((a, b) => a.nick_name_sort.substr(0, 1).toLowerCase().charCodeAt(0) - b.nick_name_sort.substr(
					0, 1).toLowerCase().charCodeAt(0));
				return w_users.concat(n_users);
			},
			groupArr(list, field) {
				var obj = {}
				for (var i = 0; i < list.length; i++) {
					for (let item in list[i]) {
						if (item == field) {
							obj[list[i][item]] = {
								list: obj[list[i][field]] ? obj[list[i][field]].list : [],
								type: list[i].type
							};
						}
					}
					obj[list[i][field]].list.push(list[i])
				}
				var att = [];
				for (let item in obj) {
					att.push({
						list: obj[item].list,
						letter: obj[item].type,
					})
				}
				return att;
			}
		}
	}
</script>

<style>

</style>
