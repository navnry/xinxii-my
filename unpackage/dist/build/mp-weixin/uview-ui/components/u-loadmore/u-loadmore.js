(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uview-ui/components/u-loadmore/u-loadmore"],{"02d5":function(t,e,o){"use strict";o.r(e);var n=o("0fbf"),r=o.n(n);for(var i in n)"default"!==i&&function(t){o.d(e,t,(function(){return n[t]}))}(i);e["default"]=r.a},"0fbf":function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"u-loadmore",props:{bgColor:{type:String,default:"transparent"},icon:{type:Boolean,default:!0},fontSize:{type:String,default:"28"},color:{type:String,default:"#606266"},status:{type:String,default:"loadmore"},iconType:{type:String,default:"circle"},loadText:{type:Object,default:function(){return{loadmore:"加载更多",loading:"正在加载...",nomore:"没有更多了"}}},isDot:{type:Boolean,default:!1},iconColor:{type:String,default:"#b7b7b7"},marginTop:{type:[String,Number],default:0},marginBottom:{type:[String,Number],default:0},height:{type:[String,Number],default:"auto"}},data:function(){return{dotText:"●"}},computed:{loadTextStyle:function(){return{color:this.color,fontSize:this.fontSize+"rpx",position:"relative",zIndex:1,backgroundColor:this.bgColor}},cricleStyle:function(){return{borderColor:"#e5e5e5 #e5e5e5 #e5e5e5 ".concat(this.circleColor)}},flowerStyle:function(){return{}},showText:function(){var t="";return t="loadmore"==this.status?this.loadText.loadmore:"loading"==this.status?this.loadText.loading:"nomore"==this.status&&this.isDot?this.dotText:this.loadText.nomore,t}},methods:{loadMore:function(){"loadmore"==this.status&&this.$emit("loadmore")}}};e.default=n},2710:function(t,e,o){},"301a":function(t,e,o){"use strict";o.d(e,"b",(function(){return r})),o.d(e,"c",(function(){return i})),o.d(e,"a",(function(){return n}));var n={uLine:function(){return o.e("uview-ui/components/u-line/u-line").then(o.bind(null,"ce67"))},uLoading:function(){return o.e("uview-ui/components/u-loading/u-loading").then(o.bind(null,"92f6"))}},r=function(){var t=this,e=t.$createElement,o=(t._self._c,t.$u.addUnit(t.height)),n=t.__get_style([t.loadTextStyle]);t.$mp.data=Object.assign({},{$root:{g0:o,s0:n}})},i=[]},"319c":function(t,e,o){"use strict";o.r(e);var n=o("301a"),r=o("02d5");for(var i in r)"default"!==i&&function(t){o.d(e,t,(function(){return r[t]}))}(i);o("7256");var u,a=o("f0c5"),l=Object(a["a"])(r["default"],n["b"],n["c"],!1,null,"0cb81791",null,!1,n["a"],u);e["default"]=l.exports},7256:function(t,e,o){"use strict";var n=o("2710"),r=o.n(n);r.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uview-ui/components/u-loadmore/u-loadmore-create-component',
    {
        'uview-ui/components/u-loadmore/u-loadmore-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("319c"))
        })
    },
    [['uview-ui/components/u-loadmore/u-loadmore-create-component']]
]);
