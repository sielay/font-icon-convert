(function (root, factory) {
    if ( typeof define === 'function' && define.amd ) {
        return define (function () {
            return factory;
        });
    }
    if ( typeof exports === 'object' ) {
        module.exports = factory();
        return;
    }
    root.fontIconConvert = factory ();

}) (this, function(){

    /* inject:map */var maps = [{"fa-glass" : "f000"}];

    var obj = {
        classToUnicode    : function (className) {
            return '\\u' + obj.classToHex(className);
        },
        classToCSSUnicode : function (className) {
            return '\\' + obj.classToHex(className);
        },
        classToHex        : function (className) {
            return maps[0][className];
        },
        unicodeToClass    : function (code) {
            return obj.hexToClass(code.replace(/^\\u/,''));
        },
        cssUnicodeToClass : function (code) {
            return obj.hexToClass(code.replace(/^\\/,''));
        },
        hexToClass        : function (code) {
            var res = null;
            Object.keys(maps[0]).forEach(function(key){
                if(code === maps[0][key]){
                    res = key;
                }
            });
            return res;
        },
        iconClassFromCssString : function(string) {
            var matches = [];
            string.match(/\.([a-zA-Z0-9_-]+)/g).forEach(function(className){
                className = className.replace(/^\./,'');
                if(maps[0][className]) {
                    matches.push(className);
                }
            });
            return matches;
        }
    };

    return obj;

});