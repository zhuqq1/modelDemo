import Vue from 'vue'
import Router from 'vue-router'
import Body from '@/container/Body'
//模型浏览
// const ModelBrowsing = () =>
//     import ( /* webpackChunkName: "ModelBrowsing" */ '@/container/ModelBrowsing.vue');

import ModelBrowsing from '@/container/ModelBrowsing.vue';
const NotFound = () =>
    import ( /* webpackChunkName: "404" */ '@/container/404');
Vue.use(Router);
export default new Router({
    routes: [{
            path: '/:projectId/model_browsing',
            component: ModelBrowsing
        },
        {
            path: '*',
            component: NotFound,
            meta: {
                title: '找不到页面'
            }
        }
    ]
})