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
var isLoginRequired = require(path.resolve('./modules/core/server/controllers/core.server.controller')).isLoginRequired;
var isAllowed = require(path.resolve('./modules/core/server/controllers/core.server.controller')).isAllowed;
var <%= camelModuleName %>Ctrl = require('../controllers/<%= moduleName %>.server.controller');
var <%= camelModuleName %>Policies = require('../policies/<%= moduleName %>.server.policy');
var <%= camelModuleName %>Setting = require('../settings/<%= moduleName %>.server.setting');


module.exports = function (app) {

  app.use('/api/<%= moduleName %>', new Router()
      .use(isLoginRequired(<%= camelModuleName %>Setting.withoutLoginPaths))
      .use(isAllowed(<%= camelModuleName %>Policies.getACLInstance(), <%= camelModuleName %>Policies.areParamsAllowedHandler, <%= camelModuleName %>Setting.withoutLoginPaths))
      .get('/queryMockList', apiHandler(<%= camelModuleName %>Ctrl.queryMockList))
      // Don't touch me
  );

  // 动态生成的前端javascript
  app.use('/script/<%= moduleName %>', new Router()
      .get('/i18n.js', scriptHandler(function(req) {
        return <%= camelModuleName %>Ctrl.getI18nScriptData(req.cookies.language);
      }))
  );

};
