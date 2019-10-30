//app.js
// 引入封装的 request 请求
import request from "./utils/request.js"

App({
  // 项目运行时候触发的生命周期，只执行一次
  onLaunch() {
    //初始化

    // 设置默认的基准路径
    request.defaults.baseURL = "https://api.zbztb.cn"

    // 监听错误的请求
    request.onError(res => {
      console.log(`拦截错误：`, res)

      if (res.statusCode === 404) {
        wx.showToast({
          title: "接口不存在",
        })
      }

    })

  },
  globalData: {
    userInfo: null
  }
})