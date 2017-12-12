
// 常量必须放在vue组件之前加载
import Constant from './constant'
window.Constant = Constant;
// window.API_HOST = 'http://192.168.0.109:3011';
window.API_HOST = '/api';
// window.API_HOST = 'http://api.lingdublog.cc';


import Vue from './Vue';
import App from './App';
import router from './router';

if (window.cordova) {
  window.document.addEventListener('deviceready', function () {
    new Vue({
      el: '#app',
      router,
      template: '<App/>',
      components: { App }
    });
    deviceReady();
  }, false)
}else{
  new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
  })
}

function deviceReady () {
  if (cordova.InAppBrowser) {
    window.open = cordova.InAppBrowser.open;
  }


}
