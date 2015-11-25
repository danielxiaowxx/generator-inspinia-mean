'use strict';

/**
 * Module dependencies.
 */
var path = require('path');
var url = require('url');
var _ = require('lodash');
var GMAPI = require('gm-open-api');
var Promise = require('bluebird');

var i18n = require('../i18n/');
var gmRequest = require(path.resolve('./modules/core/server/common/gmRequest'));

exports.getI18nScriptData = function(language) {
  return 'window.<%= moduleName %>_i18n = ' + JSON.stringify(i18n.getI18NContent(language || 'en'));
};

exports.queryMockList = function(inputParams) {

  var result = {
    items: [
      {
        field1: '字段1-1',
        field2: '字段2-1'
      },
      {
        field1: '字段1-2',
        field2: '字段2-2'
      },
      {
        field1: '字段1-3',
        field2: '字段2-3'
      }
    ],
    total: 3
  };
  return result;
};

// Don't touch me

