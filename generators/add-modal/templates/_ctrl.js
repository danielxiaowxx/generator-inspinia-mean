(function(_) {

  'use strict';

  angular.module('<%= moduleName %>').controller('<%= firstCapCamelModuleName %><%= firstCapCamelModalName %>Controller', ['$scope', '$modalInstance', 'i18n',

    function ($scope, $modalInstance, i18n) {

      /*========== Scope Models ==================================================*/

      $scope.i18n = i18n.getI18nData('<%= moduleName %>');

      // -- form modal start //
      $scope.formData = {
        demoField: ''
      };
      // form modal end -- //

      /*========== Scope Functions ==================================================*/

      // -- form modal start //
      $scope.ok = function() {
        if ($scope.data_form.$valid) {
          $modalInstance.close();
        } else {
          $scope.data_form.submitted = true;
        }
      };
      // form modal end -- //

      // -- non-form modal start //
      $scope.ok = function() {
        $modalInstance.close();
      };
      // non-form modal end -- //

      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };

      /*========== Listeners ==================================================*/

      /*========== Watches ==================================================*/

      /*========== Private Functions ==================================================*/

      function _init() {
      }

      _init();

    }
  ]);

})(window._);