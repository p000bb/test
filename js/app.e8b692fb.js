(function(e){function t(t){for(var n,r,i=t[0],c=t[1],l=t[2],u=0,d=[];u<i.length;u++)r=i[u],Object.prototype.hasOwnProperty.call(s,r)&&s[r]&&d.push(s[r][0]),s[r]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);f&&f(t);while(d.length)d.shift()();return o.push.apply(o,l||[]),a()}function a(){for(var e,t=0;t<o.length;t++){for(var a=o[t],n=!0,r=1;r<a.length;r++){var i=a[r];0!==s[i]&&(n=!1)}n&&(o.splice(t--,1),e=c(c.s=a[0]))}return e}var n={},r={app:0},s={app:0},o=[];function i(e){return c.p+"js/"+({}[e]||e)+"."+{"chunk-019ca80a":"b7700839","chunk-157599ed":"e377dd01","chunk-2b0015f8":"15faf375","chunk-3e65c4d6":"3ede3d00","chunk-52672cd4":"70c568a8","chunk-b4c7bb70":"b797c637","chunk-eb5da522":"02cc9c51","chunk-f1c3327c":"3457d5d4","chunk-f278fed8":"e313fa04","chunk-0023e7e4":"dc0c251c","chunk-1e77e952":"2dad923c","chunk-23d422c6":"888b4fe3","chunk-2d21f2ac":"e7091e22","chunk-2d230a28":"65f96682","chunk-49ebc9ae":"1b984ef9","chunk-fa5c16b2":"82f831df"}[e]+".js"}function c(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,c),a.l=!0,a.exports}c.e=function(e){var t=[],a={"chunk-019ca80a":1,"chunk-157599ed":1,"chunk-3e65c4d6":1,"chunk-52672cd4":1,"chunk-b4c7bb70":1,"chunk-eb5da522":1,"chunk-f1c3327c":1,"chunk-f278fed8":1};r[e]?t.push(r[e]):0!==r[e]&&a[e]&&t.push(r[e]=new Promise((function(t,a){for(var n="css/"+({}[e]||e)+"."+{"chunk-019ca80a":"5be04805","chunk-157599ed":"d3d0d0bd","chunk-2b0015f8":"31d6cfe0","chunk-3e65c4d6":"84dc9e70","chunk-52672cd4":"aff5a261","chunk-b4c7bb70":"98be0f79","chunk-eb5da522":"ff3942d2","chunk-f1c3327c":"2dde31b5","chunk-f278fed8":"f313e4a6","chunk-0023e7e4":"31d6cfe0","chunk-1e77e952":"31d6cfe0","chunk-23d422c6":"31d6cfe0","chunk-2d21f2ac":"31d6cfe0","chunk-2d230a28":"31d6cfe0","chunk-49ebc9ae":"31d6cfe0","chunk-fa5c16b2":"31d6cfe0"}[e]+".css",s=c.p+n,o=document.getElementsByTagName("link"),i=0;i<o.length;i++){var l=o[i],u=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(u===n||u===s))return t()}var d=document.getElementsByTagName("style");for(i=0;i<d.length;i++){l=d[i],u=l.getAttribute("data-href");if(u===n||u===s)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var n=t&&t.target&&t.target.src||s,o=new Error("Loading CSS chunk "+e+" failed.\n("+n+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=n,delete r[e],f.parentNode.removeChild(f),a(o)},f.href=s;var p=document.getElementsByTagName("head")[0];p.appendChild(f)})).then((function(){r[e]=0})));var n=s[e];if(0!==n)if(n)t.push(n[2]);else{var o=new Promise((function(t,a){n=s[e]=[t,a]}));t.push(n[2]=o);var l,u=document.createElement("script");u.charset="utf-8",u.timeout=120,c.nc&&u.setAttribute("nonce",c.nc),u.src=i(e);var d=new Error;l=function(t){u.onerror=u.onload=null,clearTimeout(f);var a=s[e];if(0!==a){if(a){var n=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+n+": "+r+")",d.name="ChunkLoadError",d.type=n,d.request=r,a[1](d)}s[e]=void 0}};var f=setTimeout((function(){l({type:"timeout",target:u})}),12e4);u.onerror=u.onload=l,document.head.appendChild(u)}return Promise.all(t)},c.m=e,c.c=n,c.d=function(e,t,a){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(c.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)c.d(a,n,function(t){return e[t]}.bind(null,n));return a},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/test/",c.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=t,l=l.slice();for(var d=0;d<l.length;d++)t(l[d]);var f=u;o.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"034f":function(e,t,a){"use strict";var n=a("85ec"),r=a.n(n);r.a},1:function(e,t){},"17be":function(e,t,a){e.exports=a.p+"img/logo.2a40145f.jpg"},"2ba1":function(e,t,a){a("99af")},"354e":function(e,t,a){"use strict";var n=a("ac8c"),r=a.n(n);r.a},"4aca":function(e,t,a){"use strict";a("b64b"),a("ac1f"),a("5319");t["a"]={data:function(){var e=function(e,t,a){t?a():a(new Error("验证码不能为空")),a()},t=function(e,t,a){var n=/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;n.test(t)?a():a(new Error("邮箱输入有误")),a()},a=function(e,t,a){var n=/^(\w|[~!@#$%^&*()_+`\-={}:";'<>?,.\/]){6,16}$/;""===t?a(new Error("请输入密码")):n.test(t)||a("密码长度在6到16位"),a()},n=function(e,t,a){""===t?a(new Error("请输入账号")):(t.length<6||t.length>24)&&a("账号长度在6到24位"),a()},r=function(e,t,a){(!t||t.length<1)&&0!==t?a(new Error("请填写此字段")):a()},s="",o="";return{multipleSelection:"",dialogVisible:!1,dialogTitle:"",pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-6048e5),e.$emit("pick",[a,t])}}],onPick:function(e){e.maxDate?(o="",s=""):(o=e.minDate.getTime(),s=e.minDate.getTime()+5184e5)},disabledDate:function(e){if(o&&s)return e<o||e>s}},YzmRules:[{validator:e,trigger:"blur"}],EmailRules:[{validator:t,trigger:"blur"}],PassRules:[{validator:a,trigger:"blur"}],UserRules:[{validator:n,trigger:"blur"}],FormRules:[{validator:r,trigger:"blur"}]}},created:function(){},computed:{dheight:function(){return{height:document.documentElement.clientHeight+"px"}},tableHeight:function(){return document.body.clientHeight-190}},methods:{formatDate:function(e){var t=e.getFullYear(),a=e.getMonth()+1,n=e.getDate(),r=e.getHours(),s=e.getMinutes(),o=e.getSeconds();return t+"-"+a+"-"+n+" "+r+":"+s+":"+o},handlePickerDate:function(e){},handleClickRow:function(e){this.$refs.table.toggleRowSelection(e)},handleSelectionChange:function(e){this.multipleSelection=e},limit:function(e,t){return void 0==e||0==e.length?this.$message.warning("请选择一条数据"):e.length>1?this.$message.warning("同时只能操作一条数据"):void(t&&t())},setData:function(e,t,a){if(this[t]){for(var n=Object.keys(this[t]),r=0,s=n.length;r<s;++r)this[t][n[r]]=e[0][n[r]]||"";this.$refs[t]&&this.$refs[t].clearValidate()}a&&a()},userinfo:function(){this.$router.push("/userinfo")},goRegister:function(){this.$router.push("/register")},goLogin:function(){this.$router.replace("/login")},goIndex:function(){"admin"==sessionStorage.getItem("role")?this.$router.push("/admin"):this.$router.push("/index")},goAgree:function(){this.$router.push("/agreement")},goPrivacy:function(){this.$router.push("/privacy")},Fpassword:function(){this.$router.push("/fpassword")},Cpassword:function(){this.$router.push("/cpassword")}}}},"4ff4":function(e,t,a){"use strict";var n=a("d04d"),r=a.n(n);r.a},"56d7":function(e,t,a){"use strict";a.r(t);a("e260"),a("e6cf"),a("cca6"),a("a79d");var n=a("2b0e"),r=a("5c96"),s=a.n(r),o=(a("0fae"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[a("router-view")],1)}),i=[],c={},l=c,u=(a("034f"),a("2877")),d=Object(u["a"])(l,o,i,!1,null,null,null),f=d.exports,p=(a("d3b7"),a("8c4f")),m=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"d0"},[n("el-container",{style:e.dheight},[n("el-header",{staticClass:"header"},[n("div",{staticClass:"dheader"},[n("a",{staticClass:"a1",staticStyle:{float:"left"},attrs:{href:"javascript:void(0)"},on:{click:e.goIndex}},[e._v("返回首页")]),n("a",{staticClass:"a1",staticStyle:{float:"right"},attrs:{href:"javascript:void(0)"},on:{click:e.goRegister}},[e._v("没有账号？去注册")])])]),n("el-main",{staticClass:"main"},[n("div",{attrs:{id:"two"}},[n("img",{staticStyle:{width:"100px"},attrs:{src:a("17be"),alt:""}}),n("el-form",{ref:"form",staticClass:"form1",attrs:{model:e.form,"label-width":"60px","label-position":"right"}},[n("el-form-item",{attrs:{label:"账号:",prop:"username",rules:e.UserRules}},[n("el-input",{staticClass:"elinput",attrs:{placeholder:"输入账号"},model:{value:e.form.username,callback:function(t){e.$set(e.form,"username",t)},expression:"form.username"}})],1),n("el-form-item",{attrs:{label:"密码:",prop:"password",rules:e.PassRules}},[n("el-input",{staticClass:"elinput",attrs:{placeholder:"输入密码",type:"password"},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],1),n("div",{staticClass:"mid"},[n("span",{staticClass:"rspan",on:{click:e.Fpassword}},[e._v("忘记密码")]),n("span",{staticClass:"rspan margin-right-10",on:{click:e.Cpassword}},[e._v("修改密码")])]),n("el-button",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:e.fullscreenLoading,expression:"fullscreenLoading",modifiers:{fullscreen:!0,lock:!0}}],staticClass:"mid1",attrs:{type:"primary"},on:{click:e.login}},[e._v("登录")])],1),n("div",{staticClass:"mid2"},[e._v("登录即同意"),n("a",{staticClass:"a2",attrs:{href:"javascript:void(0)"},on:{click:e.goAgree}},[e._v("《小熊电影资讯使用协议》")]),e._v("&"),n("a",{staticClass:"a2",attrs:{href:"javascript:void(0)"},on:{click:e.goPrivacy}},[e._v("《隐私政策》")])])],1)]),n("el-footer",{staticClass:"footer"},[n("div",{staticStyle:{color:"white"}},[e._v("@小熊电影资讯")])])],1)],1)},h=[],g=(a("2ba1"),a("4aca")),v={mixins:[g["a"]],data:function(){return{fullscreenLoading:!1,form:{username:"",password:""},admin:""}},computed:{},created:function(){},methods:{login:function(){var e=this;this.$refs.form.validate((function(t){if(!t)return!1;e.fullscreenLoading=!0,e.$utils.http.call(e,{url:"/?s=App.User.Login",parameter:{username:e.form.username,password:e.$md5(e.form.password)},success:function(t){var a=t.data.data.err_code,n=t.data.data.err_msg,r=t.data.data.token,s=t.data.data.uuid,o=t.data.data.role,i=window.sessionStorage,c=e.form.username;if(e.admin=t.data.data.role,0!=a)return e.fullscreenLoading=!1,e.$message.error(n);e.fullscreenLoading=!1,i.setItem("token",r),i.setItem("username",c),i.setItem("uuid",s),i.setItem("img",c),i.setItem("role",o),e.loginInformation()}})}))},loginInformation:function(){var e=this;this.$utils.http.call(this,{url:"/?s=App.User.Profile",parameter:{uuid:sessionStorage.getItem("uuid"),token:sessionStorage.getItem("token")},success:function(t){sessionStorage.setItem("info",JSON.stringify(t.data.data.info.ext_info)),"admin"==e.admin?e.$router.push("/admin"):"user"==e.admin&&e.$router.push("/index")}})}}},b=v,k=(a("4ff4"),Object(u["a"])(b,m,h,!1,null,"51dc6314",null)),w=k.exports,y=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"d0"},[n("el-container",{style:e.dheight},[n("el-header",{staticClass:"header"},[n("div",{staticClass:"dheader"},[n("a",{staticClass:"a1",staticStyle:{float:"left"},attrs:{href:"javascript:void(0)"},on:{click:e.goIndex}},[e._v("返回首页")]),n("a",{staticClass:"a1",staticStyle:{float:"right"},attrs:{href:"javascript:void(0)"},on:{click:e.goLogin}},[e._v("已有账号？去登录")])])]),n("el-main",{staticClass:"main"},[n("div",{attrs:{id:"two"}},[n("img",{staticStyle:{width:"100px"},attrs:{src:a("17be"),alt:""}}),n("el-form",{ref:"form",staticClass:"form1",attrs:{model:e.form,"label-width":"60px","label-position":"right"}},[n("el-form-item",{attrs:{label:"邮箱:",prop:"email",rules:e.EmailRules}},[n("el-input",{staticClass:"elinput",attrs:{placeholder:"输入邮箱"},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}},[e.show?n("el-button",{staticStyle:{width:"130px"},attrs:{slot:"append"},on:{click:e.emailYzm},slot:"append"},[e._v("获取验证码")]):e._e(),e.show?e._e():n("el-button",{staticStyle:{width:"130px"},attrs:{slot:"append"},slot:"append"},[e._v(e._s(e.count)+"后重新获取")])],1)],1),n("el-form-item",{attrs:{label:"密码:",prop:"password",rules:e.PassRules}},[n("el-input",{staticClass:"elinput",attrs:{placeholder:"输入密码",type:"password"},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],1),n("el-form-item",{attrs:{label:"密码:",prop:"password2",rules:e.Pass2Rules}},[n("el-input",{staticClass:"elinput",attrs:{placeholder:"确认密码",type:"password"},model:{value:e.form.password2,callback:function(t){e.$set(e.form,"password2",t)},expression:"form.password2"}})],1),n("el-form-item",{attrs:{label:"验证码:",prop:"yzm",rules:e.YzmRules}},[n("el-input",{staticClass:"elinput",attrs:{placeholder:"输入验证码",type:"password"},model:{value:e.form.yzm,callback:function(t){e.$set(e.form,"yzm",t)},expression:"form.yzm"}})],1),n("el-button",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:e.fullscreenLoading,expression:"fullscreenLoading",modifiers:{fullscreen:!0,lock:!0}}],staticClass:"mid1",attrs:{type:"primary"},on:{click:e.login}},[e._v("注册")])],1),n("div",{staticClass:"mid2"},[e._v("注册即同意"),n("a",{staticClass:"a2",attrs:{href:"javascript:void(0)"},on:{click:e.goAgree}},[e._v("《小熊电影资讯使用协议》")]),e._v("&"),n("a",{staticClass:"a2",attrs:{href:"javascript:void(0)"},on:{click:e.goPrivacy}},[e._v("《隐私政策》")])])],1)]),n("el-footer",{staticClass:"footer"},[n("div",{staticStyle:{color:"white"}},[e._v("@小熊电影资讯")])])],1)],1)},_=[],C={mixins:[g["a"]],data:function(){var e=this,t=function(t,a,n){""===a?n(new Error("请再次输入密码")):a!==e.form.password?n(new Error("两次输入密码不一致!")):n()};return{fullscreenLoading:!1,active:0,count:"",timer:null,show:!0,form:{username:"",password:"",password2:"",email:""},Pass2Rules:[{validator:t,trigger:"blur"}]}},computed:{},methods:{login:function(){var e=this;this.$refs.form.validate((function(t){if(!t)return!1;e.fullscreenLoading=!0,e.$utils.http.call(e,{url:"/?s=App.Email.VerifyCaptcha",parameter:{address:e.form.email,captcha:e.form.yzm},success:function(t){var a=t.data.data.err_code,n=t.data.data.err_msg;if(0!=a)return e.$message.error(n);e.login2()}})}))},login2:function(){var e=this;this.$utils.http.call(this,{url:"/?s=App.User.Register",parameter:{username:this.form.email,password:this.$md5(this.form.password),ext_info:{yesapi_email:this.form.email,yesapi_nickname:this.form.email}},success:function(t){var a=t.data.data.err_code,n=t.data.data.err_msg;if(0!=a)return e.fullscreenLoading=!1,e.$message.error(n);e.fullscreenLoading=!1,e.$router.push("/login")}})},emailYzm:function(){var e=this,t=/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;if(!t.test(this.form.email))return this.$refs.form.validateField("email");this.$utils.http.call(this,{url:"/?s=App.Email.SendCaptcha",parameter:{address:this.form.email},success:function(t){var a=t.data.data.err_code,n=t.data.data.err_msg;if(0!=a)return e.$message.error(n)}});var a=60;this.timer||(this.count=a,this.show=!1,this.timer=setInterval((function(){e.count>0&&e.count<=a?e.count--:(e.show=!0,clearInterval(e.timer),e.timer=null)}),1e3))}}},$=C,x=(a("354e"),Object(u["a"])($,y,_,!1,null,"2df81b0e",null)),S=x.exports;n["default"].use(p["a"]);var j=new p["a"]({mode:"history",routes:[{path:"/register",name:"Register",component:S},{path:"/login",name:"Login",component:w},{path:"/",name:"Login",component:w},{path:"/index",name:"index",component:function(){return a.e("chunk-157599ed").then(a.bind(null,"a07a"))}},{path:"/admin",name:"admin",component:function(){return a.e("chunk-52672cd4").then(a.bind(null,"75a7"))}},{path:"/subject",name:"searchMovie",component:function(){return a.e("chunk-f1c3327c").then(a.bind(null,"c90f"))}},{path:"/agreement",component:function(){return a.e("chunk-b4c7bb70").then(a.bind(null,"a80e"))}},{path:"/privacy",component:function(){return a.e("chunk-019ca80a").then(a.bind(null,"ce0d"))}},{path:"/fpassword",component:function(){return a.e("chunk-eb5da522").then(a.bind(null,"c143"))}},{path:"/cpassword",component:function(){return a.e("chunk-3e65c4d6").then(a.bind(null,"5a62"))}},{path:"/userinfo",component:function(){return a.e("chunk-f278fed8").then(a.bind(null,"2b95"))}},{path:"*",component:function(){return a.e("chunk-2b0015f8").then(a.bind(null,"7746"))}}]});j.beforeEach((function(e,t,a){if("/userinfo"==e.path){var n=sessionStorage.getItem("token");n?a():a("/login")}else if("/admin"==e.path){var r=sessionStorage.getItem("role");"admin"==r?a():a("/login")}else a()}));var E=j,P=(a("5aea"),a("5530")),O=a("bc3a"),L=a.n(O),A=a("4328"),I=a.n(A);function R(e,t){return new Promise((function(a,n){L.a.post(e,t=Object(P["a"])({},t)).then((function(e){a(e)}),(function(e){n(e)})).catch((function(e){n(e)}))}))}function T(e,t){return new Promise((function(a,n){L.a.get(e,t=Object(P["a"])({},t)).then((function(e){a(e)}),(function(e){n(e)})).catch((function(e){n(e)}))}))}L.a.defaults.timeout=2e4,L.a.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded;charset=UTF-8",L.a.interceptors.request.use((function(e){return"post"===e.method?e.data=I.a.stringify(Object(P["a"])({},e.data)):e.params=Object(P["a"])({},e.params),e}),(function(e){return console.log("错误的传参"),Promise.reject(e)})),L.a.interceptors.response.use((function(e){return e.data.success?e:Promise.resolve(e)}),(function(e){return console.log("网络异常"),Promise.reject(e)}));var z={get:T,post:R},D={http:function(e){var t="https://hn216.api.yesapi.cn",a={app_key:"96B4B5059E3DB099C78FFA6E90182B33"},n=e.ServiceType;if(n)switch(n){case"douban":t="https://douban.uieee.com",a={apikey:"0df993c66c0c636e29ecbb5344252a4a"}}var r=e.method||"post";this.axios[r](t+e.url,Object(P["a"])({},e.parameter,{},a)).then((function(t){if(!t)return e.callback&&e.callback(),e.catch&&e.catch();e.success&&e.success(t),e.callback&&e.callback()})).catch((function(){e.catch&&e.catch(),e.callback&&e.callback()}))}},F=a("8237"),N=a.n(F),B=a("28dd"),M=a("4452"),U=a.n(M);n["default"].use(U.a),n["default"].use(B["a"]),n["default"].use(s.a),n["default"].prototype.axios=z,n["default"].prototype.$utils=D,n["default"].prototype.$md5=N.a,n["default"].config.productionTip=!1,new n["default"]({router:E,render:function(e){return e(f)}}).$mount("#app")},"5aea":function(e,t,a){},"85ec":function(e,t,a){},ac8c:function(e,t,a){},d04d:function(e,t,a){}});
//# sourceMappingURL=app.e8b692fb.js.map