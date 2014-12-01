var converter = require('./converter');

var locales = {
	"January": "يناير",
	"February": "فبراير",
	"March": "مارس",
	"April": "إبريل",
	"May": "مايو",
	"June": "يونيو",
	"July": "يوليو",
	"August": "أغسطس",
	"September": "سبتمبر",
	"October": "أكتوبر",
	"November": "نوفمبر",
	"December": "ديسمبر",
	"Sunday": "الأحد",
	"Monday": "الإثنين",
	"Tuesday": "الثلاثاء",
	"Wednesday": "الأربعاء",
	"Thursday": "الخميس",
	"Friday": "الجمعة",
	"Saturday": "السبت"
};


Object.keys(locales).forEach(function (key) {
	"use strict";

	var item = locales[key];
	// console.log(item);
	locales[key] = converter.convertArabic(item);
});

console.log(JSON.stringify(locales, null, 2));

