//index.js
//获取应用实例
// 引入封装的请求
import request from "../../utils/request.js"

Page({

  data: {

    // 轮播图数据
    message: [],
    indicatorDots: true,
    vertical: true,
    autoplay: true,
    interval: 2000,
    duration: 500,

    // 菜单数据
    menus: [],

    // 楼层数据
    floors: []

  },

  onLoad() {

    // 请求轮播图数据
    request({
      url: "/api/public/v1/home/swiperdata"
    }).then(res => {
      const {
        message
      } = res.data
      this.setData({
        message: message
      })
    })

    // 请求菜单数据
    request({
      url: "/api/public/v1/home/catitems"
    }).then(res => {
      const {
        message
      } = res.data
      this.setData({
        menus: message
      })
    })

    // 请求楼层信息
    request({
      url: "/api/public/v1/home/floordata"
    }).then(res => {
      const {
        message
      } = res.data
      this.setData({
        floors: message
      })
    })


  }


})