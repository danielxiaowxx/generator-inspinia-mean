
(function(_) {

  'use strict';

  angular.module('<%= moduleName %>').controller('<%= firstCapCamelModuleName %><%= firstCapCamelCtrlName %>Controller', ['$scope', '<%= firstCapCamelModuleName %>HttpService',

    function ($scope, <%= firstCapCamelModuleName %>HttpService) {

      /*========== Scope Models ==================================================*/

      /*========== Scope Functions ==================================================*/

      /*========== Listeners ==================================================*/

      $scope.$on('$stateChangeSuccess', function() {
        _init();
      });

      /*========== Watches ==================================================*/

      /*========== Private Functions ==================================================*/

      function _init() {

      }

    }
  ]);

})(window._);