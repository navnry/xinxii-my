(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/news/focus"],{"0f2f":function(t,n,u){"use strict";u.r(n);var e=u("ed1a"),i=u.n(e);for(var o in e)"default"!==o&&function(t){u.d(n,t,(function(){return e[t]}))}(o);n["default"]=i.a},"251c":function(t,n,u){"use strict";u.r(n);var e=u("d0c7"),i=u("0f2f");for(var o in i)"default"!==o&&function(t){u.d(n,t,(function(){return i[t]}))}(o);u("cb3a");var c,a=u("f0c5"),r=Object(a["a"])(i["default"],e["b"],e["c"],!1,null,"3e7106c3",null,!1,e["a"],c);n["default"]=r.exports},"2d3c":function(t,n,u){},"5fb0":function(t,n,u){"use strict";(function(t){u("44a1");e(u("66fd"));var n=e(u("251c"));function e(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,u("543d")["createPage"])},cb3a:function(t,n,u){"use strict";var e=u("2d3c"),i=u.n(e);i.a},d0c7:function(t,n,u){"use strict";u.d(n,"b",(function(){return i})),u.d(n,"c",(function(){return o})),u.d(n,"a",(function(){return e}));var e={uNavbar:function(){return u.e("uview-ui/components/u-navbar/u-navbar").then(u.bind(null,"33f0"))},uTag:function(){return u.e("uview-ui/components/u-tag/u-tag").then(u.bind(null,"8afd"))},bFocusItem:function(){return u.e("components/b-focus-item/b-focus-item").then(u.bind(null,"b381"))},uDivider:function(){return u.e("uview-ui/components/u-divider/u-divider").then(u.bind(null,"10a6"))}},i=function(){var t=this,n=t.$createElement,u=(t._self._c,t.__map(t.focusList,(function(n,u){var e=t.__get_orig(n),i=t.$u.timeFormat(n.dailyFocus.updateDate,"yyyy年mm月dd日");return{$orig:e,g0:i}})));t.$mp.data=Object.assign({},{$root:{l0:u}})},o=[]},ed1a:function(t,n,u){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{focusList:[],dividerShow:!1}},onLoad:function(){this.getFocusList()},methods:{getFocusList:function(){var t=this;this.$api.focusList().then((function(n){console.log(n),n.success&&(t.focusList=n.data,t.dividerShow=!0)}))},toDetail:function(t){console.log(t),this.$u.route({url:"/pages/news/detail",params:{id:t}})}}};n.default=e}},[["5fb0","common/runtime","common/vendor"]]]);