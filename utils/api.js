const config = require('/config.js')
const util = require('/util.js')
var Promise = require('../plugins/es6-promise.js')

function wxPromisify(fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        //成功
        resolve(res.data)
      }
      obj.fail = function (res) {
        //失败
        reject(res.data)
      }
      fn(obj)
    })
  }
}
//无论promise对象最后状态如何都会执行
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};

function post(reqParam) {
  let defParam = {
    method: 'POST',
  }
  let param = util.ifNullCopy(defParam, reqParam);
  request(param);
}

function get(reqParam) {
  let defParam = {
    method: 'GET',
  }
  let param = util.ifNullCopy(defParam, reqParam);
  request(param);
}

// 统一调用api
function request(reqParam) {

  let defParam = {
    url: '',
    data: {},
    header: { 'Content-Type': 'application/json' },
    method: 'POST',
    dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
    success: function () { },
    fail: function () { },
    complete: function () { }
  }

  let param = util.ifNullCopy(defParam, reqParam);

  wx.request({
    url: config.apiUrl + param.url,
    data: param.data,
    header: param.header,
    data: param.data,
    method: param.method,
    success: function (res){
      let respData = res.data;
      if (respData) {
        return typeof param.success == "function" && param.success(respData)
      } else {
        return typeof param.success == "function" && param.success(false)
      }
      
    },
    fail: param.fail,
    complete: param.complete
  })
}

function postT(reqParam) {
  let defParam = {
    url: '',
    data: {},
    header: { 'Content-Type': 'application/json' },
    method: 'POST',
    dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
    success: function () { },
    fail: function () { },
    complete: function () { }
  }
  let param = util.ifNullCopy(defParam, reqParam);

  var postRequest = wxPromisify(wx.request)
  return postRequest({
    url: config.apiUrl + param.url,
    data: param.data,
    header: param.header,
    data: param.data,
    method: param.method,
  })
}

module.exports = {
  get: get,
  post: post,
  postT: postT
}