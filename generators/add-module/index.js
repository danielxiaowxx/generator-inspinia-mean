'use strict';
var yeoman = require('yeoman-generator');
var s = require('underscore.string');
var glob = require("glob");
var _ = require('lodash');
var fs = require('fs-extra');
var common = require('../app/common');
var logger = require('../app/logger');
var util = require('../app/util');

var folderPath, folder;

module.exports = yeoman.generators.Base.extend({

  init: function() {
    this.argument('name', {
      required: true,
      type    : String,
      desc    : 'The module name'
    });

    this.log('You called the Inspinia-MEAN add-module with the argument ' + this.name + '.');

    // example: name = demo-user
    this.moduleName = s(this.name).slugify().value(); // => demo-user
    this.camelModuleName = s(this.moduleName).camelize().value(); // => demoUser
    this.firstCapCamelModuleName = s(this.camelModuleName).capitalize().value(); // => DemoUser

    folder = 'modules/' + this.moduleName;
    folderPath = './' + folder + '/';
  },

  copyModule: function() {
    var done = this.async();
    fs.copy(this.templatePath('.'), this.destinationPath(folderPath), err => {
      done();
    })
  },

  copyTemplates: function() {
    var self = this;
    var done = this.async();

    glob(folderPath + "*.md", {}, function(er, files) {
      _.each(files, function(filePath) {
        self.fs.copyTpl(
          filePath,
          filePath.replace('$.', ''),
          {
            moduleName             : self.moduleName,
            camelModuleName        : self.camelModuleName,
            firstCapCamelModuleName: self.firstCapCamelModuleName
          });
      });

    });

    glob(folderPath + "**/_.*", {}, function(er, files) {
      _.each(files, function(filePath) {
        var fileName = filePath.replace(/.*?_/, '');
        var tplDir = filePath.replace(/\/[^\/]*$/, '');
        self.fs.copyTpl(
          filePath,
          tplDir + '/' + self.moduleName + fileName,
          {
            moduleName             : self.moduleName,
            camelModuleName        : self.camelModuleName,
            firstCapCamelModuleName: self.firstCapCamelModuleName
          });
      });

      done();
    });
  },

  removeFiles: function() {
    common.removeFiles(this, [
      './$.README.md',
      'client/assets/less/_.less',
      'client/_.*.js',
      'client/config/_.*.js',
      'client/services/_.*.js',
      'server/common/_.*.js',
      'server/i18n/_.*.js',
      'server/controllers/_.*.js',
      'server/daos/_.*.js',
      'server/policies/_.*.js',
      'server/routes/_.*.js',
      'server/settings/_.*.js',
      'tests/client/_.*.js',
      'tests/server/_.*.js',
      'tests/e2e/_.*.js'
    ], folder)
  },

  usageTip: function() {
    logger.log('=========================');
    logger.log('Congratulations, module added successfully!');
    logger.green("Now You can run: 'yo inspinia-mean:add-page' to add your first page");
    logger.log("Gook Luck!");
    logger.log('=========================');
  }

});
