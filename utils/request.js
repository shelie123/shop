/**
 * 
 * @desc
 * @param  请求对象 | Object
 * @return  promise
 * 
 */


// 基础功能
// this.$axios变成request
// request({
//   url: "xxx"
// }).thne(res => {
//   console.log(res)
// })

// 指定基准路径 
// $axios变成request
//request.defaults.baseURL="xxx"


// 拦截器
// $axios变成request
// request.onError(res=>{
//   // 根据res拦截错误
// })


// 封装请求

const request = (config) => {

  // 判断config是否是一个对象
  if (!(config && typeof config === "object" && !Array.isArray(config))) {
    console.error('参数不是对象！')
    return;
  }

  // 参数中必须包含url
  if (!config.url) {
    console.error('URL不能为空！')
    return;
  }

  // 判断url前面是否带有http，如果有不加上基准路径，反之就加上
  const reg = /^http/

  // http开头的
  if (!reg.test(config.url)) {
    config.url = request.defaults.baseURL + config.url;
  }


  // 返回promise 要新建一个 用new
  // 两个参数：resolve和reject
  return new Promise((resolve, reject) => {
    // wx.request发起请求
    // 将config里面的url解构出来
    wx.request({
      ...config,
      success(res) {
        // 请求成功之后执行resolve，并且返回成功的结果
        resolve(res)
      },
      fail(res) {
        // 请求失败之后执行reject，并且返回失败的结果
        reject(res)
      },
      complete(res) {
        // 执行错误的拦截器
        if (typeof request.errors === 'function') {
          request.errors(res)
        }
      }
    })
  })
}

// baseURL未定义，说明defaults 没有值，它是一个对象 baseURL一个空值
//  指定request默认配置  
request.defaults = {
  baseURL: "" // "https:api.github.com"
}

// 用来缓存拦截器的函数
request.errors = null

// request拦截函数
request.onError = (callback) => {
  request.errors = callback;
}


// 将数据暴露
export default request;