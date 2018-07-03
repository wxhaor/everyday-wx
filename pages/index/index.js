// pages/calendar/index.js

const apis = require('../../utils/api.js')

Page({

  data: {
    list: [{
        mainImageUrl: "../../../img/x.gif",
        foodName: "foodName",
        num: "1",
        id: "id",
        unitPrice: 1
      },
      {
        unitPrice: 1
      },
      {
        unitPrice: 1
      }
    ],
    currentMonth: 7,
    days_style: [{
      month: 'current',
      day: 3,
      color: 'white',
      background: '#b49eeb'
    }]
  },
  onLoad: function () {
    this.initData();
  },
  dateChange: function(event) {
    console.log(event.detail);
  },
  dayClick: function(event) {
    let detail = event.detail;
    let currentMonth = this.data.currentMonth;
    let monthEvent = "current";
    if (detail.month === currentMonth) {
      monthEvent = "current"
    } else if (detail.month > currentMonth) {
      monthEvent = "next"
    } else {
      monthEvent = "prev"
    }

    this.setData({

      days_style: [{
        month: monthEvent,
        day: detail.day,
        color: 'white',
        background: '#b49eeb'
      }]
    })
    console.log(event.detail);
  },
  initData: function() {
    apis.postT({
      url: '/hao-business/everyday/findAll',
      data: this.data.mealInfo
    }).then(res => {
      console.info("1:" + JSON.stringify(res))

      this.setData({
        list: res.data
      })
    })
  }

})