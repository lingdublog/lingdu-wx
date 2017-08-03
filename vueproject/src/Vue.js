import Vue from 'vue';
import axios from 'axios';
import UIComponent from './assets/js/component';
require('@/assets/lib/swiper/swiper-3.4.2.min');

Vue.Toast = new UIComponent.ToastClass();

// 全局请求拦截器
axios.interceptors.request.use(function (config) {
  let token = sessionStorage.getItem('token');
  // request.headers.set('Content-Type', 'application/json');
  // config.headers['Accept'] = 'application/vnd.testbapi.v1+json';
  config.headers['Authorization'] = `Bearer ${token}`;
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  if (response.body && response.body.status_code === 401) {
    // 保证请求结束后的hide事件在过期提示之前
    setTimeout(function (){
      Vue.Toast.show({template: '登录过期，正在跳到登录页', duration: 2000});
    },0);
    let returnUrl = location.href;
    setTimeout(function (){
      Vue.logout(returnUrl);
    }, 2000)
  }else{
    return response;
  }
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});


// 注册全局时间过滤器
Vue.filter('formatDate', (time, type) => {
  if (time) {
    let date = new Date(time);
    let format = date.getFullYear() + '-' + addZero(date.getMonth()+1) + '-' + addZero(date.getDate());
    if (type) {
      return format + ' ' + addZero(date.getHours()) + ':' + addZero(date.getMinutes()) + ':' + addZero(date.getSeconds());
    }else{
      return format;
    }
    function addZero (num) {
      return num > 9 ? num : '0' + num;
    }
  }
});

//  全局移除未授权模块方法
Vue.prototype.auth = function (auth) {
  let authListStr = sessionStorage.getItem('authList');
  if (authListStr) {
    let authList = JSON.parse(authListStr);
    let flag = false;
    for (let i in authList) {
      if (authList[i] == auth) {
        flag = true;
        break;
      }
    }
    return flag;
  }
};

// 全局权限指令
Vue.directive('auth', {
  bind: function (el, binding, vnode) {
    let auth = binding.expression;
    let authList = sessionStorage.getItem('authList');
    if (authList) {
      let flag = false;
      for (let i in authList) {
        if (authList[i] == auth) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        el.style.display = 'none';
      }
    }
  }
});


// 退出登录
Vue.logout = function (returnUrl){
  // 清空session
  sessionStorage.clear();
  // 登录过期，跳到登录页
  Vue.router.push({name: 'login', query: {returnUrl}})
};

export default Vue;
