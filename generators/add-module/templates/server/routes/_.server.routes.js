'use strict';

/**
 * Module dependencies.
 */
var path = require('path');
var GMAPI = require('gm-open-api');
var express = GMAPI.express;
var Router = express.Router;

var apiHandler = require(path.resolve('./modules/core/server/controllers/core.server.controller')).apiHandler;
var <%= camelModuleName %>Ctrl = require('../controllers/<%= moduleName %>.server.controller');

module.exports = function (app) {

  app.use('/api/<%= moduleName %>', new Router()
      .get('/queryMockList', apiHandler(<%= camelModuleName %>Ctrl.queryMockList))
      // Don't touch me
  );

};
