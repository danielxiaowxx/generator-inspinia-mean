'use strict';

// Setting up route
angular.module('<%= moduleName %>').config(['$stateProvider',
  function ($stateProvider) {
    // <%= firstCapCamelModuleName %> state routing
    $stateProvider
      .state('<%= moduleName %>', {
        abstract: true,
        url: '/<%= moduleName %>',
        template: '<ui-view/>',
        resolve: {
          loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              {
                files: ['script/<%= moduleName %>/i18n.js?_=' + new Date().getTime()]
              }
            ]);
          }]
        }
      })
      // Don't touch me
    ;
  }
]);
