'use strict';

/**
 * Module dependencies.
 */
var path = require('path');
var GMAPI = require('gm-open-api');
var express = GMAPI.express;
var Router = express.Router;

var apiHandler = require(path.resolve('./modules/core/server/controllers/core.server.controller')).apiHandler;
var scriptHandler = require(path.resolve('./modules/core/server/controllers/core.server.controller')).scriptHandler;
var <%= camelModuleName %>Ctrl = require('../controllers/<%= moduleName %>.server.controller');

module.exports = function (app) {

  app.use('/api/<%= moduleName %>', new Router()
      .get('/queryMockList.gm', apiHandler(<%= camelModuleName %>Ctrl.queryMockList))
      // Don't touch me
  );

  // 动态生成的前端javascript
  app.use('/script/<%= moduleName %>', new Router()
      .get('/i18n.js', scriptHandler(function(req) {
        return <%= camelModuleName %>Ctrl.getI18nScriptData(req.cookies.language);
      }))
  );

};
