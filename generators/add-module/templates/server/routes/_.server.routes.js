'use strict';

/**
 * Module dependencies.
 */
var GMAPI = require('gm-open-api');
var express = GMAPI.express;
var Router = express.Router;

var <%= camelModuleName %>Ctrl = require('../controllers/<%= moduleName %>.server.controller');

module.exports = function (app) {

  app.use('/api/<%= moduleName %>', new Router()
      .get('/queryMockList', <%= camelModuleName %>Ctrl.queryMockList)
      // Don't touch me
  );

};
