
// 常量必须放在vue组件之前加载
import Constant from './constant'
window.Constant = Constant;



import Vue from './Vue';
import App from './App';
import router from './router';

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});