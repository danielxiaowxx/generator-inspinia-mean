(function(_) {

  'use strict';

  angular.module('<%= moduleName %>').controller('<%= firstCapCamelModuleName %><%= firstCapCamelModalName %>Controller', ['$scope', '$modalInstance', 'i18n', '<%= firstCapCamelModuleName %>HttpService',

    function ($scope, $modalInstance, i18n, <%= firstCapCamelModuleName %>HttpService) {

      /*========== Scope Models ==================================================*/

      $scope.i18n = i18n.getI18nData('<%= camelModuleName %>');

      // -- form modal start //
      $scope.formData = {
        demoField: ''
      };

      $scope.submitting = false;
      // form modal end -- //

      /*========== Scope Functions ==================================================*/

      // -- form modal start //
      $scope.ok = function() {

        if (_validForm()) {
          $scope.submitting = true;

          // TODO 请修改成实际调用的API并把该注释删掉
          <%= firstCapCamelModuleName %>HttpService.queryMockList().success(function() {
            $modalInstance.close();
          }).finally(function() {
            $scope.submitting = false;
          });
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

      // -- form modal start //
      function _validForm() {
        var result = $scope.data_form.$valid;
        return result;
      }
      // form modal end -- //

      function _init() {
      }

      _init();

    }
  ]);

})(window._);