// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './assets/iconfont/iconfont.css'
import store from '@/store'
//import axios from 'axios'
//import VueAxios from 'vue-axios'

//引入api
import Axios from 'axios'
import api from '../src/api/index'
import Util from '../src/utils/utils'
//引入请求方法
import { $get, $post, $AxiosOld } from '../src/utils/request'
import parseUrlParams from '../src/utils/parseUrlParams'
//Vue.use(VueAxios, axios)    

import {
    Table,
    TableColumn,
    Message,
    Button,
    ButtonGroup,
} from 'element-ui'
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.prototype.$message = Message

Vue.prototype.$api = api //全局引入api
Vue.prototype.$parseUrl = parseUrlParams.methods.parseUrl //注册全局解析url参数
Vue.prototype.$get = $get
Vue.prototype.$post = $post
Vue.prototype.$AxiosOld = $AxiosOld //为老街口返回格式不一致时使用

Vue.config.productionTip = false
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})