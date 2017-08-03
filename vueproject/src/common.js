import Vue from './Vue';
import axios from 'axios';
let component = require('./assets/js/component');

let commonObj = {
  Vue: new Vue(),
  logout: Vue.logout,
  Toast: Vue.Toast,
  Validator: component.Validator,
  Confirm: new component.ConfirmClass(),
  Alert: new component.AlertClass(),
  fetchData: fetchData,
  getUrlParams: getUrlParams,
  formatDate: formatDate
};

function fetchData (options) {

  const success = options.success;
  const error = options.error;
  const loadingText = options.loadingText || '正在加载';
  const successText = options.successText;
  const errText = options.errText || '请求出错，请稍后重试';

  if (!options.hideLoading) {
    commonObj.Toast.show({template: loadingText, loading: true});
  }

  let promise = axios({
    method: options.method,
    url: options.url,
    data: options.data,
    params: options.params
  });
  promise.then ((response) => {
    let data = response.data;
    if (!data.errCode) {
      if (typeof success === 'function') {
        if (!!successText) {
          commonObj.Toast.show({template: successText, duration: 2000, callback: function (){
            success(data);
          }});
        }else{
          commonObj.Toast.hide();
          success(data);
        }
      }
    }else{
      commonObj.Toast.show({template: data.errDesc ||　errText, duration: 2000});
      if (typeof error === 'function') {
        error(data);
      }
    }
  });
  promise.catch(function (error) {
    if (error.response) {
      let response = error.response;
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      let msg = response.data && response.data.errDesc;
      let err = response.statusText;
      commonObj.Toast.show({template: msg ||　err, duration: 2000});
      if (typeof error === 'function') {
        error(data);
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
  });
}

function getUrlParams (params) {
  let temp = location.href.split(`${params}=`)[1];
  return temp && temp.split('&')[0];
}

function formatDate (time, type) {
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
}

export default commonObj;
