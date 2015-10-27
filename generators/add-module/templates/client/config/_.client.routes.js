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
      .state('<%= moduleName %>.list', {
        url: '',
        templateUrl: 'modules/<%= moduleName %>/client/views/list-<%= moduleName %>.client.view.html'
      })
      // Don't touch me
    ;
  }
]);
