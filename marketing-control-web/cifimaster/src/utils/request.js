import axios from 'axios'
import {
  MessageBox,
  Message
} from 'element-ui'
import store from '@/store'
import {white} from '../whiteList'


// create an axios instance
const service = axios.create({
  // withCredentials: true, // send cookies when cross-domain requests
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 60 * 1000 // request timeout
})
// request interceptor
service.interceptors.request.use(
  config => {
  store.dispatch('app/addLoadings'); //加载loading遮罩。
if (localStorage.getItem('token') != undefined && localStorage.getItem('token') != "") {
  config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token')
  config.headers['token'] = localStorage.getItem('token')
  config.headers['username'] = localStorage.getItem('username')
  config.headers['userid'] = localStorage.getItem('id')
}
config.headers['isWhiteList'] = white().includes('/'+location.href.split('?')[0].split('/').pop())?"true":"false"
return config
},
error => {
  // do something with request error
  console.log(error) // for debug
  return Promise.reject(error)
}
)

// response interceptor
service.interceptors.response.use(
  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
  const res = response.data
  store.dispatch('app/reduceLoadings'); //关闭loading遮罩。
//系统管理 审批模板中模拟明源发起判定
if(res.Result&&res.Result.includes("发起成功")){
  res.code=200
}
// if the custom code is not 20000, it is judged as an error.
if (res.code !== 0 && res.code !== 200&&res.result!==0) {
  console.log("状态码：：："+res.code)
  _paq.push(['trackEvent', '错误', res.code, res.messages || res.message || 'Error']);
  Message({
    message: res.messages || res.message || '未知错误,请联系管理员',
    type: 'error',
    duration: 5 * 1000
  })
  // 没有菜单权限
  if (res.code === "-100005") {
    store.dispatch('user/resetToken').then(() => {
      //window.location.href = process.env.VUE_APP_LOGIN_URL;
      window.location.href = process.env.VUE_APP_LOGOUT_URL;
    //this.$router.push('/login');
  })
  }
  // Token过期
  if (res.code === '-100013') {
    //跳单点
    window.localStorage.removeItem("token");
    // to re-login
    MessageBox.confirm('登录状态过期，请重新登录！', '请重新登录', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
      store.dispatch('user/resetToken').then(() => {
        window.location.href = process.env.VUE_APP_LOGOUT_URL;
    // this.$router.push('/login');
  })
  })
  }
  return Promise.reject(new Error(res.messages || 'Error'))
} else {
  return res
}
},
error => {
  
  store.dispatch('app/reduceLoadings'); //关闭loading遮罩。
  console.log(error.response.data ,"error" ) // for debug
  let e=error.response.data
  //发版后重新登录
  // if(e.message=="登录状态失效！请重新登录！"&&e.status==500){
  //   localStorage.clear()
  //   store.dispatch('user/resetToken').then(() => {
  //     window.location.href = process.env.VUE_APP_LOGOUT_URL;
  //   })
  //   return Promise.reject(error)
  // }
  _paq.push(['trackEvent', '错误', '请求错误', error.messages || 'Error']);
  //如果token过期 跳单点登录
  if(localStorage.getItem("expiration")&&new Date().getTime()>localStorage.getItem("expiration")){
    //跳单点
    window.localStorage.removeItem("token");
    console.log(window.localStorage.getItem("token"));
    window.location.href = process.env.VUE_APP_LOGIN_URL;
    console.log(new Date().getTime());
    console.log(localStorage.getItem("expiration"));
    console.log(process.env.VUE_APP_LOGOUT_URL);
  }
  Message({
    message: "未知错误，请联系管理员",
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
}
)
export default service
