import axios from 'axios'
import qs from 'qs';
import {getToken, setToken, removeToken} from '@/common/js/auth'
import {baseURL, tokenName} from '@/api/config';
import wu from '@/common/wu-ui/wu-ui';


let URL = window.location.origin;
let URL1 = '';
if (window.location.pathname == '/') {
  URL1 = '/';
} else {
  URL1 = window.location.pathname;
}
let config = {
  loginUrl: `${URL}${URL1}#/login`, /*登陆地址*/
  loginApi: `${baseURL}/login`, /*登陆API*/
  logoutApi: `${baseURL}/logout`, /*退出API*/
  indexUrl: `${URL}${URL1}/#/home` /*首页*/
};

const service = axios.create({
  baseURL,
  timeout: 15000,               //请求超时时间
  // withCredentials: true
});


service.interceptors.request.use(config => {
  if (config.headers['Content-Type'] === "application/x-www-form-urlencoded") {
    config.data = qs.stringify(config.data);
  }
  if (getToken()) {
    config.headers[tokenName] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器

service.interceptors.response.use(response => {
    let token = response.headers[tokenName];
    if (token) {
      setToken(token);
    }
    return response.data;
  },
  error => {
    console.log('err' + error) // for debug
    let errcode = String(error);
    if (errcode.indexOf('401') > 0) {
      if (location.href === config.loginUrl) {    /*登陆页面401错误，提示用户名或者密码错误*/
        wu.showToast({
          title: '账号密码错误!',
          mask: false,
          duration: 2000
        });
      }
      else {
        wu.showToast({
          title: ' 超时!',
          mask: false,
          duration: 2000
        });
        removeToken();
        location.href = config.loginUrl;
        //setLimited('true');
        // setLimitedUrl(location.href);
      }
    }


    return Promise.reject(error)
  }
);
export default service
