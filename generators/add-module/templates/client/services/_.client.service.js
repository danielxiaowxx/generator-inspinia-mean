
(function(_) {

  'use strict';

  //<%= firstCapCamelModuleName %> service used for communicating with the <%= moduleName %> REST endpoints
  angular.module('<%= moduleName %>').factory('<%= firstCapCamelModuleName %>HttpService', ['utilService',

    function (utilService) {

      return {

        queryMockList: function(searchParams, pageNum, pageSize) {
          return utilService.httpGet('/api/queryMockList', _.extend(_.omit(searchParams, function(item) { return item === ''; }), {pageNum: pageNum, pageSize: pageSize}));
        }

      };
    }
  ]);

})(window._);
