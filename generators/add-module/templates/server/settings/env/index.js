/**
 * 模块自己特殊的环境配置信息
 */

'use strict';

var config;

var node_env = process.env.NODE_ENV || 'dev';

switch (node_env) {
  case 'dev':
    config = require('./dev.js'); break;
  case 'sit':
    config = require('./sit.js'); break;
  case 'prd':
    config = require('./prd.js'); break;
  case 'usa':
    config = require('./prd.js'); break;
}

module.exports = config;
