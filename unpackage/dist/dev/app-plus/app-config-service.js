
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/home/index","pages/home/friend/friend","pages/home/friend/expand","pages/base/modal","pages/base/preview","pages/base/search","pages/base/message","pages/base/login","pages/product/index","pages/product/detail","pages/product/reckon/index","pages/news/index","pages/news/detail","pages/news/focus","pages/my/index","pages/my/wallet/wallet","pages/my/set/set","pages/my/order/list","pages/my/order/detail","pages/my/opinion/opinion","pages/my/userinfo/userinfo","pages/my/recruit/recruit","pages/my/recruit/history","pages/my/wallet/bankcard","pages/identify/index","pages/identify/step1","pages/identify/step2","pages/identify/step3","pages/identify/step4","pages/identify/affirm","pages/customer/customer","pages/my/team/team","pages/my/wallet/detail","pages/choseCity/choseCity"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"禧小保","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8","navigationStyle":"custom","enablePullDownRefresh":false,"bounce":"none"},"tabBar":{"color":"#BFBFBF","selectedColor":"#3688FF","borderStyle":"black","backgroundColor":"#fff","list":[{"pagePath":"pages/home/index","iconPath":"static/tabbar/home.png","selectedIconPath":"static/tabbar/home_h.png","text":"首页"},{"pagePath":"pages/product/index","iconPath":"static/tabbar/catelog.png","selectedIconPath":"static/tabbar/catelog_h.png","text":"产品中心"},{"pagePath":"pages/news/index","iconPath":"static/tabbar/news.png","selectedIconPath":"static/tabbar/news_h.png","text":"知识课堂"},{"pagePath":"pages/my/index","iconPath":"static/tabbar/my.png","selectedIconPath":"static/tabbar/my_h.png","text":"我的"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"weex","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"禧小保","compilerVersion":"3.1.9","entryPagePath":"pages/home/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/home/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"首页"}},{"path":"/pages/home/friend/friend","meta":{},"window":{"navigationBarTitleText":"朋友圈"}},{"path":"/pages/home/friend/expand","meta":{},"window":{"navigationBarTitleText":"拓业海报"}},{"path":"/pages/base/modal","meta":{"isNVue":true},"window":{"navigationStyle":"custom","animationType":"fade-in","background":"transparent","backgroundColor":"rgba(0,0,0,0)","popGesture":"none","animationDuration":"200","navigationBarTextStyle":"white"}},{"path":"/pages/base/preview","meta":{},"window":{"navigationBarTitleText":"查看大图","animationType":"zoom-fade-out"}},{"path":"/pages/base/search","meta":{},"window":{"navigationBarTitleText":"搜索"}},{"path":"/pages/base/message","meta":{},"window":{"navigationBarTitleText":"消息管理"}},{"path":"/pages/base/login","meta":{},"window":{"navigationBarTitleText":"登录"}},{"path":"/pages/product/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"产品中心"}},{"path":"/pages/product/detail","meta":{},"window":{"navigationBarTitleText":"产品详情"}},{"path":"/pages/product/reckon/index","meta":{},"window":{"navigationBarTitleText":"保费试算"}},{"path":"/pages/news/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"知识课堂"}},{"path":"/pages/news/detail","meta":{},"window":{"navigationBarTitleText":"详情"}},{"path":"/pages/news/focus","meta":{},"window":{"navigationBarTitleText":"每日焦点"}},{"path":"/pages/my/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的"}},{"path":"/pages/my/wallet/wallet","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/my/set/set","meta":{},"window":{"navigationBarTitleText":"设置"}},{"path":"/pages/my/order/list","meta":{},"window":{"navigationBarTitleText":"订单列表"}},{"path":"/pages/my/order/detail","meta":{},"window":{"navigationBarTitleText":"订单详情"}},{"path":"/pages/my/opinion/opinion","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/my/userinfo/userinfo","meta":{},"window":{"navigationBarTitleText":"个人中心"}},{"path":"/pages/my/recruit/recruit","meta":{},"window":{"navigationBarTitleText":"增员认证"}},{"path":"/pages/my/recruit/history","meta":{},"window":{"navigationBarTitleText":"全部记录"}},{"path":"/pages/my/wallet/bankcard","meta":{},"window":{"navigationBarTitleText":"银行卡"}},{"path":"/pages/identify/index","meta":{},"window":{"navigationBarTitleText":"加入新禧"}},{"path":"/pages/identify/step1","meta":{},"window":{"navigationBarTitleText":"推荐关系"}},{"path":"/pages/identify/step2","meta":{},"window":{"navigationBarTitleText":"身份认证"}},{"path":"/pages/identify/step3","meta":{},"window":{"navigationBarTitleText":"填写资料"}},{"path":"/pages/identify/step4","meta":{},"window":{"navigationBarTitleText":"合同签订"}},{"path":"/pages/identify/affirm","meta":{},"window":{"navigationBarTitleText":"确认信息"}},{"path":"/pages/customer/customer","meta":{},"window":{"navigationBarTitleText":"客户管理"}},{"path":"/pages/my/team/team","meta":{},"window":{"navigationBarTitleText":"我的团队"}},{"path":"/pages/my/wallet/detail","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/choseCity/choseCity","meta":{},"window":{"navigationBarTitleText":""}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
