(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/product/index"],{"05f3":function(t,e,n){"use strict";var r=n("6f13"),u=n.n(r);u.a},2826:function(t,e,n){"use strict";n.d(e,"b",(function(){return u})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return r}));var r={uNavbar:function(){return n.e("uview-ui/components/u-navbar/u-navbar").then(n.bind(null,"33f0"))},uIcon:function(){return n.e("uview-ui/components/u-icon/u-icon").then(n.bind(null,"47ce"))},uSearch:function(){return n.e("uview-ui/components/u-search/u-search").then(n.bind(null,"c6cd"))},uBadge:function(){return n.e("uview-ui/components/u-badge/u-badge").then(n.bind(null,"3c47"))},bRefresh:function(){return Promise.all([n.e("common/vendor"),n.e("components/b-refresh/b-refresh")]).then(n.bind(null,"2dba"))},uLoadmore:function(){return n.e("uview-ui/components/u-loadmore/u-loadmore").then(n.bind(null,"319c"))},uPopup:function(){return n.e("uview-ui/components/u-popup/u-popup").then(n.bind(null,"9f98"))}},u=function(){var t=this,e=t.$createElement;t._self._c;t._isMounted||(t.e0=function(e){t.popShow=!t.popShow})},o=[]},"30f4":function(t,e,n){"use strict";(function(t){n("44a1");r(n("66fd"));var e=r(n("8f55"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},4562:function(t,e,n){"use strict";n.r(e);var r=n("83ed"),u=n.n(r);for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e["default"]=u.a},"6f13":function(t,e,n){},"83ed":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=i(n("a34a")),u=i(n("6eeb")),o=n("2f62");function i(t){return t&&t.__esModule?t:{default:t}}function c(t,e,n,r,u,o,i){try{var c=t[o](i),a=c.value}catch(s){return void n(s)}c.done?e(a):Promise.resolve(a).then(r,u)}function a(t){return function(){var e=this,n=arguments;return new Promise((function(r,u){var o=t.apply(e,n);function i(t){c(o,r,u,i,a,"next",t)}function a(t){c(o,r,u,i,a,"throw",t)}i(void 0)}))}}function s(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function d(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?s(Object(n),!0).forEach((function(e){f(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function f(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var p={mixins:[u.default],data:function(){return{popShow:!1,producerList:[],current:0,producerName:"全部公司",popStyle:{top:"calc(44px + var(--status-bar-height))"},tabList:[],productParams:{producerId:"",tagIds:[],pageSize:6,pageNo:1,coveredIds:""},productList:[],scrollTop:0,tabCurrent:0,menuHeight:0,menuItemHeight:0,status:"loadmore"}},computed:d({},(0,o.mapState)(["message"])),onLoad:function(){this.getProducerList(),this.getProductTagList(),this.getProductList()},methods:{refresh:function(){this.productParams.pageNo=1,this.mescroll.scrollTo(0,0)},pullDown:function(t){setTimeout((function(){t.endSuccess()}),2e3)},hidePop:function(t,e){this.current=t,this.popShow=!1,this.producerName=e},toSearch:function(){this.$u.route({url:"pages/base/search",params:{type:"product"}})},getProducerList:function(){var t=this;try{var e=this.$storage.get("producerList");e?this.producerList=e:this.$api.producerList().then((function(e){e.success&&(t.producerList=e.data,t.producerList.unshift({id:"",name:"全部公司"}),t.$storage.set("producerList",t.producerList))}))}catch(n){console.log(n)}},getProductTagList:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";try{var n=this.$storage.get("productTabList");n&&e?this.tabList=n:this.$api.productTagList(e).then((function(e){e.success&&(console.log(e),t.tabList=e.data,t.tabList.unshift({id:"",name:"全部"}),t.$storage.set("productTabList",t.tabList))}))}catch(r){console.log(r)}},getProductList:function(){var t=this;this.status="loading",this.$api.productList(this.productParams).then((function(e){if(e.success){if(1==t.productParams.pageNo){if(t.productList=e.data,!e.page.hasNextPage)return void(t.status="nomore")}else if(t.productList=t.productList.concat(e.data),!e.page.hasNextPage)return void(t.status="nomore");t.status="loadmore",t.mescroll.endSuccess(t.productList.length,e.page.hasNextPage)}}))},getImg:function(){return Math.floor(35*Math.random())},todetail:function(e){t.navigateTo({url:"./detail?id="+e})},swichMenu:function(t){var e=this;return a(r.default.mark((function n(){return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(t!=e.tabCurrent){n.next=2;break}return n.abrupt("return");case 2:if(e.tabCurrent=t,0!=e.menuHeight&&0!=e.menuItemHeight){n.next=8;break}return n.next=6,e.getElRect("menu-scroll-view","menuHeight");case 6:return n.next=8,e.getElRect("u-tab-item","menuItemHeight");case 8:e.productParams.tagIds=e.tabList[t].id,e.productList=[],e.refresh(),e.getProductList(),e.scrollTop=t*e.menuItemHeight+e.menuItemHeight/2-e.menuHeight/2;case 13:case"end":return n.stop()}}),n)})))()},getElRect:function(e,n){var r=this;new Promise((function(u,o){var i=t.createSelectorQuery().in(r);i.select("."+e).fields({size:!0},(function(t){t?r[n]=t.height:setTimeout((function(){r.getElRect(e)}),10)})).exec()}))},onReachBottom:function(){this.productParams.pageNo=this.productParams.pageNo+=1,"nomore"!=this.status&&this.getProductList()}}};e.default=p}).call(this,n("543d")["default"])},"8f55":function(t,e,n){"use strict";n.r(e);var r=n("2826"),u=n("4562");for(var o in u)"default"!==o&&function(t){n.d(e,t,(function(){return u[t]}))}(o);n("05f3");var i,c=n("f0c5"),a=Object(c["a"])(u["default"],r["b"],r["c"],!1,null,"fbf86734",null,!1,r["a"],i);e["default"]=a.exports}},[["30f4","common/runtime","common/vendor"]]]);