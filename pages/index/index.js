//index.js
//获取应用实例
// 引入封装的请求
import request from "../../utils/request.js"

Page({

  data: {
    message: [],
    indicatorDots: true,
    vertical: true,
    autoplay: true,
    interval: 2000,
    duration: 500
  },

  onLoad() {

    request({
      url: "/api/public/v1/home/swiperdata"
    }).then(res => {
      const {
        message
      } = res.data
      this.setData({
        message: message
      })
      console.log(message)
    }).catch(res => {
      // console.log(res, 456)
    })
  }


})