//index.js
//获取应用实例
// 引入封装的请求
import request from "../../utils/request.js"

Page({

  onLoad() {

    request({
      url: "/123"
    }).then(res => {
      // console.log(res, 123)
    }).catch(res => {
      // console.log(res, 456)
    })
  }


})