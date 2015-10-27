'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var Promise = require('bluebird');
var path = require('path');
var s = require('underscore.string');
var logger = require('./logger');
var common = require('./common');

// Global Variables
var folder, folderPath;

module.exports = yeoman.generators.Base.extend({

  /**
   * 初始化
   */
  init: function() {

    this.pkg = this.fs.readJSON(path.join(__dirname, '../package.json'));

    this.on('end', function() {
      if (!this.options['skip-install']) {
        logger.green('Running npm install for you....');
        logger.green('This may take a couple minutes.');
        common.exec('cd ' + folder + ' && npm install')
          .then(function() {
            logger.log('');
            logger.green('------------------------------------------');
            logger.green('Your Inspinia-MEAN application is ready!');
            logger.log('');
            logger.green('To Get Started, run the following command:');
            logger.log('');
            logger.yellow('cd ' + folder + ' && gulp');
            logger.log('');
            logger.green('Happy Hacking!');
            logger.green('------------------------------------------');
          });
      }
    });
  },

  /**
   * 检查git是否安装
   */
  checkForGit: function() {
    var done = this.async();

    common.exec('git --version')
      .then(function() {
        done();
      })
      .catch(function(err) {
        logger.red(new Error(err));
        return;
      });
  },

  /**
   * 打印欢迎信息
   */
  welcomeMessage: function() {
    logger.log(yosay(
      'Welcome to the luminous ' + chalk.red('Inspinia-MEAN') + ' generator!'
    ));
  },

  promptForFolder: function() {
    var done = this.async();

    var prompt = {
      name   : 'folder',
      message: 'In which folder would you like the project to be generated? ',
      default: 'inspinia-mean'
    };

    this.prompt(prompt, function(props) {
      folder = props.folder;
      folderPath = './' + folder + '/';
      done();
    }.bind(this));
  },

  cloneRepo: function() {
    var done = this.async();

    logger.green('Cloning the inspinia-mean-admin repo.......');

    common.exec('git clone http://gitlab.globalmarket.com/daniel/inspinia-mean-admin.git --branch master --single-branch ' + folder)
      .then(function() {
        done();
      })
      .catch(function(err) {
        logger.red(err);
        return;
      });
  },

  removeFiles: function() {
    common.removeFiles(this, [
      'package.json'
    ], folder)
  },

  remoteGitRemote: function() {
    var done = this.async();

    common.exec('cd ' + folder + ' && git remote remove origin').then(function() {
      done();
    }).catch(function(err) {
      logger.red(err);
      return;
    });

  },

  getPrompts: function() {
    var done = this.async();

    var prompts = [{
      name   : 'appName',
      message: 'What would you like to call your application?',
      default: folder
    }, {
      name   : 'appDescription',
      message: 'How would you describe your application?',
      default: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, Node.js and Inspinia Admin'
    }, {
      name   : 'appKeywords',
      message: 'How would you describe your application in comma seperated key words?',
      default: 'MongoDB, Express, AngularJS, Node.js, Inspinia, MEAN.js'
    }, {
      name   : 'appAuthor',
      message: 'What is your company/author name?'
    }];

    this.prompt(prompts, function(props) {
      this.appName = props.appName;
      this.appDescription = props.appDescription;
      this.appKeywords = props.appKeywords;
      this.appAuthor = props.appAuthor;

      this.slugifiedAppName = s(this.appName).slugify().value();
      this.humanizedAppName = s(this.appName).humanize().value();
      this.capitalizedAppAuthor = s(this.appAuthor).capitalize().value();

      done();
    }.bind(this));
  },

  copyTemplates: function() {

    // copy package.json
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath(folderPath + 'package.json'),
      {
        slugifiedAppName    : this.slugifiedAppName,
        appDescription      : this.appDescription,
        capitalizedAppAuthor: this.capitalizedAppAuthor
      });
  }

});
