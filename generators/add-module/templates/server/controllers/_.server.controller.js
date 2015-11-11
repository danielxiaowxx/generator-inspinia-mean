'use strict';

/**
 * Module dependencies.
 */
var path = require('path');
var url = require('url');
var _ = require('lodash');
var GMAPI = require('gm-open-api');

var gmRequest = require(path.resolve('./modules/core/server/common/gmRequest'));

exports.queryMockList = function(req, res) {
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
  return res.json(result);
};

// Don't touch me

