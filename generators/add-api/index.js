'use strict';
var yeoman = require('yeoman-generator');
var fs = require('fs');
var s = require('underscore.string');
var _ = require('lodash');
var common = require('../app/common');
var logger = require('../app/logger');
var util = require('../app/util');

var clientFolderPath, serverFolderPath;

module.exports = yeoman.generators.Base.extend({

  getPrompts: function() {
    var done = this.async();

    var prompts = [{
      name    : 'moduleName',
      message : 'What is your modal\' module name?',
      required: true
    }, {
      name    : 'apiName',
      message : 'What is your api method name?',
      required: true
    }, {
      type    : 'list',
      name    : 'apiMethodType',
      message : 'What is your api method type?',
      choices : ['get', 'post'],
      default : 'get',
      required: true
    }];

    this.prompt(prompts, function(props) {

      this.moduleName = s(props.moduleName).slugify().value(); // => demo-user
      this.camelModuleName = s(this.moduleName).camelize().value(); // => demoUser
      this.firstCapCamelModuleName = s(this.camelModuleName).capitalize().value(); // => DemoUser

      this.apiName = props.apiName;
      this.apiMethodType = props.apiMethodType;

      clientFolderPath = './modules/' + this.moduleName + '/client';
      serverFolderPath = './modules/' + this.moduleName + '/server';

      done();
    }.bind(this));
  },

  addToClientService: function() {
    util.rewriteFile({
      file      : clientFolderPath + '/services/' + this.moduleName + '.client.service.js',
      insertPrev: true,
      needle    : "// Don't touch me",
      splicable : [
        this.apiName + ": function(params) {",
        "  return utilService." + (this.apiMethodType == "get" ? "httpGet" : "httpPost") + "('/api/" + this.moduleName + "/" + this.apiName + "', _.extend(_.omit(params, function(item) { return item === ''; }), {}));",
        "},\n"
      ]
    });
  },

  addToServerRoute: function() {
    util.rewriteFile({
      file      : serverFolderPath + '/routes/' + this.moduleName + '.server.routes.js',
      insertPrev: true,
      needle    : "// Don't touch me",
      splicable : [
        "." + (this.apiMethodType == 'get' ? 'get' : 'post') + "('/" + this.apiName + "', " + this.camelModuleName + "Ctrl." + this.apiName + ")"
      ]
    });
  },

  addToServerController: function() {
    util.rewriteFile({
      file      : serverFolderPath + '/controllers/' + this.moduleName + '.server.controller.js',
      insertPrev: true,
      needle    : "// Don't touch me",
      splicable : [
        "exports." + this.apiName + " = function(req, res) {",
        "  var result = 'Hello Daniel';",
        "  return res.json(result);",
        "};\n"
      ]
    });
  }

});
