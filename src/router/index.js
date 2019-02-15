import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router);

const _import = require('./_import_' + process.env.NODE_ENV);

let constantRouterMap = [
  {path: '/', redirect: '/home'},
  {path: '/login', component: _import('login/login')},
  {
    path: '/home',
    component: _import('home/index'),
    redirect: '/orders',
    children: [
      {
        path: '/orders',
        component: _import('orders/index'),
      },
      {
        path: '/orders/info',
        component: _import('orders/info'),
      },
      {
        path: '/sales',
        component: _import('sales/index'),
      },
      {
        path: '/client',
        component: _import('client/index'),
      },


    ]
  },
];

export default new Router({
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
