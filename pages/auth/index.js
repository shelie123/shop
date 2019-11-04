// pages/auth/index.js
import request from "../../utils/request.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  // 同意授权后的事件方法，获取token筛选前四个参数
  handleGetUserInfo(res) {
    // console.log(res)
    const {
      encryptedData,
      iv,
      rawData,
      signature
    } = res.detail

    // 获取code
    wx.login({
      success(value) {
        // console.log(value)
        const {
          code
        } = value

        // 请求必须要放在回调函数中
        request({
          url: "/api/public/v1/users/wxlogin",
          method: "POST",
          data: {
            encryptedData,
            iv,
            rawData,
            signature,
            code
          }
        }).then(res => {
          // console.log(res)
          const {
            token
          } = res.data.message;
          wx.setStorageSync("token", token);
        })
      }
    })




  }

})