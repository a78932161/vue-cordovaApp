import Vue from 'vue';
import App from './App';
import VConsole from 'vconsole'
import fastclick from 'fastclick'
import router from './router';
import store from './store';
import 'common/js/flexible';


Vue.config.productionTip = false;
fastclick.attach(document.body);

let vConsole=new VConsole({maxLogNumber: 5000});  //console.log调试工具，发布时需注释

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
