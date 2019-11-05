// pages/order_form/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  handleBtn(e) {
    console.log(e.currentTarget.dataset)
    const {
      index
    } = e.currentTarget.dataset;

    this.setData({
      current: index
    })



  }
})