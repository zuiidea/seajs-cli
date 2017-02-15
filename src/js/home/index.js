define(function (require, exports, module) {
  require('a')
  var layer = require('layer')
  layer.open({
    content: 'hello layer',
    skin: 'msg',
    time: 2
  })
})
