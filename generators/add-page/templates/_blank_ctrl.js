
(function(_) {

  'use strict';

  angular.module('<%= moduleName %>').controller('<%= firstCapCamelModuleName %><%= firstCapCamelCtrlName %>Controller', ['$scope', 'i18n', '<%= firstCapCamelModuleName %>HttpService',

    function ($scope, i18n, <%= firstCapCamelModuleName %>HttpService) {

      /*========== Scope Models ==================================================*/

      $scope.i18n = i18n.getI18nData('<%= moduleName %>');

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