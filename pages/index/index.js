//index.js
//获取应用实例
const app = getApp()
const apis = require('../../utils/api.js')

Page({
  data: {
    mealTimeTypeEnum: [
      {
        code: 10,
        desc: "早餐"
      }, {
        code: 20,
        desc: "午餐"
      }, {
        code: 30,
        desc: "下午茶"
      }, {
        code: 40,
        desc: "晚餐"
      }, {
        code: 50,
        desc: "夜宵"
      }
    ],
    mealTimeTypeEnumIndex: 1,
    mealInfo: {
      "foodDetailModels": [
        {
          "count": 2,
          "foodName": "豆沙包",
          "unitPrice": 2.2,
          "userId": 0
        },
        {
          "count": 1,
          "foodName": "豆浆",
          "unitPrice": 2.5,
          "userId": 0
        }
      ],
      "foodMainModel": {
        "mealTimeTypeCode": 1,
        "userId": 0,
        "eventDate": '2018-06-08'
      }
    },

    delBtnWidth: 120,
  },
  //获取元素自适应后的实际宽度
  getEleWidth: function (w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2);  //以宽度750px设计稿做宽度的自适应
      // console.log(scale);
      real = Math.floor(res / scale);
      return real;
    } catch (e) {
      return false;
      // Do something when catch error
    }
  },
  initEleWidth: function () {
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
    this.setData({
      delBtnWidth: delBtnWidth
    });
  },
  onLoad: function () {
    this.sumPrice();
    this.initEleWidth();
  },
  touchS: function (e) {
    if (e.touches.length == 1) {
      this.setData({
        startX: e.touches[0].clientX
      });
    }
  },
  touchM: function (e) {
    var index = e.currentTarget.dataset.index;

    if (e.touches.length == 1) {
      var moveX = e.touches[0].clientX;
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      var left = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，container位置不变
        left = "margin-left:0px";
      } else if (disX > 0) {//移动距离大于0，container left值等于手指移动距离
        left = "margin-left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          left = "left:-" + delBtnWidth + "px";
        }
      }

      let mealInfo = this.data.mealInfo;
      let list = mealInfo.foodDetailModels;
      if (index != "" && index != null) {
        list[parseInt(index)].left = left;
        this.setData({
          mealInfo: mealInfo
        })
      }
    }
  },

  touchE: function (e) {
    var index = e.currentTarget.dataset.index;
    if (e.changedTouches.length == 1) {
      var endX = e.changedTouches[0].clientX;
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var left = disX > delBtnWidth / 2 ? "margin-left:-" + delBtnWidth + "px" : "margin-left:0px";
      let mealInfo = this.data.mealInfo;
      let list = mealInfo.foodDetailModels;
      if (index !== "" && index != null) {
        list[parseInt(index)].left = left;

        this.setData({
          mealInfo: mealInfo
        })
      }
    }
  },
  sumPrice: function () {
    let mealInfo = this.data.mealInfo;
    let list = mealInfo.foodDetailModels;
    let totalPrice = 0;

    for (var i = 0; i < list.length; i++) {
      var curItem = list[i];
      totalPrice += parseFloat(curItem.unitPrice) * curItem.count;
    }

    totalPrice = parseFloat(totalPrice.toFixed(2));//js浮点计算bug，取两位小数精度
    mealInfo.foodMainModel.totalPrice = totalPrice;
    this.setData({
      mealInfo: mealInfo
    })

  },
  mealTimeTypeChange: function (e) {
    let index = e.detail.value;
    this.setData({
      mealTimeTypeEnumIndex: e.detail.value
    })
  },
  addBtnTap: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index;

    var mealInfo = that.data.mealInfo;

    mealInfo.foodDetailModels[index].count++;
    that.setData({
      mealInfo: mealInfo
    })
    this.sumPrice();

  },
  subtractBtnTap: function (e) {

    var that = this
    var index = e.currentTarget.dataset.index;

    var mealInfo = that.data.mealInfo;
    if (index !== "" && index != null) {
      if (mealInfo.foodDetailModels[index].count > 1) {
        mealInfo.foodDetailModels[index].count--;

        that.setData({
          mealInfo: mealInfo
        })
        this.sumPrice();
      }
    }

  },
  delItem: function (e) {
    var index = e.currentTarget.dataset.index;

    let mealInfo = this.data.mealInfo;
    let list = mealInfo.foodDetailModels;

    list.splice(index, 1);

    this.setData({
      mealInfo: mealInfo
    })
  },
  itemBoxTap: function (e) {
    var index = e.currentTarget.dataset.index;
    console.info("index:{}", index)
    wx.navigateTo({
      url: "edit/index?idx=" + index
    })
  },
  boxAddBtnTap: function () {
    wx.navigateTo({
      url: "edit/index"
    })
  },
  bindDateChange: function (e) {
    let date = e.detail.value;
    this.setData({
      ['mealInfo.foodMainModel.eventDate']: date
    })
  },
  submitData: function () {
    // apis.post({
    //   url: '/hao-business/oneMeal/add',
    //   data: this.data.mealInfo,
    //   success: function (res) {
    //     console.info(res)
    //   }
    // })

    apis.postT({
      url: '/hao-business/oneMeal/add',
      data: this.data.mealInfo
    }).then(res => {
      console.info("1:" + JSON.stringify(res))
      return apis.postT({
        url: '/hao-business/oneMeal/add',
        data: this.data.mealInfo
      })
    }).then(res => {
      console.info("2:" + JSON.stringify(res))

    })
  }
})
