'use strict';

// Setting up route
angular.module('<%= moduleName %>').config(['$stateProvider', '<%= firstCapCamelModuleName %>Const',

  function ($stateProvider, <%= firstCapCamelModuleName %>Const) {

    // <%= firstCapCamelModuleName %> state routing
    $stateProvider
      .state('<%= moduleName %>', {
        abstract: true,
        url: '/<%= moduleName %>',
        template: '<ui-view/>',
        resolve: {
          loadPlugin: ['$ocLazyLoad', 'utilService', function ($ocLazyLoad, utilService) {
            return $ocLazyLoad.load(utilService.assetsVersionPlus([
              {
                files: ['script/<%= moduleName %>/i18n.js?_=' + new Date().getTime()]
              }
            ]));
          }]
        }
      })
      // Don't touch me
    ;
  }
]);
