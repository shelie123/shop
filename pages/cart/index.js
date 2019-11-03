// pages/cart/index.js
import request from "../../utils/request.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: {},
    userInfo: wx.getStorageSync("address") || [],
  // 总价格
    priceAdd: 0,
    // 是否全选
    allSelected: true
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

  // 商品加一
  handleAdd(e) {
    console.log(e)
    const {
      id
    } = e.target.dataset;

    const {
      goods
    } = this.data;

    // 数量加一
    goods[id].goods_number += 1;

    // 修改data的值
    this.setData({
      goods
    })

    // 保存到本地
    wx.setStorageSync("goods", goods);

    // 计算总价格
    this.handlePriceAdd();
  },

  // 商品减一
  handlereduce(e) {
    // console.log(e)
    const {
      id
    } = e.target.dataset;
    const {
      goods
    } = this.data;

    // 判断数量是否小于1
    if (goods[id].goods_number <= 1) {
      wx.showModal({
        title: '提示',
        content: '是否要删除商品?',
        success: (res) => {
          if (res.confirm) {
            //  删除商品
            delete goods[id];

            // 由于showModel是异步执行，所以需要把修改data值的方式放到success中

            // 修改data的值
            this.setData({
              goods
            });

            // 保存到本地
            wx.setStorageSync("goods", goods);

            // 计算总价格
            this.handlePriceAdd();
          }
        }
      })
    } else {
      // 数量减一
      goods[id].goods_number -= 1;

      // 修改data的值
      this.setData({
        goods
      })

      // 保存到本地
      wx.setStorageSync("goods", goods);
      // 计算总价格
      this.handlePriceAdd();
    }
  },

  // 判断是否有小数点
  handleInput(e) {
    console.log(e)
    // 获取输入框的值
    const value = +e.detail.value;
    // 获取id
    const {
      id
    } = e.target.dataset;

    const {
      goods
    } = this.data;

    // 判断是否有小数点,向下取整
    goods[id].goods_number = Math.floor(value);

    // 修改data的值
    this.setData({
      goods
    })
  },

  // 输入框输入的数量
  hangdleChange(e) {
    // console.log(e)
    // 获取输入框的值
    const value = +e.detail.value;
    const {
      id
    } = e.target.dataset;
    const {
      goods
    } = this.data;

    // 如果是空的或者是0
    // if (value === 0) {
    //   goods[id].goods_number = 1
    // } else {
    //   goods[id].goods_number = value
    // }

    goods[id].goods_number = value === 0 ? 1 : value;

    // 修改data的值
    this.setData({
      goods
    });

    // 保存到本地
    wx.setStorageSync("goods", goods);
    // 计算总价格
    this.handlePriceAdd();
  },

  // 单个选状态取反
  handleSelected(e) {
    // console.log(e)
    // 获取id
    const {
      id
    } = e.target.dataset;

    const {
      goods
    } = this.data;

    // 把选中状态取反
    goods[id].selected = !goods[id].selected;

    this.setData({
      goods
    });

    // 保存到本地
    wx.setStorageSync("goods", goods)
    // 计算总价格
    this.handlePriceAdd();

    // 判断全选状态
    this.handleAllSelected()
  },

  // 计算总价格 , 小程序没有computed属性，所以需要封装计算总价格的函数
  handlePriceAdd() {
    const {
      goods
    } = this.data;

    let price = 0;

    // 开始计算，v是key，也就是商品id

    Object.keys(goods).forEach(v => {
      // 当前商品必须是选中
      if (goods[v].selected) {
        // 单价乘以数量
        price += (goods[v].goods_number * goods[v].goods_price)

      }

      this.setData({
        priceAdd: price
      })
    })
  },

  // 全选状态
  handleAllSelected() {
    const {
      goods
    } = this.data;
    let isSelect = true;

    // 判断是否有一个是没选中
    Object.keys(goods).forEach(v => {
      if (!goods[v].selected) {
        isSelect = false;
      }
    })

    this.setData({
      allSelected: isSelect
    })

  },

  // 点击全选按钮的事件
  handleAllSelectedEvent() {
    const {
      goods,
      allSelected
    } = this.data;

    // 循环取反选中状态，取反是根据allSelected
    Object.keys(goods).forEach(v => {
      goods[v].selected = !allSelected
    })

    this.setData({
      goods,

      // 判断全选状态
      allSelected: !allSelected
    })

    // 保存到本地
    wx.setStorageSync("goods", goods);

    // 计算总价格
    this.handlePriceAdd();

  },

  onShow() {

    // 获取本地存储的数据
    var goods = wx.getStorageSync("goods") || null
    this.setData({
      goods
    })
    // 计算总价格
    this.handlePriceAdd();
    // 判断全选状态
    this.handleAllSelected()
  }
})