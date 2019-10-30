// pages/category/index.js
import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,

    // 请求产品列表数据
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

    // 请求产品列表数据
    request({
      url: "/api/public/v1/categories"
    }).then(res => {
      console.log(res.data)
      const {
        message
      } = res.data
      this.setData({
        list: message
      })
    })

  },

  // 添加点击事件
  hangdleChange(event) {
    // console.log(event.target.dataset)
    const {
      index
    } = event.target.dataset;
    this.setData({
      current: index
    })
  }
})