(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uview-ui/components/u-sticky/u-sticky"],{"07cf":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={name:"u-sticky",props:{offsetTop:{type:[Number,String],default:0},index:{type:[Number,String],default:""},enable:{type:Boolean,default:!0},h5NavHeight:{type:[Number,String],default:44},bgColor:{type:String,default:"#ffffff"},zIndex:{type:[Number,String],default:""}},data:function(){return{fixed:!1,height:"auto",stickyTop:0,elClass:this.$u.guid(),left:0,width:"auto"}},watch:{offsetTop:function(t){this.initObserver()},enable:function(t){0==t?(this.fixed=!1,this.disconnectObserver("contentObserver")):this.initObserver()}},computed:{uZIndex:function(){return this.zIndex?this.zIndex:this.$u.zIndex.sticky}},mounted:function(){this.initObserver()},methods:{initObserver:function(){var e=this;this.enable&&(this.stickyTop=0!=this.offsetTop?t.upx2px(this.offsetTop)+plus.navigator.getStatusbarHeight()-.5+this.h5NavHeight:plus.navigator.getStatusbarHeight()-.5+this.h5NavHeight,this.disconnectObserver("contentObserver"),this.$uGetRect("."+this.elClass).then((function(t){e.height=t.height,e.left=t.left,e.width=t.width,e.$nextTick((function(){e.observeContent()}))})))},observeContent:function(){var t=this;this.disconnectObserver("contentObserver");var e=this.createIntersectionObserver({thresholds:[.95,.98,1]});e.relativeToViewport({top:-this.stickyTop}),e.observe("."+this.elClass,(function(e){t.enable&&t.setFixed(e.boundingClientRect.top)})),this.contentObserver=e},setFixed:function(t){var e=t<this.stickyTop;e?this.$emit("fixed",this.index):this.fixed&&this.$emit("unfixed",this.index),this.fixed=e},disconnectObserver:function(t){var e=this[t];e&&e.disconnect()}},beforeDestroy:function(){this.disconnectObserver("contentObserver")}};e.default=i}).call(this,i("543d")["default"])},5001:function(t,e,i){"use strict";i.r(e);var n=i("07cf"),s=i.n(n);for(var r in n)"default"!==r&&function(t){i.d(e,t,(function(){return n[t]}))}(r);e["default"]=s.a},"52fc":function(t,e,i){"use strict";i.r(e);var n=i("d9c3"),s=i("5001");for(var r in s)"default"!==r&&function(t){i.d(e,t,(function(){return s[t]}))}(r);i("571e");var o,u=i("f0c5"),c=Object(u["a"])(s["default"],n["b"],n["c"],!1,null,"63e49e2a",null,!1,n["a"],o);e["default"]=c.exports},"571e":function(t,e,i){"use strict";var n=i("d340"),s=i.n(n);s.a},d340:function(t,e,i){},d9c3:function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return s})),i.d(e,"c",(function(){return r})),i.d(e,"a",(function(){return n}));var s=function(){var t=this,e=t.$createElement;t._self._c},r=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uview-ui/components/u-sticky/u-sticky-create-component',
    {
        'uview-ui/components/u-sticky/u-sticky-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("52fc"))
        })
    },
    [['uview-ui/components/u-sticky/u-sticky-create-component']]
]);
