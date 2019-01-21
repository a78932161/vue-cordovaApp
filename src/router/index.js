import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router);

const _import = require('./_import_' + process.env.NODE_ENV);

let constantRouterMap=[
  {path:'/',redirect:'/login'},
  {path:'/login',component:_import('login/login')},
  {path:'/home',component:_import('home/index/index')},
];

export default new Router({
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
