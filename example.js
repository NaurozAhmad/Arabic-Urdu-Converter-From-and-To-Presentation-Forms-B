var converter = require('./converter');

var testStringTo = 'مؤسسة';
console.log(converter.convertArabic(testStringTo));

var testStringFrom = 'ﻣﺆﺳﺴﺔ';
console.log(converter.convertArabicBack(testStringFrom));