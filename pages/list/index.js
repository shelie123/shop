// pages/list/index.js
// 引入已封装好的request
import request from "../../utils/request.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    query: "",
    pagenum: 1,
    pagesize: 10,
    hasMore: true,
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const {
      query
    } = options
    this.setData({
      query: query
    })
    // console.log(query);

    // 请求数据列表
    this.getList();
  },

  // 请求数据列表
  getList() {
    // 正在加载
    if (this.data.loading === true) {
      return;
    }

    // 开始加载数据
    this.setData({
      loading: true
    })

    request({
      url: "/api/public/v1/goods/search",
      data: {
        query: this.data.query,
        pagenum: this.data.pagenum,
        pagesize: 10
      },
    }).then(res => {
      // console.log(res.data.message)
      // goods是商品列表
      const {
        goods
      } = res.data.message;

      // 判断是否到最后一页
      if (goods.length < 10) {
        this.setData({
          hasMore: false
        })
      }

      // 循环给每个商品价格保留两位小数点
      const newData = goods.map(v => {
        v.goods_price = Number(v.goods_price).toFixed(2);
        return v;
      })
      // console.log(newData)
      // 合并数组
      this.setData({
        goods: [...this.data.goods, ...newData],

        // 页数加1
        pagenum: this.data.pagenum + 1,

        // 请求成功之后把loading改为false
        loading: false
      })

    })

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

    // 有更多数据时候才请求下一页的数据
    if (this.data.hasMore) {
      this.getList();
    }

  },

})