// pages/detail/index.js
import request from "../../utils/request.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    details: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // 请求商品详情数据
    // request({
    //   url: "/api/public/v1/goods/detail"
    // }).then(res => {
    //   console.log(res.data)
    // })
  },


})