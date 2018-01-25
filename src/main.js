// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import router from './router';
import App from './App';
import Element from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import './assets/iconfont/iconfont.css';
//引入重置样式
import 'normalize.css';
import "assets/css/common.less";
import 'font-awesome/css/font-awesome.css';
import store from '@/store';
//引入api
import Axios from 'axios';
import api from '../src/api/index';
import Util from '../src/utils/utils';
//引入请求方法
import { $get, $post, $AxiosOld } from '../src/utils/request';
import parseUrlParams from '../src/utils/parseUrlParams';
Vue.use(Element);
Vue.prototype.$api = api; //全局引入api
Vue.prototype.$parseUrl = parseUrlParams.methods.parseUrl; //注册全局解析url参数
Vue.prototype.$get = $get;
Vue.prototype.$post = $post;
Vue.prototype.$AxiosOld = $AxiosOld; //为老街口返回格式不一致时使用
/*
  元素外点击
  example
  <div class="user-container" v-clickoutside="hideBox">
 */
//Vue.directive('clickoutside', Clickoutside)

//针对内部调试时的嵌入iframe是拼接的地址域名或者调试的时候需要拼接的地址域名；打包生产的时候要讲其制为null
window.domainNames = {
    // dev: "http://bim5d-hunan.glodon.com"
    // dev: "http://192.168.79.78:9000"
}
Vue.config.productionTip = true;
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
});