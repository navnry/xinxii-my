(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/product/reckon/index"],{"2ad4":function(t,e,i){},6130:function(t,e,i){"use strict";i.r(e);var n=i("c65f"),a=i("fa24");for(var r in a)"default"!==r&&function(t){i.d(e,t,(function(){return a[t]}))}(r);i("7ad6");var o,c=i("f0c5"),d=Object(c["a"])(a["default"],n["b"],n["c"],!1,null,"1545919e",null,!1,n["a"],o);e["default"]=d.exports},"7ad6":function(t,e,i){"use strict";var n=i("2ad4"),a=i.n(n);a.a},9215:function(t,e,i){"use strict";(function(t){i("44a1");n(i("66fd"));var e=n(i("6130"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("543d")["createPage"])},c65f:function(t,e,i){"use strict";i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return r})),i.d(e,"a",(function(){return n}));var n={uNavbar:function(){return i.e("uview-ui/components/u-navbar/u-navbar").then(i.bind(null,"33f0"))},uCellItem:function(){return i.e("uview-ui/components/u-cell-item/u-cell-item").then(i.bind(null,"095b"))},xCheckBox:function(){return i.e("components/x-check-box/x-check-box").then(i.bind(null,"c848"))},xDatePicker:function(){return i.e("components/x-date-picker/x-date-picker").then(i.bind(null,"6952"))}},a=function(){var t=this,e=t.$createElement,i=(t._self._c,t.__map(t.list,(function(e,i){var n=t.__get_orig(e),a="date"==e.type&&"policyholderAge"==e.factorKey?{"font-size":"32rpx"}:null,r="date"==e.type&&"age"==e.factorKey?{"font-size":"32rpx"}:null;return{$orig:n,a0:a,a1:r}})));t.$mp.data=Object.assign({},{$root:{l0:i}})},r=[]},fa24:function(t,e,i){"use strict";i.r(e);var n=i("fcd3"),a=i.n(n);for(var r in n)"default"!==r&&function(t){i.d(e,t,(function(){return n[t]}))}(r);e["default"]=a.a},fcd3:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=i("4606"),a={data:function(){return{detail:{},navTitle:"",productId:"352c46f61cd24e669c8247b290e99272",insureBirth:"请选择",insuredBirth:"请选择",insureStartDate:"2000-01-01",insuredStartDate:"2030-12-31",insureEndDate:"2000-01-01",insuredEndDate:"2030-12-31",list:[],sendData:{companyCode:"",productCode:"",trialType:2,rateType:1},selected:{},premium:"— — —"}},onLoad:function(t){if(this.getInitData(this.productId),t.data){var e=JSON.parse(decodeURIComponent(t.data));console.log(e),this.detail=e,this.sendData.companyCode=e.producerCode,this.sendData.productCode=e.serialNumber,this.sendData.rateType=e.rateType,this.productId=e.producerId,this.navTitle=e.name}},onReady:function(){},computed:{},methods:{showPicker:function(t){if("insure"==t)this.$refs.insurePicker.show();else{if("insured"!=t)return;this.$refs.insuredPicker.show()}},getInitData:function(t){var e=this;this.$api.reckonData(t).then((function(t){t.success&&(e.list=t.data.map((function(t){for(var i=0;i<t.dictionaryList.length;i++)t.dictionaryList[i].checked=!1,t.dictionaryList[i].show=!0,t.dictionaryList[i].disabled=!1,t.dictionaryList[i].factorKey=t.factorKey;return t.dictionaryList=e.handlerDatas(t.dictionaryList),t})),e.initPicker(e.list))}))},initPicker:function(t){var e,i;if(t.forEach((function(t){"date"==t.type&&"policyholderAge"==t.factorKey&&(e=t.dictionaryList[0]),"date"==t.type&&"age"==t.factorKey&&(i=t.dictionaryList[0]),"text"==t.type&&(t.dictionaryList[0].checked=!0,t.dictionaryList[0].disabled=!0)})),e){var a=this.formatPickerDate(e.valueMax),r=this.formatPickerDate(e.valueMin);this.insureStartDate=(e.valueMax.indexOf("d"),(0,n.setLimitTime)(a,"start")),this.insureEndDate=-1!==e.valueMin.indexOf("d")?(0,n.setEndDayTime)(r):(0,n.setLimitTime)(r,"end")}if(i){var o=this.formatPickerDate(i.valueMax),c=this.formatPickerDate(i.valueMin);this.insuredStartDate=(i.valueMax.indexOf("d"),(0,n.setLimitTime)(o,"start")),this.insuredEndDate=-1!==i.valueMin.indexOf("d")?(0,n.setEndDayTime)(c):(0,n.setLimitTime)(c,"end")}},radioChange:function(t,e){var i=this,n="";i.list.forEach((function(a){if(a.factorKey===t&&(a.dictionaryList.forEach((function(t){t.id===e&&(n=t.id,i.$set(i.sendData,a.factorKey,t.valueMax),i.getAmount())})),a.parentNode)){var r=i.list.filter((function(t){return t.factorKey==a.childNode}))[0];for(var o in r.dictionaryList)-1!==r.dictionaryList[o].pids.indexOf(n)?(r.dictionaryList[o].disabled=!1,r.dictionaryList[o].checked=!1,i.$set(i.sendData,r.factorKey,"")):r.dictionaryList[o].disabled=!0;i.getAmount()}}))},bindInsureDateChange:function(t){var e=(0,n.getAge)(t.dateValue);this.insureBirth=t.dateValue,this.$set(this.sendData,"policyholderAge",e),this.getAmount()},bindInsuredDateChange:function(t){var e=(0,n.getAge)(t.dateValue);this.insuredBirth=t.dateValue,this.sendData.age=e,this.getAmount()},getAmount:function(){var t=this;this.premium="— — —",this.$api.reckonChangeData(this.sendData).then((function(e){console.log(e),e.success&&(t.premium=e.data)})).catch((function(t){console.log(t)}))},handlerDatas:function(t){var e={};return t.forEach((function(t,i){var n=t.text;e[n]||(e[n]={text:n,pids:[],checked:"text"==t.type,disabled:"text"==t.type,show:!0,id:t.id,factorKey:t.factorKey,valueMax:t.valueMax,valueMin:t.valueMin}),e[n].pids.push(t.pid)})),Object.values(e)},formatPickerDate:function(t){return-1!==t.indexOf("d")?Number(t.replace("d","")):Number(t)}}};e.default=a}},[["9215","common/runtime","common/vendor"]]]);