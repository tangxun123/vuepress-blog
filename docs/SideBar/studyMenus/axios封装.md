# axios 封装

```js
import axios from "axios";

axios.defaults.timeout = 10000; //响应时间
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8"; //配置请求头
axios.defaults.baseURL = ""; //配置接口地址

// 1. 添加请求拦截器
axios.interceptors.request.use(
  (config) => {
    //在发送请求之前做某件事
    config.headers.x_access_token = token; // 鉴权认证--在请求的拦截器中可以添加token。 也可以做一些其他处理
    return config;
  },
  (error) => {
    console.log("错误的传参");
    return Promise.reject(error);
  }
);

// 2. 返回状态判断(添加响应拦截器)
axios.interceptors.response.use(
  (response) => {
    //对响应数据做些事
    if (response.data.code === 401) {
      //用户token失效
      //清空用户信息
      sessionStorage.user = "";
      sessionStorage.token = "";
      window.location.href = "/"; //返回登录页
      return Promise.reject(msg); //接口Promise返回错误状态，错误信息msg可有后端返回，也可以我们自己定义一个码--信息的关系。
    }
    if (response.status !== 200 || response.data.code !== 200) {
      //接口请求失败，具体根据实际情况判断
      message.error(msg); //提示错误信息
      return Promise.reject(msg); //接口Promise返回错误状态
    }
    return response;
  },
  (error) => {
    if (axios.isCancel(error)) {
      requestList.length = 0;
      // store.dispatch('changeGlobalState', {loading: false})
      throw new axios.Cancel("cancel request");
    } else {
      message.error("网络请求失败,请重试");
    }
    return Promise.reject(error);
  }
);

//返回一个Promise(发送post请求)
export function fetchPost(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(
        (response) => {
          resolve(response);
        },
        (err) => {
          reject(err);
        }
      )
      .catch((error) => {
        reject(error);
      });
  });
}
////返回一个Promise(发送get请求)
export function fetchGet(url, param) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params: param })
      .then(
        (response) => {
          resolve(response);
        },
        (err) => {
          reject(err);
        }
      )
      .catch((error) => {
        reject(error);
      });
  });
}
export default {
  fetchPost,
  fetchGet,
};
```
