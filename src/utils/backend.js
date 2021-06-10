
import axios from 'axios'
import store from '@/store'
// import { getToken, getLang } from '@/utils/auth'
import router from '@/router'
const instance = axios.create({
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 1000 * 60 * 5 // request timeout
})
function request(settings) {
  let api = settings.api
  api = getApiConf(api)
  let url = getUrl(api)
  const params = settings.data
  const config = settings.options || {}
  config.isShowLoad = settings.isShowLoad
  const isFormData = settings.isFormData
  let newParams = {} // 不确定在调用接口时是否传入了参数，这里声明一个新的params
  if (params && isFormData) { // 如果条件成立说明有formdata形式的数据需要推送
    newParams = new FormData()
    for (const i in params) { // 将传入的数据转成formdata
      newParams.append(i, params[i])
    }
  } else {
    newParams = params // 如果不是formdata则不需要对params进行操作
  }
  let response = {}
  // 因为put、post以及patch都是向服务端推送数据，需要的参数一样，所以这里分开写一下
  if (settings.isDownLoad) { config.responseType = 'blob' }
  if (api.method === 'put' || api.method === 'post' || api.method === 'patch') {
    try {
      response = instance[api.method](url, newParams, config)
    } catch (err) {
      response = err // 如果请求错误就将错误返回
    }
  } else {
    config.data = newParams
    try {
      const query = buildQuery(config.data)
      if (query.flag) {
        url += query.data
      } else {
        if (api.method === 'get') {
          config.params = newParams
        }
      }
      response = instance[api.method](url, config)
    } catch (err) {
      response = err
    }
  }
  return response // 请求成功返回res
}
instance.interceptors.request.use(config => {
  // if (getToken()) {
  //   // please modify it according to the actual situation
  //   config.headers.common['Token'] = getToken()
  //   // config.headers.common['Token'] = 'ea6f7e37-6a26-4151-b6b3-a2e79ef1d29d'
  //   config.headers.common['Lang'] = getLang()
  // }
  /* config.headers.common['Authorization'] = this.$util.business.SessionUtils.getLoginUser().token
  config.headers.common['Username'] = this.$util.business.SessionUtils.getLoginUser().username*/
  config.headers.common['x-requested-with'] = 'XMLHttpRequest'
  return config
}, (err) => {
  console.log(err)
})
// 响应拦截器
instance.interceptors.response.use(res => {
  // 请求成功
  return res
}, (err) => {
  const response = err.response || 0

  if (response === 0) {
    // Notify({ type: 'danger', message: '网络异常,请检查网络设置' });
  } else if (response.status === 200 || response.status === 304) {
    return response
  } else if (response.status === 401) {
    if (document.getElementsByClassName('no-permission-popup').length === 0) {
      MessageBox.confirm('系统检测到您登录时长已超过半小时，为了安全起见，建议您重新登录已确保身份的合法性！', '锁屏提示', {
        confirmButtonText: '登录',
        closeOnClickModal: false,
        type: 'warning',
        showClose: false,
        iconClass: 'el-icon-warning',
        showCancelButton: false,
        center: true,
        customClass: 'no-permission-popup'
      })
        .then(() => {
          store.dispatch('user/logout').then(() => {
            router.push({ path: '/login' })
            window.location.reload()
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  } else if (response.status === 403) {
    // Notify({ type: 'danger', message: '访问禁止，请联系管理员获取权限' });
  } else {
    // Notify({ type: 'danger', message: '服务端异常，请联系技术支持' });
  }
})
function getApiConf(value) {
  if (value) {
    if (typeof (value) === 'string') {
      return {
        path: value,
        method: 'GET'
      }
    } else {
      if (!value) {
        throw new Error('Api未配置' + JSON.stringify(value))
      }
      if (typeof (value) !== 'object') {
        throw new Error('Api配置错误' + JSON.stringify(value))
      }
      if (!value.method) {
        throw new Error('Api配置错误，缺少method属性' + JSON.stringify(value))
      }
      if (!value.path) {
        throw new Error('Api配置错误，缺少path属性' + JSON.stringify(value))
      }
      return {
        path: value.path,
        method: value.method.toLowerCase(),
        server: value.server
      }
    }
  }
  throw new Error('Api path is null')
}

function getUrl(api) {
  // 此处配置中转服务器
  let baseUrl = window.config.goodsUrl
  return baseUrl + api.path
}

function buildQuery(json) {
  if (!json) {
    return { data: '', flag: true }
  }
  if (StringUtil.isString(json)) return { data: json, flag: true }
  let query = '?'
  for (const i in json) {
    query += (i + '=' + encodeURIComponent(json[i]) + '&')
  }
  if (query.charAt(query.length - 1) === '&') {
    query = query.substr(0, query.length - 1)
  }
  return { data: query, flag: false }
}
/**
 * 请求代理类
 */
export default {
  getInstance() {
    return instance
  },
  /**
   * 获取url
   */
  getUrl(apiKey, data) {
    const api = getApiConf(apiKey)
    let url = getUrl(api)
    if (typeof data === 'object') {
      url += buildQuery(data)
    }
    return url
  },
  /**
   * 请求后端
   * @param apiKey 获取URL用，即定义在src/conf/api.js中的api的Key
   * @param data JSON数据
   * @param options ajax附件参数，主要是http header，用的比较少
   */
  request(api, data, options, isShowLoad = true, isFormData = false, isDownLoad = false) {
    return new Promise((resolve, reject) => {
      // if (isShowLoad) { store.dispatch('settings/changeLoading', true) }
      request({
        api,
        data,
        options,
        isShowLoad,
        isFormData,
        isDownLoad
      }).then((response) => {
        // store.dispatch('settings/changeLoading', false)
        try {
          isDownLoad ? resolve(response) : resolve(response.data)
        } catch (e) {
          reject(new Error('请求失败'))
        }
      }, (response) => {
        store.dispatch('settings/changeLoading', false)
        reject(response)
      })
    })
  },
  /**
   * @param {
   * api:''//piKey 获取URL用，即定义在src/conf/api.js中的api的Key
   *  data: JSNO对象，POST或者PUT到服务端的JOSON数据，如果是GET或者Delete则实际转换成url参数
   *  query: FormData
   * }
   */
  send(settings, isShowLoading = true) {
    return new Promise((resolve, reject) => {
      request(settings).then((response) => {
        resolve(response.data)
      }, (response) => {
        reject(response)
      })
    })
  },
  /**
   * 转换错误
   * @param {*} error
   */
  convertError(error) {
    const ret = { code: -1 }
    const response = error.response
    if (response) {
      ret.code = response.status
      const url = response.config.url
      if (response.status === 504) {
        ret.msg = '服务器网关超时，请联系管理员，请求：' + url
      } else if (response.status === 404) {
        ret.msg = '服务未启动或未找到接口，请求：' + url
      } else {
        ret.msg = '服务器繁忙，请稍后再试，请求：' + url
      }
    } else {
      ret.msg = '无法连接服务器，请检查您的网络'
    }
    return ret
  }
}
