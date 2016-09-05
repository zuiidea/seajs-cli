define(function(require){
    var b = require("b");
    console.log("这是A模块,依赖B")
    return 'a' + ' ' + b;
});
