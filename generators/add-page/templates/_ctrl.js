
(function(_) {

  'use strict';

  angular.module('<%= moduleName %>').controller('<%= firstCapCamelCtrlName %>Controller', ['$scope', '$stateParams', '$location', '<%= firstCapCamelModuleName %>',

    function ($scope, $stateParams, $location, <%= firstCapCamelModuleName %>) {

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