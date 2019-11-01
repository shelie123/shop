// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showValue: "",
    valueShow: false,
    // 定义一个数组，来接收本地存储的数据
    keyword: wx.getStorageSync('search') || []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  handleInput(event) {
    // console.log(event.detail)
    const {
      value
    } = event.detail

    let valueShow;

    // 判断输入框是否有值，value.trim()去除前后空格
    valueShow = value.trim() ? true : false

    this.setData({
      showValue: value,
      valueShow
    })

  },

  handleValue(event) {
    // console.log(event.detail)
    // const {
    //   value
    // } = event.detail
    // console.log(value)

    // 创建一个新的数组来存放搜索内容
    var arr = wx.getStorageSync('search') || [];
    // 将搜索的内容累加进数组arr里面，用unshift 数据前添加

    // arr.unshift(value)
    arr.unshift(this.data.showValue)

    // 给数组去重
    // 如果新数组的当前元素的索引值 == 该元素在原始数组中的第一个索引，则返回当前元素
    const arr1 = arr.filter((item, index) => {
      return arr.indexOf(item, 0) === index;
    });


    // 保存到本地
    wx.setStorageSync('search', arr1)

    wx.navigateTo({
      url: "/pages/list/index?query=" + this.data.showValue
    })
  },

  handlecancel() {
    this.setData({
      showValue: "",
      valueShow: false
    })
  },

  handleClear() {
    wx.clearStorageSync("search");
    this.setData({
      keyword: []
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */

  onShow() {
    // 每次显示页面都从本地获取数据
    this.setData({
      keyword: wx.getStorageSync("search") || []
    })
  },




})