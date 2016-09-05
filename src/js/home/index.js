define(function(require, exports, module) {
    require("a");
    var fastclick = require("fastclick");
    var flexible = require("flexible");
    var layer = require("layer");
    var swiper = require("swiper");
    layer.open({
        content: 'hello layer',
        skin: 'msg',
        time: 2
    });
});
