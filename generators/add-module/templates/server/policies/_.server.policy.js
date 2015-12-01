'use strict';

/**
 * Module dependencies.
 */
var acl = require('acl');

// Using the memory backend
var aclInstance = new acl(new acl.memoryBackend());

exports.invokeRolesPolicies = function() {
  // TODO Daniel: 角色权限配置应该是读取DB的，暂未实现
  aclInstance.allow([
    //{
    //  roles : ['admin'],
    //  allows: [{
    //    resources  : '/api/<%= moduleName %>',
    //    permissions: ['/queryMockList.gm']
    //  }]
    //}
  ]);
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