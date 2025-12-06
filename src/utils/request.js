<<<<<<< HEAD
//✅ 统一管理：所有HTTP请求都通过这个配置
//✅ 统一管理：所有HTTP请求都通过这个配置
//✅ 错误处理：统一的错误提示和处理机制
//✅ 数据简化：让前端开发更专注于业务逻辑
//✅ 维护性：集中管理请求配置，便于维护

import axios from 'axios';
import { ElMessage } from 'element-plus';

const request = axios.create({
  // 创建axios实例
  baseURL: 'http://localhost:8080',
  timeout: 30000, //后台对接接口超时时间30s
});

//request请求拦截器
//可以自请求发送前对请求做一些处理
request.interceptors.request.use(
  // config包含请求的所有信息
  (config) => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8'; // 设置请求头为json格式
    return config;
  },
  (error) => {
    return Promise.reject(error); // 创建一个表示失败的Promise，并将错误信息包装在其中返回
  }
);

//response响应拦截器
//可以在接口响应后统一处理结果
request.interceptors.response.use(
  (response) => {
    let res = response.data;
    //兼容服务器返回的字符串数据
    if (typeof res === 'string') {
      res = res ? JSON.parse(res) : res;
    }
    return res;
  },
  (error) => {
    if (error.response.status === 404) {
      ElMessage.error('未找到请求接口');
    } else if (error.response.status === 500) {
      ElMessage.error('系统异常,请查看后端控制台报错');
    } else {
      console.error(error.message);
    }
    return Promise.reject(error);
  }
);

export default request; //导出request 暴露出去
=======
//✅ 统一管理：所有HTTP请求都通过这个配置
//✅ 统一管理：所有HTTP请求都通过这个配置
//✅ 错误处理：统一的错误提示和处理机制
//✅ 数据简化：让前端开发更专注于业务逻辑
//✅ 维护性：集中管理请求配置，便于维护


import axios from "axios"
import {ElMessage} from "element-plus";

const request = axios.create({ // 创建axios实例
    baseURL: 'http://localhost:8080',
    timeout: 30000  //后台对接接口超时时间30s
})

//request 拦截器
//可以自请求发送前对请求做一些处理
request.interceptors.request.use(config =>{ // config包含请求的所有信息
    config.headers['Content-Type'] = 'application/json;charset=utf-8'; // 设置请求头为json格式
    return config
},error =>{
 return Promise.reject(error) // 创建一个表示失败的Promise，并将错误信息包装在其中返回
});

//response拦截器
//可以在接口响应后统一处理结果
request.interceptors.response.use(
    response => {
        let res = response.data;
        //兼容服务器返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        return res;
        
    },
    error => {
        if (error.response.status === 404) {
            ElMessage.error('未找到请求接口')
        }else if (error.response.status ===500) {
            ElMessage.error("系统异常,请查看后端控制台报错")
        } else {
          console.error(error.message)
        }
        return Promise.reject(error)
    }
)

export default request //导出request 暴露出去
>>>>>>> c0a64c83aee6dd6363c32cb780aae9bc3415dcce
