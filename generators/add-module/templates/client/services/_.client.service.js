'use strict';

//<%= firstCapCamelModuleName %> service used for communicating with the <%= moduleName %> REST endpoints
angular.module('<%= moduleName %>').factory('<%= firstCapCamelModuleName %>', ['$resource',
  function ($resource) {
    return {

    };
  }
]);
