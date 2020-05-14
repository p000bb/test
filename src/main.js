import Vue from "vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import App from "./App.vue";
import router from "./router";
import './assets/css/main.css';
import axios from "./axios/http.js";
import utils from './axios/config.js'
import md5 from 'js-md5';
import VueResource from 'vue-resource'
import HighchartsVue from 'highcharts-vue'


Vue.use(HighchartsVue)
Vue.use(VueResource)
Vue.use(ElementUI);
Vue.prototype.axios = axios;
Vue.prototype.$utils = utils;
Vue.prototype.$md5 = md5;

Vue.config.productionTip = false;

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount("#app");
