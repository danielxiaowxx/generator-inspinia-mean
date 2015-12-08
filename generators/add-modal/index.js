'use strict';
var yeoman = require('yeoman-generator');
var fs = require('fs');
var s = require('underscore.string');
var _ = require('lodash');
var common = require('../app/common');
var logger = require('../app/logger');
var util = require('../app/util');

var ctrlFolder, ctrlFolderPath, tplFolder, tplFolderPath;

module.exports = yeoman.generators.Base.extend({

  getPrompts: function() {
    var done = this.async();

    var prompts = [{
      name    : 'moduleName',
      message : 'What is your modal\' module name?',
      required: true
    }, {
      name    : 'modalName',
      message : 'What is your modal name?',
      default : 'edit',
      required: true
    }, {
      type    : 'list',
      name    : 'isForm',
      message : 'Your modal is the form content?',
      choices : ['Yes', 'No'],
      default : 'No',
      required: true
    }];

    this.prompt(prompts, function(props) {

      this.moduleName = s(props.moduleName).slugify().value(); // => demo-user
      this.camelModuleName = s(this.moduleName).camelize().value(); // => demoUser
      this.firstCapCamelModuleName = s(this.camelModuleName).capitalize().value(); // => DemoUser

      this.modalName = s(props.modalName).slugify().value(); // => demo-user
      this.camelModalName = s(this.modalName).camelize().value(); // => demoUser
      this.firstCapCamelModalName = s(this.camelModalName).capitalize().value(); // => DemoUser

      this.isForm = props.isForm;

      ctrlFolder = 'modules/' + this.moduleName + '/client/controllers';
      ctrlFolderPath = './' + ctrlFolder + '/';
      tplFolder = 'modules/' + this.moduleName + '/client/views';
      tplFolderPath = './' + tplFolder + '/';

      done();
    }.bind(this));
  },

  copyTemplates: function() {

    var self = this;

    this.fs.copy(
      this.templatePath('./_ctrl.js'),
      this.destinationPath(ctrlFolderPath + this.modalName + '.client.controller.js'),
      {
        process: function(contents) {

          contents = contents.toString();

          if (self.isForm == 'Yes') {
            contents = contents.replace(/\/\/ -- non-form modal start[\s\S]*?non-form modal end -- \/\//g, '');
            contents = contents.replace(/\/\/ -- form modal start \/\//g, '');
            contents = contents.replace(/\/\/ form modal end -- \/\//g, '');
          } else {
            contents = contents.replace(/\/\/ -- form modal start[\s\S]*?form modal end -- \/\//g, '');
            contents = contents.replace(/\/\/ -- non-form modal start \/\//g, '');
            contents = contents.replace(/\/\/ non-form modal end -- \/\//g, '');
          }

          return _.template(contents, {})({
            moduleName             : self.moduleName,
            firstCapCamelModalName : self.firstCapCamelModalName,
            firstCapCamelModuleName: self.firstCapCamelModuleName
          });
        }
      });

    this.fs.copy(
      this.templatePath('./_tpl.html'),
      this.destinationPath(tplFolderPath + this.modalName + '.client.view.html'),
      {
        process: function(contents) {
          contents = contents.toString();

          if (self.isForm == 'Yes') {
            contents = contents.replace(/<!--blank modal start-->[\s\S]*?<!--blank modal end-->/g, '');
            contents = contents.replace(/<!--form modal start-->/g, '');
            contents = contents.replace(/<!--form modal end-->/g, '');
          } else {
            contents = contents.replace(/<!--form modal start-->[\s\S]*?<!--form modal end-->/g, '');
            contents = contents.replace(/<!--blank modal start-->/g, '');
            contents = contents.replace(/<!--blank modal end-->/g, '');
          }

          return _.template(contents, {})({
            modalName              : self.modalName,
            moduleName             : self.moduleName,
            firstCapCamelModalName : self.firstCapCamelModalName,
            firstCapCamelModuleName: self.firstCapCamelModuleName
          });
        }
      });
  },

  usageTip: function() {
    logger.log('user modal:');
    logger.log('=========================');
    logger.log("var modalInstance = $modal.open({");
    // modules/products/client/views/list.client.view.html
    logger.log("  templateUrl: window.tmplVersionPlus('modules/" + this.moduleName + "/client/views/" + this.modalName + ".client.view.html'),");
    logger.log("  controller: '" + this.firstCapCamelModuleName + this.firstCapCamelModalName + "Controller'");
    logger.log("});");
    logger.log("");
    logger.log("modalInstance.result.then(function () {");
    logger.log("  // ok");
    logger.log("}, function () {");
    logger.log("  // cancel");
    logger.log("});");
    logger.log('=========================');
  }

});
