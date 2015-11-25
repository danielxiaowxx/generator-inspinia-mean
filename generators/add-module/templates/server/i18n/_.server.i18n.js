'use strict';

var en = require('./products.server.i18n.en');
var zh_CN = require('./products.server.i18n.zh_CN');

exports.getI18NContent = function(language) {
  switch (language) {
    case 'en':
      return en.i18nData;
    case 'zh_CN':
      return zh_CN.i18nData;
    default:
      return en.i18nData;
  }
};
