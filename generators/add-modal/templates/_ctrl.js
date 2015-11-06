(function(_) {

  'use strict';

  angular.module('<%= moduleName %>').controller('<%= firstCapCamelModalName %>Controller', ['$scope', '$modalInstance',

    function ($scope, $modalInstance) {

      /*========== Scope Models ==================================================*/

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