// pages/idea/add/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    foodDetailModel:{
      "count": 3,
      "foodName": "豆沙包",
      "unitPrice": 2,
    },

    stepper: {
      count: 1,
      min: 1
    }
  },

  handleZanStepperChange({
    detail: count,
    target: {
      dataset: {
        componentId
      }
    }
  }) {
    this.setData({
      [`foodDetailModel.count`]: count
    });
  },
  formSubmit: function (event) {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面

    let foodDetailModel = this.data.foodDetailModel;


    let mealInfo = prevPage.data.mealInfo;
    let foodDetailModels = mealInfo.foodDetailModels;
    console.info(foodDetailModel);
    foodDetailModels.push(foodDetailModel);
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      mealInfo: mealInfo
    });
    wx.navigateBack();
  },

})