(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/order/detail"],{"1f61":function(t,e,n){"use strict";var u=n("ea3d"),r=n.n(u);r.a},5630:function(t,e,n){"use strict";n.r(e);var u=n("e9d0"),r=n("d77d");for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);n("1f61");var c,i=n("f0c5"),o=Object(i["a"])(r["default"],u["b"],u["c"],!1,null,"09acbf04",null,!1,u["a"],c);e["default"]=o.exports},"851f":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u={data:function(){return{detail:{}}},onLoad:function(t){t&&this.getData(t.id)},methods:{getData:function(t){var e=this;this.$api.orderDetail(t).then((function(t){t.success&&(console.log(t.data),e.detail=t.data)}))},formatStatus:function(t){switch(t){case"0":return"等待付款";case"1":return"已付款待生效";case"2":return"照会";case"3":return"拒保";case"4":return"退保待审核";case"5":return"已退保";case"6":return"犹退件";case"7":return"保单生效";case"8":return"保全";case"9":return"保全照会件";case"10":return"理赔件";case"11":return"理赔照会件";case"12":return"失效";case"13":return"解约";case"14":return"终止";default:return""}}}};e.default=u},b2f7:function(t,e,n){"use strict";(function(t){n("44a1");u(n("66fd"));var e=u(n("5630"));function u(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},d77d:function(t,e,n){"use strict";n.r(e);var u=n("851f"),r=n.n(u);for(var a in u)"default"!==a&&function(t){n.d(e,t,(function(){return u[t]}))}(a);e["default"]=r.a},e9d0:function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return u}));var u={uNavbar:function(){return n.e("uview-ui/components/u-navbar/u-navbar").then(n.bind(null,"33f0"))},uTag:function(){return n.e("uview-ui/components/u-tag/u-tag").then(n.bind(null,"8afd"))},uCellGroup:function(){return n.e("uview-ui/components/u-cell-group/u-cell-group").then(n.bind(null,"79a6"))},uCellItem:function(){return n.e("uview-ui/components/u-cell-item/u-cell-item").then(n.bind(null,"095b"))}},r=function(){var t=this,e=t.$createElement,n=(t._self._c,t.formatStatus(t.detail.status));t.$mp.data=Object.assign({},{$root:{m0:n}})},a=[]},ea3d:function(t,e,n){}},[["b2f7","common/runtime","common/vendor"]]]);