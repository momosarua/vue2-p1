import axios from "axios"
import { getLocalStorage } from "@/utils/localStorage";

const request = axios.create({
    baseURL: "/api", // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
    timeout: 3000
})

request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 获取并设置token
    config.headers["token"] = getLocalStorage("token")
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    let {status, message} = response.data
    if(status !== 200) {
      this.$message({message: message || "error", type: "warning"})
    }
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  export default request