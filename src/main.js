import Vue from 'vue';
import App from './App';
import VConsole from 'vconsole'
import fastclick from 'fastclick'
import router from './router';
import store from './store';
import 'common/js/flexible';
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import vueg from 'vueg'
import 'vueg/css/transition-min.css'
import '@/common/font/iconfont.scss'
import provide from './apollo';
import '@/permission'
import wu from '@/common/wu-ui/wu-ui';


Vue.use(vueg, router) //←注意这一句应该在router实例化之后

Vue.use(MuseUI);

Vue.prototype.$wu = wu;


Vue.config.productionTip = false;
fastclick.attach(document.body);

let vConsole = new VConsole({maxLogNumber: 5000});  //console.log调试工具，发布时需注释


// document.addEventListener('deviceready', function () {   //打包的时候开启
new Vue({
  el: '#app',
  router,
  provide,
  store,
  render: h => h(App)
});
// }, false);


