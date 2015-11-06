'use strict';

// Setting up route
angular.module('<%= moduleName %>').config(['$stateProvider',
  function ($stateProvider) {
    // <%= firstCapCamelModuleName %> state routing
    $stateProvider
      .state('<%= moduleName %>', {
        abstract: true,
        url: '/<%= moduleName %>',
        template: '<ui-view/>'
      })
      // Don't touch me
    ;
  }
]);
