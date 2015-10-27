'use strict';
var yeoman = require('yeoman-generator');
var s = require('underscore.string');
var common = require('../app/common');
var logger = require('../app/logger');
var util = require('../app/util');

var ctrlFolder, ctrlFolderPath, tplFolder, tplFolderPath;

module.exports = yeoman.generators.Base.extend({

  getPrompts: function() {
    var done = this.async();

    var prompts = [{
      name    : 'moduleName',
      message : 'What is your page\' module name?',
      required: true
    }, {
      name    : 'ctrlName',
      message : 'What is your page name?',
      default: 'list',
      required: true
    }];

    this.prompt(prompts, function(props) {

      this.moduleName = s(props.moduleName).slugify().value(); // => demo-user
      this.camelModuleName = s(this.moduleName).camelize().value(); // => demoUser
      this.firstCapCamelModuleName = s(this.camelModuleName).capitalize().value(); // => DemoUser

      this.ctrlName = s(props.ctrlName).slugify().value(); // => demo-user
      this.camelCtrlName = s(this.ctrlName).camelize().value(); // => demoUser
      this.firstCapCamelCtrlName = s(this.camelCtrlName).capitalize().value(); // => DemoUser

      ctrlFolder = 'modules/' + this.moduleName + '/client/controllers';
      ctrlFolderPath = './' + ctrlFolder + '/';
      tplFolder = 'modules/' + this.moduleName + '/client/views';
      tplFolderPath = './' + tplFolder + '/';

      done();
    }.bind(this));
  },

  copyTemplates: function() {
    this.fs.copyTpl(
      this.templatePath('./_ctrl.js'),
      this.destinationPath(ctrlFolderPath + this.ctrlName + '.client.controller.js'),
      {
        moduleName           : this.moduleName,
        firstCapCamelCtrlName: this.firstCapCamelCtrlName,
        firstCapCamelModuleName: this.firstCapCamelModuleName
      });

    this.fs.copyTpl(
      this.templatePath('./_tpl.html'),
      this.destinationPath(tplFolderPath + this.ctrlName + '.client.view.html'),
      {
        moduleName: this.moduleName,
        firstCapCamelCtrlName  : this.firstCapCamelCtrlName
      });
  },

  addRoute: function() {
    var fullPath = 'modules/' + this.moduleName + '/client/config/' + this.moduleName + '.client.routes.js';
    util.rewriteFile({
      file     : fullPath,
      insertPrev: true,
      needle   : "// Don't touch me",
      splicable: [
        ".state('" + this.moduleName + "." + this.ctrlName + "', {",
        "  url: '/" + this.ctrlName + "',",
        "  templateUrl: 'modules/" + this.moduleName + "/client/views/" + this.ctrlName + ".client.view.html'",
        "})"
      ]
    });
  }

});
