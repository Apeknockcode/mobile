import axios from 'axios'
import type { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Toast } from 'antd-mobile'


/* 服务器返回数据的的类型，根据接口文档确定 */
export interface Result<T = any> {
  code: number,
  message: string,
  data: T
}

const service: AxiosInstance = axios.create({
  baseURL: '/web',
  timeout: 0
})

// 正在进行中的请求列表
let reqList: never[] = []

/**
 * 阻止重复请求
 * @param {array} reqList - 请求缓存列表
 * @param {string} url - 当前请求地址
 * @param {function} cancel - 请求中断函数
 * @param {string} errorMessage - 请求中断时需要显示的错误信息
 */
const stopRepeatRequest = function (reqList: any, url: any, cancel: any, errorMessage: string) {
  const errorMsg = errorMessage || ''
  for (let i = 0; i < reqList.length; i++) {
    if (reqList[i] === url) {
      cancel(errorMsg)
      return
    }
  }
  reqList.push(url)
}

/* 请求拦截器 */
service.interceptors.request.use((config: AxiosRequestConfig): any => {
  //  伪代码
  // if (user.token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  // let cancel = null
  // // 设置cancelToken对象
  // config.cancelToken = new axios.CancelToken( (c)=> {
  //   cancel = c
  // })
  // // 阻止重复请求。当上个请求未完成时，相同的请求不会进行
  // stopRepeatRequest(reqList, config.url, cancel, `${config.url} 请求被中断`)
  return config
}, (error: AxiosError) => {
   Toast.show({content:error.message})
  return Promise.reject(error)
})

/* 响应拦截器 */
service.interceptors.response.use((response: AxiosResponse) => {
  const { code, msg, data } = response.data


  // 根据自定义错误码判断请求是否成功
  if (code === 0) {
    // 将组件用的数据返回
    return data
  } else {
    // 处理业务错误。
   Toast.show({content:msg})
    return Promise.reject(new Error(msg))
  }
}, (error: AxiosError) => {
  // 处理 HTTP 网络错误
  let message = ''
  // HTTP 状态码
  const status = error.response?.status
  switch (status) {
    case 401:
      message = 'token 失效，请重新登录'
      // 这里可以触发退出的 action
      break;
    case 403:
      message = '拒绝访问'
      break;
    case 404:
      message = '请求地址错误'
      break;
    case 500:
      message = '服务器故障'
      break;
    default:
      message = '网络连接故障'
  }
  Toast.show({content:message})
  return Promise.reject(error)
})

/* 导出封装的请求方法 */
export const http = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.get(url, config)
  },

  post<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.post(url, data, config)
  },

  put<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.put(url, data, config)
  },

  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.delete(url, config)
  }
}

/* 导出 axios 实例 */
export default service