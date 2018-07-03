// pages/calendar/index.js
Page({

  data: {
    days_style:[{ month: 'current', day: 3, color: 'white', background: '#b49eeb' }]
  },
  dateChange: function (event) {
    console.log(event.detail);
  },
  dayClick: function (event) {
    let detail = event.detail;
    this.setData({
      days_style: [{ month: 'current', day: detail.day , color: 'white', background: '#b49eeb' }]
    })
    console.log(event.detail);
  }
 
})