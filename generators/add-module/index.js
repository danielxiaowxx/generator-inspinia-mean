'use strict';
var yeoman = require('yeoman-generator');
var s = require('underscore.string');
var glob = require("glob");
var _ = require('lodash');
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
    common.exec('cp -rf ' + this.templatePath('.') + ' ' + this.destinationPath(folderPath)).then(function() {
      done();
    })

  },

  copyTemplates: function() {
    var self = this;
    var done = this.async();

    glob(folderPath + "**/_.*.js", {}, function(er, files) {
      _.each(files, function(filePath) {
        var fileName = filePath.replace(/.*_/, '');
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
      'client/_.*.js',
      'client/config/_.*.js',
      'client/services/_.*.js',
      'server/controllers/_.*.js',
      'server/models/_.*.js',
      'server/policies/_.*.js',
      'server/routes/_.*.js',
      'tests/client/_.*.js',
      'tests/server/_.*.js',
      'tests/e2e/_.*.js'
    ], folder)
  }

});
