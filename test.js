'use strict';

var convert = require ('./index'),
    should = require ('should'),
    klass = 'fa-glass',
    hex = 'f000',
	utf = '\uf000';

describe ('Conversion', function () {
    it ('Should translate class to hex', function () {
        should (convert.classToHex (klass)).eql (hex);
    });
    it ('Should translate class to unicode', function () {
        should (convert.classToUnicode (klass)).eql (utf);
    });
    it ('Should translate class to css unicode', function () {
        should (convert.classToCSSUnicode (klass)).eql ('\\' + hex);
    });
    it ('Should translate hex to class', function () {
        should (convert.hexToClass(hex)).eql(klass);
    });
    it ('Should translate unicode to class', function () {
        should (convert.unicodeToClass('\\u'+hex)).eql(klass);
    });
    it ('Should translate css unicode to class', function () {
        should (convert.cssUnicodeToClass('\\'+hex)).eql(klass);
    });
});

describe('Tools', function() {

    it('Finds icons in class attirbute', function(){
        console.log(convert.iconClassFromCssString('#action .glyphicon .fa-glass'));
    });

});