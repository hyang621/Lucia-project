import axios from 'axios'
/**
 * 【指定 axios的 baseURL】
 * 如果手工指定 baseURL: '/jeecg-boot'
 * 则映射后端域名，通过 vue.config.js
 * @type {*|string}
 */
let apiBaseUrl = window._CONFIG['domianURL'];
// 创建 axios 实例
const service = axios.create({
  baseURL: apiBaseUrl, // api base_url
  timeout: 60000 // 请求超时时间
})

const err = (error) => {
  if (error.response) {
    // let data = error.response.data
    // switch (error.response.status) {
    //   case 403:
    //     notification.error({ message: '系统提示', description: '拒绝访问',duration: 4})
    //     break
    //   case 500:
    //     notification.error({ message: '系统提示', description:'Token失效，请重新登录!',duration: 4})
    //     break
    //   case 404:
    //     notification.error({ message: '系统提示', description:'很抱歉，资源未找到!',duration: 4})
    //     break
    //   case 504:
    //     notification.error({ message: '系统提示', description: '网络超时'})
    //     break
    //   case 401:
    //     notification.error({ message: '系统提示', description:'未授权，请重新登录',duration: 4})
    //     break
    //   default:
    //     notification.error({ message: '系统提示', description: data.message, duration: 4 })
    //     break
    // }
  }
  return Promise.reject(error)
};

// request interceptor
service.interceptors.request.use(config => {
  // const token = window.sessionStorage.getItem('LOCAL-TOKEN');
  // if (token) config.headers[ 'Authorization' ] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  // config.headers[ 'TenantId' ] = tenantId;
  return config
},(error) => {
  return Promise.reject(error)
})

service.interceptors.response.use((response) => {
    if (response.headers['content-disposition']) response.data.fileName = response.headers['content-disposition']; // 下载文件获取文件名的临时解决方法
    return response.data
  }, err)


export {
  service as axios
}