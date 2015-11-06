'use strict';

/**
 * Module dependencies.
 */

var <%= camelModuleName %>Ctrl = require('../controllers/<%= moduleName %>.server.controller');

module.exports = function (app) {

  app.route('/api/queryMockList')
    .get(<%= camelModuleName %>Ctrl.queryMockList);

};
