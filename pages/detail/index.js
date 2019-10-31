// pages/detail/index.js
import request from "../../utils/request.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    details: {},
    indicatorDots: true,
    vertical: true,
    autoplay: true,
    interval: 2000,
    duration: 500
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    const {
      goods_id
    } = options

    // 请求商品详情数据
    request({
      url: "/api/public/v1/goods/detail",
      data: {
        goods_id
      }
    }).then(res => {
      console.log(res.data)
      const {
        message
      } = res.data;

      // 给价格保留两位小数点
      message.goods_price = Number(message.goods_price).toFixed(2);

      // details商品详情数据
      this.setData({
        details: message
      })
    })
  },


})