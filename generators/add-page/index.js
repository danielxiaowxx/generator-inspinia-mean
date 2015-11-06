'use strict';
var yeoman = require('yeoman-generator');
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
      message : 'What is your page\' module name?',
      required: true
    }, {
      name    : 'ctrlName',
      message : 'What is your page name?',
      default : 'list',
      required: true
    }, {
      type    : 'list',
      name    : 'pageType',
      message : 'What is your page type?',
      choices : ['Blank', 'List', 'Form'],
      default : 'List',
      required: true
    }];

    this.prompt(prompts, function(props) {

      this.moduleName = s(props.moduleName).slugify().value(); // => demo-user
      this.camelModuleName = s(this.moduleName).camelize().value(); // => demoUser
      this.firstCapCamelModuleName = s(this.camelModuleName).capitalize().value(); // => DemoUser

      this.ctrlName = s(props.ctrlName).slugify().value(); // => demo-user
      this.camelCtrlName = s(this.ctrlName).camelize().value(); // => demoUser
      this.firstCapCamelCtrlName = s(this.camelCtrlName).capitalize().value(); // => DemoUser

      this.pageType = props.pageType;

      ctrlFolder = 'modules/' + this.moduleName + '/client/controllers';
      ctrlFolderPath = './' + ctrlFolder + '/';
      tplFolder = 'modules/' + this.moduleName + '/client/views';
      tplFolderPath = './' + tplFolder + '/';

      done();
    }.bind(this));
  },

  promptForListType: function() {
    if (this.pageType == 'List') {
      var done = this.async();

      var prompts = [{
        type    : 'list',
        name    : 'advSearch',
        message : 'Need advance search?',
        choices : ['Yes', 'No'],
        default : 'No',
        required: true
      }, {
        type    : 'list',
        name    : 'columnsConfig',
        message : 'Need visible columns config?',
        default : 'No',
        choices : ['Yes', 'No'],
        required: true
      }, {
        type    : 'list',
        name    : 'selectAll',
        message : 'Need select all?',
        default : 'No',
        choices : ['Yes', 'No'],
        required: true
      }];

      this.prompt(prompts, function(props) {

        this.advSearch = props.advSearch;
        this.columnsConfig = props.columnsConfig;
        this.selectAll = props.selectAll;

        done();
      }.bind(this));
    }
  },

  copyTemplates: function() {

    var self = this;

    this.fs.copy(
      this.templatePath('./_list_ctrl.js'),
      this.destinationPath(ctrlFolderPath + this.ctrlName + '.client.controller.js'),
      {
        process: function(contents) {

          contents = contents.toString();

          if (self.advSearch == 'Yes') {
            contents = contents.replace(/\/\/ -- adv search start \/\//g, '');
            contents = contents.replace(/\/\/ adv search end -- \/\//g, '');
          } else {
            contents = contents.replace(/\/\/ -- adv search start[\s\S]*?adv search end -- \/\//g, '');
          }

          if (self.columnsConfig == 'Yes') {
            contents = contents.replace(/\/\/ -- column config start \/\//g, '');
            contents = contents.replace(/\/\/ column config end -- \/\//g, '');
          } else {
            contents = contents.replace(/\/\/ -- column config start[\s\S]*?column config end -- \/\//g, '');
          }

          if (self.selectAll == 'Yes') {
            contents = contents.replace(/\/\/ -- non-select all start[\s\S]*?non-select all end -- \/\//g, '');
            contents = contents.replace(/\/\/ -- select all start \/\//g, '');
            contents = contents.replace(/\/\/ select all end -- \/\//g, '');
          } else {
            contents = contents.replace(/\/\/ -- select all start[\s\S]*?select all end -- \/\//g, '');
            contents = contents.replace(/\/\/ -- non-select all start \/\//g, '');
            contents = contents.replace(/\/\/ non-select all end -- \/\//g, '');
          }

          return _.template(contents, {})({
            moduleName             : self.moduleName,
            firstCapCamelCtrlName  : self.firstCapCamelCtrlName,
            firstCapCamelModuleName: self.firstCapCamelModuleName
          });
        }
      });

    this.fs.copy(
      this.templatePath('./_list_tpl.html'),
      this.destinationPath(tplFolderPath + this.ctrlName + '.client.view.html'),
      {
        process: function(contents) {

          contents = contents.toString();

          if (self.advSearch == 'Yes') {
            contents = contents.replace(/<!--normal search start-->[\s\S]*?<!--normal search end-->/g, '');
            contents = contents.replace(/<!--adv search start-->/g, '');
            contents = contents.replace(/<!--adv search end-->/g, '');
          } else {
            contents = contents.replace(/<!--adv search start-->[\s\S]*?<!--adv search end-->/g, '');
            contents = contents.replace(/<!--normal search start-->/g, '');
            contents = contents.replace(/<!--normal search end-->/g, '');
          }

          if (self.columnsConfig == 'Yes') {
            contents = contents.replace(/<!--non-column config start-->[\s\S]*?<!--non-column config end-->/g, '');
            contents = contents.replace(/<!--column config start-->/g, '');
            contents = contents.replace(/<!--column config end-->/g, '');
          } else {
            contents = contents.replace(/<!--column config start-->[\s\S]*?<!--column config end-->/g, '');
            contents = contents.replace(/<!--non-column config start-->/g, '');
            contents = contents.replace(/<!--non-column config end-->/g, '');
          }

          if (self.selectAll == 'Yes') {
            contents = contents.replace(/<!--select all start-->/g, '');
            contents = contents.replace(/<!--select all end-->/g, '');
          } else {
            contents = contents.replace(/<!--select all start-->[\s\S]*?<!--select all end-->/g, '');
          }

          return _.template(contents, {})({
            moduleName             : self.moduleName,
            firstCapCamelCtrlName  : self.firstCapCamelCtrlName,
            firstCapCamelModuleName: self.firstCapCamelModuleName
          });
        }
      });
  },

  addRoute: function() {
    var fullPath = 'modules/' + this.moduleName + '/client/config/' + this.moduleName + '.client.routes.js';
    util.rewriteFile({
      file      : fullPath,
      insertPrev: true,
      needle    : "// Don't touch me",
      splicable : [
        ".state('" + this.moduleName + "." + this.ctrlName + "', {",
        "  url: '/" + this.ctrlName + "',",
        "  templateUrl: 'modules/" + this.moduleName + "/client/views/" + this.ctrlName + ".client.view.html',",
        "  data: { pageTitle: '" + this.ctrlName + "' },",
        "  resolve: {",
        "    loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {",
        "      return $ocLazyLoad.load([",
        "        {",
        "		       files: ['lib/iCheck/icheck.min.js', 'modules/core/client/assets/css/plugins/iCheck/custom.css']",
        "        }",
        "      ]);",
        "    }]",
        "  }",
        "})"
      ]
    });
  }

});
