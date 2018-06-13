const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const ifNullCopy = (source, target) => {
  for (var param in source) {
    if (!target[param]) {
      target[param] = source[param];
    }

  }
  return target;
}

const copyObj = source => {
  var obj = {};
  obj = JSON.parse(JSON.stringify(source));
  return obj;
}


module.exports = {
  formatTime: formatTime,
  ifNullCopy: ifNullCopy,
  copyObj: copyObj
}

