(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d230a28"],{ecb6:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticStyle:{display:"flex"}},[a("el-button",{staticStyle:{display:"flex",margin:"15px 0 15px 20px"},attrs:{type:"primary"},on:{click:t.look}},[t._v("查看详情")])],1),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"table",attrs:{data:t.Tabledata,height:t.tableHeight},on:{"row-click":t.handleClickRow,"selection-change":t.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"50"}}),a("el-table-column",{attrs:{prop:"username",label:"账号"}}),a("el-table-column",{attrs:{prop:"reg_time",label:"注册时间"}}),a("el-table-column",{attrs:{prop:"role_desc",label:"角色"}}),a("el-table-column",{attrs:{prop:"status_desc",label:"状态"}}),a("el-table-column",{attrs:{prop:"",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.status?a("el-button",{attrs:{type:"primary"},on:{click:function(a){return t.open(e.row)}}},[t._v("解封")]):t._e(),0==e.row.status?a("el-button",{attrs:{type:"danger"},on:{click:function(a){return t.open(e.row)}}},[t._v("封号")]):t._e()]}}])})],1),a("el-pagination",{staticStyle:{display:"flex",margin:"20px 0 0 20px"},attrs:{layout:"total,prev, pager, next,jumper",total:t.Tabletotal,"page-size":20,"current-page":t.currentPage},on:{"current-change":t.currentChange}}),a("el-dialog",{attrs:{visible:t.dialogVisible,width:"60%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("div",{staticStyle:{display:"flex","font-size":"16px"}},[a("h3",[t._v("详细信息")])]),a("div",[a("el-form",{ref:"form",staticClass:"form1",attrs:{model:t.form,"label-width":"120px","label-position":"right",disabled:""}},[a("el-form-item",{attrs:{label:"用户昵称:",prop:"nickname"}},[a("el-input",{staticClass:"elinput",model:{value:t.form.nickname,callback:function(e){t.$set(t.form,"nickname",e)},expression:"form.nickname"}})],1),a("el-form-item",{attrs:{label:"用户头像:",prop:"avatar"}},[a("el-input",{staticClass:"elinput",attrs:{placeholder:"头像URL"},model:{value:t.form.avatar,callback:function(e){t.$set(t.form,"avatar",e)},expression:"form.avatar"}})],1),a("el-form-item",{attrs:{label:"用户邮箱:",prop:"email",rules:t.EmailRules}},[a("el-input",{staticClass:"elinput",model:{value:t.form.email,callback:function(e){t.$set(t.form,"email",e)},expression:"form.email"}})],1),a("el-form-item",{attrs:{label:"用户积分:",prop:"points"}},[a("el-input",{staticClass:"elinput",model:{value:t.form.points,callback:function(e){t.$set(t.form,"points",e)},expression:"form.points"}})],1)],1),a("div",{staticStyle:{"text-align":"right"},attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.dialogVisible=!1}}},[t._v("关 闭")])],1)],1)]),a("el-dialog",{attrs:{title:"提示",visible:t.dialogVisible2,width:"30%"},on:{"update:visible":function(e){t.dialogVisible2=e}}},[a("span",[t._v("确定操作吗?")]),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogVisible2=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.confirm2}},[t._v("确 定")])],1)])],1)},l=[],o=a("4aca"),s={mixins:[o["a"]],data:function(){return{Tabledata:[],Tabletotal:1,currentPage:1,dialogVisible:!1,dialogVisible2:!1,loading:!1,uuid:"",token:"",multipleSelection:"",username:"",form:{nickname:"",avatar:"",email:"",points:""}}},computed:{},created:function(){console.log(sessionStorage.getItem("token")),console.log(sessionStorage.getItem("uuid")),this.uuid=sessionStorage.getItem("uuid"),this.token=sessionStorage.getItem("token"),this.getUser()},methods:{currentChange:function(t){this.getUser(t)},getUser:function(t){var e=this;this.loading=!0,this.$utils.http.call(this,{url:"/?s=App.User.GetList",parameter:{page:t||1,perpage:20,role:"all"},success:function(t){e.loading=!1,e.Tabledata=t.data.data.users,e.Tabletotal=t.data.data.total}})},open:function(t){this.multipleSelection=t,this.dialogVisible2=!0},confirm2:function(){var t=this;this.$utils.http.call(this,{url:"/?s=App.User.BanUserForAdmin",parameter:{user_status:this.multipleSelection[0].status,other_uuid:this.multipleSelection[0].uuid,admin_uuid:this.uuid,admin_token:this.token},success:function(e){t.getUser(1),t.dialogVisible2=!1}})},look:function(){var t=this,e=this.multipleSelection;this.limit(e,(function(){t.form.nickname=e[0].ext_info.yesapi_nickname,t.form.avatar=e[0].ext_info.yesapi_avatar,t.form.email=e[0].ext_info.yesapi_email,t.form.points=e[0].ext_info.yesapi_points,t.dialogVisible=!0}))}}},n=s,r=a("2877"),c=Object(r["a"])(n,i,l,!1,null,null,null);e["default"]=c.exports}}]);
//# sourceMappingURL=chunk-2d230a28.6df26796.js.map