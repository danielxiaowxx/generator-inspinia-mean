'use strict';

/**
 * Module dependencies.
 */
var acl = require('acl');
var path = require('path');

var config = require(path.resolve('./config/config'));
var aclInstance;

exports.invokeRolesPolicies = function(db) {
  aclInstance = new acl(new acl.mongodbBackend(db, config.aclCollectionPrefix, true));
};

/**
 * 通过参数进行权限的控制处理方法
 */
exports.areParamsAllowedHandler = function(inputParams, user, path) {
  return true;
};

/**
 * 取得acl实例
 * @returns {*|exports|module.exports}
 */
exports.getACLInstance = function() {
  return aclInstance;
};