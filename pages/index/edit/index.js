// pages/idea/add/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    foodDetailModel: {
      "idx": -1,
      "count": 1,
      "foodName": "豆沙包",
      "unitPrice": 2,
    },

    stepper: {
      count: 1,
      min: 1
    }
  },
  onLoad: function (options) {
    let idx = options.idx;
    console.info(idx);
    if (idx) {
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];  //上一个页面
      let list = prevPage.data.mealInfo.foodDetailModels;
      let foodDetailModel = list[idx];
      foodDetailModel['idx'] = idx;
      this.setData({
        foodDetailModel: foodDetailModel
      })
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
  formSubmit: function (e) {

    let v = e.detail.value;
    v['count'] = this.data.foodDetailModel.count;
    console.info(v);

    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面

    let mealInfo = prevPage.data.mealInfo;
    let foodDetailModels = mealInfo.foodDetailModels;

    let idx = this.data.foodDetailModel.idx;
    if (idx === -1) {
      foodDetailModels.push(v);
    } else {
      foodDetailModels[idx] = v;
    }



    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      mealInfo: mealInfo
    });
    wx.navigateBack();
  },

})