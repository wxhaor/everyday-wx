// pages/food/index.js
Page({
  data: {
    list: [
      {
        unitPrice: 1
      },
      {
        unitPrice: 1
      }
    ]
  },
  add: function () {
    wx.navigateTo({
      url: "meal/index"
    })
  }


})