// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shoplist: {},
    userInfo: wx.getStorageSync("address") || [],
    is_show: true,
    priceAdd: 0
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取地址
    wx.chooseAddress({
      success(res) {
        wx.setStorageSync('address', res)
      },
    })

  },

  handleAdd(e) {

    const index = e.currentTarget.dataset.index;
    let carts = this.data.shoplist;
    let num = carts[index].goods_num;
    let priced = +carts[index].goods_price;
    num = num + 1;
    priced += +priced
    carts[index].goods_num = num;
    this.setData({
      shoplist: carts,
    });

  },

  handlereduce(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.shoplist;
    let num = carts[index].goods_num;
    let price = carts[index].goods_price;
    if (num === 1) {
      return;
    }
    num = num - 1;
    price = price * num - (price * (num - 1));
    carts[index].goods_num = num;
    carts[index].goods_price = price;
    this.setData({
      shoplist: carts
    });

  },


  onShow() {

    // 获取本地存储的数据
    var shoplist = wx.getStorageSync("List") || []
    const {
      goods_num,
      is_show,
      goods_price
    } = shoplist;
    this.setData({
      shoplist,
      goods_num,
      is_show,
      priced: goods_price
    })
  }
})