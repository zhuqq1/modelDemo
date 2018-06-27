import Vue from 'vue';
import Router from 'vue-router';
import Body from '@/container/Body';

//按需引
const bimFaceDemo = () =>
    import ( /* webpackChunkName: "ProductionBoard" */ '@/container/bimFaceDemo.vue');
//404
const NotFound = () =>
    import ( /* webpackChunkName: "404" */ '@/container/404');


Vue.use(Router);
const routes = [{
        path: '/bimFaceDemo',
        component: Body,
        //redirect: { name: 'CustomTrack' },
        //redirect: '/bimFaceDemo',
        children: [{
            path: '/bimFaceDemo',
            name: 'bimFaceDemo',
            component: bimFaceDemo,
            meta: {
                title: 'bimFaceDemo',
                type: 'bimFaceDemo'
            }
        }, ]
    },
    {
        path: '*',
        component: NotFound,
        meta: {
            title: '找不到页面'
        }
    }
];
export default new Router({
    routes: routes
});