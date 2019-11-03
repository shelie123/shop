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

  handleList() {
    // 创建一个新的数组来存放搜索内容
    var arr = wx.getStorageSync('List') || [];
    // 将搜索的内容累加进数组arr里面，用unshift 数据前添加

    // 声明一个shoplist来接收需要存储的数据
    let shopList = {
      goods_id: this.data.details.goods_id,
      goods_name: this.data.details.goods_name,
      goods_price: this.data.details.goods_price,
      goods_small_logo: this.data.details.goods_small_logo,
      is_show: true,
      goods_num: 1
    }


    // 给数组去重
    // 如果新数组的当前元素的索引值 == 该元素在原始数组中的第一个索引，则返回当前元素
    // 如果数组里面有值，判断是否已经拥有
    if (arr.length > 0) {
      // 判断添加的商品ID 是否已在本地存储中，如果有就商品数量加一
      var result = arr.some(v => {
        if (v.goods_id === this.data.details.goods_id) {
          v.goods_num += 1
          return true
        }
      })
      // 商品还为存入本地，就在数组前添加
      if (!result) {
        arr.unshift(shopList)
      }
    } else {
      arr.unshift(shopList)
    }

    console.log(arr)

    // 保存到本地
    wx.setStorageSync('List', arr)

  }

})